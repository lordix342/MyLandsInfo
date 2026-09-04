# Offline MLKALK (quests + battle calculator)

This workspace includes scripts to build and serve an offline copy of the needed MLKALK modules:

- `quest.php` + `qes.php` (quests database)
- `kalk_boya.php` + `kalklb.php` (battle calculator)

## 1) Build offline copy

Run in PowerShell from this folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\build-offline-mlkalk.ps1 -OutputDir .\offline-mlkalk -MaxFiles 2500
```

## 2) Start local server

```powershell
powershell -ExecutionPolicy Bypass -File .\serve-offline-mlkalk.ps1 -Root .\offline-mlkalk -Port 8080
```

If `8080` is busy, run with another port (for example `8090`):

```powershell
powershell -ExecutionPolicy Bypass -File .\serve-offline-mlkalk.ps1 -Root .\offline-mlkalk -Port 8090
```

Then open:

- `http://localhost:8080/index.html` (tabs page: quests + battle calculator)
- `http://localhost:8080/quest.php`
- `http://localhost:8080/kalk_boya.php`

## 3) Publish to GitHub Pages

The site is static. GitHub Actions publishes `offline-mlkalk` and rewrites root-absolute links so they work under `https://<user>.github.io/<repo>/`.

After the repository exists:

1. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push this folder to `main` (or `master`)
3. Open the **Actions** tab and wait for **Deploy GitHub Pages**
4. The live URL appears on the successful workflow run and in **Settings → Pages**

Local preview of the same rewrite:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\prepare-github-pages.ps1 -Source .\offline-mlkalk -Destination .\_site
```

Save/load army on the original site uses PHP endpoints. Those stay unavailable on GitHub Pages.

## Notes

- Some non-critical assets may fail to download if the source file is missing on the remote host.
- Core functionality is still preserved for quests and battle calculator.
- You can re-run the build script later to refresh/update data.
