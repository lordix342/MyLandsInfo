// Builds calculator/js/army_template.js from one canonical army panel
// (army_5) and rewrites index.html to render all 7 panels from that template.

const HTML_PATH = "D:/MyLands/Quests/offline-mlkalk/calculator/index.html";
const OUT_JS = "D:/MyLands/Quests/offline-mlkalk/calculator/js/army_template.js";
const html = await Deno.readTextFile(HTML_PATH);

function sliceBetween(src: string, startNeedle: string, endNeedle: string): { start: number; end: number; text: string } {
  const start = src.indexOf(startNeedle);
  if (start < 0) throw new Error("missing start: " + startNeedle);
  const end = src.indexOf(endNeedle, start + startNeedle.length);
  if (end < 0) throw new Error("missing end: " + endNeedle);
  return { start, end, text: src.slice(start, end) };
}

const army5 = sliceBetween(html, '<div class="army" id="army_5">', '<div class="type_server"');
const settingsStart = html.indexOf('<div class="vkl_vukl_setting fon_hero_div" id="vkl_vukl_setting">');
if (settingsStart < 0) throw new Error("settings dialog not found");
let sd = 0;
let settingsEnd = -1;
for (let i = settingsStart; i < html.length; i++) {
  if (html.startsWith("<div", i)) sd++;
  if (html.startsWith("</div>", i)) {
    sd--;
    if (sd === 0) {
      settingsEnd = i + 6;
      break;
    }
  }
}
if (settingsEnd < 0) throw new Error("settings dialog not closed");
const settingsHtml = html.slice(settingsStart, settingsEnd);
const extras = sliceBetween(html, '<optgroup label="Руины">', '</select>');
// extras includes from ruins through leftover closing optgroups, up to </select>
// We only want the extra optgroups, not </select>.
const extrasHtml = extras.text.replace(/\s*<\/select>\s*$/, "");

function parameterize(raw: string, n: string): string {
  let s = raw;
  const reps: [RegExp, string][] = [
    [new RegExp(`unitu\\[${n}\\]`, "g"), "unitu[__N__]"],
    [new RegExp(`heroes\\[${n}\\]`, "g"), "heroes[__N__]"],
    [new RegExp(`select_shmotka_(\\d+)_${n}\\b`, "g"), "select_shmotka_$1___N__"],
    [new RegExp(`smotkisu_(\\d+)_(\\d+)_${n}\\b`, "g"), "smotkisu_$1_$2___N__"],
    [new RegExp(`\\bid=["']shmotka_(\\d+)_${n}["']`, "g"), 'id="shmotka_$1___N__"'],
    [new RegExp(`min_unitu_${n}_`, "g"), "min_unitu___N___"],
    [new RegExp(`unitu_${n}_`, "g"), "unitu___N___"],
    [new RegExp(`\\bid=["']unit_${n}_`, "g"), 'id="unit___N___'],
    [new RegExp(`\\bid=["']input_${n}_`, "g"), 'id="input___N___'],
    [new RegExp(`cleener_focus\\(["']input_${n}_`, "g"), 'cleener_focus("input___N___'],
    [new RegExp(`\\bid=["']lvl_${n}_`, "g"), 'id="lvl___N___'],
    [new RegExp(`\\bid=["']type_${n}["']`, "g"), 'id="type___N__"'],
    [new RegExp(`\\bid=["']red_${n}["']`, "g"), 'id="red___N__"'],
    [new RegExp(`\\bfor=["']red_${n}["']`, "g"), 'for="red___N__"'],
    [new RegExp(`\\bid=["']input_otst_${n}["']`, "g"), 'id="input_otst___N__"'],
    [new RegExp(`\\bid=["']clear_${n}["']`, "g"), 'id="clear___N__"'],
    [new RegExp(`\\bid=["']army_${n}["']`, "g"), 'id="army___N__"'],
    [new RegExp(`\\bid=["']hero_settings_${n}["']`, "g"), 'id="hero_settings___N__"'],
    [new RegExp(`\\bid=["']left_hero_settings_${n}["']`, "g"), 'id="left_hero_settings___N__"'],
    [new RegExp(`\\bid=["']creator_bonus_${n}["']`, "g"), 'id="creator_bonus___N__"'],
    [new RegExp(`\\bid=["']ysiloc_b_${n}["']`, "g"), 'id="ysiloc_b___N__"'],
    [new RegExp(`\\bid=["']n_b_${n}_`, "g"), 'id="n_b___N___'],
    [new RegExp(`\\bid=["']nn_b_${n}_`, "g"), 'id="nn_b___N___'],
    [new RegExp(`\\bid=["']vkl_vukl_hero_${n}["']`, "g"), 'id="vkl_vukl_hero___N__"'],
    [new RegExp(`\\bid=["']vkl_vukl_${n}["']`, "g"), 'id="vkl_vukl___N__"'],
    [new RegExp(`\\bfor=["']vkl_vukl_${n}["']`, "g"), 'for="vkl_vukl___N__"'],
    [new RegExp(`\\bid=["']magic_to_hero_select_${n}["']`, "g"), 'id="magic_to_hero_select___N__"'],
    [new RegExp(`\\bid=["']shtandart_${n}_`, "g"), 'id="shtandart___N___'],
    [new RegExp(`\\bid=["']litle_shtandart_${n}_`, "g"), 'id="litle_shtandart___N___'],
    [new RegExp(`\\bid=["']skils_(\\d+)_${n}["']`, "g"), 'id="skils_$1___N__"'],
    [new RegExp(`\\bid=["']hero_${n}["']`, "g"), 'id="hero___N__"'],
    [new RegExp(`see_hero_settings\\(${n},`, "g"), "see_hero_settings(__N__,"],
    [new RegExp(`cleen_hero\\(${n}\\)`, "g"), "cleen_hero(__N__)"],
    [new RegExp(`update_image_hero\\(${n}\\)`, "g"), "update_image_hero(__N__)"],
    [new RegExp(`update_hero_image\\(([^)]*?),\\s*${n}\\)`, "g"), "update_hero_image($1,__N__)"],
    [new RegExp(`vkl_rynu_label\\((\\d+),\\s*${n}\\)`, "g"), "vkl_rynu_label($1,__N__)"],
    [new RegExp(`vkl_alxim\\((\\d+),\\s*${n}\\)`, "g"), "vkl_alxim($1,__N__)"],
    [new RegExp(`vkl_old_dress\\((\\d+),\\s*${n}\\)`, "g"), "vkl_old_dress($1,__N__)"],
    [new RegExp(`hide_menu_rynu\\((\\d+),\\s*${n}\\)`, "g"), "hide_menu_rynu($1,__N__)"],
    [new RegExp(`сlear_menu_rynu\\((\\d+),\\s*${n}\\)`, "g"), "сlear_menu_rynu($1,__N__)"],
    [new RegExp(`update_art_list_hero\\(${n}\\)`, "g"), "update_art_list_hero(__N__)"],
    [new RegExp(`close_window_update_hero\\(${n}\\)`, "g"), "close_window_update_hero(__N__)"],
    [new RegExp(`change_8_lvl\\(${n},`, "g"), "change_8_lvl(__N__,"],
    [new RegExp(`change_one_lvl\\(${n},`, "g"), "change_one_lvl(__N__,"],
    [new RegExp(`go_back\\(${n}\\)`, "g"), "go_back(__N__)"],
    [new RegExp(`clear_all\\(${n}\\)`, "g"), "clear_all(__N__)"],
    [new RegExp(`get_num\\(${n},`, "g"), "get_num(__N__,"],
    [new RegExp(`change_one_input2\\(this,${n},`, "g"), "change_one_input2(this,__N__,"],
    [new RegExp(`se_info\\(${n},`, "g"), "se_info(__N__,"],
    [new RegExp(`change_lvl_skils\\(${n},`, "g"), "change_lvl_skils(__N__,"],
    [new RegExp(`do_show_div\\('creator_bonus_${n}'`, "g"), "do_show_div('creator_bonus___N__'"],
    [new RegExp(`do_show_div\\('magic_to_hero_select_${n}'`, "g"), "do_show_div('magic_to_hero_select___N__'"],
    [new RegExp(`data-num=["']${n}["']`, "g"), "data-num='__N__'"],
    [new RegExp(`(id|for)=["']([A-Za-z][\\w]*)_${n}(["'])`, "g"), '$1="$2___N__$3'],
    // Negative lookahead: slot index 5 on army_5 must not be rewritten twice
    // (shmotka_5_5 → shmotka_5___N__ → shmotka___N_____N__).
    [new RegExp(`(id|for)=["']([A-Za-z][\\w]*)_${n}_(?!__N__)`, "g"), '$1="$2___N___'],
  ];
  for (const [re, to] of reps) s = s.replace(re, to);
  s = s.replace(/\b(id|for)="([^"']+)'/g, '$1="$2"');
  return s;
}

let tpl = parameterize(army5.text, "5");
const leftover = [...tpl.matchAll(/\b(?:id|for)=["'][^"']*5[^"']*["']/g)].map((m) => m[0]);
const leftoverFn = [...tpl.matchAll(/(?:unitu|heroes)\[5\]|_[^_]*5["']|\(5,/g)].map((m) => m[0]);
console.log("leftover ids with 5:", leftover.slice(0, 30), "count", leftover.length);
console.log("leftover fn with 5:", leftoverFn.slice(0, 30), "count", leftoverFn.length);

tpl = tpl
  .replace(/<span><button class='load_one[\s\S]*?<span>/, "")
  .replace(/Защитник/g, "__TITLE__")
  .replace(/textbox_deffender/g, "__INPUT_CLASS__")
  .replace(/textbox_attacker/g, "__INPUT_CLASS__");

// Split KZ standards so attackers can omit them.
const kzMark = '<div class="standartKZ">';
const kzAt = tpl.lastIndexOf(kzMark);
if (kzAt < 0) throw new Error("standartKZ not found in army_5");
const afterKz = tpl.indexOf("</div>", kzAt);
// standartKZ wraps 3 children + itself; find the matching close by counting from kzAt
let depth = 0;
let kzEnd = -1;
for (let i = kzAt; i < tpl.length; i++) {
  if (tpl.startsWith("<div", i)) depth++;
  if (tpl.startsWith("</div>", i)) {
    depth--;
    if (depth === 0) {
      kzEnd = i + 6;
      break;
    }
  }
}
if (kzEnd < 0) throw new Error("could not close standartKZ");
const kzBlock = tpl.slice(kzAt, kzEnd);
tpl = tpl.slice(0, kzAt) + "__KZ_STANDARDS__" + tpl.slice(kzEnd);

// Faction extras go just before </select> of type___N__
tpl = tpl.replace(
  /(<\/optgroup>\s*)(<\/select>)/,
  "$1__FACTION_EXTRAS__$2",
);

// Settings dialog goes inside kastul_2, after units_levels
tpl = tpl.replace(
  /(<div class="units_levels">[\s\S]*?<\/div>)/,
  "$1\n__SETTINGS__",
);

function jsString(s: string): string {
  return JSON.stringify(s);
}

const runtime = `/* Generated army panel template. Do not edit by hand — rebuild with _build_army_template.ts */
(function (global) {
  var ARMY_TPL = ${jsString(tpl)};
  var FACTION_EXTRAS = ${jsString(extrasHtml)};
  var SETTINGS = ${jsString(settingsHtml)};
  var KZ_STANDARDS = ${jsString(kzBlock)};

  function fill(tpl, n, map) {
    var html = tpl.split("__N__").join(String(n));
    for (var k in map) {
      if (Object.prototype.hasOwnProperty.call(map, k)) {
        html = html.split(k).join(map[k]);
      }
    }
    return html;
  }

  function armyHtml(n, opt) {
    opt = opt || {};
    return fill(ARMY_TPL, n, {
      __TITLE__: opt.title || (opt.defender ? "Защитник" : "Атакующий"),
      __INPUT_CLASS__: opt.inputClass || (opt.defender ? "textbox_deffender" : "textbox_attacker"),
      __FACTION_EXTRAS__: opt.factionExtras ? FACTION_EXTRAS : "",
      __SETTINGS__: opt.settings ? SETTINGS : "",
      __KZ_STANDARDS__: opt.kzStandards ? KZ_STANDARDS : ""
    });
  }

  function toggleHtml(n, kind, kz) {
    var labelAdd = kind === "attacker" ? "Добавить атакующего" : "Добавить защитника";
    var labelDel = kind === "attacker" ? "Удалить атакующего" : "Удалить защитника";
    var wrap = kind === "attacker" ? "ots_attackers" : "ots";
    var addCls = kind === "attacker" ? "add_attacer" : "add_defender";
    var extra = kz ? " kz_show" : "";
    return (
      '<div class="' + wrap + '">' +
        '<div class="cursor_pointer" id="plus_army_' + n + '" onClick="onSee(' + n + ',1)">' +
          '<div class="' + addCls + '"><div class="plus' + extra + '"></div> ' + labelAdd + "</div></div>" +
        '<div class="cursor_pointer" id="delete_army_' + n + '" onClick="onSee(' + n + ',0)">' +
          '<div class="' + addCls + '"><div class="mines' + extra + '"></div> ' + labelDel + "</div></div>" +
      "</div>"
    );
  }

  function renderArmies() {
    var atk = document.getElementById("attackers-root");
    var def = document.getElementById("defenders-root");
    if (!atk || !def) return;
    atk.innerHTML =
      armyHtml(0, { defender: false, settings: true }) +
      toggleHtml(1, "attacker", false) +
      armyHtml(1, { defender: false }) +
      toggleHtml(6, "attacker", true) +
      armyHtml(6, { defender: false });
    def.innerHTML =
      armyHtml(2, { defender: true, factionExtras: true, kzStandards: true }) +
      toggleHtml(3, "defender", false) +
      armyHtml(3, { defender: true, factionExtras: true, kzStandards: true }) +
      toggleHtml(4, "defender", false) +
      armyHtml(4, { defender: true, factionExtras: true, kzStandards: true }) +
      toggleHtml(5, "defender", true) +
      armyHtml(5, { defender: true, kzStandards: true });
  }

  renderArmies();
  global.MLArmyTemplate = { renderArmies: renderArmies, armyHtml: armyHtml };
})(window);
`;

await Deno.writeTextFile(OUT_JS, runtime);
console.log("wrote", OUT_JS, "bytes", runtime.length);

const armor = sliceBetween(html, '<div id="armor_setting">', '<div class="army" id="army_2">');
const before = html.slice(0, html.indexOf('<div class="army" id="army_0">'));
const after = html.slice(html.indexOf('<div class="type_server"'));
const next = before +
  '<div id="attackers-root"></div>\n' +
  armor.text +
  '<div id="defenders-root"></div>\n' +
  after;

// Load the template script in the body, before the closing scripts would run.
// It must run as soon as the two roots exist, and before window.onload.
const withScript = next.replace(
  '<div id="attackers-root"></div>',
  '<div id="attackers-root"></div>\n<script src="js/army_template.js"></script>',
);

// Actually the script must run AFTER both roots exist. Place it after defenders-root.
const withScript2 = next.replace(
  '<div id="defenders-root"></div>',
  '<div id="defenders-root"></div>\n<script src="js/army_template.js"></script>',
);

await Deno.writeTextFile(HTML_PATH, withScript2);
console.log("rewrote index.html", html.length, "->", withScript2.length);
console.log("armor_setting kept:", armor.text.length, "chars");
