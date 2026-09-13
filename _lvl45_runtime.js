(function () {
  var data = window.MLKalkLvl45Data;
  if (!data || !data.sets) return;

  var RACE_TYPE = {
    HUMAN: 0,
    ELF: 1,
    DEMON: 2,
    DROW: 3,
    MONSTER: 4,
    UNDEAD: 5,
    WIZARD: 6,
    CHIMERA: 7
  };

  // bonusu lane order for unit types: 0 scavenger, 1 warrior, 2 cavalry,
  // 3 flyer, 4 ranger, 5 healer, 6 mercenary, 7 mage.
  var UNIT_LANES = {
    SCAVENGER: [0],
    MELEE: [1],
    CAVALRY: [2],
    FLYER: [3],
    FLYING: [3],
    RANGER: [4],
    HEALER: [5],
    MINER: [6],
    MERCENARY: [6],
    MAGE: [7]
  };
  var ALL_LANES = [0, 1, 2, 3, 4, 5, 6, 7];

  function isArr(v) {
    return Object.prototype.toString.call(v) === "[object Array]";
  }

  function raceAllowed(list, race) {
    if (!list || !list.length) return true;
    for (var i = 0; i < list.length; i++) {
      if (RACE_TYPE[list[i]] === race) return true;
    }
    return false;
  }

  // Estate conditions map onto the two location switches the calculator has:
  // "на озере" covers salt lake and grail, "КЗ" covers the clan castle. Ruins
  // carry no combat effects, so they never gate a bonus lane.
  function estateAllowed(list) {
    if (!list || !list.length) return true;
    for (var i = 0; i < list.length; i++) {
      var t = list[i];
      if ((t === "LAKE" || t === "GRAIL") && window.othero === true) return true;
      if (t === "CASTLE" && window.kz === true) return true;
    }
    return false;
  }

  // "В подмоге" means the artifact owner is one of the assisting defenders;
  // armies 1 and 6 are a joint attack, not an assistance mission.
  function posAllowed(pos, unit) {
    if (pos !== "ASSIST") return true;
    return unit.number >= 3 && unit.number <= 5;
  }

  // Terrain, estate and race conditions are checked against the artifact owner,
  // never against the unit the buff lands on.
  function effectAllowed(ctxUnit, effect) {
    if (typeof effect.terrain === "number" && typeof window.teretory === "number") {
      if (window.teretory !== effect.terrain) return false;
    }
    if (!ctxUnit) return false;
    if (!estateAllowed(effect.estates)) return false;
    if (!posAllowed(effect.pos, ctxUnit)) return false;
    if (!raceAllowed(effect.myRaces, ctxUnit.type)) return false;
    if (!raceAllowed(effect.againstRaces, ctxUnit.type_vrag)) return false;
    return true;
  }

  function sideOf(unit) {
    return (unit.number < 2 || unit.number === 6) ? [0, 1, 6] : [2, 3, 4, 5];
  }

  function otherSideOf(unit) {
    return (unit.number < 2 || unit.number === 6) ? [2, 3, 4, 5] : [0, 1, 6];
  }

  function pick(indexes, skip) {
    var out = [];
    for (var i = 0; i < indexes.length; i++) {
      var u = window.unitu && window.unitu[indexes[i]];
      if (u && u !== skip) out.push(u);
    }
    return out;
  }

  function recipients(ctxUnit, target) {
    if (target === "ENEMY") return pick(otherSideOf(ctxUnit));
    if (target === "ALLY") return pick(sideOf(ctxUnit), ctxUnit);
    if (target === "SELF,ALLY") return pick(sideOf(ctxUnit));
    if (target === "SELF,ALLY,ENEMY") {
      return pick(sideOf(ctxUnit)).concat(pick(otherSideOf(ctxUnit)));
    }
    return [ctxUnit];
  }

  // Values already arrive in calculator units (percent points or flat points).
  function addToLanes(unit, effect) {
    if (!unit || !unit.bonusu) return;
    var value = effect.value;
    var lanes = effect.unitType ? (UNIT_LANES[effect.unitType] || ALL_LANES) : ALL_LANES;
    var b = effect.buffType;
    var i;
    if (b === "ATTACK_BONUS") {
      for (i = 0; i < lanes.length; i++) unit.bonusu[8 + lanes[i]] += value;
    } else if (b === "DEFENSE_BONUS") {
      for (i = 0; i < lanes.length; i++) unit.bonusu[lanes[i]] += value;
    } else if (b === "HEALTH_BONUS") {
      for (i = 0; i < lanes.length; i++) unit.bonusu[16 + lanes[i]] += value;
    } else if (b === "PERSECUTION_BONUS") {
      // Persecution lanes 40..43 cover warriors, cavalry, flyers and rangers.
      for (i = 0; i < lanes.length; i++) {
        if (lanes[i] >= 1 && lanes[i] <= 4) unit.bonusu[39 + lanes[i]] += value;
      }
    } else if (b === "HEALING_BONUS") {
      unit.bonusu[25] += value;
    } else if (b === "INCREASE_MAX_DEFENCE") {
      unit.bonusu[24] += value;
    } else if (b === "MAGES_SUPPRESS_ATTACK") {
      unit.bonusu[29] += value;
    } else if (b === "NECROMANCY_FROM_SELF") {
      unit.bonusu[31] += value;
    } else if (b === "NECROMANCY_FROM_ALLIES") {
      unit.bonusu[32] += value;
    } else if (b === "NECROMANCY_FROM_ENEMIES") {
      unit.bonusu[33] += value;
    } else if (b === "CREMATION") {
      unit.bonusu[26] += value;
    } else if (b === "HERO_EXPERIENCE") {
      unit.bonusu[34] += value;
    } else if (b === "ADDITIONAL_ATTACK") {
      // Flat damage the hero adds in every round ("бонусный левый дамаг").
      unit.bonusu[36] += value;
    } else if (b === "ADDITIONAL_ATTACK_MULTIPLIER") {
      // "Усиление атаки войска" multiplies damage after the per-type attack
      // bonus, so it rides on yselenit_damag rather than an attack lane.
      unit.mlAmplify = (unit.mlAmplify || 0) + value;
    } else if (b === "MIN_ATTACK") {
      // Min/max damage have no bonus lane; they ride on nanas_damag below.
      unit.mlMinAttack = (unit.mlMinAttack || 0) + value;
    } else if (b === "MAX_ATTACK") {
      unit.mlMaxAttack = (unit.mlMaxAttack || 0) + value;
    } else if (b === "PARTIAL_RETREAT") {
      // Does not stack with itself, the strongest one wins.
      if (value > unit.bonusu[35]) unit.bonusu[35] = value;
    }
  }

  function applyOne(ctxUnit, effect) {
    var targets = recipients(ctxUnit, effect.target);
    for (var i = 0; i < targets.length; i++) addToLanes(targets[i], effect);
  }

  // MIN_ATTACK / MAX_ATTACK change how likely a unit is to roll the low or the
  // high end of its damage range, so they shift the roll inside [min, max]
  // instead of moving the bounds. The "минимум"/"максимум" damage modes show the
  // extremes on purpose and stay untouched.
  if (window.Units && Units.prototype.nanas_damag) {
    var origNull = Units.prototype.null_bonusu;
    Units.prototype.null_bonusu = function () {
      origNull.call(this);
      this.mlMinAttack = 0;
      this.mlMaxAttack = 0;
      this.mlAmplify = 0;
    };

    // "Усиление атаки войска" already has a slot the engine understands, but it
    // doubles as a user input field, so borrow it for the duration of the call
    // instead of writing artifact values into it permanently.
    var origDamagAll = Units.prototype.nanas_damag_all;
    Units.prototype.nanas_damag_all = function (mm) {
      var extra = this.mlAmplify || 0;
      if (!extra) return origDamagAll.call(this, mm);
      var saved = this.yselenit_damag;
      this.yselenit_damag = (saved || 0) + extra;
      try {
        return origDamagAll.call(this, mm);
      } finally {
        this.yselenit_damag = saved;
      }
    };

    var origDamag = Units.prototype.nanas_damag;
    Units.prototype.nanas_damag = function (num_unt, mm) {
      var base = origDamag.call(this, num_unt, mm);
      if (mm !== 2 && mm !== 3) return base;
      var shift = ((this.mlMaxAttack || 0) - (this.mlMinAttack || 0)) / 100;
      if (!shift) return base;
      var end = origDamag.call(this, num_unt, shift > 0 ? 1 : 0);
      var k = Math.min(Math.abs(shift), 1);
      return base + k * (end - base);
    };
  }

  var prevApply = window.MLKalkApplyCustomSetEffect;
  window.MLKalkApplyCustomSetEffect = function (ctxUnit, bonusId) {
    var list = data.effects[bonusId];
    if (!list) {
      return typeof prevApply === "function" ? prevApply(ctxUnit, bonusId) : false;
    }
    for (var i = 0; i < list.length; i++) {
      if (!effectAllowed(ctxUnit, list[i])) continue;
      applyOne(ctxUnit, list[i]);
    }
    return true;
  };

  if (!isArr(window.db_bonuses)) return;
  if (!isArr(window.db_dress)) return;

  function stubRow() {
    return [
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, -1, -1, 0,
      0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0
    ];
  }

  var start = window.db_dress.length;
  var ids = [];
  var s;
  for (s = 0; s < data.sets.length; s++) {
    var set = data.sets[s];
    var row = [];
    var old = [];
    var slot;
    for (slot = 0; slot < 12; slot++) {
      var piece = set.slots[slot];
      var id = piece.bonusId;
      var oid = piece.oldBonusId;
      if (id && !window.db_bonuses[id]) window.db_bonuses[id] = stubRow();
      if (oid && !window.db_bonuses[oid]) window.db_bonuses[oid] = stubRow();
      row.push([piece.title, id, id ? 0 : 1, 0]);
      old.push([piece.oldTitle, oid, oid ? 0 : 1, 0]);
    }
    if (set.setBonusId && !window.db_bonuses[set.setBonusId]) window.db_bonuses[set.setBonusId] = stubRow();
    if (set.oldSetBonusId && !window.db_bonuses[set.oldSetBonusId]) window.db_bonuses[set.oldSetBonusId] = stubRow();
    row.push([set.setTitle, set.setBonusId, 0, 0]);
    row.push([set.name + (set.race ? " [" + set.race + "]" : "")]);
    old.push([set.oldSetTitle, set.oldSetBonusId, 0, 0]);
    old.push([set.name + " (древний)"]);
    var idx = start + s;
    window.db_dress[idx] = row;
    if (isArr(window.db_dress_old)) window.db_dress_old[idx] = old;
    if (isArr(window.db_lvl_dress)) window.db_lvl_dress[idx] = set.level;
    ids.push(idx);
  }

  var ART45 = "url('img/ArtifactSets45.png?2')";

  function artBg(idx, slot, size) {
    var row = idx - start;
    if (row < 0) return "";
    size = size || 50;
    if (size === 50) {
      return ART45 + " no-repeat -" + (slot * 50) + "px -" + (row * 50) + "px";
    }
    var scale = size / 50;
    return ART45 + " no-repeat -" + (slot * 50 * scale) + "px -" + (row * 50 * scale) +
      "px / " + (12 * 50 * scale) + "px " + (ids.length * 50 * scale) + "px";
  }

  function paintSlot(el, idx, slot, size) {
    if (!el) return;
    el.style.background = artBg(idx, slot, size);
    el.style.backgroundColor = "transparent";
  }

  function setLevel(idx) {
    return (window.db_lvl_dress && window.db_lvl_dress[idx]) || 99;
  }

  function parseSetId(el, kind) {
    if (!el || !el.id) return -1;
    var p = el.id.split("_");
    if (kind === "icon") return Number(p[1]);
    if (kind === "name") return Number(p[3]);
    return -1;
  }

  function insertByLevel(parent, node, idx, selector, kind) {
    var lv = setLevel(idx);
    var nodes = parent.querySelectorAll(selector);
    var last = null;
    var i;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === node) continue;
      var other = parseSetId(nodes[i], kind);
      if (!(other >= 0)) continue;
      var olv = setLevel(other);
      if (olv < lv || (olv === lv && other < idx)) last = nodes[i];
    }
    var ref = last ? last.nextSibling : null;
    // Skip the newline text nodes that sit between the stock icons; those
    // spaces are what keep the original 67px cell pitch.
    while (ref && ref.nodeType === 3) ref = ref.nextSibling;
    if (!ref) {
      ref = parent.querySelector("br") || parent.querySelector("button");
    }
    if (ref) parent.insertBefore(node, ref);
    else parent.appendChild(node);
  }

  // Stock icons are 50px tiles with a 13px margin plus a ~4px HTML space, so
  // they land on the 67px cells of slots45.png. JS-created tiles have no
  // space, so they drift. Snap every visible tile onto that grid.
  function layoutPicker(picker) {
    if (!picker) return;
    var COLS = 9;
    var PITCH = 67;
    var LEFT = 13;
    var TOP = 13;
    var tiles = picker.querySelectorAll(".smotkisu");
    var n = 0;
    var i;
    for (i = 0; i < tiles.length; i++) {
      var el = tiles[i];
      if (el.style.display === "none") continue;
      el.style.position = "absolute";
      el.style.margin = "0";
      el.style.left = (LEFT + (n % COLS) * PITCH) + "px";
      el.style.top = (TOP + Math.floor(n / COLS) * PITCH) + "px";
      n += 1;
    }
    var btns = picker.querySelectorAll("button");
    for (i = 0; i < btns.length; i++) {
      btns[i].style.position = "absolute";
      btns[i].style.top = "auto";
      btns[i].style.bottom = "8px";
      btns[i].style.left = (i === 0 ? "12px" : "95px");
    }
  }

  function injectUi() {
    var armies = [0, 1, 2, 3, 4, 5, 6];
    var a;
    var ordered = ids.slice().sort(function (a, b) {
      var d = setLevel(a) - setLevel(b);
      return d !== 0 ? d : a - b;
    });
    for (a = 0; a < armies.length; a++) {
      var n = armies[a];
      var list = document.getElementById("complect_dres_" + n);
      var dressBox = document.getElementById("div_all_dress_litle_" + n);
      var i;
      for (i = 0; i < ordered.length; i++) {
        var idx = ordered[i];
        if (list && !document.getElementById("name_select_dress_" + idx + "_" + n)) {
          var name = document.createElement("div");
          name.className = "name_select_dress";
          name.id = "name_select_dress_" + idx + "_" + n;
          name.setAttribute("onclick", "heroes[" + n + "].to_dress(" + idx + ")");
          name.textContent = window.db_dress[idx][13];
          name.title = window.db_dress[idx][12][0];
          insertByLevel(list, name, idx, ".name_select_dress", "name");
        }
        var slot;
        for (slot = 0; slot < 12; slot++) {
          var picker = document.getElementById("select_shmotka_" + slot + "_" + n);
          if (picker && !document.getElementById("smotkisu_" + idx + "_" + slot + "_" + n)) {
            var icon = document.createElement("div");
            icon.className = "smotkisu";
            icon.id = "smotkisu_" + idx + "_" + slot + "_" + n;
            icon.setAttribute("onclick", "heroes[" + n + "].to_dress_one(" + slot + "," + idx + ")");
            icon.title = window.db_dress[idx][slot][0];
            paintSlot(icon, idx, slot, 50);
            insertByLevel(picker, icon, idx, ".smotkisu", "icon");
          }
          if (dressBox && !document.getElementById("litle_dress_" + n + "_" + idx + "_" + slot)) {
            var mini = document.createElement("div");
            mini.className = "litle_dress litle_dress_" + n + "_" + slot;
            mini.id = "litle_dress_" + n + "_" + idx + "_" + slot;
            mini.setAttribute("onclick", "clear_one_mini_dress(" + n + "," + idx + "," + slot + ")");
            mini.style.display = "none";
            paintSlot(mini, idx, slot, 22);
            dressBox.appendChild(mini);
          }
        }
      }
      for (slot = 0; slot < 12; slot++) {
        layoutPicker(document.getElementById("select_shmotka_" + slot + "_" + n));
      }
    }
    if (window.MLKalkAncientRunes && typeof window.MLKalkAncientRunes.inject === "function") {
      window.MLKalkAncientRunes.inject();
    }
  }

  var origOne = window.Heroes && Heroes.prototype.create_list_dress_one;
  if (origOne) {
    Heroes.prototype.create_list_dress_one = function (num_dress) {
      origOne.call(this, num_dress);
      var i;
      for (i = 0; i < ids.length; i++) {
        var el = document.getElementById("smotkisu_" + ids[i] + "_" + num_dress + "_" + this.number);
        if (el) {
          el.title = window.db_dress[ids[i]][num_dress][0];
          paintSlot(el, ids[i], num_dress, 50);
        }
      }
    };
  }

  var origAll = window.Heroes && Heroes.prototype.create_dress;
  if (origAll) {
    Heroes.prototype.create_dress = function () {
      origAll.call(this);
      var i;
      for (i = 0; i < ids.length; i++) {
        var el = document.getElementById("name_select_dress_" + ids[i] + "_" + this.number);
        if (el) {
          el.innerHTML = "<div class='plus'></div> " + window.db_dress[ids[i]][13];
          el.title = window.db_dress[ids[i]][12][0];
        }
      }
    };
  }

  var origWear = window.Heroes && Heroes.prototype.to_dress_one;
  if (origWear) {
    Heroes.prototype.to_dress_one = function (num_dress, num) {
      origWear.call(this, num_dress, num);
      if (num >= start) {
        paintSlot(document.getElementById("shmotka_" + num_dress + "_" + this.number), num, num_dress, 50);
        paintSlot(document.getElementById("litle_dress_" + this.number + "_" + num + "_" + num_dress), num, num_dress, 22);
        if (window.MLKalkAncientRunes && typeof window.MLKalkAncientRunes.inject === "function") {
          window.MLKalkAncientRunes.inject();
        }
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectUi);
  } else {
    injectUi();
  }

  window.MLKalkLvl45 = { ids: ids, start: start, sets: data.sets };
})();
