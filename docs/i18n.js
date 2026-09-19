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
      "runes.soloBonuses": "Individual rune bonuses",
      "runes.build": "Create a combination",
      "runes.clearDraft": "Clear",
      "runes.removeRune": "Remove rune",
      "runes.summaryRunes": "Runes in slots",
      "runes.summaryBonuses": "Combined bonuses",
      "runes.fromCombo": "combinations",
      "runes.fromSolo": "individual runes",
      "runes.perHour": "h",
      "stat.attack_all": "All troops attack",
      "stat.attack_all_ally": "All troops attack (also affects ally)",
      "stat.attack_enemy": "All troops attack (affects enemy)",
      "stat.attack_enemy_monsters": "Attack (affects enemy) against Monsters",
      "stat.army_attack": "Army attack boost",
      "stat.pursuer_attack": "Pursuer attack",
      "stat.health_all": "All troops health",
      "stat.health_all_ally": "All troops health (also affects ally)",
      "stat.health_enemy": "All troops health (affects enemy)",
      "stat.defense_all": "All troops defense",
      "stat.defense_all_ally": "All troops defense (also affects ally)",
      "stat.defense_monsters": "Defense against Monsters",
      "stat.defense_cap": "Max defense cap",
      "stat.defense_cap_ally": "Max defense cap (also affects ally)",
      "stat.fear": "Fear",
      "stat.xp_battle": "Hero combat XP",
      "stat.xp_monsters": "Hero combat XP against Monsters",
      "stat.mission_duration": "Hero squad mission duration",
      "stat.mission_cost": "Troop mission cost",
      "stat.science": "Science per hour",
      "stat.max_mana": "Max mana",
      "stat.mana_regen": "Hero mana regen",
      "stat.spell_fail": "Enemy spell fail chance",
      "stat.magic_item": "Chance to find a magic item",
      "stat.magic_item_ruin": "Chance to find a magic item in a ruin",
      "stat.building_damage": "Chance to damage each building",
      "stat.tower_attack_enemy": "Magic tower attack (affects enemy)",
      "stat.tower_attack": "Attack vs magic towers",
      "stat.plunder_monsters": "Resources from monster plunder",
      "stat.plunder_ruin": "Resources from ruin plunder",
      "stat.bag": "Hero bag capacity",
      "stat.alchemy": "Alchemist lab research",
      "stat.observation": "Science: Observation",
      "stat.espionage": "Science: Espionage",
      "stat.incoming_attack": "Incoming attack duration (affects enemy)",
      "stat.spell_range": "Spell range",
      "rune.feo": "Feo",
      "rune.ur": "Ur",
      "rune.thorn": "Thorn",
      "rune.io": "Io",
      "rune.rad": "Rad",
      "rune.tyr": "Tyr",
      "rune.gifu": "Gifu",
      "rune.yar": "Yar",
      "rune.hegl": "Hegl",
      "runeBonus.feo": "+25% hero XP gained in battle against Monsters",
      "runeBonus.ur": "+10% hero XP gained in battle",
      "runeBonus.thorn": "+5 defense in battle against Monsters",
      "runeBonus.io": "+3 defense to all troops",
      "runeBonus.rad": "+5% health to all troops",
      "runeBonus.tyr": "−5% attack (affects the enemy) against Monsters",
      "runeBonus.gifu": "+3% attack to all troops",
      "runeBonus.yar": "−2% duration of a squad mission with the hero",
      "runeBonus.hegl": "−3% attack (affects the enemy)",
      "runeBonus.ancient.feo": "+30% hero XP gained in battle against Monsters",
      "runeBonus.ancient.ur": "+12% hero XP gained in battle",
      "runeBonus.ancient.thorn": "+6 defense in battle against Monsters",
      "runeBonus.ancient.io": "+4 defense to all troops",
      "runeBonus.ancient.rad": "+6% health to all troops",
      "runeBonus.ancient.tyr": "−6% attack (affects the enemy) against Monsters",
      "runeBonus.ancient.gifu": "+4% attack to all troops",
      "runeBonus.ancient.yar": "−3% duration of a squad mission with the hero",
      "runeBonus.ancient.hegl": "−4% attack (affects the enemy)",

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
      "quests.hideAll": "Hide all quests",
      "quests.search": "Search quests by name",
      "quests.noResults": "No quests found.",
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
      "quests.alchemy5": "Alchemy 5",
      "quests.alchemy6": "Alchemy 6",
      "quests.dragonCloak": "Quest chain — Dragon Cloak",
      "quests.build": "Construction quests",

      "calc.waves": "Waves",
      "calc.settings": "Calculator settings:",
      "calc.settingsTitle": "Calculator interface settings",
      "calc.oldInput": "Old unit input mode:",
      "calc.bigSpells": "Larger hero spell window:",
      "calc.attacker": "Attacker",
      "calc.defender": "Defender",
      "calc.unitLvl": "Unit lvl:",
      "calc.renegade": "renegade",
      "calc.faction": "Faction",
      "calc.knights": "Knights",
      "calc.lightElves": "Light elves",
      "calc.demons": "Demons",
      "calc.darkElves": "Dark elves",
      "calc.monsters": "Monsters",
      "calc.monster.ordinary": "Ordinary",
      "calc.monster.owner": "Owner",
      "calc.monster.stone": "Stone/Tomb/Sarc",
      "calc.monster.defenderHelp": "Defender/support",
      "calc.undead": "Undead",
      "calc.mage": "Wizard",
      "calc.serverType": "Server type:",
      "calc.miner": "Miner",
      "calc.military": "Military",
      "calc.factionWar": "Faction war",
      "calc.econom": "Economic",
      "calc.afterBattle": "(after battle)",
      "calc.won": "won",
      "calc.lost": "lost",
      "calc.randomDmg": "Random damage",
      "calc.chimeras": "Chimeras",
      "calc.predict": "Predict",
      "calc.ancientRune": "Ancient runes",
      "calc.auto": "auto",
      "calc.retreatAt": "retreat at",
      "calc.lossPct": "% losses",
      "calc.clear": "Clear",
      "calc.close": "Close",
      "calc.disableHero": "disable hero",
      "calc.addAttacker": "Add attacker",
      "calc.removeAttacker": "Remove attacker",
      "calc.addDefender": "Add defender",
      "calc.removeDefender": "Remove defender",
      "calc.kz": "CW",
      "calc.maxDef": "max defense",
      "calc.onLake": "on a lake",
      "calc.landscape": "landscape",
      "calc.terrain.sacred": "Sacred land",
      "calc.terrain.dead": "Dead land",
      "calc.terrain.magicForest": "Enchanted forests",
      "calc.terrain.cursedForest": "Cursed forests",
      "calc.terrain.mountains": "Mountains",
      "calc.terrain.desert": "Desert",
      "calc.terrain.forest": "Forests",
      "calc.terrain.steppe": "Steppe",
      "calc.terrain.underground": "Underground",
      "calc.magicTower": "Magic tower",
      "calc.tower": "Tower",
      "calc.forts": "Fortifications",
      "calc.gates": "Gates",
      "calc.details": "Details",
      "calc.mode.atkMinDefMax": "Atk.(min)/Def.(max)",
      "calc.mode.atkMaxDefMin": "Atk.(max)/Def.(min)",
      "calc.mode.atkMaxDefAvg": "Atk.(max)/Def.(avg)",
      "calc.mode.atkMinDefAvg": "Atk.(min)/Def.(avg)",
      "calc.mode.atkAvgDefMax": "Atk.(avg)/Def.(max)",
      "calc.mode.atkAvgDefMin": "Atk.(avg)/Def.(min)",
      "calc.mode.random": "Random damage",
      "calc.mode.custom": "Set min/max",
      "calc.min": "min",
      "calc.max": "max",
      "calc.rnd": "rnd",
      "calc.avg": "avg",
      "calc.atkShort": "Atk.",
      "calc.defShort": "Def.",
      "calc.ruins": "Ruins",
      "calc.stonehedges": "Stonehenges",
      "calc.tombs": "Tombs",
      "calc.ruinLvl": "Ruins lvl {n}",
      "calc.stonehedgeOf": "Stonehenge: {name}",
      "calc.tomb.exchange": "Master of exchange",
      "calc.tomb.quality": "Quantity into quality",
      "calc.tomb.choice": "The right choice",
      "calc.tomb.runes": "Rune extraction",
      "calc.tomb.crystals": "Crystal fusion",
      "calc.tombLvl": "{name} {n} lvl",
      "calc.fortLvl": "Fortification[{n} lvl]",
      "calc.towerLvl": "Tower[{n} lvl]",
      "calc.magicTowerLvl": "Magic tower[{n} lvl]",
      "calc.lossesUnits": "Losses: {n} units",
      "calc.hideDetails": "Hide details",
      "calc.chooseHero": "Select a hero to view extra skills!",
      "calc.spec.paladin": "Paladin",
      "calc.spec.warrior": "Warrior",
      "calc.spec.saboteur": "Saboteur",
      "calc.spec.scout": "Scout",
      "calc.spec.peacemaker": "Peacemaker",
      "calc.spec.destroyer": "Destroyer",
      "calc.spec.gatherer": "Gatherer",
      "calc.spec.defender": "Defender",
      "calc.spec.mentor": "Mentor",
      "calc.spec.trader": "Trader",
      "calc.spec.builder": "Builder",
      "calc.spec.healer": "Healer",
      "calc.spec.illusionist": "Illusionist",
      "calc.spec.dissipator": "Dissipator",
      "calc.spec.necromancer": "Necromancer",
      "calc.spec.spellcaster": "Spellcaster"
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
      "runes.soloBonuses": "Бонуси окремих рун",
      "runes.build": "Створити комбінацію",
      "runes.clearDraft": "Очистити",
      "runes.removeRune": "Прибрати руну",
      "runes.summaryRunes": "Руни в слотах",
      "runes.summaryBonuses": "Загальні бонуси",
      "runes.fromCombo": "комбінації",
      "runes.fromSolo": "окремі руни",
      "runes.perHour": "год",
      "stat.attack_all": "Атака всіх військ",
      "stat.attack_all_ally": "Атака всіх військ (також союзнику)",
      "stat.attack_enemy": "Атака всіх військ (діє на противника)",
      "stat.attack_enemy_monsters": "Атака (діє на противника) проти монстрів",
      "stat.army_attack": "Посилення атаки армії",
      "stat.pursuer_attack": "Атака переслідувачів",
      "stat.health_all": "Здоров'я всіх військ",
      "stat.health_all_ally": "Здоров'я всіх військ (також союзнику)",
      "stat.health_enemy": "Здоров'я всіх військ (діє на противника)",
      "stat.defense_all": "Захист усіх військ",
      "stat.defense_all_ally": "Захист усіх військ (також союзнику)",
      "stat.defense_monsters": "Захист проти монстрів",
      "stat.defense_cap": "Межа максимального захисту",
      "stat.defense_cap_ally": "Межа максимального захисту (також союзнику)",
      "stat.fear": "Жах",
      "stat.xp_battle": "Досвід героя в бою",
      "stat.xp_monsters": "Досвід героя в бою проти монстрів",
      "stat.mission_duration": "Тривалість місії загону з героєм",
      "stat.mission_cost": "Вартість відправки місій з військами",
      "stat.science": "Наука на годину",
      "stat.max_mana": "Максимальна мана",
      "stat.mana_regen": "Регенерація мани героя",
      "stat.spell_fail": "Шанс провалу ворожого закляття",
      "stat.magic_item": "Шанс знайти магічний предмет",
      "stat.magic_item_ruin": "Шанс знайти магічний предмет у руїні",
      "stat.building_damage": "Шанс пошкодити кожну будівлю",
      "stat.tower_attack_enemy": "Атака магічних веж (діє на противника)",
      "stat.tower_attack": "Атака магічним вежам",
      "stat.plunder_monsters": "Ресурси при грабунку монстрів",
      "stat.plunder_ruin": "Ресурси при грабунку в руїні",
      "stat.bag": "Місткість сумки героя",
      "stat.alchemy": "Вивчення лабораторіями алхіміків",
      "stat.observation": "Наука «Спостереження»",
      "stat.espionage": "Наука «Шпигунство»",
      "stat.incoming_attack": "Тривалість вхідних атак (діє на противника)",
      "stat.spell_range": "Дальність заклять",
      "rune.feo": "Фео",
      "rune.ur": "Ур",
      "rune.thorn": "Торн",
      "rune.io": "Ио",
      "rune.rad": "Рад",
      "rune.tyr": "Тир",
      "rune.gifu": "Гифу",
      "rune.yar": "Йар",
      "rune.hegl": "Хегль",
      "runeBonus.feo": "+25% отримуваного героєм досвіду в бою проти раси Монстрів",
      "runeBonus.ur": "+10% отримуваного героєм досвіду в бою",
      "runeBonus.thorn": "+5 захисту в бою проти раси Монстри",
      "runeBonus.io": "+3 захисту всіх військ",
      "runeBonus.rad": "+5% здоров'я всіх військ",
      "runeBonus.tyr": "−5% атаки (діє на противника) проти раси Монстрів",
      "runeBonus.gifu": "+3% атаки всіх військ",
      "runeBonus.yar": "−2% тривалості місії загону з героєм",
      "runeBonus.hegl": "−3% атаки (діє на противника)",
      "runeBonus.ancient.feo": "+30% отримуваного героєм досвіду в бою проти раси Монстрів",
      "runeBonus.ancient.ur": "+12% отримуваного героєм досвіду в бою",
      "runeBonus.ancient.thorn": "+6 захисту в бою проти раси Монстри",
      "runeBonus.ancient.io": "+4 захисту всіх військ",
      "runeBonus.ancient.rad": "+6% здоров'я всіх військ",
      "runeBonus.ancient.tyr": "−6% атаки (діє на противника) проти раси Монстрів",
      "runeBonus.ancient.gifu": "+4% атаки всіх військ",
      "runeBonus.ancient.yar": "−3% тривалості місії загону з героєм",
      "runeBonus.ancient.hegl": "−4% атаки (діє на противника)",

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
      "quests.hideAll": "Приховати всі квести",
      "quests.search": "Пошук квестів за назвою",
      "quests.noResults": "Квестів не знайдено.",
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
      "quests.alchemy5": "Алхімія 5",
      "quests.alchemy6": "Алхімія 6",
      "quests.dragonCloak": "Ланцюжок квестів — «Плащ дракона»",
      "quests.build": "Квести на будівництво",

      "calc.waves": "Хвилі",
      "calc.settings": "Налаштування калькулятора:",
      "calc.settingsTitle": "Налаштування інтерфейсу калькулятора",
      "calc.oldInput": "Старий варіант введення юнітів:",
      "calc.bigSpells": "Збільшене вікно заклять героя:",
      "calc.attacker": "Атакувальник",
      "calc.defender": "Захисник",
      "calc.unitLvl": "Рів. юнітів:",
      "calc.renegade": "відступник",
      "calc.faction": "Фракція",
      "calc.knights": "Лицарі",
      "calc.lightElves": "Світлі ельфи",
      "calc.demons": "Демони",
      "calc.darkElves": "Темні ельфи",
      "calc.monsters": "Монстри",
      "calc.monster.ordinary": "Звичайний",
      "calc.monster.owner": "Господар",
      "calc.monster.stone": "Стоун/Гроб/Сарк",
      "calc.monster.defenderHelp": "Дефер/підмога",
      "calc.undead": "Нежить",
      "calc.mage": "Чарівник",
      "calc.serverType": "Тип сервера:",
      "calc.miner": "Шахтарський",
      "calc.military": "Бойовий",
      "calc.factionWar": "Війна фракцій",
      "calc.econom": "Економічний",
      "calc.afterBattle": "(після бою)",
      "calc.won": "переміг",
      "calc.lost": "програв",
      "calc.randomDmg": "Випадкова шкода",
      "calc.chimeras": "Химери",
      "calc.predict": "Передбачити",
      "calc.ancientRune": "Античні руни",
      "calc.auto": "авто",
      "calc.retreatAt": "відступати при",
      "calc.lossPct": "% втрат",
      "calc.clear": "Очистити",
      "calc.close": "Закрити",
      "calc.disableHero": "вимк. героя",
      "calc.addAttacker": "Додати атакувальника",
      "calc.removeAttacker": "Прибрати атакувальника",
      "calc.addDefender": "Додати захисника",
      "calc.removeDefender": "Прибрати захисника",
      "calc.kz": "КЗ",
      "calc.maxDef": "максимум захисту",
      "calc.onLake": "на озері",
      "calc.landscape": "ландшафт",
      "calc.terrain.sacred": "Священна земля",
      "calc.terrain.dead": "Мертва земля",
      "calc.terrain.magicForest": "Чарівні ліси",
      "calc.terrain.cursedForest": "Прокляті ліси",
      "calc.terrain.mountains": "Гори",
      "calc.terrain.desert": "Пустеля",
      "calc.terrain.forest": "Ліси",
      "calc.terrain.steppe": "Степ",
      "calc.terrain.underground": "Підземелля",
      "calc.magicTower": "Маг. вежа",
      "calc.tower": "Вежа",
      "calc.forts": "Укріплення",
      "calc.gates": "Ворота",
      "calc.details": "Докладно",
      "calc.mode.atkMinDefMax": "Атак.(min)/Захист.(max)",
      "calc.mode.atkMaxDefMin": "Атак.(max)/Захист.(min)",
      "calc.mode.atkMaxDefAvg": "Атак.(max)/Захист.(сер)",
      "calc.mode.atkMinDefAvg": "Атак.(min)/Захист.(сер)",
      "calc.mode.atkAvgDefMax": "Атак.(сер)/Захист.(max)",
      "calc.mode.atkAvgDefMin": "Атак.(сер)/Захист.(min)",
      "calc.mode.random": "Випадкова шкода",
      "calc.mode.custom": "Налаштувати min/max",
      "calc.min": "min",
      "calc.max": "max",
      "calc.rnd": "вип",
      "calc.avg": "сер",
      "calc.atkShort": "Атак.",
      "calc.defShort": "Зах.",
      "calc.ruins": "Руїни",
      "calc.stonehedges": "Стоунхеджі",
      "calc.tombs": "Гробниці",
      "calc.ruinLvl": "Руїни {n} рів.",
      "calc.stonehedgeOf": "Стоунхедж: {name}",
      "calc.tomb.exchange": "Майстер обміну",
      "calc.tomb.quality": "Кількість у якість",
      "calc.tomb.choice": "Правильний вибір",
      "calc.tomb.runes": "Видобування рун",
      "calc.tomb.crystals": "Злиття кристалів",
      "calc.tombLvl": "{name} {n}рів",
      "calc.fortLvl": "Укріплення[{n} рів.]",
      "calc.towerLvl": "Вежа[{n} рів.]",
      "calc.magicTowerLvl": "Маг. вежа[{n} рів.]",
      "calc.lossesUnits": "Втрати: {n} юнітів",
      "calc.hideDetails": "Сховати деталі",
      "calc.chooseHero": "Обери героя, щоб побачити додаткові навички!",
      "calc.spec.paladin": "Паладин",
      "calc.spec.warrior": "Воїн",
      "calc.spec.saboteur": "Диверсант",
      "calc.spec.scout": "Розвідник",
      "calc.spec.peacemaker": "Миротворець",
      "calc.spec.destroyer": "Руйнівник",
      "calc.spec.gatherer": "Здобувач",
      "calc.spec.defender": "Захисник",
      "calc.spec.mentor": "Наставник",
      "calc.spec.trader": "Торговець",
      "calc.spec.builder": "Будівельник",
      "calc.spec.healer": "Цілитель",
      "calc.spec.illusionist": "Ілюзіоніст",
      "calc.spec.dissipator": "Розсіювач",
      "calc.spec.necromancer": "Некромант",
      "calc.spec.spellcaster": "Заклинатель"
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
      "runes.soloBonuses": "Бонусы отдельных рун",
      "runes.build": "Создать комбинацию",
      "runes.clearDraft": "Очистить",
      "runes.removeRune": "Убрать руну",
      "runes.summaryRunes": "Руны в слотах",
      "runes.summaryBonuses": "Общие бонусы",
      "runes.fromCombo": "комбинации",
      "runes.fromSolo": "отдельные руны",
      "runes.perHour": "ч",
      "stat.attack_all": "Атака всех войск",
      "stat.attack_all_ally": "Атака всех войск (также союзнику)",
      "stat.attack_enemy": "Атака всех войск (действует на противника)",
      "stat.attack_enemy_monsters": "Атака (действует на противника) против монстров",
      "stat.army_attack": "Усиление атаки армии",
      "stat.pursuer_attack": "Атака преследователей",
      "stat.health_all": "Здоровье всех войск",
      "stat.health_all_ally": "Здоровье всех войск (также союзнику)",
      "stat.health_enemy": "Здоровье всех войск (действует на противника)",
      "stat.defense_all": "Защита всех войск",
      "stat.defense_all_ally": "Защита всех войск (также союзнику)",
      "stat.defense_monsters": "Защита против монстров",
      "stat.defense_cap": "Предел максимальной защиты",
      "stat.defense_cap_ally": "Предел максимальной защиты (также союзнику)",
      "stat.fear": "Ужас",
      "stat.xp_battle": "Опыт героя в бою",
      "stat.xp_monsters": "Опыт героя в бою против монстров",
      "stat.mission_duration": "Длительность миссии отряда с героем",
      "stat.mission_cost": "Стоимость отправки миссий с войсками",
      "stat.science": "Наука в час",
      "stat.max_mana": "Максимальная мана",
      "stat.mana_regen": "Регенерация маны героя",
      "stat.spell_fail": "Шанс провала вражеского заклинания",
      "stat.magic_item": "Шанс найти магический предмет",
      "stat.magic_item_ruin": "Шанс найти магический предмет в руине",
      "stat.building_damage": "Шанс повредить каждое здание",
      "stat.tower_attack_enemy": "Атака магических башен (действует на противника)",
      "stat.tower_attack": "Атака магическим башням",
      "stat.plunder_monsters": "Ресурсы при грабеже монстров",
      "stat.plunder_ruin": "Ресурсы при грабеже в руине",
      "stat.bag": "Вместимость сумки героя",
      "stat.alchemy": "Изучение лабораториями алхимиков",
      "stat.observation": "Наука «Наблюдение»",
      "stat.espionage": "Наука «Шпионаж»",
      "stat.incoming_attack": "Длительность входящих атак (действует на противника)",
      "stat.spell_range": "Дальность заклинаний",
      "rune.feo": "Фэо",
      "rune.ur": "Ур",
      "rune.thorn": "Торн",
      "rune.io": "Ио",
      "rune.rad": "Рад",
      "rune.tyr": "Тир",
      "rune.gifu": "Гифу",
      "rune.yar": "Йар",
      "rune.hegl": "Хегль",
      "runeBonus.feo": "+25% получаемый героем опыт в бою против расы Монстров",
      "runeBonus.ur": "+10% получаемый героем опыт в бою",
      "runeBonus.thorn": "+5 защиты в бою против расы Монстры",
      "runeBonus.io": "+3 защиты всех войск",
      "runeBonus.rad": "+5% здоровье всех войск",
      "runeBonus.tyr": "−5% атаки, действует на противника против расы Монстров",
      "runeBonus.gifu": "+3% атака всех войск",
      "runeBonus.yar": "−2% длительность миссии отряда с героем",
      "runeBonus.hegl": "−3% атаки, действует на противника",
      "runeBonus.ancient.feo": "+30% получаемый героем опыт в бою против расы Монстров",
      "runeBonus.ancient.ur": "+12% получаемый героем опыт в бою",
      "runeBonus.ancient.thorn": "+6 защиты в бою против расы Монстры",
      "runeBonus.ancient.io": "+4 защиты всех войск",
      "runeBonus.ancient.rad": "+6% здоровье всех войск",
      "runeBonus.ancient.tyr": "−6% атаки, действует на противника против расы Монстров",
      "runeBonus.ancient.gifu": "+4% атака всех войск",
      "runeBonus.ancient.yar": "−3% длительность миссии отряда с героем",
      "runeBonus.ancient.hegl": "−4% атаки, действует на противника",

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
      "quests.hideAll": "Скрыть все квесты",
      "quests.search": "Поиск квестов по названию",
      "quests.noResults": "Квесты не найдены.",
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
      "quests.alchemy5": "Алхимия 5",
      "quests.alchemy6": "Алхимия 6",
      "quests.dragonCloak": "Цепочка квестов — «Плащ дракона»",
      "quests.build": "Квесты на строительство",

      "calc.waves": "Волны",
      "calc.settings": "Настройка калькулятора:",
      "calc.settingsTitle": "Настройка интерфейса калькулятора",
      "calc.oldInput": "Старый вариант ввода юнитов:",
      "calc.bigSpells": "Увеличенное окно с заклинаниями для героя:",
      "calc.attacker": "Атакующий",
      "calc.defender": "Защитник",
      "calc.unitLvl": "Ур. юнитов:",
      "calc.renegade": "отступник",
      "calc.faction": "Фракция",
      "calc.knights": "Рыцари",
      "calc.lightElves": "Светлые эльфы",
      "calc.demons": "Демоны",
      "calc.darkElves": "Темные эльфы",
      "calc.monsters": "Монстры",
      "calc.monster.ordinary": "Обычный",
      "calc.monster.owner": "Хозяин",
      "calc.monster.stone": "Стоун\\Гроб\\Сарк",
      "calc.monster.defenderHelp": "Дефер\\подмога",
      "calc.undead": "Нежить",
      "calc.mage": "Волшебник",
      "calc.serverType": "Тип сервера:",
      "calc.miner": "Шахтерский",
      "calc.military": "Боевой",
      "calc.factionWar": "Война фракций",
      "calc.econom": "Экономический",
      "calc.afterBattle": "(после боя)",
      "calc.won": "победил",
      "calc.lost": "проиграл",
      "calc.randomDmg": "Случайный урон",
      "calc.chimeras": "Химеры",
      "calc.predict": "Предвидеть",
      "calc.ancientRune": "Древние руны",
      "calc.auto": "авто",
      "calc.retreatAt": "отступать при",
      "calc.lossPct": "% потерь",
      "calc.clear": "Очистить",
      "calc.close": "Закрыть",
      "calc.disableHero": "откл. героя",
      "calc.addAttacker": "Добавить атакующего",
      "calc.removeAttacker": "Удалить атакующего",
      "calc.addDefender": "Добавить защитника",
      "calc.removeDefender": "Удалить защитника",
      "calc.kz": "КЗ",
      "calc.maxDef": "максимум защиты",
      "calc.onLake": "на озере",
      "calc.landscape": "ландшафт",
      "calc.terrain.sacred": "Священная земля",
      "calc.terrain.dead": "Мертвая земля",
      "calc.terrain.magicForest": "Волшебные леса",
      "calc.terrain.cursedForest": "Проклятые леса",
      "calc.terrain.mountains": "Горы",
      "calc.terrain.desert": "Пустыня",
      "calc.terrain.forest": "Леса",
      "calc.terrain.steppe": "Степь",
      "calc.terrain.underground": "Подземелье",
      "calc.magicTower": "Маг. башня",
      "calc.tower": "Башня",
      "calc.forts": "Укрепления",
      "calc.gates": "Ворота",
      "calc.details": "Подробно",
      "calc.mode.atkMinDefMax": "Атак.(min)/Защит.(max)",
      "calc.mode.atkMaxDefMin": "Атак.(max)/Защит.(min)",
      "calc.mode.atkMaxDefAvg": "Атак.(max)/Защит.(сред)",
      "calc.mode.atkMinDefAvg": "Атак.(min)/Защит.(сред)",
      "calc.mode.atkAvgDefMax": "Атак.(сред)/Защит.(max)",
      "calc.mode.atkAvgDefMin": "Атак.(сред)/Защит.(min)",
      "calc.mode.random": "Случайный урон",
      "calc.mode.custom": "Настроить min/max",
      "calc.min": "min",
      "calc.max": "max",
      "calc.rnd": "случ",
      "calc.avg": "сред",
      "calc.atkShort": "Атак.",
      "calc.defShort": "Защ.",
      "calc.ruins": "Руины",
      "calc.stonehedges": "Стоунхеджи",
      "calc.tombs": "Гробницы",
      "calc.ruinLvl": "Руины {n} лвл",
      "calc.stonehedgeOf": "Стоунхедж: {name}",
      "calc.tomb.exchange": "Мастер обмена",
      "calc.tomb.quality": "Количество в качество",
      "calc.tomb.choice": "Правильный выбор",
      "calc.tomb.runes": "Извлечение рун",
      "calc.tomb.crystals": "Слияние кристаллов",
      "calc.tombLvl": "{name} {n}ур",
      "calc.fortLvl": "Укрепление[{n}ур]",
      "calc.towerLvl": "Башня[{n}ур]",
      "calc.magicTowerLvl": "Маг.башня[{n}ур]",
      "calc.lossesUnits": "Потери: {n} юнитов",
      "calc.hideDetails": "Скрыть подробности",
      "calc.chooseHero": "выбери героя для определения его дополнительных навыков!",
      "calc.spec.paladin": "Паладин",
      "calc.spec.warrior": "Воитель",
      "calc.spec.saboteur": "Диверсант",
      "calc.spec.scout": "Разведчик",
      "calc.spec.peacemaker": "Миротворец",
      "calc.spec.destroyer": "Разрушитель",
      "calc.spec.gatherer": "Добытчик",
      "calc.spec.defender": "Защитник",
      "calc.spec.mentor": "Наставник",
      "calc.spec.trader": "Торговец",
      "calc.spec.builder": "Строитель",
      "calc.spec.healer": "Целитель",
      "calc.spec.illusionist": "Иллюзионист",
      "calc.spec.dissipator": "Рассеиватель",
      "calc.spec.necromancer": "Некромант",
      "calc.spec.spellcaster": "Заклинатель"
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

  function t(key, vars) {
    var pack = STRINGS[api.lang] || STRINGS.en;
    var s = pack[key] != null ? pack[key] : (STRINGS.en[key] != null ? STRINGS.en[key] : key);
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          s = String(s).split("{" + k + "}").join(String(vars[k]));
        }
      }
    }
    return s;
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

  function setTextNode(el, text, prefix) {
    if (!el) {
      return;
    }
    var i;
    var found = false;
    for (i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.replace(/\s/g, "")) {
        el.childNodes[i].nodeValue = (prefix || "") + text;
        found = true;
        break;
      }
    }
    if (!found) {
      el.insertBefore(document.createTextNode((prefix || "") + text), el.firstChild);
    }
  }

  function factionOptionLabel(index) {
    var factions = ["calc.knights", "calc.lightElves", "calc.demons", "calc.darkElves", "calc.monsters", "calc.undead", "calc.mage", "calc.chimeras"];
    if (index < factions.length) {
      return t(factions[index]);
    }
    var extra = index - factions.length;
    if (extra < 7) {
      return t("calc.ruinLvl", { n: extra + 1 });
    }
    extra -= 7;
    var runes = ["feo", "ur", "thorn", "io", "rad", "tyr", "gifu", "yar", "hegl"];
    if (extra < runes.length) {
      return t("calc.stonehedgeOf", { name: t("rune." + runes[extra]) });
    }
    extra -= runes.length;
    var tombs = [
      ["exchange", 5],
      ["quality", 4],
      ["choice", 5],
      ["runes", 5],
      ["crystals", 1]
    ];
    var tIdx = 0;
    var g;
    for (g = 0; g < tombs.length; g++) {
      if (extra < tombs[g][1]) {
        var lvl = tombs[g][0] === "crystals" ? 5 : extra + 1;
        return t("calc.tombLvl", { name: t("calc.tomb." + tombs[g][0]), n: lvl });
      }
      extra -= tombs[g][1];
    }
    return "";
  }

  function applyCalculator() {
    if (!document.getElementById("calk")) {
      return;
    }

    var i;
    var n;
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

    var closeBtn = document.querySelector("#vkl_vukl_setting .button_nw_setting");
    if (closeBtn) {
      closeBtn.textContent = t("calc.close");
    }

    var attackTexts = document.querySelectorAll(".attack_text");
    for (i = 0; i < attackTexts.length; i++) {
      var army = attackTexts[i].closest ? attackTexts[i].closest("[id^='army_']") : null;
      var num = army ? army.id.replace("army_", "") : "";
      var isDef = num === "2" || num === "3" || num === "4" || num === "5";
      attackTexts[i].textContent = isDef ? t("calc.defender") : t("calc.attacker");
    }

    var unitLvl = document.querySelectorAll("td.kastul_2");
    for (i = 0; i < unitLvl.length; i++) {
      for (n = 0; n < unitLvl[i].childNodes.length; n++) {
        if (unitLvl[i].childNodes[n].nodeType === 3 && unitLvl[i].childNodes[n].nodeValue.trim()) {
          unitLvl[i].childNodes[n].nodeValue = t("calc.unitLvl") + " ";
        }
      }
    }

    var renegade = document.querySelectorAll("td.kastul_1 label");
    for (i = 0; i < renegade.length; i++) {
      renegade[i].textContent = t("calc.renegade");
    }

    var retreat = document.querySelectorAll("td.kastul_3");
    for (i = 0; i < retreat.length; i++) {
      var texts = [];
      for (n = 0; n < retreat[i].childNodes.length; n++) {
        if (retreat[i].childNodes[n].nodeType === 3 && retreat[i].childNodes[n].nodeValue.trim()) {
          texts.push(retreat[i].childNodes[n]);
        }
      }
      if (texts[0]) {
        texts[0].nodeValue = t("calc.retreatAt") + " ";
      }
      if (texts[1]) {
        texts[1].nodeValue = " " + t("calc.lossPct");
      }
    }

    var clearBtns = document.querySelectorAll(".cleen_class");
    for (i = 0; i < clearBtns.length; i++) {
      clearBtns[i].setAttribute("title", t("calc.clear"));
    }

    var heroOff = document.querySelectorAll(".vkl_vukl_hero label");
    for (i = 0; i < heroOff.length; i++) {
      heroOff[i].textContent = t("calc.disableHero");
    }

    var addAtk = document.querySelectorAll(".add_attacer");
    for (i = 0; i < addAtk.length; i++) {
      var atkKey = addAtk[i].querySelector(".mines") ? "calc.removeAttacker" : "calc.addAttacker";
      setTextNode(addAtk[i], t(atkKey), " ");
    }
    var addDef = document.querySelectorAll(".add_defender");
    for (i = 0; i < addDef.length; i++) {
      var defKey = addDef[i].querySelector(".mines") ? "calc.removeDefender" : "calc.addDefender";
      setTextNode(addDef[i], t(defKey), " ");
    }

    var typeSelects = document.querySelectorAll("select[id^='type_']");
    for (i = 0; i < typeSelects.length; i++) {
      if (!/^type_[0-6]$/.test(typeSelects[i].id)) {
        continue;
      }
      var groups = typeSelects[i].querySelectorAll("optgroup");
      if (groups[0]) {
        groups[0].label = t("calc.faction");
      }
      if (groups[1]) {
        groups[1].label = t("calc.ruins");
      }
      if (groups[2]) {
        groups[2].label = t("calc.stonehedges");
      }
      if (groups[3]) {
        groups[3].label = t("calc.tombs");
      }
      var nest = ["exchange", "quality", "choice", "runes", "crystals"];
      for (n = 0; n < nest.length; n++) {
        if (groups[4 + n]) {
          groups[4 + n].label = t("calc.tomb." + nest[n]);
        }
      }
      var opts = typeSelects[i].options;
      for (n = 0; n < opts.length; n++) {
        var label = factionOptionLabel(n);
        if (label) {
          opts[n].text = label;
        }
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

    var ter = document.getElementById("teretory");
    if (ter) {
      var kzL = ter.querySelector("label[for='kz']");
      var mzL = ter.querySelector("label[for='mz']");
      var ozL = ter.querySelector("label[for='oz']");
      if (kzL) kzL.textContent = " " + t("calc.kz");
      if (mzL) mzL.textContent = " " + t("calc.maxDef");
      if (ozL) ozL.textContent = " " + t("calc.onLake");
      for (n = 0; n < ter.childNodes.length; n++) {
        if (ter.childNodes[n].nodeType === 3 && /landscape|ландшафт/i.test(ter.childNodes[n].nodeValue)) {
          ter.childNodes[n].nodeValue = " || " + t("calc.landscape") + " ";
        }
      }
      var terSel = document.getElementById("ter");
      var terrains = ["sacred", "dead", "magicForest", "cursedForest", "mountains", "desert", "forest", "steppe", "underground"];
      if (terSel) {
        for (n = 0; n < terSel.options.length && n < terrains.length; n++) {
          terSel.options[n].text = t("calc.terrain." + terrains[n]);
        }
      }
    }

    setTextNode(document.getElementById("mb_add"), t("calc.magicTower") + " ");
    setTextNode(document.getElementById("bb_add"), t("calc.tower") + " ");
    setTextNode(document.getElementById("yb_add"), t("calc.forts") + " ");
    setTextNode(document.getElementById("gate_add"), t("calc.gates") + " ");

    var begin = document.getElementById("begin");
    if (begin) {
      begin.textContent = t("calc.predict");
    }
    var auto = document.getElementById("auto");
    if (auto) {
      auto.textContent = t("calc.auto");
    }

    var mode = document.getElementById("type_doing");
    var modes = ["atkMinDefMax", "atkMaxDefMin", "atkMaxDefAvg", "atkMinDefAvg", "atkAvgDefMax", "atkAvgDefMin", "random", "custom"];
    if (mode) {
      for (n = 0; n < mode.options.length && n < modes.length; n++) {
        mode.options[n].text = t("calc.mode." + modes[n]);
      }
    }

    var mmKeys = ["calc.min", "calc.max", "calc.rnd", "calc.avg"];
    var mmBoxes = document.querySelectorAll("#setting_min_max > div");
    for (i = 0; i < mmBoxes.length; i++) {
      var mmId = mmBoxes[i].id || "";
      var mmNum = mmId.replace("min_max_", "");
      setTextNode(mmBoxes[i], (mmNum === "2" || mmNum === "3" || mmNum === "4" || mmNum === "5") ? t("calc.defShort") : t("calc.atkShort"));
      var mmSel = mmBoxes[i].querySelector("select");
      if (mmSel) {
        for (n = 0; n < mmSel.options.length && n < mmKeys.length; n++) {
          mmSel.options[n].text = t(mmKeys[n]);
        }
      }
    }

    var details = document.querySelector("#open_ditals");
    if (details) {
      setTextNode(details, t("calc.details"), " ");
    }
    var hideDetails = document.querySelector(".closs_ditals");
    if (hideDetails) {
      setTextNode(hideDetails, t("calc.hideDetails"), " ");
    }

    var ancientBtns = document.querySelectorAll(".ancient_rune, .ancient_rune_vkl");
    for (i = 0; i < ancientBtns.length; i++) {
      ancientBtns[i].title = t("calc.ancientRune");
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
