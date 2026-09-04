# Artifact update notes (battle calculator)

## Current state

- Local calculator data (`offline-mlkalk/db20.js`) is behind current Heropedia set catalog.
- Comparison script: `compare-heropedia-sets.ps1`
- Last diff result: **15 missing set IDs**.

Missing IDs:

- `LEGIONARY`
- `MUSKETER`
- `SNAKE`
- `WASP`
- `MANDRAKE`
- `MAG`
- `GHOST`
- `MEDUZE`
- `SPIDER`
- `ARCHANGEL`
- `ILFAR`
- `WIZARD`
- `DEATHKNIGHT`
- `WATERDRAGON`
- `MINOTAUR`

## Heropedia extraction (step 1 completed)

Source used for authoritative set catalog: [MyLands Wiki — Artefacts](https://ru.mlgame.org/wiki-ru/Wiki.jsp?page=Artefacts) and live Heropedia data (`viewType=ARTIFACTS`).

For each missing set, live declarations were confirmed in Heropedia with 11-12 ancient artifacts and passive keys present.

Quick validation snapshot:

- `LEGIONARY` -> `Легионер` (`LEGIONARY3_ITEM_PASSIVE_ANCIENT`)
- `MUSKETER` -> `Мушкетер короля` (`MUSKETER4_FINGER_PASSIVE_ANCIENT`)
- `SNAKE` -> `Укротитель змей` (`SNAKE4_NECK_PASSIVE_ANCIENT`)
- `WASP` -> `Дикий шершень` (`WASP4_FINGER_PASSIVE_ANCIENT`)
- `MANDRAKE` -> `Хранитель леса` (`MANDRAKE4_RIGHT_HAND_PASSIVE_ANCIENT`)
- `MAG` -> `Ученик Архимага` (`MAG4_RIGHT_HAND_PASSIVE_ANCIENT`)
- `GHOST` -> `Повелитель духов` (`GHOST4_LEGS_PASSIVE_ANCIENT`)
- `MEDUZE` -> `Горгона Медуза` (`MEDUZE4_ITEM_PASSIVE_ANCIENT`)
- `SPIDER` -> `Повелитель Арахнид` (`SPIDER5_LEGS_PASSIVE_ANCIENT`)
- `ARCHANGEL` -> `Архангел` (`ARCHANGEL5_LEGS_PASSIVE_ANCIENT`)
- `ILFAR` -> `Доспехи ифрита` (`ILFAR5_NECK_PASSIVE_ANCIENT`)
- `WIZARD` -> `Мастер-джин` (`WIZARD5_WAIST_PASSIVE_ANCIENT`)
- `DEATHKNIGHT` -> `Рыцарь смерти` (`DEATHKNIGHT5_THIGH_PASSIVE_ANCIENT`)
- `WATERDRAGON` -> `Морской эльф` (`WATERDRAGON5_RIGHT_HAND_PASSIVE_ANCIENT`)
- `MINOTAUR` -> `Доспехи минотавра` (`MINOTAUR5_CHEST_PASSIVE_ANCIENT`)

## Why direct auto-add is unsafe

For battle calculations, each artifact effect must map to exact calculator bonus/formula logic in `js20.js`.
Adding only text descriptions (without bonus IDs/formulas) will render UI entries but produce incorrect or missing combat effects.

## What is already prepared

- `offline-mlkalk/custom_set_overrides.js` added and connected in `offline-mlkalk/kalklb.php`.
- This file allows safe extension via patch objects, without editing core `db20.js` every time.
- `MUSKETER` prototype is now integrated into calculator slot `13` (replacing an inactive set slot) with battle-relevant ancient effects:
  - enemy scavenger health `-48%`
  - enemy ranger attack `-54%`
  - self melee health `+60%`
  - self melee persecution `+90%`
  - self melee attack `+60%`
  - self melee defense `+48`
  - healers resurrect `+48%`
  - self+ally melee attack `+30%`

## MUSKETER implementation scope

- Implemented with a custom runtime effect hook (`window.MLKalkApplyCustomSetEffect`) used by `Units.prototype.plus_bonus`.
- Non-battle economy/passive effects for MUSKETER (science, bag, mission time, etc.) are displayed in tooltip text but intentionally not injected into battle formula paths.
- The inactive-slot replacement keeps UI stable (no HTML list rework required) while enabling practical testing in current interface.

## Required to finalize full implementation

For each missing set artifact, provide authoritative mapping:

- artifact slot + level
- exact passive/active effect
- calculator bonus ID or formula branch in `js20.js`
- set 9/12 bonus behavior

Once this mapping is available, we can add full support with deterministic combat output.
