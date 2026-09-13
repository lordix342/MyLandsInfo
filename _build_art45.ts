import { Buffer } from "node:buffer";
import { PNG } from "npm:pngjs";

const SRC = "offline-mlkalk/calculator/img/ArtifactAssets.png";
const OUT = "offline-mlkalk/calculator/img/ArtifactSets45.png";

// heropedia display order -> calculator slot
// 0 BACK, 1 CHEST, 2 FINGER, 3 HEAD, 4 ITEM, 5 WEAPON, 6 LEGS,
// 7 NECK, 8 SHIELD, 9 THIGH, 10 WAIST, 11 WRIST
const OUR_TO_HERO = [3, 7, 2, 5, 1, 10, 6, 4, 8, 11, 9, 0];

const SETS: Record<string, number[][]> = {
  SNAKE: [[1924, 324], [1490, 323], [1552, 322], [498, 319], [188, 318], [374, 318], [560, 318], [622, 318], [684, 318], [746, 318], [808, 318], [870, 318]],
  WASP: [[1056, 312], [1118, 312], [1180, 312], [1242, 312], [1304, 312], [1366, 312], [1428, 312], [1614, 262], [1676, 262], [1738, 262], [1800, 262], [1862, 262]],
  MANDRAKE: [[1428, 498], [1614, 448], [1676, 448], [1738, 448], [1800, 448], [1862, 448], [1924, 448], [1490, 447], [1552, 446], [498, 443], [188, 442], [374, 442]],
  MAG: [[2, 503], [64, 503], [126, 503], [436, 503], [250, 502], [312, 502], [1056, 498], [1118, 498], [1180, 498], [1242, 498], [1304, 498], [1366, 498]],
  GHOST: [[808, 566], [870, 566], [932, 566], [994, 566], [2, 565], [64, 565], [126, 565], [436, 565], [250, 564], [312, 564], [1056, 560], [1118, 560]],
  MEDUZE: [[560, 442], [622, 442], [684, 442], [746, 442], [808, 442], [870, 442], [932, 442], [994, 442], [2, 441], [64, 441], [126, 441], [436, 441]],
  SPIDER: [[1242, 64], [1304, 64], [1366, 64], [1428, 64], [1614, 14], [1676, 14], [1738, 14], [1800, 14], [1862, 14], [1924, 14], [1490, 13], [1552, 12]],
  ARCHANGEL: [[932, 256], [994, 256], [2, 255], [64, 255], [126, 255], [436, 255], [250, 254], [312, 254], [1056, 250], [1118, 250], [1180, 250], [1242, 250]],
  ILFAR: [[1676, 138], [1738, 138], [1800, 138], [1862, 138], [1924, 138], [1490, 137], [1552, 136], [498, 133], [188, 132], [374, 132], [560, 132], [622, 132]],
  WIZARD: [[64, 7], [126, 7], [436, 7], [250, 6], [312, 6], [1056, 2], [1118, 2], [1180, 2], [1242, 2], [1304, 2], [1366, 2], [1428, 2]],
  DEATHKNIGHT: [[188, 194], [374, 194], [560, 194], [622, 194], [684, 194], [746, 194], [808, 194], [870, 194], [932, 194], [994, 194], [2, 193], [64, 193]],
  WATERDRAGON: [[498, 9], [188, 8], [374, 8], [560, 8], [622, 8], [684, 8], [746, 8], [808, 8], [870, 8], [932, 8], [994, 8], [2, 7]],
  MINOTAUR: [[1924, 76], [1490, 75], [1552, 74], [498, 71], [188, 70], [374, 70], [560, 70], [622, 70], [684, 70], [746, 70], [808, 70], [870, 70]],
  // From assets.*.json / ArtifactAssets atlas:
  // shared/artifacts/4/musketer/{back,wear,ring,helmet,item,weapon,footwear,necklace,weapon_offhand,thigh,belt,wrist}.png
  MUSKETER: [[436, 441], [250, 440], [312, 440], [1056, 436], [1118, 436], [1180, 436], [1242, 436], [1304, 436], [1366, 436], [1428, 436], [1614, 386], [1676, 386]],
};

const ORDER = [
  "SNAKE", "WASP", "MANDRAKE", "MAG", "GHOST", "MEDUZE",
  "SPIDER", "ARCHANGEL", "ILFAR", "WIZARD", "DEATHKNIGHT", "WATERDRAGON", "MINOTAUR",
  "MUSKETER",
];

const TILE = 50;
const SRC_TILE = 60;
const sheet = PNG.sync.read(Buffer.from(await Deno.readFile(SRC)));
const atlas = new PNG({ width: 12 * TILE, height: ORDER.length * TILE });

function sample(sx: number, sy: number) {
  const x = Math.max(0, Math.min(sheet.width - 1, Math.round(sx)));
  const y = Math.max(0, Math.min(sheet.height - 1, Math.round(sy)));
  const i = (y * sheet.width + x) * 4;
  return sheet.data.subarray(i, i + 4);
}

for (let row = 0; row < ORDER.length; row++) {
  const hero = SETS[ORDER[row]];
  for (let our = 0; our < 12; our++) {
    const [hx, hy] = hero[OUR_TO_HERO[our]];
    const dx = our * TILE;
    const dy = row * TILE;
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        const px = hx + (x + 0.5) * SRC_TILE / TILE;
        const py = hy + (y + 0.5) * SRC_TILE / TILE;
        const di = ((dy + y) * atlas.width + (dx + x)) * 4;
        atlas.data.set(sample(px, py), di);
      }
    }
  }
}

const out = PNG.sync.write(atlas, { deflateLevel: 9 });
await Deno.writeFile(OUT, out);
console.log("wrote", OUT, atlas.width, atlas.height, out.byteLength);
