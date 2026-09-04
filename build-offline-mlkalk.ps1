param(
    [string]$OutputDir = ".\offline-mlkalk",
    [int]$MaxFiles = 2000
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http

$domain = "mlkalk.site"
$baseUri = [Uri]("https://$domain/")
$outputRoot = [System.IO.Path]::GetFullPath($OutputDir)

if (-not (Test-Path -LiteralPath $outputRoot)) {
    New-Item -ItemType Directory -Path $outputRoot | Out-Null
}

$seedUrls = @(
    "https://mlkalk.site/quest.php",
    "https://mlkalk.site/qes.php?v04",
    "https://mlkalk.site/kalk_boya.php",
    "https://mlkalk.site/kalklb.php?v304",
    "https://mlkalk.site/db20.js?501",
    "https://mlkalk.site/js20.js?501",
    "https://mlkalk.site/kalkb.css?503",
    "https://mlkalk.site/jquery.js",
    "https://mlkalk.site/json.js",
    "https://mlkalk.site/jquery_bd_que.js",
    "https://mlkalk.site/logo.png",
    "https://mlkalk.site/includes/css/s1.css"
)

$queue = [System.Collections.Generic.Queue[string]]::new()
$seen = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$downloaded = [System.Collections.Generic.List[string]]::new()
$textFiles = [System.Collections.Generic.List[string]]::new()
$httpClient = [System.Net.Http.HttpClient]::new()
$httpClient.Timeout = [TimeSpan]::FromSeconds(60)

foreach ($u in $seedUrls) {
    if ($seen.Add($u)) {
        $queue.Enqueue($u)
    }
}

function Get-LocalPathFromUri {
    param([Uri]$UriObj)

    $path = $UriObj.AbsolutePath
    if ([string]::IsNullOrWhiteSpace($path) -or $path -eq "/") {
        $path = "/index.html"
    }

    if ($path.EndsWith("/")) {
        $path = $path + "index.html"
    }

    $segments = $path.TrimStart("/").Split("/") | ForEach-Object {
        $_ -replace '[<>:"\\|?*]', "_"
    }
    $safePath = [string]::Join([System.IO.Path]::DirectorySeparatorChar, $segments)
    return [System.IO.Path]::Combine($outputRoot, $safePath)
}

function Resolve-CandidateUrl {
    param(
        [string]$Candidate,
        [Uri]$FromUri
    )

    if ([string]::IsNullOrWhiteSpace($Candidate)) { return $null }

    $c = $Candidate.Trim()
    $c = $c.Trim("`"","'")
    if ($c.StartsWith("data:", [System.StringComparison]::OrdinalIgnoreCase)) { return $null }
    if ($c.StartsWith("javascript:", [System.StringComparison]::OrdinalIgnoreCase)) { return $null }
    if ($c.StartsWith("mailto:", [System.StringComparison]::OrdinalIgnoreCase)) { return $null }
    if ($c.StartsWith("#")) { return $null }

    if ($c.StartsWith("//")) {
        $c = "https:$c"
    } elseif ($c.StartsWith("/")) {
        $c = "https://$domain$c"
    }

    try {
        $uri = if ([Uri]::IsWellFormedUriString($c, [UriKind]::Absolute)) {
            [Uri]$c
        } else {
            [Uri]::new($FromUri, $c)
        }
    } catch {
        return $null
    }

    if ($uri.Host -ine $domain) {
        return $null
    }

    $phpWhitelist = @(
        "/quest.php",
        "/qes.php",
        "/kalk_boya.php",
        "/kalklb.php"
    )

    $assetPrefixWhitelist = @(
        "/image/",
        "/img/",
        "/wp-content/",
        "/includes/css/",
        "/css/",
        "/public/img/",
        "/wps/wp-content/",
        "/wps/wp-includes/",
        "/wps/wp-content/themes/"
    )

    $assetExtRegex = '\.(png|jpe?g|gif|webp|svg|css|js|json|woff2?|ttf|eot|ico)(?:$|\?)'
    $path = $uri.AbsolutePath.ToLowerInvariant()
    $absolute = $uri.AbsoluteUri

    if ($path.EndsWith(".php")) {
        if ($phpWhitelist -notcontains $path) {
            return $null
        }
    } elseif ($absolute -notmatch $assetExtRegex) {
        return $null
    }

    if (-not $path.EndsWith(".php")) {
        $isAllowedPrefix = $false
        foreach ($prefix in $assetPrefixWhitelist) {
            if ($path.StartsWith($prefix)) {
                $isAllowedPrefix = $true
                break
            }
        }
        if (-not $isAllowedPrefix) {
            return $null
        }
    }

    return $uri.AbsoluteUri
}

function Extract-Candidates {
    param([string]$Content)

    $patterns = @(
        'https?://mlkalk\.site[^\s"''<>()]+',
        '(?i)(?:src|href)\s*=\s*["'']([^"'']+)["'']',
        '(?i)url\(\s*["'']?([^"''\)]+)'
    )

    $candidates = [System.Collections.Generic.List[string]]::new()
    foreach ($pattern in $patterns) {
        $matches = [System.Text.RegularExpressions.Regex]::Matches($Content, $pattern)
        foreach ($m in $matches) {
            if ($m.Groups.Count -gt 1) {
                $candidates.Add($m.Groups[1].Value)
            } else {
                $candidates.Add($m.Value)
            }
        }
    }
    return $candidates
}

while ($queue.Count -gt 0 -and $downloaded.Count -lt $MaxFiles) {
    $url = $queue.Dequeue()
    $uri = [Uri]$url
    $localPath = Get-LocalPathFromUri -UriObj $uri

    $localDir = Split-Path -Parent $localPath
    if (-not (Test-Path -LiteralPath $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }

    Write-Host "Downloading: $url"

    try {
        $responseMessage = $httpClient.GetAsync($url).GetAwaiter().GetResult()
        if (-not $responseMessage.IsSuccessStatusCode) {
            throw "HTTP $([int]$responseMessage.StatusCode)"
        }
        $bytes = $responseMessage.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()
    } catch {
        Write-Warning "Failed: $url"
        continue
    }

    [System.IO.File]::WriteAllBytes($localPath, $bytes)
    $downloaded.Add($localPath)

    $contentType = ""
    if ($responseMessage.Content.Headers.ContentType) {
        $contentType = $responseMessage.Content.Headers.ContentType.MediaType
    }

    $isTextLike = (
        $contentType -match "text/" -or
        $contentType -match "javascript" -or
        $contentType -match "json" -or
        $localPath -match '\.(html?|php|css|js|json)$'
    )

    if ($isTextLike) {
        $text = [System.Text.Encoding]::UTF8.GetString($bytes)
        [System.IO.File]::WriteAllText($localPath, $text, [System.Text.Encoding]::UTF8)
        $textFiles.Add($localPath)

        $candidates = Extract-Candidates -Content $text
        foreach ($candidate in $candidates) {
            $resolved = Resolve-CandidateUrl -Candidate $candidate -FromUri $uri
            if ($null -eq $resolved) { continue }
            if ($seen.Add($resolved)) {
                $queue.Enqueue($resolved)
            }
        }
    }
}

Write-Host "Rewriting absolute links..."
foreach ($file in $textFiles) {
    $text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    $text = $text.Replace("https://mlkalk.site/", "/")
    $text = $text.Replace("http://mlkalk.site/", "/")
    $text = $text.Replace("//mlkalk.site/", "/")
    [System.IO.File]::WriteAllText($file, $text, [System.Text.Encoding]::UTF8)
}

Write-Host ""
Write-Host "Done."
Write-Host "Downloaded files: $($downloaded.Count)"
Write-Host "Output: $outputRoot"
Write-Host ""
Write-Host "Open locally with:"
Write-Host "  quest page:      $outputRoot\quest.php"
Write-Host "  battle wrapper:  $outputRoot\kalk_boya.php"
Write-Host ""
Write-Host "If you run a local web server, root it at:"
Write-Host "  $outputRoot"

$httpClient.Dispose()
