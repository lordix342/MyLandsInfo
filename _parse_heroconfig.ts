// Extracts artifact set reference data out of a saved heropedia getHeroConfig response.
//
// Wire format used by /bridge/v2:
//   {"@c":Class,"@id":N,...}     tagged object
//   {"@c":Class,"@ref":N}        back-reference to an earlier @id
//   {"@":[[k,v],...]}            map
//   ["A",[...]]                  array
//   ["@E:Class","VALUE"]         enum constant
const SERVER = Deno.args[0] ?? "MILITARY";
const raw = await Deno.readTextFile(`D:/MyLands/Quests/_data/heroconfig_${SERVER}.json`);
const doc = JSON.parse(raw);

const byId = new Map<string, Record<string, unknown>>();
(function index(node: unknown) {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const el of node) index(el);
    return;
  }
  const o = node as Record<string, unknown>;
  const id = o["@id"];
  if (typeof id === "string" || typeof id === "number") byId.set(String(id), o);
  for (const k of Object.keys(o)) index(o[k]);
})(doc);

const active = new Set<unknown>();
function res(node: unknown, depth = 0): unknown {
  if (node === null || typeof node !== "object" || depth > 16) return node;

  if (Array.isArray(node)) {
    if (node.length === 2 && node[0] === "A" && Array.isArray(node[1])) {
      return (node[1] as unknown[]).map((el) => res(el, depth + 1));
    }
    if (node.length === 2 && typeof node[0] === "string" && node[0].startsWith("@E:")) {
      return node[1];
    }
    return node.map((el) => res(el, depth + 1));
  }

  const o = node as Record<string, unknown>;

  const ref = o["@ref"];
  if (ref !== undefined) {
    const t = byId.get(String(ref));
    if (!t || active.has(t)) return { $ref: String(ref) };
    active.add(t);
    const out = res(t, depth + 1);
    active.delete(t);
    return out;
  }

  if (Array.isArray(o["@"])) {
    const m: Record<string, unknown> = {};
    for (const e of o["@"] as unknown[]) {
      if (!Array.isArray(e)) continue;
      const k = res(e[0], depth + 1);
      const key = k !== null && typeof k === "object"
        ? String((k as Record<string, unknown>).name ?? JSON.stringify(k))
        : String(k);
      m[key] = res(e[1], depth + 1);
    }
    return m;
  }

  if (active.has(o)) return { $cycle: true };
  active.add(o);
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(o)) {
    if (k === "@id" || k === "@c") continue;
    out[k] = res(o[k], depth + 1);
  }
  active.delete(o);
  return out;
}

const cfg = res(doc) as Record<string, any>;
const sets: Record<string, any> = cfg.sets ?? {};
const artifacts: Record<string, any> = cfg.artifacts ?? {};
const passives: Record<string, any> = cfg.passives ?? {};
const texts: Record<string, string> = { ...(cfg.localeStrings ?? {}), ...(cfg.clientTexts ?? {}) };

console.log(
  `server=${SERVER}  sets=${Object.keys(sets).length}  artifacts=${Object.keys(artifacts).length}  passives=${Object.keys(passives).length}  texts=${Object.keys(texts).length}`,
);

// Flattens a passive (a map of required-hero-level -> effect set) into structured
// effect records. Every field the game uses to render or gate a buff is kept so the
// calculator can reproduce both the tooltip text and the actual bonus.
type Effect = {
  lvl: number;
  buffType: string;
  value?: number;
  unitType?: string;
  terrain?: string;
  btype?: string;
  science?: string;
  estateType?: string;
  targets?: string[];
  myRaces?: string[];
  againstRaces?: string[];
  pos?: string;
  global?: boolean;
  spellName?: string;
  spellLevel?: number;
  min?: number;
  max?: number;
};

function flatten(v: unknown): string[] | undefined {
  // Nested enum arrays arrive as ["[Ljava.lang.Object;", ["MONSTER"]].
  if (v === null || v === undefined) return undefined;
  const out: string[] = [];
  (function walk(n: unknown) {
    if (typeof n === "string") {
      if (!n.startsWith("[L")) out.push(n);
      return;
    }
    if (Array.isArray(n)) n.forEach(walk);
  })(v);
  return out.length ? out : undefined;
}

function effects(passiveKey: string | null): Effect[] {
  if (!passiveKey) return [];
  const p = passives[passiveKey];
  if (!p || typeof p !== "object") return [];
  const out: Effect[] = [];
  for (const [lvl, eff] of Object.entries<any>(p)) {
    for (const act of eff?.dtoActions ?? []) {
      const pr = act?.rewardParams ?? {};
      const row: Effect = {
        lvl: Number(lvl),
        buffType: String(pr.buffType ?? act?.rewardType ?? "NULL"),
      };
      if (typeof pr.value === "number") row.value = pr.value;
      if (pr.unitType) row.unitType = String(pr.unitType);
      if (pr.terrain) row.terrain = String(pr.terrain);
      if (pr.btype) row.btype = String(pr.btype);
      if (pr.science) row.science = String(pr.science);
      if (pr.estateType) row.estateType = String(pr.estateType);
      if (pr.combatPosition) row.pos = String(pr.combatPosition);
      if (pr.global) row.global = true;
      if (pr.spellName) row.spellName = String(pr.spellName);
      if (typeof pr.spellLevel === "number") row.spellLevel = pr.spellLevel;
      if (typeof pr.min === "number") row.min = pr.min;
      if (typeof pr.max === "number") row.max = pr.max;
      const targets = flatten(pr.targets);
      if (targets) row.targets = targets;
      const mine = flatten(pr.myRaces);
      if (mine) row.myRaces = mine;
      const against = flatten(pr.againstRaces);
      if (against) row.againstRaces = against;
      out.push(row);
    }
  }
  return out;
}

// Racial bonuses live on individual artifacts (mostly the _ANCIENT variants) as a
// race -> passive map, not on the set itself.
function item(a: string) {
  const decl = artifacts[a];
  return {
    key: a,
    name: texts[`ARTIFACT_${a}`] ?? "",
    part: decl?.part ?? null,
    pic: decl?.pic ?? null,
    ancient: a.endsWith("_ANCIENT"),
    effects: effects(decl?.passive ?? null),
    racePassives: Object.fromEntries(
      Object.entries<any>(decl?.racePassive ?? {}).map(([r, pk]) => [r, effects(String(pk))]),
    ),
  };
}

const report: string[] = [];
const compact: Record<string, any> = {};

for (const [key, s] of Object.entries<any>(sets).filter(([, s]) => s?.level === 4 || s?.level === 5)) {
  const title = texts[`SET_${key}_NAME`] ?? "";
  const all = (s.artifacts ?? []).map(item);
  const plain = all.filter((i: any) => !i.ancient);
  const ancient = all.filter((i: any) => i.ancient);
  const racialCount = all.filter((i: any) => Object.keys(i.racePassives).length > 0).length;
  const races = [...new Set(all.flatMap((i: any) => Object.keys(i.racePassives)))].sort();

  compact[key] = {
    level: s.level,
    name: title,
    forSale: s.forSale,
    passive: s.passive,
    setEffects: effects(s.passive),
    races,
    items: plain,
    ancientItems: ancient,
  };

  report.push(
    `${key.padEnd(16)} lvl${s.level}  "${title}"  items=${plain.length} ancient=${ancient.length}  setEffects=${effects(s.passive).length}  racialItems=${racialCount}  races=[${races.join(",")}]`,
  );
}

console.log(`\nlevel 4-5 sets: ${report.length}`);
for (const line of report) console.log("  " + line);

await Deno.writeTextFile(
  `D:/MyLands/Quests/_data/sets_lvl45_${SERVER}.json`,
  JSON.stringify({ meta: { source: `heropedia getHeroConfig / ${SERVER}`, extracted: new Date().toISOString() }, sets: compact }, null, 1),
);
console.log(`\nwrote _data/sets_lvl45_${SERVER}.json`);
