(function () {
  function titleText() {
    if (window.MLI18N && typeof window.MLI18N.t === "function") {
      return window.MLI18N.t("calc.ancientRune");
    }
    return "Ancient runes";
  }

  function syncClass(el, on) {
    el.className = on ? "ancient_rune_vkl" : "ancient_rune";
    el.title = titleText();
  }

  function inject() {
    var n;
    var slot;
    for (n = 0; n < 7; n++) {
      for (slot = 0; slot < 12; slot++) {
        var worn = document.getElementById("shmotka_" + slot + "_" + n);
        if (!worn) continue;
        var id = "ancient_rune_" + slot + "_" + n;
        var btn = document.getElementById(id);
        if (!btn) {
          btn = document.createElement("div");
          btn.id = id;
          btn.setAttribute("onclick", "vkl_ancient_rune(" + slot + "," + n + ")");
          worn.appendChild(btn);
        }
        var on = window.heroes && heroes[n] && heroes[n].rynu_ancient && heroes[n].rynu_ancient[slot];
        syncClass(btn, !!on);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }

  window.MLKalkAncientRunes = { inject: inject };
})();
