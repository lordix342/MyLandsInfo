param(
    [string]$Root = ".\offline-mlkalk",
    [int]$Port = 8080
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$rootPath = [System.IO.Path]::GetFullPath($Root)
if (-not (Test-Path -LiteralPath $rootPath)) {
    throw "Root folder not found: $rootPath"
}

Add-Type -AssemblyName System.Web

$listener = [System.Net.HttpListener]::new()
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    throw "Cannot start on ${prefix}. Port may already be in use. Try another port, for example: -Port 8090"
}

Write-Host "Serving $rootPath"
Write-Host "Open: ${prefix}index.html"
Write-Host "Open: ${prefix}quest.php"
Write-Host "Open: ${prefix}kalk_boya.php"
Write-Host "Press Ctrl+C, Q, or Esc to stop."

$contentTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".php"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".eot"  = "application/vnd.ms-fontobject"
    ".xml"  = "application/xml; charset=utf-8"
    ".txt"  = "text/plain; charset=utf-8"
}

function Handle-Request {
    param([System.Net.HttpListenerContext]$Context)

    $request = $Context.Request
    $response = $Context.Response

    try {
        $relative = [System.Web.HttpUtility]::UrlDecode($request.Url.AbsolutePath.TrimStart("/"))
        if ([string]::IsNullOrWhiteSpace($relative)) {
            $relative = "index.html"
        }

        $localFile = [System.IO.Path]::Combine($rootPath, $relative)
        $resolved = [System.IO.Path]::GetFullPath($localFile)
        if (-not $resolved.StartsWith($rootPath, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Invalid path"
        }

        if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            return
        }

        $ext = [System.IO.Path]::GetExtension($resolved).ToLowerInvariant()
        if ($contentTypes.ContainsKey($ext)) {
            $response.ContentType = $contentTypes[$ext]
        } else {
            $response.ContentType = "application/octet-stream"
        }

        $bytes = [System.IO.File]::ReadAllBytes($resolved)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.OutputStream.Close()
        $response.Close()
    } catch {
        $response.StatusCode = 500
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    }
}

$isInteractive = [Environment]::UserInteractive

try {
    $pendingContextTask = $listener.GetContextAsync()
    while ($listener.IsListening) {
        if ($pendingContextTask.Wait(50)) {
            $context = $pendingContextTask.Result
            Handle-Request -Context $context
            $pendingContextTask = $listener.GetContextAsync()
        }

        if ($isInteractive) {
            try {
                if ([Console]::KeyAvailable) {
                    $key = [Console]::ReadKey($true)
                    if ($key.Key -eq [ConsoleKey]::Q -or $key.Key -eq [ConsoleKey]::Escape) {
                        Write-Host "Stopping server..."
                        break
                    }
                }
            } catch {
                # Ignore console read failures in non-standard hosts.
            }
        }
    }
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
