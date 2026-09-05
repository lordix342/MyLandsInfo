(function (global) {
  var STORAGE_KEY = "mylands-lang";
  var LANGS = ["en", "uk", "ru"];

  var STRINGS = {
    en: {
      "meta.title": "MyLands Info",
      "tab.quests": "Quests",
      "tab.battle": "Battle calculator",
      "tab.runes": "Runes",
      "iframe.quests": "Quests",
      "iframe.battle": "Battle calculator",
      "iframe.runes": "Runes",

      "runes.hero": "Hero",
      "runes.title": "Rune combinations",
      "runes.titleAncient": "Ancient rune combinations",
      "runes.titleSlot": "Rune combinations — ",
      "runes.titleAncientSlot": "Ancient rune combinations — ",
      "runes.regular": "Regular",
      "runes.ancient": "Ancient",
      "runes.pickSlot": "Select a slot on the left to see rune combinations.",
      "runes.later": "Combinations for this slot will appear later.",
      "runes.type": "Rune type",
      "runes.ancientPrefix": "Ancient ",

      "slot.helmet": "Helmet",
      "slot.necklace": "Necklace",
      "slot.weapon": "Weapon",
      "slot.armor": "Armor",
      "slot.shield": "Shield",
      "slot.ring": "Ring",
      "slot.belt": "Belt",
      "slot.boots": "Boots",
      "slot.cloak": "Cloak",
      "slot.bracers": "Bracers",
      "slot.greaves": "Greaves",
      "slot.backpack": "Backpack",

      "quests.showAll": "Show all quests",
      "quests.show": "Show quests:",
      "quests.day1": "First-day development quests",
      "quests.early": "Early development quests",
      "quests.monsters": "War with monsters",
      "quests.hero": "Hero-related quests",
      "quests.crystals": "Crystals, Stonehenges, Runes",
      "quests.faction": "Faction war",
      "quests.brotherhood": "Brotherhood of the Sword",
      "quests.tournaments": "Tournaments",
      "quests.mentoring": "Mentoring",
      "quests.clan": "Clan castles",
      "quests.bp": "Black Pearl quests",
      "quests.bpCycle": "Cyclic Black Pearl quests",
      "quests.records": "Record quests",
      "quests.social": "Social network quests",
      "quests.steam": "Steam DLC",
      "quests.special": "Special quests",
      "quests.admin": "Special rewards from administration",
      "quests.newChains": "New quest chains",
      "quests.boots": "Boots quest chain",
      "quests.warlord": "Warlord hero quests",
      "quests.fiveRunes": "Chain added with 5-rune words",
      "quests.dungeons": "Dungeon quest chain",
      "quests.alchemy4": "Alchemy 4",
      "quests.dragonCloak": "Quest chain — Dragon Cloak",
      "quests.build": "Construction quests",

      "calc.waves": "Waves",
      "calc.settings": "Calculator settings:",
      "calc.settingsTitle": "Calculator interface settings",
      "calc.oldInput": "Old unit input mode:",
      "calc.bigSpells": "Larger hero spell window:",
      "calc.attacker": "Attacker",
      "calc.defender": "Defender",
      "calc.load": "Load",
      "calc.save": "Save",
      "calc.unitLvl": "Unit lvl:",
      "calc.renegade": "renegade",
      "calc.faction": "Faction",
      "calc.knights": "Knights",
      "calc.lightElves": "Light elves",
      "calc.demons": "Demons",
      "calc.darkElves": "Dark elves",
      "calc.monsters": "Monsters",
      "calc.undead": "Undead",
      "calc.mage": "Wizard",
      "calc.serverType": "Server type:",
      "calc.miner": "Miner",
      "calc.military": "Military",
      "calc.factionWar": "Faction war",
      "calc.econom": "Economic",
      "calc.pasteId": "Paste a save number to load the battle",
      "calc.presets": "Presets",
      "calc.savePlaceholder": "Paste save ID!",
      "calc.afterBattle": "(after battle)",
      "calc.won": "won",
      "calc.lost": "lost",
      "calc.randomDmg": "Random damage"
    },
    uk: {
      "meta.title": "MyLands Info",
      "tab.quests": "Квести",
      "tab.battle": "Калькулятор битв",
      "tab.runes": "Руни",
      "iframe.quests": "Квести",
      "iframe.battle": "Калькулятор битв",
      "iframe.runes": "Руни",

      "runes.hero": "Герой",
      "runes.title": "Комбінації рун",
      "runes.titleAncient": "Комбінації античних рун",
      "runes.titleSlot": "Комбінації рун — ",
      "runes.titleAncientSlot": "Комбінації античних рун — ",
      "runes.regular": "Звичайні",
      "runes.ancient": "Античні",
      "runes.pickSlot": "Оберіть слот зліва, щоб побачити комбінації рун.",
      "runes.later": "Комбінації для цього слота з’являться пізніше.",
      "runes.type": "Тип рун",
      "runes.ancientPrefix": "Антична ",

      "slot.helmet": "Шолом",
      "slot.necklace": "Намисто",
      "slot.weapon": "Зброя",
      "slot.armor": "Броня",
      "slot.shield": "Щит",
      "slot.ring": "Кільце",
      "slot.belt": "Пояс",
      "slot.boots": "Черевики",
      "slot.cloak": "Плащ",
      "slot.bracers": "Наручі",
      "slot.greaves": "Поножі",
      "slot.backpack": "Заплечна сумка",

      "quests.showAll": "Показати всі квести",
      "quests.show": "Показати квести:",
      "quests.day1": "Квести першого дня розвитку",
      "quests.early": "Квести раннього рівня розвитку",
      "quests.monsters": "Війна з монстрами",
      "quests.hero": "Квести, пов’язані з героєм",
      "quests.crystals": "Кристали, Стоунхенджі, Руни",
      "quests.faction": "Фракційна війна",
      "quests.brotherhood": "Братство меча",
      "quests.tournaments": "Турніри",
      "quests.mentoring": "Наставництво",
      "quests.clan": "Кланові замки",
      "quests.bp": "Квести за ЧЖ",
      "quests.bpCycle": "Циклічні квести за ЧЖ",
      "quests.records": "Квести-рекорди",
      "quests.social": "Квести соціальних мереж",
      "quests.steam": "Steam DLC",
      "quests.special": "Спеціальні квести",
      "quests.admin": "Особливі нагороди від адміністрації",
      "quests.newChains": "Нові ланцюжки квестів",
      "quests.boots": "Ланцюжок квестів на черевики",
      "quests.warlord": "Квести, пов’язані з Героєм-Полководцем",
      "quests.fiveRunes": "Ланцюжок, доданий разом із рунними словами з 5 рун",
      "quests.dungeons": "Ланцюжок квестів, пов’язаний із підземеллями",
      "quests.alchemy4": "Алхімія 4",
      "quests.dragonCloak": "Ланцюжок квестів — «Плащ дракона»",
      "quests.build": "Квести на будівництво",

      "calc.waves": "Хвилі",
      "calc.settings": "Налаштування калькулятора:",
      "calc.settingsTitle": "Налаштування інтерфейсу калькулятора",
      "calc.oldInput": "Старий варіант введення юнітів:",
      "calc.bigSpells": "Збільшене вікно заклять героя:",
      "calc.attacker": "Атакувальник",
      "calc.defender": "Захисник",
      "calc.load": "Завантажити",
      "calc.save": "Зберегти",
      "calc.unitLvl": "Рів. юнітів:",
      "calc.renegade": "відступник",
      "calc.faction": "Фракція",
      "calc.knights": "Лицарі",
      "calc.lightElves": "Світлі ельфи",
      "calc.demons": "Демони",
      "calc.darkElves": "Темні ельфи",
      "calc.monsters": "Монстри",
      "calc.undead": "Нежить",
      "calc.mage": "Чарівник",
      "calc.serverType": "Тип сервера:",
      "calc.miner": "Шахтарський",
      "calc.military": "Бойовий",
      "calc.factionWar": "Війна фракцій",
      "calc.econom": "Економічний",
      "calc.pasteId": "Щоб завантажити бій, вставте номер збереження",
      "calc.presets": "Пресети",
      "calc.savePlaceholder": "Вставте ID збереження!",
      "calc.afterBattle": "(після бою)",
      "calc.won": "переміг",
      "calc.lost": "програв",
      "calc.randomDmg": "Випадкова шкода"
    },
    ru: {
      "meta.title": "MyLands Info",
      "tab.quests": "Квесты",
      "tab.battle": "Калькулятор боёв",
      "tab.runes": "Руны",
      "iframe.quests": "Квесты",
      "iframe.battle": "Калькулятор боёв",
      "iframe.runes": "Руны",

      "runes.hero": "Герой",
      "runes.title": "Комбинации рун",
      "runes.titleAncient": "Комбинации античных рун",
      "runes.titleSlot": "Комбинации рун — ",
      "runes.titleAncientSlot": "Комбинации античных рун — ",
      "runes.regular": "Обычные",
      "runes.ancient": "Античные",
      "runes.pickSlot": "Выберите слот слева, чтобы увидеть комбинации рун.",
      "runes.later": "Комбинации для этого слота появятся позже.",
      "runes.type": "Тип рун",
      "runes.ancientPrefix": "Античная ",

      "slot.helmet": "Шлем",
      "slot.necklace": "Ожерелье",
      "slot.weapon": "Оружие",
      "slot.armor": "Броня",
      "slot.shield": "Щит",
      "slot.ring": "Кольцо",
      "slot.belt": "Пояс",
      "slot.boots": "Сапоги",
      "slot.cloak": "Плащ",
      "slot.bracers": "Наручи",
      "slot.greaves": "Поножи",
      "slot.backpack": "Заплечная сумка",

      "quests.showAll": "Отобразить все квесты",
      "quests.show": "Отобразить квесты:",
      "quests.day1": "Квесты первого дня развития",
      "quests.early": "Квесты раннего уровня развития",
      "quests.monsters": "Война с монстрами",
      "quests.hero": "Квесты, связанные с героем",
      "quests.crystals": "Кристаллы, Стоунхенджи, Руны",
      "quests.faction": "Фракционная война",
      "quests.brotherhood": "Братство меча",
      "quests.tournaments": "Турниры",
      "quests.mentoring": "Наставничество",
      "quests.clan": "Клановые замки",
      "quests.bp": "Квесты за ЧЖ",
      "quests.bpCycle": "Циклические квесты за ЧЖ",
      "quests.records": "Квесты-рекорды",
      "quests.social": "Квесты социальных сетей",
      "quests.steam": "Steam DLC",
      "quests.special": "Специальные квесты",
      "quests.admin": "Особые награды от администрации",
      "quests.newChains": "Новые цепочки квестов",
      "quests.boots": "Цепочка квестов на сапоги",
      "quests.warlord": "Квесты, связанные с Героем-Полководцем",
      "quests.fiveRunes": "Цепочка, добавленная в игру вместе с рунными словами из 5 рун",
      "quests.dungeons": "Цепочка квестов, связанная с подземельями",
      "quests.alchemy4": "Алхимия 4",
      "quests.dragonCloak": "Цепочка квестов — «Плащ дракона»",
      "quests.build": "Квесты на строительство",

      "calc.waves": "Волны",
      "calc.settings": "Настройка калькулятора:",
      "calc.settingsTitle": "Настройка интерфейса калькулятора",
      "calc.oldInput": "Старый вариант ввода юнитов:",
      "calc.bigSpells": "Увеличенное окно с заклинаниями для героя:",
      "calc.attacker": "Атакующий",
      "calc.defender": "Защитник",
      "calc.load": "Загрузить",
      "calc.save": "Сохранить",
      "calc.unitLvl": "Ур. юнитов:",
      "calc.renegade": "отступник",
      "calc.faction": "Фракция",
      "calc.knights": "Рыцари",
      "calc.lightElves": "Светлые эльфы",
      "calc.demons": "Демоны",
      "calc.darkElves": "Темные эльфы",
      "calc.monsters": "Монстры",
      "calc.undead": "Нежить",
      "calc.mage": "Волшебник",
      "calc.serverType": "Тип сервера:",
      "calc.miner": "Шахтерский",
      "calc.military": "Боевой",
      "calc.factionWar": "Война фракций",
      "calc.econom": "Экономический",
      "calc.pasteId": "Для загрузки боя вставьте номер сохранения",
      "calc.presets": "Пресеты",
      "calc.savePlaceholder": "Вставьте ID сохранения!",
      "calc.afterBattle": "(после боя)",
      "calc.won": "победил",
      "calc.lost": "проиграл",
      "calc.randomDmg": "Случайный урон"
    }
  };

  var EFFECT_I18N = {
    "Жах 12%": { en: "Fear 12%", ru: "Ужас 12%" },
    "Жах 24%": { en: "Fear 24%", ru: "Ужас 24%" },
    "+700 науки на годину": { en: "+700 science per hour", ru: "+700 науки в час" },
    "+1200 науки на годину": { en: "+1200 science per hour", ru: "+1200 науки в час" },
    "+2400 науки на годину": { en: "+2400 science per hour", ru: "+2400 науки в час" },
    "+1200 максимальної мани": { en: "+1200 max mana", ru: "+1200 максимальной маны" },
    "+3600 максимальної мани": { en: "+3600 max mana", ru: "+3600 максимальной маны" },
    "Атака всіх військ (діє на противника) -7%": { en: "All troops attack (affects enemy) -7%", ru: "Атака всех войск (действует на противника) -7%" },
    "Атака всіх військ (діє на противника) -12%": { en: "All troops attack (affects enemy) -12%", ru: "Атака всех войск (действует на противника) -12%" },
    "Атака всіх військ (діє на противника) -18%": { en: "All troops attack (affects enemy) -18%", ru: "Атака всех войск (действует на противника) -18%" },
    "Регенерація мани героя +120 / год": { en: "Hero mana regen +120 / h", ru: "Регенерация маны героя +120 / ч" },
    "Регенерація мани героя +240 / год": { en: "Hero mana regen +240 / h", ru: "Регенерация маны героя +240 / ч" },
    "Регенерація мани героя +360 / год": { en: "Hero mana regen +360 / h", ru: "Регенерация маны героя +360 / ч" },
    "Регенерація мани героя +250 / год": { en: "Hero mana regen +250 / h", ru: "Регенерация маны героя +250 / ч" },
    "Шанс провалу ворожого закляття 18%": { en: "Enemy spell fail chance 18%", ru: "Шанс провала вражеского заклинания 18%" },
    "Шанс провалу ворожого закляття 36%": { en: "Enemy spell fail chance 36%", ru: "Шанс провала вражеского заклинания 36%" },
    "Шанс провалу ворожого закляття 54%": { en: "Enemy spell fail chance 54%", ru: "Шанс провала вражеского заклинания 54%" },
    "Шанс провалу ворожого закляття +60%": { en: "Enemy spell fail chance +60%", ru: "Шанс провала вражеского заклинания +60%" },
    "Здоров'я всіх військ (діє на противника) -12%": { en: "All troops health (affects enemy) -12%", ru: "Здоровье всех войск (действует на противника) -12%" },
    "Здоров'я всіх військ (діє на противника) -24%": { en: "All troops health (affects enemy) -24%", ru: "Здоровье всех войск (действует на противника) -24%" },
    "Здоров'я всіх військ (діє на противника) -36%": { en: "All troops health (affects enemy) -36%", ru: "Здоровье всех войск (действует на противника) -36%" },
    "Здоров'я всіх військ +18%": { en: "All troops health +18%", ru: "Здоровье всех войск +18%" },
    "Здоров'я всіх військ +36%": { en: "All troops health +36%", ru: "Здоровье всех войск +36%" },
    "Здоров'я всіх військ +54%": { en: "All troops health +54%", ru: "Здоровье всех войск +54%" },
    "Здоров'я всіх військ (діє на себе) +55%": { en: "All troops health (self) +55%", ru: "Здоровье всех войск (действует на себя) +55%" },
    "Здоров'я всіх військ (діє на себе і союзника) +12%": { en: "All troops health (self and ally) +12%", ru: "Здоровье всех войск (действует на себя и союзника) +12%" },
    "Здоров'я всіх військ (діє на себе і союзника) +36%": { en: "All troops health (self and ally) +36%", ru: "Здоровье всех войск (действует на себя и союзника) +36%" },
    "Шанс знайти магічний предмет +120%": { en: "Chance to find a magic item +120%", ru: "Шанс найти магический предмет +120%" },
    "Шанс знайти магічний предмет у руїні +240%": { en: "Chance to find a magic item in a ruin +240%", ru: "Шанс найти магический предмет в руине +240%" },
    "Атака всіх військ +18%": { en: "All troops attack +18%", ru: "Атака всех войск +18%" },
    "Атака всіх військ +36%": { en: "All troops attack +36%", ru: "Атака всех войск +36%" },
    "Атака всіх військ +54%": { en: "All troops attack +54%", ru: "Атака всех войск +54%" },
    "Атака всіх військ собі і союзнику +36%": { en: "All troops attack for self and ally +36%", ru: "Атака всех войск себе и союзнику +36%" },
    "Атака всіх військ (діє на себе і союзника) +18%": { en: "All troops attack (self and ally) +18%", ru: "Атака всех войск (действует на себя и союзника) +18%" },
    "Шанс пошкодити кожну будівлю +30%": { en: "Chance to damage each building +30%", ru: "Шанс повредить каждое здание +30%" },
    "Шанс пошкодити кожну будівлю +60%": { en: "Chance to damage each building +60%", ru: "Шанс повредить каждое здание +60%" },
    "Захист усіх військ +12": { en: "All troops defense +12", ru: "Защита всех войск +12" },
    "Захист усіх військ +24": { en: "All troops defense +24", ru: "Защита всех войск +24" },
    "Захист усіх військ +36": { en: "All troops defense +36", ru: "Защита всех войск +36" },
    "Захист усіх військ собі і союзнику +30": { en: "All troops defense for self and ally +30", ru: "Защита всех войск себе и союзнику +30" },
    "Межа максимального захисту +7": { en: "Max defense cap +7", ru: "Предел максимальной защиты +7" },
    "Межа максимального захисту +12": { en: "Max defense cap +12", ru: "Предел максимальной защиты +12" },
    "Межа максимального захисту +18": { en: "Max defense cap +18", ru: "Предел максимальной защиты +18" },
    "Межа максимального захисту +36": { en: "Max defense cap +36", ru: "Предел максимальной защиты +36" },
    "Межа максимального захисту собі і союзнику +18": { en: "Max defense cap for self and ally +18", ru: "Предел максимальной защиты себе и союзнику +18" },
    "Атака магічних веж (діє на противника) -7%": { en: "Magic tower attack (affects enemy) -7%", ru: "Атака магических башен (действует на противника) -7%" },
    "Атака магічних веж (діє на противника) -12%": { en: "Magic tower attack (affects enemy) -12%", ru: "Атака магических башен (действует на противника) -12%" },
    "Вартість відправки місій з військами (жалування всіх військ) -12%": { en: "Troop mission cost (all troops salary) -12%", ru: "Стоимость отправки миссий с войсками (жалование всех войск) -12%" },
    "Вартість відправки місій з військами (жалування всіх військ) -24%": { en: "Troop mission cost (all troops salary) -24%", ru: "Стоимость отправки миссий с войсками (жалование всех войск) -24%" },
    "Вартість відправки місій з військами (жалування всіх військ) -36%": { en: "Troop mission cost (all troops salary) -36%", ru: "Стоимость отправки миссий с войсками (жалование всех войск) -36%" },
    "Вартість відправки місій з військами -12%": { en: "Troop mission cost -12%", ru: "Стоимость отправки миссий с войсками -12%" },
    "Отримувані ресурси при грабунку монстрів +12%": { en: "Resources from monster plunder +12%", ru: "Получаемые ресурсы при грабеже монстров +12%" },
    "Отримувані ресурси при грабунку монстрів +24%": { en: "Resources from monster plunder +24%", ru: "Получаемые ресурсы при грабеже монстров +24%" },
    "Отримувані ресурси при грабунку в руїні +48%": { en: "Resources from ruin plunder +48%", ru: "Получаемые ресурсы при грабеже в руине +48%" },
    "Максимальна мана +3500": { en: "Max mana +3500", ru: "Максимальная мана +3500" },
    "Параметри науки «Спостереження» +4": { en: "Science: Observation +4", ru: "Параметры науки «Наблюдение» +4" },
    "Параметри науки «Шпигунство» +4": { en: "Science: Espionage +4", ru: "Параметры науки «Шпионаж» +4" },
    "Атака магічним вежам +12%": { en: "Attack vs magic towers +12%", ru: "Атака магическим башням +12%" },
    "Місткість сумки героя +12": { en: "Hero bag capacity +12", ru: "Вместимость сумки героя +12" },
    "Вивчення лабораторіями алхіміків +12%": { en: "Alchemist lab research +12%", ru: "Изучение лабораториями алхимиков +12%" },
    "Отримуваний героєм досвід у бою +240%": { en: "Hero combat XP +240%", ru: "Получаемый героем опыт в бою +240%" },
    "Отримуваний героєм досвід у бою +120%": { en: "Hero combat XP +120%", ru: "Получаемый героем опыт в бою +120%" },
    "Тривалість місії загону героя -12%": { en: "Hero squad mission duration -12%", ru: "Длительность миссии отряда героя -12%" },
    "Тривалість вхідних атак (діє на противника) +36%": { en: "Incoming attack duration (affects enemy) +36%", ru: "Длительность входящих атак (действует на противника) +36%" },
    "Дальність заклять +6": { en: "Spell range +6", ru: "Дальность заклинаний +6" },
    "Посилення атаки армії +24%": { en: "Army attack boost +24%", ru: "Усиление атаки армии +24%" },
    "Атака переслідувачів +36%": { en: "Pursuer attack +36%", ru: "Атака преследователей +36%" }
  };

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.indexOf(saved) !== -1) {
        return saved;
      }
    } catch (e) {}

    var list = [];
    if (navigator.languages && navigator.languages.length) {
      list = navigator.languages;
    } else if (navigator.language) {
      list = [navigator.language];
    }

    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase();
      if (code.indexOf("uk") === 0 || code.indexOf("ua") === 0) {
        return "uk";
      }
      if (code.indexOf("ru") === 0) {
        return "ru";
      }
    }

    return "en";
  }

  function t(key) {
    var pack = STRINGS[api.lang] || STRINGS.en;
    return pack[key] != null ? pack[key] : (STRINGS.en[key] != null ? STRINGS.en[key] : key);
  }

  function tEffect(text) {
    if (api.lang === "uk") {
      return text;
    }
    var row = EFFECT_I18N[text];
    if (!row) {
      return text;
    }
    return row[api.lang] || text;
  }

  function apply(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }

    nodes = scope.querySelectorAll("[data-i18n-html]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].getAttribute("data-i18n-html"));
    }

    nodes = scope.querySelectorAll("[data-i18n-title]");
    for (i = 0; i < nodes.length; i++) {
      var title = t(nodes[i].getAttribute("data-i18n-title"));
      nodes[i].setAttribute("title", title);
      if (nodes[i].hasAttribute("aria-label")) {
        nodes[i].setAttribute("aria-label", title);
      }
    }

    nodes = scope.querySelectorAll("[data-i18n-placeholder]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("placeholder", t(nodes[i].getAttribute("data-i18n-placeholder")));
    }

    if (document.documentElement) {
      document.documentElement.lang = api.lang;
    }

    if (document.title && STRINGS.en["meta.title"]) {
      var titleNode = document.querySelector("title");
      if (titleNode && titleNode.hasAttribute("data-i18n")) {
        document.title = t(titleNode.getAttribute("data-i18n"));
      }
    }

    applyCalculator();
  }

  function replaceExact(el, from, to) {
    if (!el) {
      return;
    }
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      el.textContent = to;
      return;
    }
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 3 && node.nodeValue.indexOf(from) !== -1) {
        node.nodeValue = node.nodeValue.replace(from, to);
      }
    }
  }

  function applyCalculator() {
    if (!document.getElementById("calk")) {
      return;
    }

    var volnu = document.querySelector("#volnu b");
    if (volnu) {
      volnu.textContent = t("calc.waves");
    }

    var settings = document.querySelectorAll("#volnu b");
    if (settings[1]) {
      settings[1].textContent = t("calc.settings");
    }

    var settingsTitle = document.querySelector("#vkl_vukl_setting center b");
    if (settingsTitle) {
      settingsTitle.textContent = t("calc.settingsTitle");
    }

    var labels = document.querySelectorAll("#vkl_vukl_input label");
    if (labels[0]) {
      labels[0].textContent = t("calc.oldInput");
    }
    if (labels[1]) {
      labels[1].textContent = t("calc.bigSpells");
    }

    var attackTexts = document.querySelectorAll(".attack_text");
    for (var i = 0; i < attackTexts.length; i++) {
      var raw = attackTexts[i].textContent.replace(/\s+/g, " ").trim();
      if (raw.indexOf("Атак") === 0 || raw.indexOf("Attack") === 0 || raw === t("calc.attacker") || raw === t("calc.defender")) {
        var isDef =
          raw.indexOf("Захис") === 0 ||
          raw.indexOf("Защит") === 0 ||
          raw.indexOf("Defend") === 0 ||
          attackTexts[i].closest && attackTexts[i].closest("#army_2, #army_3, #army_4, #army_5");
        var army = attackTexts[i].closest ? attackTexts[i].closest("[id^='army_']") : null;
        var num = army ? army.id.replace("army_", "") : "";
        isDef = num === "2" || num === "3" || num === "4" || num === "5";
        attackTexts[i].textContent = isDef ? t("calc.defender") : t("calc.attacker");
      }
    }

    var loadBtns = document.querySelectorAll("button.load_one, button#load");
    for (i = 0; i < loadBtns.length; i++) {
      loadBtns[i].textContent = t("calc.load");
    }

    var saveBtns = document.querySelectorAll("button.save_one, button#save");
    for (i = 0; i < saveBtns.length; i++) {
      saveBtns[i].textContent = t("calc.save");
    }

    var unitLvl = document.querySelectorAll("td.kastul_2");
    for (i = 0; i < unitLvl.length; i++) {
      for (var n = 0; n < unitLvl[i].childNodes.length; n++) {
        if (unitLvl[i].childNodes[n].nodeType === 3 && unitLvl[i].childNodes[n].nodeValue.trim()) {
          unitLvl[i].childNodes[n].nodeValue = t("calc.unitLvl") + " ";
        }
      }
    }

    var renegade = document.querySelectorAll("td.kastul_1 label");
    for (i = 0; i < renegade.length; i++) {
      renegade[i].textContent = t("calc.renegade");
    }

    var groups = document.querySelectorAll("optgroup[label]");
    for (i = 0; i < groups.length; i++) {
      groups[i].label = t("calc.faction");
      var opts = groups[i].querySelectorAll("option");
      var keys = ["calc.knights", "calc.lightElves", "calc.demons", "calc.darkElves", "calc.monsters", "calc.undead", "calc.mage"];
      for (var o = 0; o < opts.length && o < keys.length; o++) {
        opts[o].textContent = t(keys[o]);
      }
    }

    var serverBox = document.querySelector(".type_server");
    if (serverBox) {
      for (n = 0; n < serverBox.childNodes.length; n++) {
        if (serverBox.childNodes[n].nodeType === 3 && serverBox.childNodes[n].nodeValue.trim()) {
          serverBox.childNodes[n].nodeValue = t("calc.serverType") + " ";
        }
      }
      var sl = serverBox.querySelectorAll("label");
      if (sl[0]) sl[0].textContent = " " + t("calc.miner");
      if (sl[1]) sl[1].textContent = " " + t("calc.military");
      if (sl[2]) sl[2].textContent = " " + t("calc.factionWar");
      if (sl[3]) sl[3].textContent = " " + t("calc.econom");
    }

    var paste = document.querySelector("#setting_razshet font");
    if (paste) {
      paste.textContent = t("calc.pasteId");
    }

    var preset = document.getElementById("image_hero_0");
    if (preset) {
      preset.textContent = t("calc.presets") + "   ";
    }

    var saveId = document.getElementById("save_id");
    if (saveId) {
      saveId.setAttribute("placeholder", t("calc.savePlaceholder"));
    }

    var randomOpt = document.querySelector("#type_doing option[value='6']");
    if (randomOpt) {
      randomOpt.textContent = t("calc.randomDmg");
    }
  }

  function setLang(lang, notifyFrames) {
    if (LANGS.indexOf(lang) === -1) {
      lang = "en";
    }
    api.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    apply();
    if (notifyFrames !== false) {
      var frames = document.querySelectorAll("iframe");
      for (var i = 0; i < frames.length; i++) {
        try {
          frames[i].contentWindow.postMessage({ type: "mylands-lang", lang: lang }, "*");
        } catch (e) {}
      }
    }
    if (typeof api.onChange === "function") {
      api.onChange(lang);
    }
  }

  function bindSwitcher(root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"), true);
        refreshSwitcher(scope);
      });
    }
    refreshSwitcher(scope);
  }

  function refreshSwitcher(root) {
    var buttons = (root || document).querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains("tab-btn")) {
        continue;
      }
      buttons[i].classList.toggle("is-active", buttons[i].getAttribute("data-lang") === api.lang);
      buttons[i].classList.toggle("active", buttons[i].getAttribute("data-lang") === api.lang);
    }
  }

  var api = {
    lang: detectLang(),
    langs: LANGS,
    t: t,
    tEffect: tEffect,
    apply: apply,
    applyCalculator: applyCalculator,
    setLang: setLang,
    bindSwitcher: bindSwitcher,
    refreshSwitcher: refreshSwitcher,
    onChange: null
  };

  global.MLI18N = api;

  global.addEventListener("message", function (event) {
    if (event.data && event.data.type === "mylands-lang" && event.data.lang) {
      setLang(event.data.lang, false);
      refreshSwitcher();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      apply();
      bindSwitcher();
    });
  } else {
    apply();
    bindSwitcher();
  }
})(window);
