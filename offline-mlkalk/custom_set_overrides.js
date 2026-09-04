(function () {
  // Optional patch layer for artifact sets.
  // This lets you append/fix sets without editing db20.js directly.
  //
  // How to use:
  // 1) Add entries into window.MLKalkSetPatches.
  // 2) Each patch is { index: Number, set: Array } where set is db_dress entry format.
  // 3) Reload the page.
  //
  // IMPORTANT:
  // - Formulas are driven by bonus IDs in js20.js.
  // - If you use unknown bonus IDs, calculation may ignore them.
  // - Keep existing IDs/logic synchronized before production use.

  function isArray(v) {
    return Object.prototype.toString.call(v) === "[object Array]";
  }

  function applyPatch(patch) {
    if (!patch || typeof patch.index !== "number" || !isArray(patch.set)) {
      return;
    }
    if (typeof window.db_dress === "undefined" || !isArray(window.db_dress)) {
      return;
    }
    window.db_dress[patch.index] = patch.set;
    if (isArray(patch.setOld) && isArray(window.db_dress_old)) {
      window.db_dress_old[patch.index] = patch.setOld;
    }
  }

  function alliedIndexesByUnit(unit) {
    if (unit.number < 2 || unit.number === 6) {
      return [0, 1, 6];
    }
    return [2, 3, 4, 5];
  }

  function enemyIndexesByUnit(unit) {
    if (unit.number < 2 || unit.number === 6) {
      return [2, 3, 4, 5];
    }
    return [0, 1, 6];
  }

  function unitTypesByTag(tag) {
    // db bonus indexes use unit order:
    // 0-carriers, 1-warriors, 2-cavalry, 3-flying, 4-rangers, 5-healers, 6-mercs, 7-mages.
    if (tag === "SCAVENGER") return [0];
    if (tag === "MELEE") return [1, 2, 3];
    if (tag === "CAVALRY") return [2];
    if (tag === "RANGER") return [4];
    return [0, 1, 2, 3, 4, 5, 6, 7];
  }

  function percentToMlKalk(value) {
    if (typeof value !== "number") return 0;
    if (Math.abs(value) <= 3) {
      return value * 100;
    }
    return value;
  }

  function applyScalarBuff(unit, stat, unitTypeTag, rawValue) {
    var value = percentToMlKalk(rawValue);
    var types = unitTypesByTag(unitTypeTag);
    var i;
    if (stat === "ATTACK_BONUS") {
      for (i = 0; i < types.length; i += 1) {
        unit.bonusu[8 + types[i]] += value;
      }
      return;
    }
    if (stat === "DEFENSE_BONUS") {
      for (i = 0; i < types.length; i += 1) {
        unit.bonusu[types[i]] += value;
      }
      return;
    }
    if (stat === "HEALTH_BONUS") {
      for (i = 0; i < types.length; i += 1) {
        unit.bonusu[16 + types[i]] += value;
      }
      return;
    }
    if (stat === "PERSECUTION_BONUS") {
      // Persecution lanes are modeled separately in bonusu[40..43] for core combat unit types.
      for (i = 0; i < types.length; i += 1) {
        if (types[i] >= 1 && types[i] <= 4) {
          unit.bonusu[39 + types[i]] += value;
        }
      }
      return;
    }
    if (stat === "HEALING_BONUS") {
      // Healer resurrect bonus lane used by stock bonus id 1006/1145.
      unit.bonusu[25] += value;
    }
  }

  function applyToTargetGroup(ctxUnit, effect) {
    var target = effect.target;
    var recipients = [];
    var i;
    if (target === "SELF") {
      recipients = [ctxUnit];
    } else if (target === "SELF,ALLY") {
      var allyIdx = alliedIndexesByUnit(ctxUnit);
      for (i = 0; i < allyIdx.length; i += 1) {
        if (window.unitu[allyIdx[i]]) recipients.push(window.unitu[allyIdx[i]]);
      }
    } else if (target === "ENEMY") {
      var enemyIdx = enemyIndexesByUnit(ctxUnit);
      for (i = 0; i < enemyIdx.length; i += 1) {
        if (window.unitu[enemyIdx[i]]) recipients.push(window.unitu[enemyIdx[i]]);
      }
    } else {
      recipients = [ctxUnit];
    }

    for (i = 0; i < recipients.length; i += 1) {
      applyScalarBuff(recipients[i], effect.buffType, effect.unitType, effect.value);
    }
  }

  var MLKALK_CUSTOM_EFFECTS = {
    19101: [{ buffType: "HEALTH_BONUS", target: "ENEMY", unitType: "SCAVENGER", value: -0.40 }],
    19102: [{ buffType: "ATTACK_BONUS", target: "ENEMY", unitType: "RANGER", value: -0.45 }],
    19103: [{ buffType: "HEALTH_BONUS", target: "SELF", unitType: "MELEE", value: 0.50 }],
    19104: [{ buffType: "PERSECUTION_BONUS", target: "SELF", unitType: "MELEE", value: 0.75 }],
    19105: [{ buffType: "ATTACK_BONUS", target: "SELF", unitType: "MELEE", value: 0.50 }],
    19106: [{ buffType: "DEFENSE_BONUS", target: "SELF", unitType: "MELEE", value: 40 }],
    19107: [{ buffType: "HEALING_BONUS", target: "SELF", unitType: null, value: 0.40 }],
    19108: [{ buffType: "ATTACK_BONUS", target: "SELF,ALLY", unitType: "MELEE", value: 0.25 }],
    19001: [{ buffType: "HEALTH_BONUS", target: "ENEMY", unitType: "SCAVENGER", value: -0.48 }],
    19002: [{ buffType: "ATTACK_BONUS", target: "ENEMY", unitType: "RANGER", value: -0.54 }],
    19003: [{ buffType: "HEALTH_BONUS", target: "SELF", unitType: "MELEE", value: 0.60 }],
    19004: [{ buffType: "PERSECUTION_BONUS", target: "SELF", unitType: "MELEE", value: 0.90 }],
    19005: [{ buffType: "ATTACK_BONUS", target: "SELF", unitType: "MELEE", value: 0.60 }],
    19006: [{ buffType: "DEFENSE_BONUS", target: "SELF", unitType: "MELEE", value: 48 }],
    19007: [{ buffType: "HEALING_BONUS", target: "SELF", unitType: null, value: 0.48 }],
    19008: [{ buffType: "ATTACK_BONUS", target: "SELF,ALLY", unitType: "MELEE", value: 0.30 }]
  };

  // Important:
  // Custom effects are routed via Units.prototype.plus_bonus hook and then
  // distributed by effect.target (SELF/ALLY/ENEMY) from artifact owner context.
  // Therefore all custom ids use base target=SELF (0) in legacy dispatcher.
  var MLKALK_CUSTOM_TARGETS = {
    19101: 0,
    19102: 0,
    19103: 0,
    19104: 0,
    19105: 0,
    19106: 0,
    19107: 0,
    19108: 0,
    19001: 0,
    19002: 0,
    19003: 0,
    19004: 0,
    19005: 0,
    19006: 0,
    19007: 0,
    19008: 0
  };

  function buildStubBonusRow(target) {
    var row = [
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, -1, -1, target,
      0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0
    ];
    return row;
  }

  function ensureCustomBonusRows() {
    if (!isArray(window.db_bonuses)) return;
    for (var id in MLKALK_CUSTOM_TARGETS) {
      if (!Object.prototype.hasOwnProperty.call(MLKALK_CUSTOM_TARGETS, id)) continue;
      var idx = parseInt(id, 10);
      if (!window.db_bonuses[idx]) {
        window.db_bonuses[idx] = buildStubBonusRow(MLKALK_CUSTOM_TARGETS[id]);
      } else {
        window.db_bonuses[idx][39] = MLKALK_CUSTOM_TARGETS[id];
      }
    }
  }

  window.MLKalkGetCustomEffectTarget = function (bonusId) {
    if (MLKALK_CUSTOM_TARGETS[bonusId] === undefined) return -1;
    return MLKALK_CUSTOM_TARGETS[bonusId];
  };

  window.MLKalkApplyCustomSetEffect = function (ctxUnit, bonusId) {
    if (typeof bonusId !== "number") return false;
    var effects = MLKALK_CUSTOM_EFFECTS[bonusId];
    if (!effects) return false;
    for (var i = 0; i < effects.length; i += 1) {
      applyToTargetGroup(ctxUnit, effects[i]);
    }
    return true;
  };

  ensureCustomBonusRows();

  if (isArray(window.db_lvl_dress) && window.db_lvl_dress.length > 19) {
    // Reuse inactive slot 19 ("Лесничий-неактивный") so UI/HTML remains unchanged.
    window.db_lvl_dress[19] = 4;
  }

  if (!isArray(window.MLKalkSetPatches)) {
    window.MLKalkSetPatches = [];
  }

  // MUSKETER (ancient values from Heropedia), placed into inactive set slot 13.
  window.MLKalkSetPatches.push({
    index: 19,
    set: [
      ["BUFF_HEALTH_BONUS: ENEMY SCAVENGER -40%", 19101, 0, 0],
      ["BUFF_ATTACK_BONUS: ENEMY RANGER -45%", 19102, 0, 0],
      ["BUFF_HEALTH_BONUS: SELF MELEE +50%", 19103, 0, 0],
      ["BUFF_HERO_BAG_SIZE +15; BUFF_BOOST_BUILDING(ALCHEMIST) +15%", 0, 1, 0],
      ["BUFF_MILITARY_PRODUCTION: SELF MELEE -40%", 0, 1, 0],
      ["BUFF_ECONOMY_TRAINING_MILITARY_PEOPLE: SELF MELEE -20%", 0, 1, 0],
      ["BUFF_BOOST_BUILDING(FORTIFICATION) +400%", 0, 1, 0],
      ["BUFF_PERSECUTION_BONUS: SELF MELEE +75%", 19104, 0, 0],
      ["BUFF_ATTACK_BONUS: SELF MELEE +50%", 19105, 0, 0],
      ["BUFF_DEFENSE_BONUS: SELF MELEE +40", 19106, 0, 0],
      ["BUFF_HEALING_BONUS: SELF +40%", 19107, 0, 0],
      ["BUFF_ATTACK_BONUS: SELF,ALLY MELEE +25%", 19108, 0, 0],
      [". SET PASSIVE: BUFF_ARMY_CONSUMPTION(MELEE) -80%; BUFF_SCIENCE_BOOST +4000/h; BUFF_SHOW_GATE_STATE; BUFF_HERO_EXPERIENCE +400%", 0, 1, 0],
      ["Мушкетер короля"]
    ],
    setOld: [
      ["BUFF_HEALTH_BONUS: ENEMY SCAVENGER -48%", 19001, 0, 0],
      ["BUFF_ATTACK_BONUS: ENEMY RANGER -54%", 19002, 0, 0],
      ["BUFF_HEALTH_BONUS: SELF MELEE +60%", 19003, 0, 0],
      ["BUFF_HERO_BAG_SIZE +18; BUFF_BOOST_BUILDING(ALCHEMIST) +18%", 0, 1, 0],
      ["BUFF_MILITARY_PRODUCTION: SELF MELEE -48%", 0, 1, 0],
      ["BUFF_ECONOMY_TRAINING_MILITARY_PEOPLE: SELF MELEE -24%", 0, 1, 0],
      ["BUFF_BOOST_BUILDING(FORTIFICATION) +480%", 0, 1, 0],
      ["BUFF_PERSECUTION_BONUS: SELF MELEE +90%", 19004, 0, 0],
      ["BUFF_ATTACK_BONUS: SELF MELEE +60%", 19005, 0, 0],
      ["BUFF_DEFENSE_BONUS: SELF MELEE +48", 19006, 0, 0],
      ["BUFF_HEALING_BONUS: SELF +48%", 19007, 0, 0],
      ["BUFF_ATTACK_BONUS: SELF,ALLY MELEE +30%", 19008, 0, 0],
      [". SET PASSIVE: BUFF_ARMY_CONSUMPTION(MELEE) -80%; BUFF_SCIENCE_BOOST +4000/h; BUFF_SHOW_GATE_STATE; BUFF_HERO_EXPERIENCE +400%", 0, 1, 0],
      ["Мушкетер короля (древний)"]
    ]
  });

  for (var i = 0; i < window.MLKalkSetPatches.length; i += 1) {
    applyPatch(window.MLKalkSetPatches[i]);
  }
})();
