// Builds img/slots45.png: the artifact-picker frame with one extra row of cells.
// slots.png ships 6 rows x 9 cells (67px pitch) plus a plain tail where the
// "Снять / Закрыть" buttons sit. Level 4-5 sets push the grid to 7 rows, so the
// last cell band is duplicated once and the plain tail is kept below it.
import { Buffer } from "node:buffer";
import { PNG } from "npm:pngjs";

const SRC = "offline-mlkalk/calculator/img/slots.png";
const OUT = "offline-mlkalk/calculator/img/slots45.png";

const PITCH = 67; // vertical distance between cell rows
const GRID_END = 402; // first y after the 6th cell row
const EXTRA_ROWS = 1;

const src = PNG.sync.read(Buffer.from(await Deno.readFile(SRC)));
const tail = src.height - GRID_END;
const out = new PNG({
  width: src.width,
  height: GRID_END + EXTRA_ROWS * PITCH + tail,
});

function blit(srcY: number, dstY: number, rows: number) {
  for (let y = 0; y < rows; y++) {
    const from = ((srcY + y) * src.width) * 4;
    const to = ((dstY + y) * out.width) * 4;
    out.data.set(src.data.subarray(from, from + src.width * 4), to);
  }
}

blit(0, 0, GRID_END);
for (let i = 0; i < EXTRA_ROWS; i++) {
  blit(GRID_END - PITCH, GRID_END + i * PITCH, PITCH);
}
blit(GRID_END, GRID_END + EXTRA_ROWS * PITCH, tail);

const bytes = PNG.sync.write(out, { deflateLevel: 9 });
await Deno.writeFile(OUT, bytes);
console.log("wrote", OUT, out.width + "x" + out.height, bytes.byteLength);
