param(
    [string]$Source = ".\offline-mlkalk",
    [string]$Destination = ".\_site"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$sourcePath = [System.IO.Path]::GetFullPath($Source)
$destinationPath = [System.IO.Path]::GetFullPath($Destination)

if (-not (Test-Path -LiteralPath $sourcePath -PathType Container)) {
    throw "Source folder not found: $sourcePath"
}

if (Test-Path -LiteralPath $destinationPath) {
    Remove-Item -LiteralPath $destinationPath -Recurse -Force
}

Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Recurse
Set-Content -LiteralPath (Join-Path $destinationPath ".nojekyll") -Value "" -Encoding ascii

$textSuffixes = @(".html", ".php", ".css", ".js", ".svg", ".xml", ".txt", ".json")
$phpPages = "quest|qes|kalk_boya|kalklb"
$attrRegex = [regex]'(?i)(?<attr>href|src|action)(?<eq>\s*=\s*)(?<q>["''])/(?<path>[^"'']*)\k<q>'
$urlRegex = [regex]'(?i)url\(\s*(?<q>["'']?)/(?<path>[^"'')]+)\k<q>\s*\)'
$phpRegex = [regex]("(?i)\b(?<name>" + $phpPages + ")\.php\b")

function Get-RelativePrefix {
    param([string]$RelativePath)

    $parent = Split-Path -Path $RelativePath -Parent
    if ([string]::IsNullOrWhiteSpace($parent)) {
        return "./"
    }

    $depth = $parent.Split([System.IO.Path]::DirectorySeparatorChar, [System.StringSplitOptions]::RemoveEmptyEntries).Count
    return ("../" * $depth)
}

function Rewrite-Text {
    param(
        [string]$Text,
        [string]$Prefix
    )

    $updated = $attrRegex.Replace($Text, {
        param($match)
        return ($match.Groups["attr"].Value + $match.Groups["eq"].Value + $match.Groups["q"].Value + $Prefix + $match.Groups["path"].Value + $match.Groups["q"].Value)
    })

    $updated = $urlRegex.Replace($updated, {
        param($match)
        $quote = $match.Groups["q"].Value
        return ("url(" + $quote + $Prefix + $match.Groups["path"].Value + $quote + ")")
    })

    $updated = $phpRegex.Replace($updated, {
        param($match)
        return ($match.Groups["name"].Value + ".html")
    })

    return $updated
}

$rewritten = 0
$htmlCopies = 0

Get-ChildItem -LiteralPath $destinationPath -Recurse -File | ForEach-Object {
    if ($_.Name -eq ".nojekyll") { return }
    if ($textSuffixes -notcontains $_.Extension.ToLowerInvariant()) { return }

    $relative = $_.FullName.Substring($destinationPath.Length).TrimStart("\", "/")
    $original = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $updated = Rewrite-Text -Text $original -Prefix (Get-RelativePrefix -RelativePath $relative)

    if ($updated -ne $original) {
        [System.IO.File]::WriteAllText($_.FullName, $updated, [System.Text.UTF8Encoding]::new($false))
        $rewritten += 1
    }

    if ($_.Extension -ieq ".php") {
        $htmlPath = [System.IO.Path]::ChangeExtension($_.FullName, ".html")
        [System.IO.File]::WriteAllText($htmlPath, $updated, [System.Text.UTF8Encoding]::new($false))
        $htmlCopies += 1
    }
}

Write-Host "Prepared Pages site: $destinationPath"
Write-Host "Rewrote text files: $rewritten"
Write-Host "HTML copies of PHP pages: $htmlCopies"
