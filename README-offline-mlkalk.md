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

The published site is the rewritten `docs/` folder plus a root `index.html`.

GitHub Pages should use **Deploy from a branch**: `main` / `/ (root)`.
Live URL: `https://<user>.github.io/<repo>/`

Local preview of the same rewrite:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\prepare-github-pages.ps1 -Source .\offline-mlkalk -Destination .\_site
```

Save/load army on the original site uses PHP endpoints. Those stay unavailable on GitHub Pages.

## Notes

- Some non-critical assets may fail to download if the source file is missing on the remote host.
- Core functionality is still preserved for quests and battle calculator.
- You can re-run the build script later to refresh/update data.
