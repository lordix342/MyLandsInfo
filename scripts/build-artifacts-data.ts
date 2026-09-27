// Builds offline-mlkalk/artifacts_data.js for artifacts.html.
// Prices: _data/heroconfig_MILITARY.json (+ HEROIC to mark server-specific sets).
// Names/sets: mlgame_artifact_sets.json. Pictures: ru.mlgame.org/shared/artifacts/...
// Effects: _archive_mlkalk/arts_php_2026.html (Wayback copy of mlkalk.site/arts.php)
// and the calculator's lvl45_sets.js for the level 4-5 racial sets missing there.
// Run: deno run --allow-read --allow-write --allow-net scripts/build-artifacts-data.ts [--no-download]

type Obj = Record<string, unknown>;

const SITE = "offline-mlkalk";
const ART_DIR = `${SITE}/wp-content/assets/shared/artifacts`;
const REMOTE = "https://ru.mlgame.org/shared/artifacts/";
const DOWNLOAD = !Deno.args.includes("--no-download");

const SLOTS = ["HEAD", "NECK", "FINGER", "LEFT_HAND", "CHEST", "WAIST", "LEGS", "ITEM", "RIGHT_HAND", "WRIST", "THIGH", "BACK"];

// ArtifactSets45.png: 50px tiles, columns follow SLOTS, rows follow this list.
const SPRITE45 = ["SNAKE", "WASP", "MANDRAKE", "MAG", "GHOST", "MEDUZE", "SPIDER", "ARCHANGEL", "ILFAR", "WIZARD", "DEATHKNIGHT", "WATERDRAGON", "MINOTAUR", "MUSKETER"];

const FILE_CAND: Record<string, string[]> = {
  HEAD: ["helmet", "head"],
  NECK: ["necklace", "neck"],
  FINGER: ["ring", "finger"],
  CHEST: ["wear", "torso", "chest"],
  WAIST: ["belt", "waist"],
  LEGS: ["footwear", "feet", "legs"],
  ITEM: ["item", "artefact"],
  BACK: ["back"],
  THIGH: ["thigh"],
  WRIST: ["wrist"],
  LEFT_HAND: ["weapon", "left_hand"],
  RIGHT_HAND: ["shield", "weapon_offhand", "right_hand"],
};
const SET_DIR: Record<string, string> = { ROYAL: "king" };

function collect(file: string) {
  const root = JSON.parse(Deno.readTextFileSync(file));
  const byId = new Map<string, Obj>();
  const arts: Obj[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) { for (const x of v) walk(x); return; }
    if (!v || typeof v !== "object") return;
    const o = v as Obj;
    if (typeof o["@id"] === "string") byId.set(o["@id"] as string, o);
    if (o["@c"] === "game.model.heroes.artifacts.ArtifactDeclaration") arts.push(o);
    for (const k in o) walk(o[k]);
  };
  walk(root);
  const deref = (x: unknown) => {
    const o = x as Obj | null;
    return o && typeof o["@ref"] === "string" ? byId.get(o["@ref"] as string) ?? null : o;
  };
  const out = new Map<string, { level: number; part: string; twoHanded: boolean; pearl: number; buyOut: number }>();
  for (const a of arts) {
    const part = Array.isArray(a.part) ? String(a.part[1]) : String(a.part);
    out.set(String(a.name), {
      level: Number(a.level),
      part,
      twoHanded: a.twoHanded === true,
      pearl: Number((deref(a.cost) as Obj | null)?.pearl ?? 0),
      buyOut: Number((deref(a.buyOutCost) as Obj | null)?.pearl ?? 0),
    });
  }
  return out;
}

async function exists(url: string) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { method: "HEAD" });
      await r.body?.cancel();
      return r.status === 200 && (r.headers.get("content-type") ?? "").startsWith("image");
    } catch { /* retry */ }
  }
  return false;
}

async function fileExists(p: string) {
  try { await Deno.stat(p); return true; } catch { return false; }
}

async function pool<T>(items: T[], n: number, fn: (x: T) => Promise<void>) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) await fn(items[i++]);
  }));
}

const military = collect("_data/heroconfig_MILITARY.json");
const heroic = collect("_data/heroconfig_HEROIC.json");
const meta = JSON.parse(Deno.readTextFileSync("mlgame_artifact_sets.json"));
const texts = meta.texts as Record<string, string>;

const setOrder: { key: string; level: number; codes: string[] }[] = [];
for (const [key, s] of Object.entries(meta.sets) as [string, { level: number; artifacts: string[] }][]) {
  setOrder.push({ key, level: s.level, codes: s.artifacts });
}
const known = new Set(setOrder.flatMap((s) => s.codes));
const orphans = new Map<string, string[]>();
for (const code of military.keys()) {
  if (known.has(code)) continue;
  const key = code.replace(/\d_.*$/, "");
  if (!orphans.has(key)) orphans.set(key, []);
  orphans.get(key)!.push(code);
}
for (const [key, codes] of orphans) {
  setOrder.push({ key, level: military.get(codes[0])!.level, codes });
}

type Fx = { n?: string[]; a?: string[]; p?: string[]; up?: string };
type Item = { slot: string; code: string; name: string; twoHanded?: 1; sell: number; ancient: number; img?: string; fx?: Fx };
type SetOut = { key: string; name: string; level: number; servers?: string; sprite?: number; fx?: string[]; items: Item[] };

const ASSETS = `${SITE}/wp-content/assets/`;
const REMOTE_ROOT = "https://ru.mlgame.org/";
const icons = new Set<string>();

function norm(s: string) {
  return s.toLowerCase().replace(/e/g, "е").replace(/\s+/g, " ").trim();
}

function lev(a: string, b: string) {
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0];
    d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = d[j];
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return d[b.length];
}

function toLines(fragment: string) {
  const s = fragment
    .replace(/\s+/g, " ")
    .replace(/Предназначен\s+для[^<]*/g, "")
    .replace(/<span\s+style='color:green;font-weight:bold;'>([\s\S]*?)<\/span>/g, "<b class='up'>$1</b>")
    .replace(/<span\s+style='color:(?:red|rgb\(255, 0, 0\));font-weight:bold;'>([\s\S]*?)<\/span>/g, "<b class='dn'>$1</b>")
    .replace(/<img\s+src='[^']*\/wp-content\/assets\/([^']+)'\s*\/?>/g, (_, p: string) => {
      icons.add(p);
      return `[[${p}]]`;
    })
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<(?!\/?b\b|img\b)[^>]+>/g, "");
  return s.split("\n").map((l) => l.replace(/\s+/g, " ").replace(/\s+([,.)])/g, "$1").trim()).filter(Boolean);
}

function parseArchive(file: string) {
  const html = Deno.readTextFileSync(file);
  const sets = new Map<string, { fx: string[]; items: Map<string, Fx> }>();
  let cur: { fx: string[]; items: Map<string, Fx> } | null = null;
  for (const row of html.split(/<tr[^>]*>/).slice(1)) {
    const setTd = row.match(/<td class='set'>\s*<h3>([^<]+)<\/h3>[\s\S]*?<\/td>/);
    if (setTd) {
      const body = setTd[0].replace(/<span\s+class='sell-cost'>[\s\S]*?<\/span>/g, "");
      const head = body.match(/Эффекты\s+сета\s*<\/span>/);
      cur = { fx: head ? toLines(body.slice(head.index! + head[0].length)) : [], items: new Map() };
      sets.set(norm(setTd[1]), cur);
    }
    if (!cur) continue;
    for (const m of row.matchAll(/<td class='artifact'>([\s\S]*?)<\/td>/g)) {
      const name = m[1].match(/<h3>([^<]+?)\s*\[\d+ ур\]<\/h3>/);
      if (!name) continue;
      let body = m[1].slice(m[1].indexOf("</h3>") + 5);
      const upM = body.match(/<span\s+class='sell-cost game-res-str'>\s*Стоимость\s+улучшения:([\s\S]*?)<\/span>/);
      body = body.replace(/<span\s+class='sell-cost[^']*'>[\s\S]*?<\/span>/g, "");
      const parts = body.split(/<span\s+class='subtitle'[^>]*>([\s\S]*?)<\/span>/);
      const fx: Fx = {};
      for (let k = 1; k < parts.length; k += 2) {
        const title = parts[k].replace(/\s+/g, " ").trim();
        const lines = toLines(parts[k + 1] ?? "");
        const key = title.startsWith("Эффекты древнего") ? "a" : title.startsWith("Эффекты совершенного") ? "p" : "n";
        if (lines.length) fx[key] = lines;
      }
      if (upM) fx.up = toLines(upM[1]).join(" ").replace(/(\d+)x\s*/g, "$1×");
      cur.items.set(norm(name[1]), fx);
    }
  }
  return sets;
}

function calcLines(title: string | undefined, skipFirst: boolean) {
  if (!title) return [];
  const lines = title.split("\n");
  if (skipFirst) lines.shift();
  return lines
    .map((l) => ({ sub: /^\s{2,}/.test(l), t: l.trim() }))
    .filter((l) => l.t)
    .map((l) => {
      const esc = l.t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const html = esc.replace(/([+\-]?\d[\d.,]*%?(?:\/час)?)/g, "<b>$1</b>");
      return l.sub ? `<span class='sub'>${html}</span>` : html;
    });
}

const archive = parseArchive("_archive_mlkalk/arts_php_2026.html");
const calc45 = JSON.parse(
  Deno.readTextFileSync(`${SITE}/calculator/js/lvl45_sets.js`).split("\n")[1]
    .replace(/^window\.MLKalkLvl45Data = /, "").replace(/;\s*$/, ""),
);
const calcSets = new Map<string, { slots: { title: string; oldTitle: string }[]; setTitle?: string }>();
for (const s of calc45.sets) calcSets.set(s.key, s);
for (const p of calc45.legacySetPatches ?? []) calcSets.set(p.key, p);

const sets: SetOut[] = [];
const probes: { set: SetOut; item: Item; dir: string }[] = [];

for (const s of setOrder) {
  const base = s.codes.filter((c) => !c.endsWith("_ANCIENT"));
  const inMil = base.some((c) => military.has(c));
  const inHer = base.some((c) => heroic.has(c));
  const set: SetOut = {
    key: s.key,
    name: texts[`SET_${s.key}_NAME`] ?? s.key,
    level: s.level,
    items: [],
  };
  if (inMil !== inHer) set.servers = inMil ? "MILITARY" : "HEROIC";
  const spriteRow = SPRITE45.indexOf(s.key);
  if (spriteRow >= 0) set.sprite = spriteRow;
  for (const code of base) {
    const a = military.get(code) ?? heroic.get(code);
    if (!a) continue;
    const anc = military.get(code + "_ANCIENT") ?? heroic.get(code + "_ANCIENT");
    const item: Item = {
      slot: a.part,
      code,
      name: texts[`ARTIFACT_${code}`] ?? code,
      sell: a.pearl,
      ancient: anc ? anc.pearl : 0,
    };
    if (a.twoHanded) item.twoHanded = 1;
    set.items.push(item);
    if (spriteRow < 0) probes.push({ set, item, dir: `${s.level}/${SET_DIR[s.key] ?? s.key.toLowerCase()}` });
  }
  set.items.sort((x, y) => SLOTS.indexOf(x.slot) - SLOTS.indexOf(y.slot));
  attachEffects(set);
  sets.push(set);
}

function attachEffects(set: SetOut) {
  const arch = archive.get(norm(set.name));
  const calc = calcSets.get(set.key);
  if (arch) {
    if (arch.fx.length) set.fx = arch.fx;
    for (const it of set.items) {
      const key = norm(it.name);
      let fx = arch.items.get(key);
      if (!fx) {
        let best = 3;
        for (const [k, v] of arch.items) {
          const d = lev(k, key);
          if (d < best) { best = d; fx = v; }
        }
      }
      if (fx) it.fx = fx;
    }
  } else if (calc) {
    const setFx = calcLines(calc.setTitle, false);
    if (setFx.length) set.fx = setFx;
    for (const it of set.items) {
      const slot = calc.slots.find((s) => s && norm(s.title.split("\n")[0]) === norm(it.name)) ??
        calc.slots[SLOTS.indexOf(it.slot)];
      if (!slot) continue;
      const fx: Fx = {};
      const n = calcLines(slot.title, true);
      const a = calcLines(slot.oldTitle, true);
      if (n.length) fx.n = n;
      if (a.length) fx.a = a;
      it.fx = fx;
    }
  }
}

await pool([...icons], 6, async (p) => {
  const local = ASSETS + p;
  if (await fileExists(local)) return;
  if (!DOWNLOAD || !(await exists(REMOTE_ROOT + p))) return;
  const r = await fetch(REMOTE_ROOT + p);
  await Deno.mkdir(local.replace(/\/[^/]+$/, ""), { recursive: true });
  await Deno.writeFile(local, new Uint8Array(await r.arrayBuffer()));
});
const missingIcons: string[] = [];
for (const p of icons) if (!(await fileExists(ASSETS + p))) missingIcons.push(p);

let downloaded = 0;
await pool(probes, 12, async ({ item, dir }) => {
  for (const f of FILE_CAND[item.slot] ?? []) {
    const rel = `${dir}/${f}.png`;
    const local = `${ART_DIR}/${rel}`;
    if (await fileExists(local)) { item.img = rel; return; }
    if (!DOWNLOAD) continue;
    if (!(await exists(REMOTE + rel))) continue;
    const r = await fetch(REMOTE + rel);
    const bytes = new Uint8Array(await r.arrayBuffer());
    await Deno.mkdir(`${ART_DIR}/${dir}`, { recursive: true });
    await Deno.writeFile(local, bytes);
    downloaded++;
    item.img = rel;
    return;
  }
});

sets.sort((a, b) => a.level - b.level || setOrder.findIndex((s) => s.key === a.key) - setOrder.findIndex((s) => s.key === b.key));

const total = sets.reduce((n, s) => n + s.items.length, 0);
const noImg = sets.flatMap((s) => s.sprite != null ? [] : s.items.filter((i) => !i.img).map((i) => i.code));
const payload = { source: "heroconfig (MILITARY/HEROIC)", generated: new Date().toISOString().slice(0, 10), sets };
await Deno.writeTextFile(`${SITE}/artifacts_data.js`, "window.ML_ARTIFACTS = " + JSON.stringify(payload) + ";\n");

console.log(`sets ${sets.length}, artifacts ${total}, downloaded ${downloaded}, without picture ${noImg.length}`);
const noFx = sets.flatMap((s) => s.items.filter((i) => !i.fx?.n).map((i) => `${s.key}:${i.name}`));
console.log(`without effects ${noFx.length}: ${noFx.join(", ")}`);
console.log(`sets without set effects: ${sets.filter((s) => !s.fx).map((s) => s.key).join(" ")}`);
console.log(`icons ${icons.size}, missing: ${missingIcons.join(" ") || "none"}`);
const elven = sets.find((s) => s.key === "ELVEN")!;
console.log("ELVEN sell sum", elven.items.reduce((n, i) => n + i.sell, 0), "ancient sum", elven.items.reduce((n, i) => n + i.ancient, 0), "slots", elven.items.map((i) => i.slot).join(","));
