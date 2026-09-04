Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Heropedia set IDs extracted from ru.mlgame.org/heropedia (viewType=ARTIFACTS).
$heropediaSetIds = @(
  "ELVEN","FORRESTER","PATHFINDER","TEMPLAR","WINDRIDER","ARABIAN","ARCHER","ASASSIN","BARBARIAN","BEAST",
  "CHAINMAIL","FROST_STEEL","IRON","LATTICE","LOGGER","MARINE","UNDEAD","WARDER","COLD","CONQUISTADOR",
  "CRIMSON","GREEN","KING","RAM","SOLDIER","WOLF","YELLOW","BLOODY_STEEL","JESTER","LEGIONARY",
  "ARBALET","DRAGON","EAGLE","FOX","INQUISITOR","LEECH","PHARAON","PREDATOR","SILVER","MUSKETER",
  "SNAKE","WASP","MANDRAKE","MAG","GHOST","MEDUZE","ANGEL","BLACK","MAGIC_CRYSTALL","SCARAB_LORD",
  "SPIDER","ARCHANGEL","ILFAR","WIZARD","DEATHKNIGHT","WATERDRAGON","MINOTAUR","DRAGONHELMET","ELF","ROYAL"
)

# Local calculator coverage baseline (db_dress from this repository).
$localSetIds = @(
  "ELVEN","FORRESTER","PATHFINDER","TEMPLAR","WINDRIDER","ARABIAN","ARCHER","ASASSIN","BARBARIAN","BEAST",
  "CHAINMAIL","FROST_STEEL","IRON","LATTICE","LOGGER","MARINE","UNDEAD","WARDER","COLD","CONQUISTADOR",
  "CRIMSON","GREEN","KING","RAM","SOLDIER","WOLF","YELLOW","BLOODY_STEEL","JESTER",
  "ARBALET","DRAGON","EAGLE","FOX","INQUISITOR","LEECH","PHARAON","PREDATOR","SILVER",
  "ANGEL","BLACK","MAGIC_CRYSTALL","SCARAB_LORD","DRAGONHELMET","ELF","ROYAL"
)

$localSet = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
foreach ($id in $localSetIds) { [void]$localSet.Add($id) }

$missing = @()
foreach ($id in $heropediaSetIds) {
  if (-not $localSet.Contains($id)) {
    $missing += $id
  }
}

Write-Host "Heropedia IDs: $($heropediaSetIds.Count)"
Write-Host "Local baseline IDs: $($localSetIds.Count)"
Write-Host "Missing IDs: $($missing.Count)"
Write-Host ""

if ($missing.Count -gt 0) {
  Write-Host "Missing artifact set IDs:"
  $missing | ForEach-Object { Write-Host $_ }
} else {
  Write-Host "No missing IDs in this baseline."
}
