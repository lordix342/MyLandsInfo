// Builds calculator/js/lvl45_sets.js from heropedia level 4-5 racial sets.
//
// Tooltips are rendered with the game's own locale templates (heroconfig
// localeStrings), so wording, pluralisation and value formatting match what the
// wiki/heropedia shows. Combat-relevant buffs are additionally emitted as
// structured rows the calculator engine can add to its bonus lanes.
const SRC = "_data/sets_lvl45_MILITARY.json";
const CFG = "_data/heroconfig_MILITARY.json";
const OUT = "offline-mlkalk/calculator/js/lvl45_sets.js";
const RUNTIME = "_lvl45_runtime.js";

// Calculator slot order for db_dress rows.
const PARTS = [
  "HEAD",
  "NECK",
  "FINGER",
  "LEFT_HAND",
  "CHEST",
  "WAIST",
  "LEGS",
  "ITEM",
  "RIGHT_HAND",
  "WRIST",
  "THIGH",
  "BACK",
];

const NEW_KEYS = [
  "SNAKE",
  "WASP",
  "MANDRAKE",
  "MAG",
  "GHOST",
  "MEDUZE",
  "SPIDER",
  "ARCHANGEL",
  "ILFAR",
  "WIZARD",
  "DEATHKNIGHT",
  "WATERDRAGON",
  "MINOTAUR",
];

type Effect = {
  lvl: number;
  buffType: string;
  value?: number;
  unitType?: string;
  terrain?: string;
  btype?: string;
  science?: string;
  estateType?: string;
  estates?: string[];
  targets?: string[];
  myRaces?: string[];
  againstRaces?: string[];
  pos?: string;
  spellName?: string;
  spellLevel?: number;
  min?: number;
  max?: number;
};

// ---------------------------------------------------------------- locale text

const cfg = JSON.parse(await Deno.readTextFile(CFG));
// Buff templates live in localeStrings, artifact/spell names in clientTexts.
const L = new Map<string, string>([
  ...(cfg.localeStrings?.["@"] ?? []),
  ...(cfg.clientTexts?.["@"] ?? []),
]);
const missing = new Set<string>();

function s(key: string, fallback = ""): string {
  const v = L.get(key);
  if (v === undefined) {
    missing.add(key);
    return fallback;
  }
  return v;
}

// heroconfig terrain enums vs. locale key spelling
const TERRAIN_KEY: Record<string, string> = {
  SACRED: "HOLYLAND",
  HOLYLAND: "HOLYLAND",
  DEAD: "DEADLAND",
  DEADLAND: "DEADLAND",
  MAGIC_FOREST: "MAGICFOREST",
  MAGICFOREST: "MAGICFOREST",
  CURSED: "CURSEDFOREST",
  CURSEDFOREST: "CURSEDFOREST",
  MOUNTAINS: "MOUNTAIN",
  MOUNTAIN: "MOUNTAIN",
  DESERT: "DESERT",
  FOREST: "FOREST",
  STEPPE: "STEPPE",
  UNDERGROUND: "UNDERGROUND",
};

// Terrain select order in the calculator ("ландшафт" dropdown).
const TERRAIN_INDEX: Record<string, number> = {
  HOLYLAND: 0,
  DEADLAND: 1,
  MAGICFOREST: 2,
  CURSEDFOREST: 3,
  MOUNTAIN: 4,
  DESERT: 5,
  FOREST: 6,
  STEPPE: 7,
  UNDERGROUND: 8,
};

function terrainName(t: string) {
  const key = TERRAIN_KEY[t] ?? t;
  // The locative form ("в подземелье") reads correctly as a standalone condition.
  return L.get("TERRAIN_" + key + "_M") ?? s("TERRAIN_" + key, t);
}

function buildingName(b: string) {
  const name = L.get("BUILDING_" + b + "_COMMON") ?? L.get("BUILDING_" + b) ?? b;
  return "Здание «" + name + "»";
}

// Estate conditions ("бой в соленом озере", "в клановом замке", ...). Only the
// two locative forms exist in localeStrings, the rest is spelled out here.
const ESTATE_IN: Record<string, string> = {
  CASTLE: "в клановом замке",
  RUIN: "в руинах",
};

function estateName(t: string) {
  return L.get("IN_" + t) ?? ESTATE_IN[t] ??
    "во владении «" + s("ESTATE_TYPE_" + t, t) + "»";
}

function estatesOf(e: Effect) {
  return e.estates ?? (e.estateType ? [e.estateType] : []);
}

function raceList(list?: string[]) {
  if (!list || !list.length) return s("RACE_R_ALL", "всех");
  return list.map((r) => s("RACE_R_" + r, r)).join(", ");
}

function round(n: number) {
  return Math.round(n);
}

function signed(n: number) {
  return (n > 0 ? "+" : "") + n;
}

// Value specs used by the game templates. Percentages are always whole numbers.
function fmtValue(spec: string, v: number): string {
  switch (spec) {
    case "percent":
    case "percent-reversed":
      return signed(round(v * 100)) + "%";
    case "percent-unsigned":
    case "percent-unsigned-reversed":
    case "percent-green":
      return Math.abs(round(v * 100)) + "%";
    case "signed-int":
      return signed(round(v));
    case "per-hour":
      return signed(round(v)) + "/час";
    case "int":
      return String(round(v));
    default:
      return String(round(v));
  }
}

function fill(tpl: string, e: Effect): string {
  return tpl.replace(/\{(\w+)(?::([\w-]+))?\}/g, (_all, name: string, spec: string) => {
    switch (name) {
      case "value":
        return typeof e.value === "number" ? fmtValue(spec ?? "int", e.value) : "";
      case "min":
        return typeof e.min === "number" ? fmtValue(spec ?? "int", e.min) : "";
      case "max":
        return typeof e.max === "number" ? fmtValue(spec ?? "int", e.max) : "";
      case "spellName":
        return e.spellName ? s("SPELL_" + e.spellName + "_NAME", e.spellName) : "";
      case "spellLevel":
        return typeof e.spellLevel === "number" ? String(e.spellLevel) : "";
      case "unitType":
        return e.unitType ? s("UNIT_R_" + e.unitType, e.unitType) : "всех войск";
      case "btype":
        return e.btype ? buildingName(e.btype) : "";
      case "science":
        return e.science ? s("SCIENCE_" + e.science, e.science) : "";
      case "terrain":
        return e.terrain ? terrainName(e.terrain) : "";
      case "againstRaces":
        return raceList(e.againstRaces);
      case "myRaces":
        return raceList(e.myRaces);
      default:
        return "";
    }
  });
}

const TARGET_TEXT: Record<string, string> = {
  SELF: "",
  ENEMY: "врагу",
  ALLY: "союзнику",
  "SELF,ALLY": "себе и союзникам",
  "SELF,ENEMY": "себе и врагу",
  "ALLY,ENEMY": "союзникам и врагу",
  "SELF,ALLY,ENEMY": "всем участникам боя",
};

// heroconfig lists targets in arbitrary order ("ALLY","SELF" vs "SELF","ALLY").
const TARGET_ORDER = ["SELF", "ALLY", "ENEMY"];

function targetKey(e: Effect) {
  const set = new Set(e.targets ?? ["SELF"]);
  return TARGET_ORDER.filter((t) => set.has(t)).join(",");
}

// Two effects that differ only by estate type are the same rule written twice
// (a salt lake copy and a grail copy). Merging them keeps the tooltip readable
// and stops the engine from counting the bonus twice.
function mergeEstates(list: Effect[]): Effect[] {
  const skeleton = (e: Effect) => {
    const { estateType: _t, estates: _s, ...rest } = e;
    return JSON.stringify(rest);
  };
  const out: Effect[] = [];
  for (const e of list) {
    const twin = e.estateType &&
      out.find((o) =>
        estatesOf(o).length && !estatesOf(o).includes(e.estateType!) &&
        skeleton(o) === skeleton(e)
      );
    if (twin) {
      twin.estates = estatesOf(twin).concat(e.estateType!);
      continue;
    }
    out.push({ ...e });
  }
  return out;
}

const unknownBuffs = new Set<string>();

function describe(e: Effect): string {
  // Some effects carry the reward type verbatim, which is already BUFF_-prefixed.
  const key = e.buffType.startsWith("BUFF_") ? e.buffType : "BUFF_" + e.buffType;
  let tpl = L.get(key);
  if (!tpl) {
    unknownBuffs.add(e.buffType);
    tpl = e.buffType + (typeof e.value === "number" ? " {value:percent}" : "");
  }
  let text = fill(tpl, e).replace(/[ \t]{2,}/g, " ").replace(/ +([,.])/g, "$1").trim();

  const notes: string[] = [];
  if (e.unitType && !/\{unitType/.test(tpl)) notes.push(fill(s("UNIT_BUFF_SUFFIX"), e));
  if (e.terrain) notes.push(terrainName(e.terrain));
  const estates = estatesOf(e);
  if (estates.length) notes.push(estates.map(estateName).join(" или "));
  if (e.againstRaces && e.againstRaces.length) notes.push(fill(s("AGAINST_RACE_BUFF"), e));
  if (e.pos === "ASSIST") notes.push(s("IN_ASSIST", "в подмоге"));
  if (TARGET_TEXT[targetKey(e)]) notes.push(TARGET_TEXT[targetKey(e)]);

  // Conditions belong on the first line; multi-line game templates keep their
  // remaining lines as an indented continuation of the same parameter.
  const lines = text.split("\n").map((l) => l.trim());
  if (notes.length) lines[0] += " (" + notes.filter(Boolean).join("; ") + ")";
  return lines.map((l, i) => (i ? "   " + l : l)).join("\n");
}

// ------------------------------------------------------------- engine effects

// Buffs the calculator can actually add to a bonus lane. Everything else is
// tooltip-only (economy, missions, science, vision, ...).
const PERCENT_LANES = new Set([
  "ATTACK_BONUS",
  "MIN_ATTACK",
  "MAX_ATTACK",
  "HEALTH_BONUS",
  "PERSECUTION_BONUS",
  "HEALING_BONUS",
  "NECROMANCY_FROM_SELF",
  "NECROMANCY_FROM_ALLIES",
  "NECROMANCY_FROM_ENEMIES",
  "CREMATION",
  "PARTIAL_RETREAT",
  "HERO_EXPERIENCE",
  "ADDITIONAL_ATTACK_MULTIPLIER",
]);
const FLAT_LANES = new Set([
  "DEFENSE_BONUS",
  "INCREASE_MAX_DEFENCE",
  "MAGES_SUPPRESS_ATTACK",
  "ADDITIONAL_ATTACK",
]);

function engineEffect(e: Effect, myRaces?: string[]) {
  const percent = PERCENT_LANES.has(e.buffType);
  if (!percent && !FLAT_LANES.has(e.buffType)) return null;
  if (typeof e.value !== "number") return null;
  // Values are pre-scaled into calculator units: percent points or flat points.
  const value = percent ? round(e.value * 100) : round(e.value);
  if (!value) return null;
  const row: Record<string, unknown> = {
    buffType: e.buffType,
    target: targetKey(e),
    unitType: e.unitType ?? null,
    value,
  };
  if (e.terrain) {
    const idx = TERRAIN_INDEX[TERRAIN_KEY[e.terrain] ?? e.terrain];
    if (typeof idx === "number") row.terrain = idx;
  }
  const estates = estatesOf(e);
  if (estates.length) row.estates = estates;
  if (e.pos) row.pos = e.pos;
  if (e.againstRaces && e.againstRaces.length) row.againstRaces = e.againstRaces;
  if (myRaces && myRaces.length) row.myRaces = myRaces;
  return row;
}

// ---------------------------------------------------------------------- build

const raw = JSON.parse(await Deno.readTextFile(SRC));
const effects: Record<string, unknown[]> = {};
let nextId = 19200;
const sets: unknown[] = [];

function takeId(list: unknown[]) {
  if (!list.length) return 0;
  const id = nextId++;
  effects[id] = list;
  return id;
}

function collect(item: any) {
  const lines: string[] = [];
  const engine: unknown[] = [];
  for (const e of mergeEstates((item?.effects ?? []) as Effect[])) {
    lines.push(describe(e));
    const row = engineEffect(e);
    if (row) engine.push(row);
  }
  for (const [race, raw] of Object.entries<Effect[]>(item?.racePassives ?? {})) {
    const list = mergeEstates(raw ?? []);
    if (!list.length) continue;
    lines.push(s("RACE_SKILLS", "Бонус расы {0}:").replace("{0}", s("RACE_" + race, race)));
    for (const e of list) {
      lines.push("   " + describe(e));
      const row = engineEffect(e, [race]);
      if (row) engine.push(row);
    }
  }
  return { lines, engine };
}

for (const key of NEW_KEYS) {
  const src = raw.sets[key];
  if (!src) throw new Error("missing set " + key);
  const byPart: Record<string, any> = {};
  const byPartOld: Record<string, any> = {};
  for (const it of src.items ?? []) byPart[it.part] = it;
  for (const it of src.ancientItems ?? []) byPartOld[it.part] = it;

  const slots = PARTS.map((part) => {
    const plain = byPart[part];
    const ancient = byPartOld[part];
    const p = collect(plain);
    const a = collect(ancient);
    const name = plain?.name || ancient?.name || part;
    return {
      title: [name, ...p.lines].join("\n"),
      oldTitle: [name + " (древний)", ...a.lines].join("\n"),
      bonusId: takeId(p.engine),
      oldBonusId: takeId(a.engine),
    };
  });

  const set = collect({ effects: src.setEffects ?? [], racePassives: {} });
  const header = "\nКОМПЛЕКТ «" + src.name + "» (9 из 12):";
  sets.push({
    key,
    name: src.name,
    level: src.level,
    race: (src.races && src.races[0]) || "",
    slots,
    setTitle: [header, ...set.lines].join("\n"),
    oldSetTitle: [header, ...set.lines].join("\n"),
    setBonusId: takeId(set.engine),
    oldSetBonusId: takeId(set.engine),
  });
}

const runtime = await Deno.readTextFile(RUNTIME);
const payload = JSON.stringify({ effects, sets, startHint: 49 });
const file = "/* generated by _build_lvl45_sets.ts — do not edit by hand */\n" +
  "window.MLKalkLvl45Data = " + payload + ";\n" +
  runtime;
await Deno.writeTextFile(OUT, file);

console.log("wrote", OUT);
console.log("  sets", sets.length, "effect rows", Object.keys(effects).length, "bytes", file.length);
if (unknownBuffs.size) console.log("  no locale template for:", [...unknownBuffs].join(", "));
if (missing.size) console.log("  missing locale keys:", [...missing].join(", "));
