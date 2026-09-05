//=====================
//глoбальные переменные
//=====================
var skill_ost_mech = [0,0,0,0,0,0,0];
var skill_presledovanie_assasina = [0,0,0,0,0,0,0];
var skill_hp_mamonta = [0,0,0,0,0,0,0];
var skill_kam_bronya = [0,0,0,0,0,0,0];
var save_zhach = 0; //Cохраняем значение переменной для предотвращения обнуления навыков полкана при выборе профы

var this_type = 0; // Дубль this.type
var this_number = 0; // Дубль this.number
var this_number2 = 0; // Дубль this.number для нового меню
var this_num = 0; // Дубль для num skils
var kostyl_class_heroes = 0;
var select_shmotka_save_number = -1; // cохраняем значение открытой ячейки, для закрытия этого меню
var lvl_unit_podvetka_lvla = 0 // Cохраняем значение переменной уровня юнита,для подсветки уровня

var komplekt47_obs = 0;
var komplekt47 = 0;             //количество артефактов комплекта 47 - верховный эльф
var komplekt47_1 = 0;
var komplekt47_6 = 0;

var komplekt47_2 = 0;
var komplekt47_3 = 0;
var komplekt47_4 = 0;
var komplekt47_5 = 0;

var spes = 0;                   //специализация защитник =0 (0-3)
var max_z = false;              //false -vukl true-vkl максимум защиты (50)
var teretory = 0;           //тип теретории (0-8) по умолчанию "свящ.земл"
var limit_b = 0;                //отвечает за лимит бащень 0-2
var lvl_mb_1 = -1;              //lvl 1-й магической башни
var lvl_mb_2 = -1;              //lvl 2-й магической башни 
var lvl_bb_1 = -1;              //lvl 1-й башни
var lvl_bb_2 = -1;              //lvl 2-й башни
var kol_vo_yb = [0, 0, 0, 0, 0, 0, 0, 0];   //кол-во укреплений, порядковый номер масива - лвл укрепления
var victory = true;                     //для определения конца боя
var type_raz_ = 0;                      //тип подсчета 0-мин/мах 1-мах/мин 2-случайный
var num_volna = 0;                      //номер волны
var ficha_ruinu;                        //для фичи с руинами (5-11)
var othero = false;                     //стоит ли озеро на територии
var kz = false;                         //есть ли КЗ
var gate_hp = [db_gate[0][1], db_gate[0][1], db_gate[0][1]];
var gate_lvl = 0;
var flags_gate = [false, false, false];
var type_server = 1;                     //типы серверов для расчета
var yjas_ru = 0;
var yjas_ztch = 0;
var srvn_1 = 0;
var srvn_2 = 0;
var povtor = 0;
var procent_ot_ybitix_nejiti_attacerami = [0,0,0,0,0,0,0,0];
var procent_ot_ybitix_nejiti_zaschitnikami = [0,0,0,0,0,0,0,0];
var procentu;
var cost_dead_army = [[0, 0, 0, 0, 0], //цена убитых атакующиз
[0, 0, 0, 0, 0]];//цена убитых защитников

var go_back = [0, 0, 0, 0, 0]; //кастыль для отсупления
var flag_alximik = false; //кастыль для алимии на вещаx;
var db_yb_tmp = db_yb;
var db_mb_tmp = db_mb;
var db_bb_tmp = db_bb;

var damagInBatle = [0, 0, 0, 0, 0, 0, 0]; //нонесенный дамаг каждого войска со стороны - нужно для распределения фракционки

var ostatkiHP = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

var $_GET;
//клик по заклинанию отступничества
function no_backs(num) {
    go_back[num] = (go_back[num] == 5 ? 0 : (go_back[num] + 1));
    if (go_back[num]) {
        $("#div_magick_" + num + "_120").html('<br/><br/>' + go_back[num] + '/5');
    }
    else {
        $("#div_magick_" + num + "_120").html("<div class='black_fon'><br/><br/>0/5</div>");
    }
    if (go_back[num]) {
        $('#do_magick_' + num + '_120').show();
    }
    else {
        $('#do_magick_' + num + '_120').hide();
    }
    
}

function clear_one_back(num) {// очиска БЕССТРАШИЯ ПРИ КЛИКЕ
    heroes[num].magick[120] = 0;
    $("#div_magick_" + num + "_120").html("<div class='black_fon'><br/><br/>0/5</div>");
    $('#do_magick_' + num + '_120').hide();
}
//=====================
//описание объекта с юнитами
//=====================
function Units(atac, yes) {
    //свойства объекта
    //-----------------------------------------------------------
    //количесто юнитов по типам
    this.qq = [0, 0, 0, 0, 0, 0, 0, 0];               //кол-во юнитов
    this.qq0 = [0, 0, 0, 0, 0, 0, 0, 0];               //испуганые войска, которые в не боя
    this.vq = [
        [0, 0, 0, 0, 0, 0, 0, 0],              //юниты для 1-й волны     
        [0, 0, 0, 0, 0, 0, 0, 0],              //юниты для 2-й волны     
        [0, 0, 0, 0, 0, 0, 0, 0]               //юниты для 3-й волны 
    ];
    this.lvl = [3, 3, 3, 3, 3, 3, 3, 3];               //уровень юнитов   
    this.bonusu = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0];
    //масив с бонусами[защита 0-7елем][дамаг % 0-7елем][хп% 0-7елем]
    // [+максм защита][%воскрешения][убрать максим воскрешения %][минуса фракционки 20%][эфект укреплений%]
    // [подовление дамага магами][подовление маг. бащен%][%наймы из своих][%наймы из союзников][%наймы из противника]
    // [бонус опыта героя][побег][урон][территория][расса][кому][40-43 бонусы преследований][проц дамаг башен]
    // [к какой стороне -1 нападение -2 защитник][если атака по кому (-1 все)][эфект для озера -1 да 0 для всех]
    // [потеря на укреплениях в людях][запасной наверное][кз 0-выкл 1-вкл][прочность ворот кз%]
    this.create_bonus = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0];
    this.create_bonus_no_standart = [0, 0, 0, 0];//[урон всем, защита всем, здоровье всем, урон преследования]
    this.create_bonus_no_standart_vrag = [0, 0, 0];//[урон всем, здоровье всем, защита всем]
    this.yselenit_damag = 0;

    this.shtandart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //------------------------------------------------------------
    this.proc_damag = 0;                        //% общего урон в волне на даное войско или на укреплениях 
    this.proc_damag_unitu = [0, 0, 0, 0, 0, 0, 0, 0];  //% урона на типы войск в данной волне или на укреплениях
    this.presled_damag = [0, 0, 0, 0];             //сначала урон который наносят преследователи
    this.type = 0;                              //0-6 расса
    this.red = false;                           //отступничество рассы  
    this.otst = 100;                             //при каких потерях отступать
    this.otst_kol = 0;                          //сколько юнитов = 1%;
    this.boy = yes;                             //участие в бою
    this.min_max = 0;                           //min=0 max=1 дамаг 2-случайный
    this.stoem_voisk = 0;                       //стоемость всех войск для расчета фракционки
    this.hero = false;                          //есть ли герой у войска
    this.number = atac;                         //номер войска 0-4
    this.bul_v_boy = yes;                       //был ли изначально в бою
    this.win = false;                           //кто выграл
    this.dead = 0;                              //кол-во погибших
    this.ataks = 0;                             //наносимый массовый урон
    this.xxx = 0;                               //запасная переменная
    this.type_vrag = -1;                        //кто враг по рассе
    this.count_marader = 0;                        //процент марадерства
    this.v_boy_volnu = [yes, false, false];       //был ли в бою, значение для волн

};
//------------------------------------------------------------    
//-=-прототипы объекта(методы)-=-

/*** внутрение ***/
//включение выключение героя
Units.prototype.do_her = function () {
    this.hero = !$("#vkl_vukl_" + this.number).is(':checked');
    var x = parseInt($("#hero_" + this.number).css("background-position"));
    if (x == -1088) { //TODO поченить
        this.hero = false;
    }
    if (this.hero) {
        //раскрываем див с заклинаниями в результате
        $("#div_all_dress_litle_" + this.number + ', #magic_on_hero_' + this.number).show();
    } else {
        if (heroes[2].magick[118]) {
            $("#do_magick_2_118").css({ 'display': 'inline-block' });
        } else {
            $("#do_magick_2_118").hide();
        }
        //скрываем див с заклинаниями в результате
        $('#magic_on_hero_' + this.number + ", #div_all_dress_litle_" + this.number).hide();
    }

}

//перепись из волны
Units.prototype.is_volnu = function () {
    for (var q = 0; q < 8; q++) {
        this.qq[q] = this.vq[num_volna][q];
    }
}

//запись даного значения войск в масив для текушей волны
Units.prototype.volna_save = function () {
    for (var q = 0; q < 8; q++) {
        this.vq[num_volna][q] = this.qq[q];
    }
}

//проверка бонуса на максимумы
Units.prototype.limit_bonus = function (num, limit, min_max) {
    if (min_max) {
        this.bonusu[num] = this.bonusu[num] > limit ? limit : this.bonusu[num];
    }
    else {
        this.bonusu[num] = this.bonusu[num] < limit ? limit : this.bonusu[num];
    }
}

//проверка сразу многих бонусов
Units.prototype.limit_bonus_all = function (num_begin, num_end, limit, min_max) {
    for (; num_begin <= num_end; num_begin++) {
        this.limit_bonus(num_begin, limit, min_max);
    }
    
}

//добавление бонусного дамага для всех войск (скоко)
Units.prototype.bonus_damag_add_all = function (skoko) {
    for (var i = 0; i < 8; i++) {
        this.bonusu[8 + i] += skoko;
    }
}

//слаживание внешнего и внутрено бонусного масива (номер бонуса из БД,прибовляем врагу(true-да),<-номер расы на ком наложено)
Units.prototype.plus_bonus = function (num_b, num_ras, num_vraga) {
    
    if (isNaN(num_b) && num_b[0] == undefined)
        return false;
    if (typeof window.MLKalkApplyCustomSetEffect === "function") {
        if (window.MLKalkApplyCustomSetEffect(this, num_b)) {
            return true;
        }
    }
    if (num_b[0] != undefined) {
        db_bonuses[0] = num_b;
        num_b = 0;
    }
    if (kz && db_bonuses[num_b][46] == 4) {
        db_bonuses[0] = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        return false;
    }


    if ((db_bonuses[num_b][37] == -1 || db_bonuses[num_b][37] == teretory) &&
        (db_bonuses[num_b][38] == -1 || db_bonuses[num_b][38] == num_ras) &&
        (db_bonuses[num_b][46] == -1 || db_bonuses[num_b][46] == num_vraga) &&
        (!db_bonuses[num_b][47] || db_bonuses[num_b][47] == othero) &&
        (!db_bonuses[num_b][50] || db_bonuses[num_b][50] == kz)) {//проверка на соотвецтвие рассы и теретории для бонуса    i4 = this.bonusu.length - 1;
        var flagCheckKastul = false;

        if (!db_bonuses[num_b][50]) {
            flagCheckKastul = true;
        }
        else {
            if (this.number > 1 && this.number < 6) {
                flagCheckKastul = true;
            }
        }
        //катыль бонус считается только при атаке против вражеской фракции
        if (num_b == 982 || num_b == 983 || num_b == 984 || num_b == 985 || num_b == 986 || num_b == 1557 || num_b == 1558 || num_b == 1605 || num_b == 1606 || num_b == 1607 || num_b == 1608) {
            if (this.number < 2 || this.number == 6) {
                if (this.type != unitu[2].type && (
                    (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                    (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                    (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                    (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                    (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                    (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {
                    flagCheckKastul = true;

                    this_number = this.number;
                    this_type = this.type;
                }
                else {
                    flagCheckKastul = false;
                    this_number = this.number;
                    this_type = this.type;
                }
            }
            else {
                if (this.type != unitu[0].type && (
                    (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                    (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                    (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                    (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                    (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                    (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {
                    flagCheckKastul = true;
                    this_number = this.number;
                    this_type = this.type;
                }
                else {
                    flagCheckKastul = false;
                    this_number = this.number;
                    this_type = this.type;
                }
            }
        }

        if (flagCheckKastul) {
            var i4 = this.bonusu.length;
            for (var i5 = 0; i5 < i4; i5++) {
                if (i5 != 35)
                    this.bonusu[i5] += db_bonuses[num_b][i5];
            }

            //for(var i5=0;i5<i4;i5++){
            //    if (i5 != 35 || i5 != 37 || i5 != 38 || i5 != 39 || i5 != 45 || i5 != 46 || i5 != 47 ||  i5 != 49 ||  i5 != 50 ||  i5 != 51)
            //        this.bonusu[i5]+=db_bonuses[num_b][i5];
            //}

            //todo check this
            this.bonusu[35] = this.bonusu[35] > db_bonuses[num_b][35] ? this.bonusu[35] : db_bonuses[num_b][35];
            switch (num_b) {
                case 80: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(75, this.type, this.type_vrag);
                        unitu[3].plus_bonus(75, this.type, this.type_vrag);
                        unitu[4].plus_bonus(75, this.type, this.type_vrag);
                        unitu[5].plus_bonus(75, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(75, this.type, this.type_vrag);
                        unitu[1].plus_bonus(75, this.type, this.type_vrag);
                        unitu[6].plus_bonus(75, this.type, this.type_vrag);
                    }
                    break;
                }
                case 875: {
                    this.plus_bonus(108);
                    break;
                }
                case 876: {
                    this.plus_bonus(114);
                    break;
                }

                case 1210: {
                    if (this.number < 2 || this.number == 6) // 
                    {
                        unitu[0].plus_bonus(1230, this.type, this.type_vrag); // БРОНЯ ВЕРХОВНОГО ЭЛЬФА ДРЕВНЯЯ- РАБОЧИЙ СПОСОБ ПОДНЯТЬ ОБЩИЙ БОНУС С СОЮЗНИКОМ И ДОБАВИТЬ БОНУС СЕБЕ ОТДЕЛЬНО
                        unitu[1].plus_bonus(1230, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1230, this.type, this.type_vrag);
                    }
                    else {
                        unitu[2].plus_bonus(1230, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1230, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1230, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1230, this.type, this.type_vrag);
                    }
                    break;
                }
                
                case 1442: {
                    if (this.number < 2 || this.number == 6) // 
                    {
                        unitu[0].plus_bonus(1444, this.type, this.type_vrag); // ПОЯС ДРАКОНА- РАБОЧИЙ СПОСОБ ПОДНЯТЬ ОБЩИЙ БОНУС С СОЮЗНИКОМ И ДОБАВИТЬ БОНУС СЕБЕ ОТДЕЛЬНО
                        unitu[1].plus_bonus(1444, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1444, this.type, this.type_vrag);
                    }
                    else {
                        unitu[2].plus_bonus(1444, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1444, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1444, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1444, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1443: {
                    if (this.number < 2 || this.number == 6) // 
                    {
                        unitu[0].plus_bonus(1445, this.type, this.type_vrag); // ПОЯС ДРАКОНА- РАБОЧИЙ СПОСОБ ПОДНЯТЬ ОБЩИЙ БОНУС С СОЮЗНИКОМ И ДОБАВИТЬ БОНУС СЕБЕ ОТДЕЛЬНО
                        unitu[1].plus_bonus(1445, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1445, this.type, this.type_vrag);
                    }
                    else {
                        unitu[2].plus_bonus(1445, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1445, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1445, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1445, this.type, this.type_vrag);
                    }
                    break;
                }

                case 1211: {
                    if (this.number < 2 || this.number == 6) // 
                    {
                        unitu[0].plus_bonus(1231, this.type, this.type_vrag); // БРОНЯ ВЕРХОВНОГО ЭЛЬФА ПРОСТАЯ- РАБОЧИЙ СПОСОБ ПОДНЯТЬ ОБЩИЙ БОНУС (себе и союзгнику) И ДОБАВИТЬ БОНУС СЕБЕ ОТДЕЛЬНО
                        unitu[1].plus_bonus(1231, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1231, this.type, this.type_vrag);
                    }
                    else {
                        unitu[2].plus_bonus(1231, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1231, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1231, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1231, this.type, this.type_vrag);
                    }
                    break;
                }

                case 1215: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1217, this.type, this.type_vrag); //МЕЧ ВЕРХОВНОГО ЭЛЬФА ДРЕВНИЙ - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1217, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1217, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1217, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1217, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1217, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1227, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1600: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1602, this.type, this.type_vrag); //Наруч бога древний - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1602, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1602, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1602, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1602, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1602, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1602, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1216: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1218, this.type, this.type_vrag); //МЕЧ ВЕРХОВНОГО ЭЛЬФА ПРОСТОЙ - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1218, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1218, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1218, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1218, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1218, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1218, this.type, this.type_vrag);
                    }
                    break;
                }

                case 1223: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1224, this.type, this.type_vrag); //МЕЧ ДРАКОНА - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1224, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1224, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1224, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1224, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1224, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1224, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1453: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1454, this.type, this.type_vrag); //МЕЧ ДРАКОНА ДРЕВНИЙ- РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1454, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1454, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1454, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1454, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1454, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1454, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1226: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1227, this.type, this.type_vrag); //Броня ДРАКОНА - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1227, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1227, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1227, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1227, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1227, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1227, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1455: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1456, this.type, this.type_vrag); //Броня ДРАКОНА ДРЕВ - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1456, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1456, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1456, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1456, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1456, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1456, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1228: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1229, this.type, this.type_vrag); //Щит ДРАКОНА - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1229, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1229, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1229, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1229, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1229, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1229, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1459: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1460, this.type, this.type_vrag); //Щит ДРАКОНА ДРЕВ - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1460, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1460, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1460, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1460, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1460, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1460, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1225: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1232, this.type, this.type_vrag); //Шлем ДРАКОНА - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1232, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1232, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1232, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1232, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1232, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1232, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1449: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1450, this.type, this.type_vrag); //Шлем ДРАКОНА ДРЕВ - РАБОЧИЙ СПОСОБ ДОБАВЛЕНИЯ СЕБЕ ПЛЮШКИ И МИНУСАНУТЬ ПРОТИВНИКА
                        unitu[3].plus_bonus(1450, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1450, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1450, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1450, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1450, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1450, this.type, this.type_vrag);
                    }
                    break;
                }
                case 877: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(173, this.type, this.type_vrag);
                        unitu[3].plus_bonus(173, this.type, this.type_vrag);
                        unitu[4].plus_bonus(173, this.type, this.type_vrag);
                        unitu[5].plus_bonus(173, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(173, this.type, this.type_vrag);
                        unitu[1].plus_bonus(173, this.type, this.type_vrag);
                        unitu[6].plus_bonus(173, this.type, this.type_vrag);
                    }
                    break;
                }
                case 987: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(16, this.type, this.type_vrag);
                        unitu[3].plus_bonus(16, this.type, this.type_vrag);
                        unitu[4].plus_bonus(16, this.type, this.type_vrag);
                        unitu[5].plus_bonus(16, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(16, this.type, this.type_vrag);
                        unitu[1].plus_bonus(16, this.type, this.type_vrag);
                        unitu[6].plus_bonus(16, this.type, this.type_vrag);
                    }
                    break;
                }
                case 197: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(213, this.type, this.type_vrag);
                        unitu[3].plus_bonus(213, this.type, this.type_vrag);
                        unitu[4].plus_bonus(213, this.type, this.type_vrag);
                        unitu[5].plus_bonus(213, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(213, this.type, this.type_vrag);
                        unitu[1].plus_bonus(213, this.type, this.type_vrag);
                        unitu[6].plus_bonus(213, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1182: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1203, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1203, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1203, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1203, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1203, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1203, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1203, this.type, this.type_vrag);
                    }
                    break;
                }
                case 214: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(201, this.type, this.type_vrag);
                        unitu[3].plus_bonus(201, this.type, this.type_vrag);
                        unitu[4].plus_bonus(201, this.type, this.type_vrag);
                        unitu[5].plus_bonus(201, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(201, this.type, this.type_vrag);
                        unitu[1].plus_bonus(201, this.type, this.type_vrag);
                        unitu[6].plus_bonus(201, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1185: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1201, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1201, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1201, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1201, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1201, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1201, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1201, this.type, this.type_vrag);
                    }
                    break;
                }
                case 208: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(202, this.type, this.type_vrag);
                        unitu[3].plus_bonus(202, this.type, this.type_vrag);
                        unitu[4].plus_bonus(202, this.type, this.type_vrag);
                        unitu[5].plus_bonus(202, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(202, this.type, this.type_vrag);
                        unitu[1].plus_bonus(202, this.type, this.type_vrag);
                        unitu[6].plus_bonus(202, this.type, this.type_vrag);
                    }
                    break;
                }
                case 215: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(207, this.type, this.type_vrag);
                        unitu[3].plus_bonus(207, this.type, this.type_vrag);
                        unitu[4].plus_bonus(207, this.type, this.type_vrag);
                        unitu[5].plus_bonus(207, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(207, this.type, this.type_vrag);
                        unitu[1].plus_bonus(207, this.type, this.type_vrag);
                        unitu[6].plus_bonus(207, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1190: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1202, this.type, this.type_vrag);
                        unitu[3].plus_bonus(1202, this.type, this.type_vrag);
                        unitu[4].plus_bonus(1202, this.type, this.type_vrag);
                        unitu[5].plus_bonus(1202, this.type, this.type_vrag);
                    }
                    else {
                        unitu[0].plus_bonus(1202, this.type, this.type_vrag);
                        unitu[1].plus_bonus(1202, this.type, this.type_vrag);
                        unitu[6].plus_bonus(1202, this.type, this.type_vrag);
                    }
                    break;
                }
                case 801: {
                    this.plus_bonus(802);
                    this.plus_bonus(803);
                    this.plus_bonus(804);
                    this.plus_bonus(805);
                    this.plus_bonus(806);
                    break;
                }
                case 807: {
                    this.plus_bonus(808);
                    this.plus_bonus(809);
                    this.plus_bonus(810);
                    this.plus_bonus(811);
                    this.plus_bonus(812);
                    break;
                }
                case 813: {
                    this.plus_bonus(814);
                    this.plus_bonus(815);
                    this.plus_bonus(816);
                    this.plus_bonus(817);
                    this.plus_bonus(818);
                    break;
                }
                case 819: {
                    this.plus_bonus(820);
                    this.plus_bonus(821);
                    this.plus_bonus(822);
                    this.plus_bonus(823);
                    this.plus_bonus(824);
                    break;
                }
                case 825: {
                    this.plus_bonus(826);
                    this.plus_bonus(827);
                    this.plus_bonus(828);
                    this.plus_bonus(829);
                    this.plus_bonus(830);
                    break;
                }
                case 831: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(832, this.type, this.type_vrag);
                    }
                    break;
                }
                case 833: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(834, this.type, this.type_vrag);
                    }
                    break;
                }
                case 835: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(836, this.type, this.type_vrag);
                    }
                    break;
                }
                case 837: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(838, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1015: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1017, this.type, this.type_vrag);
                    }
                    break;
                }
                case 1198: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(1200, this.type, this.type_vrag);
                    }
                    break;
                }
                case 839: {
                    if (this.number < 2 || this.number == 6) {
                        unitu[2].plus_bonus(840, this.type, this.type_vrag);
                    }
                    break;
                }
                case 979: {
                    if (this.number > 1 && this.number < 6) {
                        unitu[0].plus_bonus(980);
                        unitu[1].plus_bonus(980);
                        unitu[6].plus_bonus(980);
                    }
                    break;
                }

                
            }
        }
    }
    db_bonuses[0] = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
}

//расчет суммы юнитов в текуший момент (раунд)
Units.prototype.sum_units = function () {
    var s = 0;
    for (var i = 0; i < 8; i++)
        s += this.qq[i];
    return s;
}

//расчитывает сколько в 1% войска юнитов
Units.prototype.proc = function () {
    this.otst_kol = this.sum_units() / 100;
}

//разчет процетов для раздачи дамага по юнитам
Units.prototype.procentu_dla_damaga = function () {
    var otst = this.sum_units() / 100;
    for (var i = 0; i < 8; i++) {
        this.proc_damag_unitu[i] = isNaN(this.qq[i] / otst) ? 0 : this.qq[i] / otst;
    }
}

//разчет процентов для раздачи дамага от укреплений
Units.prototype.procentu_dla_damaga_yb = function () {
    var s = this.sum_units() - this.qq[6];
    s /= 100;
    for (var i = 0; i < 6; i++) {
        this.proc_damag_unitu[i] = isNaN(this.qq[i] / s) ? 0 : this.qq[i] / s;
    }
    this.proc_damag_unitu[7] = isNaN(this.qq[7] / s) ? 0 : this.qq[7] / s;
    this.proc_damag_unitu[6] = 0;
}

//стоимоть войск (передаем количества войск по типам) сразу масив!!!
Units.prototype.cost = function (q) {
    var s = 0;
    var cur_db_cost;
    if (this.type != 4) {
        cur_db_cost = db_cost;
    }
    else {
        if (this.number == 2 && kz) {
            cur_db_cost = db_cost_casol_monster;
        }
        else {
            cur_db_cost = db_cost_monster;
        }
    }
    for (var i = 0; i < 8; i++)
        s += q[i] * cur_db_cost[i][this.lvl[i]][0];
    return s;
}

//просчет необходимости отступа и изменения значения в бою ли войско
Units.prototype.go_home = function () {
    var s = this.sum_units();
    if (s) {
        this.boy = s / this.otst_kol >= (100 - this.otst) ? true : false;
    }
    else {
        this.boy = false;
    }
    this.win = this.boy;
}

//формирование имени картинки для юнита [цвет][расса][тип][lvl],передаем тип юнита
Units.prototype.do_image = function (type_unit) {
    this.xxx = this.qq[type_unit] > 0 ? 544 : 0;
    return (" -" + (this.xxx + 68 * type_unit) + "px -" + (this.type * 396 + this.lvl[type_unit] * 99) + "px");
}

//сложение с необходимым бонусом (номер бонуса)!!!!!!!!!!!!!!!!!!!!!!!
Units.prototype.bonus_add = function (num_bonus) {
    var lim = this.bonusu.length;
    for (var i = 0; i < lim; i++) {
        this.bonusu[i - 1] += db_bonuses[num_bonus][i - 1];
    }
}

//подсчет мин и мак урона у одного типа войск (тип юнита, мин или мах или случайный)
Units.prototype.nanas_damag = function (num_unt, mm) {
    var r;
    switch (mm) {
        case 0: { //min
            r = this.qq[num_unt] * db_u[this.type][num_unt][this.lvl[num_unt]][1];
            break;
        }
        case 1: {//max
            r = this.qq[num_unt] * db_u[this.type][num_unt][this.lvl[num_unt]][2];
            break;
        }
        case 2: {//slych
            r = this.qq[num_unt] * (db_u[this.type][num_unt][this.lvl[num_unt]][1] + random_value(db_u[this.type][num_unt][this.lvl[num_unt]][2] - db_u[this.type][num_unt][this.lvl[num_unt]][1]));
            break;
        }
        case 3: {//sred
            r = (this.qq[num_unt] * db_u[this.type][num_unt][this.lvl[num_unt]][1] + this.qq[num_unt] * db_u[this.type][num_unt][this.lvl[num_unt]][2]) / 2.0;
            break;
        }
    }
    return r;
}

//подсчет мин и макс урона всего войск
Units.prototype.nanas_damag_all = function (mm) {
    
    //todo this atack % ot balistu i ot lyka
    var proc = 0;
    if (heroes[this.number].magick[1] && unitu[this.number].hero)
        proc = heroes[this.number].magick[1] * 2;

    if (heroes[this.number].magick[42] && unitu[this.number].hero)
        proc = heroes[this.number].magick[42] * 2;


    if (heroes[this.number].dress[3] == 45 && unitu[this.number].hero)
        proc += 25; //от лука

    if (heroes[this.number].dress[9] == 47 && unitu[this.number].hero)
    {
        if (heroes[this.number].dress_old[9] == 1)
        {
            proc += 24; //ДРЕВНИЙ НАРУЧ
        }
        else
        {
                proc += 20; //НЕ древний наруч
          
        }

    }

    if (unitu[this.number].yselenit_damag && unitu[this.number].yselenit_damag != undefined)
        proc += unitu[this.number].yselenit_damag;

    for (var i = 1; i < 8; i++) {
        var b = this.nanas_damag(i, mm);//b - bes bonusa
        b = (b + (b / 100) * this.bonusu[i + 8]);
        this.ataks += b;
        //add усиление
        this.ataks += (b / 100) * proc;
    }
}

//перевод % в каждом типе войск в дамаг с переменной proc_damag
Units.prototype.peregon_proc = function () {
    for (var i = 0; i < 8; i++) {
        this.proc_damag_unitu[i] = (this.proc_damag / 100) * this.proc_damag_unitu[i];
    }
}

//расчет наносимого дамага преследователями
Units.prototype.presled_nanos = function () {
    for (var i = 0; i < 4; i++)
        this.presled_damag[i] = ((this.nanas_damag((1 + i), this.min_max) / 100) * (100 + this.bonusu[(9 + i)])) / 100 * (100 + this.bonusu[(40 + i)]);
}

//нанесение дамага в на один тип юнита
Units.prototype.kill_one = function (n) {
    this.proc_damag_unitu[n] -= this.proc_damag_unitu[n] / 100 * this.bonusu[n]; //защита
    if (this.bonusu[16 + n] < -75)
        this.bonusu[16 + n] = -75;
    var xp = db_u[this.type][n][this.lvl[n]][0] + (db_u[this.type][n][this.lvl[n]][0] / 100) * this.bonusu[16 + n];
    //todo optimaze
    if (this.qq[n] > 0) {
        var tmpSum = (this.qq[n] * xp - this.proc_damag_unitu[n]) / xp;
        ostatkiHP[this.number][n] += tmpSum - Math.round(tmpSum);
    }

    this.qq[n] = this.qq[n] > 0 ? Math.round((this.qq[n] * xp - this.proc_damag_unitu[n]) / xp) : this.qq[n];

}

//нанесение дамага всем юнитом в соотвецтвии его наличия
Units.prototype.kill_all = function () {
    for (var i = 0; i < 8; i++)
        this.kill_one(i);
}

//перевод -челов в дополнительный дамаг - это для одного типа
Units.prototype.second_damag_one = function (num) {
    if (first && num > 0 && num < 5) {
        if (isNaN(procentu[this.number][num - 1])) { procentu[this.number][num - 1] = 0; }

        this.qq[num] = (this.qq[num] * (db_u[this.type][num][this.lvl[num]][0] + (db_u[this.type][num][this.lvl[num]][0] / 100) * this.bonusu[num])) + procentu[this.number][num - 1];
        if (this.qq[num] > 0) {
            this.qq[num] = 0;
        }
        else {
            this.qq[num] = Math.round(this.qq[num] / (db_u[this.type][num][this.lvl[num]][0] + (db_u[this.type][num][this.lvl[num]][0] / 100) * this.bonusu[num]))
        }
    }

    //old calculate
    // this.ataks -= this.qq[num] * (db_u[this.type][num][this.lvl[num]][0] + (db_u[this.type][num][this.lvl[num]][0]/100)*this.bonusu[num]);

    this.ataks -= this.qq[num] * (db_u[this.type][num][this.lvl[num]][0] + (db_u[this.type][num][this.lvl[num]][0] / 100) * this.bonusu[num + 16]);
}

//перевод -челов в дополнительный дамаг для всех минусных
Units.prototype.second_damag_all = function () {
    for (var i = 0; i < 8; i++) {
        if (this.qq[i] < 0) {
            this.second_damag_one(i);
            this.qq[i] = 0;
        }
        else {
            this.qq[i] = Math.round(this.qq[i]);
        }
    }
}

//обнуление процентов для раундов
Units.prototype.null_proc_damag = function () {
    for (var i = 0; i < 8; i++)
        this.proc_damag_unitu[i] = 0;
}

//TODO: проверить формулу расчет кол-ва зарядов у хилов с бонусами надбавки и добивания
Units.prototype.hils = function () {
    if (this.bonusu[25] < -99) {
        return 0;
    }
    return (this.qq[5] * db_u[this.type][5][this.lvl[5]][3]) / 100 * (100 + this.bonusu[25]);
}

//подсчет количества убитых с учетом бонуса на добивание
Units.prototype.dead_mean = function () {
    this.ataks = 0;
    for (var i = 0; i < 8; i++) {
        this.proc_damag_unitu[i] = Math.round(this.vq[num_volna][i] - this.qq[i] - this.qq0[i]);
        this.ataks += this.proc_damag_unitu[i];
    }
}

Units.prototype.sum_proc = function () {
    var s = 0;
    for (var i = 0; i < 8; i++)
        s += this.proc_damag_unitu[i];
    return s;
}

//воскрешаем мертвых
Units.prototype.xilaem = function () {
    for (; 1;) {
        if (!this.xxx || !(this.sum_proc())) {
            break;
        }
        for (var i = 0; i < 8; i++) {
            if (this.proc_damag_unitu[i]) {
                this.proc_damag_unitu[i]--;
                this.qq[i]++;
                this.xxx--;
            }
            if (!this.xxx) {
                break;
            }
        }
    }
}

//Units.prototype.xilaem = function(){
//    var flagExit = false;
//    for( ; true ; ){
//        if(!this.xxx || !(this.sum_proc()) || flagExit){
//            break;
//        }
//        for(var i = 0 ; i < 8 ; i++){
//            if(this.proc_damag_unitu[i]){
//                this.proc_damag_unitu[i]--;
//                this.qq[i]++;
//                if (this.xxx == 1)
//                {
//                    flagExit = true;
//                    this.xxx = 0;
//                }
//                else
//                {
//                    this.xxx--;
//                }
//
//            }
//            if(this.xxx <= 0){
//                break;
//            }
//        }
//    }
//}

//востоновление убижавших
Units.prototype.go_back_b = function () {
    for (var i = 0; i < 8; i++) {
        this.qq[i] += this.qq0[i];
    }
}

//перевод % мертвяков в наймов
Units.prototype.naimu_iz_ybitux = function () {
    //из своих
    var first_qq = this.qq[6];
    this.qq[6] += Math.round((this.proc_damag / 100) * this.bonusu[31]);

    //из союзн
    if (this.number < 2 || this.number == 6) {
        if (this.number == 1) {
            this.qq[6] += Math.round(((unitu[0].proc_damag + unitu[6].proc_damag) / 100) * this.bonusu[32]);
        }
        else
            if (this.number == 0) {
                this.qq[6] += Math.round(((unitu[1].proc_damag + unitu[6].proc_damag) / 100) * this.bonusu[32]);
            }
            else {
                this.qq[6] += Math.round(((unitu[6].proc_damag + unitu[0].proc_damag) / 100) * this.bonusu[32]);
            }
    }
    else {
        if (this.number == 2) {
            this.qq[6] += Math.round(((unitu[3].proc_damag + unitu[4].proc_damag + unitu[5].proc_damag) / 100) * this.bonusu[32]);
        }
        else {
            if (this.number == 3) {
                this.qq[6] += Math.round(((unitu[2].proc_damag + unitu[4].proc_damag + unitu[5].proc_damag) / 100) * this.bonusu[32]);
            }
            else
                if (this.number == 4) {
                    this.qq[6] += Math.round(((unitu[2].proc_damag + unitu[3].proc_damag + unitu[5].proc_damag) / 100) * this.bonusu[32]);
                }
                else {
                    this.qq[6] += Math.round(((unitu[2].proc_damag + unitu[3].proc_damag + unitu[4].proc_damag) / 100) * this.bonusu[32]);
                }
        }
    }

    //из врагов
    if (this.number < 2 || this.number == 6) {
        this.qq[6] += Math.round(((unitu[2].proc_damag + unitu[3].proc_damag + unitu[4].proc_damag + unitu[5].proc_damag) / 100) * this.bonusu[33]);
    }
    else {
        this.qq[6] += Math.round(((unitu[0].proc_damag + unitu[1].proc_damag + unitu[6].proc_damag) / 100) * this.bonusu[33]);
    }
    first_qq = this.qq[6] - first_qq;
    if (first_qq) {
        $('#nickrom_' + this.number + '_' + 6).val('+' + first_qq).css({ 'border-color': 'dodgerblue', 'color': 'dodgerblue' });
    }
}

//подсчет мертвоков
Units.prototype.dead_to_naim = function () {
    for (var i = 0; i < 8; i++) {
        this.proc_damag += this.vq[num_volna][i] - this.qq[i];
    }
}

//обнуление бонусов
Units.prototype.null_bonusu = function () {
    var lim = this.bonusu.length;
    for (var i = 0; i < lim; i++) {
        this.bonusu[i] = 0;
    }
    this.bonusu[24] = 50;
}

//перепись для онуления перед повторным подсчетом
Units.prototype.perepis = function () {
    for (var i = 0; i < 8; i++) {
        this.qq[i] = this.vq[num_volna][i];
        this.qq0[i] = 0;
    }
}

//переформирование переменных обьекта json в обьекты UNITS
Units.prototype.rewrite = function (old) {
    this.qq = old.qq;
    this.qq0 = old.qq0;
    this.vq = old.vq;
    this.lvl = old.lvl;
    this.bonusu = old.bonusu;
    if (undefined == old.yselenit_damag) {
        this.yselenit_damag = 0;
    }
    else {
        this.yselenit_damag = old.yselenit_damag
    }
    if (old.create_bonus == undefined) {
        this.create_bonus = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0];
        this.create_bonus_no_standart = [0, 0, 0, 0];//[урон всем, защита всем, здоровье всем, урон преследования]
    }
    else {
        this.create_bonus = old.create_bonus;
        this.create_bonus_no_standart = old.create_bonus_no_standart;
    }

    if (old.create_bonus_no_standart_vrag == undefined) {
        this.create_bonus_no_standart_vrag = [0, 0, 0];
    }
    else {
        this.create_bonus_no_standart_vrag = old.create_bonus_no_standart_vrag;
    }
    if (old.shtandart == undefined) {
        this.shtandart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else {
        this.shtandart = old.shtandart;
    }
    if (old.count_marader == undefined) {
        this.count_marader = 0;
    }
    else {
        this.count_marader = old.count_marader;
    }
    $('#marad_lvl_' + this.number).val(this.count_marader);

    for (var u = 0; u < 11; u++) {
        if (this.shtandart[u]) {
            $("#shtandart_" + this.number + '_' + u).html('<br><br>' + this.shtandart[u] + '/6').attr('title', "Активный штандарт: " + db_shtandart_alt[u][this.shtandart[u] - 1]);
            $("#litle_shtandart_" + this.number + '_' + u).css('display', 'inline-block').attr('title', "Активный штандарт: " + db_shtandart_alt[u][this.shtandart[u] - 1]);
        }
        else {
            $("#shtandart_" + this.number + '_' + u).html("<div class='black-shtandart'><br><br>0/6</div>").attr('title', "Штандарт");
            $("#litle_shtandart_" + this.number + '_' + u).hide();
        }
    }
    this.proc_damag = old.proc_damag;
    this.proc_damag_unitu = old.proc_damag_unitu;
    this.presled_damag = old.presled_damag;
    this.type = old.type;
    this.red = old.red;
    this.otst = old.otst;
    this.otst_kol = old.otst_kol;
    this.boy = old.boy;
    this.min_max = old.min_max;
    this.stoem_voisk = old.stoem_voisk;
    this.hero = old.hero;
    this.number = old.number;
    this.bul_v_boy = old.bul_v_boy;
    this.win = old.win;
    this.dead = old.dead;
    this.ataks = old.ataks;
    this.xxx = old.xxx;
    this.type_vrag = old.type_vrag;
    if (old.v_boy_volnu == undefined) {
        this.v_boy_volnu = [false, false, false];
        this.v_boy_volnu[num_volna] = old.bul_v_boy;
    }
    else {
        this.v_boy_volnu = old.v_boy_volnu;
    }
}

//помечание отступничества
Units.prototype.do_red = function () {
    this.red = this.red ? false : true;
}


/*** интерфейсные ***/
//скрытие/открытие дивов с войсками при загрузке
Units.prototype.div_true = function () {
    if (this.bul_v_boy) {
        $('#army_' + this.number).show();
        $('#delete_army_' + this.number).show();
        $('#plus_army_' + this.number).hide();
    }
    else {
        $("#delete_army_" + this.number).click();
    }
}

//выставляем процент отступления как есть
Units.prototype.otst_true = function () {
    $("#input_otst_" + this.number).val(this.otst);
}

//простановка штандартов
Units.prototype.change_one_shtandart = function (shtandart) {
    if (this.shtandart[shtandart] == 6) {
        this.shtandart[shtandart] = 0;
        $("#shtandart_" + this.number + '_' + shtandart).html("<div class='black-shtandart'><br><br>0/6</div>").attr('title', "Штандарт");
        $("#litle_shtandart_" + this.number + '_' + shtandart).hide();

    }
    else {
        this.shtandart[shtandart] += 1;
        $("#shtandart_" + this.number + '_' + shtandart).html('<br><br>' + this.shtandart[shtandart] + '/6').attr('title', "Активный штандарт: " + db_shtandart_alt[shtandart][this.shtandart[shtandart] - 1]);
        $("#litle_shtandart_" + this.number + '_' + shtandart).css('display', 'inline-block').attr('title', "Активный штандарт: " + db_shtandart_alt[shtandart][this.shtandart[shtandart] - 1]);
    }
}

//растановка чекетов
Units.prototype.checked_true = function () {
    if (this.red) {
        $("#red_" + this.number).attr("checked", "checked");
    }
    else {
        $("#red_" + this.number).attr("checked", "");
    }
}

//растановка для героя (вкл/выкл)
Units.prototype.checked_hero_true = function () {
    if (this.hero) {
        $("#vkl_vukl_" + this.number).attr("checked", "checked");
    }
    else {
        $("#vkl_vukl_" + this.number).attr("checked", "");
    }

}

//растановка в инпутах значений в соответствии с qq[i]
Units.prototype.input_true = function () {
    for (var k9 = 0; k9 < 8; k9++) {
        this.change_one_input(this.number, k9);
    }
    //todo:true input for create bonus
    for (var k = 0; k < 4; k++) {
        $("#nn_b_" + this.number + "_" + k).val(this.create_bonus_no_standart[k]);
        $("#n_b_" + this.number + "_" + k).val(this.create_bonus[k]);
        $("#n_b_" + this.number + "_" + (40 + k)).val(this.create_bonus[40 + k]);
    }
    for (var k = 0; k < 3; k++) {
        $("#nnv_b_" + this.number + "_" + k).val(this.create_bonus_no_standart_vrag[k]);
    }
    for (var k = 4; k < 37; k++) {
        $("#n_b_" + this.number + "_" + k).val(this.create_bonus[k]);
    }
    $("#n_b_" + this.number + "_" + 44).val(this.create_bonus[44]);
    $("#n_b_" + this.number + "_" + 48).val(this.create_bonus[48]);

    $("#ysiloc_b_" + this.number).val(this.yselenit_damag);
    
}

//% допустимых потерь
Units.prototype.go_back = function (num) {
    this.xxx = $.trim($("#input_otst_" + num).val());
    if (this.xxx >= 50 && this.xxx <= 100) {
        this.otst = parseInt(this.xxx);
    }
    else {
        $("#input_otst_" + num).val(this.otst);
    }
}

//функция обновления 1-й картинки (num,type_unit) для формирования id 
Units.prototype.update_one_img = function (num, type_unit) {
    $("#unit_" + num + "_" + type_unit).css('background-position', this.do_image(type_unit));
    
}

//извлечение кол-ва юнитов
Units.prototype.get_num = function (num, num2) {
    this.qq[num2] = parseInt($("#input_" + num + "_" + num2).val());
    this.qq[num2] = this.qq[num2] == undefined ? 0 : this.qq[num2];
    this.qq[num2] = isNaN(this.qq[num2]) ? 0 : this.qq[num2];
    $("#input_" + num + "_" + num2).val(this.qq[num2]);
    if (!ficha_ruinu || this.number == 2 || this.number == 3 || this.number == 4 || this.number == 5) {
        switch (ficha_ruinu) {
            case 7: {
                this.qq[0] = this.qq[0];
                this.qq[1] = this.qq[1];
                this.qq[2] = this.qq[2];
                this.qq[3] = 0;
                this.qq[4] = 0;
                this.qq[5] = 0;
                this.qq[6] = 0;
                this.qq[7] = 0;
                break;
            }
            case 8: {
                this.qq[0] = this.qq[0];
                this.qq[1] = 0;
                this.qq[2] = this.qq[2];
                this.qq[3] = this.qq[3];
                this.qq[4] = 0;
                this.qq[5] = 0;
                this.qq[6] = 0;
                this.qq[7] = 0;
                break;
            }
            case 9: {
                this.qq[0] = this.qq[0];
                this.qq[1] = 0;
                this.qq[2] = 0;
                this.qq[3] = this.qq[3];
                this.qq[4] = this.qq[4];
                this.qq[5] = this.qq[5];
                this.qq[6] = this.qq[6];
                this.qq[7] = this.qq[7];
                break;
            }
            case 10: {
                this.qq[0] = this.qq[0];
                this.qq[1] = this.qq[1];
                this.qq[2] = 0;
                this.qq[3] = 0;
                this.qq[4] = this.qq[4];
                this.qq[5] = this.qq[5];
                this.qq[6] = this.qq[6];
                this.qq[7] = this.qq[7];
                break;
            }
            case 11: {
                this.qq[0] = this.qq[0];
                this.qq[1] = 0;
                this.qq[2] = 0;
                this.qq[3] = 0;
                this.qq[4] = 0;
                this.qq[5] = this.qq[5];
                this.qq[6] = this.qq[6];
                this.qq[7] = this.qq[7];
                break;
            }
            case 12: {
                this.qq[0] = this.qq[0];
                this.qq[1] = this.qq[1];
                this.qq[2] = this.qq[2];
                this.qq[3] = this.qq[3];
                this.qq[4] = this.qq[4];
                this.qq[5] = this.qq[5];
                this.qq[6] = this.qq[6];
                this.qq[7] = this.qq[7];
                break;
            }
            case 13: {
                this.qq[0] = this.qq[0];
                this.qq[1] = this.qq[1];
                this.qq[2] = this.qq[2];
                this.qq[3] = this.qq[3];
                this.qq[4] = this.qq[4];
                this.qq[5] = this.qq[5];
                this.qq[6] = this.qq[6];
                this.qq[7] = this.qq[7];
                break;
            }
            case 14: {

                //Cтоун фео  
                this.qq[0] = 12500;
                this.qq[1] = 4800;
                this.qq[2] = 3700;
                this.qq[3] = 2300;
                this.qq[4] = 2100;
                this.qq[5] = 1900;
                this.qq[6] = 6900;
                this.qq[7] = 1600;
                break;
            }
            case 15: {

                //Cтоун ур  
                this.qq[0] = 18000;
                this.qq[1] = 8390;
                this.qq[2] = 4880;
                this.qq[3] = 5000;
                this.qq[4] = 4300;
                this.qq[5] = 2650;
                this.qq[6] = 10500;
                this.qq[7] = 2250;
                break;
            }
            case 16: {

                //Cтоун торн  
                this.qq[0] = 23507;
                this.qq[1] = 9610;
                this.qq[2] = 6305;
                this.qq[3] = 5505;
                this.qq[4] = 5000;
                this.qq[5] = 3375;
                this.qq[6] = 13900;
                this.qq[7] = 2915;
                break;
            }
            case 17: {

                //Cтоун ио  
                this.qq[0] = 30000;
                this.qq[1] = 12000;
                this.qq[2] = 11000;
                this.qq[3] = 8000;
                this.qq[4] = 6900;
                this.qq[5] = 5000;
                this.qq[6] = 16500;
                this.qq[7] = 4100;
                break;
            }
            case 18: {

                //Cтоун рад  
                this.qq[0] = 33000;
                this.qq[1] = 16000;
                this.qq[2] = 13000;
                this.qq[3] = 10000;
                this.qq[4] = 8650;
                this.qq[5] = 4200;
                this.qq[6] = 17000;
                this.qq[7] = 3500;
                break;
            }
            case 19: {

                //Cтоун тир  
                this.qq[0] = 40000;
                this.qq[1] = 19500;
                this.qq[2] = 13900;
                this.qq[3] = 9700;
                this.qq[4] = 10500;
                this.qq[5] = 8000;
                this.qq[6] = 24000;
                this.qq[7] = 5000;
                break;
            }
            case 20: {

                //Cтоун гифу  
                this.qq[0] = 43000;
                this.qq[1] = 20000;
                this.qq[2] = 16500;
                this.qq[3] = 10000;
                this.qq[4] = 13400;
                this.qq[5] = 7500;
                this.qq[6] = 28800;
                this.qq[7] = 5600;
                break;
            }
            case 21: {

                //Cтоун йар  
                this.qq[0] = 50500;
                this.qq[1] = 27000;
                this.qq[2] = 19800;
                this.qq[3] = 12900;
                this.qq[4] = 13800;
                this.qq[5] = 7700;
                this.qq[6] = 26600;
                this.qq[7] = 7600;
                break;
            }
            case 22: {

                //Cтоун хегль  
                this.qq[0] = 56000;
                this.qq[1] = 25000;
                this.qq[2] = 20000;
                this.qq[3] = 15500;
                this.qq[4] = 15000;
                this.qq[5] = 9500;
                this.qq[6] = 36000;
                this.qq[7] = 6000;
                break;
            }

            case 23: {

                //Гробница мастер обмена 1  
                this.qq[0] = 23800;
                this.qq[1] = 11500;
                this.qq[2] = 8200;
                this.qq[3] = 7100;
                this.qq[4] = 5900;
                this.qq[5] = 4300;
                this.qq[6] = 15000;
                this.qq[7] = 3300;
                break;
            }
            case 24: {

                //Гробница мастер обмена 2 
                this.qq[0] = 33000;
                this.qq[1] = 16000;
                this.qq[2] = 12990;
                this.qq[3] = 10300;
                this.qq[4] = 9640;
                this.qq[5] = 5900;
                this.qq[6] = 19000;
                this.qq[7] = 5100;
                break;
            }
            case 25: {

                //Гробница мастер обмена 3 
                this.qq[0] = 43000;
                this.qq[1] = 25100;
                this.qq[2] = 17990;
                this.qq[3] = 12300;
                this.qq[4] = 11640;
                this.qq[5] = 7500;
                this.qq[6] = 27000;
                this.qq[7] = 5400;
                break;
            }
            case 26: {

                //Гробница мастер обмена 4 
                this.qq[0] = 71900;
                this.qq[1] = 31300;
                this.qq[2] = 26800;
                this.qq[3] = 20205;
                this.qq[4] = 19669;
                this.qq[5] = 10700;
                this.qq[6] = 42090;
                this.qq[7] = 9100;
                break;
            }
            case 27: {

                //Гробница мастер обмена 5 
                this.qq[0] = 77000;
                this.qq[1] = 38170;
                this.qq[2] = 35153;
                this.qq[3] = 29472;
                this.qq[4] = 24760;
                this.qq[5] = 11100;
                this.qq[6] = 59730;
                this.qq[7] = 12250;
                break;
            }
            case 28: {

                //Гробница количество в качество 1
                this.qq[0] = 29560;
                this.qq[1] = 14980;
                this.qq[2] = 12087;
                this.qq[3] = 9825;
                this.qq[4] = 10030;
                this.qq[5] = 4700;
                this.qq[6] = 21014;
                this.qq[7] = 4325;
                break;
            }
            case 29: {

                //Гробница количество в качество 2
                this.qq[0] = 35426;
                this.qq[1] = 22445;
                this.qq[2] = 15613;
                this.qq[3] = 13271;
                this.qq[4] = 12109;
                this.qq[5] = 6903;
                this.qq[6] = 25384;
                this.qq[7] = 5125;
                break;
            }
            case 30: {

                //Гробница количество в качество 3
                this.qq[0] = 57870;
                this.qq[1] = 25875;
                this.qq[2] = 18415;
                this.qq[3] = 20460;
                this.qq[4] = 14295;
                this.qq[5] = 7980;
                this.qq[6] = 37570;
                this.qq[7] = 7135;
                break;
            }
            case 31: {

                //Гробница количество в качество 4
                this.qq[0] = 82256;
                this.qq[1] = 43424;
                this.qq[2] = 34213;
                this.qq[3] = 22729;
                this.qq[4] = 21841;
                this.qq[5] = 11056;
                this.qq[6] = 54785;
                this.qq[7] = 12861;
                break;
            }

            case 32: {

                //Гробница выбор 1
                this.qq[0] = 45395;
                this.qq[1] = 22010;
                this.qq[2] = 13300;
                this.qq[3] = 10760;
                this.qq[4] = 9330;
                this.qq[5] = 5105;
                this.qq[6] = 27020;
                this.qq[7] = 4504;
                break;
            }
            case 33: {

                //Гробница выбор 2
                this.qq[0] = 61350;
                this.qq[1] = 29423;
                this.qq[2] = 20300;
                this.qq[3] = 17760;
                this.qq[4] = 16330;
                this.qq[5] = 7995;
                this.qq[6] = 36256;
                this.qq[7] = 6824;
                break;
            }
            case 34: {

                //Гробница выбор 3
                this.qq[0] = 78874;
                this.qq[1] = 52467;
                this.qq[2] = 29008;
                this.qq[3] = 32192;
                this.qq[4] = 21776;
                this.qq[5] = 15256;
                this.qq[6] = 58088;
                this.qq[7] = 12087;
                break;
            }
            case 35: {

                //Гробница выбор 4
                this.qq[0] = 131868;
                this.qq[1] = 62644;
                this.qq[2] = 50932;
                this.qq[3] = 36964;
                this.qq[4] = 39760;
                this.qq[5] = 21682;
                this.qq[6] = 77148;
                this.qq[7] = 17003;
                break;
            }
            case 36: {

                //Гробница выбор 5
                this.qq[0] = 229120;
                this.qq[1] = 90330;
                this.qq[2] = 69720;
                this.qq[3] = 50480;
                this.qq[4] = 53680;
                this.qq[5] = 32400;
                this.qq[6] = 146220;
                this.qq[7] = 30001;
                break;
            }
            case 37: {

                //Гробница Руна 1
                this.qq[0] = 23112;
                this.qq[1] = 13548;
                this.qq[2] = 9930;
                this.qq[3] = 8302;
                this.qq[4] = 8762;
                this.qq[5] = 3568;
                this.qq[6] = 15748;
                this.qq[7] = 3038;
                break;
            }
            case 38: {

                //Гробница Руна 2
                this.qq[0] = 44788;
                this.qq[1] = 24532;
                this.qq[2] = 17912;
                this.qq[3] = 14248;
                this.qq[4] = 13216;
                this.qq[5] = 7916
                this.qq[6] = 24604;
                this.qq[7] = 5236;
                break;
            }
            case 39: {

                //Гробница Руна 3
                this.qq[0] = 58432;
                this.qq[1] = 29578;
                this.qq[2] = 21357;
                this.qq[3] = 19378;
                this.qq[4] = 17396;
                this.qq[5] = 9751
                this.qq[6] = 34567;
                this.qq[7] = 7234;
                break;
            }
            case 40: {

                //Гробница Руна 4
                this.qq[0] = 81254;
                this.qq[1] = 39536;
                this.qq[2] = 30448;
                this.qq[3] = 3040;
                this.qq[4] = 25768;
                this.qq[5] = 14080
                this.qq[6] = 57416;
                this.qq[7] = 9897;
                break;
            }
            case 41: {

                //Гробница Руна 5
                this.qq[0] = 111510;
                this.qq[1] = 67300;
                this.qq[2] = 46700;
                this.qq[3] = 36670;
                this.qq[4] = 32130;
                this.qq[5] = 15180
                this.qq[6] = 64710;
                this.qq[7] = 13090;
                break;
            }
            case 42: {

                //Гробница Слияние кристаллов 5
                this.qq[0] = 34597;
                this.qq[1] = 23950;
                this.qq[2] = 14696;
                this.qq[3] = 15389;
                this.qq[4] = 14185;
                this.qq[5] = 6889
                this.qq[6] = 27313;
                this.qq[7] = 5797;
                break;
            }
            
        }
                // Вызов функции для обновления стилей подсветки уровня юнитов
                updateLevelStyling.call(this);
        for (lg = 0; lg < 8; lg++) {
            this.vq[num_volna][lg] = this.qq[lg];
            this.change_one_input(this.number, lg);
        }
    }
    this.update_one_img(num, num2);
}

//формирование и вставка картинки для поля с героем без гeроя=)
Units.prototype.no_hero_img = function () {
    if (!this.hero) {
        $("#hero_" + this.number).removeClass('big_img').addClass('first_img').css({ 'background-position': '-1088px -' + (99 * this.type) + 'px' });
    }
}

//функция обновления 8 типов юнитов картинок (num) для формирования id
Units.prototype.update_8_img = function (num) {
    for (var i = 0; i < 8; i++) {
        this.update_one_img(num, i);
        
    }
}

//функция обновления всех картинок при смене расы или еще чего (num) для формирования id
Units.prototype.change_all_img = function (num) {
    this.update_8_img(num);
    if (!this.hero)
        this.no_hero_img();
}

//смена рассы (num) для формирования id //true - load function, false - normal
Units.prototype.change_type = function (byl) {
    if (byl) {
        if (this.number == 2 && ficha_ruinu) {
            document.getElementById("type_" + this.number).selectedIndex = ficha_ruinu;
            if (ficha_ruinu > 4) {
                document.getElementById("auto").style.disabled = false;
            }
        }
        else {
            document.getElementById("type_" + this.number).selectedIndex = this.type;
            if (this.number == 2) {
                document.getElementById("auto").style.disabled = true;
            }
        }
    }
    else {
        this.type = document.getElementById("type_" + this.number).selectedIndex;
        if (this.number == 2 && document.getElementById("type_" + this.number).selectedIndex > 4) {
            document.getElementById("auto").disabled = false;
        }
        else {
            document.getElementById("auto").disabled = true;
        }
    }
    if (this.type > 3) {
        this.otst = 100;
        document.getElementById("input_otst_" + this.number).value = 100;
    }
    if (this.number == 2 && heroes[2].class_hero == 3) {
        if (document.getElementById("type_" + this.number).selectedIndex == 8) {
            heroes[2].skils[0] = 5;
            heroes[2].skils[1] = 5;
            heroes[2].skils[2] = 5;
            heroes[2].skils[3] = 3;
            heroes[2].skils[4] = 3;
            heroes[2].skils[5] = 5;
            heroes[2].skils[6] = 3;
            heroes[2].skils[7] = 1;
            heroes[2].skils[8] = 1;
            heroes[2].skils[9] = 1;
        }
        else {
            heroes[2].skils[0] = 5;
            heroes[2].skils[1] = 5;
            heroes[2].skils[2] = 5;
            heroes[2].skils[3] = 5;
            heroes[2].skils[4] = 5;
            heroes[2].skils[5] = 5;
            heroes[2].skils[6] = 5;
            heroes[2].skils[7] = 5;
            heroes[2].skils[8] = 5;
            heroes[2].skils[9] = 5;
        }
        //картинки скилов
        for (var iks = 0; iks < 24; iks++) {
            heroes[2].change_image_skils(this.number, iks);
            document.getElementById("skils_" + iks + "_" + this.number).innerHTML = "<br/>" + "<br/>" + heroes[2].skils[iks] + "/5";
        }
    }
    if (this.type > 6) {
        ficha_ruinu = this.type;
        this.type = 4;
        //скрываем ненужные войска и обнуляем их
        //        $("#army_3, #army_4, #army_5, #plus_army_3, #plus_army_4, #plus_army_5, #delete_army_3, #delete_army_4, #delete_army_5").hide();
        //        unitu[3].clear_all(3);
        //        unitu[4].clear_all(4);
        //        unitu[5].clear_all(5);
        //        unitu[3].bul_v_boy = false;
        //        unitu[4].bul_v_boy = false;
        //        unitu[5].bul_v_boy = false;
        //отступник ли руины!!!!!!!!
        //активация дивав в подробностях
        //$('#cost_3,#cost_4,#cost_5,.escape_3,.nickrom_3,.back_3,.xil_3,.escape_4,.nickrom_4,.back_4,.xil_4,.escape_5,.nickrom_5,.back_5,.xil_5').hide();

        //        for(var km=0; km < 20; km++){
        //            $('.raynd_'+km+'_3,.raynd_'+km+'_4,.raynd_'+km+'_5').hide();
        //        }

        switch (ficha_ruinu) {
            case 7: {
                this.lvl[0] = 0;
                this.lvl[1] = 0;
                this.lvl[2] = 0;
                this.lvl[3] = 0;
                this.lvl[4] = 0;
                this.lvl[5] = 0;
                this.lvl[6] = 0;
                this.lvl[7] = 0;
                break;
            }
            case 8: {
                this.lvl[0] = 0;
                this.lvl[1] = 0;
                this.lvl[2] = 1;
                this.lvl[3] = 0;
                this.lvl[4] = 0;
                this.lvl[5] = 0;
                this.lvl[6] = 0;
                this.lvl[7] = 0;
                break;
            }
            case 9: {
                this.lvl[0] = 1;
                this.lvl[1] = 0;
                this.lvl[2] = 0;
                this.lvl[3] = 1;
                this.lvl[4] = 0;
                this.lvl[5] = 0;
                this.lvl[6] = 0;
                this.lvl[7] = 0;
                break;
            }
            case 10: {
                this.lvl[0] = 2;
                this.lvl[1] = 1;
                this.lvl[2] = 0;
                this.lvl[3] = 0;
                this.lvl[4] = 1;
                this.lvl[5] = 1;
                this.lvl[6] = 1;
                this.lvl[7] = 1;
                break;
            }
            case 11: {
                this.lvl[0] = 2;
                this.lvl[1] = 0;
                this.lvl[2] = 0;
                this.lvl[3] = 0;
                this.lvl[4] = 0;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 12: {
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 13: {

                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            
            case 14: {

                //Cтоун фео  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 15: {

                //Cтоун ур  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 16: {

                //Cтоун торн  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 17: {

                //Cтоун ио  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 18: {

                //Cтоун рад  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 19: {

                //Cтоун тир  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 20: {

                //Cтоун гифу  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 21: {

                //Cтоун йар  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 22: {

                //Cтоун хегль  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 23: {

                //Гробница мастер обмена 1  
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 24: {

                //Гробница мастер обмена 2 
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 25: {

                //Гробница мастер обмена 3 
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 26: {

                //Гробница мастер обмена 4 
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 27: {

                //Гробница мастер обмена 5 
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 28: {

                //Гробница количество в качество 1
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 29: {

                //Гробница количество в качество 2
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 30: {

                //Гробница количество в качество 3
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 31: {

                //Гробница количество в качество 4
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 32: {

                //Гробница выбор 1
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 33: {

                //Гробница выбор 2
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 34: {

                //Гробница выбор 3
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 35: {

                //Гробница выбор 4
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 36: {

                //Гробница выбор 5
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 37: {

                //Гробница Руна 1
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 38: {

                //Гробница Руна 2
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 39: {

                //Гробница Руна 3
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 40: {

                //Гробница Руна 4
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 41: {

                //Гробница Руна 5
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
            case 42: {

                //Гробница Слияние кристаллов 5
                this.lvl[0] = 2;
                this.lvl[1] = 2;
                this.lvl[2] = 2;
                this.lvl[3] = 2;
                this.lvl[4] = 2;
                this.lvl[5] = 2;
                this.lvl[6] = 2;
                this.lvl[7] = 2;
                break;
            }
        }

        hn = 8;
        do {
            hn--;
            this.get_num(this.number, hn);
        } while (hn);
    }
    else {
        //вывод того что скрывали 
        if (!unitu[3].bul_v_boy && !byl) {
            document.getElementById("plus_army_3").style.display = "block";
            if (this.type < 4) {
                this.otst = 100;
                document.getElementById("input_otst_2").value = 100;
            }
            if (this.number == 2) {
                ficha_ruinu = 0;
            }
        }
    }
    this.change_all_img(this.number);
    calculate_marader();
}

function updateLevelStyling() {
    const currentNumber = unitu[this.number].number; // Получаем текущее значение
    const levels = unitu[this.number].lvl; // Получаем массив уровней

    // Проверяем, все ли значения в массиве равны
    const allEqual = levels.every(level => level === levels[0]);

    // Определяем индекс для подсветки
    const index = allEqual ? levels[0] : null;

    // Проходим по всем возможным уровням (0-3)
    for (let lvl = 0; lvl <= 3; lvl++) {
        const elementId = `lvl_${currentNumber}_${lvl}`;
        const element = document.getElementById(elementId);

        if (allEqual) {
            if (lvl === index) {
                // Если все значения равны и текущий уровень совпадает с индексом
                element.style.background = "#afa";
            } else {
                // Если все значения равны, но текущий уровень не совпадает
                element.style.background = "#ffffff";
            }
        } else {
            // Если значения не равны
            element.style.background = "#ffffff";
        }

        // Общий стиль
        element.style.borderRadius = "10px";
    }
}

//смена лвл по клику на перса и + смена картинки написаным методом
Units.prototype.change_one_lvl = function (num, type_unit) {
    if (!ficha_ruinu || this.number != 2) {
        this.lvl[type_unit] = this.lvl[type_unit] == 3 ? 0 : this.lvl[type_unit] + 1;
        this.update_one_img(num, type_unit);
        //document.getElementById("unit_"+num+"_"+type_unit).title = "Лвл = "+(this.lvl[type_unit]+1)+"; Хп = "+db_u[this.type][type_unit][this.lvl[type_unit]][0] + "; Урон = " +db_u[this.type][type_unit][this.lvl[type_unit]][1]+"-"+db_u[this.type][type_unit][this.lvl[type_unit]][2];
        // Вызов функции для обновления стилей подсветки уровня юнитов
        updateLevelStyling.call(this);

    }


    //TODO: заменить код ниже на функцию
    document.getElementById('text_hp').innerHTML = db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][0];
    var attac = 0;
    switch (unitu[num].min_max) {
        case 0: {
            attac = db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][1];
            break;
        }
        case 1: {
            attac = db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][2];
            break;
        }
        case 2: {
            attac = db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][1] + '-' + db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][2];
            break;
        }
        case 3: {
            attac = (db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][1] + db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][2]) / 2.0;
            break;
        }
    }
    //attac
    document.getElementById('text_attac').innerHTML = attac;


    personal = $('#personal');
    switch (type_unit) {
        case 0: {
            personal.text('Вмещает ' + db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][3] + ' единиц ресурсов');
            info_unit.css('height', '116px');
            break;
        }
        case 5: {
            personal.text('Воскрешает ' + db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][3] + ' после боя');
            info_unit.css('height', '116px');
            break;
        }
        case 7: {
            personal.text('Уменьшает на ' + db_u[unitu[num].type][type_unit][unitu[num].lvl[type_unit]][3] + ' повреждения от Башен и Магических башен');
            info_unit.css('height', '142px');
            break;
        }
    }


}

//смена лвл 8 типов юнитов сразу
Units.prototype.change_8_lvl = function (num, lvl) {
    if (!ficha_ruinu || this.number != 2) {
        for (var i = 0; i < 8; i++) {
            this.lvl[i] = lvl;
        }
        this.update_8_img(num);

               // Вызов функции для обновления стилей подсветки уровня юнитов
               updateLevelStyling.call(this);

    }
}


//сумма хп по войску для ворот
Units.prototype.sum_hp_all = function () {
    var sum = 0;
    for (var z = 0; z < 8; z++) {
        sum += this.qq[z] * (db_u[0][z][this.lvl[z]][0] + (db_u[0][z][this.lvl[z]][0] / 100 * this.bonusu[15 + z]));
    }
    return sum;
}

//изменение значений инпутов в соотвецтвие с их реальным числом (одно поле)
Units.prototype.change_one_input = function (num, type_unit) {
    this.qq[type_unit] = parseInt(this.qq[type_unit]);
    this.qq[type_unit] = this.qq[type_unit] == undefined ? 0 : this.qq[type_unit];
    this.qq[type_unit] = isNaN(this.qq[type_unit]) ? 0 : this.qq[type_unit];
    $("#input_" + num + "_" + type_unit).val(this.qq[type_unit]);
}
//изменение значений инпутов в соотвецтвие с их реальным числом (одно поле)
Units.prototype.change_one_input2 = function (input, num, type_unit) {
    var val = parseInt(input.value.replace(/[^\d]/gi, '')), tmp;
    val = isNaN(val) ? 0 : val;
    val = val == undefined ? 0 : val;
    //if (event.keyCode == 9)
    //{
    //    $.select(input);
    //}
    if (val != 0) {
        if (input.value != val)
            input.value = tmp = val;
    }
    else
        if (input.value != '') {
            input.value = input.value.replace(/[^\d]/gi, '');
            tmp = input.value == '' ? 0 : parseInt(input.value);
        }
        else {
            tmp = 0;
        }
    tmp = undefined == tmp ? val : tmp;
    this.qq[type_unit] = tmp;
    this.vq[num_volna][type_unit] = tmp;
    this.update_one_img(num, type_unit);
}

//изменение значений инпутов в соотвецтвие с их реальным числом 
Units.prototype.change_8_input = function (num) {
    for (var i = 0; i < 8; i++) {
        this.change_one_input(num, i);
    }
}

//очистка в соотвецтвии с num                 
Units.prototype.clear_all = function (num) {
    this.create_bonus = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0];
    this.create_bonus_no_standart = [0, 0, 0, 0];//[урон всем, защита всем, здоровье всем, урон преследования]
    this.create_bonus_no_standart_vrag = [0, 0, 0];//[урон всем,  здоровье всем, защита всем,]
    this.yselenit_damag = 0;
    for (var i = 0; i < 8; i++) {
        this.vq[num_volna][i] = 0;
        this.qq[i] = 0;
        this.lvl[i] = 3;
        this.change_one_input(num, i);
        this.update_one_img(num, i);
    }
    this.xxx = 0;
    this.otst = 100;
    $("#input_otst_" + num).val(this.otst);
    this.hero = false;
    this.red = false;
    this.checked_true();
    this.checked_hero_true();
    this.input_true();

    heroes[num].cleen();
    heroes[num].hero_true(false, num);
}

//запиь результатов в ячейки для этого
Units.prototype.see_rez = function () {
    for (var bb = 0; bb < 8; bb++) {
        this.proc_damag_unitu[bb] = this.qq[bb] - this.vq[num_volna][bb]; //обнулить - это потери для расчета фракционки
        document.getElementById("min_unitu_" + this.number + "_" + bb).value = this.qq[bb] - this.vq[num_volna][bb];
        if (document.getElementById("min_unitu_" + this.number + "_" + bb).value < 0) {
            document.getElementById("min_unitu_" + this.number + "_" + bb).style.border = "2px  solid #ff0000";
            document.getElementById("min_unitu_" + this.number + "_" + bb).style.color = "#ff0000";
        } else {
            if (document.getElementById("min_unitu_" + this.number + "_" + bb).value > 0) {
                document.getElementById("min_unitu_" + this.number + "_" + bb).style.border = "2px  solid dodgerBlue";
                document.getElementById("min_unitu_" + this.number + "_" + bb).style.color = "dodgerBlue";
                document.getElementById("min_unitu_" + this.number + "_" + bb).value = "+" + document.getElementById("min_unitu_" + this.number + "_" + bb).value;
            }
            else {
                document.getElementById("min_unitu_" + this.number + "_" + bb).value = "0";
                document.getElementById("min_unitu_" + this.number + "_" + bb).style.border = "2px solid #bbb";
                document.getElementById("min_unitu_" + this.number + "_" + bb).style.color = "#000";
            }
        }
        document.getElementById("unitu_" + this.number + "_" + bb).value = this.qq[bb];
    }
}

//=====================
//описание обьекта с героем
//=====================
function Heroes(numb) {
    //свойства объекта
    //-----------------------------------------------------------
    this.class_hero = 0;                        //класс героя 0-стратег 1-градоустр. 2-маг. 3-монстр
    this.profession = 0;                        //професия
    this.profession2 = -1;                       //професия
    this.profession3 = -1;                       //професия
    this.pol_hero = false;                      //пол героя 1 - мужик 0 - баба
    this.lvl_hero = 0;                          //лвл героя
    this.efects = new Array(220);               //ефекты героя
    this.efects_change = Array(30).fill(-1);//динамические ефекты
    this.magick = new Array(240);               //ефекты от заклинаний
    this.dress = Array(12).fill(-1);//одежда [номер одежды, какой комплект]
    this.dress_alximick = Array(12).fill(0);//одежда [номер одежды, какой комплект]
    this.dress_old = Array(12).fill(0);//одежда [номер одежды, какой комплект]
    this.rynu =  //[номер шмотки][
        // [фео, ур, торн, ио, рад, тир, гифу, хегль,йар]
        // [ужас, Атака войск противника, Своя атака, Атака маг башен противника, здоровье противника, свое здоровье, защита своих, предел максимальной защиты ]
        // ]
        //100
        [
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        
        
        ];

        this.skils = Array(24).fill(0);
    //скилы [номер скила на панельке героя][лвл(0-4)] 
    this.number = numb;                         //номер героя
    this.navuki = 3;                            //навыки при лвл даються
    this.xxx = 0;                               //запасная переменная
    this.monster_type = 0;                        //тип для монстра 0-обычныей, 1- 2 скила внизу другие, 2 - 4 скила внизу другие


};


//------------------------------------------------------------    
//-=-прототипы объекта(методы)-=-

/*** внутрение ***/
//переформатирование данных из json в heroes
Heroes.prototype.rewrite = function (old) {
    //свойства объекта
    //-----------------------------------------------------------
    this.class_hero = old.class_hero;
    this.profession = old.profession;
    this.profession2 = old.profession2;
    this.profession3 = old.profession3;
    this.pol_hero = old.pol_hero;
    this.lvl_hero = old.lvl_hero;
    this.efects = old.efects;
    this.efects_change = old.efects_change;
    this.magick = old.magick;
    this.dress = old.dress;
    if (old.dress_alximick == undefined) {
        this.dress_alximick = Array(12).fill(0);
    }
    else {
        this.dress_alximick = old.dress_alximick;
    }
    if (old.dress_old == undefined) {
        this.dress_old = Array(12).fill(0);
    }
    else {
        this.dress_old = old.dress_old;
    }

    if (old.rynu == undefined) {
        this.rynu = [
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        

        ];
    }
    else {
        this.rynu = old.rynu;
    }



    if (old.monster_type == undefined) {
        this.monster_type = 0;
    }
    else {
        this.monster_type = old.monster_type;
    }

    this.skils = old.skils;

    this.number = old.number;
    this.navuki = old.navuki;
    this.xxx = old.xxx;

    
}
//effect dla monstor stounhedja
Heroes.prototype.set_skils_stounhedj = function () {
    if (this.class_hero == 3) {
        heroes[this.number].change_image_skils(this.number, 9);
        heroes[this.number].change_image_skils(this.number, 8);
        heroes[this.number].change_image_skils(this.number, 7);
        heroes[this.number].change_image_skils(this.number, 6);
    }
}

//порядок для ефектов
Heroes.prototype.efects_new = function () {
    for (var i = 0; i < 220; i++) {
        this.efects[i] = -1;
    }
}
//порядок для ефектов
Heroes.prototype.magick_new = function () {
    for (var i = 0; i < 240; i++) {
        this.magick[i] = 0;
    }
}



//является ли одежда на персе комплектом
Heroes.prototype.kostym = function () {
    var store = this.dress.slice();
    var frequency = {};  // array of frequency. Массив повторений
    var maxCount = 0;  // holds the max frequency. Содержит максималье значение
    var setId;   // holds the max frequency element. Удерживает максимальное повторение
    for (var v in store) {
        frequency[store[v]] = (frequency[store[v]] || 0) + 1; // increment frequency. Увеличение частоты
        if (frequency[store[v]] > maxCount) { // is this frequency > max so far ? Эта частота > максимальная на данный момент?
            maxCount = frequency[store[v]];  // update max. Обновить макс.
            setId = store[v];          // update result. Обновить результат.
        }
    }

    for (let i = 0; i < unitu.length; i++) {
        if (unitu[i].hero === true) {
            const komplekt = heroes[i].dress;
            const komplekt47Count = komplekt.filter(item => item === 47).length;
    
            if (komplekt47Count !== 0) {
                switch (i) {
                    case 0:
                        komplekt47 = komplekt47Count;
                        break;
                    case 1:
                        komplekt47_1 = komplekt47Count;
                        break;
                    case 2:
                        komplekt47_2 = komplekt47Count;
                        break;
                    case 3:
                        komplekt47_3 = komplekt47Count;
                        break;
                    case 4:
                        komplekt47_4 = komplekt47Count;
                        break;
                    case 5:
                        komplekt47_5 = komplekt47Count;
                        break;
                    case 6:
                        komplekt47_6 = komplekt47Count;
                        break;
                    // Добавьте другие случаи, если необходимо
                }
            }
        }
    }

    var isSet = maxCount > 8
    if (isSet) return setId;
    return -1;
}
// дописать в i - || i == 9)

//TODO: приписание к ефектом 100-тым бонус от собраной одежды !!!!!!!!!!ДОПИСАТЬ ПРИ ПОЯВЛЕНИИ ОПИСАНИЯ ШМОТОК
Heroes.prototype.all_dress = function () {
    var setId = this.kostym();
    if (setId >= 0) {
        //!!!!!!!!!!!!ДОБОВЛЯЕМ БОНУС КОСТЮМА!!!!!!!!!!!!!!!
        this.efects[12] = db_dress[setId][12][1];
    }
    else {
        this.efects[12] = -1;
    }
}


//определение количества поставленых навыков
Heroes.prototype.summa_navuki = function () {
    var s = 0;
    for (var i = 0; i < 24; i++) {
        s += this.skils[i];
    }
    return s;
}

// чистим героя и шмотки
Heroes.prototype.cleen = function () {
    this.class_hero = 0;
    this.profession = 0;
    this.profession2 = -1;
    this.profession3 = -1;
    this.pol_hero = false;
    this.lvl_hero = 0;
    this.efects_change = Array(30).fill(-1);
    this.dress = Array(12).fill(-1);
    this.dress_alximick = Array(12).fill(0);
    this.skils = Array(24).fill(0);
    this.dress_old = Array(12).fill(0);//одежда [номер одежды, какой комплект]

    this.rynu =  //[номер шмотки][
        // [фео, ур, торн, ио, рад, тир, гифу, хегль,йар]
        // [ужас, Атака войск противника, Своя атака, Атака маг башен противника, здоровье противника, свое здоровье, защита своих, предел максимальной защиты ]
        // ]
        [
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        

        ];

    this.navuki = 3;
    this.xxx = 0;
    this.efects_new();
    this.magick_new();
    this.cleen_magick();
    this.cleen_alxim();
}

/*** интерфейсные ***/
Heroes.prototype.cleen_alxim = function () {
    for (var i = 0; i < 12; i++)
        $('#alximick_' + i + '_' + this.number).attr('class', 'alximick');
}

//TODO: растановка скилов, одежды и картинок в соответсвии с героем //true - герой есть в войке, героя нет в войске
Heroes.prototype.hero_true = function (byl, num) {
    type = document.getElementById("type_" + num).selectedIndex;
    type = type > 4 ? 4 : type;
    $("#mt-" + num + "-" + this.monster_type).click();
    if (byl) {
        m_zh = this.pol_hero ? 1 : 0;
        //вычисляем х и у
        var x = 0;
        var y = 0;
        x = m_zh ? 500 : 582;
        switch (this.class_hero) {
            case 0:
                {
                    y = this.profession * 99;
                    $("#monster-" + num).hide();
                    break;
                }
            case 1:
                {
                    y = this.profession * 99 + 594;
                    $("#monster-" + num).hide();
                    break;
                }
            case 2:
                {
                    y = this.profession * 99 + 1089;

                    $("#monster-" + num).hide();
                    break;
                }
            case 3:
                {
                    
                    var profa = this.profession;
                    profa ? profa-- : false;
                    y = profa * 198 + 1584; //ВРЕМЕННО ПОСТАВИЛ 198 
                    $("#monster-" + num).show();
                    break;
                }
            case 4:
                {
                    y = this.profession * 99 + 1881; //Пропись начала героев
                    $("#monster-" + num).hide();
                    break;
                }
                case 5:
                    {
                        y = this.profession * 99 + 2368; //Пропись начала героев
                        $("#monster-" + num).hide();
                        break;
                    }
                    case 6:
                        {
                            y = this.profession * 99 + 2863; //Пропись начала героев
                            $("#monster-" + num).hide();
                            break;
                        }
                        case 7:
                            {
                                y = this.profession * 99 + 3358; //Пропись начала героев
                                $("#monster-" + num).hide();
                                break;
                            }
        }

        //ставим картинки для героев
        $("#image_hero_" + num).removeClass('first_img').addClass('big_img').css({ 'background-position': '-' + x + 'px -' + y + 'px' });
        $("#hero_" + num).removeClass('first_img').addClass('big_img').css({ 'background-position': '-' + x + 'px -' + y + 'px' });

        //уровень героя
        //document.getElementById('lvl_hero_'+num).value = this.lvl_hero;

        //картинки скилов
        for (var iks = 0; iks < 24; iks++) {
            this.change_image_skils(num, iks);
            if (this.skils[iks]) {
                document.getElementById("skils_" + iks + "_" + num).innerHTML = "<br/><br/>" + this.skils[iks] + "/5";
            }
            else {
                document.getElementById("skils_" + iks + "_" + num).innerHTML = "<div class='black_fon'><br/><br/>0/5</div>";
            }
        }

        //одеждa
        for (var iks = 0; iks < 12; iks++) {
            this.to_dress_one(iks, this.dress[iks]);
        }

        //фоная картинка пола героя
        if (m_zh) {
            $("#fon_gero_" + num).css("background-position", "-664px -0px");
        }
        else {
            $("#fon_gero_" + num).css("background-position", "-664px -325px");
        }

        //TODO:убираем заклинания
        this.true_magick();
    }
    else {
        //ставим картинки для героев
        $("#image_hero_" + num).removeClass('big_img').addClass('first_img').css({ 'background-position': '-1088px -693px' });
        $("#hero_" + num).removeClass('big_img').addClass('first_img').css({ 'background-position': '-1088px -' + (99 * unitu[num].type) + 'px' });

        //убираем уровень героя
        // document.getElementById('lvl_hero_'+num).value = 0;

        //убираем картинки скилов
        for (var iks = 0; iks < 24; iks++) {
            $("#skils_" + iks + "_" + num).css("background-position", "-664px -1782px");
            //document.getElementById("skils_"+iks+'_'+num).style.background = "url('image/skils.jpg') repeat -0px -828px;";

            if (this.skils[iks]) {
                document.getElementById("skils_" + iks + "_" + num).innerHTML = "<br/><br/>" + this.skils[iks] + "/5";
            }
            else {
                document.getElementById("skils_" + iks + "_" + num).innerHTML = "<div class='black_fon'><br/><br/>0/5</div>";
            }
            // document.getElementById("skils_" + iks + "_" + num).innerHTML = "<br/>" + "<br/>" + "0/5";
        }

        //убираем одежду
        for (var iks = 0; iks < 12; iks++) {
            document.getElementById("shmotka_" + iks + '_' + num).style.background = "";
            $("#old_dress_" + iks + "_" + num).addClass("old_dress").removeClass("old_dress_vkl");
            set_rynu_by_info(num, iks);
        }
        //фоная картинка пола героя
        $("#fon_gero_" + num).css("background-position", "-664px -0px");

        //TODO:убираем заклинания
        this.true_magick();
    }
}

//растановка номеров наложеных на героя магий num - номер магии (this.magick[num] - это уровень заклинания на который нажимаем)
Heroes.prototype.write_magick = function (num) {
    var litle_obj = document.getElementById("do_magick_" + this.number + '_' + num);
    var obj = document.getElementById("div_magick_" + this.number + '_' + num);
    if (this.magick[num]) {
        obj.innerHTML = '<br/><br/>' + this.magick[num] + '/5';
    }

    else {
        obj.innerHTML = "<div class='black_fon'><br/><br/>0/5</div>";
        // $("#div_magick_"+this.number+"_7").html("<div class='black_fon'><br/><br/>0/8</div>");
    }
    if (this.magick[num]) {
        litle_obj.style.display = 'inline-block';
    }
    else {
        litle_obj.style.display = 'none';
    }
    //TODO: доделать прописку титла!!!
    obj.title = '' + db_magick[num][0] + '. ';
    if (this.magick[num]) {
        obj.title += db_magick[num][this.magick[num]][1];
    }
    litle_obj.title = "Наложеное заклинание: " + obj.title;
}

//растановка всех как есть наложеных на героя магий
Heroes.prototype.true_magick = function () {
    for (var qwe = 0; qwe < 124; qwe++) {
        this.write_magick(qwe);
    }

    if (go_back[this.number]) {
        $('#do_magick_' + this.number + '_124').show();
        $("#div_magick_" + this.number + "_124").html('<br/><br/>' + go_back[this.number] + '/5');
    }
    else {
        $('#do_magick_' + this.number + '_124').hide();
        $("#div_magick_" + this.number + "_124").html("<div class='black_fon'><br/><br/>0/5</div>");
    }
}

//очиста понели для магий на герое
Heroes.prototype.cleen_magick = function () {
    for (var qwe = 0; qwe < 124; qwe++) {
        this.magick[qwe] = 0;
    }
    this.true_magick();
}

//клик по магии для наложения num - номер магии 

Heroes.prototype.click_magick = function (num) {
               /* if (this.magick[7])
            {
    this.magick[num] = this.magick[num]<8?(this.magick[num]+1):0;
            }
                else
                {
               */  
              this.magick[num] = this.magick[num] < 5 ? (this.magick[num] + 1) : 0;

    //   }
    this.write_magick(num);
}




//вибор героя в диве для выбора героев
Heroes.prototype.update_hero_image = function (class_hero, profa, m_zh, num) {
    //вычисляем х и у
    var x = 0;
    var y = 0;
    x = m_zh ? 500 : 582;// 1043: 1125;

    switch (class_hero) {
        case 0:
            {
                y = profa * 99; $("#monster-" + num).hide();
                break;
            }
        case 1:
            {
                y = profa * 99 + 594; $("#monster-" + num).hide();
                break;
            }
        case 2:
            {
                y = profa * 99 + 1089; $("#monster-" + num).hide();
                break;
            }
        case 3:
            {
                profa ? profa-- : false;
                y = profa * 99 + 1584;
                $("#monster-" + num).show();
                break;
            }
        //Вывод героя на экран при нажатии
        case 4:
            {
                y = profa * 99 + 1881; $("#monster-" + num).hide();
                break;
            }

            case 5:
                {
                    y = profa * 99 + 2368; $("#monster-" + num).hide();
                    break;
                }
            case 6:
                {
                    y = profa * 99 + 2863; $("#monster-" + num).hide();
                    break;
                }
            case 7:
                {
                    y = profa * 99 + 3358; $("#monster-" + num).hide();
                    break;
                }
    }




    /* Очистка навыков героя из-за 15лвлов у полка*/
    /* Тут я решил очистить все навыки при переключении из-за багов у полкана */
 
    if (this.class_hero > 3 && this.class_hero < 5) //У полкана 15 лвлов 
    {
        /* До обнуления 2х профессий , мы обнуляем навыки дабы не было ошибок*/
        heroes[num].skils = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else
    {
            /* обнуляем навыки полкана */
        this.skils = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    }



    /* Ставим автоматом перки первой профессии 5й лвл монстрам */
    if (class_hero == 3 ) //Герои монстров
    {

            /* До обнуления 2х профессий , мы обнуляем навыки дабы не было ошибок*/
            heroes[num].skils = [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (this.class_hero > 3 && this.class_hero < 5) //У полкана 15 лвлов 
    {
        /* Обнуляем уровни , записанные в переменные для бонусов от полководца */

            skill_ost_mech[this.number] = 0;  // Острый меч[НомерСтороны]   
            skill_presledovanie_assasina[this.number] = 0; // Преследование ассасина[НомерСтороны]
            skill_hp_mamonta[this.number] = 0; // Здоровье мамонта[НомерСтороны]
            skill_kam_bronya[this.number] = 0; // Каменная броня[НомерСтороны]

    }

    kostyl_class_heroes = this.class_hero;

    //ставим картинки для героев
    $("#image_hero_" + num).removeClass('first_img').addClass('big_img').css({ 'background-position': '-' + x + 'px -' + y + 'px' });
    $("#hero_" + num).removeClass('first_img').addClass('big_img').css({ 'background-position': '-' + x + 'px -' + y + 'px' });
    document.getElementById("update_hero_" + num).style.display = "none";
    var ms;
    switch (class_hero){
        case 0:{
            for(ms=60;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
        case 1:{

            for(ms=0;ms<60;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }

            for(ms=110;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
        case 2:{
            for(ms=0;ms<110;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            for(ms=160;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
        case 3:{
            for(ms=0;ms<160;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            for(ms=170;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }

            break;
        }
        case 4:{
            for(ms=0;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
        case 5:{
            for(ms=0;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
        case 6:{

            for(ms=0;ms<60;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }

            for(ms=110;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
        case 7:{
            for(ms=0;ms<110;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            for(ms=160;ms<200;ms++){
                document.getElementById("pas_do_magick_"+this.number+"_"+ms).style.display = 'none';
            }
            break;
        }
    }

    this.class_hero = class_hero;
    this.pol_hero = m_zh;
    this.profession = profa;
    if (m_zh) {
        $("#fon_gero_" + num).css("background-position", "-664px -0px");
    }
    else {
        $("#fon_gero_" + num).css("background-position", "-664px -325px");
    }


    if (!this.lvl_hero) {
        this.lvl_hero = 1;
        this.change_lvl_skils(num, 0);
        this.change_lvl_skils(num, 1);
        this.change_lvl_skils(num, 2);
        // document.getElementById("lvl_hero_" + num).value = 1;
    }
    
    var zxc;
    for (zxc = 0; zxc < 10; zxc++) {
        this.change_image_skils(num, zxc);
    }

    //обновляем спики профессий
    this.next_profession(1);
    document.getElementById('select_profa_' + 1 + '_' + this.number).style.display = 'none';
    this.next_profession(2);
    document.getElementById('select_profa_' + 2 + '_' + this.number).style.display = 'none';


    for (zxc = 10; zxc < 17; zxc++) {
        this.change_image_skils(this.number, zxc);
    }

    for (zxc = 17; zxc < 24; zxc++) {
        this.change_image_skils(this.number, zxc);
    }
    //открываем возможность выбора дополнительной специальности

    document.getElementById('new_profa_' + 1 + '_' + this.number).style.display = 'inline-block';
    document.getElementById('new_profa_' + 2 + '_' + this.number).style.display = 'inline-block';

    if (this.class_hero == 8) {
        if (document.getElementById("type_" + this.number).selectedIndex == 8) {
            this.skils[0] = 4;
            this.skils[1] = 4;
            this.skils[2] = 4;
            this.skils[3] = 2;
            this.skils[4] = 2;
            this.skils[5] = 4;
            this.skils[6] = 2;
            this.skils[7] = 0;
            this.skils[8] = 0;
            this.skils[9] = 0;


        }
        else {
            this.skils[0] = 4;
            this.skils[1] = 4;
            this.skils[2] = 4;
            this.skils[3] = 4;
            this.skils[4] = 4;
            this.skils[5] = 4;
            this.skils[6] = 4;
            this.skils[7] = 4;
            this.skils[8] = 4;
            this.skils[9] = 4;

        }

        for (var bp = 0; bp < 10; bp++) {
            if (this.profession < 2) { this.skils[bp] = 4; }
            this.change_lvl_skils(this.number, bp);
        }
        //скрываем возможность выбора дополнительной специальности
        document.getElementById('new_profa_' + 1 + '_' + this.number).style.display = 'none';
        document.getElementById('new_profa_' + 2 + '_' + this.number).style.display = 'none';
    }
}

//функция вывода едениц навыков
Heroes.prototype.see_navuki = function (num) {
    document.getElementById("navuki_hero_" + num).innerHTML = "еденици навиков: " + this.navuki;
}

//изменения лвл героя
//Heroes.prototype.change_lvl_hero = function(num){
//    this.xxx = document.getElementById("lvl_hero_" + num).value;
//    if(this.xxx>0&&this.xxx<37){
//        this.lvl_hero = parseInt(this.xxx);
//        this.navuki = this.lvl_hero*2 + 1 - this.summa_navuki();
//        this.see_navuki(num);
//    }
//    else{
//        document.getElementById("lvl_hero_" + num).value = this.lvl_hero;
//    }
//
//}

//изменение картинок скилов героев (номер героя, номер скила)
Heroes.prototype.change_image_skils = function (num, num_skils) {
    switch (this.class_hero) {
        case 0: {
            if (num_skils < 10) {
                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + (this.profession * 10)));
                $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils * 50)) + "px -" + ((this.profession * 46)) + "px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46) + "px";
                if (this.skils[num_skils]) {
                    if (!db_skils_hero[0][this.profession][num_skils][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[0][this.profession][num_skils][this.skils[num_skils]][0];
                    }
                }
                else {
                    //    document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][this.profession][num_skils][this.skils[num_skils]][0];

            }
            else {
                if (num_skils > 9 && num_skils < 17) {
                    if (this.profession2 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + (this.profession2 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 7) * 50) + "px -" + ((this.profession2 * 46)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            if (!db_skils_hero[0][this.profession2][num_skils - 7][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[0][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //                                    document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-664px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
                else {

                    if (this.profession3 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 14) + (this.profession3 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + (((num_skils - 14) * 50)) + "px -" + ((this.profession3 * 46)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            if (!db_skils_hero[0][this.profession3][num_skils - 14][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[0][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-664px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
            }

            break;
        }
        case 1: {
            if (num_skils < 10) {
                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 60 + (this.profession * 10)));
                $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils * 50)) + "px -" + ((this.profession * 46 + 276)) + "px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46+276) + "px";
                if (this.skils[num_skils]) {
                    if (!db_skils_hero[1][this.profession][num_skils][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[1][this.profession][num_skils][this.skils[num_skils]][0];
                    }
                }
                else {
                    // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[1][this.profession][num_skils][this.skils[num_skils]][0];
            }
            else {
                if (num_skils > 9 && num_skils < 17) {
                    if (this.profession2 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + 60 + (this.profession2 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 7) * 50) + "px -" + ((this.profession2 * 46 + 276)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46+276) + "px";
                        if (this.skils[num_skils]) {
                            if (!db_skils_hero[1][this.profession2][num_skils - 7][this.skils[num_skils]][2]) {
                                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[1][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + 60 + (this.profession2 * 10)));
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[1][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //  document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[1][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-714px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }

                }
                else {
                    if (this.profession3 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 14) + 60 + (this.profession3 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 14) * 50) + "px -" + ((this.profession3 * 46 + 276)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46+276) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[1][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            if (!db_skils_hero[1][this.profession3][num_skils - 14][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[1][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //   document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[1][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-714px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }


                }
            }
            break;
        }
        case 2: {
            if (num_skils < 10) {
                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 110 + (this.profession * 10)));
                $("#skils_" + num_skils + "_" + num).css("background-position", "-" + (num_skils * 50) + "px -" + ((this.profession * 46 + 506)) + "px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46+506) + "px";
                if (this.skils[num_skils]) {
                    if (!db_skils_hero[2][this.profession][num_skils][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[2][this.profession][num_skils][this.skils[num_skils]][0];
                    }
                }
                else {
                    // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[2][this.profession][num_skils][this.skils[num_skils]][0];
            }
            else {
                if (num_skils > 9 && num_skils < 17) {
                    if (this.profession2 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + 110 + (this.profession2 * 10)));
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[2][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            if (!db_skils_hero[2][this.profession2][num_skils - 7][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[2][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[2][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46+506) + "px";
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 7) * 50) + "px -" + ((this.profession2 * 46 + 506)) + "px");
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-764px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
                else {
                    if (this.profession3 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 14) + 110 + (this.profession3 * 10)));

                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 14) * 50) + "px -" + ((this.profession3 * 46 + 506)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46+506) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[2][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            if (!db_skils_hero[2][this.profession3][num_skils - 14][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[2][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[2][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-764px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
            }
            break;
        }
        case 3: {
            if (num_skils < 10) {
                var profa = this.profession;
                if (this.profession == 2) {
                    profa = 1;
                }

                //todo check on spec monster
                if (num_skils > 7 && this.monster_type > 0) {
                    $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 3) * 50) + "px 0px");
                    document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][0][num_skils - 3][this.skils[num_skils]][0];
                    pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10)));
                    if (num_skils == 8)
                        $("#pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10))).attr('style', 'background-position: -110px -1640px;');
                    else
                        $("#pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10))).attr('style', 'background-position: -132px -1640px;');

                    if (!db_skils_hero[0][0][num_skils - 3][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[0][0][num_skils - 3][this.skils[num_skils]][0];
                    }
                    else {
                        pas_mag.style.display = 'none';
                        pas_mag.title = '';
                    }

                }
                else
                    if ((num_skils == 7 || num_skils == 6) && this.monster_type == 2) {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 3) * 50) + "px -46px");
                        document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[0][1][num_skils - 3][this.skils[num_skils]][0];
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10)));
                        if (num_skils == 6)
                            $("#pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10))).attr('style', 'background-position: -66px -1662px;');
                        else
                            $("#pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10))).attr('style', 'background-position: -88px -1662px;');

                        if (!db_skils_hero[0][1][num_skils - 3][this.skils[num_skils]][2]) {
                            pas_mag.style.display = 'inline-block';
                            pas_mag.title = db_skils_hero[0][1][num_skils - 3][this.skils[num_skils]][0];
                        }
                        else {
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }

                    }
                    else 
                    if ((num_skils == 7 || num_skils == 6) && this.monster_type == 3) {
                     //   alert(db_skils_hero[3][3][num_skils][this.skils[num_skils]][0])
                        //alert(db_skils_hero[3]+ '____' + this.profession + '__' + num_skils + '__' + this.skils + '__' + num_skils + '__' + [0])
                       // console.log(db_skils_hero[3][3][num_skils][this.skils[num_skils]][0])
                            $("#skils_" + num_skils + "_" + num).css("background-position", "-" + (num_skils * 50) + "px -" + (46 + 1541) + "px"); //(profa * 46 + 1541)
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (profa*46+736) + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[3][3][num_skils][this.skils[num_skils]][0];
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10)));
                        pas_mag.style.backgroundPosition = $("#pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10))).data("bp");
                        if (!db_skils_hero[3][this.profession][num_skils][this.skils[num_skils]][2]) {
                            pas_mag.style.display = 'inline-block';
                            pas_mag.title = db_skils_hero[3][this.profession][num_skils][this.skils[num_skils]][0];
                        }
                        else {
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }

    
                        }
                    
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + (num_skils * 50) + "px -" + (profa * 46 + 736) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (profa*46+736) + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[3][this.profession][num_skils][this.skils[num_skils]][0];
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10)));
                        pas_mag.style.backgroundPosition = $("#pas_do_magick_" + this.number + "_" + (num_skils + 160 + (profa * 10))).data("bp");
                        if (!db_skils_hero[3][this.profession][num_skils][this.skils[num_skils]][2]) {
                            pas_mag.style.display = 'inline-block';
                            pas_mag.title = db_skils_hero[3][this.profession][num_skils][this.skils[num_skils]][0];
                        }
                        else {
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }

                    }
            }
            else {
                $("#skils_" + num_skils + "_" + num).css("background-position", "-814px -1782px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -150px -" + 828 + "px";
                document.getElementById("skils_" + num_skils + "_" + num).title = "";
            }
            break;
            
        }

case 4 : {
            if(num_skils<10){
                pas_mag = document.getElementById("pas_do_magick_"+this.number+"_"+(num_skils+180+(this.profession*10)));
                $("#skils_" + num_skils + "_" + num).css("background-position","-"+((num_skils*50))+"px -"+((this.profession*46+826))+"px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46+276) + "px";
                if(this.skils[num_skils]){
                    if(!db_skils_hero[4][this.profession][num_skils][this.skils[num_skils]][2]){
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[4][this.profession][num_skils][this.skils[num_skils]][0];
                        this.profession2=1; 
                        this.profession3=1; 
                        this_num = num;
                    }
                }
                else{
                    // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[4][this.profession][num_skils][this.skils[num_skils]][0];
            }
            else{
                if(num_skils>9&&num_skils<17){
                    if(this.profession2!=-1){
                        pas_mag = document.getElementById("pas_do_magick_"+this.number+"_"+((num_skils-7)+180+(this.profession2*10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position","-"+((num_skils-7)*50)+"px -"+((this.profession2*46+826))+"px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46+276) + "px";
                        if(this.skils[num_skils]){
                            if(!db_skils_hero[4][this.profession2][num_skils-7][this.skils[num_skils]][2]){
                                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[4][this.profession2][num_skils-7][this.skils[num_skils]][0];
                                pas_mag = document.getElementById("pas_do_magick_"+this.number+"_"+((num_skils-7)+180+(this.profession2*10)));
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[4][this.profession2][num_skils-7][this.skils[num_skils]][0];
                            }
                        }
                        else{
                            //  document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[4][this.profession2][num_skils-7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else{
                        $("#skils_" + num_skils + "_" + num).css("background-position","-865px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }

                }
                else{
                    if(this.profession3!=-1){
                        pas_mag = document.getElementById("pas_do_magick_"+this.number+"_"+((num_skils-14)+180+(this.profession3*10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position","-"+((num_skils-14)*50)+"px -"+((this.profession3+918))+"px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46+276) + "px";
                        if(this.skils[num_skils]){
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[4][this.profession3][num_skils-14][this.skils[num_skils]][0];
                            if(!db_skils_hero[4][this.profession3][num_skils-14][this.skils[num_skils]][2]){
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[4][this.profession3][num_skils-14][this.skils[num_skils]][0];
                            }
                        }
                        else{
                            //   document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[4][this.profession3][num_skils-14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else{
                        $("#skils_" + num_skils + "_" + num).css("background-position","-865px -1782px");  //Отрисовка не активированного скила - заглушки
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }


                }
            }
            break;
        }
        case 5: {
            if (num_skils < 10) {
                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + (this.profession * 10)));
                $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils * 50)) + "px -" + ((this.profession * 46)) + "px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46) + "px";
                if (this.skils[num_skils]) {
                    if (!db_skils_hero[5][this.profession][num_skils][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[5][this.profession][num_skils][this.skils[num_skils]][0];
                    }
                }
                else {
                    //    document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[5][this.profession][num_skils][this.skils[num_skils]][0];

            }
            else {
                if (num_skils > 9 && num_skils < 17) {
                    if (this.profession2 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + (this.profession2 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 7) * 50) + "px -" + ((this.profession2 * 46)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[5][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            if (!db_skils_hero[5][this.profession2][num_skils - 7][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[5][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //                                    document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[5][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-664px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
                else {

                    if (this.profession3 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 14) + (this.profession3 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + (((num_skils - 14) * 50)) + "px -" + ((this.profession3 * 46)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[5][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            if (!db_skils_hero[5][this.profession3][num_skils - 14][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[5][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[5][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-664px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -0px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
            }

            break;
        }
        case 6: {
            if (num_skils < 10) {
                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 60 + (this.profession * 10)));
                $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils * 50)) + "px -" + ((this.profession * 46 + 276)) + "px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46+276) + "px";
                if (this.skils[num_skils]) {
                    if (!db_skils_hero[6][this.profession][num_skils][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[6][this.profession][num_skils][this.skils[num_skils]][0];
                    }
                }
                else {
                    // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[6][this.profession][num_skils][this.skils[num_skils]][0];
            }
            else {
                if (num_skils > 9 && num_skils < 17) {
                    if (this.profession2 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + 60 + (this.profession2 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 7) * 50) + "px -" + ((this.profession2 * 46 + 276)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46+276) + "px";
                        if (this.skils[num_skils]) {
                            if (!db_skils_hero[6][this.profession2][num_skils - 7][this.skils[num_skils]][2]) {
                                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[6][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + 60 + (this.profession2 * 10)));
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[6][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //  document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[6][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-714px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }

                }
                else {
                    if (this.profession3 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 14) + 60 + (this.profession3 * 10)));
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 14) * 50) + "px -" + ((this.profession3 * 46 + 276)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46+276) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[6][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            if (!db_skils_hero[6][this.profession3][num_skils - 14][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[6][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //   document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[6][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-714px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -50px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }


                }
            }
            break;
        }
        case 7: {
            if (num_skils < 10) {
                pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + (num_skils + 110 + (this.profession * 10)));
                $("#skils_" + num_skils + "_" + num).css("background-position", "-" + (num_skils * 50) + "px -" + ((this.profession * 46 + 506)) + "px");
                //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + (num_skils*50) + "px -" + (this.profession*46+506) + "px";
                if (this.skils[num_skils]) {
                    if (!db_skils_hero[7][this.profession][num_skils][this.skils[num_skils]][2]) {
                        pas_mag.style.display = 'inline-block';
                        pas_mag.title = db_skils_hero[7][this.profession][num_skils][this.skils[num_skils]][0];
                    }
                }
                else {
                    // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                    pas_mag.style.display = 'none';
                    pas_mag.title = '';
                }
                document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[7][this.profession][num_skils][this.skils[num_skils]][0];
            }
            else {
                if (num_skils > 9 && num_skils < 17) {
                    if (this.profession2 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 7) + 110 + (this.profession2 * 10)));
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[7][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            if (!db_skils_hero[7][this.profession2][num_skils - 7][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[7][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            // document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[7][this.profession2][num_skils - 7][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-7)*50) + "px -" + (this.profession2*46+506) + "px";
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 7) * 50) + "px -" + ((this.profession2 * 46 + 506)) + "px");
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-764px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
                else {
                    if (this.profession3 != -1) {
                        pas_mag = document.getElementById("pas_do_magick_" + this.number + "_" + ((num_skils - 14) + 110 + (this.profession3 * 10)));

                        $("#skils_" + num_skils + "_" + num).css("background-position", "-" + ((num_skils - 14) * 50) + "px -" + ((this.profession3 * 46 + 506)) + "px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -" + ((num_skils-14)*50) + "px -" + (this.profession3*46+506) + "px";
                        if (this.skils[num_skils]) {
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[7][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            if (!db_skils_hero[7][this.profession3][num_skils - 14][this.skils[num_skils]][2]) {
                                pas_mag.style.display = 'inline-block';
                                pas_mag.title = db_skils_hero[7][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            }
                        }
                        else {
                            //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                            document.getElementById("skils_" + num_skils + "_" + num).title = db_skils_hero[7][this.profession3][num_skils - 14][this.skils[num_skils]][0];
                            pas_mag.style.display = 'none';
                            pas_mag.title = '';
                        }
                    }
                    else {
                        $("#skils_" + num_skils + "_" + num).css("background-position", "-764px -1782px");
                        //document.getElementById("skils_" + num_skils + "_" + num).style.background = "url('image/skils.jpg') repeat -100px -" + 828 + "px";
                        document.getElementById("skils_" + num_skils + "_" + num).title = "";
                    }
                }
            }
            break;
        }
    }

        /* Очистка навыков героя из-за 15лвлов у полка*/
    /* Тут я решил очистить все навыки при переключении из-за багов у полкана , чтоб не очищались другие герои а ток полкан - убрать else тогда */
 
    if (this.class_hero > 3 && this.class_hero < 5) //У полкана 15 лвлов 
    {
       /** Ативируем вторые профы полкану */
        this.profession2 = 1;
        this.profession3 = 1;
        
        
    }

/***************************************************** */
        /* Ниже прописываем уровни скиллам */
/***************************************************** */


    if (this.skils[num_skils]) {
        if (this.class_hero != 4) //У полкана 15 лвлов 
        {
            document.getElementById("skils_" + num_skils + "_" + num).innerHTML = "<br/><br/>" + this.skils[num_skils] + "/5";
        }
        else {
            document.getElementById("skils_" + num_skils + "_" + num).innerHTML = "<br/><br/>" + this.skils[num_skils] + "/5"; //15
            
        }
    }
    else {
        if (this.class_hero != 4) //У полкана 15 лвлов 
        {
            document.getElementById("skils_" + num_skils + "_" + num).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[num_skils] + "/5</div>";
        }
        else {
            document.getElementById("skils_" + num_skils + "_" + num).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[num_skils] + "/5</div>";  //15
        
        }
    }
        
}



//изменения лвл скила (номер героя, номер скила)
Heroes.prototype.change_lvl_skils = function (num, num_skils) {

    if (this.class_hero != 4) //У полкана 15 лвлов 
    {
        //изменения в структуре героя лвл
        this.skils[num_skils] = this.skils[num_skils] == 5 ? 0 : (this.skils[num_skils] + 1);
    }
    else {
        this.skils[num_skils] = this.skils[num_skils] == 5 ? 0 : (this.skils[num_skils] + 1); //polkn 15

/* Функция прибавки бонуса Острый меч ВСЕМ сторонам*/ 


        if (this.number == 0 || this.number == 1 || this.number == 2 || this.number == 3 || this.number == 4 || this.number == 5 || this.number == 6) 
        {
            skill_ost_mech[this.number] = this.skils[15]; // прибавляем лвл навыка острый меч

        }

/* Функция прибавки бонуса Преследование ассасина ВСЕМ сторонам*/ 
   
        if (this.number == 0 || this.number == 1 || this.number == 2 || this.number == 3 || this.number == 4 || this.number == 5 || this.number == 6) 
        {
            skill_presledovanie_assasina[this.number] = this.skils[12]; // прибавляем лвл навыка Преследование ассасина
        }  

/* Функция прибавки бонуса Каменная броня ВСЕМ сторонам*/ 
   
if (this.number == 0 || this.number == 1 || this.number == 2 || this.number == 3 || this.number == 4 || this.number == 5 || this.number == 6) 
{
    skill_kam_bronya[this.number] = this.skils[13]; // прибавляем лвл навыка Каменная броня
}  
        
/* Функция прибавки бонуса Здоровье мамонта ВСЕМ сторонам*/ 
   
if (this.number == 0 || this.number == 1 || this.number == 2 || this.number == 3 || this.number == 4 || this.number == 5 || this.number == 6) 
{
    skill_hp_mamonta[this.number] = this.skils[14]; // прибавляем лвл навыка Здоровье мамонта
}  




    }
    //добовление и обновление навыков
    this.navuki = this.skils[num_skils] ? (this.navuki - 1) : (this.navuki + 5);
    // this.see_navuki(num);
        
    this.change_image_skils(num, num_skils);
}


//один элемент (номер частички одежды,номер костюма из БД)
Heroes.prototype.to_dress_one = function (num_dress, num) {


    if (num > -1 && num != null) {
        if (num == 48) {

            document.getElementById("shmotka_" + num_dress + "_" + this.number).style.background = "url('image/_big2.jpg?410') repeat -" + (-38 + 50 * num_dress + 50) + "px -2318px";
            
        }
        else
            document.getElementById("shmotka_" + num_dress + "_" + this.number).style.background = "url('image/_big2.jpg?410') repeat -" + (2448 + 50 * num_dress) + "px -" + (num * 50) + "px";
        this.dress[num_dress] = num;
        do_show_div('select_shmotka_' + num_dress + '_' + this.number, 0);
        
        if (this.dress_old[num_dress]) {
            this.efects[num_dress] = db_dress_old[num][num_dress][2] ? -1 : db_dress_old[num][num_dress][1];
        }
        else {
            this.efects[num_dress] = db_dress[num][num_dress][2] ? -1 : db_dress[num][num_dress][1];
        }
        this.hide_mini_dress_one(num_dress);
        $('#litle_dress_' + this.number + '_' + num + '_' + num_dress).css('display', 'inline-block');
        format_title_for_dress(num, num_dress, this.number);
        switch (num_dress) {

            case 2:
            case 3:
            case 4:
            case 8:
            case 9:  
            case 10:  
                {
                    var div = $("#alximick_" + num_dress + "_" + this.number);
                    if (this.dress_alximick[num_dress]) {
                        div.addClass("alximick_vkl").removeClass("alximick");
                    }
                    else {
                        div.addClass("alximick").removeClass("alximick_vkl");
                    }

                    break;
                }
        }

        var div = $("#old_dress_" + num_dress + "_" + this.number);
        if (this.dress_old[num_dress]) {
            div.addClass("old_dress_vkl").removeClass("old_dress");
        }
        else {
            div.addClass("old_dress").removeClass("old_dress_vkl");
        }

        set_rynu_by_info(this.number, num_dress);


 

 
    
    

    }
    else {
        if (num == null) {
            num = -1;
        }
        document.getElementById("shmotka_" + num_dress + "_" + this.number).style.background = "";
       
        this.dress[num_dress] = num;
        document.getElementById("shmotka_" + num_dress + "_" + this.number).title = "";
        
        this.efects[num_dress] = -1;
        this.hide_mini_dress_one(num_dress);
    }

        
}

Heroes.prototype.hide_mini_dress_one = function (num_dress) {
    $(".litle_dress_" + this.number + '_' + num_dress).hide();
}

Heroes.prototype.hide_all_dress = function () {
    $(".litle_dress_" + this.number + '_' + 0, ".litle_dress_" + this.number + '_' + 1, ".litle_dress_" + this.number + '_' + 2, ".litle_dress_" + this.number + '_' + 3,
        ".litle_dress_" + this.number + '_' + 4, ".litle_dress_" + this.number + '_' + 5, ".litle_dress_" + this.number + '_' + 6, ".litle_dress_" + this.number + '_' + 7,
        ".litle_dress_" + this.number + '_' + 8, ".litle_dress_" + this.number + '_' + 9, ".litle_dress_" + this.number + '_' + 10, ".litle_dress_" + this.number + '_' + 11).hide();
}

//TODO: (цикл сменить) одеваем всего героя (передаеться номер комплекта) //НЕ ТРОГАЕМ ИНАЧЕ СБИВАЕТСЯ СПИСОК СЕТОВ ДЛЯ ОДЕВАНИЯ
Heroes.prototype.to_dress = function (num) {
    this.xxx = 12;
    do {
        this.xxx--;
        this.to_dress_one(this.xxx, num);
    } while (this.xxx);
    do_show_div('complect_dres_' + this.number, 0);
}



//снятие одной шмотки
Heroes.prototype.no_dress = function (num_dress, num) {
    $("#litle_dress_" + this.number + "_" + this.dress[num_dress] + "_" + num_dress).hide();
    document.getElementById("shmotka_" + num_dress + "_" + this.number).style.background = "";
    this.dress[num_dress] = -1;
    document.getElementById("shmotka_" + num_dress + "_" + this.number).title = "";
    this.efects[num_dress] = -1;
    do_show_div('select_shmotka_' + num_dress + '_' + this.number, 0);
    
    if (this.dress_alximick[num_dress]) {
        var div = $("#alximick_" + num_dress + "_" + this.number);
        div.addClass("alximick").removeClass("alximick_vkl");
        this.dress_alximick[num_dress] = 0;
    }
    if (this.dress_old[num_dress]) {
        var div = $("#old_dress_" + num_dress + "_" + this.number);
        div.addClass("old_dress").removeClass("old_dress_vkl");
        this.dress_old[num_dress] = 0;
    }
    this.rynu[num_dress] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    set_rynu_by_info(this.number, num_dress);

}

////TODO: (цикл сменить) снятие всего костюма
Heroes.prototype.no_dress_all = function (num) {

    this.xxx = 12;
    do {
        this.xxx--;
        this.no_dress(this.xxx, num);
    } while (this.xxx);

}




//плавающая переменная!!!!!!!!!!!!!!!!!!!!!!!
////TODO: (цикл сменить)формирование перечня шмоток
Heroes.prototype.create_list_dress_one = function (num_dress) {
    var msx = 48;
    do {
        msx--;
        document.getElementById("smotkisu_" + msx + "_" + num_dress + "_" + this.number).style.background = "url('image/_big2.jpg?400') repeat -" + (2446 + 50 * num_dress) + "px -" + (msx * 50) + "px";
        document.getElementById("smotkisu_" + msx + "_" + num_dress + "_" + this.number).title = db_dress[msx][num_dress][0];
        
    } while (msx);
    //for 47
    document.getElementById("smotkisu_48_" + num_dress + "_" + this.number).style.background = "url('image/_big2.jpg?400') repeat -" + (-38 + 50 * num_dress + 50) + "px -2318px";
    document.getElementById("smotkisu_48_" + num_dress + "_" + this.number).title = db_dress[48][num_dress][0];

}

////TODO: (цикл сменить)формирование перечня всех шмоток
Heroes.prototype.create_list_dress = function () {
    var mn = 12; //СЛЕТАЕТ ЗАМЕНИТЬ НА 9!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    do {
        mn--;
        this.create_list_dress_one(mn);
    } while (mn);
}

////TODO: (цикл сменить)Формирование перечня комплектов для шмоток
Heroes.prototype.create_dress = function () {
    var msx = 48;
    do {
        msx--;

        document.getElementById("name_select_dress_" + msx + "_" + this.number).innerHTML = "<div class='plus'></div> " + db_dress[msx][13];
        document.getElementById("name_select_dress_" + msx + "_" + this.number).title = "Нажми для выбора " + db_dress[msx][12][0];
    } while (msx);
}

// формирование списка вторичных профессий.
Heroes.prototype.next_profession = function (next_prof) {
    var fff = $('#image_hero_' + this.number).attr('class');
    if (fff == 'image_hero big_img') {

        
        if (this.class_hero != 4) 
        {
           document.getElementById('select_profa_' + next_prof + '_' + this.number).style.display = 'block';
            document.getElementById('select_profa_' + (next_prof == 1 ? 2 : 1) + '_' + this.number).style.display = 'none';
        }

        switch (this.class_hero) {
            case 0:
                {
                    var arr = ['Паладдин', 'Воитель', 'Диверсант', 'Разведчик', 'Миротворец', 'Разрушитель'];
                    this.help_func(next_prof, arr);
                    break;
                }
            case 1:
                {
                    var arr = ['Добытчик', 'Защитник', 'Наставник', 'Торговец', 'Строитель', ''];
                    this.help_func(next_prof, arr);
                    break;
                }
            case 2:
                {
                    var arr = ['Целител', 'Иллюзионист', 'Рассеиватель', 'Некромант', 'Заклинатель', ''];
                    this.help_func(next_prof, arr);
                    break;
                }
                    /*   case 4:
                       {
                           var arr = ['Полководец','Ремесленник','Охотник','','',''];
                           this.help_func(next_prof, arr);
                           break;
                       }
*/
                       case 5:
                        {
                         var arr = ['Паладдин', 'Воитель', 'Диверсант', 'Разведчик', 'Миротворец', 'Разрушитель'];
                         this.help_func(next_prof, arr);
                            break;
                        } 
                        case 6:
                            {
                                var arr = ['Добытчик', 'Защитник', 'Наставник', 'Торговец', 'Строитель', ''];
                                this.help_func(next_prof, arr);
                                break;
                            }
                            case 7:
                                {
                                    var arr = ['Целител', 'Иллюзионист', 'Рассеиватель', 'Некромант', 'Заклинатель', ''];
                                    this.help_func(next_prof, arr);
                                    break;
                                }
        }
    }
    else {
        alert("выбери героя для определения его дополнительных навыков!");
    }


    if (this.class_hero != 4 && kostyl_class_heroes == 4) //Обнуляем вторые профы при переключении, у других героев
    {
/*После того как юзер захочет с полководца поставить другого героя - то надо обнулить вторые профы, чтобы он их выбрал сам */
        this.profession2 = -1;
        this.profession3 = -1;
        kostyl_class_heroes = 0 ;
    }

 if ((this.number == 0 && this.class_hero == 4) || (this.number == 1 && this.class_hero == 4) || (this.number == 2 && this.class_hero == 4) || (this.number == 3 && this.class_hero == 4) || (this.number == 4 && this.class_hero == 4) || (this.number == 5 && this.class_hero == 4) || (this.number == 6 && this.class_hero == 4)) 
    {
        if (save_zhach == 0)
            {
        heroes[this_num].skils[0] = 0;
        heroes[this_num].skils[1] = 0; 
        heroes[this_num].skils[2] = 0;
            }
    } 


    if (this.class_hero == 4) //Обнуляем вторые профы при переключении, у других героев
    {

        if (save_zhach == 0)
            {
                
                heroes[this.number].skils[0] = 0;
                heroes[this.number].skils[1] = 0; 
                heroes[this.number].skils[2] = 0;
                /* Обнуляем пассивки вручную */
                document.getElementById("skils_" + 0 + "_" + this.number).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[0] + "/5</div>";  
                document.getElementById("skils_" + 1 + "_" + this.number).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[1] + "/5</div>"; 
                document.getElementById("skils_" + 2 + "_" + this.number).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[2] + "/5</div>";  
                /* Обнуляем требушет */
                document.getElementById("pas_do_magick_" + 0 + "_" + 181).style.display = 'none';

                save_zhach = 1
                
            }
            else{

                heroes[this.number].skils[0] = 0;
                heroes[this.number].skils[1] = 0; 
                heroes[this.number].skils[2] = 0;
                document.getElementById("skils_" + 0 + "_" + this.number).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[0] + "/5</div>";  
                document.getElementById("skils_" + 1 + "_" + this.number).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[1] + "/5</div>"; 
                document.getElementById("skils_" + 2 + "_" + this.number).innerHTML = "<div class='black_fon'><br/><br/>" + this.skils[2] + "/5</div>";  
                /* Обнуляем требушет */
                document.getElementById("pas_do_magick_" + 0 + "_" + 181).style.display = 'none';
                

            }
            
            

    }
    

}

//функция помошник для next_profession
Heroes.prototype.help_func = function (next_prof, arr) {
    
    document.getElementById('sel_prof_' + next_prof + '_0_' + this.number).innerHTML = arr[0];
    document.getElementById('sel_prof_' + next_prof + '_1_' + this.number).innerHTML = arr[1];
    document.getElementById('sel_prof_' + next_prof + '_2_' + this.number).innerHTML = arr[2];
    document.getElementById('sel_prof_' + next_prof + '_3_' + this.number).innerHTML = arr[3];
    document.getElementById('sel_prof_' + next_prof + '_4_' + this.number).innerHTML = arr[4];
    document.getElementById('sel_prof_' + next_prof + '_5_' + this.number).innerHTML = arr[5];
    if (next_prof == 1) {
        document.getElementById('sel_prof_' + next_prof + '_' + this.profession + '_' + this.number).innerHTML = '';
        if (this.profession3 != -1) document.getElementById('sel_prof_' + next_prof + '_' + this.profession3 + '_' + this.number).innerHTML = '';
    }
    else {
        document.getElementById('sel_prof_' + next_prof + '_' + this.profession + '_' + this.number).innerHTML = '';
        if (this.profession2 != -1) document.getElementById('sel_prof_' + next_prof + '_' + this.profession2 + '_' + this.number).innerHTML = '';
    }
}

//выбор из списка дополнительной профессии
Heroes.prototype.sel_prof = function (prof, next_prof) {
    document.getElementById('select_profa_' + next_prof + '_' + this.number).style.display = 'none';
    if (next_prof == 1) {
        var other = this.profession2;
        var ms = 0;
        switch (this.class_hero) {
            case 0: {
                ms += other * 10;
                break;
            }
            case 1: {
                ms += (60 + other * 10);
                break;
            }
            case 2: {
                ms += (110 + other * 10);
                break;
            }
            case 5: {
                ms += other * 10;
                break;
            }
            case 6: {
                ms += (60 + other * 10);
                break;
            }
            case 7: {
                ms += (110 + other * 10);
                break;
            }
        }
        this.profession2 = prof;
        for (i = 10; i < 17; i++) {
            
            if (other != -1) {
                document.getElementById("pas_do_magick_" + this.number + "_" + ((i - 10) + ms)).style.display = 'none';
            }
            this.change_image_skils(this.number, i);
        }
    }
    else {
        var other = this.profession3;
        var ms = 0;
        switch (this.class_hero) {
            case 0: {
                ms += other * 10;
                break;
            }
            case 1: {
                ms += (60 + other * 10);
                break;
            }
            case 2: {
                ms += (110 + other * 10);
                break;
            }
            case 5: {
                ms += other * 10;
                break;
            }
        }
        this.profession3 = prof;
        for (i = 17; i < 24; i++) {
            if (other != -1) {
                document.getElementById("pas_do_magick_" + this.number + "_" + ((i - 17) + ms)).style.display = 'none';
            }
            this.change_image_skils(this.number, i);
        }
    }
}
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//=-=-=-=-=-=-=функции вне объектов-=-=-=-=-=-=-=-=-
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/*** внутрение ***/

/*** интерфейсные ***/
//очистка полей с нулем при фокусе
function cleener_focus(id) {
    document.getElementById(id).value = document.getElementById(id).value < 1 ? "" : document.getElementById(id).value;
}

//манипуляции с маг. и простыми башнями !!!!!!!!!!!ОПТИМИЗИРОВАТЬ!!!!!!!!
//показать маг.башни
function mb_add() {
    document.getElementById("mb_add").style.display = 'none';
    document.getElementById("mb1").style.display = 'inline-block';
    limit_b++;
    lvl_mb_1 = 0;
    if (limit_b == 2) {
        document.getElementById("plas_mb1").style.display = 'none';
        document.getElementById("plas_bb1").style.display = 'none';
    }
    else {
        document.getElementById("plas_mb1").style.display = 'inline-block';
    }
}

//добавить маг.башню
function mb_add_2() {
    document.getElementById("bb_add").style.display = 'none';
    document.getElementById("mb2").style.display = 'inline-block';
    document.getElementById("plas_mb1").style.display = 'none';
    document.getElementById("del_mb1").style.display = 'none';
    limit_b++;
    lvl_mb_2 = 0;
}

//показать башни
function bb_add() {
    document.getElementById("bb_add").style.display = 'none';
    document.getElementById("bb1").style.display = 'inline-block';
    limit_b++;
    lvl_bb_1 = 0;
    if (limit_b == 2) {
        document.getElementById("plas_bb1").style.display = 'none';
        document.getElementById("plas_mb1").style.display = 'none';
    }
    else {
        document.getElementById("plas_bb1").style.display = 'inline-block';
    }
}

//добавить башню
function bb_add_2() {
    document.getElementById("mb_add").style.display = 'none';
    document.getElementById("bb2").style.display = 'inline-block';
    document.getElementById("plas_bb1").style.display = 'none';
    document.getElementById("del_bb1").style.display = 'none';
    limit_b++;
    lvl_bb_2 = 0;
}

// показать укрепления
function yb_add() {
    document.getElementById("yb_add").style.display = 'none';
    document.getElementById("yb").style.display = 'inline-block';
}

function gate_add() {
    document.getElementById("gate_add").style.display = 'none';
    document.getElementById("gate").style.display = 'inline-block';
    flags_gate[num_volna] = true;
}

function gate_delete() {
    document.getElementById("gate_add").style.display = 'inline-block';
    document.getElementById("gate").style.display = 'none';
    flags_gate[num_volna] = false;
}

//удаление 1-й маг. башни
function del_mb() {
    limit_b--;
    document.getElementById("plas_mb1").style.display = 'inline-block';
    document.getElementById("mb1").style.display = 'none';
    document.getElementById("mb_add").style.display = 'inline-block';
    if (limit_b) {
        document.getElementById("plas_bb1").style.display = 'inline-block';
    }
    lvl_mb_1 = 0;
    $("#mb1_img").html(lvl_mb_1 + 1);
    lvl_mb_1 = -1;
}

//удаление 2-й маг. башни
function del_mb_2() {
    limit_b--;
    document.getElementById("del_mb1").style.display = 'inline-block';
    document.getElementById("plas_mb1").style.display = 'inline-block';
    document.getElementById("mb2").style.display = 'none';
    document.getElementById("bb_add").style.display = 'inline-block';
    lvl_mb_2 = 0;
    $("#mb2_img").html(lvl_mb_2 + 1);
    lvl_mb_2 = -1;
}

//удаление 1-й башни
function del_bb() {
    limit_b--;
    document.getElementById("plas_bb1").style.display = 'inline-block';
    document.getElementById("bb1").style.display = 'none';
    document.getElementById("bb_add").style.display = 'inline-block';
    if (limit_b) {
        document.getElementById("plas_mb1").style.display = 'inline-block';
    }
    lvl_bb_1 = 0;
    $("#bb1_img").html(lvl_bb_1 + 1);
    lvl_bb_1 = -1;
}

//удаление 2-й башни 
function del_bb_2() {
    limit_b--;
    document.getElementById("del_bb1").style.display = 'inline-block';
    document.getElementById("plas_bb1").style.display = 'inline-block';
    document.getElementById("bb2").style.display = 'none';
    document.getElementById("mb_add").style.display = 'inline-block';
    lvl_bb_2 = 0;
    $("#bb2_img").html(lvl_bb_2 + 1);
    lvl_bb_2 = -1;
}

//скрытие бащен              !!!!!!!ДОРАБОТАТЬ очещение полей!!!!!!!!
function yb_delete() {
    document.getElementById("yb").style.display = 'none';
    document.getElementById("yb_add").style.display = 'inline-block';
    for (i = 0; i < 8; i++) {
        kol_vo_yb[i] = 0;
        document.getElementById('_Y' + i).value = 0;
    }
}

//!!!!!!!!!!!!!!!!!ОПТИМИЗИРОВАТЬ!!!!!!!!!!!!педелать lvl_mb в масив из 2-хелементов!!!!
//изменения уровня первой маг бишни вверх
function mb1_lvl_w() {
    lvl_mb_1++;
    lvl_mb_1 = lvl_mb_1 > 7 ? 0 : lvl_mb_1;
    $("#mb1_img").html(lvl_mb_1 + 1);
    //document.getElementById("mb1_img").src = do_name_b("M",lvl_mb_1);
}

//изменения уровня первой маг бишни вниз
function mb1_lvl_q() {
    lvl_mb_1--;
    lvl_mb_1 = lvl_mb_1 < 0 ? 7 : lvl_mb_1;
    $("#mb1_img").html(lvl_mb_1 + 1);
    //document.getElementById("mb1_img").src = do_name_b("M",lvl_mb_1);
}


function kz_lvl_w() {
    var flagChange = true;
    if (db_gate[gate_lvl][1] != $("#hp_gate").val()) {
        flagChange = false;
    }

    gate_lvl++;
    gate_lvl = gate_lvl > 6 ? 0 : gate_lvl;
    $("#kz_img").html(gate_lvl + 1);

    if (flagChange) {
        gate_hp[num_volna] = db_gate[gate_lvl][1];
        $("#hp_gate").val(gate_hp[num_volna]);
    }

}
function kz_lvl_q() {
    var flagChange = true;
    if (db_gate[gate_lvl][1] != $("#hp_gate").val()) {
        flagChange = false;
    }

    gate_lvl--;
    gate_lvl = gate_lvl < 0 ? 6 : gate_lvl;
    $("#kz_img").html(gate_lvl + 1);

    if (flagChange) {
        gate_hp[num_volna] = db_gate[gate_lvl][1];
        $("#hp_gate").val(gate_hp[num_volna]);
    }
}


//изменения уровня первой маг бишни вверх
function mb2_lvl_w() {
    lvl_mb_2++;
    lvl_mb_2 = lvl_mb_2 > 7 ? 0 : lvl_mb_2;
    $("#mb2_img").html(lvl_mb_2 + 1);
    //document.getElementById("mb2_img").src = do_name_b("M",lvl_mb_2);
}

//изменения уровня первой маг бишни вниз
function mb2_lvl_q() {
    lvl_mb_2--;
    lvl_mb_2 = lvl_mb_2 < 0 ? 7 : lvl_mb_2;
    $("#mb2_img").html(lvl_mb_2 + 1);
    //document.getElementById("mb2_img").src = do_name_b("M",lvl_mb_2);
}

//изменения уровня первой маг бишни вверх
function bb1_lvl_w() {
    lvl_bb_1++;
    lvl_bb_1 = lvl_bb_1 > 7 ? 0 : lvl_bb_1;
    $("#bb1_img").html(lvl_bb_1 + 1);
    //document.getElementById("bb1_img").src = do_name_b("B",lvl_bb_1);
}

//изменения уровня первой маг бишни вниз
function bb1_lvl_q() {
    lvl_bb_1--;
    lvl_bb_1 = lvl_bb_1 < 0 ? 7 : lvl_bb_1;
    $("#bb1_img").html(lvl_bb_1 + 1);
    //document.getElementById("bb1_img").src = do_name_b("B",lvl_bb_1);
}

//изменения уровня первой маг бишни вверх
function bb2_lvl_w() {
    lvl_bb_2++;
    lvl_bb_2 = lvl_bb_2 > 7 ? 0 : lvl_bb_2;
    $("#bb2_img").html(lvl_bb_2 + 1);
    //document.getElementById("bb2_img").src = do_name_b("B",lvl_bb_2);
}

//изменения уровня первой маг бишни вниз
function bb2_lvl_q() {
    lvl_bb_2--;
    lvl_bb_2 = lvl_bb_2 < 0 ? 7 : lvl_bb_2;
    $("#bb2_img").html(lvl_bb_2 + 1);
    //document.getElementById("bb2_img").src = do_name_b("B",lvl_bb_2);
}

//изменеие кол-ва укреплений по полям
function change_yb(num) {
    kol_vo_yb[num] = parseInt(document.getElementById("_Y" + num).value);
}

//вкл/выкл максимальной защиты гарнизона
function max_zaw() {
    max_z = max_z ? false : true;
}

//вкл/выкл кланового замка
function kzf() {
    kz = $("#kz").is(":checked");
    checkShowOrHideKZ();
    //todo show setting for kz
}

function checkShowOrHideKZ() {
    if (kz) {
        showForKz();
        db_yb_tmp = db_yb_kz;
        db_mb_tmp = db_mb_kz;
        db_bb_tmp = db_bb_kz;
    }
    else {
        hideForKz();
        db_yb_tmp = db_yb;
        db_mb_tmp = db_mb;
        db_bb_tmp = db_bb;
    }

}

function showForKz() {
    $(".standartKZ").css({ 'display': 'inline-block' });
    // если открыта 2 атакующий добавить поле дял плюса
    if ($('#delete_army_1').is(':visible')) {
        $('#plus_army_6').show();
    }
    // если открыта 3 защитник добавить поле дял плюса
    if ($('#delete_army_4').is(':visible')) {
        $('#plus_army_5').show();
    }

    $(".hide_yb_kz").hide();
    $("#yb").css({ 'width': '294px' });
    $('.gates').css({ 'display': 'inline-block' });
}

function hideForKz() {
    $(".standartKZ").hide();
    // если есть заполненые поля, то нажать на скрыть
    var div = $('#delete_army_6');
    if (div.is(':visible')) {
        div.click();
    }
    div = $('#plus_army_6');
    if (div.is(':visible')) {
        div.hide();
    }
    $(".hide_yb_kz").show();
    $("#yb").css({ 'width': '324px' });
    $('.gates').hide();

    div = $('#delete_army_5');
    if (div.is(':visible')) {
        div.click();
    }
    div = $('#plus_army_5');
    if (div.is(':visible')) {
        div.hide();
    }
    $(".gateEnds").hide();

    //скрыть лишние блоки;
    $(".kz_show").hide();
}

//изменение теретории
function change_teretory() {
    teretory = document.getElementById("ter").selectedIndex;
    $("#armor_content_left").removeClass().addClass('terr_' + teretory);
}

//скрытие шмоток одного типа(ботинки например) в дополнительной подсветке сскилов, магий героя,
function clear_one_mini_dress(num, kostum, dress) {
    heroes[num].to_dress_one(dress, -1);
}
//изменение специализации
function spec_change(num) {
    spes = num;
    document.getElementById("spec_but_0").style.background = "#FFFFFF";
    document.getElementById("spec_but_1").style.background = "#FFFFFF";
    document.getElementById("spec_but_2").style.background = "#FFFFFF";
    document.getElementById("spec_but_3").style.background = "#FFFFFF";
    document.getElementById("spec_but_" + num).style.background = "#a4ff9c";
    document.getElementById("spec_but_" + num).style.borderRadius = "10px";
}

//манипуляции с скрытием открытием основных дивов с юнитами и героями num-для формирования айдишника doo-удалять/добавлять(0/1)
function onSee(num, doo) {
    if (doo) {//+
        unitu[num].boy = true; //активация войска для боя
        unitu[num].bul_v_boy = true; //активация войска для боя
        unitu[num].v_boy_volnu[num_volna] = true; //активация войска для боя
        $('#marader_res_' + num).show();
        $('#cost_' + num).show();
        $("#plus_army_" + num).hide();
        if (num == 4) {
            $("#delete_army_3").hide();
            //if (kz)
            $("#plus_army_5").show();
        }
        if (num == 5) {
            $("#delete_army_4").hide();
        }
        $("#army_" + num).show();
        if (num == 3) {
            $("#plus_army_4").show();
        }
        if (num == 1
            //&& kz
        ) {
            $("#plus_army_6").show();
        }
        if (num == 6) {
            $("#delete_army_1").hide();
        }

        $("#delete_army_" + num).show();
        //активация дивав в подробностях
        $('.escape_' + num).show();
        $('.nickrom_' + num).show();
        $('.back_' + num).show();
        $('.xil_' + num).show();
        if (num == 1) {
            $('.go_ykrp_1').show();
        }
        for (var km = 0; km < 20; km++) {
            $('.raynd_' + km + '_' + num).show();
        }

        $('#cost_' + num).show();
    }
    else { //-
        unitu[num].boy = false; //диактивация войска для боя
        unitu[num].bul_v_boy = false; //активация войска для боя
        unitu[num].v_boy_volnu[num_volna] = false; //активация войска для боя
        $("#delete_army_" + num + ",#hero_settings_" + num + ",#army_" + num).hide();
        $('#marader_res_' + num).hide();
        $('#cost_' + num).hide();
        $("#plus_army_" + num).show();
        if (num == 4) {
            $("#delete_army_3").show();
            $("#plus_army_5").hide();
        }
        if (num == 5) {
            $("#delete_army_4").show();
        }
        if (num == 6) {
            $("#delete_army_1").show();
        }
        if (num == 1) {
            $("#plus_army_6").hide();
        }

        if (num == 3) {
            $("#plus_army_4").hide();
        }

        //активация дивав в подробностях
        $('.escape_' + num).hide();
        $('.nickrom_' + num).hide();
        $('.back_' + num).hide();
        $('.xil_' + num).hide();
        if (num == 1) {
            $('.go_ykrp_1').hide();
        }
        for (var km = 0; km < 20; km++) {
            $('.raynd_' + km + '_' + num).hide();
        }
        $('#cost_' + num).hide();
    }
}

//показать/скрыть блок для настроек героя 
function see_hero_settings(num, doo) {
    if (doo) {
        document.getElementById("hero_settings_" + num).style.display = "block";
        document.getElementById("hero_settings_" + num).style.left = document.getElementById("hero_" + num).offsetLeft;
        document.getElementById("hero_settings_" + num).style.top = document.getElementById("hero_" + num).offsetTop;
        this_number2 = num;

    }
    else {
        document.getElementById("hero_settings_" + num).style.display = "none";
        document.getElementById("update_art_list_" + num).style.display = "none";
        unitu[num].hero = heroes[num].lvl_hero ? true : false;
        this_number2 = num;
    }
}

//показать/скрыть блок для настроек героя 
function close_window_pr() {
        document.getElementById("update_hero_pr").style.display = "none";
        document.getElementById("vkl_vukl_setting").style.display = "none";
}



function hide_menu_rynu(num_smotka, num_hero) {
    $("#select_rynu_" + num_smotka + "_" + num_hero).hide();
    $("#select_shmotka_" + num_smotka + "_" + num_hero).hide();

    check_show_ryna_one(num_smotka, num_hero);
}

//высветить див с выбором героем
function update_image_hero(num,num_smotka, num_hero) {
    document.getElementById("update_hero_" + num).style.display = "block";

    document.getElementById("update_art_list_" + num).style.display = "none";
    document.getElementById("magic_to_hero_select_" + num).style.display = "none";
    document.getElementById("creator_bonus_" + num).style.display = "none";

    /* Закрытие менюшки со шмотками */
    document.getElementById("select_shmotka_0_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_1_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_2_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_3_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_4_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_5_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_6_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_7_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_8_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_9_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_10_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_11_" + this_number2).style.display = "none";


   // alert(num_smotka + '__' + num_hero + '__' + this.number)
   // do_show_div('select_shmotka_' + '0' + '0', 0);
  // alert(this.number +'__'+ this_number + '___'+select_shmotka_save_number)
    /*!!! ПРи открытом меню с артами, сделать закрытие этой менюшки при нажатии на кнопки вверху */
    /**document.getElementById("select_shmotka_"+ num_smotka + "_" + num_hero).style.display = "none"; // НЕ работает и в консоле
     ошибка из-за этой строки */
 
}
//высветить див с пресетами
function update_image_hero_pr() {
    document.getElementById("update_hero_pr").style.display = "block";
}
//высветить див с пресетами
function vkl_vukl_setting() {
    document.getElementById("vkl_vukl_setting").style.display = "block";
}



//переключение на старый вид инпутов
let clickHandler = null;
let mouseoutHandler = null;
let mouseoverHandler = null;

// переключение на старый вид инпутов
function vkl_vukl_input_pr(checkbox) {

    // Получаем все элементы с классом .army
    var armyElements = document.querySelectorAll('.army');
    var unitsElements = document.querySelectorAll('.units');
    var divunitsinpitElements = document.querySelectorAll('div.units input[type=text]');
    var textbox_attackerElements = document.querySelectorAll('.textbox_attacker');
    var textbox_deffenderElements = document.querySelectorAll('.textbox_deffender');
    var divunitsdivElements = document.querySelectorAll('div.units div');
    var vkl_vukl_heroElements = document.querySelectorAll('.vkl_vukl_hero');


    // Если чекбокс checked, то изменяем стиль на новый
    if (checkbox.checked) {
        armyElements.forEach(function(element) {
            element.style.height = "240px";
        });
    } 
    // Если чекбокс unchecked, то возвращаем стиль к предыдущему
    else {
        armyElements.forEach(function(element) {
            element.style.height = "228px";
        });
    }

    //units
    if (checkbox.checked) {
        unitsElements.forEach(function(element) {
            element.style.height = "124px";
        });
    } 
    // Если чекбокс unchecked, то возвращаем стиль к предыдущему
    else {
        unitsElements.forEach(function(element) {
            element.style.height = "98px";
        });
    }


        //div.units input[type=text]
        if (checkbox.checked) {
            divunitsinpitElements.forEach(function(element) {
                element.style.position = "relative";
                element.style.marginTop = "0px";
                element.style.marginLeft = "0px";
                element.style.textAlign = "left";
                element.style.color = "#000000";
                element.style.fontWeight = "100";
                element.style.textShadow = "0 0 0px #ffffff00, 0 0 0px #ffffff00, 0 0 0px #ffffff00, 0 0 0px #ffffff00, 0 0 0px #ffffff00, 0 0 0px #ffffff00";

            });
        } 
        // Если чекбокс unchecked, то возвращаем стиль к предыдущему
        else {
            divunitsinpitElements.forEach(function(element) {
                element.style.position = "absolute";
                element.style.marginTop = "73px";
                element.style.marginLeft = "-65px";
                element.style.textAlign = "right";
                element.style.color = "#fff";
                element.style.fontWeight = "700";
                element.style.textShadow = "0 0 3px #000, 0 0 3px #000, 0 0 3px #000, 0 0 3px #000, 0 0 3px #000, 0 0 3px #000";

            });
        }

        //textbox_attacker
        if (checkbox.checked) {
            textbox_attackerElements.forEach(function(element) {
                element.style.borderStyle = "solid";
                element.style.borderColor = "#515151";
                element.style.borderWidth = "1.5px";
                element.style.background = "rgb(255 199 199)";
            });
        } 
        // Если чекбокс unchecked, то возвращаем стиль к предыдущему
        else {
            textbox_attackerElements.forEach(function(element) {

                element.style.borderStyle = "none";
                element.style.background = "rgb(251 251 251 / 25%)";

            });
        }


                //textbox_deffender 
                if (checkbox.checked) {
                    textbox_deffenderElements.forEach(function(element) {
                        element.style.borderStyle = "solid";
                        element.style.borderColor = "#515151";
                        element.style.borderWidth = "1.5px";
                        element.style.background = "rgb(198 255 198)";
                    });
                } 
                // Если чекбокс unchecked, то возвращаем стиль к предыдущему
                else {
                    textbox_deffenderElements.forEach(function(element) {
        
                        element.style.borderStyle = "none";
                        element.style.background = "rgb(251 251 251 / 25%)";
        
                    });
                }

                //div.units div 
                if (checkbox.checked) {
                    divunitsdivElements.forEach(function(element) {
                        element.style.height = "124px";

                    });
                } 
                // Если чекбокс unchecked, то возвращаем стиль к предыдущему
                else {
                    divunitsdivElements.forEach(function(element) {
        
                        element.style.height = "98px";
        
                    });
                }
                

                 //vkl_vukl_hero
                if (checkbox.checked) {
                    vkl_vukl_heroElements.forEach(function(element) {
                        element.style.top = "-56px";

                    });
                } 
                // Если чекбокс unchecked, то возвращаем стиль к предыдущему
                else {
                    vkl_vukl_heroElements.forEach(function(element) {
        
                        element.style.top = "-30px";
        
                    });
                }

}


function vkl_vukl_zackl_pr(checkbox) {

    // Получаем все элементы с классом .army
    var magictoheroselectElements = document.querySelectorAll('.magic_to_hero_select');
    var magictoheroselect_numberElements = document.querySelectorAll('#magic_to_hero_select_0,#magic_to_hero_select_1,#magic_to_hero_select_6');
    var magictoheroselect_numberElements = document.querySelectorAll('#magic_to_hero_select_0,#magic_to_hero_select_1,#magic_to_hero_select_6,#magic_to_hero_select_3,#magic_to_hero_select_4,#magic_to_hero_select_5');
    var magictoheroselect_2Elements = document.querySelectorAll('#magic_to_hero_select_2');


//800px
    // Если чекбокс checked, то изменяем стиль на новый
    if (checkbox.checked) {
        magictoheroselectElements.forEach(function(element) {
            element.style.width = "650px";
        });
    } 
    // Если чекбокс unchecked, то возвращаем стиль к предыдущему
    else {
        magictoheroselectElements.forEach(function(element) {
            element.style.width = "591px";
        });
    }



    // Если чекбокс checked, то изменяем стиль на новый
    if (checkbox.checked) {
        magictoheroselect_numberElements.forEach(function(element) {
            element.style.height = "685px";
        });
    } 
    // Если чекбокс unchecked, то возвращаем стиль к предыдущему
    else {
        magictoheroselect_numberElements.forEach(function(element) {
            element.style.height = "485px";
        });
    }

    
    // Если чекбокс checked, то изменяем стиль на новый
    if (checkbox.checked) {
        magictoheroselect_2Elements.forEach(function(element) {
            element.style.height = "800px";
        });
    } 
    // Если чекбокс unchecked, то возвращаем стиль к предыдущему
    else {
        magictoheroselect_2Elements.forEach(function(element) {
            element.style.height = "485px";
        });
    }


}
//cкрыть выбор героев (в новой менюшке героев)
function close_window_update_hero(num) {

    document.getElementById("update_hero_" + num).style.display = "none";
    document.getElementById("update_art_list_" + num).style.display = "none";
        
    document.getElementById("magic_to_hero_select_" + num).style.display = "none";
    document.getElementById("creator_bonus_" + num).style.display = "none";

        /* Закрытие менюшки со шмотками */
        document.getElementById("select_shmotka_0_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_1_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_2_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_3_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_4_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_5_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_6_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_7_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_8_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_9_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_10_" + this_number2).style.display = "none";
        document.getElementById("select_shmotka_11_" + this_number2).style.display = "none";
    

}

//высветить набор артов
function update_art_list_hero(num) {
    document.getElementById("update_art_list_" + num).style.display = "block";

    document.getElementById("update_hero_" + num).style.display = "none";
    document.getElementById("magic_to_hero_select_" + num).style.display = "none";
    document.getElementById("creator_bonus_" + num).style.display = "none";

    /* Закрытие менюшки со шмотками */
    document.getElementById("select_shmotka_0_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_1_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_2_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_3_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_4_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_5_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_6_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_7_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_8_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_9_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_10_" + this_number2).style.display = "none";
    document.getElementById("select_shmotka_11_" + this_number2).style.display = "none";

    /* Закрытие менюшки с рунами/заточками */
    document.getElementById("select_rynu_0_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_1_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_2_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_3_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_4_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_5_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_6_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_7_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_8_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_9_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_10_" + this_number2).style.display = "none";
    document.getElementById("select_rynu_11_" + this_number2).style.display = "none";

}




//скрыть показать див(передаем ид и что делать 0 - скрыть 1 - показать

function do_show_div(idishnik, doo) {
    if (flag_alximik) {
        flag_alximik = false;
        return;
        
    }
    if (doo) {
        document.getElementById(idishnik).style.display = "block";
    }
    else {
        document.getElementById(idishnik).style.display = "none";
    }
}




//формирование случайного значение от 0 до переданого
function random_value(x) {
    return Math.floor((Math.random() * 10000)) % (x + 1);
}

//обнуление переменной атакс у обектов юнитов для раундов
function null_ataks() {
    for (var i = 0; i < 7; i++)
        unitu[i].ataks = 0;
}

//расчет процентов для дамагов внутри войск для типов всех 5 войск(в бою)
function proc_for_all_u() {
    if (unitu[0].boy) unitu[0].procentu_dla_damaga();
    if (unitu[2].boy) unitu[2].procentu_dla_damaga();
    if (unitu[1].boy) unitu[1].procentu_dla_damaga();
    if (unitu[3].boy) unitu[3].procentu_dla_damaga();
    if (unitu[4].boy) unitu[4].procentu_dla_damaga();
    if (unitu[5].boy) unitu[5].procentu_dla_damaga();
    if (unitu[6].boy) unitu[6].procentu_dla_damaga();
}

//убиваем во всех войсках юнитов
function kill_all_u(kastulKz) {

    if (unitu[0].boy) unitu[0].kill_all();
    if (unitu[1].boy) unitu[1].kill_all();
    if (unitu[6].boy) unitu[6].kill_all();
    if (!kastulKz) {
        if (unitu[2].boy) unitu[2].kill_all();
        if (unitu[3].boy) unitu[3].kill_all();
        if (unitu[4].boy) unitu[4].kill_all();
        if (unitu[5].boy) unitu[5].kill_all();
    }
}

//переводим -юнитов в дополнительный дамага (в формуле не забыть бонусы к ХР) округление выжевших и обнуление минуснутых
function second_damag_all_u() {
    if (unitu[0].boy) unitu[0].second_damag_all();
    if (unitu[2].boy) unitu[2].second_damag_all();
    if (unitu[1].boy) unitu[1].second_damag_all();
    if (unitu[3].boy) unitu[3].second_damag_all();
    if (unitu[4].boy) unitu[4].second_damag_all();
    if (unitu[5].boy) unitu[5].second_damag_all();
    if (unitu[6].boy) unitu[6].second_damag_all();
}

//дамаг в нутри войска из % в цифры у каждого
function in_damag_u() {
    if (unitu[0].boy) unitu[0].peregon_proc();
    if (unitu[1].boy) unitu[1].peregon_proc();
    if (unitu[6].boy) unitu[6].peregon_proc();
    if (unitu[2].boy) unitu[2].peregon_proc();
    if (unitu[3].boy) unitu[3].peregon_proc();
    if (unitu[4].boy) unitu[4].peregon_proc();
    if (unitu[5].boy) unitu[5].peregon_proc();
}

//функция подсчета опыта героев
function expiriens_hero_u(idi, nums, ruins) {

    //подсчет опыта героя   (idi, nums(5000\2000),ruins(250\1000))
    //подсчет стоимости убитых со сторон с учетом понижения стоемости(если расса убитых монстры)
    damag_na_zaw = ((unitu[2].type != 4 ? unitu[2].cost(unitu[2].proc_damag_unitu) : Math.round(unitu[2].cost(unitu[2].proc_damag_unitu) / ruins)) +
        (unitu[3].type != 4 ? unitu[3].cost(unitu[3].proc_damag_unitu) : Math.round(unitu[3].cost(unitu[3].proc_damag_unitu) / ruins)) +
        (unitu[4].type != 4  ? unitu[4].cost(unitu[4].proc_damag_unitu) : Math.round(unitu[4].cost(unitu[4].proc_damag_unitu) / ruins)) +
        (unitu[5].type != 4 ? unitu[5].cost(unitu[5].proc_damag_unitu) : Math.round(unitu[5].cost(unitu[5].proc_damag_unitu) / ruins))) * (-1); //стоимость убитых защитников
    damag_na_atk = ((unitu[0].type != 4 ? unitu[0].cost(unitu[0].proc_damag_unitu) : Math.round(unitu[0].cost(unitu[0].proc_damag_unitu) / ruins)) +
        (unitu[1].type != 4 ? unitu[1].cost(unitu[1].proc_damag_unitu) : Math.round(unitu[1].cost(unitu[1].proc_damag_unitu) / ruins)) +
        (unitu[6].type != 4 ? unitu[6].cost(unitu[6].proc_damag_unitu) : Math.round(unitu[6].cost(unitu[6].proc_damag_unitu) / ruins))) * (-1); //стоимость убитых атакующих

    //распределение стоимости убитых между убийцами по процентному соотнощению стоимости взятых в бой войск
    //между атакующими
    //расчет соотношения

    var cost_unit_atak = [unitu[0].cost(unitu[0].vq[num_volna]), unitu[1].cost(unitu[1].vq[num_volna]), unitu[6].cost(unitu[6].vq[num_volna])];
    if (!unitu[1].bul_v_boy) {
        cost_unit_atak[1] = 0;
    }
    if (!unitu[6].bul_v_boy) {
        cost_unit_atak[2] = 0;
    }
    unitu[0].ataks = cost_unit_atak[0] / ((cost_unit_atak[0] + cost_unit_atak[1] + cost_unit_atak[2]) / 100);
    unitu[1].ataks = cost_unit_atak[1] / ((cost_unit_atak[0] + cost_unit_atak[1] + cost_unit_atak[2]) / 100);
    unitu[6].ataks = 100 - unitu[0].ataks - unitu[1].ataks;
    //перевод соотношения в цифры
    unitu[0].ataks = damag_na_zaw / 100 * unitu[0].ataks;
    unitu[1].ataks = damag_na_zaw / 100 * unitu[1].ataks;
    unitu[6].ataks = damag_na_zaw / 100 * unitu[1].ataks;
    //валидация соотношени
    unitu[0].ataks = isNaN(unitu[0].ataks) ? 0 : Math.round(unitu[0].ataks);
    unitu[1].ataks = isNaN(unitu[1].ataks) ? 0 : Math.round(unitu[1].ataks);
    unitu[6].ataks = isNaN(unitu[6].ataks) ? 0 : Math.round(unitu[6].ataks);
    //между защитниками
    //расчет соотношения

    var cost_unit_zaw = [unitu[2].cost(unitu[2].vq[num_volna]), unitu[3].cost(unitu[3].vq[num_volna]), unitu[4].cost(unitu[4].vq[num_volna]), unitu[5].cost(unitu[5].vq[num_volna])];

    if (!unitu[3].bul_v_boy) {
        cost_unit_zaw[1] = 0;
    }
    if (!unitu[4].bul_v_boy) {
        cost_unit_zaw[2] = 0;
    }
    if (!unitu[5].bul_v_boy) {
        cost_unit_zaw[3] = 0;
    }
    unitu[2].xxx = (cost_unit_zaw[0] + cost_unit_zaw[1] + cost_unit_zaw[2] + cost_unit_zaw[3]) / 100;
    unitu[2].ataks = cost_unit_zaw[0] / (unitu[2].xxx);
    unitu[3].ataks = cost_unit_zaw[1] / (unitu[2].xxx);
    unitu[4].ataks = cost_unit_zaw[2] / (unitu[2].xxx);
    unitu[5].ataks = cost_unit_zaw[3] / (unitu[2].xxx);
    //перевод соотношений в цифры
    unitu[2].ataks = damag_na_atk / 100 * unitu[2].ataks;
    unitu[3].ataks = damag_na_atk / 100 * unitu[3].ataks;
    unitu[4].ataks = damag_na_atk / 100 * unitu[4].ataks;
    unitu[5].ataks = damag_na_atk / 100 * unitu[5].ataks;
    //валидация соотношений
    unitu[2].ataks = isNaN(unitu[2].ataks) ? 0 : Math.round(unitu[2].ataks);
    unitu[3].ataks = isNaN(unitu[3].ataks) ? 0 : Math.round(unitu[3].ataks);
    unitu[4].ataks = isNaN(unitu[4].ataks) ? 0 : Math.round(unitu[4].ataks);
    unitu[5].ataks = isNaN(unitu[5].ataks) ? 0 : Math.round(unitu[5].ataks);

    //надбавка бонусного опыта из-за заклинаний или шмоток(если такой имеется)
    unitu[0].ataks += unitu[0].ataks / 100 * unitu[0].bonusu[34];
    unitu[2].ataks += unitu[2].ataks / 100 * unitu[2].bonusu[34];
    if (unitu[1].bul_v_boy) unitu[1].ataks += unitu[1].ataks / 100 * unitu[1].bonusu[34];
    if (unitu[3].bul_v_boy) unitu[3].ataks += unitu[3].ataks / 100 * unitu[3].bonusu[34];
    if (unitu[4].bul_v_boy) unitu[4].ataks += unitu[4].ataks / 100 * unitu[4].bonusu[34];
    if (unitu[5].bul_v_boy) unitu[5].ataks += unitu[5].ataks / 100 * unitu[5].bonusu[34];
    if (unitu[6].bul_v_boy) unitu[6].ataks += unitu[6].ataks / 100 * unitu[6].bonusu[34];

    //перевод цифр в опыт с округлением
    if (unitu[0].win) {
        //выгравшие атакующие
        unitu[0].ataks = Math.floor(unitu[0].ataks / nums); //!!
        unitu[1].ataks = Math.floor(unitu[1].ataks / nums); //!!
        unitu[6].ataks = Math.floor(unitu[6].ataks / nums); //!!
        //проигравшие защитники
        unitu[2].ataks = Math.floor(unitu[2].ataks / 333333);
        unitu[3].ataks = Math.floor(unitu[3].ataks / 333333);
        unitu[4].ataks = Math.floor(unitu[4].ataks / 333333);
        unitu[5].ataks = Math.floor(unitu[5].ataks / 333333);
    }
    else {
        //проигравшие защитники
        unitu[0].ataks = Math.floor(unitu[0].ataks / 200000);
        unitu[1].ataks = Math.floor(unitu[1].ataks / 200000);
        unitu[6].ataks = Math.floor(unitu[6].ataks / 200000);
        //выгравшие атакующие
        unitu[2].ataks = Math.floor(unitu[2].ataks / 20000);
        unitu[3].ataks = Math.floor(unitu[3].ataks / 20000);
        unitu[4].ataks = Math.floor(unitu[4].ataks / 20000);
        unitu[5].ataks = Math.floor(unitu[5].ataks / 20000);
    }

    //валидация бонусов
    //если монст то не получает опыта
    for (i = 0; i < 7; i++) {
        if (unitu[i].ataks < 0) unitu[i].ataks = 0;  //проверка опыта на отрицательность
        if (unitu[i].type == 4) unitu[i].ataks = 0;
        if (!unitu[i].hero) unitu[i].ataks = 0; // если есть герой
        //вывод опыта
        document.getElementById(idi + unitu[i].number).value = unitu[i].ataks;
        //TODO: высвечивает опыт набраный героем
        //todo hero xp remove comment
        //document.getElementById("expiriens_"+unitu[i].number).style.display = "block";
    }
    //обнуление ataks y всех войск
    null_ataks();
}


//функция подсчета опыта героев
function new_expiriens_hero_u() {
    damag_na_zaw = -(unitu[2].cost(unitu[2].proc_damag_unitu) +
        unitu[3].cost(unitu[3].proc_damag_unitu) +
        unitu[4].cost(unitu[4].proc_damag_unitu) +
        unitu[5].cost(unitu[5].proc_damag_unitu));
    damag_na_atk = -(unitu[0].cost(unitu[0].proc_damag_unitu) +
        unitu[1].cost(unitu[1].proc_damag_unitu) +
        unitu[6].cost(unitu[6].proc_damag_unitu));

    //распределение стоимости убитых между убийцами по процентному соотнощению стоимости взятых в бой войск
    //между атакующими
    //расчет соотношения

    var cost_unit_atak = [unitu[0].cost(unitu[0].vq[num_volna]), unitu[1].cost(unitu[1].vq[num_volna]), unitu[6].cost(unitu[6].vq[num_volna])];
    if (!unitu[1].bul_v_boy) {
        cost_unit_atak[1] = 0;
    }
    if (!unitu[6].bul_v_boy) {
        cost_unit_atak[2] = 0;
    }
    unitu[0].ataks = cost_unit_atak[0] / ((cost_unit_atak[0] + cost_unit_atak[1] + cost_unit_atak[2]) / 100);
    unitu[1].ataks = cost_unit_atak[1] / ((cost_unit_atak[0] + cost_unit_atak[1] + cost_unit_atak[2]) / 100);
    unitu[6].ataks = 100 - unitu[0].ataks - unitu[1].ataks;

    //перевод соотношения в цифры
    unitu[0].ataks = damag_na_zaw / 100 * unitu[0].ataks;
    unitu[1].ataks = damag_na_zaw / 100 * unitu[1].ataks;
    unitu[6].ataks = damag_na_zaw / 100 * unitu[6].ataks;

    //валидация соотношени
    unitu[0].ataks = isNaN(unitu[0].ataks) ? 0 : Math.round(unitu[0].ataks);
    unitu[1].ataks = isNaN(unitu[1].ataks) ? 0 : Math.round(unitu[1].ataks);
    unitu[6].ataks = isNaN(unitu[6].ataks) ? 0 : Math.round(unitu[6].ataks);

    //между защитниками
    //расчет соотношения

    var cost_unit_zaw = [unitu[2].cost(unitu[2].vq[num_volna]), unitu[3].cost(unitu[3].vq[num_volna]), unitu[4].cost(unitu[4].vq[num_volna]), unitu[5].cost(unitu[5].vq[num_volna])];

    if (!unitu[3].bul_v_boy) {
        cost_unit_zaw[1] = 0;
    }
    if (!unitu[4].bul_v_boy) {
        cost_unit_zaw[2] = 0;
    }
    if (!unitu[5].bul_v_boy) {
        cost_unit_zaw[3] = 0;
    }
    unitu[2].xxx = (cost_unit_zaw[0] + cost_unit_zaw[1] + cost_unit_zaw[2] + cost_unit_zaw[3]) / 100;
    unitu[2].ataks = cost_unit_zaw[0] / (unitu[2].xxx);
    unitu[3].ataks = cost_unit_zaw[1] / (unitu[2].xxx);
    unitu[4].ataks = cost_unit_zaw[2] / (unitu[2].xxx);
    unitu[5].ataks = cost_unit_zaw[3] / (unitu[2].xxx);
    //перевод соотношений в цифры
    unitu[2].ataks = damag_na_atk / 100 * unitu[2].ataks;
    unitu[3].ataks = damag_na_atk / 100 * unitu[3].ataks;
    unitu[4].ataks = damag_na_atk / 100 * unitu[4].ataks;
    unitu[5].ataks = damag_na_atk / 100 * unitu[5].ataks;
    //валидация соотношений
    unitu[2].ataks = isNaN(unitu[2].ataks) ? 0 : Math.round(unitu[2].ataks);
    unitu[3].ataks = isNaN(unitu[3].ataks) ? 0 : Math.round(unitu[3].ataks);
    unitu[4].ataks = isNaN(unitu[4].ataks) ? 0 : Math.round(unitu[4].ataks);
    unitu[5].ataks = isNaN(unitu[5].ataks) ? 0 : Math.round(unitu[5].ataks);

    //надбавка бонусного опыта из-за заклинаний или шмоток(если такой имеется)
    unitu[0].ataks += unitu[0].ataks / 100 * unitu[0].bonusu[34];
    unitu[2].ataks += unitu[2].ataks / 100 * unitu[2].bonusu[34];
    if (unitu[1].bul_v_boy) unitu[1].ataks += unitu[1].ataks / 100 * unitu[1].bonusu[34];
    if (unitu[3].bul_v_boy) unitu[3].ataks += unitu[3].ataks / 100 * unitu[3].bonusu[34];
    if (unitu[4].bul_v_boy) unitu[4].ataks += unitu[4].ataks / 100 * unitu[4].bonusu[34];
    if (unitu[5].bul_v_boy) unitu[5].ataks += unitu[5].ataks / 100 * unitu[5].bonusu[34];
    if (unitu[6].bul_v_boy) unitu[6].ataks += unitu[6].ataks / 100 * unitu[6].bonusu[34];

    //перевод цифр в опыт с округлением
    if (unitu[0].win) {

        if (this.type_server == 3 && unitu[2].type == 4)
        {        
        //выгравшие атакующие
        var nums =  0.0002; 
        unitu[0].ataks = Math.floor(unitu[0].ataks * nums); //!!
        unitu[1].ataks = Math.floor(unitu[1].ataks * nums); //!!
        unitu[6].ataks = Math.floor(unitu[6].ataks * nums); //!!
        //проигравшие защитники
        unitu[2].ataks = Math.floor(unitu[2].ataks * 0.000003);
        unitu[3].ataks = Math.floor(unitu[3].ataks * 0.000003);
        unitu[4].ataks = Math.floor(unitu[4].ataks * 0.000003);
        unitu[5].ataks = Math.floor(unitu[5].ataks * 0.000003);
    }
    else
    {
        var nums = db_coof_for_expa_atak_win[type_server - 1];
        /* если монстры, то ставим другой параметр опыта для сервера 1(шахта) и типа 4 */
        if (this.type_server == 1 && unitu[2].type == 4)
            { 
                var nums =  0.0004; 
            }
        unitu[0].ataks = Math.floor(unitu[0].ataks * nums); //!!
        unitu[1].ataks = Math.floor(unitu[1].ataks * nums); //!!
        unitu[6].ataks = Math.floor(unitu[6].ataks * nums); //!!
        //проигравшие защитники
        unitu[2].ataks = Math.floor(unitu[2].ataks * 0.000003);
        unitu[3].ataks = Math.floor(unitu[3].ataks * 0.000003);
        unitu[4].ataks = Math.floor(unitu[4].ataks * 0.000003);
        unitu[5].ataks = Math.floor(unitu[5].ataks * 0.000003);

    }
    }
    else {
        //проигравшие атакующие
        unitu[0].ataks = Math.floor(unitu[0].ataks * 0.000005);
        unitu[1].ataks = Math.floor(unitu[1].ataks * 0.000005);
        unitu[6].ataks = Math.floor(unitu[6].ataks * 0.000005);
        //выгравшие зазитники
        unitu[2].ataks = Math.floor(unitu[2].ataks * 0.00005);
        unitu[3].ataks = Math.floor(unitu[3].ataks * 0.00005);
        unitu[4].ataks = Math.floor(unitu[4].ataks * 0.00005);
        unitu[5].ataks = Math.floor(unitu[5].ataks * 0.00005);
    }

    //валидация бонусов
    //если монст то не получает опыта

    for (i = 0; i < 7; i++) {
        if (unitu[i].ataks < 0) unitu[i].ataks = 0;  //проверка опыта на отрицательность
        if (unitu[i].type == 4) unitu[i].ataks = 0;
        if (!unitu[i].hero) unitu[i].ataks = 0; // если есть герой
        //вывод опыта
        document.getElementById("expiriens_mins_" + unitu[i].number).value = unitu[i].ataks;
        //        //TODO: высвечивает опыт набраный героем
        //      document.getElementById("expiriens_mins_"+unitu[i].number).style.display = "block";
    }
    //обнуление ataks y всех войск
    null_ataks();
}
//отмечание что эта стоим на озере
function ozero() {
    othero = othero ? false : true;
}

////TODO: (цикл сменить)обработка волн (num volnu)
function volnu_change(num) {
    rashet();
    if (flags_gate[num]) {
        document.getElementById("gate_add").style.display = 'none';
        document.getElementById("gate").style.display = 'inline-block';
    }
    else {
        document.getElementById("gate_add").style.display = 'inline-block';
        document.getElementById("gate").style.display = 'none';
    }
    //смена цвета кнопок
    $("#hp_gate").val(gate_hp[num]);
    document.getElementById("b1").style.background = "#FFFFFF";
    document.getElementById("b2").style.background = "#FFFFFF";
    document.getElementById("b3").style.background = "#FFFFFF";
    document.getElementById("b" + (num + 1)).style.background = "#66FFFF";

    if (num_volna > num) {


        //hero_vkl

        hero_vkl[0][num_volna] = unitu[0].hero;
        hero_vkl[1][num_volna] = unitu[1].hero;
        hero_vkl[2][num_volna] = unitu[6].hero;
        hero_voln[0][num_volna].rewrite(heroes[0]);
        hero_voln[1][num_volna].rewrite(heroes[1]);
        hero_voln[2][num_volna].rewrite(heroes[6]);



        //назад
        num_volna = num;



        unitu[0].hero = hero_vkl[0][num_volna];
        unitu[1].hero = hero_vkl[1][num_volna];
        unitu[6].hero = hero_vkl[2][num_volna];

        setHero(0, hero_voln[0][num_volna]);
        setHero(1, hero_voln[1][num_volna]);
        setHero(6, hero_voln[2][num_volna]);





        var i00 = 7;
        do {
            i00--;
            unitu[i00].bul_v_boy = unitu[i00].v_boy_volnu[num_volna];
            if (i00 != 0 && i00 != 2)
                onSee(i00, unitu[i00].bul_v_boy);
            unitu[i00].is_volnu();
            unitu[i00].input_true();
            unitu[i00].change_all_img(i00);
        } while (i00);


        rashet();

    }
    else {
        if (num_volna != num) {
            rashet();



            hero_vkl[0][num_volna] = unitu[0].hero;
            hero_vkl[1][num_volna] = unitu[1].hero;
            hero_vkl[2][num_volna] = unitu[6].hero;
            hero_voln[0][num_volna].rewrite(heroes[0]);
            hero_voln[1][num_volna].rewrite(heroes[1]);
            hero_voln[2][num_volna].rewrite(heroes[6]);

            num_volna = num;


            unitu[0].hero = hero_vkl[0][num_volna];
            unitu[1].hero = hero_vkl[1][num_volna];
            unitu[6].hero = hero_vkl[2][num_volna];

            setHero(0, hero_voln[0][num_volna]);
            setHero(1, hero_voln[1][num_volna]);
            setHero(6, hero_voln[2][num_volna]);

            var i = 8;
            do {
                i--;
                unitu[0].qq[i] = unitu[0].vq[num_volna][i];
                unitu[1].qq[i] = unitu[1].vq[num_volna][i];
                unitu[6].qq[i] = unitu[6].vq[num_volna][i];
                unitu[0].change_one_input(0, i);
                unitu[1].change_one_input(1, i);
                unitu[6].change_one_input(6, i);
                //новые значения для волн
                unitu[2].qq[i] = parseInt(document.getElementById("unitu_2_" + i).value);
                unitu[3].qq[i] = parseInt(document.getElementById("unitu_3_" + i).value);
                unitu[4].qq[i] = parseInt(document.getElementById("unitu_4_" + i).value);
                unitu[5].qq[i] = parseInt(document.getElementById("unitu_4_" + i).value);

                unitu[2].volna_save();
                unitu[3].volna_save();
                unitu[4].volna_save();
                unitu[5].volna_save();

                unitu[2].change_one_input(2, i);
                unitu[3].change_one_input(3, i);
                unitu[4].change_one_input(4, i);
                unitu[5].change_one_input(5, i);

            } while (i);

            i = 7;
            do {
                i--;
                unitu[i].change_all_img(i);
                if (i == 1 || i == 6)
                    unitu[i].bul_v_boy = unitu[i].v_boy_volnu[num_volna];
                else
                    if (i == 0 || i == 2) {
                        unitu[i].bul_v_boy = true;
                        unitu[i].v_boy_volnu[num_volna] = true;
                    }
                    else {
                        if (!unitu[i].bul_v_boy)
                            unitu[i].bul_v_boy = unitu[i].v_boy_volnu[num_volna];
                    }
                if (i != 0 && i != 2) {
                    //todo fix show some + and - парам
                    onSee(i, unitu[i].bul_v_boy);
                }

            }
            while (i);

            rashet();
        }
        //вперед
    }
}

//очистка героя
function cleen_hero(num) {
    unitu[num].hero = false;
    unitu[num].checked_hero_true();
    heroes[num].cleen();
    heroes[num].hero_true(false, num);
}

//слаживание бонуса с характиристика бонусов войска (номер бонуса, номер войска)
function help_skils_add(xyx, x) {
    switch (db_bonuses[xyx][39]) {
        case 0: { //себе
            unitu[x].plus_bonus(xyx, unitu[x].type, unitu[x].type_vrag);
            break;
        }
        case 1: { //другу
            if (unitu[x].number < 2 || unitu[x].number == 6) {
                if (unitu[x].number == 1) {
                    unitu[0].plus_bonus(xyx, unitu[0].type, unitu[x].type_vrag);
                    unitu[6].plus_bonus(xyx, unitu[6].type, unitu[x].type_vrag);
                }
                else
                    if (unitu[x].number == 0) {
                        unitu[1].plus_bonus(xyx, unitu[1].type, unitu[x].type_vrag);
                        unitu[6].plus_bonus(xyx, unitu[6].type, unitu[x].type_vrag);
                    }
                    else {
                        unitu[1].plus_bonus(xyx, unitu[1].type, unitu[x].type_vrag);
                        unitu[0].plus_bonus(xyx, unitu[0].type, unitu[x].type_vrag);
                    }
            }
            else {
                if (unitu[x].number == 2) {
                    unitu[3].plus_bonus(xyx, unitu[3].type, unitu[x].type_vrag);
                    unitu[4].plus_bonus(xyx, unitu[4].type, unitu[x].type_vrag);
                    unitu[5].plus_bonus(xyx, unitu[5].type, unitu[x].type_vrag);
                }
                else
                    if (unitu[x].number == 3) {
                        unitu[2].plus_bonus(xyx, unitu[2].type, unitu[x].type_vrag);
                        unitu[4].plus_bonus(xyx, unitu[4].type, unitu[x].type_vrag);
                        unitu[5].plus_bonus(xyx, unitu[5].type, unitu[x].type_vrag);
                    }
                    else
                        if (unitu[x].number == 4) {
                            unitu[2].plus_bonus(xyx, unitu[2].type, unitu[x].type_vrag);
                            unitu[3].plus_bonus(xyx, unitu[3].type, unitu[x].type_vrag);
                            unitu[5].plus_bonus(xyx, unitu[5].type, unitu[x].type_vrag);
                        }
                        else
                            if (unitu[x].number == 5) {
                                unitu[2].plus_bonus(xyx, unitu[2].type, unitu[x].type_vrag);
                                unitu[3].plus_bonus(xyx, unitu[3].type, unitu[x].type_vrag);
                                unitu[4].plus_bonus(xyx, unitu[4].type, unitu[x].type_vrag);
                            }
            }
            break;


        }
        case 2: { //врагу
            if (unitu[x].number > 1 && unitu[x].number < 6) {
                unitu[0].plus_bonus(xyx, unitu[x].type, unitu[0].type);
                unitu[1].plus_bonus(xyx, unitu[x].type, unitu[1].type);
                unitu[6].plus_bonus(xyx, unitu[x].type, unitu[6].type);
            }
            else {
                unitu[2].plus_bonus(xyx, unitu[x].type, unitu[2].type);
                unitu[3].plus_bonus(xyx, unitu[x].type, unitu[3].type);
                unitu[4].plus_bonus(xyx, unitu[x].type, unitu[4].type);
                unitu[5].plus_bonus(xyx, unitu[x].type, unitu[5].type);
            }
            break;
        }
        case 3: { //всем
            unitu[0].plus_bonus(xyx, unitu[0].type, unitu[0].type_vrag);
            unitu[1].plus_bonus(xyx, unitu[1].type, unitu[1].type_vrag);
            unitu[2].plus_bonus(xyx, unitu[2].type, unitu[2].type_vrag);
            unitu[3].plus_bonus(xyx, unitu[3].type, unitu[3].type_vrag);
            unitu[4].plus_bonus(xyx, unitu[4].type, unitu[4].type_vrag);
            unitu[5].plus_bonus(xyx, unitu[5].type, unitu[5].type_vrag);
            unitu[6].plus_bonus(xyx, unitu[6].type, unitu[6].type_vrag);
            break;
        }
        case 4: { //себе и союзнику
            unitu[x].plus_bonus(xyx, unitu[x].type, unitu[x].type_vrag);
            if (unitu[x].number < 2 || unitu[x].number == 6) {
                if (unitu[x].number == 1) {
                    unitu[0].plus_bonus(xyx, unitu[0].type, unitu[x].type_vrag);
                    unitu[6].plus_bonus(xyx, unitu[6].type, unitu[x].type_vrag);
                }
                else
                    if (unitu[x].number == 1) {
                        unitu[1].plus_bonus(xyx, unitu[1].type, unitu[x].type_vrag);
                        unitu[6].plus_bonus(xyx, unitu[6].type, unitu[x].type_vrag);
                    }
                    else {
                        unitu[1].plus_bonus(xyx, unitu[1].type, unitu[x].type_vrag);
                        unitu[0].plus_bonus(xyx, unitu[0].type, unitu[x].type_vrag);
                    }
                if (1014 == xyx) {
                    unitu[2].plus_bonus(1016, unitu[2].type, unitu[x].type_vrag);
                    unitu[3].plus_bonus(1016, unitu[3].type, unitu[x].type_vrag);
                    unitu[4].plus_bonus(1016, unitu[4].type, unitu[x].type_vrag);
                    unitu[5].plus_bonus(1016, unitu[5].type, unitu[x].type_vrag);
                }
                if (1197 == xyx) {
                    unitu[2].plus_bonus(1199, unitu[2].type, unitu[x].type_vrag);
                    unitu[3].plus_bonus(1199, unitu[3].type, unitu[x].type_vrag);
                    unitu[4].plus_bonus(1199, unitu[4].type, unitu[x].type_vrag);
                    unitu[5].plus_bonus(1199, unitu[5].type, unitu[x].type_vrag);
                }
            }
            else {
                if (unitu[x].number == 2) {
                    unitu[3].plus_bonus(xyx, unitu[3].type, unitu[x].type_vrag);
                    unitu[4].plus_bonus(xyx, unitu[4].type, unitu[x].type_vrag);
                    unitu[5].plus_bonus(xyx, unitu[5].type, unitu[x].type_vrag);
                }
                else
                    if (unitu[x].number == 3) {
                        unitu[2].plus_bonus(xyx, unitu[2].type, unitu[x].type_vrag);
                        unitu[4].plus_bonus(xyx, unitu[4].type, unitu[x].type_vrag);
                        unitu[5].plus_bonus(xyx, unitu[5].type, unitu[x].type_vrag);
                    }
                    else
                        if (unitu[x].number == 4) {
                            unitu[2].plus_bonus(xyx, unitu[2].type, unitu[x].type_vrag);
                            unitu[3].plus_bonus(xyx, unitu[3].type, unitu[x].type_vrag);
                            unitu[5].plus_bonus(xyx, unitu[5].type, unitu[x].type_vrag);
                        }
                        else
                            if (unitu[x].number == 5) {
                                unitu[2].plus_bonus(xyx, unitu[2].type, unitu[x].type_vrag);
                                unitu[3].plus_bonus(xyx, unitu[3].type, unitu[x].type_vrag);
                                unitu[4].plus_bonus(xyx, unitu[4].type, unitu[x].type_vrag);
                            }

               if (1014 == xyx) {
                    unitu[0].plus_bonus(1016, unitu[0].type, unitu[x].type_vrag);
                    unitu[1].plus_bonus(1016, unitu[1].type, unitu[x].type_vrag);
                    unitu[6].plus_bonus(1016, unitu[6].type, unitu[x].type_vrag);
                }
                if (1197 == xyx) {
                    unitu[0].plus_bonus(1199, unitu[0].type, unitu[x].type_vrag);
                    unitu[1].plus_bonus(1199, unitu[1].type, unitu[x].type_vrag);
                    unitu[6].plus_bonus(1199, unitu[6].type, unitu[x].type_vrag);
                }
            }

            break;
        }

    }
}

//сохранение для ид
function save_all() {
    //в json
    all = new Object();
    all.unitu = unitu;
    all.heroes = heroes;
    all.other = new Array(
        spes,
        max_z,
        teretory,
        limit_b,
        lvl_mb_1,
        lvl_mb_2,
        lvl_bb_1,
        lvl_bb_2,
        kol_vo_yb,
        victory,
        type_raz_,
        num_volna,
        ficha_ruinu,
        othero,
        go_back,
        kz,
        gate_hp,
        gate_lvl,
        flags_gate,
        hero_vkl,
        hero_voln,
        type_server,
        skill_ost_mech,
        skill_presledovanie_assasina,
        skill_hp_mamonta,
        skill_kam_bronya
    );
    all2 = JSON.stringify(all);
    //отправка
    $.post('save-game.php', {
        content: all2
    },
        Success2);
}

function Success2(data) {
    $('#save_id').val(data);
    $("#link-for-load input").val('' + data + '/');
    $('#link-for-load').show();
}

//загрузка для ид
function load_all(id) {
    if (id == undefined)
        id = $.trim($('#save_id').val());
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид feo_load
function feo_load_all(id) {
    if (id == undefined)
        id = "preset/presetFeo";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид ur_load
function ur_load_all(id) {
    if (id == undefined)
        id = "preset/presetUr";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид torn_load
function torn_load_all(id) {
    if (id == undefined)
        id = "preset/presetTorn";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид io_load
function io_load_all(id) {
    if (id == undefined)
        id = "preset/presetIo";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид rad_load
function rad_load_all(id) {
    if (id == undefined)
        id = "preset/presetRad";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид tir_load
function tir_load_all(id) {
    if (id == undefined)
        id = "preset/presetTir";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид gify_load
function gify_load_all(id) {
    if (id == undefined)
        id = "preset/presetGify";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид ia_load
function ia_load_all(id) {
    if (id == undefined)
        id = "preset/presetIa";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид hegl_load
function hegl_load_all(id) {
    if (id == undefined)
        id = "preset/presetHegl";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид a_a_load
function a_a_load_all(id) {
    if (id == undefined)
        id = "preset/preset1_1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид a_aa_load
function a_aa_load_all(id) {
    if (id == undefined)
        id = "preset/preset1_2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид a_aaa_load
function a_aaa_load_all(id) {
    if (id == undefined)
        id = "preset/preset1_3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид a_aaaa_load
function a_aaaa_load_all(id) {
    if (id == undefined)
        id = "preset/preset1_4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид a_aaaaa_load
function a_aaaaa_load_all(id) {
    if (id == undefined)
        id = "preset/preset1_5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид b_b_load
function b_b_load_all(id) {
    if (id == undefined)
        id = "preset/preset2_1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид b_bb_load
function b_bb_load_all(id) {
    if (id == undefined)
        id = "preset/preset2_2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид b_bbb_load
function b_bbb_load_all(id) {
    if (id == undefined)
        id = "preset/preset2_3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид b_bbbb_load
function b_bbbb_load_all(id) {
    if (id == undefined)
        id = "preset/preset2_4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид c_c_load
function c_c_load_all(id) {
    if (id == undefined)
        id = "preset/preset3_1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид c_cc_load
function c_cc_load_all(id) {
    if (id == undefined)
        id = "preset/preset3_2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид c_ccc_load
function c_ccc_load_all(id) {
    if (id == undefined)
        id = "preset/preset3_3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид c_cc_load
function c_cccc_load_all(id) {
    if (id == undefined)
        id = "preset/preset3_4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид c_ccccc_load
function c_ccccc_load_all(id) {
    if (id == undefined)
        id = "preset/preset3_5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид d_d_load
function d_d_load_all(id) {
    if (id == undefined)
        id = "preset/preset4_1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид d_dd_load
function d_dd_load_all(id) {
    if (id == undefined)
        id = "preset/preset4_2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид d_ddd_load
function d_ddd_load_all(id) {
    if (id == undefined)
        id = "preset/preset4_3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид d_dddd_load
function d_dddd_load_all(id) {
    if (id == undefined)
        id = "preset/preset4_4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид d_ddddd_load
function d_ddddd_load_all(id) {
    if (id == undefined)
        id = "preset/preset4_5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид fiolet_load
function fiolet_load_all(id) {
    if (id == undefined)
        id = "preset/preset5_1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


/* ЗАГРУЗКИ САРКОФАГОВ */

//загрузка для ид armystrength1
function armystrength1_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrength2
function armystrength2_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength3
function armystrength3_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength4
function armystrength4_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength5
function armystrength5_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength1s
function armystrength1s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrength2s
function armystrength2s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength3s
function armystrength3s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength4s
function armystrength4s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrength5s
function armystrength5s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrength5s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид protection1
function protection1_load_all(id) {
    if (id == undefined)
        id = "preset/protection1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection2
function protection2_load_all(id) {
    if (id == undefined)
        id = "preset/protection2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection3
function protection3_load_all(id) {
    if (id == undefined)
        id = "preset/protection3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection4
function protection4_load_all(id) {
    if (id == undefined)
        id = "preset/protection4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection5
function protection5_load_all(id) {
    if (id == undefined)
        id = "preset/protection5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection1s
function protection1s_load_all(id) {
    if (id == undefined)
        id = "preset/protection1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection2s
function protection2s_load_all(id) {
    if (id == undefined)
        id = "preset/protection2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection3s
function protection3s_load_all(id) {
    if (id == undefined)
        id = "preset/protection3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection4s
function protection4s_load_all(id) {
    if (id == undefined)
        id = "preset/protection4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protection5s
function protection5s_load_all(id) {
    if (id == undefined)
        id = "preset/protection5s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyres1
function armyres1_load_all(id) {
    if (id == undefined)
        id = "preset/armyres1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyres2
function armyres2_load_all(id) {
    if (id == undefined)
        id = "preset/armyres2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyres3
function armyres3_load_all(id) {
    if (id == undefined)
        id = "preset/armyres3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyres4
function armyres4_load_all(id) {
    if (id == undefined)
        id = "preset/armyres4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyres5
function armyres5_load_all(id) {
    if (id == undefined)
        id = "preset/armyres5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyres1s
function armyres1s_load_all(id) {
    if (id == undefined)
        id = "preset/armyres1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyres2s
function armyres2s_load_all(id) {
    if (id == undefined)
        id = "preset/armyres2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyres3s
function armyres3s_load_all(id) {
    if (id == undefined)
        id = "preset/armyres3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyres4s
function armyres4s_load_all(id) {
    if (id == undefined)
        id = "preset/armyres4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyres5s
function armyres5s_load_all(id) {
    if (id == undefined)
        id = "preset/armyres5s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrengthally1
function armystrengthally1_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrengthally2
function armystrengthally2_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrengthally3
function armystrengthally3_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrengthally4
function armystrengthally4_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид armystrengthally1s
function armystrengthally1s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrengthally2s
function armystrengthally2s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armystrengthally3s
function armystrengthally3s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armystrengthally4s
function armystrengthally4s_load_all(id) {
    if (id == undefined)
        id = "preset/armystrengthally4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид protectally1
function protectally1_load_all(id) {
    if (id == undefined)
        id = "preset/protectally1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protectally2
function protectally2_load_all(id) {
    if (id == undefined)
        id = "preset/protectally2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protectally3
function protectally3_load_all(id) {
    if (id == undefined)
        id = "preset/protectally3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protectally4
function protectally4_load_all(id) {
    if (id == undefined)
        id = "preset/protectally4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид protectally1s
function protectally1s_load_all(id) {
    if (id == undefined)
        id = "preset/protectally1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protectally2s
function protectally2s_load_all(id) {
    if (id == undefined)
        id = "preset/protectally2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protectally3s
function protectally3s_load_all(id) {
    if (id == undefined)
        id = "preset/protectally3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид protectally4s
function protectally4s_load_all(id) {
    if (id == undefined)
        id = "preset/protectally4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyresally1
function armyresally1_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyresally2
function armyresally2_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyresally3
function armyresally3_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyresally4
function armyresally4_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyresally1s
function armyresally1s_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид armyresally2s
function armyresally2s_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyresally3s
function armyresally3s_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид armyresally4s
function armyresally4s_load_all(id) {
    if (id == undefined)
        id = "preset/armyresally4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид maxdef1
function maxdef1_load_all(id) {
    if (id == undefined)
        id = "preset/maxdef1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdef2
function maxdef2_load_all(id) {
    if (id == undefined)
        id = "preset/maxdef2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdef3
function maxdef3_load_all(id) {
    if (id == undefined)
        id = "preset/maxdef3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdef1s
function maxdef1s_load_all(id) {
    if (id == undefined)
        id = "preset/maxdef1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdef2s
function maxdef2s_load_all(id) {
    if (id == undefined)
        id = "preset/maxdef2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdef3s
function maxdef3s_load_all(id) {
    if (id == undefined)
        id = "preset/maxdef3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид maxdefally1
function maxdefally1_load_all(id) {
    if (id == undefined)
        id = "preset/maxdefally1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdefally2
function maxdefally2_load_all(id) {
    if (id == undefined)
        id = "preset/maxdefally2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид maxdefally1s
function maxdefally1s_load_all(id) {
    if (id == undefined)
        id = "preset/maxdefally1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид maxdefally2s
function maxdefally2s_load_all(id) {
    if (id == undefined)
        id = "preset/maxdefally2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид terr1
function terr1_load_all(id) {
    if (id == undefined)
        id = "preset/terr1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид terr2
function terr2_load_all(id) {
    if (id == undefined)
        id = "preset/terr2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид terr3
function terr3_load_all(id) {
    if (id == undefined)
        id = "preset/terr3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид terr1s
function terr1s_load_all(id) {
    if (id == undefined)
        id = "preset/terr1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид terr2s
function terr2s_load_all(id) {
    if (id == undefined)
        id = "preset/terr2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид terr3s
function terr3s_load_all(id) {
    if (id == undefined)
        id = "preset/terr3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид herospeed1
function herospeed1_load_all(id) {
    if (id == undefined)
        id = "preset/herospeed1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид herospeed2
function herospeed2_load_all(id) {
    if (id == undefined)
        id = "preset/herospeed2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид herospeed3
function herospeed3_load_all(id) {
    if (id == undefined)
        id = "preset/herospeed3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид herospeed1s
function herospeed1s_load_all(id) {
    if (id == undefined)
        id = "preset/herospeed1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид herospeed2s
function herospeed2s_load_all(id) {
    if (id == undefined)
        id = "preset/herospeed2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид herospeed3s
function herospeed3s_load_all(id) {
    if (id == undefined)
        id = "preset/herospeed3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид magdefense1
function magdefense1_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense2
function magdefense2_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense3
function magdefense3_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense4
function magdefense4_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense5
function magdefense5_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид magdefense1s
function magdefense1s_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense2s
function magdefense2s_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense3s
function magdefense3s_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense4s
function magdefense4s_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид magdefense5s
function magdefense5s_load_all(id) {
    if (id == undefined)
        id = "preset/magdefense5s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp1
function heoexp1_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp2
function heoexp2_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp3
function heoexp3_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp4
function heoexp4_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp5
function heoexp5_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp5";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид heoexp1s
function heoexp1s_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp2s
function heoexp2s_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp3s
function heoexp3s_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp4s
function heoexp4s_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид heoexp5s
function heoexp5s_load_all(id) {
    if (id == undefined)
        id = "preset/heoexp5s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak1
function enemweak1_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak2
function enemweak2_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak3
function enemweak3_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak4
function enemweak4_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak1s
function enemweak1s_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak2s
function enemweak2s_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak3s
function enemweak3s_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemweak4s
function enemweak4s_load_all(id) {
    if (id == undefined)
        id = "preset/enemweak4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef1
function enemdef1_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef2
function enemdef2_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef3
function enemdef3_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef4
function enemdef4_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид enemdef1s
function enemdef1s_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef2s
function enemdef2s_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef3s
function enemdef3s_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemdef4s
function enemdef4s_load_all(id) {
    if (id == undefined)
        id = "preset/enemdef4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}


//загрузка для ид enemhealth1
function enemhealth1_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemhealth2
function enemhealth2_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemhealth3
function enemhealth3_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemhealth4
function enemhealth4_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth4";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}



//загрузка для ид enemhealth1s
function enemhealth1s_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemhealth2s
function enemhealth2s_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemhealth3s
function enemhealth3s_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemhealth4s
function enemhealth4s_load_all(id) {
    if (id == undefined)
        id = "preset/enemhealth4s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemmaxdef1
function enemmaxdef1_load_all(id) {
    if (id == undefined)
        id = "preset/enemmaxdef1";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemmaxdef2
function enemmaxdef2_load_all(id) {
    if (id == undefined)
        id = "preset/enemmaxdef2";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид enemmaxdef3
function enemmaxdef3_load_all(id) {
    if (id == undefined)
        id = "preset/enemmaxdef3";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemmaxdef1s
function enemmaxdef1s_load_all(id) {
    if (id == undefined)
        id = "preset/enemmaxdef1s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}

//загрузка для ид enemmaxdef2s
function enemmaxdef2s_load_all(id) {
    if (id == undefined)
        id = "preset/enemmaxdef2s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}
//загрузка для ид enemmaxdef3s
function enemmaxdef3s_load_all(id) {
    if (id == undefined)
        id = "preset/enemmaxdef3s";
    if (id < 10)
        return false;
    $.post('load-game.php', {
        id: id
    },
        Success);
}




/*КОНЕЦ ЗАГРУЗОК ДЛЯ ПРЕСЕТОВ*/

function setHero(i, setHoroes) {
    heroes[i].rewrite(setHoroes);
    if (unitu[i].hero) {
        heroes[i].hero_true(true, i);
    }
    else {
        //чистим все поля для героя
        var zhalost = heroes[i].magick[118];
        heroes[i].cleen();
        heroes[i].magick[118] = zhalost;
        heroes[i].hero_true(false, i);
    }
    heroes[i].hide_all_dress();
}



function Success(data) {
    if (data == '') {
        alert('Это сохранение удалено по истечению срока годности. \n \n Если Вы загружали пресет, то разработчик еще не добавил его на сервер, поскольку у него нет информации о количестве армии в этом владении.');
    }
    //из json
    var all3 = JSON.parse(data);
    spes = all3.other[0];
    max_z = all3.other[1];
    teretory = all3.other[2];
    limit_b = all3.other[3];
    lvl_mb_1 = all3.other[4];
    lvl_mb_2 = all3.other[5];
    lvl_bb_1 = all3.other[6];
    lvl_bb_2 = all3.other[7];
    kol_vo_yb = all3.other[8];

    victory = all3.other[9];
    type_raz_ = all3.other[10];
    $("#type_doing").val(type_raz_);
    num_volna = all3.other[11];
    ficha_ruinu = all3.other[12];
    othero = all3.other[13];
    if (all3.other[15] == undefined)
        all3.other[15] = false;
    kz = all3.other[15];

    if (all3.other[16] == undefined)
        all3.other[16] = [db_gate[0][1], db_gate[0][1], db_gate[0][1]];
    gate_hp = all3.other[16];
    if (all3.other[17] == undefined)
        all3.other[17] = 0;
    gate_lvl = all3.other[17];
    if (all3.other[18] == undefined)
        all3.other[18] = [false, false, false];
    flags_gate = all3.other[18];
    if (flags_gate[num_volna] && kz) {
        document.getElementById("gate_add").style.display = 'none';
        document.getElementById("gate").style.display = 'inline-block';
    }
    else {
        document.getElementById("gate_add").style.display = 'inline-block';
        document.getElementById("gate").style.display = 'none';
    }
    $("#hp_gate").val(gate_hp[num_volna]);

    checkShowOrHideKZ();

    if (all3.other[14] == undefined) {
        go_back = [0, 0, 0, 0, 0];
    }
    else {
        go_back = all3.other[14];
    }


    if (all3.other[19] != undefined) {
        hero_vkl = all3.other[19];

        for (var u = 0; u < 3; u++) {
            for (var p = 0; p < 3; p++) {
                hero_voln[u][p].rewrite(all3.other[20][u][p]);
            }
        }

    }

    if (all3.other[21] != undefined) {
        type_server = all3.other[21];
    }
    else {
        type_server = 1;
    }


    if (all3.other[22] != null) {
        skill_ost_mech = all3.other[22];
    }
    else {
        skill_ost_mech = [0,0,0,0,0,0,0];
    }

    if (all3.other[23] != null) {
        skill_presledovanie_assasina = all3.other[23];
    }
    else {
        skill_presledovanie_assasina = [0,0,0,0,0,0,0];
    }

    if (all3.other[24] != null) {
        skill_hp_mamonta = all3.other[24];
    }
    else {
        skill_hp_mamonta = [0,0,0,0,0,0,0];
    }

    if (all3.other[25] != null) {
        skill_kam_bronya = all3.other[25];
    }
    else {
        skill_kam_bronya = [0,0,0,0,0,0,0];
    }


    $('.type_server input[type=radio]').removeAttr('checked');
    $('#servak-' + type_server).attr('checked', 'checked');
    miniFun();

    //выствляем номер волны  
    document.getElementById("b1").style.background = "#FFFFFF";
    document.getElementById("b2").style.background = "#FFFFFF";
    document.getElementById("b3").style.background = "#FFFFFF";
    document.getElementById("b" + (num_volna + 1)).style.background = "#66FFFF";

    //растановка данных и шмоток как при save
    for (var m = 0; m < 7; m++) {
        //скрываем дивы с октивными заклнаниями внизу
        for (var ms = 0; ms < 160; ms++) {
            document.getElementById("pas_do_magick_" + m + "_" + ms).style.display = 'none';
        }

        unitu[m].rewrite(all3.unitu[m]);
        unitu[m].input_true();
        //растановка рас вклюая руины
        unitu[m].change_type(true);
        unitu[m].otst_true();//не пашет
        unitu[m].checked_true();
        setHero(m, all3.heroes[m]);
        //      heroes[m].rewrite(all3.heroes[m]);
        //      if(unitu[m].hero){
        //          heroes[m].hero_true(true,m);
        //      }
        //      else{
        //          //чистим все поля для героя
        //          var zhalost = heroes[m].magick[118];
        //          heroes[m].cleen();
        //          heroes[m].magick[118] = zhalost;
        //          heroes[m].hero_true(false,m);
        //      }
        //      heroes[m].hide_all_dress();

    }
    if (heroes[2].magick[118]) {
        document.getElementById("magic_on_hero_2").style.display = 'inline-block';
    } else {
        document.getElementById("do_magick_2_118").style.display = 'none';
    }

    //закрыть открыть дивы
    unitu[6].div_true();
    unitu[1].div_true();
    unitu[5].div_true();
    unitu[4].div_true();
    unitu[3].div_true();



    //герой включен ли
    //фон
    $("#armor_content_left").removeClass().addClass('terr_' + teretory);

    //ОТКЛ ГЕРОЯ!!!!!!!!!!!!

    //башень
    if (limit_b) {
        if (limit_b == 1) { //если только одна башня
            if (lvl_mb_1 > -1) { //если магическая
                document.getElementById('mb_add').style.display = 'none';
                document.getElementById('bb_add').style.display = 'inline-block';
                document.getElementById('mb1').style.display = 'inline-block';
                document.getElementById('mb2').style.display = 'none';
                document.getElementById('bb1').style.display = 'none';
                document.getElementById('bb2').style.display = 'none';
            }
            else { //если простая
                document.getElementById('mb_add').style.display = 'inline-block';
                document.getElementById('bb_add').style.display = 'none';
                document.getElementById('mb1').style.display = 'none';
                document.getElementById('mb2').style.display = 'none';
                document.getElementById('bb1').style.display = 'inline-block';
                document.getElementById('bb2').style.display = 'none';
            }
        }
        else {//если две башни
            if (lvl_mb_1 > -1 && lvl_mb_2 > -1) {//две магические                    
                document.getElementById('bb1').style.display = 'none';
                document.getElementById('bb2').style.display = 'none';
                document.getElementById('bb_add').style.display = 'none';
                document.getElementById('mb_add').style.display = 'none';
                document.getElementById('mb1').style.display = 'inline-block';
                document.getElementById('mb2').style.display = 'inline-block';
                document.getElementById('plas_mb1').style.display = 'none';
                //document.getElementById('plas_mb2').style.display = 'none';
                document.getElementById('del_mb1').style.display = 'none';
                document.getElementById('del_mb2').style.display = 'inline-block';
            }
            else {
                if (lvl_mb_1 > -1) { //по одной каждого типа                                   
                    document.getElementById('bb2').style.display = 'none';
                    document.getElementById('mb2').style.display = 'none';
                    document.getElementById('bb_add').style.display = 'none';
                    document.getElementById('mb_add').style.display = 'none';
                    document.getElementById('mb1').style.display = 'inline-block';
                    document.getElementById('bb1').style.display = 'inline-block';
                    document.getElementById('plas_mb1').style.display = 'none';
                    document.getElementById('plas_bb1').style.display = 'none';
                    document.getElementById('del_mb1').style.display = 'inline-block';
                    document.getElementById('del_bb1').style.display = 'inline-block';
                }
                else { //две простые башни  
                    document.getElementById('mb1').style.display = 'none';
                    document.getElementById('mb2').style.display = 'none';
                    document.getElementById('mb_add').style.display = 'none';
                    document.getElementById('bb_add').style.display = 'none';
                    document.getElementById('bb1').style.display = 'inline-block';
                    document.getElementById('bb2').style.display = 'inline-block';
                    document.getElementById('plas_bb1').style.display = 'none';
                    //document.getElementById('plas_bb2').style.display = 'none';
                    document.getElementById('del_bb1').style.display = 'none';
                    document.getElementById('del_bb2').style.display = 'inline-block';
                }
            }
        }
    }
    else {
        document.getElementById('mb_add').style.display = 'inline-block';
        document.getElementById('bb_add').style.display = 'inline-block';
        document.getElementById('mb1').style.display = 'none';
        document.getElementById('mb2').style.display = 'none';
        document.getElementById('bb1').style.display = 'none';
        document.getElementById('bb2').style.display = 'none';
    }
    //ставим соответствующие картинки на башни

    lvl_mb_1 > -1 ? $("#mb1_img").html(lvl_mb_1 + 1) : $("#mb1_img").html(1);
    lvl_mb_2 > -1 ? $("#mb2_img").html(lvl_mb_2 + 1) : $("#mb2_img").html(1);
    lvl_bb_1 > -1 ? $("#bb1_img").html(lvl_bb_1 + 1) : $("#bb1_img").html(1);
    lvl_bb_2 > -1 ? $("#bb2_img").html(lvl_bb_2 + 1) : $("#bb2_img").html(1);
    //        document.getElementById("mb1_img").src = do_name_b("M",lvl_mb_1>-1?lvl_mb_1:0);
    //        document.getElementById("mb2_img").src = do_name_b("M",lvl_mb_2>-1?lvl_mb_2:0);
    //        document.getElementById("bb1_img").src = do_name_b("B",lvl_bb_1>-1?lvl_bb_1:0);
    //        document.getElementById("bb2_img").src = do_name_b("B",lvl_bb_2>-1?lvl_bb_2:0);
    //укрепления
    var sm, ik;
    for (ik = 0, sm = 0; ik < 8; ik++) {
        sm += kol_vo_yb[ik];
        document.getElementById('_Y' + ik).value = kol_vo_yb[ik];
    }
    if (sm) {
        yb_add();
    }
    else {
        yb_delete();
    }

    document.getElementById("ter").selectedIndex = teretory;
    $("#mz").attr("checked", max_z);
    $("#oz").attr("checked", othero);
    $("#kz").attr("checked", kz);
    spec_change(spes);

}



//функция расчитывает все бонусы у юнитов всехв войск
function kalk_bonusu() {
    i = 0;
    var arrayHideMagick = [4, 9, 33, 36, 38, 41, 50, 51, 52, 64, 73, 75, 118];
    var gamerList = [15, 29, 56, 77, 88];
    do {
        if (!unitu[i].bul_v_boy) {
            i++;
            continue;
        }
       
/*
Как работает бонус территорий ??
db_teretory[teretory][1] - это номер массива с территорией - по стандарту священная земля , тобишь 1, как указано в скобке [1]
unitu[i].type - это номер выбранной рассы

  db_teretory[teretory][1] == 3 && unitu[i].type == 5 - это костыль, для добавления защиты к рассе нежить с террайна проклятые леса

ЕСЛИ  номер территории = номеру рассы ИЛИ номер территории = 3 (проклятые леса) И номер рассы = 5(нежить) И нет отступа то выполняем код
*/
//alert("Выводим ID территории, если ее поменять " + db_teretory[teretory][1])
        //стандартные бонусы тереторий
        if (db_teretory[teretory][1] == unitu[i].type && !unitu[i].red || db_teretory[teretory][1] == 3 && unitu[i].type == 5  && !unitu[i].red || db_teretory[teretory][1] == 1 && unitu[i].type == 6  && !unitu[i].red) {

            j = 0;
            do {
    unitu[i].bonusu[j] += 25;
        
      j++;
    } while (j < 8);
               
        }

        if (teretory > 3) {
            unitu[i].bonusu[8 + db_teretory[teretory][3]] += db_teretory[teretory][2];
            unitu[i].bonusu[8 + db_teretory[teretory][5]] += db_teretory[teretory][4];
        }

        //формируем бонус от комплекта одежды
        heroes[i].all_dress();



        
        //проверка на включеность героя
        unitu[i].do_her();
        if (unitu[i].hero) {
            //нестандартные бонусы(шмотки и заклятия, свитки.)
            j = heroes[i].efects.length - 1;
            do {
                if (heroes[i].efects[j] > -1) { //есть ли бонус
                    var effectId = heroes[i].efects[j];
                    var bonusTarget = -1;
                    if (db_bonuses[effectId] != undefined) {
                        bonusTarget = db_bonuses[effectId][39];
                    } else if (typeof window.MLKalkGetCustomEffectTarget === "function") {
                        bonusTarget = window.MLKalkGetCustomEffectTarget(effectId);
                    }
                    if (bonusTarget < 0) {
                        j--;
                        continue;
                    }
                    //проверка кому надо прибавить бонус
                    switch (bonusTarget) {
                        case 0: { //себе
                            unitu[i].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[i].type_vrag);
                            break;
                        }
                        case 1: { //другу
                            if (unitu[i].number < 2 || unitu[i].number == 6) {
                                if (unitu[i].number == 1) {
                                    unitu[0].plus_bonus(heroes[i].efects[j], unitu[0].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(heroes[i].efects[j], unitu[6].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 0) {
                                        unitu[1].plus_bonus(heroes[i].efects[j], unitu[1].type, unitu[i].type_vrag);
                                        unitu[6].plus_bonus(heroes[i].efects[j], unitu[6].type, unitu[i].type_vrag);
                                    }
                                    else {
                                        unitu[1].plus_bonus(heroes[i].efects[j], unitu[1].type, unitu[i].type_vrag);
                                        unitu[0].plus_bonus(heroes[i].efects[j], unitu[0].type, unitu[i].type_vrag);
                                    }
                            }
                            else {
                                if (unitu[i].number == 2) {
                                    unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 3) {
                                        unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[i].type_vrag);
                                        unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[i].type_vrag);
                                        unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[i].type_vrag);
                                    }
                                    else
                                        if (unitu[i].number == 4) {
                                            unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[i].type_vrag);
                                            unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[i].type_vrag);
                                            unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[i].type_vrag);
                                        }
                                        else
                                            if (unitu[i].number == 5) {
                                                unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[i].type_vrag);
                                                unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[i].type_vrag);
                                                unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[i].type_vrag);
                                            }
                            }
                            break;
                        }
                        case 2: { //врагу
                            if (unitu[i].number > 1 && unitu[i].number < 6) {
                                unitu[0].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[0].type);
                                unitu[1].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[1].type);
                                unitu[6].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[6].type);
                            }
                            else {
                                unitu[2].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[2].type);
                                unitu[3].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[3].type);
                                unitu[4].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[4].type);
                                unitu[5].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[5].type);
                            }
                            break;
                        }
                        case 3: {
                            unitu[0].plus_bonus(heroes[i].efects[j], unitu[0].type, unitu[0].type_vrag);
                            unitu[1].plus_bonus(heroes[i].efects[j], unitu[1].type, unitu[1].type_vrag);
                            unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[2].type_vrag);
                            unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[3].type_vrag);
                            unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[4].type_vrag);
                            unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[5].type_vrag);
                            unitu[6].plus_bonus(heroes[i].efects[j], unitu[6].type, unitu[6].type_vrag);
                            break;
                        }
                        case 4: { //себе и союзнику
                            unitu[i].plus_bonus(heroes[i].efects[j], unitu[i].type, unitu[i].type_vrag);
                            if (unitu[i].number < 2 || unitu[i].number == 6) {
                                if (unitu[i].number == 1) {
                                    unitu[0].plus_bonus(heroes[i].efects[j], unitu[0].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(heroes[i].efects[j], unitu[6].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 0) {
                                        unitu[1].plus_bonus(heroes[i].efects[j], unitu[1].type, unitu[i].type_vrag);
                                        unitu[6].plus_bonus(heroes[i].efects[j], unitu[6].type, unitu[i].type_vrag);
                                    }
                                    else {
                                        unitu[1].plus_bonus(heroes[i].efects[j], unitu[1].type, unitu[i].type_vrag);
                                        unitu[0].plus_bonus(heroes[i].efects[j], unitu[0].type, unitu[i].type_vrag);
                                    }
                                if (1014 == heroes[i].efects[j]) {
                                    unitu[2].plus_bonus(1016, unitu[2].type, unitu[i].type_vrag);
                                    unitu[3].plus_bonus(1016, unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(1016, unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(1016, unitu[5].type, unitu[i].type_vrag);
                                }
                                if (1197 == heroes[i].efects[j]) {
                                    unitu[2].plus_bonus(1199, unitu[2].type, unitu[i].type_vrag);
                                    unitu[3].plus_bonus(1199, unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(1199, unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(1199, unitu[5].type, unitu[i].type_vrag);
                                }
                            }
                            else {
                                if (unitu[i].number == 2) {
                                    unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 3) {
                                        unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[i].type_vrag);
                                        unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[i].type_vrag);
                                        unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[i].type_vrag);
                                    }
                                    else
                                        if (unitu[i].number == 4) {
                                            unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[i].type_vrag);
                                            unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[i].type_vrag);
                                            unitu[5].plus_bonus(heroes[i].efects[j], unitu[5].type, unitu[i].type_vrag);
                                        }
                                        else
                                            if (unitu[i].number == 5) {
                                                unitu[2].plus_bonus(heroes[i].efects[j], unitu[2].type, unitu[i].type_vrag);
                                                unitu[3].plus_bonus(heroes[i].efects[j], unitu[3].type, unitu[i].type_vrag);
                                                unitu[4].plus_bonus(heroes[i].efects[j], unitu[4].type, unitu[i].type_vrag);
                                            }

                                if (1014 == heroes[i].efects[j]) {
                                    unitu[0].plus_bonus(1016, unitu[0].type, unitu[i].type_vrag);
                                    unitu[1].plus_bonus(1016, unitu[1].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(1016, unitu[6].type, unitu[i].type_vrag);
                                }
                                if (1197 == heroes[i].efects[j]) {
                                    unitu[0].plus_bonus(1199, unitu[0].type, unitu[i].type_vrag);
                                    unitu[1].plus_bonus(1199, unitu[1].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(1199, unitu[6].type, unitu[i].type_vrag);
                                }
                            }

                            break;
                        }
                    }
                }
                j--;
            } while (j + 1);


            //бонусы от наложеных заклинаний
            j = heroes[i].magick.length - 1;
            do {
                if (heroes[i].magick[j]) { //есть ли бонус
                    //проверка кому надо прибавить бонус
                    switch (db_bonuses[db_magick[j][heroes[i].magick[j]][0]][39]) {
                        case 0: { //себе
                            unitu[i].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[i].type_vrag);
                            break;
                        }
                        case 1: { //другу
                            if (unitu[i].number < 2 || unitu[i].number == 6) {
                                if (unitu[i].number == 1) {
                                    unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 0) {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                    }
                                    else {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    }
                            }
                            else {
                                if (unitu[i].number == 2) {
                                    unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 3) {
                                        unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                        unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                        unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                    }
                                    else
                                        if (unitu[i].number == 4) {
                                            unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                            unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                            unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                        }
                                        else
                                            if (unitu[i].number == 5) {
                                                unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                                unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                                unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                            }
                            }
                            break;
                        }
                        case 2: { //врагу
                            if (unitu[i].number > 1 && unitu[i].number < 6) {
                                unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[0].type);
                                unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[1].type);
                                unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[6].type);
                            }
                            else {
                                unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[2].type);
                                unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[3].type);
                                unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[4].type);
                                unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[5].type);
                            }
                            break;
                        }
                        case 3: { //всем
                            unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[0].type_vrag);
                            unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[1].type_vrag);
                            unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[2].type_vrag);
                            unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[3].type_vrag);
                            unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[4].type_vrag);
                            unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[5].type_vrag);
                            unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[6].type_vrag);
                            break;
                        }
                        case 4: { //себе и союзнику
                            unitu[i].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[i].type_vrag);
                            if (unitu[i].number < 2 || unitu[i].number == 6) {
                                if (unitu[i].number == 1) {
                                    unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 0) {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                    }
                                    else {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    }
                            }
                            else {
                                if (unitu[i].number == 2) {
                                    unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 3) {
                                        unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                        unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                        unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                    }
                                    else
                                        if (unitu[i].number == 4) {
                                            unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                            unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                            unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                        }
                                        else
                                            if (unitu[i].number == 5) {
                                                unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                                unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                                unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                            }
                            }

                            break;
                        }
                    }
                }
                j--;
            } while (j + 1);

            //бонусы от пасивных скилов
            j = 0;
            do {
                if (j > 7 && heroes[i].monster_type > 0 && heroes[i].class_hero == 3) {
                    if (heroes[i].skils[j] > 0 && !db_skils_hero[0][0][j - 3][heroes[i].skils[j]][2]) {
                        xyx = db_skils_hero[0][0][j - 3][heroes[i].skils[j]][1];
                        help_skils_add(xyx, i);
                    }
                }
                else
                    if ((j == 7 || j == 6) && heroes[i].monster_type == 2 && heroes[i].class_hero == 3) {
                        if (heroes[i].skils[j] > 0 && !db_skils_hero[0][1][j - 3][heroes[i].skils[j]][2]) {
                            xyx = db_skils_hero[0][1][j - 3][heroes[i].skils[j]][1];
                            help_skils_add(xyx, i);
                        }
                    }
                    else {
                        if (heroes[i].skils[j] > 0 && !db_skils_hero[heroes[i].class_hero][heroes[i].profession][j][heroes[i].skils[j]][2]) {
                            xyx = db_skils_hero[heroes[i].class_hero][heroes[i].profession][j][heroes[i].skils[j]][1];
                            help_skils_add(xyx, i);
                        }
                    }

                j++;
            } while (j < 10);
            if (heroes[i].class_hero != 3) {
                if (heroes[i].profession2 != -1)
                    do {
                        if (heroes[i].skils[j] > 0 && !db_skils_hero[heroes[i].class_hero][heroes[i].profession2][j - 7][heroes[i].skils[j]][2]) {
                            xyx = db_skils_hero[heroes[i].class_hero][heroes[i].profession2][j - 7][heroes[i].skils[j]][1];
                            help_skils_add(xyx, i);
                        }
                        j++;
                    } while (j < 17);
                if (heroes[i].profession3 != -1) do {
                    if (heroes[i].skils[j] > 0 && !db_skils_hero[heroes[i].class_hero][heroes[i].profession3][j - 14][heroes[i].skils[j]][2]) {
                        xyx = db_skils_hero[heroes[i].class_hero][heroes[i].profession3][j - 14][heroes[i].skils[j]][1];
                        help_skils_add(xyx, i);
                    }
                    j++;
                } while (j < 24);
            }

            //бонусы от алхимии вещей;
            //    щиты +3% к атаке
            if (heroes[i].dress_alximick[8]) {
                unitu[i].plus_bonus(877 + db_lvl_dress[heroes[i].dress[8]], unitu[i].type, unitu[i].type_vrag);
            }
                        //    Магические башни -3% 
                        if (heroes[i].dress_alximick[9] ) {
                            unitu[2].plus_bonus(1636 + db_lvl_dress[heroes[i].dress[9]], unitu[i].type, unitu[i].type_vrag);
                        }
            //Поножи защита +3
            if (heroes[i].dress_alximick[10]) {
                unitu[i].plus_bonus(1630 + db_lvl_dress[heroes[i].dress[10]], unitu[i].type, unitu[i].type_vrag);
            }

            //    кольца +5% к урону магически башень
            if (heroes[i].dress_alximick[2] && i == 2) {
                unitu[i].plus_bonus(882 + db_lvl_dress[heroes[i].dress[2]], unitu[i].type, unitu[i].type_vrag);
            }
            //
            //    шлем +25% к урону  башень
            if (heroes[i].dress_alximick[0] && i == 2) {
                unitu[i].plus_bonus(902 + db_lvl_dress[heroes[i].dress[0]], unitu[i].type, unitu[i].type_vrag);
            }


            //    сумка опыт в бою против монстров
            if (heroes[i].dress_alximick[7]) {
                unitu[i].plus_bonus(907 + db_lvl_dress[heroes[i].dress[7]], unitu[i].type, unitu[i].type_vrag);
            }
            //
            //    доспехи +3% жизны
            if (heroes[i].dress_alximick[4]) {
                unitu[i].plus_bonus(887 + db_lvl_dress[heroes[i].dress[4]], unitu[i].type, unitu[i].type_vrag);
                if (i == 2) {
                    //+бонусы от укреплений
                    unitu[i].plus_bonus(912 + db_lvl_dress[heroes[i].dress[4]], unitu[i].type, unitu[i].type_vrag)
                }
            }
            //
            //    мечи -3%  урон наймы и +1максисальной защиты;
            if (heroes[i].dress_alximick[3]) {
                // +дэф
                unitu[i].plus_bonus(892 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[i].type_vrag);

                //врагу
                if (i > 1 && i < 6) {
                    unitu[0].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[0].type);
                    unitu[1].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[1].type);
                    unitu[6].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[6].type);
                }
                else {
                    unitu[2].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[2].type);
                    unitu[3].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[3].type);
                    unitu[4].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[4].type);
                    unitu[5].plus_bonus(897 + db_lvl_dress[heroes[i].dress[3]], unitu[i].type, unitu[5].type);
                }

            }

        }
        else {
            j = heroes[i].magick.length - 1;
            do {
                if (heroes[i].magick[j] && (gamerList.indexOf(j) != -1 || arrayHideMagick.indexOf(j) && i == 2)
                ) { //есть ли бонус
                    //проверка кому надо прибавить бонус
                    switch (db_bonuses[db_magick[j][heroes[i].magick[j]][0]][39]) {
                        case 0: { //себе
                            unitu[i].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[i].type_vrag);
                            break;
                        }
                        case 1: { //другу
                            if (unitu[i].number < 2 || unitu[i].number == 6) {
                                if (unitu[i].number == 1) {
                                    unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 0) {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                    }
                                    else {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    }
                            }
                            else {
                                if (unitu[i].number == 2) {
                                    unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 3) {
                                        unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                        unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                        unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                    }
                                    else
                                        if (unitu[i].number == 4) {
                                            unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                            unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                            unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                        }
                                        else
                                            if (unitu[i].number == 5) {
                                                unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                                unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                                unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                            }
                            }
                            break;
                        }
                        case 2: { //врагу
                            if (unitu[i].number > 1 && unitu[i].number < 6) {
                                unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[0].type);
                                unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[1].type);
                                unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[6].type);
                            }
                            else {
                                unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[2].type);
                                unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[3].type);
                                unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[4].type);
                                unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[5].type);
                            }
                            break;
                        }
                        case 3: { //всем
                            unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[0].type_vrag);
                            unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[1].type_vrag);
                            unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[2].type_vrag);
                            unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[3].type_vrag);
                            unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[4].type_vrag);
                            unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[5].type_vrag);
                            unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[6].type_vrag);
                            break;
                        }
                        case 4: { //себе и союзнику
                            unitu[i].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[i].type, unitu[i].type_vrag);
                            if (unitu[i].number < 2 || unitu[i].number == 6) {
                                if (unitu[i].number == 1) {
                                    unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 0) {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[6].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[6].type, unitu[i].type_vrag);
                                    }
                                    else {
                                        unitu[1].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[1].type, unitu[i].type_vrag);
                                        unitu[0].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[0].type, unitu[i].type_vrag);
                                    }
                            }
                            else {
                                if (unitu[i].number == 2) {
                                    unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                    unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                    unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                }
                                else
                                    if (unitu[i].number == 3) {
                                        unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                        unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                        unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                    }
                                    else
                                        if (unitu[i].number == 4) {
                                            unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                            unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                            unitu[5].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[5].type, unitu[i].type_vrag);
                                        }
                                        else
                                            if (unitu[i].number == 5) {
                                                unitu[2].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[2].type, unitu[i].type_vrag);
                                                unitu[3].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[3].type, unitu[i].type_vrag);
                                                unitu[4].plus_bonus(db_magick[j][heroes[i].magick[j]][0], unitu[4].type, unitu[i].type_vrag);
                                            }
                            }

                            break;
                        }
                    }
                }
                j--;
            } while (j + 1);
        }


        //db_shtandart
        for (var eps = 0; eps < 11; eps++) {
            if (unitu[i].shtandart[eps]) {
                if (eps == 10) {
                    continue;
                }
                //todo:определить кому плюсовать враг друг всем
                if (eps == 5) {
                    //врагу
                    if (i > 1 && i < 6) {
                        unitu[0].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[0].type);
                        unitu[1].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[1].type);
                        unitu[6].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[6].type);
                    }
                    else {
                        unitu[2].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[2].type);
                        unitu[3].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[3].type);
                        unitu[4].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[4].type);
                        unitu[5].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[5].type);
                    }
                }
                else {
                    unitu[i].plus_bonus(db_shtandart[eps] + (unitu[i].shtandart[eps] - 1), unitu[i].type, unitu[i].type_vrag);
                }
            }
        }



        //произвольный созданный бонус
        unitu[i].plus_bonus(unitu[i].create_bonus, unitu[i].type, unitu[i].type_vrag);
        var tmpBonus = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var new_tere = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var new_unitu_red_minus_defender = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var new_tere_volshebnick = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var new_unitu_red_minus_defender_volshebnick = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];

        var komplekt_elf = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var komplekt_elf_1 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var komplekt_elf_6 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var komplekt_elf_2 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var komplekt_elf_3 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var komplekt_elf_4 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var komplekt_elf_5 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        

       /* Бонусы от полкана */
       var tmpPolkan = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
       var tmpPolkan_def_kz = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];


        //Порядковый номер = [0,1,2,3,4,5,6,7,/**/8,9,10,11,12,13,14,15,/**/16,17,18,19,20,21,22,23,/**/24,25,26,27,28,29,30,31,32,33,34,35,36,-1,-1,39,/**/40,41,42,43,/**/0,-1,-1,0,0,0,0,0];
        var tmpBonusSouz = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        var tmpBonusVrag = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
        for (var m = 0; m < 8; m++) {
            tmpBonus[m] = unitu[i].create_bonus_no_standart[1];
            tmpBonus[8 + m] = unitu[i].create_bonus_no_standart[0];
            tmpBonus[16 + m] = unitu[i].create_bonus_no_standart[2];


            tmpBonusVrag[m] = unitu[i].create_bonus_no_standart_vrag[2];
            tmpBonusVrag[8 + m] = unitu[i].create_bonus_no_standart_vrag[0];
            tmpBonusVrag[16 + m] = unitu[i].create_bonus_no_standart_vrag[1];
        }
        for (var m = 0; m < 4; m++) {
            tmpBonus[40 + m] = unitu[i].create_bonus_no_standart[3];
        }

       /* ТЕСТИРОВАЛ РАБОТАЕТ ЛИ НОМЕР КОМПЛЕКТА if (db_lvl_dress[heroes[i].dress[3]] != undefined)
       {
        lv = db_lvl_dress[heroes[i].dress[3]];
        alert(lv)
       }*/
       
/* Принцип такой в массиве skill_ost_mech - индексы 0,1,6 - свои, 2-5 враг */ 


/* Атака ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 3 - ПРАВАЯ РУКА ДЛЯ МЕЧА */

if (heroes[i].dress[3] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[3] == 48 || heroes[i].dress[3] == 47 || heroes[i].dress[3] == 46 || heroes[i].dress[3] == 32 || heroes[i].dress[3] == 29)  // прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[3]];
           var numberValue = unitu[i].number;

           //атака всех произвольный
               for (var m = 0; m < 8; m++)
               {
                   tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
               }
                   /* TODO остановился на моменте, когда надо вписывать все мечи , смог найти номера комплектов */
       }

       /* Проверки для поиска одного типа войск */
                    /* Воины */

                    if (heroes[i].dress[3] == 6 || heroes[i].dress[3] == 14 || heroes[i].dress[3] == 41)  // прибавляем бонусы на атаку действующие на своих Виинов , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[9] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }           
                    
       /* Проверки для поиска одного типа войск */
                    /* Кони */

                    if (heroes[i].dress[3] == 25)  // прибавляем бонусы на атаку действующие на своих Коней , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[10] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }

       /* Проверки для поиска одного типа войск */
                    /* Летуны */

                    if (heroes[i].dress[3] == 33)  // прибавляем бонусы на атаку действующие на своих Летающих , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[11] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }
                    
       /* Проверки для поиска одного типа войск */
                    /* Луки */

                    if (heroes[i].dress[3] == 8 || heroes[i].dress[3] == 35 || heroes[i].dress[3] == 42)  // прибавляем бонусы на атаку действующие на своих Лучников , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[12] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }

       /* Проверки для поиска одного типа войск */
                    /* Леки */

                    /* На леков нет атаки в dress[3] */

       /* Проверки для поиска одного типа войск */
                    /* Наймы */

                    if (heroes[i].dress[3] == 9)  // прибавляем бонусы на атаку действующие на своих Наймов , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[14] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }

       /* Проверки для поиска одного типа войск */
                    /* Маги */

                    if (heroes[i].dress[3] == 39 || heroes[i].dress[3] == 44)  // прибавляем бонусы на атаку действующие на своих Магов , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[15] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }

                    /* Раздали бонусы Общей атаки и атаки каждому типу юнитов */
        /* Ниже раздаем бонусы общей атаки под определенный террайн и каждому типу войск под опреденный террайн */
        /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */

        if ((heroes[i].dress[3] == 4 && teretory == 7) || (heroes[i].dress[3] == 10 && teretory == 7))  //АТАКА ВСЕХ НА СТЕПИ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                //bons =  db_skils_hero[4][0][3][1][1]; 
                //lvl_arts = db_dress[48][3][3];
                lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                var numberValue = unitu[i].number;

                 //атака всех произвольный
                for (var m = 0; m < 8; m++)
                {
                   tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
                }
                 
            }
            if (heroes[i].dress[3] == 5 && teretory == 4)  //АТАКА ВСЕХ НА ГОРАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                var numberValue = unitu[i].number;

                 //атака всех произвольный
                for (var m = 0; m < 8; m++)
                {
                   tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
                }
                 
            }
            if (heroes[i].dress[3] == 7 && teretory == 5)  //АТАКА ВСЕХ НА Пустыне - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                var numberValue = unitu[i].number;

                 //атака всех произвольный
                for (var m = 0; m < 8; m++)
                {
                   tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
                }
                 
            }

            if (heroes[i].dress[3] == 2 && teretory == 6)  //АТАКА ЛУЧНИКОВ НА ЛЕСАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                var numberValue = unitu[i].number;

                 //атака всех произвольный
                   tmpPolkan[12] += skill_ost_mech[numberValue] * lvl_arts;
                 
            }


            if (heroes[i].dress[3] == 21 && teretory == 8)  //АТАКА ВСЕХ ВОЙСК В ПОДЗЕМЕЛЬЕ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                var numberValue = unitu[i].number;

                 //атака всех произвольный
                 for (var m = 0; m < 8; m++)
                 {
                    tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                   
                 }
                 
            }

            /* othero true/false - арты на озеро в dress[3] */

            if (heroes[i].dress[3] == 18 && othero == true)  //БОЙ В СОЛЕНОМ ОЗЕРЕ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                var numberValue = unitu[i].number;

                 //атака всех произвольный
                for (var m = 0; m < 8; m++)
                {
                   tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
                }
                 
            }
       
           /* Против вражеской фракции */
           if (heroes[i].dress[3] == 28)  //БОЙ ПРОТИВ ВРАЖЕСКОЙ ФРАКЦИИ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
           {
                if (this_number < 2 || this_number == 6) {
                    if (this_type != unitu[2].type && (
                        
                        (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                        (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {

                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                            var numberValue = unitu[i].number;
                 
                            //атака всех произвольный
                                for (var m = 0; m < 8; m++)
                                {
                                    tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                                   
                                }
                        }
                        else {
    
                                /* Бонус не добавляем??  */
                        }
                }
                else {
                    if (this_type != unitu[0].type && (
                        (this_type == 0 && (unitu[0].type != 1 && unitu[0].type != 4)) ||
                        (this_type == 1 && (unitu[0].type != 0 && unitu[0].type != 4)) ||
                        (this_type == 2 && (unitu[0].type != 3 && unitu[0].type !=5 && unitu[0].type != 4)) ||
                        (this_type == 3 && (unitu[0].type != 2 && unitu[0].type !=5 && unitu[0].type != 4)) ||
                        (this_type == 5 && (unitu[0].type != 2 && unitu[0].type !=3 && unitu[0].type != 4)))) {

                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                            var numberValue = unitu[i].number;
                 
                            //атака всех произвольный
                                for (var m = 0; m < 8; m++)
                                {
                                    tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                                   
                                }
                    }
                    else {

                            /* Бонус не добавляем??  */
                    }
                }
                
            }

            
            /* Бонус атаки против расы монстры */

            if (heroes[i].dress[3] == 11  || heroes[i].dress[3] == 36 )  //АТАКА ВСЕХ ПРОТИВ МОНСТРОВ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                if (unitu[2].type == 4) // Проверяем, какая раса у главного защитника и потом уже даем бонус к атаке, если гл.защитник монстр
                {
                    bons = 0;
                    lvl_arts = 0;
                    lvl_arts = db_lvl_dress[heroes[i].dress[3]];
                    var numberValue = unitu[i].number;

                    //атака всех произвольный
                    for (var m = 0; m < 8; m++)
                    {
                    tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
                    }
                }
                 
            }

    }


    if (heroes[i].dress[7] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
                    if (heroes[i].dress[7] == 11)  // прибавляем бонусы на атаку действующие на своих Летающих , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[7]];
                        var numberValue = unitu[i].number;
                        
                        //атака
                                tmpPolkan[11] += skill_ost_mech[numberValue] * lvl_arts;
                               
                    }
}


    /* Атака ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 9 - НАРУЧИ */
    if (heroes[i].dress[9] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[9] == 45 || heroes[i].dress[9] == 46 || heroes[i].dress[9] == 22 || heroes[i].dress[9] == 30 || heroes[i].dress[9] == 41 || heroes[i].dress[9] == 48)  // прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[9]];
           var numberValue = unitu[i].number;

           //атака всех произвольный
               for (var m = 0; m < 8; m++)
               {
                   tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
               }
                   /* TODO остановился на моменте, когда надо вписывать все мечи , смог найти номера комплектов */
       }
       
       /* Проверки для поиска одного типа войск */
                    /* Воины */
                    if (heroes[i].dress[9] == 14)  // прибавляем бонусы на атаку действующие на своих Воинов , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
             
                        //атака всех произвольный

                                tmpPolkan[9] += skill_ost_mech[numberValue] * lvl_arts;

                    }
                    /* Кони */
                    if (heroes[i].dress[9] == 25)  // прибавляем бонусы на атаку действующие на своих Всадников , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
             
                        //атака всех произвольный
                        
                                tmpPolkan[10] += skill_ost_mech[numberValue] * lvl_arts;

                    }
                    /* Летуны */
                    if (heroes[i].dress[9] == 5 || heroes[i].dress[9] == 33)  // прибавляем бонусы на атаку действующие на своих Летающих , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
             
                        //атака всех произвольный
                        
                                tmpPolkan[11] += skill_ost_mech[numberValue] * lvl_arts;

                    }
                    /* Луки */
                    if (heroes[i].dress[9] == 8 || heroes[i].dress[9] ==  42)  // прибавляем бонусы на атаку действующие на своих Лучников , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
             
                        //атака всех произвольный
                        
                                tmpPolkan[12] += skill_ost_mech[numberValue] * lvl_arts;

                    }
                    /* Наймы */
                    if (heroes[i].dress[9] == 1 || heroes[i].dress[9] ==  9)  // прибавляем бонусы на атаку действующие на своих Наемников , включая арты на союзника
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
             
                        //атака всех произвольный
                        
                                tmpPolkan[14] += skill_ost_mech[numberValue] * lvl_arts;

                    }

                    /* Бонус к АТАКЕ от территорий - ТОЛЬКО ЛУКАМ */

                    if (heroes[i].dress[9] == 2 && teretory == 6)  //АТАКА ЛУЧНИКОВ НА ЛЕСАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
        
                           tmpPolkan[12] += skill_ost_mech[numberValue] * lvl_arts;
                          
                         
                    }


                        /* Против вражеской фракции */
           if (heroes[i].dress[9] == 43)  //БОЙ ПРОТИВ ВРАЖЕСКОЙ ФРАКЦИИ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
           {
                if (this_number < 2 || this_number == 6) {
                    if (this_type != unitu[2].type && (
                        
                        (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                        (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {

                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                            var numberValue = unitu[i].number;
                 
                            //атака всех произвольный
                                for (var m = 0; m < 8; m++)
                                {
                                    tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                                   
                                }
                        }
                        else {
    
                                /* Бонус не добавляем??  */
                        }
                }
                else {
                    if (this_type != unitu[0].type && (
                        (this_type == 0 && (unitu[0].type != 1 && unitu[0].type != 4)) ||
                        (this_type == 1 && (unitu[0].type != 0 && unitu[0].type != 4)) ||
                        (this_type == 2 && (unitu[0].type != 3 && unitu[0].type !=5 && unitu[0].type != 4)) ||
                        (this_type == 3 && (unitu[0].type != 2 && unitu[0].type !=5 && unitu[0].type != 4)) ||
                        (this_type == 5 && (unitu[0].type != 2 && unitu[0].type !=3 && unitu[0].type != 4)))) {

                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                            var numberValue = unitu[i].number;
                 
                            //атака всех произвольный
                                for (var m = 0; m < 8; m++)
                                {
                                    tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                                   
                                }
                    }
                    else {

                            /* Бонус не добавляем??  */
                    }
                }
                
            }

            /* Бонус к атаки при защите КЗ  */

            if (heroes[i].dress[9] == 23 && kz == true)  //АТАКА ВСЕХ ПРОТИВ МОНСТРОВ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                    bons = 0;
                    lvl_arts = 0;
                    lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                    var numberValue = unitu[i].number;

                    //атака всех произвольный
                    for (var m = 0; m < 8; m++)
                    {
                    tmpPolkan_def_kz[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
                  
                    }
            }

    }
    
    /* Атака ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 1 - ШЕЯ */
    if (heroes[i].dress[1] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
            /* В шее нет никаких бонусов увеличивающих атаку, только на наймов */

        if (heroes[i].dress[1] == 28)  // прибавляем бонусы на атаку действующие на своих Наймов , включая арты на союзника
        {
            bons = 0;
            lvl_arts = 0;
            lvl_arts = db_lvl_dress[heroes[i].dress[1]];
            var numberValue = unitu[i].number;
            
            //атака
                    tmpPolkan[14] += skill_ost_mech[numberValue] * lvl_arts;
                   
        }
      
    }

    /* Атака ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 0 - ГОЛОВА */
    if (heroes[i].dress[0] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
            /* В шлеме нет больше нет бонусов увеличивающих атаку, только маска дракона */

        if (heroes[i].dress[0] == 48)  // прибавляем бонусы на атаку действующие на своих Наймов , включая арты на союзника
        {
            bons = 0;
            lvl_arts = 0;
            lvl_arts = db_lvl_dress[heroes[i].dress[0]];
            var numberValue = unitu[i].number;
            
            //атака
            for (var m = 0; m < 8; m++)
            {
                tmpPolkan[8 + m] += skill_ost_mech[numberValue] * lvl_arts;
               
            }
                   
        }
      
    }


    /* ВСЁ, ПАРАМЕТРЫ АТАКИ ДОПИСАНЫ ПОЛНОСТЬ.. НАРУЧ ЭЛЬФА И АРТ ВЛАСТЕЛИНА МИРА (АРБАЛЕТ) - ПОД ВОПРОСОМ,не вписывал. */


    
/* Преследование ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 3 - ПРАВАЯ РУКА ДЛЯ МЕЧА */

if (heroes[i].dress[3] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[3] == 22 || heroes[i].dress[3] == 43 || heroes[i].dress[3] == 46)  // прибавляем бонусы на Преследование действующие на себя и прибавляем бонусы от артов Преследование действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[3]];
           var numberValue = unitu[i].number;

           //преследование всех 
                for (var m = 0; m < 4; m++) 
                {
                    tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                }
       }
                
    }


    if (heroes[i].dress[7] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {

            /* Преследование для стрелков */
                    if (heroes[i].dress[7] == 8 )  // прибавляем бонусы на преследование действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[7]];
                        var numberValue = unitu[i].number;

                        //ПРЕСЛЕДОВАНИе

                             tmpPolkan[43] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                           

                                
                    }

}

        /* В Мечах больше нет бонусов преследований, ниже перехожу к наручам */
/* Атака ПРЕСЛЕДОВАТЕЛЕЙ ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 9 - НАРУЧИ */
    if (heroes[i].dress[9] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[9] == 46 )  // прибавляем бонусы на преследование действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[9]];
           var numberValue = unitu[i].number;

           //ПРЕСЛЕДОВАНИе
               for (var m = 0; m < 4; m++) 
               {
                    tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                  
               }
                 
       }
        /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
            /* Преследование для стрелков */
                    if (heroes[i].dress[9] == 35 )  // прибавляем бонусы на преследование действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;

                        //ПРЕСЛЕДОВАНИе

                             tmpPolkan[43] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                           

                                
                    }

                        /* Преследование для всех на стрепи */
                    if ((heroes[i].dress[9] == 4 && teretory == 7) || (heroes[i].dress[9] == 10 && teretory == 7))  //АТАКА ВСЕХ НА СТЕПИ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
                    {
                        bons = 0;
                        lvl_arts = 0;
                        lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                        var numberValue = unitu[i].number;
        
                         //атака всех произвольный
                         for (var m = 0; m < 4; m++) 
                         {
                             tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                         }
                         
                    }    
    
                        /* Преследование для всех в пустыне */
                        if (heroes[i].dress[9] == 6 && teretory == 5)  //АТАКА ВСЕХ НА ПУСТЫНЕ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
                        {
                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                            var numberValue = unitu[i].number;
            
                             //атака всех произвольный
                             for (var m = 0; m < 4; m++) 
                             {
                                 tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                             }
                             
                        } 

                        if (heroes[i].dress[9] == 18  && othero == true)  // прибавляем бонусы на преследование в озере действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
                        {
                            bons = 0;
                            lvl_arts = 0;

                            lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                            var numberValue = unitu[i].number;
                 
                            //ПРЕСЛЕДОВАНИе
                                for (var m = 0; m < 4; m++) 
                                {
                                     tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                                   
                                }
                                  
                        }
                        if (heroes[i].dress[9] == 28)  //БОЙ ПРОТИВ ВРАЖЕСКОЙ ФРАКЦИИ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
                        {
                             if (this_number < 2 || this_number == 6) {
                                 if (this_type != unitu[2].type && (
                                     
                                    (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                                    (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                                    (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                                    (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                                    (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                                    (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {
             
                                         bons = 0;
                                         lvl_arts = 0;
                                         lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                                         var numberValue = unitu[i].number;
                              
                                        //ПРЕСЛЕДОВАНИе
                                        for (var m = 0; m < 4; m++) 
                                        {
                                            tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                                        
                                        }
                                     }
                                     else {
                 
                                             /* Бонус не добавляем??  */
                                     }
                             }
                             else {
                                 if (this_type != unitu[0].type && (
                                     (this_type == 0 && (unitu[0].type != 1 && unitu[0].type != 4)) ||
                                     (this_type == 1 && (unitu[0].type != 0 && unitu[0].type != 4)) ||
                                     (this_type == 2 && (unitu[0].type != 3 && unitu[0].type !=5 && unitu[0].type != 4)) ||
                                     (this_type == 3 && (unitu[0].type != 2 && unitu[0].type !=5 && unitu[0].type != 4)) ||
                                     (this_type == 5 && (unitu[0].type != 2 && unitu[0].type !=3 && unitu[0].type != 4)))) {
             
                                         bons = 0;
                                         lvl_arts = 0;
                                         lvl_arts = db_lvl_dress[heroes[i].dress[9]];
                                         var numberValue = unitu[i].number;
                              
                                        //ПРЕСЛЕДОВАНИе
                                        for (var m = 0; m < 4; m++) 
                                        {
                                            tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                                        
                                        }
                                 }
                                 else {
             
                                         /* Бонус не добавляем??  */
                                 }
                                }
                        }

    }
 /* Атака  ПРЕСЛЕДОВ  ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 2 - КОЛЬЦО */
 if (heroes[i].dress[2] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
 {
             /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
         /* Преследование всех в лесу */
         if (heroes[i].dress[2] == 2 && teretory == 6 )  // прибавляем бонусы на преследование действующие в ЛЕСУ на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
         {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[2]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 4; m++) 
             {
                 tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
             
             }
                

                     
         }

             /* Преследование для всех на горах */
         if (heroes[i].dress[2] == 5 && teretory == 4)  //АТАКА ВСЕХ НА ГОРАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
         {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[2]];
             var numberValue = unitu[i].number;

              //атака всех произвольный
              for (var m = 0; m < 4; m++) 
              {
                  tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
              }
              
         }    


             /* Преследование для всех против монстров */
         if (heroes[i].dress[2] == 11 && unitu[2].type == 4)  //АТАКА ВСЕХ НА ГОРАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
         {
             
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[2]];
             var numberValue = unitu[i].number;

              //атака всех произвольный
              for (var m = 0; m < 4; m++) 
              {
                  tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
              }
              
         }
        }


 /* Атака ПРЕСЛЕДОВ ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 1  - ШЕЯ */
 if (heroes[i].dress[1] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
 {
             /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
         
             /* Преследование всех  */
         if (heroes[i].dress[1] == 32)  // прибавляем бонусы на преследование действующие в ЛЕСУ на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
         {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[1]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 4; m++) 
             {
                 tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
             
             }
                                 
         }
             /* Преследование воинов  */
             if (heroes[i].dress[1] == 14)  // прибавляем бонусы на преследование действующие в ЛЕСУ на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
             {
                 bons = 0;
                 lvl_arts = 0;
                 lvl_arts = db_lvl_dress[heroes[i].dress[1]];
                 var numberValue = unitu[i].number;
    
                 //ПРЕСЛЕДОВАНИе
                     tmpPolkan[40] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                                                     
             }    
             
             /* Преследование коней  */
             if (heroes[i].dress[1] == 25)  // прибавляем бонусы на преследование действующие в ЛЕСУ на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
             {
                 bons = 0;
                 lvl_arts = 0;
                 lvl_arts = db_lvl_dress[heroes[i].dress[1]];
                 var numberValue = unitu[i].number;
    
                 //ПРЕСЛЕДОВАНИе
                     tmpPolkan[41] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                                                     
             }            

             /* Преследование летунов  */
             if (heroes[i].dress[1] == 33)  // прибавляем бонусы на преследование действующие в ЛЕСУ на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
             {
                 bons = 0;
                 lvl_arts = 0;
                 lvl_arts = db_lvl_dress[heroes[i].dress[1]];
                 var numberValue = unitu[i].number;
    
                 //ПРЕСЛЕДОВАНИе
                     tmpPolkan[42] += skill_presledovanie_assasina[numberValue] * lvl_arts;
                                                     
             }   
    }



 /* Атака  ПРЕСЛЕДОВ ВСЕХ ТИПОВ войск ПРИ УСЛОВИИ ЧТО АРТ НАХОДИТСЯ В DRESS 8  - ЩИТ */
 if (heroes[i].dress[8] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
 {
             /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
         
             /* Преследование всех  */
         if (heroes[i].dress[8] == 9)  // прибавляем бонусы на преследование действующие в ЛЕСУ на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
         {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[8]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 4; m++) 
             {
                 tmpPolkan[40 + m] += skill_presledovanie_assasina[numberValue] * lvl_arts;
             
             }
                                 
         }
 }

       
    /* ЗДОРОВЬЕ ВОЙСК */

 if (heroes[i].dress[4] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
 {
    if (heroes[i].dress[4] == 15 || heroes[i].dress[4] == 16 || heroes[i].dress[4] == 20  || heroes[i].dress[4] == 22  || heroes[i].dress[4] == 30  || heroes[i].dress[4] == 34  || heroes[i].dress[4] == 40  || heroes[i].dress[4] == 41  || heroes[i].dress[4] == 42  || heroes[i].dress[4] == 45  || heroes[i].dress[4] == 46  || heroes[i].dress[4] == 47  || heroes[i].dress[4] == 48)  // прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
    {
        bons = 0;
        lvl_arts = 0;
        lvl_arts = db_lvl_dress[heroes[i].dress[4]];
        var numberValue = unitu[i].number;

        //здоровье всех произвольный
            for (var m = 0; m < 8; m++)
            {
                tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
               
            }
                
    }



                 /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
         /* Преследование всех в степи */
         if ((heroes[i].dress[4] == 4 && teretory == 7) || (heroes[i].dress[4] == 10 && teretory == 7))  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;


             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
             
             }
                

                     
         }

         /* Преследование всех в лесу */
         if (heroes[i].dress[4] == 2 && teretory == 6)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;


             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
             
             }                 
         }

         /* Преследование всех в пустыне */
         if (heroes[i].dress[4] == 7 && teretory == 5)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
             
             }                 
         }


         /* Преследование всех в пустыне */
         if (heroes[i].dress[4] == 5 && teretory == 4)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;


             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
             
             }                 
         }

         /* Преследование всех в подземелье */
         if (heroes[i].dress[4] == 21 && teretory == 8)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;


             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
             
             }                 
         }

         /* ХП носов */
         if (heroes[i].dress[4] == 31)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[16] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }

                  /* ХП воинов */
                  if (heroes[i].dress[4] == 6  || heroes[i].dress[4] == 14)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[17] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }
                  /* ХП коней */
                  if (heroes[i].dress[4] == 25)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[18] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }
                  /* ХП летунов */
                  if (heroes[i].dress[4] == 33)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[19] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }

                  /* ХП луков */
                  if (heroes[i].dress[4] == 8 || heroes[i].dress[4] == 25)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[20] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }
                  /* ХП леков */
                  if (heroes[i].dress[4] == 26)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[21] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }

                  /* ХП леков */
                  if (heroes[i].dress[4] == 39 || heroes[i].dress[4] == 44)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

                 tmpPolkan[23] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }

                  /* ХП воинов коней летунов луков */
                  if (heroes[i].dress[4] == 43)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[4]];
             var numberValue = unitu[i].number;

             for (var m = 0; m < 4; m++) 
             {
                 tmpPolkan[17 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
             
             }          
         }

            /* Бонус к здоровью при защите КЗ  */

            if (heroes[i].dress[4] == 23 && kz == true)  //ЗДОРОВЬЕ ВСЕХ ПРОТИВ МОНСТРОВ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                    bons = 0;
                    lvl_arts = 0;
                    lvl_arts = db_lvl_dress[heroes[i].dress[4]];
                    var numberValue = unitu[i].number;

                    //атака всех произвольный
                    for (var m = 0; m < 8; m++)
                    {
                    tmpPolkan_def_kz[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
                  
                    }
            }

           /* Против вражеской фракции */
           if (heroes[i].dress[4] == 28)  //БОЙ ПРОТИВ ВРАЖЕСКОЙ ФРАКЦИИ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
           {
                if (this_number < 2 || this_number == 6) {
                    if (this_type != unitu[2].type && (
                        
                        (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                        (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {
                            

                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[4]];
                            var numberValue = unitu[i].number;
                 
                            //атака всех произвольный
                                for (var m = 0; m < 8; m++)
                                {
                                    tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
                                   
                                }
                        }
                        else {
    
                                /* Бонус не добавляем??  */
                        }
                }
                else {
                    if (this_type != unitu[0].type && (
                        (this.type == 0 && (unitu[2].type != 1 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 1 && (unitu[2].type != 0 && unitu[2].type !=6 && unitu[2].type != 4)) ||
                        (this.type == 2 && (unitu[2].type != 3 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 3 && (unitu[2].type != 2 && unitu[2].type !=5 && unitu[2].type != 4)) ||
                        (this.type == 5 && (unitu[2].type != 2 && unitu[2].type !=3 && unitu[2].type != 4)) ||
                        (this.type == 6 && (unitu[2].type != 1 && unitu[2].type !=0 && unitu[2].type != 4)))) {

                            bons = 0;
                            lvl_arts = 0;
                            lvl_arts = db_lvl_dress[heroes[i].dress[4]];
                            var numberValue = unitu[i].number;
                 
                            //атака всех произвольный
                                for (var m = 0; m < 8; m++)
                                {
                                    tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
                                   
                                }
                    }
                    else {

                            /* Бонус не добавляем??  */
                    }
                }
                
            }

            /* ХП в соленом озере */
            if (heroes[i].dress[4] == 18 && othero == true)  //БОЙ В СОЛЕНОМ ОЗЕРЕ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[4]];
                var numberValue = unitu[i].number;

                for (var m = 0; m < 8; m++)
                {
                   tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
                  
                }
                 
            }


                        /* Бонус ХП против расы монстры */

                        if (heroes[i].dress[4] == 11  || heroes[i].dress[4] == 36 )  //Здоровье ВСЕХ ПРОТИВ МОНСТРОВ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
                        {
                            if (unitu[2].type == 4) // Проверяем, какая раса у главного защитника и потом уже даем бонус к атаке, если гл.защитник монстр
                            {
                                bons = 0;
                                lvl_arts = 0;
                                lvl_arts = db_lvl_dress[heroes[i].dress[4]];
                                var numberValue = unitu[i].number;
            

                                for (var m = 0; m < 8; m++)
                                {
                                tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
                              
                                }
                            }
                             
                        }

 }



 if (heroes[i].dress[10] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
 {
    if (heroes[i].dress[10] == 47 || heroes[i].dress[10] == 48)  // прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
    {
        bons = 0;
        lvl_arts = 0;
        lvl_arts = db_lvl_dress[heroes[i].dress[10]];
        var numberValue = unitu[i].number;

        //здоровье всех произвольный
            for (var m = 0; m < 8; m++)
            {
                tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
               
            }
                
    }

         /* ХП носов */
         if (heroes[i].dress[10] == 22)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[10]];
             var numberValue = unitu[i].number;

                 tmpPolkan[16] += skill_hp_mamonta[numberValue] * lvl_arts;           
         }

                    /* ХП летунов */
                    if (heroes[i].dress[10] == 5)  // 
                    {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[10]];
                var numberValue = unitu[i].number;

                    tmpPolkan[19] += skill_hp_mamonta[numberValue] * lvl_arts;           
            }

                    /* ХП луков */
                    if (heroes[i].dress[10] == 42)  // 
                    {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[10]];
                var numberValue = unitu[i].number;

                    tmpPolkan[20] += skill_hp_mamonta[numberValue] * lvl_arts;           
            }

                              /* ХП воинов коней летунов луков */
                              if (heroes[i].dress[10] == 16)  // 
                              {
                         bons = 0;
                         lvl_arts = 0;
                         lvl_arts = db_lvl_dress[heroes[i].dress[10]];
                         var numberValue = unitu[i].number;
            
                         for (var m = 0; m < 4; m++) 
                         {
                             tmpPolkan[17 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
                         
                         }          
                     }

}


if (heroes[i].dress[6] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
 {
    if (heroes[i].dress[6] == 15 || heroes[i].dress[6] == 48 || heroes[i].dress[6] == 47)  // прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
    {
        bons = 0;
        lvl_arts = 0;
        lvl_arts = db_lvl_dress[heroes[i].dress[6]];
        var numberValue = unitu[i].number;

        //здоровье всех произвольный
            for (var m = 0; m < 8; m++)
            {
                tmpPolkan[16 + m] += skill_hp_mamonta[numberValue] * lvl_arts;
               
            }
                
    }

}





    /* Защита ВСЕХ ТИПОВ */
    if (heroes[i].dress[0] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[0] == 48)  // прибавляем бонусы на защиту действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[0]];
           var numberValue = unitu[i].number;

           //атака всех произвольный
               for (var m = 0; m < 8; m++)
               {
                   tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
                  
               }
       }

/* луки */
       if (heroes[i].dress[0] == 8)  // прибавляем бонусы на защиту действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[0]];
           var numberValue = unitu[i].number;

                   tmpPolkan[4] += skill_kam_bronya[numberValue] * lvl_arts;
                  
       }


            /* Бонус к здоровью при защите КЗ  */

            if (heroes[i].dress[0] == 23 && kz == true)  //ЗДОРОВЬЕ ВСЕХ ПРОТИВ МОНСТРОВ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                    bons = 0;
                    lvl_arts = 0;
                    lvl_arts = db_lvl_dress[heroes[i].dress[0]];
                    var numberValue = unitu[i].number;

                    //атака всех произвольный
                    for (var m = 0; m < 8; m++)
                    {
                    tmpPolkan_def_kz[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
                  
                    }
            }

                              /* ЗАЩИТА воинов коней летунов луков */
                              if (heroes[i].dress[0] == 16)  // 
                              {
                         bons = 0;
                         lvl_arts = 0;
                         lvl_arts = db_lvl_dress[heroes[i].dress[0]];
                         var numberValue = unitu[i].number;
            
                         for (var m = 0; m < 4; m++) 
                         {
                             tmpPolkan[1 + m] += skill_kam_bronya[numberValue] * lvl_arts;
                         
                         }          
                     }

    }


    /* Защита ТОЛЬКО ЛУКОВ В КОЛЬЦЕ */
    if (heroes[i].dress[2] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[2] == 35)  // прибавляем бонусы на защиту действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[2]];
           var numberValue = unitu[i].number;

           tmpPolkan[4] += skill_kam_bronya[numberValue] * lvl_arts;
       }
    }




    /* Защита в поножах */
    if (heroes[i].dress[10] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {
       if (heroes[i].dress[10] == 45)  // прибавляем бонусы на защиту действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[10]];
           var numberValue = unitu[i].number;

           for (var m = 0; m < 8; m++) 
           {
               tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
           
           }  
       }

       /* защита магов */ 
       if (heroes[i].dress[10] == 39)  // прибавляем бонусы на защиту действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются
       {
           bons = 0;
           lvl_arts = 0;
           lvl_arts = db_lvl_dress[heroes[i].dress[10]];
           var numberValue = unitu[i].number;

               tmpPolkan[7] += skill_kam_bronya[numberValue] * lvl_arts;

       }


       /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
         /* Преследование всех в степи */
         if (heroes[i].dress[10] == 2 && teretory == 6)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[10]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
             
             }
                     
         }

         /* Носы */
         if (heroes[i].dress[10] == 31)  // 
         {
    bons = 0;
    lvl_arts = 0;
    lvl_arts = db_lvl_dress[heroes[i].dress[10]];
    var numberValue = unitu[i].number;

        tmpPolkan[0] += skill_kam_bronya[numberValue] * lvl_arts;
 
}

    /* луки */

    if (heroes[i].dress[10] == 42)  // 
    {
bons = 0;
lvl_arts = 0;
lvl_arts = db_lvl_dress[heroes[i].dress[10]];
var numberValue = unitu[i].number;

   tmpPolkan[4] += skill_kam_bronya[numberValue] * lvl_arts;

}

    }


    /* Защита в поножах */
    if (heroes[i].dress[11] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {


        if (heroes[i].dress[11] == 48)  //ЗАЩИТА - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
        {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[11]];
                var numberValue = unitu[i].number;

                //атака всех произвольный
                for (var m = 0; m < 8; m++)
                {
                tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
              
                }
        }


            /* Бонус к защите при защите КЗ  */

            if (heroes[i].dress[11] == 41 && kz == true)  //ЗАЩИТА при защите в кз - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
            {
                    bons = 0;
                    lvl_arts = 0;
                    lvl_arts = db_lvl_dress[heroes[i].dress[11]];
                    var numberValue = unitu[i].number;

                    //атака всех произвольный
                    for (var m = 0; m < 8; m++)
                    {
                    tmpPolkan_def_kz[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
                  
                    }
            }


    }





    /* Защита в щите */
    if (heroes[i].dress[8] != -1 && heroes[i].class_hero == 4) // Проверяем не пуста ли ячейка и на наличие полководца
    {


        if (heroes[i].dress[8] == 4 || heroes[i].dress[8] == 16 || heroes[i].dress[8] == 29 || heroes[i].dress[8] == 30 || heroes[i].dress[8] == 31 || heroes[i].dress[8] == 34 || heroes[i].dress[8] == 41 || heroes[i].dress[8] == 42 || heroes[i].dress[8] == 46 || heroes[i].dress[8] == 47 || heroes[i].dress[8] == 48)  //ЗАЩИТА - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
        {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                var numberValue = unitu[i].number;

                //защита всех произвольный
                for (var m = 0; m < 8; m++)
                {
                tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
              
                }
        }

       /* Cвящ.земля 0 | Мертвая земля 1 | Волшебные леса 2 | Проклятые леса 3 |  Горы 4 |  Пустыня 5 |  Леса 6 |  Степь 7 |  Подземелье 8 */
         /* Преследование всех в степи */
         if (heroes[i].dress[8] == 10 && teretory == 7)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[8]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
             
             }
                     
         }

         /* пустыня */
         if (heroes[i].dress[8] == 7 && teretory == 5)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[8]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
             
             }
                     
         }

            /* горы */
         if (heroes[i].dress[8] == 5 && teretory == 4)  // 
                  {
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[8]];
             var numberValue = unitu[i].number;

             //ПРЕСЛЕДОВАНИе

             for (var m = 0; m < 8; m++) 
             {
                 tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
             
             }
                     
         }


                /* воинов */
                if (heroes[i].dress[8] == 14)  // 
                {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                var numberValue = unitu[i].number;

                tmpPolkan[1] += skill_kam_bronya[numberValue] * lvl_arts;
                
                }

                /* коней */
                if (heroes[i].dress[8] == 15)  // 
                {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                var numberValue = unitu[i].number;

                tmpPolkan[2] += skill_kam_bronya[numberValue] * lvl_arts;
                
                }

                /* летунов */
                if (heroes[i].dress[8] == 33)  // 
                {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                var numberValue = unitu[i].number;

                tmpPolkan[3] += skill_kam_bronya[numberValue] * lvl_arts;
                
                }

                /* леков */
                if (heroes[i].dress[8] == 26)  // 
                {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                var numberValue = unitu[i].number;

                tmpPolkan[5] += skill_kam_bronya[numberValue] * lvl_arts;
                
                }


                /* магов */
                if (heroes[i].dress[8] == 44)  // 
                {
                bons = 0;
                lvl_arts = 0;
                lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                var numberValue = unitu[i].number;

                tmpPolkan[7] += skill_kam_bronya[numberValue] * lvl_arts;
                
                }

                /* Защита для всех в подземелье */
         if (heroes[i].dress[8] == 21 && teretory ==  4)  //АТАКА ВСЕХ НА ГОРАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
         {
             
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[8]];
             var numberValue = unitu[i].number;

              //атака всех произвольный
              for (var m = 0; m < 8; m++) 
              {
                  tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
              }
              
         }
        

                             /* Защита для всех против монстров */
         if ((heroes[i].dress[8] == 11 && unitu[2].type == 4) || (heroes[i].dress[8] == 36 && unitu[2].type == 4))  //АТАКА ВСЕХ НА ГОРАХ - прибавляем бонусы на атаку действующие на себя и прибавляем бонусы от артов атаки действующие на себя и союзника , если такие имеются 
         {
             
             bons = 0;
             lvl_arts = 0;
             lvl_arts = db_lvl_dress[heroes[i].dress[8]];
             var numberValue = unitu[i].number;

              //атака всех произвольный
              for (var m = 0; m < 8; m++) 
              {
                  tmpPolkan[0 + m] += skill_kam_bronya[numberValue] * lvl_arts;
              }
              
         }


                /* ЗАЩИТА воинов коней летунов луков */
                    if (heroes[i].dress[8] == 6 || heroes[i].dress[8] == 43)  // 
                        {
                    bons = 0;
                    lvl_arts = 0;
                    lvl_arts = db_lvl_dress[heroes[i].dress[8]];
                    var numberValue = unitu[i].number;
            
                    for (var m = 0; m < 4; m++) 
                {
                    tmpPolkan[1 + m] += skill_kam_bronya[numberValue] * lvl_arts;
                         
                }          
            }         
        
    }


/*******************************************/
/**|||||||||||||||||||||||||||||||||||||||**/
/**||||||||ПОДСЧЕТ ЗАЩИТЫ У НЕЖИТИ||||||||**/
/**|||||||||||||||||||||||||||||||||||||||**/
/*******************************************/

       if ((unitu[0].type === 5 && unitu[2].type === 3)  && !unitu[i].red || 
           (unitu[1].type === 5 && unitu[2].type === 3)  && !unitu[i].red || 
           (unitu[6].type === 5 && unitu[2].type === 3 && !unitu[i].red && db_teretory[teretory][1] === 3)) {

                for (var m = 0; m < 8; m++) {
                     new_tere[0 + m] -= 25;
                }

                if (unitu[2].type === 3 && unitu[2].red){

                    /* При условии, что враг отступ, возвращаем бонус атакеру */
                    for (var m = 0; m < 8; m++) {
                        new_tere[0 + m] += 25;
                   }

                }


                if (unitu[0].type === 3 && unitu[0].red){

 
                    for (var m = 0; m < 8; m++) {
                        new_tere[0 + m] += 25;
                   }
                }
    
                if ((unitu[2].type === 5 && unitu[2].red) || (unitu[2].type === 3 && unitu[2].red)){
                        for (var m = 0; m < 8; m++) {
                        new_unitu_red_minus_defender[0 + m] -= 25;
                   }
                    }
                    else
                    {
                        /* Возвращаем массив в исходное состояние */ 
                        new_unitu_red_minus_defender = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
                    }

                
            }



/*******************************************/
/**|||||||||||||||||||||||||||||||||||||||**/
/**||||||||ПОДСЧЕТ ЗАЩИТЫ У ВОЛШЕБНИКОВ||||||||**/
/**|||||||||||||||||||||||||||||||||||||||**/
/*******************************************/

       if ((unitu[0].type === 6 && unitu[2].type === 1)  && !unitu[i].red || 
       (unitu[1].type === 6 && unitu[2].type === 1)  && !unitu[i].red || 
       (unitu[6].type === 6 && unitu[2].type === 1 && !unitu[i].red && db_teretory[teretory][1] === 1)) {

            for (var m = 0; m < 8; m++) {
                 new_tere_volshebnick[0 + m] -= 25;
            }

            if (unitu[2].type === 1 && unitu[2].red){

                /* При условии, что враг отступ, возвращаем бонус атакеру */
                for (var m = 0; m < 8; m++) {
                    new_tere_volshebnick[0 + m] += 25;
               }

            }


            if (unitu[0].type === 1 && unitu[0].red){


                for (var m = 0; m < 8; m++) {
                    new_tere_volshebnick[0 + m] += 25;
               }
            }

            if ((unitu[2].type === 6 && unitu[2].red) || (unitu[2].type === 1 && unitu[2].red)){
                    for (var m = 0; m < 8; m++) {
                    new_unitu_red_minus_defender_volshebnick[0 + m] -= 25;
               }
                }
                else
                {
                    /* Возвращаем массив в исходное состояние */ 
                    new_unitu_red_minus_defender_volshebnick = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
                }

            
        }

        

    

    if (unitu[0].hero == true)
    { // реализовать проверку
    if (komplekt47 == 3) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf[16 + m] = 10;
            komplekt_elf[34] = 100;
            
       }
    } else if (komplekt47 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf[16 + m] = 15;
            komplekt_elf[34] = 150;
       }
    } else if (komplekt47 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf[16 + m] = 20;
            komplekt_elf[34] = 200;
       }
    } else if (komplekt47 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf[16 + m] = 15;
            komplekt_elf[34] = 250;
       }
    } else if (komplekt47 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf[16 + m] = 30;
            komplekt_elf[34] = 300;
       }
    } else if (komplekt47 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf[16 + m] = 40;
            komplekt_elf[34] = 400;
       }        } else {
        
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}


if (unitu[1].hero == true)
{ // реализовать проверку
if (komplekt47_1 == 3) {
    for (var m = 0; m < 8; m++) {
        komplekt_elf_1[16 + m] = 10;
        komplekt_elf_1[34] = 100;
   }

    } else if (komplekt47_1 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_1[16 + m] = 15;
            komplekt_elf_1[34] = 150;
       }
    } else if (komplekt47_1 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_1[16 + m] = 20;
            komplekt_elf_1[34] = 200;
       }
    } else if (komplekt47_1 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_1[16 + m] = 15;
            komplekt_elf_1[34] = 250;
       }
    } else if (komplekt47_1 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_1[16 + m] = 30;
            komplekt_elf_1[34] = 300;
       }
    } else if (komplekt47_1 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_1[16 + m] = 40;
            komplekt_elf_1[34] = 400;
       }        } else {
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf_1 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}


if (unitu[6].hero == true)
{ // реализовать проверку

if (komplekt47_6 == 3) {

    for (var m = 0; m < 8; m++) {
        komplekt_elf_6[16 + m] = 10;
        komplekt_elf_6[34] = 100;
   }

    } else if (komplekt47_6 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_6[16 + m] = 15;
            komplekt_elf_6[34] = 150;
       }
    } else if (komplekt47_6 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_6[16 + m] = 20;
            komplekt_elf_6[34] = 200;
       }
    } else if (komplekt47_6 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_6[16 + m] = 15;
            komplekt_elf_6[34] = 250;
       }
    } else if (komplekt47_6 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_6[16 + m] = 30;
            komplekt_elf_6[34] = 300;
       }
    } else if (komplekt47_6 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_6[16 + m] = 40;
            komplekt_elf_6[34] = 400;
       }        } else {
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf_6 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}


if (unitu[2].hero == true)
{ // реализовать проверку

if (komplekt47_2 == 3) {

    for (var m = 0; m < 8; m++) {
        komplekt_elf_2[16 + m] = 10;
        komplekt_elf_2[34] = 100;
   }

    } else if (komplekt47_2 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_2[16 + m] = 15;
            komplekt_elf_2[34] = 150;
       }
    } else if (komplekt47_2 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_2[16 + m] = 20;
            komplekt_elf_2[34] = 200;
       }
    } else if (komplekt47_2 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_2[16 + m] = 15;
            komplekt_elf_2[34] = 250;
       }
    } else if (komplekt47_2 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_2[16 + m] = 30;
            komplekt_elf_2[34] = 300;
       }
    } else if (komplekt47_2 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_2[16 + m] = 40;
            komplekt_elf_2[34] = 400;
       }        } else {
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf_2 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}


if (unitu[3].hero == true)
{ // реализовать проверку

if (komplekt47_3 == 3) {

    for (var m = 0; m < 8; m++) {
        komplekt_elf_3[16 + m] = 10;
        komplekt_elf_3[34] = 100;
   }

    } else if (komplekt47_3 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_3[16 + m] = 15;
            komplekt_elf_3[34] = 150;
       }
    } else if (komplekt47_3 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_3[16 + m] = 20;
            komplekt_elf_3[34] = 200;
       }
    } else if (komplekt47_3 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_3[16 + m] = 15;
            komplekt_elf_3[34] = 250;
       }
    } else if (komplekt47_3 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_3[16 + m] = 30;
            komplekt_elf_3[34] = 300;
       }
    } else if (komplekt47_3 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_3[16 + m] = 40;
            komplekt_elf_3[34] = 400;
       }        } else {
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf_3 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}


if (unitu[4].hero == true)
{ // реализовать проверку

if (komplekt47_4 == 3) {

    for (var m = 0; m < 8; m++) {
        komplekt_elf_4[16 + m] = 10;
        komplekt_elf_4[34] = 100;
   }

    } else if (komplekt47_4 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_4[16 + m] = 15;
            komplekt_elf_4[34] = 150;
       }
    } else if (komplekt47_4 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_4[16 + m] = 20;
            komplekt_elf_4[34] = 200;
       }
    } else if (komplekt47_4 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_4[16 + m] = 15;
            komplekt_elf_4[34] = 250;
       }
    } else if (komplekt47_4 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_4[16 + m] = 30;
            komplekt_elf_4[34] = 300;
       }
    } else if (komplekt47_4 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_4[16 + m] = 40;
            komplekt_elf_4[34] = 400;
       }        } else {
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf_4 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}


if (unitu[5].hero == true)
{ // реализовать проверку

if (komplekt47_5 == 3) {

    for (var m = 0; m < 8; m++) {
        komplekt_elf_5[16 + m] = 10;
        komplekt_elf_5[34] = 100;
   }

    } else if (komplekt47_5 == 4) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_5[16 + m] = 15;
            komplekt_elf_5[34] = 150;
       }
    } else if (komplekt47_5 == 5) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_5[16 + m] = 20;
            komplekt_elf_5[34] = 200;
       }
    } else if (komplekt47_5 == 6) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_5[16 + m] = 15;
            komplekt_elf_5[34] = 250;
       }
    } else if (komplekt47_5 == 7) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_5[16 + m] = 30;
            komplekt_elf_5[34] = 300;
       }
    } else if (komplekt47_5 == 8) {
        for (var m = 0; m < 8; m++) {
            komplekt_elf_5[16 + m] = 40;
            komplekt_elf_5[34] = 400;
       }        } else {
        /*Обнуляем бонусы, дальше работает сам комплект*/
        komplekt_elf_5 = [0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0,/**/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,/**/0, 0, 0, 0,/**/0, -1, -1, 0, 0, 0, 0, 0];
    }  
      
}




/* попробовать добавить проверка на значение переменной комплект47 и сделать бонус*/

        if (unitu[i].hero) {

            var countDress = heroes[i].dress.length;
            for (var km = 0; km < countDress; km++) {
                if (heroes[i].dress[km] != -1) {
                    //SEBE
                    //опыт +10
                    if (heroes[i].rynu[km][0][1] > 0) {
                        var tmp = 10 * heroes[i].rynu[km][0][1];
                        tmpBonus[34] += tmp;
                    }

                    //защита всех +3
                    if (heroes[i].rynu[km][0][3] > 0) {
                        var tmp = 3 * heroes[i].rynu[km][0][3];
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[m] += tmp;
                        }
                    }

                    //здоровье всех +5
                    if (heroes[i].rynu[km][0][4] > 0) {
                        var tmp = 5 * heroes[i].rynu[km][0][4];
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[16 + m] += tmp;
                        }
                    }

                    //защита всех произвольный
                    if (heroes[i].rynu[km][1][6] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[m] += heroes[i].rynu[km][1][6];
                        }
                    }

                    //здоровье всех произвольный
                    if (heroes[i].rynu[km][1][5] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[16 + m] += heroes[i].rynu[km][1][5];
                        }
                    }
                    //предел макс защиты произвольный
                    if (heroes[i].rynu[km][1][7] != 0) {
                        tmpBonus[24] += heroes[i].rynu[km][1][7];
                    }
                    //атака всех +3
                    if (heroes[i].rynu[km][0][6] > 0) {
                        var tmp = 3 * heroes[i].rynu[km][0][6];
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[8 + m] += tmp;
                        }
                    }

                    //атака всех произвольный
                    if (heroes[i].rynu[km][1][2] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[8 + m] += heroes[i].rynu[km][1][2];
                        }
                    }



                    //SEBE PROTIV MONSTROV i это не КЗ
                    if (unitu[i].type_vrag == 4 && (((i == 0 || i == 1 || i == 6) && !kz) || (i == 2 || i == 3 || i == 4 || i == 5))) {
                        //опыт +25
                        if (heroes[i].rynu[km][0][0] > 0) {
                            var tmp = 25 * heroes[i].rynu[km][0][0];
                            tmpBonus[34] += tmp;
                        }

                        //защита всех +5
                        if (heroes[i].rynu[km][0][2] > 0) {
                            var tmp = 5 * heroes[i].rynu[km][0][2];
                            for (var m = 0; m < 8; m++) {
                                tmpBonus[m] += tmp;
                            }
                        }
                        //на врага
                        //атака всех монстров -5
                        if (heroes[i].rynu[km][0][5] > 0) {
                            var tmp = -5 * heroes[i].rynu[km][0][5];
                            for (var m = 0; m < 8; m++) {
                                tmpBonusVrag[8 + m] += tmp;
                            }
                        }
                    }
                    /******************************************** СЕБЕ И СОЮЗНИКУ *************************************************************/

                    //ИНПУТ от 72
                    //защита всех произвольный
                    if (heroes[i].rynu[km][1][72] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusSouz[m] += heroes[i].rynu[km][1][72];
                        }
                    }
                    //атака всех произвольный 
                    if (heroes[i].rynu[km][1][10] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusSouz[8 + m] += heroes[i].rynu[km][1][10];
                        }
                    }
                    //здоровье всех произвольный
                    if (heroes[i].rynu[km][1][73] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusSouz[16 + m] += heroes[i].rynu[km][1][73];
                        }
                    }
                    //предел макс защиты произвольный
                    if (heroes[i].rynu[km][1][74] != 0) {
                        tmpBonusSouz[24] += heroes[i].rynu[km][1][74];
                    }
                    //Атака всех преследователей
                    if (heroes[i].rynu[km][1][75] != 0) {
                        for (var m = 0; m < 4; m++) {
                            tmpBonusSouz[40 + m] += heroes[i].rynu[km][1][75];
                        }
                    }
                    //Атака войнам
                    if (heroes[i].rynu[km][1][76] != 0) {
                        tmpBonusSouz[9] += heroes[i].rynu[km][1][76];
                    }
                    //Атака всадников
                    if (heroes[i].rynu[km][1][77] != 0) {
                        tmpBonusSouz[10] += heroes[i].rynu[km][1][77];
                    }
                    //Атака Летающих
                    if (heroes[i].rynu[km][1][78] != 0) {
                        tmpBonusSouz[11] += heroes[i].rynu[km][1][78];
                    }
                    //Атака Лучников
                    if (heroes[i].rynu[km][1][79] != 0) {
                        tmpBonusSouz[12] += heroes[i].rynu[km][1][79];
                    }

                    //здоровье Носильщиков
                    if (heroes[i].rynu[km][1][80] != 0) {
                        tmpBonusSouz[16] += heroes[i].rynu[km][1][80];
                    }
                    //% Воскрешения  целителей
                    if (heroes[i].rynu[km][1][81] != 0) {

                        tmpBonusSouz[25] += heroes[i].rynu[km][1][81];

                    }
                    //% Опыт героем в бою
                    if (heroes[i].rynu[km][1][82] != 0) {

                        tmpBonusSouz[34] += heroes[i].rynu[km][1][82];

                    }
                    //Подавление дамага магами
                    if (heroes[i].rynu[km][1][83] != 0) {

                        tmpBonusSouz[29] += heroes[i].rynu[km][1][83];

                    }
                    /*----------------------------------------------------------------------------------------------------------------------*/

                    //Атака всех своих преследователей
                    if (heroes[i].rynu[km][1][11] != 0) {
                        for (var m = 0; m < 4; m++) {
                            tmpBonus[40 + m] += heroes[i].rynu[km][1][11];
                        }
                    }

                    //атака всех произвольный
                    if (heroes[i].rynu[km][1][12] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[8 + m] += heroes[i].rynu[km][1][12];
                        }
                    }

                    //здоровье всех произвольный
                    if (heroes[i].rynu[km][1][15] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[16 + m] += heroes[i].rynu[km][1][15];
                        }
                    }

                    //защита всех произвольный
                    if (heroes[i].rynu[km][1][16] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonus[m] += heroes[i].rynu[km][1][16];
                        }
                    }

                    //предел макс защиты произвольный
                    if (heroes[i].rynu[km][1][17] != 0) {
                        tmpBonus[24] += heroes[i].rynu[km][1][17];
                    }

                    //Защита Всадникам, коням, летающим, лукам
                    if (heroes[i].rynu[km][1][18] != 0) {
                        for (var m = 0; m < 4; m++) {
                            tmpBonus[1 + m] += heroes[i].rynu[km][1][18];
                        }
                    }

                    //% Воскрешения своих целителей
                    if (heroes[i].rynu[km][1][19] != 0) {

                        tmpBonus[25] += heroes[i].rynu[km][1][19];

                    }

                    //% Опыт героем в бою
                    if (heroes[i].rynu[km][1][21] != 0) {

                        tmpBonus[34] += heroes[i].rynu[km][1][21];

                    }



                    //Атака своих преследователей для Войнов
                    if (heroes[i].rynu[km][1][22] != 0) {
                        tmpBonus[40] += heroes[i].rynu[km][1][22];
                    }
                    //Атака своих преследователей для Всадников
                    if (heroes[i].rynu[km][1][23] != 0) {
                        tmpBonus[41] += heroes[i].rynu[km][1][23];
                    }
                    //Атака своих преследователей для Летающих
                    if (heroes[i].rynu[km][1][24] != 0) {
                        tmpBonus[42] += heroes[i].rynu[km][1][24];
                    }
                    //Атака своих преследователей для Лучников
                    if (heroes[i].rynu[km][1][25] != 0) {
                        tmpBonus[43] += heroes[i].rynu[km][1][25];
                    }




                    //Защита войнам
                    if (heroes[i].rynu[km][1][26] != 0) {
                        tmpBonus[1] += heroes[i].rynu[km][1][26];
                    }
                    //Защита Всадникам
                    if (heroes[i].rynu[km][1][27] != 0) {
                        tmpBonus[2] += heroes[i].rynu[km][1][27];
                    }
                    //Защита Летающим
                    if (heroes[i].rynu[km][1][28] != 0) {
                        tmpBonus[3] += heroes[i].rynu[km][1][28];
                    }
                    //Защита Лучникам
                    if (heroes[i].rynu[km][1][29] != 0) {
                        tmpBonus[4] += heroes[i].rynu[km][1][29];
                    }
                    //Защита Целителям
                    if (heroes[i].rynu[km][1][50] != 0) {
                        tmpBonus[5] += heroes[i].rynu[km][1][50];
                    }
                    //Защита Магам
                    if (heroes[i].rynu[km][1][36] != 0) {
                        tmpBonus[7] += heroes[i].rynu[km][1][36];
                    }




                    //Атака войнам
                    if (heroes[i].rynu[km][1][30] != 0) {
                        tmpBonus[9] += heroes[i].rynu[km][1][30];
                    }
                    //Атака всадников
                    if (heroes[i].rynu[km][1][31] != 0) {
                        tmpBonus[10] += heroes[i].rynu[km][1][31];
                    }
                    //Атака Летающих
                    if (heroes[i].rynu[km][1][32] != 0) {
                        tmpBonus[11] += heroes[i].rynu[km][1][32];
                    }
                    //Атака Лучников
                    if (heroes[i].rynu[km][1][33] != 0) {
                        tmpBonus[12] += heroes[i].rynu[km][1][33];
                    }
                    //Атака Наемников
                    if (heroes[i].rynu[km][1][34] != 0) {
                        tmpBonus[14] += heroes[i].rynu[km][1][34];
                    }
                    //Атака Магов
                    if (heroes[i].rynu[km][1][35] != 0) {
                        tmpBonus[15] += heroes[i].rynu[km][1][35];
                    }




                    //здоровье Носильщиков
                    if (heroes[i].rynu[km][1][37] != 0) {
                        tmpBonus[16] += heroes[i].rynu[km][1][37];
                    }
                    //здоровье Войнов
                    if (heroes[i].rynu[km][1][38] != 0) {
                        tmpBonus[17] += heroes[i].rynu[km][1][38];
                    }
                    //здоровье Всадников
                    if (heroes[i].rynu[km][1][39] != 0) {
                        tmpBonus[18] += heroes[i].rynu[km][1][39];
                    }
                    //здоровье Летающих
                    if (heroes[i].rynu[km][1][40] != 0) {
                        tmpBonus[19] += heroes[i].rynu[km][1][40];
                    }
                    //здоровье Лучников
                    if (heroes[i].rynu[km][1][41] != 0) {
                        tmpBonus[20] += heroes[i].rynu[km][1][41];
                    }
                    //здоровье Целителей
                    if (heroes[i].rynu[km][1][42] != 0) {
                        tmpBonus[21] += heroes[i].rynu[km][1][42];
                    }
                    //здоровье Наемников
                    if (heroes[i].rynu[km][1][43] != 0) {
                        tmpBonus[22] += heroes[i].rynu[km][1][43];
                    }
                    //здоровье Магов
                    if (heroes[i].rynu[km][1][44] != 0) {
                        tmpBonus[23] += heroes[i].rynu[km][1][44];
                    }





                    /*--------------------------------------------------ВРГ----------------------------------------------------------------*/
                   

                    if (heroes[i].dress[9] == 48  && km==9) //ЭТО НА КОГТИ ДРАКОНА
                    {
                             if (i == 0 || i == 1 || i == 6) 
                                {
                                    if (heroes[i].dress_old[9] == 1)
                                    {
                                        tmpBonusVrag[8] -= 6;
                                        tmpBonusVrag[9] -= 6;
                                        tmpBonusVrag[10] -= 6;
                                        tmpBonusVrag[11] -= 6;
                                        tmpBonusVrag[12] -= 6;
                                        tmpBonusVrag[13] -= 6;
                                        tmpBonusVrag[14] -= 6;
                                        tmpBonusVrag[15] -= 6;   
                                    }
                                    else
                                    {
                                        tmpBonusVrag[8] -= 5;
                                        tmpBonusVrag[9] -= 5;
                                       tmpBonusVrag[10] -= 5;
                                       tmpBonusVrag[11] -= 5;
                                       tmpBonusVrag[12] -= 5;
                                       tmpBonusVrag[13] -= 5;
                                       tmpBonusVrag[14] -= 5;
                                       tmpBonusVrag[15] -= 5;
                                    }
                                    
                                }
                                    else
                                    {  
                                        if (heroes[i].dress_old[9] == 1)
                                        {
                                            tmpBonusVrag[8] -= 6;
                                            tmpBonusVrag[9] -= 6;
                                            tmpBonusVrag[10] -= 6;
                                            tmpBonusVrag[11] -= 6;
                                            tmpBonusVrag[12] -= 6;
                                            tmpBonusVrag[13] -= 6;
                                            tmpBonusVrag[14] -= 6;
                                            tmpBonusVrag[15] -= 6;   
                                        }
                                        else
                                        {
                                            tmpBonusVrag[8] -= 5;
                                            tmpBonusVrag[9] -= 5;
                                           tmpBonusVrag[10] -= 5;
                                           tmpBonusVrag[11] -= 5;
                                           tmpBonusVrag[12] -= 5;
                                           tmpBonusVrag[13] -= 5;
                                           tmpBonusVrag[14] -= 5;
                                           tmpBonusVrag[15] -= 5;
                                        }
                                        
                                    }       
                    }
                   

                    //Поножи дракона
                    if (heroes[i].dress[10] == 48 && km==10) //ЭТО НА поножи ДРАКОНА
                    {
                             if (i == 0 || i == 1 || i == 6) 
                                {
                                    if (heroes[i].dress_old[10] == 1)
                                    {
                                        tmpBonusVrag[16] -= 12;
                                        tmpBonusVrag[17] -= 12;
                                        tmpBonusVrag[18] -= 12;
                                        tmpBonusVrag[19] -= 12;
                                        tmpBonusVrag[20] -= 12;
                                        tmpBonusVrag[21] -= 12;
                                        tmpBonusVrag[22] -= 12;
                                        tmpBonusVrag[23] -= 12;   
                                    }
                                    else
                                    {
                                        tmpBonusVrag[16] -= 10;
                                        tmpBonusVrag[17] -= 10;
                                       tmpBonusVrag[18] -= 10;
                                       tmpBonusVrag[19] -= 10;
                                       tmpBonusVrag[20] -= 10;
                                       tmpBonusVrag[21] -= 10;
                                       tmpBonusVrag[22] -= 10;
                                       tmpBonusVrag[23] -= 10;
                                    }
                                    
                                }
                                    else
                                    {  
                                        if (heroes[i].dress_old[10] == 1)
                                        {
                                            tmpBonusVrag[16] -= 12;
                                            tmpBonusVrag[17] -= 12;
                                            tmpBonusVrag[18] -= 12;
                                            tmpBonusVrag[19] -= 12;
                                            tmpBonusVrag[20] -= 12;
                                            tmpBonusVrag[21] -= 12;
                                            tmpBonusVrag[22] -= 12;
                                            tmpBonusVrag[23] -= 12;  
                                        }
                                        else
                                        {
                                            tmpBonusVrag[16] -= 10;
                                            tmpBonusVrag[17] -= 10;
                                           tmpBonusVrag[18] -= 10;
                                           tmpBonusVrag[19] -= 10;
                                           tmpBonusVrag[20] -= 10;
                                           tmpBonusVrag[21] -= 10;
                                           tmpBonusVrag[22] -= 10;
                                           tmpBonusVrag[23] -= 10;
                                        }
                                        
                                    }       
                    }

                    // Плащ дракона
                    if (heroes[i].dress[11] == 48 && km==11) //ЭТО НА плащ ДРАКОНА
                    {
                             if (i == 0 || i == 1 || i == 6) 
                                {
                                    if (heroes[i].dress_old[11] == 1)
                                    {
                                        tmpBonusVrag[0] -= 12;
                                        tmpBonusVrag[1] -= 12;
                                        tmpBonusVrag[2] -= 12;
                                        tmpBonusVrag[3] -= 12;
                                        tmpBonusVrag[4] -= 12;
                                        tmpBonusVrag[5] -= 12;
                                        tmpBonusVrag[6] -= 12;
                                        tmpBonusVrag[7] -= 12;   
                                    }
                                    else
                                    {
                                        tmpBonusVrag[0] -= 10;
                                        tmpBonusVrag[1] -= 10;
                                       tmpBonusVrag[2] -= 10;
                                       tmpBonusVrag[3] -= 10;
                                       tmpBonusVrag[4] -= 10;
                                       tmpBonusVrag[5] -= 10;
                                       tmpBonusVrag[6] -= 10;
                                       tmpBonusVrag[7] -= 10;
                                    }
                                    
                                }
                                    else
                                    {  
                                        if (heroes[i].dress_old[11] == 1)
                                        {
                                            tmpBonusVrag[0] -= 12;
                                            tmpBonusVrag[1] -= 12;
                                            tmpBonusVrag[2] -= 12;
                                            tmpBonusVrag[3] -= 12;
                                            tmpBonusVrag[4] -= 12;
                                            tmpBonusVrag[5] -= 12;
                                            tmpBonusVrag[6] -= 12;
                                            tmpBonusVrag[7] -= 12;  
                                        }
                                        else
                                        {
                                            tmpBonusVrag[0] -= 10;
                                            tmpBonusVrag[1] -= 10;
                                           tmpBonusVrag[2] -= 10;
                                           tmpBonusVrag[3] -= 10;
                                           tmpBonusVrag[4] -= 10;
                                           tmpBonusVrag[5] -= 10;
                                           tmpBonusVrag[6] -= 10;
                                           tmpBonusVrag[7] -= 10;
                                        }
                                        
                                    }       
                    }

                      // Поножи Короля
                      if (heroes[i].dress[10] == 46 && km==10) //ЭТО НА поножи КОРОЛЯ
                      {
                               if (i == 0 || i == 1 || i == 6) 
                                  {
                                      if (heroes[i].dress_old[10] == 1)
                                      {
                                          tmpBonusVrag[24] -= 10; 
                                      }
                                      else
                                      {
                                          tmpBonusVrag[24] -= 10;
                                      }
                                      
                                  }
                                      else
                                      {  
                                          if (heroes[i].dress_old[10] == 1)
                                          {
                                              tmpBonusVrag[24] -= 10; 
                                          }
                                          else
                                          {
                                              tmpBonusVrag[24] -= 10;
                                          }
                                          
                                      }       
                      }                  


                      // Наруч Бога
                      if (heroes[i].dress[9] == 42 && km==9) //ЭТО НА Наручи Бога
                      {
                               if (i == 0 || i == 1 || i == 6) 
                                  {
                                      if (heroes[i].dress_old[9] == 1)
                                      {
                                          tmpBonusVrag[9] -= 24; 
                                      }
                                      else
                                      {
                                          tmpBonusVrag[9] -= 20;
                                      }
                                      
                                  }
                                      else
                                      {  
                                          if (heroes[i].dress_old[9] == 1)
                                          {
                                              tmpBonusVrag[9] -= 24; 
                                          }
                                          else
                                          {
                                              tmpBonusVrag[9] -= 20;
                                          }
                                          
                                      }       
                      }   
                     

                      
                    //атака всех произвольный
                    if (heroes[i].rynu[km][1][13] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusVrag[8 + m] += heroes[i].rynu[km][1][13];
                        }
                    }
                    //здоровье всех произвольный
                    if (heroes[i].rynu[km][1][14] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusVrag[16 + m] += heroes[i].rynu[km][1][14];
                        }
                    }
                    //атака магов произвольный
                    if (heroes[i].rynu[km][1][20] != 0) {

                        tmpBonusVrag[15] += heroes[i].rynu[km][1][20];

                    }

                    //% Воскрешения своих целителей
                    if (heroes[i].rynu[km][1][71] != 0) {

                        tmpBonusVrag[25] += heroes[i].rynu[km][1][71];

                    }



                    //Атака всех преследователей
                    if (heroes[i].rynu[km][1][45] != 0) {
                        for (var m = 0; m < 4; m++) {
                            tmpBonusVrag[40 + m] += heroes[i].rynu[km][1][45];
                        }
                    }
                    //Атака  преследователей для Войнов
                    if (heroes[i].rynu[km][1][46] != 0) {
                        tmpBonusVrag[40] += heroes[i].rynu[km][1][46];
                    }
                    //Атака  преследователей для Всадников
                    if (heroes[i].rynu[km][1][47] != 0) {
                        tmpBonusVrag[41] += heroes[i].rynu[km][1][47];
                    }
                    //Атака  преследователей для Летающих
                    if (heroes[i].rynu[km][1][48] != 0) {
                        tmpBonusVrag[42] += heroes[i].rynu[km][1][48];
                    }
                    //Атака  преследователей для Лучников
                    if (heroes[i].rynu[km][1][49] != 0) {
                        tmpBonusVrag[43] += heroes[i].rynu[km][1][49];
                    }




                    //Защита Всадникам, коням, летающим, лукам
                    if (heroes[i].rynu[km][1][51] != 0) {
                        for (var m = 0; m < 4; m++) {
                            tmpBonusVrag[1 + m] += heroes[i].rynu[km][1][51];
                        }
                    }
                    //Защита войнам
                    if (heroes[i].rynu[km][1][52] != 0) {
                        tmpBonusVrag[1] += heroes[i].rynu[km][1][52];
                    }
                    //Защита Всадникам
                    if (heroes[i].rynu[km][1][53] != 0) {
                        tmpBonusVrag[2] += heroes[i].rynu[km][1][53];
                    }
                    //Защита Летающим
                    if (heroes[i].rynu[km][1][54] != 0) {
                        tmpBonusVrag[3] += heroes[i].rynu[km][1][54];
                    }
                    //Защита Лучникам
                    if (heroes[i].rynu[km][1][55] != 0) {
                        tmpBonusVrag[4] += heroes[i].rynu[km][1][55];
                    }
                    //Защита Целителям
                    if (heroes[i].rynu[km][1][56] != 0) {
                        tmpBonusVrag[5] += heroes[i].rynu[km][1][56];
                    }
                    //Защита Магам
                    if (heroes[i].rynu[km][1][57] != 0) {
                        tmpBonusVrag[7] += heroes[i].rynu[km][1][57];
                    }




                    //Атака войнам
                    if (heroes[i].rynu[km][1][58] != 0) {
                        tmpBonusVrag[9] += heroes[i].rynu[km][1][58];
                    }
                    //Атака всадников
                    if (heroes[i].rynu[km][1][59] != 0) {
                        tmpBonusVrag[10] += heroes[i].rynu[km][1][59];
                    }
                    //Атака Летающих
                    if (heroes[i].rynu[km][1][60] != 0) {
                        tmpBonusVrag[11] += heroes[i].rynu[km][1][60];
                    }
                    //Атака Лучников
                    if (heroes[i].rynu[km][1][61] != 0) {
                        tmpBonusVrag[12] += heroes[i].rynu[km][1][61];
                    }
                    //Атака Наемников
                    if (heroes[i].rynu[km][1][62] != 0) {
                        tmpBonusVrag[14] += heroes[i].rynu[km][1][62];
                    }





                    //здоровье Носильщиков
                    if (heroes[i].rynu[km][1][63] != 0) {
                        tmpBonusVrag[16] += heroes[i].rynu[km][1][63];
                    }
                    //здоровье Войнов
                    if (heroes[i].rynu[km][1][64] != 0) {
                        tmpBonusVrag[17] += heroes[i].rynu[km][1][64];
                    }
                    //здоровье Всадников
                    if (heroes[i].rynu[km][1][65] != 0) {
                        tmpBonusVrag[18] += heroes[i].rynu[km][1][65];
                    }
                    //здоровье Летающих
                    if (heroes[i].rynu[km][1][66] != 0) {
                        tmpBonusVrag[19] += heroes[i].rynu[km][1][66];
                    }
                    //здоровье Лучников
                    if (heroes[i].rynu[km][1][67] != 0) {
                        tmpBonusVrag[20] += heroes[i].rynu[km][1][67];
                    }
                    //здоровье Целителей
                    if (heroes[i].rynu[km][1][68] != 0) {
                        tmpBonusVrag[21] += heroes[i].rynu[km][1][68];
                    }
                    //здоровье Наемников
                    if (heroes[i].rynu[km][1][69] != 0) {
                        tmpBonusVrag[22] += heroes[i].rynu[km][1][69];
                    }
                    //здоровье Магов
                    if (heroes[i].rynu[km][1][70] != 0) {
                        tmpBonusVrag[23] += heroes[i].rynu[km][1][70];
                    }

                    /*---------------------------------------------------------------------------------------------------------------------*/






                    //VRAGU
                    //атака всех -3
                    if (heroes[i].rynu[km][0][7] > 0) {
                        var tmp = -3 * heroes[i].rynu[km][0][7];
                        for (var m = 0; m < 8; m++) {
                            tmpBonusVrag[8 + m] += tmp;
                        }
                    }
                    //атака всех произвольный
                    if (heroes[i].rynu[km][1][1] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusVrag[8 + m] += heroes[i].rynu[km][1][1];
                        }
                    }
                    //Предел максимальной защиты противника - произвольный
                    if (heroes[i].rynu[km][1][8] != 0) {
                        tmpBonusVrag[24] += heroes[i].rynu[km][1][8];

                    }
                    //Защита войск противника - произвольный
                    if (heroes[i].rynu[km][1][9] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusVrag[m] += heroes[i].rynu[km][1][9];
                        }
                    }

                    //здоровье всех произвольный
                    if (heroes[i].rynu[km][1][4] != 0) {
                        for (var m = 0; m < 8; m++) {
                            tmpBonusVrag[16 + m] += heroes[i].rynu[km][1][4];
                        }
                    }
                    if (i == 0 || i == 1 || i == 6) {
                        //атака маг башень противника
                        if (heroes[i].rynu[km][1][3] != 0) {
                            tmpBonusVrag[30] += heroes[i].rynu[km][1][3];
                        }
                    }


                    //побег
                    if (heroes[i].rynu[km][1][0] != 0) {
                        tmpBonusVrag[35] = heroes[i].rynu[km][1][0] > tmpBonusVrag[35] ? heroes[i].rynu[km][1][0] : tmpBonusVrag[35];
                    }

                    /*
                    
                                       //побег  c заточной
                                        if (heroes[i].rynu[km][1][10] != 0)
                                        {
                    //alert("01")
                                            tmpBonusVrag[35] = 0;
                                            tmpBonusVrag[35] += heroes[i].rynu[km][1][10];
                                            yjas_ztch=0;
                                            yjas_ztch=tmpBonusVrag[35];
                                            yjas_ru=0;
                    
                    
                                        if (heroes[i].rynu[km][1][0] != 0)
                                        {
                    //alert("02")
                                            tmpBonusVrag[35] = 0;
                                            tmpBonusVrag[35] = heroes[i].rynu[km][1][0] > tmpBonusVrag[35]? heroes[i].rynu[km][1][0] : tmpBonusVrag[35];
                                            tmpBonusVrag[35] -=yjas_ztch;
                                            yjas_ru=0.1;
                                            yjas_ru=tmpBonusVrag[35];
                                            //yjas_ztch=0;
                       
                                        }
                    
                       
                                        }
                                        else
                                        {
                    
                                        if (heroes[i].rynu[km][1][0] != 0)
                                        {
                    //alert("03")
                                            tmpBonusVrag[35] = 0;
                                            tmpBonusVrag[35] = heroes[i].rynu[km][1][0] > tmpBonusVrag[35]? heroes[i].rynu[km][1][0] : tmpBonusVrag[35];
                                            yjas_ztch=0.1;
                    
                                        }
                                            yjas_ztch=0.1
                    //alert(yjas_ztch+" yjas_ztch")
                    //alert(yjas_ru+" yjas_ru")
                                        }
                    
                    */
                   
                }
            }

            
        }



        /* Проверка на прибавку террайна нежити атакующим */
        if ( (i == 0 && unitu[i].type == 5) || (i == 0 && unitu[i].type == 3) || (i == 1 && unitu[i].type == 5) || (i == 1 && unitu[i].type == 3) || (i == 6 && unitu[i].type == 5) || (i == 6 && unitu[i].type == 3)) {
        unitu[i].plus_bonus(new_tere);
        }

        /* Проверка на снятие защиты защитникам нежити */
        if ( (i == 3 && unitu[i].type == 5) || (i == 3 && unitu[i].type == 3) || (i == 4 && unitu[i].type == 5) || (i == 4 && unitu[i].type == 3))
        {
        unitu[i].plus_bonus(new_unitu_red_minus_defender);
     }
    
        /* Проверка на прибавку террайна Волшебник атакующим */
        if ( (i == 0 && unitu[i].type == 6) || (i == 0 && unitu[i].type ==  1) || (i == 1 && unitu[i].type == 6) || (i == 1 && unitu[i].type == 1) || (i == 6 && unitu[i].type == 6) || (i == 6 && unitu[i].type == 1)) {
            unitu[i].plus_bonus(new_tere_volshebnick);
            }
    
            /* Проверка на снятие защиты защитникам Волшебник */
            if ( (i == 3 && unitu[i].type == 6) || (i == 3 && unitu[i].type == 1) || (i == 4 && unitu[i].type == 6) || (i == 4 && unitu[i].type == 1))
            {
            unitu[i].plus_bonus(new_unitu_red_minus_defender_volshebnick);
         }
        //ПРИБАВКА ЭФФЕКТА КОМПЛЕКТА 47 каждой из сторон


if ((i == 0)) // Прибавляем бонус юнит 0
{
unitu[i].plus_bonus(komplekt_elf, unitu[i].type, unitu[i].type_vrag);
}
if ((i == 1)) // Прибавляем бонус юнит 1
{
unitu[i].plus_bonus(komplekt_elf_1, unitu[i].type, unitu[i].type_vrag);
}

        if ((i == 6)) // Прибавляем бонус юнит 6
        {
        unitu[6].plus_bonus(komplekt_elf_6, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 2)) // Прибавляем бонус юнит 2
        {
        unitu[2].plus_bonus(komplekt_elf_2, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 3)) // Прибавляем бонус юнит 3
        {
        unitu[3].plus_bonus(komplekt_elf_3, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 4)) // Прибавляем бонус юнит 4
        {
        unitu[4].plus_bonus(komplekt_elf_4, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 5)) // Прибавляем бонус юнит 5
        {
        unitu[5].plus_bonus(komplekt_elf_5, unitu[i].type, unitu[i].type_vrag);
        }


        //На СЕБЯ ПРИБАВКА ВСЕХ БОНУСОВ 
        unitu[i].plus_bonus(tmpBonus, unitu[i].type, unitu[i].type_vrag);

        //Прибавка бонусов от полкана РАБОТАЕТ ВРЕМЕННО ОТКЛЮЧИЛ ТК ПОКА НЕ ДОПИСАЛ ПОЛКАНА
        unitu[i].plus_bonus(tmpPolkan, unitu[i].type, unitu[i].type_vrag);

        //Прибавляем бонус от полкана при защите КЗ - защитникам кз
        if ((i == 2)) 
        {
        unitu[2].plus_bonus(tmpPolkan_def_kz, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 3)) 
        {
        unitu[3].plus_bonus(tmpPolkan_def_kz, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 4))
        {
        unitu[4].plus_bonus(tmpPolkan_def_kz, unitu[i].type, unitu[i].type_vrag);
        }
        if ((i == 5)) 
        {
        unitu[5].plus_bonus(tmpPolkan_def_kz, unitu[i].type, unitu[i].type_vrag);
        }
        
        //НА союзника

        if (i == 0 || i == 1 || i == 6) {
            unitu[0].plus_bonus(tmpBonusSouz, unitu[0].type, unitu[0].type_vrag);
            unitu[1].plus_bonus(tmpBonusSouz, unitu[1].type, unitu[1].type_vrag);
            unitu[6].plus_bonus(tmpBonusSouz, unitu[6].type, unitu[6].type_vrag);
        }
        else {
            unitu[2].plus_bonus(tmpBonusSouz, unitu[2].type, unitu[2].type_vrag);
            unitu[3].plus_bonus(tmpBonusSouz, unitu[3].type, unitu[3].type_vrag);
            unitu[4].plus_bonus(tmpBonusSouz, unitu[4].type, unitu[4].type_vrag);
            unitu[5].plus_bonus(tmpBonusSouz, unitu[5].type, unitu[5].type_vrag);
        }


        //ВРАГ
        if (i == 0 || i == 1 || i == 6) {
            unitu[2].plus_bonus(tmpBonusVrag, unitu[2].type, unitu[2].type_vrag);
            unitu[3].plus_bonus(tmpBonusVrag, unitu[3].type, unitu[3].type_vrag);
            unitu[4].plus_bonus(tmpBonusVrag, unitu[4].type, unitu[4].type_vrag);
            unitu[5].plus_bonus(tmpBonusVrag, unitu[5].type, unitu[5].type_vrag);
        }
        else {
            unitu[0].plus_bonus(tmpBonusVrag, unitu[0].type, unitu[0].type_vrag);
            unitu[1].plus_bonus(tmpBonusVrag, unitu[1].type, unitu[1].type_vrag);
            unitu[6].plus_bonus(tmpBonusVrag, unitu[6].type, unitu[6].type_vrag);
        }



        i++;
    } while (i < 7);
        
}


//кординаты курсора
var cursorX;
var cursorY;
//параметры дива для выводы инфы
var num_div = -1;
var num_div_unit = -1;

//var info_div = $('#info_unit');
//вывод информации о юните
function se_info(num, num_unit) {
    if (num_div != num || num_div_unit != num_unit) {
        num_div = num;
        num_div_unit = num_unit;
        document.getElementById('info_unit').style.display = 'block';

        //hp
        document.getElementById('text_hp').innerHTML = db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][0];
        var attac = 0;
        switch (unitu[num].min_max) {
            case 0: {
                attac = db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][1];
                break;
            }
            case 1: {
                attac = db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][2];
                break;
            }
            case 2: {
                attac = db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][1] + '-' + db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][2];
                break;
            }
            case 3: {
                attac = (db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][1] + db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][2]) / 2.0;
                break;
            }
        }
        //attac
        document.getElementById('text_attac').innerHTML = attac;
        //подсчет мин и мак урона у одного типа войск (тип юнита, мин или мах или случайный)

        unitu[num].null_bonusu();


        for (var iks = 0; iks < 7; iks++) {
            if (unitu[iks].bul_v_boy) {
                if (document.getElementById("red_" + iks).checked) {
                    unitu[iks].red = true;
                }
                else {
                    unitu[iks].red = false;
                }
            }
        }

        //расчет бонусов
        //определение кто чей враг по рассе
        unitu[0].type_vrag = unitu[2].type;
        unitu[1].type_vrag = unitu[2].type;
        unitu[6].type_vrag = unitu[2].type;
        unitu[2].type_vrag = unitu[0].type;
        unitu[3].type_vrag = unitu[0].type;
        unitu[4].type_vrag = unitu[0].type;
        unitu[5].type_vrag = unitu[0].type;

        //TODO: (проверки отступников может быть глюк) делаем отступников
        if (unitu[0].type == unitu[2].type && !unitu[2].red && unitu[0].type != 4) {
            unitu[0].red = true;
            unitu[0].bonus_damag_add_all(-50);
        }
        if (unitu[1].type == unitu[2].type && !unitu[2].red && unitu[0].type != 4) {
            unitu[1].red = true;
            unitu[1].bonus_damag_add_all(-50);
        }
        if (unitu[6].type == unitu[2].type && !unitu[2].red && unitu[0].type != 4) {
            unitu[6].red = true;
            unitu[6].bonus_damag_add_all(-50);
        }
        if (unitu[2].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[2].red = true;
            // unitu[2].bonus_damag_add_all(-50);
        }
        if (unitu[3].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[3].red = true;
            // unitu[3].bonus_damag_add_all(-50);
        }
        if (unitu[4].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[4].red = true;
            // unitu[4].bonus_damag_add_all(-50);
        }
        if (unitu[5].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[5].red = true;
            // unitu[4].bonus_damag_add_all(-50);
        }



        //бонусы фракционки
        if ((!unitu[0].type && unitu[2].type == 1 || !unitu[2].type && unitu[0].type == 1 || unitu[0].type == 0 && unitu[2].type == 6 || unitu[0].type == 1 && unitu[2].type == 6 || unitu[0].type == 6 && unitu[2].type == 0 || unitu[0].type == 6 && unitu[2].type == 1 || unitu[0].type == 2 && unitu[2].type == 3 || unitu[0].type == 3 && unitu[2].type == 2 || unitu[0].type == 2 && unitu[2].type == 5 || unitu[0].type == 5 && unitu[2].type == 2 || unitu[0].type == 3 && unitu[2].type == 5 || unitu[0].type == 5 && unitu[2].type == 3 ) && !unitu[2].red) {
            unitu[0].bonus_damag_add_all(-25);
        }
        if ((!unitu[1].type && unitu[2].type == 1 || !unitu[2].type && unitu[1].type == 1 || unitu[1].type == 0 && unitu[2].type == 6 || unitu[1].type == 1 && unitu[2].type == 6 || unitu[1].type == 6 && unitu[2].type == 0 || unitu[1].type == 6 && unitu[2].type == 1 || unitu[1].type == 2 && unitu[2].type == 3 || unitu[1].type == 3 && unitu[2].type == 2 || unitu[1].type == 2 && unitu[2].type == 5 || unitu[1].type == 5 && unitu[2].type == 2 || unitu[1].type == 3 && unitu[2].type == 5 || unitu[1].type == 5 && unitu[2].type == 3 ) && !unitu[2].red) {
            unitu[1].bonus_damag_add_all(-25);
        }
        if ((!unitu[6].type && unitu[2].type == 1 || !unitu[2].type && unitu[6].type == 1 || unitu[6].type == 0 && unitu[2].type == 6 || unitu[6].type == 1 && unitu[2].type == 6 || unitu[6].type == 6 && unitu[2].type == 0 || unitu[6].type == 6 && unitu[2].type == 1 || unitu[6].type == 2 && unitu[2].type == 3 || unitu[6].type == 3 && unitu[2].type == 2 || unitu[6].type == 2 && unitu[2].type == 5 || unitu[6].type == 5 && unitu[2].type == 2 || unitu[6].type == 3 && unitu[2].type == 5 || unitu[6].type == 5 && unitu[2].type == 3 ) && !unitu[2].red) {
            unitu[6].bonus_damag_add_all(-25);
        }
        //бонусы защиты от укреплений

        bonus_ot_yb = kol_vo_yb[0] * db_yb_tmp[0][spes][1] + kol_vo_yb[1] * db_yb_tmp[1][spes][1] + kol_vo_yb[2] * db_yb_tmp[2][spes][1] + kol_vo_yb[3] * db_yb_tmp[3][spes][1] + kol_vo_yb[4] * db_yb_tmp[4][spes][1] + kol_vo_yb[5] * db_yb_tmp[5][spes][1] + kol_vo_yb[6] * db_yb_tmp[6][spes][1] + kol_vo_yb[7] * db_yb_tmp[7][spes][1];
        var i = 0;
        do {
            unitu[2].bonusu[i] += bonus_ot_yb;
            i++;
        } while (i < 8);
        //бонусы макс защиты
        if (max_z) {
            i = 0;
            do {
                unitu[2].bonusu[i] = 75;
                i++;
            } while (i < 8);
        }


        //-=-=-расчет бонусов
        kalk_bonusu();

        unitu[num].limit_bonus(24, 75, true); //проверка лимита макс защиты 
        unitu[num].limit_bonus(24, 0, false); //проверка лимита мин защиты
        //unitu[num].limit_bonus(25, -100, false); //проверка лимита мин воскрешения

        //       if(unitu[num].bonusu[24]<75&&max_z&&num==2){
        //           unitu[num].bonusu[num_unit] -= (75-unitu[num].bonusu[24]);
        //       }
        if (max_z && num == 2) {
            unitu[num].bonusu[num_unit] = unitu[num].bonusu[24];
        }

        unitu[num].limit_bonus(num_unit + 8, -90, false); //проверка лимита мин атаки 
        unitu[num].limit_bonus(40, -90, false); //проверка лимита мин атаки
        unitu[num].limit_bonus(41, -90, false); //проверка лимита мин атаки
        unitu[num].limit_bonus(42, -90, false); //проверка лимита мин атаки
        unitu[num].limit_bonus(43, -90, false); //проверка лимита мин атаки
        unitu[num].limit_bonus(num_unit, 0, false); //проверка лимита защиты на минимум
        unitu[num].limit_bonus(num_unit, unitu[num].bonusu[24], true); //проверка лимита защиты на максимум
        unitu[num].limit_bonus(num_unit + 16, -75, false); //проверка мин hp

        //hp bonus
        if (unitu[num].bonusu[16 + num_unit]) {

            if (unitu[num].bonusu[16 + num_unit] > 0) {
                document.getElementById('bonus_hp').style.color = 'green';
                document.getElementById('bonus_hp').innerHTML = '+' + unitu[num].bonusu[16 + num_unit] + '%';
            }
            else {
                document.getElementById('bonus_hp').style.color = 'red';
                document.getElementById('bonus_hp').innerHTML = unitu[num].bonusu[16 + num_unit] + '%';
            }
        }
        else {
            document.getElementById('bonus_hp').innerHTML = '';
        }
        //damag bonus
        if (unitu[num].bonusu[8 + num_unit]) {

            if (unitu[num].bonusu[8 + num_unit] > 0) {
                document.getElementById('bonus_attac').style.color = 'green';
                document.getElementById('bonus_attac').innerHTML = '+' + unitu[num].bonusu[8 + num_unit] + '%';
            }
            else {
                document.getElementById('bonus_attac').style.color = 'red';
                document.getElementById('bonus_attac').innerHTML = unitu[num].bonusu[8 + num_unit] + '%';
            }
        }
        else {
            document.getElementById('bonus_attac').innerHTML = '';
        }
        //armor bonus
        if (unitu[num].bonusu[num_unit]) {
            document.getElementById('text_armor').innerHTML = unitu[num].bonusu[num_unit];
            if (unitu[num].bonusu[num_unit] == unitu[num].bonusu[24]) {
                document.getElementById('text_armor').style.color = 'orange';
            }
            else {
                document.getElementById('text_armor').style.color = 'white';
            }
        }
        else {
            document.getElementById('text_armor').innerHTML = 0;
            document.getElementById('text_armor').style.color = 'white';
        }

        info_unit = $('#info_unit');
        personal = $('#personal');
        personal.text('');
        switch (num_unit) {
            case 0: {
                personal.text('Вмещает ' + db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][3] + ' единиц ресурсов');
                info_unit.css('height', '116px');
                break;
            }
            case 1: {
                var x = unitu[num].bonusu[40] ? unitu[num].bonusu[40] : '';
                x = x > 0 ? ('+' + x) : x;
                personal.append('<div id="pers_img"></div><div id="pers_inf">' + x + (x ? '%' : '') + '</div>');
                $('#pers_img').css({ 'height': '42px', 'display': 'inline-block', 'width': '65px', 'background': "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAqCAYAAADsxDbcAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAABFySURBVHja1FoJXJTV2v+/7+zDzDAMMICCYpALsqSmpaa53cLrdSvtc00r01zIrUxvdavP0srbRU3TXPJqpoZmmYmmSS5pESkqioqCKNsAwzAwwzD7uee8MxCalnaLbs/P53cO5zznfc/7nGc7/xG4OXWjvIDyRj/PoZx0M0FCSLNwQnjU4Pr6eu+WDRtJm7AW6+nfaGBK3Sm/SVnxoJ7v8tK4Fjv2vJXk8h7qSzyHehDrp/eSrEWxZMaAoDOJWu5hcqYnouPuF55baigFx54wavYceL1epC1bqqF/DumTnPxEtwf7xsUnJIa73E589+23xeuWvP018XoP0/mMESmzr3A8j+3L3hEe1ByUGNFq8IyX5qeOe+rJGKVcjomPTzQfSt+3SCORLqnj3Z/vUYcPfqb6NObPi0XysDYAZ4H5yzLMSXMiv9qNML4WE/vrUOd24ZPT2lPZRi2sxHFP1v50QQeCEijFUJ484slJp3YeOeY9dPI02bLvIDnwXRbZkXGYrNy+g4yeNuMSlZlFOWHkzLnNagkFhYXs1BdmZHztraqtI2cuFJC333nHHRfW8u25cmWdHTyZFC8npOQBcva1CBIXrSfykPDckPbx6bp7uo/XderxsiKi1a6E9q3Jye2jyfbVKaRFfBIpKS2FuImy+w8ZPXbenLnPxbQKDUagSoluHdpDIZeipNKI3IJC1Ha9L5ZMJXO2rVoJj92Wg2akwMBA1nxfcPFSrlqj6Rjdpg0OHD+51+P1qsep7UqL3YsjZbw3tNslq8WOGkdVBXNpg91ouO45TmXLqYPmf78oWC7WAnKIxdLGuXbhraJ3r/18N8k8f4FUmC3kRN5FUlJRSa4Yykne1SLyYfpe8srK1eTp1xYSf5yIaU5LqLPaGmLAwtQl7xii28Ydzjhx0bsjbak7pxXIQrGEBMV3fZqe+C8qdPTYsUatLpiw565cmQreP97vvp494+tdLlC/h9lSC5PJiktFxVDIJKhz2BFCT6KwtARqbRAef3ZmT7bmdk7w8lbNZHI2kbD2v7EETsQjx1AEh8d9fv0/U48NtdffJyv+ihsw5Bl+SHBP/DM2bnb12ay1puzjt3zGB4tfwZo3XkbvxLhqzu10srG3Fs5rdIfWEm2QrqK6FuZ6O7Lz8gAv8GCXTrhcUgwJFYhtHU1PhIObKik0KkpPh+6+nc3HJES/36Rd82uV4HI5EBsctqlPWPj42DobBhVehP3R6di9QcNlHf2KdO/WbZaZkKU3W8tzHPauXwEHO2Rqxy1CghUSSmxOKpUJSlBLpNKoiLtiNGFaDcQ8QbXFAo4uCNUEoM5pg1gkgVIuw+jBg7Dio62Ii+ugpuvCKNMwjCs/t/mVS84fHZKs63WhwHV02iPtyL59meDopjhqg7QRNsjzjNnffGOfjUskPAI1MiF619Sacbmq/O/7TBXjVSCw0I9JJyIsHj9+h3l1fZevvtzXpl2HDlarWMamUXL2VOMectO3wu50w+lyw0uE96hFIpHw3BfnjwplSug3fNz4OCk1t1EDBwo7c7kIrhZdxbUKEyJCw2keJWihC0JGZhUcdjuUAQEY9czUHttWr2Iusb6p6dPm/eyvrY0bkPENHodeD/T/K5KT78OXX2biyKkciMQ8JPS9ErGYsoh+tL/1c0RIENjLA9UyrrKiCuRkj+IX3rxmjAiShHxx0Ya8Uu1OU97FkW+ueG+y2+1+6eNtH0c9MnyY8UT2qRCTuUaIJcFBWjz/3hasnDMJTrcbNJDCWuegh+3LjD+cuqpkSggTqTXqoiv5eGLieOxO247kbl2wuqgQ+rAQtNRqBeFnZ84EIluBRma4aIzglcrImxRQgunHdg5uHPghs/o6AaaIaVNH44MNaT6L4HBdK5OKGvvw/YPV5iTGijIOYRymDA/W3dVKht3PlqA9KZgV1kqEMpA1S1a/D4/H81Lajk+jOifF12SdPB3Y8M4rNA227jcU6kA1cnenUSXQcOA/nJVrDsiYElSc1yvjRWJ8sX2H8PLWne7FtHnzEKwOhFYfhprKCmHR/2/ahtIKIzxUxu10idhB36CEKUwRl09WNfXI6wS+OZiOf29Jx/xl7wkWIKYslVKmLsrclPV9FuHj/xvwIN7asJV7ND4YyzcXb3l2RDifn1GGMwa33RvatSjc8j2zfpw7dnRNxx4PUHP3vrJh0+YWDycPdLk5pfx0ZobHaakR3h0Z0RItI/SoMFZ7xD9aaC1TQr3dYXd17NQFHe5JgoMGHXt1FVpHRaK4vFxQQFxSEpweN9qHBeOEwwFrjQWawED2bm/TD4wdXcsC35rY0T+OrZggIdcrYA+MJgtGDHi4MR4IsUFoeYhEPitgc5HhOkEBbG2YygmDWjoSKgnmpgOhKukb5SxrECFPCxXv6SOH1iT17oNZk556+bm5syOXLlvhantX9Out7733H1cLi9ChfXtwOsHF3LGto4R9iTmxgSnBU2exejUyKTQqDSqpEkRUS0X5+egd35H6rEj4AIVMiQClEjXmKshpG6SUC5nrl6L69Oc7CG1UAo0ZL57h7jQrrPj7dKG9kLEOOgkv9ly24oRJ6bEpdK+bTh2HmX2A4TSqqs2C8poo4qXhw4ZGrXrvvZfrCRKdLsewth3oXmjcFNTmjwliGnuYTcg84CQyWo/LFHIoaNDzV2cIohnB5fGAzWmUCqjpx0vpQ6qrTai31Utu4g4/ofycwilN219LFrcMZmM9ikrrYPeKaRnoMzDvDZc5RkwRS9etf10kkxr2HMrAR3OeG0rPIPXNxYtFnEpPrU5UqpD4tm53OYUUGUzPU5nUri0+FfvKhrPZJ/H8hPECN5CURnK5VAqTsRza4GAQkYT7icPfhBpdJP6/K5utnA75RTZqjRJwMrmT6aArC81eHmsXvQp9sBbT3t3QdMmapWvXo0tch1TuoYeVB+idh25k1j+o9dJMYs8rLnb6VScoQV5XWytlX0RcHuSey7XRrrLhSSF6vdCqaFYQUSUoVCqa2sQ0Ylua8+qAkLBIfFNoLw4NlUR6ncp8yMSr8oPvn/rK4AfhdDpgtzuwYtoEGlRFqK61YNJz/6Ai3Jox02bEbOO4efuplbD8XQjYikvLDnEKmbVp6I6g12KNPliHMkPpYeJyrqVjmxrYWFGxKTszc6PL5TnD0/igUmsQ3TICwwb0bVYlREW2QPYFW4q93g29uTCODoWycY/XRT+C0NZDXddXEAWqVVi0YDYcCiVEMnn+o4ndwCLTq5QX0fB2Ztb8gWWXCgV/kNFYyJSQ4bBaz9hs9bh49uxV6lezKE9oyuz6vC99zylmCUMe6ocYqoTNH31cQMePNZcSFEo1EluKPvuyQFE2YkhSC1edI0Hqsb8hpx+hoLEqQKGAUiqnbiuBQipB547tcWDdcqQtnLdG7rZNGZt0P4bS5zAAYApVlotwab5y3CVEdxYFh2l0ur/Vmkxf0I/eOHZqCrasXgEp1WTn+7vj24yvWOSd1Com9gWT0VhmrTFf8Ssgg8pfbg4leOnGBycq8YPzrgVLFjy+SCUqQ8qSIxjR6z6PXhfE3x0ZzkWHh1CfpumVMicSQqeXhgyvTKxwWXhYhs5fov/o9HcYG9sRXqOBq642+gq1Ju+hCRTVP7MPdk/oz+oSyt/eGJGbg4Qqkl72WnRMLGwYKz135mG/WwthrUFUJlPE0kIsUvB5ntf7h52SsJaTqQLGO+qtm230CiAooTk/4n+V+D/7BxjKDaiz1SGAZi3fHYSjaTSwod9uxZIJo9YtnzSK9W+YE9Y4aGbhfgZtZqbf3v/3acoH/e1P0OY/ksrKy6AKUCEkRA8nvdj5SLJ45uzpKQMH9ghQyENhtRghotX73r3H65alrnyXhsMFQu0jk8NsNqERaH1sJsNPwdDmcX2Skw/OW/xW2aYv9pL1n+0iT78wv4imUZYyn2KxYUTKbDQ30HorLiktQbXZDCESAnHTZ86utNebSXFhLiHeXGKr3EYMl9ZS0VxScjWXsLkZs+ZUMlm2ptZiwZ8Gbb61EkpRZRLiufbfGzcQp6OCjBregyTFh5Kc01upyEnK54T+PQmhZPQjPYjbZSSbPtzITFhrrqn986DNtyKGFjOP3Lw1NTu5XxJKcj/Fu8tToNG3REmxCfv3H6eVrggxrSPw/YmdsFSUoPjcTvwtuSu2pC3LpibURlDCttR/MbR58ODRo2JEPMPd5KC1NcK1OpTXeOFyOFFuMsJOA5A6XPjJp9PO91cxy8n/o5WwY/uH7Co+sM+A2Oh161bA45Hi0XGDsGDOGzj29WlaKHhgrKqHPlSFB/om4bm5Kfhk9yF6Zc/EkJHDo7du+WDg74423yndKTrN0OLzuSdTPG4zjn/zPb26T8bS1OVYt/LA1fO5hocuXqhUVVVaVay/lo6lpi6jMlNw7Ggm2JrzuSdS+JuhzQd/yMLlkiKw+wRDm53O+l+NNt8p3YBO/yIxtFgTEtlHH6bArp3/wufpnyLzeD61UG80TYMHeB51IinqWJ+NsbnP9+zErs9SERauFNbyt0KbWepgaLOM1uGsfG5Am/PzC8AHqJuizbekmloHoaZIKow2YqiwkVJDHSkps5CiEgu5WlRLrlyrIQVXa0j+lRpyucBMYtu2Iwd2FR8tyikXUOrbUQJDiyUSp+LYN9ngFA+h4NJlZJ8oGMZyP7tRMtBELOaEPhtjc/lUhpP9Bd8cPQG29jdFm69TgMVBTFSZZcZquNyeH5ne8nx92nq81CS96JWYIKDQDIQFNvbyodSk1/bJfGMR0qmvgAhN8eMTPwK5p64qZfpQSAOEH8RQYTRDq1Rfk8klAmJttJgFTFVH3Zi912F3XWMyQjWh5FFj8/0W+VuizT4AxOYkIp5DCLWskECNP52BVmeexn7T9sknHvMr4AZApglqTVc3oNnXKYGhxU/NGAR1gBqjnugJiVQMD613PITUMvxRFxiEUkMlNAp67abvYnNMhsmyNTXmGvzWaLNA85eu5V54YjT5+KvDvhNnTC3A6XQLV1cnY9p3++defn0FJo75608U0RS1brCEm7yu9uD+LMx69i+Y9+IIHNifDYvNEmexoZjdqXjed7cy0DTvv1/FtYgMwoQn+0Hi5cDW/qZo83VRe8NWbuaYEaTYYILXX9h4POzkvTRt+ayAtWyOoc8MhZ44ZhDGTPCfO93gyDXeXwRmGVpcmFdRfy7nkmLUoyux6qOnMfSxuFd3peXub5BhPzZ5PD7PYnOaQBk6x87Gtk+mg639XdDmBoSYzd8dHXb76THvIlh6FFDqhLDbLJZEcLvcWYczz/ceN7k3po5di5QX+nfnkaenMaFCLOZR73RCRosqGhP0rdpEdGcyTJauYY/I+t3R5julO0WnGVpM6d3d20+ge28tXlmSDF0w3a9O8hrHMgJlZoWsZWNsjskwWbaGreWbos2iG9BmhVx+U7TZSxVzu2jznRKL/lz8Ge7GLHBrEgxnR+m1uiunTuRDLLfiXM41aEM0z3g8XglzuQB6BWB9NsbmmAyTZWvYWv4WaDP+19Dm24Dflu/75BpMVwIxftAQLHtjJLSBorkMmHXY3UKfjbE5JsNk2Zo/Fdp8K2JosViwYG5pfb3cNaBnd0RFEzgcpaD7ncxcgf0cz/psjM0xGSbL1rC1Yj/afI/NVp/YgDbfBNvT7kvfs+xt6dpEhjZbTFXNjjbf+j9vuIQs43cNSX5eFtI+ycWhY5WQy2SR4RFy4f9CSEQk8vkXM9CnZw66JMQJssyVWJqGH22eoNHptrOWaW7MMzN8cYCWy/f37d+AHjG0+ZIqUHvE/3+W2AUn9o/GE5qSMkB+JCw8iGiDVKRz5xgSHh4yMKKlHlKJGKzPxtgck2GyjYf8Z0KbfwaBFihApQomXrcxoUOr7WHhIeOyTuY5WZFXRcv/4BAtunZuKy03GDfnnL82kuPFIXVWq1CN/UeAAQD1VdSIkfwWeAAAAABJRU5ErkJggg==\")" });
                pers_inf = $('#pers_inf');
                pers_inf.css({ 'display': 'inline-block', 'vertical-align': 'top', 'font-size': 'large' });
                if (x > 0) {
                    pers_inf.css('color', 'green');
                }
                else {
                    pers_inf.css('color', 'red');
                }
                info_unit.css('height', '130px');
                break;
            }
            case 2: {
                var x = unitu[num].bonusu[41] ? unitu[num].bonusu[41] : '';
                x = x > 0 ? ('+' + x) : x;
                personal.append('<div id="pers_img"></div><div id="pers_inf">' + x + (x ? '%' : '') + '</div>');
                $('#pers_img').css({ 'height': '42px', 'display': 'inline-block', 'width': '65px', 'background': "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAqCAYAAADsxDbcAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAABFWSURBVHja5FoJdJRFtv567/SWzkoCAQKJQCI7CgMIIosmhkQctoAgq+wh7KDwnqLDMOqMEDSAgrIJRFYREYQBWYQxhLAFEglZyUL2rTvp9Frv1p+FJoPCO4eB53n3pE5VV917u/r+d6n6/ojyC/KhUWvg6ekNi7kWdSRbHT1/dlRoaB+1i9ILRkMJJDKGo0cvVMesif0UsL7NueQKJSoqymAwGODt5Y0nTSKR6EHTPakNotah/vM1aifr+/uIMVanIy8/D+UVFaRRwueDZ0fPL641VbDcrGTGHMmspjiOFdzeRPzJLC87mfG1OfMWFHNeLlNFBigqLhIUPunGKXL+AoyKnseHOmrjBoSEnFyy+sO7278/yr789hB7a+myHJFYvJ3WplBrMyJqPkZGL2w0gkB5+fkoLSvnQ/3WbVuYxVzEIl/vw7p09GJJ13YT32VqN4Vx105ebMyf+zCbtYRt37GNa9BXVFaREYqfqhGIAqhNGzF56tUDZ887Tl++xnYdO8lO/JLA9p06w2L37mNjZs25TTzcWp2aGkEqlcrBx1/vXnMlZGAX5CUfxKfroqDzboG83DIcP34BErkEAa19cTHxAAxFeci9eQBDQ57Hrj0xV8iF2kgkMjxlGhQx5o0lCxYuCmjl5QFXjQo9gzrARSlHXnEJkjOyUPV8r0A2ky2I2xALe21NkrOwdN/eHRQXCB0wONB/8+bPYLfLMXxcGN5esArnf7oGh8OOklITxbwGL7zUBYsWRmH/4dOQSOIRMfJ1/927vgolPUdnzJj7VH593JpP2vu08g8PHxMZIBFTnpIrkZqbCx+9OworHbCaLSgsK0FtTTW0Pj4tSaTbgc83cM9Jb9Ah/vCDJUhJvhxlt1Xgws8XMXvxNKxdsw6bY09kpyQXvHzr12JNabFRw8ebaG7NmhjimY7z5+LBZVKSE6NWr1z00M2m7dZNYzc6M94/ZjsM7NW3b0eT1QrmcKDCUIWyMiNu5+TCRSFDNSV7T1dXZFHu0+rd8Obc6L5cxlmBWC5XQOfpN8C7mQsOHfgE3/1wEPEX0slKDn/KnCfEYlRL5KjmYz7H1747cgCHvl2DZj4qQZbreBgFdPL/3Ll/jNRapndzLyqvQoWpFicvJSAtLwfeHu7U58JiMSGwtT+FvAg2MpJXy5a8jD1znxGWL4v0ksksLud/vgKRy8vIuJ2GK4kZw3jxkckklDR4EwljPsfX0olHpBiCn88lgsuueDvS62E7jf045VxOUiFOHMo9F9iuPUvLqGDpmZUsI7uSZd6pZNk5VSwnz8Dy7hpYfkE1KyiqYUUlNYxCkVVWmdlvqNXK5PKWvm0DdM30OkjFDOVUrXjZ9tKpoZDLIHdRQaVUYEx4GNLTMyBWa7Uk14xXisaccOlqtkrh7QW5OkCYKCqpgF6lvaNQyiAjA5QYKkDeAHdyJavNDnOt9Q7nEU4TKjEqa/KRkFWsmtDE9an7/MpPxsY5BVdSR/1eGPQqQkJ64ccf43H2ahIkUjFkFNAyqVT4Tpmsvq9vvp5ulH/BXLWKpgeDga+PGx8sJ9nI0FB+cIDVypCdk407RWXw9fLhYmju7oZT8aW091qo1GpEzpjZJ27jBh4SXwpGiP3ihGLKnDBo1VpETuoLmVwKO9VcO2NVIrK/u6sb8guKoXMBaE5Y4zycl8tUVlTiS9Lx2f1OLnwK7O7ROHEpvvw+Bm6IWTPH4Kste4QDCz+zOPcKqkgNY9T9wVhjYRqV3NkQzSRanTYnMx2TJo7H4T17EdKzBzbmZMG7mSda6PUC09zoaMCvFbQ6HSXKWohVKj+a7tjoCdSqTh5PwLy5Q7Bk+QicOH4FhhpDsKEGufyrxcITFKGASg1VVuFA1dzPDRMmD4TMIQKX5TqaPKHp3BBpl0udI+8+hp9P/oCtu37Aspj1ggdQrabMTk1GHkiNj+s8oq6NHvwiPtyyW/TZO7Od1WhEDodCLJHi+737BIO17vYcZi1ZAg+tK/TezVBJBznuyu9vj0N+UQnsxGOzWCVOOoIo3KUFWalFpptJt10ih8diw8638Nqo4PcO7Uk+3sAlkYiodNaFJV/TuSrQPXA+4vbPBpflOpx3Fjim6gvqvggcc2/uswkydr8BjqCkzIARg1+BWMSNXecFdb2YvrPOC/ian4+7YIAH5ARTLcXns916IKhrF5ira1BbXorWLf2QW1goGCC4SxdY7DZ0aOaBRLMZxkoDdK6ufC/meh0eUp74bFZbwpn4lP7jpvXHzDc2IWrpoN5ipHpTPBZJKV5NFgsUdKiinODdqo1vb87DeUmGK0ngOh5GsxcHCX3LTpQzll8X/W9LQBMPaCB7tcHo0Cnk0Gl0KCYjSOip51Bx69/xWcozdftyUaigVqkodEuhpN5NpWxUQM9TLK61Wvj408N7E9G7vx7vfhwCdw8ldO6ylSJeEagJFw3q+Rxf4zycl8tw2Xodv0vpSVnTnfvHRAo77UyhVELhooQLJT1XOhNwcqOKYLXbwdd0Khdo6cfLFRqUl5fBVGPiR1w156t1UFGpj/N9+XeqM68mpkOqNOJm0h3oPXUz7HaHzOFgUNMxlI/5HF/jPJyXy3DZeh2/SzxERB2vi+pD5XGRB6UrVZf27ajCSIWJG1cuY/GE8XRkvve05fQzlXI5ykoK4SDDMImMe6ILXzNbkd+YrRx227pj+++gLNMV48MiELNqJPSukoW1JhuVFpsw5nN8jfNwXi7zlO8MyuqqKqFcMKsdyTeTa5wXPb3rrvcaqgoSMoKLRiMYy1hjaCgKnH4VKyiepIIVRWtNJqV1cN/eaOnPYDbnQyyRTOOhQM4gjPkcX+M8nJfLcFmu4ymRL12Tdfx0eLcg/wyzWjbR3PaGVlJUtP1KfPw2q9V+nfYPjVYH/xa+GDb4JQGOaCyRVjpzc5evhxlk6akJ2LM/GafPF0OpUPj5+CpByZqSDPNbvPwUBvRNQo9OwQIvDwObzUbyoqdlhFNmo7FrTY2p860bN7Lpgc17APCiP/bDkZiP5Js6R7w8EIayUny985sMWjr/QI0qtfJsMx83pnfTsO7dA5iPj2eobwtvqt1S8DGf42uch/M2RWmeAp7As+AEnbv7Xt7zubEz5tTlATou/+mlQQ18U1sFBN7WuOr5nrdx7IGnqUZQxZnUGo2HSqVkvXq02xMR1kfu6+uJBiPwMZ/ja5yH8/4fMEIDuT3EY/g9YSq13k333K2dGKIHWuP/EXUOpLMEnbgoqdyFsdooXC4aQ8NF1zBs/+lHb0ZuipkSycdN1gQZrqO4pPiJeoCWKqCHVoY2PvfykZtODPVvg1zhL/Zv/zFjaVRJUsDsv5KuLCE7Sh10xybV4L2NbokNVGMyrY6eP+8+xPnY8VecEGcIiDOX4bK8PWkqqbI8Ehrdwku8pGu3rh8++6yYNhmwuKE4Dg3R0IWR33zo/v1HQ5wbPOER+MIpnb2zft0UVlW6n61a0bXAeX34ax5Qu5ChOFr8R0OcH8UI3ADUlsfGTKePxez2taXsbyu7FTrzjBruA41aClEF3arMdLuS0GHi2PGtmSEDX/Q35CdA46lrRJxvp+U2Is4t/DwExNlQUgVdi+dx7KezWa++MrmNnY6j7m6uT+ylCzdClYn91vpr9Hzn7lg/dOAbM1cB1YmIfGMhebss9cfThe2d+MKVCvEw6e5dXwVTPCeT3pA/EuLMHvwGij/9wRND1XPHv/UmOnQJhiH/FKZOeg/ZpXb4t1adE5K5SjEyfKh/+NZtYyMPxv0iw9yoN2e18pEhas74g0nJO1hEaEdWYbrMZkQN4YflLJIZUn/jUteNxVl8rbL2isB7I+VrRjp+4Doeh6vf3qWd5kjqxHj/e+Gg/ndslyN8mwvTN7Ml04LYib1T2N/f/xN7e15XtnHdSHb5X6PtoQNlmaNH9Epc+d4klpm6iJ0+EcrChgSlSHWefs/UI859GhDnHfcQ58A6yIuu0pRRHVbRCcqUHHFO++7IgQCOOJfQZeRREedHoSao9G/eOJ0KGaeNoyP7TRnyvEjq7VqN7MwMbPn8Fka+NR8LR40mtzmDvy6PtVktXv56nc6fWbLx8+lf8OG6lOs3bmCFWCazyJYvi9T+JxBnjhJztJijxhw95igyR5M5qszRZY4yc7SZo84cfeYoNEejOSrN0enfM5bVVuf+tJ/vP/5ozvS4HTOlKhndji0p0EisiIoOwbBRw+nzd4h5Pxb/WJ8lT8s1ICv7Gk6djne8uzKl/NcCHIqYGnRYytHiS1nFcoW3F3uciHOlwczKqHTeLSkXZBob7b5uTL3dAbvNgX6dOwnoMwdf6Wjfrw6dZv32ThM3Zr5uL2kE7LIBj6CCH65QiKdNHNk9bNG8WahImIxzJ68h0KuA9iODh18FHGUfYNjIk0jNdmBouBsOHTZQclRY/3vZS6zaaHKbsehkh3P7UyCtR4ulU+aE2R4X4sxRYYlYBE+9Dp6uuvpYBswWe+PYuZ88aVS9AZoAMd2dryfmBhSbGyE82F+6+OjBd/tt2nIIC6eHIDOrDM19/BD3Yw3UShHe/+sFephivNDvFSxfUYsVK/+FjkFe+HNEW5lEXIsxk07CzVt8aOoSPaT1aLGJ+trHhTgvW7tJtHTSGPbNP8/UPXHeyAMsFt5bYeGNxrb6tf/6y2eYOPbVfzOEM1rd4AkNL2DnzRrRr1VrMfJ+vYQJ48Nx4pIRM14zC+E6PCoTWqsnNsYuhavLLXzyyX6kpTP06ytDER0Mt6zP4p60ZeYy951U2SHNSi2ySkXSKuoLbibdbv64EGeODkePHcFyC8rgqM/q/AspsQr4BfcC3vM1jjpz9Hni2DCMrY8pMxl35BcPBiroq3tEDtZg5lsxaNGuN14cFoHDP64lA3vjL2svQKNR4Jvt78BYmYToxTtwKcGBwhKGqzeLkCiRQqKW36JkcVDs9BZgnlImZPYNM5cMdIyb1p//Uha1dBATQ+qtkCrIvVzIGyTgYz7H1zgP5yUZPj7DdTyOEsnLY0P7LR6FDGfjVmvZtpjuzJoxm0X0Ahva35eND2vDZoQp2Ngwd7ZhbTALCgSbOdGXjYhowXp082DbtvVnR759hU7C2q+Fa3QnHboG64Q3Imfq0eL9h/cmsv8k4vwo9CiotNmKdVsPmjCgXSpGT4jFirk9odfUYkq4BJMjm+NmWgXWfpqCiW8EIHxoB/ICM4Laa1GcX4UPVv0Sf+2G4Rvh0ERlXe2iwH3uJpZIM6bMbd+mVVs3XLtYiUvxRcjLqpRTabTylyJms03Wwt/V8lwvb3Tp6Yo7GeX4ct2tTIfd1va+f395Mv+rNPb1ntKd/XrL0ClQjgVrqjDkOS0K6AdnVEixeEkgTEYNNm5Khclkg6+3gspjzTdJqZWRjS9Fe9YBsU1jbl7LVto1I0b0x4CeXSkRVGLqrC1vl5ba/sZzgl4vWbZ5/aTVsLvi9MWr2LfvLHLuGOaT3NqnYATBEL4eip2DOlsRPbklbLUm9J9ZjOe6a9G6uQ7fHilKbNVSmSRmohvGatuhnEJjmrOe/r3qjCBuQIv/iIgz7WvX3VLzpPxSB9Ju5+CLg5VoS0e2oWEUAgWWSo3GsTM1o+pASkbFP5oa4L5/12lAi/+oiDMZYit5RnuxDMtCeyuQXQhcTMiHpRbZJeW2NFo//DAdQpG4ZwCgpsZ4blXMWRw6ehceHh7kDew1HjQlhWXCmM/xNc7DeRtf3jieHFbJwdHu7e7VN6oWyX2CJBjcR4OKCgeuX68m40imPooBHpQTBMSZOWwlnYJa7W3m4zku4XKqhZ+ZS4vK4OGpx/Pd28kLC0q+Tkq5M1IklnpWG42lzujtkwJHxfW7dwjnDSAjD3FqJXtGJJHu69DW46TDhotC6qBWWW2GsdoCD3c5dHoJbBYRnLf6PwIMAIG+Nt1+1+/RAAAAAElFTkSuQmCC\")" });
                pers_inf = $('#pers_inf');
                pers_inf.css({ 'display': 'inline-block', 'vertical-align': 'top', 'font-size': 'large' });
                if (x > 0) {
                    pers_inf.css('color', 'green');
                }
                else {
                    pers_inf.css('color', 'red');
                }
                info_unit.css('height', '130px');
                break;
            }
            case 3: {
                var x = unitu[num].bonusu[42] ? unitu[num].bonusu[42] : '';
                x = x > 0 ? ('+' + x) : x;
                personal.append('<div id="pers_img"></div><div id="pers_inf">' + x + (x ? '%' : '') + '</div>');
                $('#pers_img').css({ 'height': '42px', 'display': 'inline-block', 'width': '65px', 'background': "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAqCAYAAADsxDbcAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAABnXSURBVHja5Hp3fBPXtvUajUbVknsFYwwY08FU03sPIQkJxdRQE3oJJgRMDSQh5JFAaKZ3CJDQOziEFoMNtsHG2MYFF8lFltXLSKN3RjYJyeXm476b9+4f3/mxLTGaOTOzzt5rr71nKLwyKGIu/PMhFQMeUnhYHJIxHaPrM3a7YxPD0CgsrMSzLDUYhgLL/nGGjXOkGNGTgVbvQL2mYVAXlsOqqwDVPgOUJBQU5SQGCMgfgYA3ch2UAAKafCfbhWSDj48Eu/bsx+SJ4197Xe8Mex/JSSmIjm6D69d/Dh73QcsOHds1VEyZsyNt5OgJT/btOeQcP2kCdmzdDJfL5Z6zvm8gOPKdoqhAIf6FwXFQeirlX/dp32xqeLjzmsOBTVKJEPdpMwEB/+nxbqVGu3779q/qBQWGwWiowslTPZGQkGTnOG4L+X0hMQe/o39gIDJLSmC1WkELhXXeFAQRsSHePopuG7+fO7VZk1rYtnl9pY9CAYOFharM8p+8eaakRLX/0sUfR4b4+0LqYYTA/gyVpaXwr9cezSIbi5YtWTT306VrYsi+PYllqFQqBPj7Y8PX66HT6SyCNzgJD9RgT09px62bP509cMgUFObdgcJTQqVn6bDvSD4UCuF/DIHhI0buvJlwduTNK8cQFRWOH08eBi0PRmBEDxQVqTBixGCM/qAP1qycG7BjZ/wDcoicP06nrcL6JcuxceWasv/X1fMgvaOQM/OOxI/oNHDYuyjI2I3lq45CSPsYVGVWiMU0v18Asam8pxHbSizz77xRiw1o17Y11q//HDKZ+x7g4gh3MLbFXTq1GacrvImhA8MxadpFVOlY/HLrIWwOFuF1gnDlxj6YNWpUPL+AoYOjZJKj39426ugonaYSO7/6noQDbfwrEAYSYho4aYjXrLFTx6NJy0Z4/ugwpk37ElZapqsf6vmrweYjVOXkze49ruWod95u1Xbzpl8Scl8YzC8nmBIN9G0MmOx/vwfYWYdvm6gGXbKz7uPQ3ccYFjMUP+w9jf27TsFMLqGyygaFhxidujXFokVzcOFCCmj6AQa8PaTBzWvPO3v7+d6ZMP8j7Fm/xfzPQBhOrHfu482T47dshcWsx474XTCaKEydPQIeMrX4y3V35jZo2GPhrFn9Irp3tuPEiTTWzoqek+NYfoI1H0nRu7YDVUYXAn3cc3YldpbYbmJLiZnf+IbtNjRp2gyVlaXYu+tbws7eMJtsfSIiRZ2SHzxAn0GDkFeYjbXL99jKywyx5JD9xEzlpYZWuc9v7hTSaLHum68wc8IM9B7QWZqe/mCqSMTc0Wn1IKyJ14Gw6u2h0QsGdxHJgn0syMnKQklBLsbM+gy9+/dFRekx1/LYS7REEtrEWymAtjQZW7dm2zZsKT1o0GMlOV61KEaM2cNESPzFgRepVtSJDEJ4S8+VLjvnGdoqZF70MPGW9ZvonFohrr9Mya8OhxPw86LRoaUEHh4M8tSKSJeQ8VrzxRykZeRh+65rLr3O1pvseueVwwgHUC2T7+cnX7x8tvXRo1+gqLKK9g6o1blJqBYlRQwuOLg/ZIcO5IJmxC4cO3z1ygHisweOwmXLhI/UhalzhiCqd08Yyvfh88VHqd3HKpkGDTgw2Vrcva1HrtqeYXDiIJmjaPYwMRaPEUOjr749KQnhe2cLUGygknv18O7JstwDk1GUSmSB7F/w/tM8N72qaKRSysdsqkLXrh8jMNQbudmlC202+51/PNSFx2kFMZlPn6XKx38tPnR0EeExh5wijGJ3OthSm+7FSxDa8MQ2tG+9Dz5bNEfsfBaH29duIkhSHwYrA/9aJajIicM7wxNgdoowoL8nrl4zuNpF1WeXf9pDdPh4eth3W5+GzBouwsrxYpRXuSIZMbWPB/a3HCtwEfHjImLK3q7XgOEYM/Zt/HjiEtILVXBRBFBaAJFQSARXjREfFpJtcqLQavn7DqVpweFmLXvEFKsqcHD3GngE1BaFN/eBSMJAozWAdtGlcqEUIjEDvcUEJ+eEkqyAgAgvIpCKKjQ6zp3qCPQaXbGgvEArrag0sC/TX4SXFAsu/zj/vV8fPBavjn0f+QUaBPiF4OQNC1FXHGKX3oLOIMOocUMQHqpC3OoU9OoRRg0ZGCY6dzELBIAc2oO6zyu+Gv+e5GC5DoF1PeAdTJMLE8B4X8uLLfcgC4Bufd/CotiPsXXbfrKqUrdqJOqtWj0SRScWVWdvyv0Dv6CuUXycpz15MeXg8RRC1FXCPgOj0HdwFF6UlOLOlWy5g5xbQFSgTCKr8QFyrupPBQGHen9sR8glcpSUlOH4gQRRsB+D+CXhbhBajx/Vo3+7DkHiE4d2o1fn1rjvXR/j+ltAk5UbPjcfteqHYVf8HJh197Bi1WPo9SJ0Icx/6WwqfjxVWiZgqA3kOnNe8cFdQkbQrTTf2KG8kAUjokAWxy2J+UELGdy6cB5b449g7e4D1VKWeIGYrKKIYYgnkE9RtUfwINQLCcZbXTsc4RPOyxNkpOVbc7LyMH5yb9xPzsaNC4/DbU6L1GbG65RbZEiot2DyR/2IZLfi5o2HPD7GmlQbxoPQdOxgf+W6lTtgRS30ev99JMbtgd0mwzfbEomyUmJf/Fzk597Bp8tPIDWFgtFG4Zf7KuJylFPmTd+sUDkTOeJYJpIJBG7ZgGfEov/A8Bx1g3NRPRlGhJ8vn8aGTafAOmm83b3Xb3VDtRdQbk94CZhMIkZwgNdpq80eoyQp75VQr1AXl2P0O+vIIgXg3ZEtpuz4Vndco7EkC/C7BuTIjgPfafCZQiliOjePxebt41FWrOMBsNLkXIFKkT8PguvytTOu2hF1MXd2d8z8MBbFWilyX3iAsAd8vATYuXcbdu/OQvcutYhLEwcj8Tp3bnNkZWj1y1c9uETmyPunQod4QLdhYQhp6AmSHUApKMj3VkaQ0Mih/wVm9PFRkNCJR+zCBS835SWl5pqju0fK9m6+hS49w318/ZUNNRpz8p+I0aNOeHCHT6YeoIZP6IRbDzL5oHwU7MPg2OIGJIU7KR6yA4fOs4VRocWYOWcLYoZGoFaAC+MGCjD+gyCkZFRi7/4cfDylETp3DkeV3o6IenLc/eWFdf23Kee0Ou72y9PtPGdH3E4b/L0o9/9ZmwuNO0hgs5AqMzF7ucPu0BWmlGw4MKeoJMjHCafr39JL1+/dfH7XZCzH0i97oGO3cMg86OkCWhhGk1DiTUDCSa5gFnt7i2Wfre2Lth0VuPBTCh8u8Rw5ubbMDF2Fxc0JORkvuJgZcZaT/btJasGeiydZBkgpGzRVdnj5yLFgQQOoikX4ZmMGYW0gK73KqC63rpTJhOsB25te9C1iXv+Tu1UolThBUvb8j6e9urnEyXI3UpML+9SuK0RxgR0cJegiljD1WLuzwE2ohGu8/ZQTM58WM1HRnkh9qIW6yMzXu1dZwqLZBSYYrb+LpcRbmc6RT4rpk0lp+oCv59UGAzt6zzKhFREn+/aUOi5crbgfHiZ97LC77pcU284GBAjLbbb//QJJ7iHH9bNn8MnEDxERFAoVKZErTIaXP198eE813E8Z2Or9t3oipp8csXEHJ6ZnlKSJRLTGamU/XLt0iMJbEYKExBRcPZXGwuXcxh9oJSAk5FphtXO2V6vI21qDfVyJxlWV+7wYu05Xoa4fhf59I1BWai8XSxwHc/INR2ia2k0QLhcIJCT1+f6x3BRS2HjShrUHbPBVUv82ABKZDPcSbiB24nj4ktKX15cMySICwW9skmK14F6ziBZoExVIWLUEnIsdSUIiSEDThKSF421WtTwk1IFeHdvDZpXwUj2eP9DGckhKNyE5w5z9Z9l8+X42VovPYc2QLiJJvppC0kO1y25Fvs7ApYsYwS88kxvNDmTm6hHdvh68u0WC7y7x2iInp5RcJIV1R2zw9BSQ2oHC/yTshSSDFOY8xYrJo6Hw8oanz+9gOwmjess9IJPLiHCzw2Bk6arKPBw79gynLmajUguhUiFzpxGJWBy86su76NrxGdq1aMLrDaGfv1+1/iC5kbNoQfSYxQ0CH+eCmoVjHXjWrqHA0aeTB05c1yC3zGzxVTB8mfzETtDLL6mC+xSuv1a9S7ZZsMTdXhNiRAOSIq1/tTdJi5wRTSr7IaxxGG5cKcTyFd5QEgBeuzfhc76oMlmNRMtQ6cdOp9icTk5cK8SHeCO71GKxp/OcQPTH2JAQn8uXrpd7Xbt5GyaT5S6fW2mhCMF1m0LvIKnLavvHAooAcn7rWe7wvqvqtrRQeDIyXHTZanU9+dNuSmLjatpV2/4yptudBRN8EK7Kva+26RDk64PA4NokRJ3ECEL3O8ElYv5qqhC+vOd1ktVqudejew+U6bR4+OjhRoPe2r9uqF9UeHidgfrUtNRmUTQG9AhFckqZV+aLylXwkryXpTZ0EFB0TEOJFfWa10NyOdE0pCoTlVdAKGKqhYrrpaatHtP+os/o7eOl+K92HZpMCAtznnE4sE0qJViSlczJeU35YlNB0nIPlHW+RxnfCSGhK+Jc7iYnufs3DpEqbZVxypyZHeYvX7pzcsyYghclqolEC9+QM2IY7JZpWc9LJhPjmsgQKKT9PjVbnZMWTWykkIpZmKtsyMiowp6rFZfvplp5ofEzH6hWcjPtB/SH0M66SOwQtUYk2p+AqI5Bkk8fpJe6Q4zvM/r7e/Xcsn3+hPp1fbBj2watj6cSehOL0oq/p8/ocFIID3Eifpkek1co4aWoZhWxRCxIvv+gKiMjgz186sew8+fPX18095OLPoxkNK2U992hCFxwtTxveYORcnz8cVPIfB2w/1yEeQcteKRyIIA2YHwv79adm4qv/ZDiSuHTNU3TbEVFeWOaT6dCulqy2liXmxt48tObXTBZOBSqTS8brW/5+np0271j2Yx+g0bhcfIelFVUpj16oj918Vop/HzFKCwiMUomeBXLt4e+h+YtWoCkK7fWdTuA65XWPv/FRaKqeCN4Rlf6KqFR6xDs50LbJg6cuCaBVExqC4axFubmF+l0unZtunYNrVOvERq2aBbxLDenQfCz7O7Ty9X18xkbhq6LhDxbhaHTi/HRMTY3w+adXCYKWpOH4KQj94yWF1pp5IbFHUNqhdT2uZJcqHaajFv/gRMIMRKF8AeP4PPRMB9P0bxju2La9R4yGNkp8Vix+jgpcvwMRSVmd+FDRnBNGClr+ozZf7dmICtXptdW3U1PSW3VPrq9tFBdnpmaX1K8ROlsFqp3ItslQscRBWabg4GlTNNX5Ol99w/PUkh20Oiscwd8cneVl1golYqJc7Osu9IYDXekvna8RcqE76cP8z187tjMdq3bt0Hm/b2YOulLUhDJtIEhXolyZbBYrzN/Mmhw0/Prvhy4PCRI1vhl62zT9/EYP34MqTrN//INsxyFEE8b9s4uRNzHZmh0AkjlMs2D23cOHt+99+G48R8+y8ktkh47t392t66NGp4gjpbkH7HDJfaoRXEuvht79zX9FQepUndFR7VmXpSU5wooQXN3N3napDYde3cLlb/Vvz7kMubVvB5Dytl38x5v+cgrIBgGvRZbt8Tj4A8JmLVwND6ZEyXJzSmIbdy4XvqmjdO+nji2fpQQOpZlRXwxxX7zzXeYOWMKtNo3BoB3p8U1AL71cqPZSqFXOxYrp+tQWE7uVMRor1+/kWC5+jMdVf4wrEejBjjYMoYaExrxQ6FcHifiuKrXts1JiK+fMxWzJk7l2kfWr3KYDQ5zQTYs6iKSIjkHS1Ee9ss3nsNICK7Gfb56b1in2W8RJe6rMCIzIwPq4gKMm70U3Xv3IPr7ELd80XniT6HNvIkyrFQnYdOmZ9aN28r3moxYvWr12rL582cT4WJ9o7u3OSiM/ipElvKDZK2L3GfDNvW/1qot5279lI3AVzqALMdFB8sVBzopvBp0K8xD5Naj+ElP4ZPd+2HTVQw/c/L4JrGIKVUqBMir4FA/rCEqWTNsJBudXjQJYrfaFFAVlVopUZNCCRFlCgKBcNeB1HMkLMprztOZ7zPGLZ34ftxnvZjT+48QgsiEP5l0xoJ30LxbF1SpdmHVpz8I9p2oEkRGElLNqsTtX/TILbU/IQAcXLw4ThW3dDF0BttmMt/0NwGBB55lXY5bZ4t+DfSjoy9drUys5UGyVo0e41O40WaFyVX1a3hB+eHVFJbpCLs+Ihlt9aEjv0ZwAnbjt991MOsqb125fLmTiKbuNW/VmqQUKaTaYhxbEwepSOxu3hChRf4J5EIS506SsrMrSyEkwPP1t83dD6Qw9YNBke8tWjCDsTxZiNvXEhEkCYeJFSGg9guoni7BOyN+hpMWo18/Ja7f0Lui20awKxb3EO05lFZ3686sIGn1s5F1Vrt9enF5JQwmC0mzHOxEmLCEdVn+01HzyTrRqVlTDHu/D7r07C/kuIPRFOFhscA1nlzvb09f9SbX0zH9RGM0eu7h7nPCwh2jgvCswoYr2ZKisozSmTnnLxiXBwZtWxS7qIdWo7l7P/FeS3JYmjvGSMb59ORZbIgZ5v5e3cYji0f+SMUiBPp6E19g3fm/sZ8HFlw+tXBows0k0bIF76GgoBKBhAt+TLCSy3Ji7sKbJFwUmDR1KIL8i7D88zT061WXGty/jujEqacgAGQuWbbgfNySVbFGk30h3xGKqB3sRr/6YQnnBqM6RVanSr4QmjY1Bu279CIb2WruItsZCY3I9t7uJ9xChoODtTc2O/FJl1aKmKb1/aQjB3hh33kjbt8r2Bddy5icLwrHkTPnPxO4uHWfr/2qy7zZ01NVZeWNiI569kd/e2kkH5CigSffOsESohjFVKnd5ho0cWyfflGt/UQHdyShf+9o3PNyYuIgK9HoToyYl4sGzepjz66Z0JbdwrIVj2E2i1E31IUzJx/ipzPlajIz32fkSWAdMb9riY8WPs7Nc+sO3gPsdt5YAgbr/u4g26ysHXMWfYEZkz9Alx7da+oCsr/ViWf3K9xCzdNPiBadpE9zikQrfn3m0bJPe2Ye9BYkJWpRboO6dk3HzUMuu3fszNnPhELh+lVr1rZfu/aLzAJVFala8JzvOH88ZjJ2HN5d08ylOMolQC0/GlPfJpwgJwmB1CKtxg7yk3++ZDsgrYce772L24t3wmJR4IvvkxBWxx97t89GZnoCFq84hbQ0Chbizj//qiLCyN1nTKhUO5M+X/UNUZ1yfL56ZWxUw/ryEF+/6QaT1Q0+35XjeLnMVXsDVyOd9QYrNu84htmTh2LcRIE7O9k4KpOiXI1/y2xko5gRIFgpnhjkLwq/nMXhRjaVKFV6JzynPGGmJO4us1wmu3X4p1OLxSLRuokTP2y9PX5XTm6FcxP/WN7hdNq6jZ6ExBMHXIQPHJH1wtwg+HqQstNodbur69LVUwiLCEfs0M6YGrMAGrMSBSVSyHg1KeewZftm7N2fje6dSdFDYoiRiTB3TjOkPayoWrUm+SKZ48Wf+G5Gjb1h+Ux5dh1Su8qdHTqEgGQHnInPhqe7WUpAICsYIKUFSp0deXkCFNrEp0M97Ol/rtVlUumNvT8cX0KA+HLQwAEtt+Y+n0XwjiDrMJSPyt9qIEF1zeTH0BCw7tcWsO/gOVbVNqwQH83cgkkjGiPIz4EPB9MYPSwIiSkVOHQ0F7M+aoIOHcII87OICJfh5+v5lg0bU8/oDNzdf0cJihgXTiwqMec/LvyM8IYlK/n5Qi2JsOZdZMSDOFRqRHiSKoOxygi1yghNFQsDJTeUwQullDcMDpp4i7M63PmnXhLJ5fhDh+PUmopnh8+exg9LlgxghMKvedFJeIgjylMlYyQUQwlRWWb6rZR+mJrrjJkZZznZr5skgLU8R1qmAR5CO9QVdgSFKDB/fgQKcmls+z6DFFwCpKdq9eUa6xKZXPj9KwD/O4Nnxi9qrKZT5UKJikZSHg2hwEiKK0KUnAilZg8Sx3IHRyjdaLXh3fbNMLhtU7RuWA/zNu/Dw+xcvqFybvvBw0y7tm22iUePDjhns83eAUzcOmpC4LBt31kzC19QRqMQz5XWP/QTbidkOEelFdMnejYzeH8XWwsOQhZ9Z5vQoa0Uu+JV7MXrFYn1wqSPjTpnYrHdei4wkNFUP4P++4eQrKqaXOSeRzQ85eYaUeUilOiEibOUUJx0ICjhU7L55stjKg1GrJk8Cp5EYIz7ahPy1OU/TVmwMPKAybzyBnG4CYQ/13KcqkRdmiT0kPrwr6gk5Jjx5zdVbmh09gklGs6Yk1OMPWd0iAgWoE+fCJSqbSqRyHHgeYHxME27nzNq/jcbrPzDF5PFiQdPTXiUaXZbUrrpam4Je1RhqghRWCsbWm02SZ/I2mgU7EcA+r03oTeZse/TGYT4vIk2EOaNadbWWYdM+F/ktzijSZkcu6xXaUGJoDCrCMmZVrzudZ0zdzOxdvcFsI3DiJgIECIpWcURp8g3mLjHZK7b/6lXc0Q0tE9UuCIMDke7JgFhZoN1Nsl3LV63r9FsRfyCabi0fukxP4b7aHLTtmwvQhqr+CfPTgfRn9RpG0mTRhJTwlf7i783M5EZHUk7e0Z7MEeuaJBfbtZ7y4T8c8D/k3fURIQL0goYDN9cGz4NuN8Ke37F8kzWe0VoeDduTutOHvsvDyqvsA+oYcTXLShndzi44ytjWR1cVTGLv/bf9CQZbcMbamRF+ct4UeISSV77kgYvpn767ifn0Z0X1c1ohjneKFx8xWhy/t+9pEcujl8rh/opyv7x18zzFy2/3k3L6cTvpynI2/TLtUvHah7svEyYnEgkDmMYIiXdGUHg75aKlMA1OTxyJFOhngapjIgxJww6LaiXsvb/5/HfAgwACmJl3a0RNTIAAAAASUVORK5CYII=\")" });
                pers_inf = $('#pers_inf');
                pers_inf.css({ 'display': 'inline-block', 'vertical-align': 'top', 'font-size': 'large' });
                if (x > 0) {
                    pers_inf.css('color', 'green');
                }
                else {
                    pers_inf.css('color', 'red');
                }
                info_unit.css('height', '130px');
                break;
            }
            case 4: {
                var x = unitu[num].bonusu[43] ? unitu[num].bonusu[43] : '';
                x = x > 0 ? ('+' + x) : x;
                personal.append('<div id="pers_img"></div><div id="pers_inf">' + x + (x ? '%' : '') + '</div>');
                $('#pers_img').css({ 'height': '42px', 'display': 'inline-block', 'width': '65px', 'background': "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAqCAYAAADsxDbcAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAABkGSURBVHjazFoHeBTl1n5ndrbvJtkkmwZpJIQEAgRCEbhAuEpRUIqIoNLBixRRsCBcVFQQaYpIkyJdihRDEUgQkKaEmkA6SUgvm2R7ndn5v9kEAojX63/1/v88HBZ2vvlmvvOd8573vDtUjDY40OZydtdZzQcT2ydAGxCIlOPHYeacuHeEiYF+3bzxdP9Q3C0ydr2ea+yRkW223qhiD4zt6V2dmW1EeGwkbhv8YHA3XSccLo5CXIgD+6cXwiX2hibAB0UZOWDCJgKxG0GxBlA0QP6ApmliwicFinxJi4TvKYjFtGeMSiWF1s8P9fV1nrkpYjx++/BWUXBzfLDKRzMpvk3ITaeTTZZKGaSnl6KqygA333A1c6u8OExfW3dgyccL646fODGbOGFL4xy+xMYRu03sJ2JvGMzszDHPRgS+6cfDZXCgKN+4dvuPupJ0Du+S8/uIsfh/dLhcfERUhPbrLl2j+gYGsp+wLJLVKgkqyqtQWdU0jtmweo0tpHlz59KvVvqOvpn+zeRxE6Zq5MqxSpWv/yyFZg5tqNWW9nTg/XcT4BtFQuJyKZZ8bsaRPA5KsovjenuFdpqg3XXgJj2XN3icEEtM/n+8fj9i/WPjwoZv/WZOX4e1Egf27TT5+3ihqt4MvfHhaGW+XLCwulXb+KNtExOHhkbHYtGqrzqvX/XFhsKD31f1qdRp8xkWrV9oDV+nDpOHVmHbLapC7qspZLw030ImZs4kl3cOZpzDti5IiB/sCMIbqy84Wc7tmZwlqdBC68R3M+6izsxA7fNfcYCPxwExQUM2blg2ND6hFY7snQdfrRLfHy2HxU5BoRA97ASKps12q+1CVnpGUmIXqcbudJafz8jLGK5EfGcHi1Q3g0VvVzp4Xs5YawwTRFLZNhFNPTSJiHK/OPKjays0MnEIB1nTCf53kvbPP5TERsdFqWfs2Ta1ZdtO7fDj4cVYuuI4wRN/6927JoSEamCxIIaMm0VsiscJrNNlLS4o2L1pxRd/+yG+dWKZ3m7Yd2T3FH75DHfqmhM4Hhx23K2WvCrS15f81p05t3tPz66dF5z68QzE/oFqnkCWn4pD8owC3PzZDotLRUa5/8rFC54f5q3E86+/HDFs+NgxiGkVitMHP8N787dA5edTEhQSmJ5fLA6oqzW8Nv31pDGFuTUt7jvB6XYLMGu7lZl1SXcjI3xEUrsObQkk7u45hZ56IPeC0tf3DYVdX+J4zJ0tNjvmjRuJQG81mYPSnz2V6rSVFEJFEOHYAsBkpB4N0y+EUCU2iNjVP9EBE1rHhvY7sX/24A3rNqOMPMOB7w+RIPTCoqXjkZ971XvXnuIvevfuHTRyRHRwVGQNvswp4e6ng4N1h/lLpXuT/LRdO1eWo8v3qTg/eDy67U/GigX/7PHR/Hm9vb1UOVAp4KjToVlIJDi5BCVmC759cyJahQSQMsiBYRiZTCKVcAQPGLGweBfxC/GuyY28ay70nRQbx1vZsRQJ2Ou1zd/+LtV75KZ1QG3d/371JNPkUplk88ujnhg5vK8vaLcOF8+lo76uDpPe+hjtEmJw+/pqbuPaIoWXOqKDt9KJ8qLz2Lkj07hjj/Hz5asanVDlMBSHlRtWLKwo2WMmdTOPPPjKny7kGIcNLdi6bXsvc13N+hXLl0Epl34dE9saYpWWTJSNnbOnIi40BE6Xy1PTialpkQgyqQgpSx1wNRZLodYbdHZs+/hGvcRXVpXUVSW99os5Vuol+qNoEU3sTuO/BS8/J5dJpq1a9WbfV15siZR9++G2ZqFluAhvzXkFYfFRKM5aifnvJIuOnXOiXdtycJmlSD1hREEd+7OTx857EwscBRX+0pK1kyOwckwopnQKq7/mo52f/svll9754MNjTz/9NMaMHr3eaDSOuneRl1yGj4+cxF2yjWJGcAA8xhDAZBpAkyH29gPQyJOvsyQ0H+hiXT4xcW3bZ+blYMEHc2BleZy6cg0Xb9/GL5mZuJKdi+t5d5BRWICsorvILilGtb4ebjefT+YJaXyEZxRy0eTXxvXoO3H8CJScWY4zKeeRfvk23BIVAb/ruHpqNvo/sxf1DhpdusiRnWNwd+rYwrF+zWD0TAxuKRHhfq1ivp4XCZmIFo9M0iAt34XDZ+6e7eyn31cVFITUC7/8k3IvF8+f/dYQs8m0K+VUql2jCjjYtDnUwyY4gKaFRctJUC1hJDRiOvtDJKIIy3OipsLeUDpJ9MTGt0dmfgZSDu/AP6ZMh9Fo9qQP1QgjErHIcx3l8XDDHchRRmxUXDgzOXnv3D5bth/BzPHPobTMhNBmzXCSgLDNZMaLo0+QC4LxycJh0Ndl4vOvCjB0UEu6T88A6Wcr0nD0h4pL/kF04X0n8G6Eq3xEK8RiHtfP1uCuBbXhvo31RqHI/fHCxbli5gvJ669OeoZixAfOXroxmJxK9vL2wqxXp2Plik/RLCJMeEiOIZyXpz2hYCPP/g7rdC/JTdMRvKBgJ+mh8JM23FQsRm5mOrq1i0ZAq04YN/cjeKvVhB4zkErE5FMMiUQwhkQa4wmlob17oFWLZgFut3v61MmDe4WGUlRNYTpeeGEgLmfqMW0Yi5vZZoyfV4RBQ7thyScjkXE1GevW5JL7eSE4wIn1qy7geKohV6akVpIpdfedEOgl0Wo14sScOhE2/kIVaH3VO/NpJRwEwUSkrKkUiqwTZ87OkUqkoheefaa/xWr//uKPJYeIq6f4qNVVA19/G0c2rEJ4cBDbIrQ5WFaoI1kCIixtNM/h5tHN6aYuihkx8rNvITLsCYx/7R0Ul5Rh9MDn7vcNFHWvh6A8xpOQCtFqyCK00XERwTVOoz5xeB+VaPbM9YiI74luA57C2XNrUFzugyWrb6L/U22xctnLOHF0Hz5efBZZ2SRFZWYcP0ewi+OdCjV9VKd337FbmiCJEbOgvJ1uVOc7kGOVX41U208/ikgqpTIj+eTJuTKZlOndq+ff87IyhzhZtgWJ1mfJ6eJ7YC0kvoun8eamOKz6R2bD4kkh8g6SYfikWJDqAKE6dCzR77l1iRv5h2CROMdBqrmDB3/y1AH0SGqFgb2jMPyZGZB4NUfpZjOC/SQEk+rwz/eX4vgPpXiicyjxqA1RrXwweWIskg8VVqxac/t7Mlvtg1PTBp0NuioLqnQOEsPy2mqCF9XQQO+WkAWwDTnZ4Ihre5MPv3fp6tWLn2/agNNr1rUL8/UTwkrbsHOiSrlY6iZGyRmJBw6FXZSrabTsSML/Ul5W5d3qrXads7KDX8nSzyYaUWsU/Xs8WKNBQnwMiksrBcq1btdhmzOxWRamzNyCuTM6QettxesvyjHgSS32Hy3D+XPVeHdWAlpEB4AjzxAWLMW+3VmGTVty9todyHp0fvpOiYUgsB1FegoipcLllqlgpqVo3yoGiyeOxNFP5+DZ7okwWmyCI9J2Hz7ydtrtzNtlgwdjQ37+kK+A6j0Tp/kbdDrLnYpyZ25ZKX+zoAIjP9NCLnmoCuobu9Lg/5AoHT2Zxo5771OHu3uCBLrqXFy5pceuI5XYsr8GXbv6Yf789sjJ5/DN1nxISXSeO1NVdfGibgzpGd4h11f/ygnniuyOK8U2GIxWI8WxkWTrX3lwQB1B28kDn8TNr5eiZ3wsJFLZpXc/+mTRLzk5uj1CsSamAcpLK6pkvERspOVS0Aop6lkFRq1sBpX0z6fLxLV7Dv7CTvhsG4uUczbsWhyGDnEMjvzsgp00SJ8uKrQsWpqZyvPUypISx/PFJfZoMUMl/9Z89NVMa15WkWOhxG7y8rVUxjlYTtkxxAc9YsJgdTbJA7WkhC2e/DL6JLSGwukq/kdcB5tMrsQKcm46IC6du6Bv6e1cZUVeEQSryi/E7YwyvHVQQRzxp3dRghyyo6LWOb1c58KN9BLsSzHhibZKdO0SAV2NLYdg4LbiMstmhqEPkPHmfzUZLaJhqzDicAkfhP5/iwy31FteItHQ73GDa40m/POV53F5w2fnewaqxk2IblPRSSrHp+Tc8wQ/CAc84OQpt4sXALLRQP1VTZPA0Dcdu4J1B85S6NxGBilx9rXr1azTQRU6XbhMqks6Q9C71uDEpat6wiccj52IQXBL1LrYomxz8HcLZgwYrg091+vEhbqejUyPftwu1BlN7hXTJrGMWml8buFadlHKUaZPREsYq8unUzzP+rSIuj9Yx1F4fmWjvPY7q2JpLYKqpiEh9BIMNTpkKzbDrujRQJ4YoWUnD8w8FA6sUoacpPYMWscpseFQLWR6WxbpY14VMtlgckKw3y08YV6+QnHW8jLZSi5AO4omfYCppuqIoaLsQ3I+4AFlgGMYSTAlkkTGN2daKqWIKq5wCrT0FhMUOpbX62YTbrtW27wFa8HDN3awFFmYFcfm1cGt8PNojJKISRC12QDOYQAhbOAZbyBnKti7axFOKoGh1ghjnQk0Z4H3Uxno3nsYCu/kPeSEe8WDkLTdcimvkitk22MifFMrqm13Mgvq/o2catQYWw/ojx/27IqrqqgcteiDD2vOnDs3s2P7hG9Tq6th5Vz+QptKLC1CgrR+PRRvdu8WNP257gH+Gh8eToMDBXmGJ7adqik8fqG2IqpdFJ9Bqsyj0gHP2SHWdAbdYwd0OjNUzXgIHbybOOD3DkbphQuL2iNlgQK9Z9Go0Lk9pOqRqjNAIFZmqwunfi67J648SaxPY78hKIqnG03/q3vodDXY+vUGq19gALfy63XaK2lXdk2ZOHmGv0I12qaURs5X+r5jqK/2Mz7JYe5b7eETQWr7z6X4ZLkFJws4qDkDxid5R3Zuqd23/yaV0ejeSKHP+jMBwGzjcXGNCh0nmqA38/d7jAZRh9Q9vfuecBPq7eMztt+QoS927ZUUGRoWqiwtK3VuW7e2881LlxLI+ZPErggB2pQOsW0gL68Mie/Sef3SzRsG+fgG4MrVNKxd+fmZ8sNHTetdrmeviTmE7Y7Hk14cxs6vwe5sqkzhqykUqTXfEs4ps1SWdQmTsUO3LOgmKTFq8eaa80ZB8RZu4HQ5EU/ukbJ/H2p0VuIjt9ARNkQC+Ut47H+VDhKZCDdOmxHdQQ65soFatxljhs3B/xrfyCkfP7/hk2a/PWngwEFBdosVVhvhNwo5dCYjodBZ9p1r1uwrzM7aSsb+TPbL0nAh7+HqRpvFcjHrZkbPTl07eZustpKLt+9kjlbxHdvbOBwgw16fUWHn3VKxpUb/EiNX7qUf0Bk9+j/vHj38g6vLNDImAI06I8uyaBkZjZTv9qG23vpX64typVo9Yty0GVMnjx/v40f4ilwqhVQsBetmkXu3BC4XJxsybsKo/Zu+Zorz8oTW3HLPe6Rbk5jvZOfs2rLyyx6HIsPjDZzE+t3R3VPpxa+5T2w8jdRmEcm8kn6NMhjKf+sJyK5u7/lE549TTv3olAUEe3Mc52lvzx9NRm2d7a92gNB6dWiV0PHpPk8P8OGJ820uESrqauHn5eNRvvRmE3kOHaQqFUOsLblGsLuei22VpbCRQRxNWa/fTL+Qs+eAIcmUF9cxUIq07pPpgcEtTt/y0cySc9xjHWAlZPyDSS/jnakzkNShrZ5mnU7L3XyoHRZcSjkBo8nxRxeU0Kgb7Gwgo4+SA+DGJhVE9CNRoFL2bZ+YGGki4S/oFfUGE0rKdYQj6D3dqFQigd1mhY78f9DIl6LCo6MH3vegDyMjpMYdpZHJjg8OCl40XSJq13/fcfw4dAL6DR2IRe/O6iOpLe3mTZAoUKmAmHIjvHkkFIQt6kk/sfP1MejXPhYdIpsjsUWojNxMLOgBjJj5Q3K7P4HReVu98Etls1nyAGlIYKj2pZhuMe3yb7CwGN0PAeHjigjFMOFQqLx0eiPu1lTj1JU0UpqdoBkRispLodX4wN/XHza7E17+/nKFStXy/sV5tZ7fo+6QpvPLheXFW0wE3LPJHZenns7khj9f8s03W3qZ63Xb165ZDYVMsiO2dTwpW36oKMrGnjkz0SJQCxfLenRGodkk+EIJXd+NW7mwWh2hD7Tavy8bywkIXq7N6B/trPspzeK26Wx1SnGDTvl7jSYJhebNIiNpP6UcLOdCTV0dwvw08FerQAAPFEHUPl27ILuIUHoSJSKZLLBJVCEDq2rrURwoK1k3JBhVpOc/nCWqrcg1zbFduHjp3Q8XbHj/jZlDdNVV2/fs3mXy1vgJ/TjUMik+SD6OZWNeRJCXWvjtoWHCJp1R6+b54hq9AVV1eg/HdbKcAE7EWI/jhFy12Jzo0rYdvv7kfVy/dRPT+nRo63JlQULxQg1Lf2Sx84gtE4rOA9+Jya4+NWDYsBYaEqkj+vVFma4eJqOVRAIHk82F0IAQBHp7oaisDHXEOWJvb/Qa8Ez8fSeEBcuw4NVwqKWMZGSSL87ccuLY2aITXbSGwxXiEBw/c34e7eaYuW/OGmQ2mQ5duHTpaW+l9vjjdUYCsjIZn3YzS+1yOavFJHGD/TUIJo4W6APHEYLl4u53QMJ3Xl4qbNq4Dtdv30Trdokkn4826pBuNI/xgq+fxIMDYqlDGL+QnFonUOIHfwCjaVEgrVAqzhAMqiLzfPbJQrhiW+JKbg5CgkhLT0LpxA8/YG9KKpwKFVSEdnIPgArz6nMSktt8dEgAs5imOVz7qQalVtSGN0KSUqnMPHH2p7mEj0unTZvWVySR/vDztay+5FSqWq3GzAmv4avVK6ANChQqhNvNslS3xLamK+nZAYWlFdUHTl/wsG5h551OwVwkElxweD5ZGMxmDOrzJOJi7uJs2jX0SZI0Sl40SnONqBV7fl1Gu55KyBT0POI38681J15FqLPY4XBgycJFWLZsOboPHoaVK5bj+wOHMOqF4Z6BT78yDjFdW5FnsJLyzTU5wU/FQEJTwUG+kvYZ1SJsv4pcX43XnnxaBbtHZ+QEnTHjaOqpOTKJVDRkyJC/k4qQcuVc8V6ymdPUSqWu35SZSNmyDv4abzYqrDlPokEgRDUKqTRsSK8exeXV9R6FqoEk8R6SJESChzARpsSyPEZPehOV+iXIyVyLwe2UcPJOgUglkWc8+3stAJnPRlKPa03SKjf6Z9gISZISkqYmYV9QUNDwjkV0NFpHhUMlFiG30gAfmaSpvvqTL/2lItrbzqEy34k8m/ySmOYvPEZnvLb/2LH3Tpw5e/bvSUm8Rhs0guU4IS2CHupJSJhZCBC9/PwzkMnkJb/W5X/b7HaOSujsuz2oSxBeGBtF2GkCfALlHp3yXx3ECZzDanVrFAooFEoPSFsJL6gj/Y8XiVbPbosYeKm8wJGKUV1Z7onM+5FQV22BxSlCDU+jyiSDjVLUVTe+XiDQWUb4ia1R9SWOuLzz4KG53LODPv9q25YureSKxNFJvVfCaJxC8rKeWIVcLA1hKRHI5x8iBzoTjYVjjZBUlK6wVSueJLT5DKHN6dEJDMz1NBobPohIpWg33gyuqUkjEAqpm6IZqVxGKowcKgLUCuIQQVqTMw2lhUQzvAl9tiu8PNzGaDQ+qDHaUSDojMU2FBvo+zqjiZIgsXUsFk8ahWOL30PfTu1gstqFyS7uOHjorRtZWbnlAwdia0nJiC8IUO0YM9nHbDDa8srKnMSQlpGO5wf3hUql/qNk6QaxZsReJlb/77BFskF+cplU1iYqSugB4LDbcer7Q4S7RGDSq6/CPzDQ03MoSJrarWZYSR9BCETTBKfzrfip0G67UmIj7M5aT7nZOBJPIx7SGY1mTB8yADfWL0HnVtGQymTnZr3/4ac3CovqdwuqUkPvWllWUcVTMomZIrydUhDz5N2fJ63JJBTpIn/dPJF0kNnMZlKMaJjqDVxJUZH93jnSEpDI8PL8oCMjJVRCIkVKzOGyN6XD1Ww7qae4zdqky3rKDW9pLGycVRqs6BLqhyeimsPudD2kM34+dQymfbkJl7Pyiie26WjfePsaljlsmE1Ccs+cD/qWSSV19yK1LKcQA3o/gW2HTsGgr/+r+gYh3kPIYhm1UmGprKo42UjQhFd23E6nE0V5eS6rPiCQFjE9JDJa4+/riz5dOjVFgtktAwFCS7EeR6sJL3iqW3i4RW8dQ9A86XF3FKLio/Ev4uK6T3/s5CsbP75VO103iRQfkXMjOZbkLnXwnr7Ii8TIL8jHuBHPwEfj+x+tVC2nkDjZ7NESHjkcpDyk2i2W0vraOpGpvv688JKZ8MYKsbGNNqm6pnrDjfR0Yzey+AG9uuNqWpPqz/Bi0vYGRaLGasvNtTZPfv+1p57zDT7T59xVc+9GAvRYnVFvMrtXvzGFJSBhGLxgFbfszEnR3yJj4KwsnXofxf6sl5BUFLr8w4zqx2vGDs7l2rV/80bq2N7dieT/139jmqzNa9de3/HNFldNZUUWx7pubvtixX2615RzXt7TtC2ivxIqgbGqYr+xsmKxQH8f0RmF0GtJIoXwE1oIOTE5YxEHhkx219VMJw7Y+Oi7OU5CYuLbd8TqzXtQq9M9licovEPRXP8uqQ6bEdrmYVGlKM2CF1dzv+WEB9NCeC/otzQ7eaPkJoxJEbL7nsZI8fx/982q/4/H/wgwANQnOor5gkyvAAAAAElFTkSuQmCC\")" });
                pers_inf = $('#pers_inf');
                pers_inf.css({ 'display': 'inline-block', 'vertical-align': 'top', 'font-size': 'large' });
                if (x > 0) {
                    pers_inf.css('color', 'green');
                }
                else {
                    pers_inf.css('color', 'red');
                }
                info_unit.css('height', '130px');
                break;
            }
            case 5: {
                personal.text('Воскрешает ' + db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][3] + ' после боя');
                info_unit.css('height', '116px');
                break;
            }
            case 6: {
                personal.text('Преодолевает укрепления');
                info_unit.css('height', '114px');
                break;
            }
            case 7: {
                personal.text('Уменьшает на ' + db_u[unitu[num].type][num_unit][unitu[num].lvl[num_unit]][3] + ' повреждения от Башен и Магических башен');
                info_unit.css('height', '145px');
                break;
            }
        }

        unitu[num].null_bonusu();

    }

    document.getElementById('info_unit').style.top = (cursorY + 10 + 'px');
    if (num_unit < 4) {
        document.getElementById('info_unit').style.left = (cursorX + 'px');
    }
    else {
        document.getElementById('info_unit').style.left = (cursorX - 115 + 'px');
    }
}
//
function none_info() {
    num_div = -1;
    num_div_unit = -1;
    $('#info_unit').hide();
}

function getSpanBonus(numBonus, flagYkr) {
    var tmp_bonus = unitu[2].bonusu[numBonus];
    if (undefined != flagYkr) {
        tmp_bonus += db_mb_bonus[spes];
    }
    if (tmp_bonus) {
        if (tmp_bonus > 0) {
            return '<span style="color:green"> +' + tmp_bonus + "%</span>";
        }
        else {
            return '<span style="color:red"> ' + tmp_bonus + "%</span>";
        }
    }
    return '';
}

function se_info_yb(lvl) {
    kalk_bonusu();
    var bonus = getSpanBonus(28);
    $("#yb_lvl").html("Укрепление[" + (lvl + 1) + "ур]");
    $("#yb_kill").html("Потери: " + db_yb_tmp[lvl][spes][0] + " юнитов " + bonus);
    $("#yb_armor").html("+" + db_yb_tmp[lvl][spes][1]);

    for (var k = 0; k < 7; k++) {
        unitu[k].null_bonusu();
    }
    //db_yb
    var div = $('#info_yb');
    div.css('top', (cursorY + 10 + 'px'));
    if (lvl < 4) {
        div.css('left', (cursorX + 'px'));
    }
    else {
        div.css('left', (cursorX - 189 + 'px'));
    }
    div.show();
}

function se_info_mb(num) {
    kalk_bonusu();

    for (var m = 0; m < 8; m++) {
        unitu[2].limit_bonus(m + 8, -90, false);
    } //проверка лимита мин атаки
    unitu[2].limit_bonus(40, -90, false); //проверка лимита мин атаки
    unitu[2].limit_bonus(41, -90, false); //проверка лимита мин атаки
    unitu[2].limit_bonus(42, -90, false); //проверка лимита мин атаки
    unitu[2].limit_bonus(43, -90, false); //проверка лимита мин атаки

    if (num) {
        $("#mb_lvl").html("Маг.башня[" + (lvl_mb_2 + 1) + "ур]");
        unitu[2].nanas_damag_all(0);
        var damag_na_zaw = unitu[2].ataks;
        unitu[2].ataks = 0;
        unitu[2].nanas_damag_all(1);
        var sredn_damag = (damag_na_zaw + unitu[2].ataks) / 2;
        unitu[2].ataks = 0;
        var damag = Math.round(sredn_damag * db_mb_tmp[lvl_mb_2]);
    }
    else {
        $("#mb_lvl").html("Маг.башня[" + (lvl_mb_1 + 1) + "ур]");
        unitu[2].nanas_damag_all(0);
        var damag_na_zaw = unitu[2].ataks;
        unitu[2].ataks = 0;
        unitu[2].nanas_damag_all(1);
        var sredn_damag = (damag_na_zaw + unitu[2].ataks) / 2;
        unitu[2].ataks = 0;
        var damag = Math.round(sredn_damag * db_mb_tmp[lvl_mb_1]);
    }
    var bonus = getSpanBonus(30);
    $("#mb_damage").html("<div class='attac_img'></div>" + damag + bonus);

    for (var k = 0; k < 7; k++) {
        unitu[k].null_bonusu();
    }
    var div = $('#info_mb');
    div.css('top', (cursorY + 10 + 'px'));
    div.css('left', (cursorX + 'px'));
    div.show();
}

function se_info_bb(num) {

    kalk_bonusu();
    if (num) {
        $("#bb_lvl").html("Башня[" + (lvl_bb_2 + 1) + "ур]");
        var damag = 0;
        switch (unitu[2].min_max) {
            case 0:
                {
                    damag = db_bb_tmp[lvl_bb_2][0];
                    break;
                }
            case 1:
                {
                    damag = db_bb_tmp[lvl_bb_2][1];
                    break;
                }
            case 2:
                {
                    damag = Math.round(Math.floor(Math.random() * (db_bb_tmp[lvl_bb_2][1] - db_bb_tmp[lvl_bb_2][0] + 1)) + db_bb_tmp[lvl_bb_2][0]);
                    break;
                }
            case 3:
                {
                    damag = Math.round(db_bb_tmp[lvl_bb_2][0] + db_bb_tmp[lvl_bb_2][2] / 2);
                    break;
                }
        }
    }
    else {

        $("#bb_lvl").html("Башня[" + (lvl_bb_1 + 1) + "ур]");
        var damag = 0;
        switch (unitu[2].min_max) {
            case 0:
                {
                    damag = db_bb_tmp[lvl_bb_1][0];
                    break;
                }
            case 1:
                {
                    damag = db_bb_tmp[lvl_bb_1][1];
                    break;
                }
            case 2:
                {
                    damag = Math.round(Math.floor(Math.random() * (db_bb_tmp[lvl_bb_1][1] - db_bb_tmp[lvl_bb_1][0] + 1)) + db_bb_tmp[lvl_bb_1][0]);
                    break;
                }
            case 3:
                {
                    damag = Math.round(db_bb_tmp[lvl_bb_1][0] + db_bb_tmp[lvl_bb_1][2] / 2);
                    break;
                }
        }
    }
    var bonus = getSpanBonus(44, true);
    $("#bb_damage").html("<div class='attac_img'></div>" + damag + bonus);

    for (var k = 0; k < 7; k++) {
        unitu[k].null_bonusu();
    }
    //db_yb
    var div = $('#info_bb');
    div.css('top', (cursorY + 10 + 'px'));
    div.css('left', (cursorX + 'px'));
    div.show();
}

function none_info_yb(div) {
    $('#' + div).hide();
}

//функция получения количество убитых воинов у войска
function mines_varion(num) {
    var k,
        sum = 0;
    for (k = 0; k < 8; k++) {
        var val = parseInt(document.getElementById('min_unitu_' + num + '_' + k).value);
        if (val < 0) {
            sum += val;
        }
    }
    return sum;
}

function clear_one_m(num, m_or_p, num_skil) {//num - номер армии// m_or_p - магия или пасивный скил 0-магия 1 паивка//num_skil - номер скила в масиве 
    if (m_or_p) {
        //пасивка
        var skill = num_skil % 10;
        var this_prof = (num_skil - skill) / 10;
        switch (heroes[num].class_hero) {
            case 0: { //0-60
                var new_skill;
                if (heroes[num].profession == this_prof) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                else {
                    if (heroes[num].profession2 == this_prof) {

                        new_skill = skill + 7;
                        heroes[num].skils[new_skill] = 0;
                    }
                    else {
                        if (heroes[num].profession3 == this_prof) {
                            new_skill = skill + 14;
                            heroes[num].skils[new_skill] = 0;
                        }
                    }
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();
                break;
            }
            case 1: { //60-110

                var new_skill;
                if (heroes[num].profession == this_prof - 6) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                else {
                    if (heroes[num].profession2 == this_prof - 6) {

                        new_skill = skill + 7;
                        heroes[num].skils[new_skill] = 0;
                    }
                    else {
                        if (heroes[num].profession3 == this_prof - 6) {
                            new_skill = skill + 14;
                            heroes[num].skils[new_skill] = 0;
                        }
                    }
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();
                break;
            }
            case 2: { //110-160

                var new_skill;
                if (heroes[num].profession == this_prof - 11) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                else {
                    if (heroes[num].profession2 == this_prof - 11) {

                        new_skill = skill + 7;
                        heroes[num].skils[new_skill] = 0;
                    }
                    else {
                        if (heroes[num].profession3 == this_prof - 11) {
                            new_skill = skill + 14;
                            heroes[num].skils[new_skill] = 0;
                        }
                    }
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();
                break;
            }
            case 3: { //160-180

                var new_skill;
                if (heroes[num].profession == this_prof - 16) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();

                break;
            }
            case 5: { //0-60
                var new_skill;
                if (heroes[num].profession == this_prof) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                else {
                    if (heroes[num].profession2 == this_prof) {

                        new_skill = skill + 7;
                        heroes[num].skils[new_skill] = 0;
                    }
                    else {
                        if (heroes[num].profession3 == this_prof) {
                            new_skill = skill + 14;
                            heroes[num].skils[new_skill] = 0;
                        }
                    }
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();
                break;
            }
            case 6: { //60-110

                var new_skill;
                if (heroes[num].profession == this_prof - 6) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                else {
                    if (heroes[num].profession2 == this_prof - 6) {

                        new_skill = skill + 7;
                        heroes[num].skils[new_skill] = 0;
                    }
                    else {
                        if (heroes[num].profession3 == this_prof - 6) {
                            new_skill = skill + 14;
                            heroes[num].skils[new_skill] = 0;
                        }
                    }
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();
                break;
            }

            case 7: { //110-160

                var new_skill;
                if (heroes[num].profession == this_prof - 11) {
                    heroes[num].skils[skill] = 0;
                    new_skill = skill;
                }
                else {
                    if (heroes[num].profession2 == this_prof - 11) {

                        new_skill = skill + 7;
                        heroes[num].skils[new_skill] = 0;
                    }
                    else {
                        if (heroes[num].profession3 == this_prof - 11) {
                            new_skill = skill + 14;
                            heroes[num].skils[new_skill] = 0;
                        }
                    }
                }
                $('#skils_' + new_skill + '_' + num).html("<div class='black_fon'><br/><br/>0/5</div>");
                $('#pas_do_magick_' + num + '_' + num_skil).hide();
                break;
            }
            
        }

    }
    else {
        heroes[num].magick[num_skil] = 0;
        $('#div_magick_' + num + '_' + num_skil).html("<div class='black_fon'><br/><br/>0/5</div>");
        $('#do_magick_' + num + '_' + num_skil).hide();
    }
}

//функция запаса хилпоинтов
function hil_q(num) {
    return parseInt(document.getElementById('zaradu_' + num).value);
}

//был ли автоподсчет до простого подсчета
//auto_start_bool = false;
//функция автоматического подсчета
//function auto_start(){
//    auto_start_bool = false;
//
//    //определяем тип подсчета
//    if(unitu[0].sum_units()){
//        //с введенными данными
//
//
//        //определяем какая руина
//        switch (ficha_ruinu){
//            case 5: {
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[2] += 10;
//                        unitu[0].qq[3] += 5;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[2] -= 2;
//                        unitu[0].qq[3] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[2] += 1;
//                            unitu[0].qq[3] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//                break;
//            }
//            case 6: {
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[3] += 20;
//                        unitu[0].qq[4] += 10;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[3] -= 2;
//                        unitu[0].qq[4] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[3] += 1;
//                            unitu[0].qq[4] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//                break;
//            }
//            case 7: {
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[4] += 10;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 2;
//                        unitu[0].qq[4] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 1;
//                            unitu[0].qq[4] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//                break;
//            }
//            case 8: {
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[2] += 20;
//                        unitu[0].qq[1] += 10;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[2] -= 2;
//                        unitu[0].qq[1] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[2] += 1;
//                            unitu[0].qq[1] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//
//                break;
//            }
//            case 9: {
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[2] += 23;
//                        unitu[0].qq[3] += 30;
//                        unitu[0].qq[4] += 15;
//                        unitu[0].qq[5] += 10;
//                        unitu[0].qq[7] += 3;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 9;
//                        unitu[0].qq[2] -= 11;
//                        unitu[0].qq[3] -= 15;
//                        unitu[0].qq[4] -= 7;
//                        unitu[0].qq[5] -= 5;
//                        unitu[0].qq[7] -= 2;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 3;
//                            unitu[0].qq[2] += 5;
//                            unitu[0].qq[3] += 8;
//                            unitu[0].qq[4] += 3;
//                            unitu[0].qq[5] += 5;
//                            unitu[0].qq[7] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                }
//                //нужны 5(хилы) все кроме наймов
//
//                break;
//            }
//            case 10: {
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[2] += 23;
//                        unitu[0].qq[3] += 30;
//                        unitu[0].qq[4] += 15;
//                        unitu[0].qq[5] += 10;
//                        unitu[0].qq[7] += 3;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 9;
//                        unitu[0].qq[2] -= 11;
//                        unitu[0].qq[3] -= 15;
//                        unitu[0].qq[4] -= 7;
//                        unitu[0].qq[5] -= 5;
//                        unitu[0].qq[7] -= 2;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 3;
//                            unitu[0].qq[2] += 5;
//                            unitu[0].qq[3] += 8;
//                            unitu[0].qq[4] += 3;
//                            unitu[0].qq[5] += 5;
//                            unitu[0].qq[7] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                }
//                break;
//            }
//            case 11: {
//
//                //нужны все кроме наймов
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[2] += 23;
//                        unitu[0].qq[3] += 30;
//                        unitu[0].qq[4] += 15;
//                        unitu[0].qq[5] += 10;
//                        unitu[0].qq[7] += 3;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 9;
//                        unitu[0].qq[2] -= 11;
//                        unitu[0].qq[3] -= 15;
//                        unitu[0].qq[4] -= 7;
//                        unitu[0].qq[5] -= 5;
//                        unitu[0].qq[7] -= 2;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 3;
//                            unitu[0].qq[2] += 5;
//                            unitu[0].qq[3] += 8;
//                            unitu[0].qq[4] += 3;
//                            unitu[0].qq[5] += 5;
//                            unitu[0].qq[7] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                }
//                break;
//            }
//        }
//
//
//
//
//    }else{
//        //без введеных данных
//        //узнаем коофициент деляния носильшиков
//        var cofc;
//        if(unitu[0].type){
//            cofc = 50;
//        }
//        else{
//            cofc = 100;
//        }
//        //определяем какая руина
//        switch (ficha_ruinu){
//            case 5: {
//                //носильшики
//                // unitu[0].vq[num_volna][0] = 23000/cofc;
//                unitu[0].qq[0] = 23000/cofc;
//                //нужны 2 3 5(хилы)
//                unitu[0].qq[1] = 0;
//                unitu[0].qq[2] = 250;
//                unitu[0].qq[3] = 100;
//                unitu[0].qq[4] = 0;
//                unitu[0].qq[5] = 100;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 0;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[2] += 10;
//                        unitu[0].qq[3] += 5;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[2] -= 2;
//                        unitu[0].qq[3] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[2] += 1;
//                            unitu[0].qq[3] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//                break;
//            }
//            case 6: {
//                unitu[0].qq[0] = 45000/cofc;
//                //нужны 3 4 5(хилы)
//                unitu[0].qq[1] = 0;
//                unitu[0].qq[2] = 0;
//                unitu[0].qq[3] = 200;
//                unitu[0].qq[4] = 100;
//                unitu[0].qq[5] = 70;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 0;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[3] += 20;
//                        unitu[0].qq[4] += 10;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[3] -= 2;
//                        unitu[0].qq[4] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[3] += 1;
//                            unitu[0].qq[4] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//                break;
//            }
//            case 7: {
//                unitu[0].qq[0] = 70000/cofc;
//                //нужны 4 1 5(хилы)
//                unitu[0].qq[4] = 200;
//                unitu[0].qq[2] = 0;
//                unitu[0].qq[3] = 0;
//                unitu[0].qq[1] = 850;
//                unitu[0].qq[5] = 220;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 0;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[4] += 10;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 2;
//                        unitu[0].qq[4] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 1;
//                            unitu[0].qq[4] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//                break;
//            }
//            case 8: {
//                unitu[0].qq[0] = 150000/cofc;
//                //нужны 1 2 5(хилы)
//                unitu[0].qq[1] = 900;
//                unitu[0].qq[2] = 1500;
//                unitu[0].qq[3] = 0;
//                unitu[0].qq[4] = 0;
//                unitu[0].qq[5] = 600;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 0;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[2] += 20;
//                        unitu[0].qq[1] += 10;
//                        unitu[0].qq[5] += 5;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[2] -= 2;
//                        unitu[0].qq[1] -= 1;
//                        unitu[0].qq[5] -= 1;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[2] += 1;
//                            unitu[0].qq[1] += 1;
//                            unitu[0].qq[5] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                    break;
//                }
//
//                break;
//            }
//            case 9: {
//                unitu[0].qq[0] = 450000/cofc;
//                //TODO:  проверка, что б небыло какого-то юнита -123
//
//                unitu[0].qq[1] = 2000;
//                unitu[0].qq[2] = 2300;
//                unitu[0].qq[3] = 3000;
//                unitu[0].qq[4] = 1500;
//                unitu[0].qq[5] = 1000;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 300;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[2] += 23;
//                        unitu[0].qq[3] += 30;
//                        unitu[0].qq[4] += 15;
//                        unitu[0].qq[5] += 10;
//                        unitu[0].qq[7] += 3;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 9;
//                        unitu[0].qq[2] -= 11;
//                        unitu[0].qq[3] -= 15;
//                        unitu[0].qq[4] -= 7;
//                        unitu[0].qq[5] -= 5;
//                        unitu[0].qq[7] -= 2;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 3;
//                            unitu[0].qq[2] += 5;
//                            unitu[0].qq[3] += 8;
//                            unitu[0].qq[4] += 3;
//                            unitu[0].qq[5] += 5;
//                            unitu[0].qq[7] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                }
//                //нужны 5(хилы) все кроме наймов
//
//                break;
//            }
//            case 10: {
//                unitu[0].qq[0] = 450000/cofc;
//
//                //нужны все кроме наймов
//
//                unitu[0].qq[1] = 2000;
//                unitu[0].qq[2] = 2300;
//                unitu[0].qq[3] = 3000;
//                unitu[0].qq[4] = 1500;
//                unitu[0].qq[5] = 1000;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 300;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[2] += 23;
//                        unitu[0].qq[3] += 30;
//                        unitu[0].qq[4] += 15;
//                        unitu[0].qq[5] += 10;
//                        unitu[0].qq[7] += 3;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 9;
//                        unitu[0].qq[2] -= 11;
//                        unitu[0].qq[3] -= 15;
//                        unitu[0].qq[4] -= 7;
//                        unitu[0].qq[5] -= 5;
//                        unitu[0].qq[7] -= 2;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 3;
//                            unitu[0].qq[2] += 5;
//                            unitu[0].qq[3] += 8;
//                            unitu[0].qq[4] += 3;
//                            unitu[0].qq[5] += 5;
//                            unitu[0].qq[7] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                }
//                break;
//            }
//            case 11: {
//                unitu[0].qq[0] = 950000/cofc;
//
//                //нужны все кроме наймов
//
//                unitu[0].qq[1] = 4000;
//                unitu[0].qq[2] = 4600;
//                unitu[0].qq[3] = 6000;
//                unitu[0].qq[4] = 3000;
//                unitu[0].qq[5] = 2000;
//                unitu[0].qq[6] = 0;
//                unitu[0].qq[7] = 600;
//
//                rashet();
//                for( ; ; ){
//                    if(mines_varion(0)){
//                        unitu[0].qq[1] += 20;
//                        unitu[0].qq[2] += 23;
//                        unitu[0].qq[3] += 30;
//                        unitu[0].qq[4] += 15;
//                        unitu[0].qq[5] += 10;
//                        unitu[0].qq[7] += 3;
//                        rashet();
//                        continue;
//                    }
//                    if(hil_q(0)>20){
//                        unitu[0].qq[1] -= 9;
//                        unitu[0].qq[2] -= 11;
//                        unitu[0].qq[3] -= 15;
//                        unitu[0].qq[4] -= 7;
//                        unitu[0].qq[5] -= 5;
//                        unitu[0].qq[7] -= 2;
//                        rashet();
//                        continue;
//                    }
//                    else{
//                        if(hil_q(0)<10){
//                            unitu[0].qq[1] += 3;
//                            unitu[0].qq[2] += 5;
//                            unitu[0].qq[3] += 8;
//                            unitu[0].qq[4] += 3;
//                            unitu[0].qq[5] += 5;
//                            unitu[0].qq[7] += 1;
//                            rashet();
//                            continue;
//                        }
//                    }
//                }
//                break;
//            }
//        }
//
//        //узнаем необходимые типы войск
//        //узнаем количество войск для
//
//        //проверка на бонус добивания войск, что б не было проблем с бесконечными воскрешениями
//    }
//    auto_start_bool = true;
//}

function format_title_for_dress(num, num_smotka, num_hero) {
    var tmpText = '';
    if (num > -1 && heroes[num_hero].dress_alximick[num_smotka]) {
        if (heroes[num_hero].dress_old[num_smotka]) {
            tmpText = db_dress_old[num][num_smotka][0] + '. ' + db_title_alximick[num_smotka][db_lvl_dress[heroes[num_hero].dress[num_smotka]] - 1] + db_dress_old[num][12][0];
        }
        else {
            tmpText = db_dress[num][num_smotka][0] + '. ' + db_title_alximick[num_smotka][db_lvl_dress[heroes[num_hero].dress[num_smotka]] - 1] + db_dress[num][12][0];
        }
    }
    else {
        if (heroes[num_hero].dress_old[num_smotka]) {
            tmpText = num > -1 ? db_dress_old[num][num_smotka][0] + db_dress_old[num][12][0] : '';
        }
        else {

            tmpText = num > -1 ? db_dress[num][num_smotka][0] + db_dress[num][12][0] : '';
        }
    }
    if (tmpText == null) {
        tmpText = '';
    }
    document.getElementById("shmotka_" + num_smotka + "_" + num_hero).title = tmpText;
    document.getElementById('litle_dress_' + num_hero + '_' + num + '_' + num_smotka).title = tmpText;

}

function vkl_alxim(num_smotka, num_hero) {
    flag_alximik = true;
    var div = $("#alximick_" + num_smotka + "_" + num_hero);
    var num = heroes[num_hero].dress[num_smotka];
    if (div.hasClass("alximick") && heroes[num_hero].dress[num_smotka] != -1) {
        div.addClass("alximick_vkl").removeClass("alximick");
        heroes[num_hero].dress_alximick[num_smotka] = 1;
    }
    else {
        div.addClass("alximick").removeClass("alximick_vkl");
        heroes[num_hero].dress_alximick[num_smotka] = 0;
    }
    format_title_for_dress(num, num_smotka, num_hero);
}

function vkl_old_dress(num_smotka, num_hero) {
    flag_alximik = true;
    var div = $("#old_dress_" + num_smotka + "_" + num_hero);
    var num = heroes[num_hero].dress[num_smotka];
    if (div.hasClass("old_dress") && num != -1) {
        div.addClass("old_dress_vkl").removeClass("old_dress");
        heroes[num_hero].dress_old[num_smotka] = 1;
    }
    else {
        div.addClass("old_dress").removeClass("old_dress_vkl");
        heroes[num_hero].dress_old[num_smotka] = 0;
    }

    if (num != -1) {
        if (heroes[num_hero].dress_old[num_smotka]) {
            heroes[num_hero].efects[num_smotka] = db_dress_old[num][num_smotka][2] ? -1 : db_dress_old[num][num_smotka][1];
        }
        else {
            heroes[num_hero].efects[num_smotka] = db_dress[num][num_smotka][2] ? -1 : db_dress[num][num_smotka][1];
        }
    }

    format_title_for_dress(num, num_smotka, num_hero);
}

function vkl_rynu_label(num_smotka, num_hero) {
    if (-1 != heroes[num_hero].dress[num_smotka])
        $("#select_rynu_" + num_smotka + "_" + num_hero).show();
    else
        alert('Сначала нужно выбрать артефакт и после этого улучшать его рунами.')
}

function hide_menu_rynu(num_smotka, num_hero) {
    $("#select_rynu_" + num_smotka + "_" + num_hero).hide();
    $("#select_shmotka_" + num_smotka + "_" + num_hero).hide();

    check_show_ryna_one(num_smotka, num_hero);
}

function check_show_ryna_one(num_smotka, num_hero) {
    if (heroes[num_hero].rynu[num_smotka][0][0] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][1] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][2] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][3] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][4] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][5] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][6] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][7] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][8] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][9] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][10] > 0 ||
        heroes[num_hero].rynu[num_smotka][0][11] > 0
    ) {
        $("#rynu_label_" + num_smotka + "_" + num_hero).removeClass('rynu_label').addClass('rynu_label_vkl');
    }
    else {
        $("#rynu_label_" + num_smotka + "_" + num_hero).removeClass('rynu_label_vkl').addClass('rynu_label');
    }
}

function сlear_menu_rynu(num_smotka, num_hero, num) {

    // Получаем коллекцию элементов по атрибуту id, который начинается с "ryna_count_"
    //Очищаем сами руны
    for (let i = 0; i <= 9; i++) {
    const textboxes = document.querySelectorAll('[id^="ryna_count_' + i + '_' + num_smotka + '_' + num_hero + '"]');
// Проходимся по каждому текстовому полю и очищаем его содержимое
textboxes.forEach(textbox => {
    textbox.value = '0'; // Очистка содержимого поля
});
}
/* Обнуляем значение массива - именно рун */
for (let i = 0; i <= 8; i++) {
    heroes[num_hero].rynu[num_smotka][0][i] = 0;
}

//Очищаем Рунные слова / заточки доп.бонусы
for (let i = 0; i <= 100; i++) {
    const textboxes = document.querySelectorAll('[id^="ryna_work_count_' + i + '_' + num_smotka + '_' + num_hero + '"]');
// Проходимся по каждому текстовому полю и очищаем его содержимое
textboxes.forEach(textbox => {
    textbox.value = '0'; // Очистка содержимого поля
});}
/* Обнуляем значение массива - рунные слова,заточки и доп.бонусы */
for (let i = 0; i <= 100; i++) {
    heroes[num_hero].rynu[num_smotka][1][i] = 0;
}

}


function set_rynu_by_info(numberHero, num_dress) {
    //init rynu
    var countRynu = heroes[numberHero].rynu[num_dress][0].length;
    var countWorkRynuBaff = heroes[numberHero].rynu[num_dress][1].length;
    for (var m = 0; m < countRynu; m++) {
        $("#ryna_count_" + m + "_" + num_dress + "_" + numberHero).val(heroes[numberHero].rynu[num_dress][0][m]).keyup();
    }

    for (var m = 0; m < countWorkRynuBaff; m++) {
        $("#ryna_work_count_" + m + "_" + num_dress + "_" + numberHero).val(heroes[numberHero].rynu[num_dress][1][m]);
    }

    //init label on smotka
    check_show_ryna_one(num_dress, numberHero);
}
/*

 hide_menu_rynu(1,0)
 heroes[num].rynu[numSmotka][0][inp] = 0;
 */

//==================================================
//===========процес создания объектов===============
//==================================================

//создаем объекты для юнитов [войска] 0-1 нападающие 2-4 защитники...второй парамет в бою ли войско
var unitu = [new Units(0, true), new Units(1, false), new Units(2, true), new Units(3, false), new Units(4, false), new Units(5, false), new Units(6, false)];
var heroes = [new Heroes(0), new Heroes(1), new Heroes(2), new Heroes(3), new Heroes(4), new Heroes(5), new Heroes(6)];

var hero_voln = [[new Heroes(0), new Heroes(0), new Heroes(0)], [new Heroes(1), new Heroes(1), new Heroes(1)], [new Heroes(6), new Heroes(6), new Heroes(6)]]
var hero_vkl = [[false, false, false], [false, false, false], [false, false, false]]; //[войско][волна][был ли герой]
//==================================================
//====================БОЙ ПОШОЛ=====================
//==================================================


function seeJson(json) {
    var all3 = JSON.parse(json);
    if (undefined != all3.errors) {
        alert(all3.errors);
        return false;
    }

    var m = parseInt(all3.num);
    //растановка данных и шмоток как при save

    unitu[m].rewrite(all3.obj.unit);
    unitu[m].number = m;
    //почистить невозможные штандарты
    if (m < 2 || m == 6) {
        unitu[m].shtandart[0] = 0;
        unitu[m].shtandart[1] = 0;
        unitu[m].shtandart[2] = 0;
        unitu[m].shtandart[7] = 0;
        unitu[m].shtandart[8] = 0;
        unitu[m].shtandart[9] = 0;
        unitu[m].shtandart[10] = 0;
    }
    unitu[m].input_true();
    //растановка рас вклюая руины
    unitu[m].change_type(true);
    unitu[m].otst_true();//не пашет
    unitu[m].checked_true();


    for (var ms = 0; ms < 160; ms++) {
        document.getElementById("pas_do_magick_" + m + "_" + ms).style.display = 'none';
    }

    heroes[m].rewrite(all3.obj.hero);
    heroes[m].number = m;
    if (m < 2 || m == 6) {
        heroes[m].magick[4] = 0;
        heroes[m].magick[9] = 0;
        heroes[m].magick[33] = 0;
        heroes[m].magick[36] = 0;
        heroes[m].magick[38] = 0;
        heroes[m].magick[41] = 0;
        heroes[m].magick[50] = 0;
        heroes[m].magick[51] = 0;
        heroes[m].magick[52] = 0;
        heroes[m].magick[64] = 0;
        heroes[m].magick[70] = 0;
        heroes[m].magick[75] = 0;
    }
    if (m != 2)
        heroes[m].magick[118] = 0;

    //todo почистить невозможные штандарты



    heroes[m].hero_true(unitu[m].hero, m);
    heroes[m].hide_all_dress();


    if (m == 2 && heroes[2].magick[118]) {
        document.getElementById("magic_on_hero_2").style.display = 'inline-block';
    } else {
        document.getElementById("do_magick_2_118").style.display = 'none';
    }


    $('#load-one-army').trigger('reset');
}

function miniFun() // chenge type server
{
    if (type_server == 4) {
        for (var i = 0; i < 5; i++)
            db_u[i][4] = [[10, 15, 25], [15, 20, 30], [20, 30, 40], [25, 35, 45]];
    }
    else {
        for (var i = 0; i < 5; i++)
            db_u[i][4] = [[6, 25, 35], [10, 35, 45], [15, 45, 55], [15, 50, 60]];
    }
}

function parseGetParams() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for (var i = 0; i < __GET.length; i++) {
        var getVar = __GET[i].split("=");
        $_GET[getVar[0]] = typeof (getVar[1]) == "undefined" ? "" : getVar[1];
    }
    return $_GET;
}
window.onload = load;
function load() {
    $_GET = parseGetParams();

    $("#link-for-load input").click(function () { this.select() });

    $(".monster_settings input").click(function () {
        var num = $(this).parent().data('number');
        heroes[num].monster_type = parseInt($(this).val());
        heroes[num].set_skils_stounhedj();
    })

    $("#calk").show();
    $('.hide_this_magick').hide();
    $(".skils").css("background-position", "-664px -1782px");

    $('.type_server input[type=radio]').bind('click', function () {
        type_server = $(this).val();
        miniFun();
    });

    $('iframe').attr('src', '#')


    $('.save_one').bind('click', function () {
        var num = $(this).data('num');
        //checkbox on red check
        unitu[num].red = $("#red_" + num).is(':checked');

        var text = JSON.stringify({
            hero: heroes[num],
            unit: unitu[num]
        });
        $("#save-one-in-file").val(text);
        $('#send-one').submit();
    });
    $('#marader_lvl, .marader_lvl_child').bind('focus', function () {
        $(this).val() == 0 ? $(this).val('') : false;
    });
    $('#marader_lvl, .marader_lvl_child').bind('bloor', function () {
        $(this).val() == '' ? $(this).val('0') : false;
    });
    $('#marader_lvl, .marader_lvl_child').bind('change', calculate_marader);
    $('#marader_lvl, .marader_lvl_child').bind('keyup', function () {
        var $this = $(this);
        var value1 = $this.val();
        var value = parseInt(value1);
        if (isNaN(value)) {
            $this.val(0);
        }
        else {
            if (value > 100)
                value = 100;
            value += '';
            if (value.length != value1.length)
                $this.val(value);
        }
        calculate_marader();
    });
    $('.load_one').bind('click', function () {
        var num = $(this).data('num');
        $("#load-file-num").val(num);
        $('#load-file-inp').click();
    });
    $('#load-file-inp').live('change', (function () {
        $('#load-one-army').submit();
    }));


    i = 0;
    do {
        heroes[i].efects_new();
        heroes[i].magick_new();
        heroes[i].true_magick();
        heroes[i].create_list_dress();
        heroes[i].create_dress();
        i++;
    } while (i < 7);
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            hero_voln[i][j].efects_new();
            hero_voln[i][j].magick_new();
        }
    }
    $('.inp_size').css('width', '90px');
    //обработка передвижения мыши
    $(document).mousemove(function (e) {
        cursorX = e.pageX;
        cursorY = e.pageY;
        if (num_div != -1 && num_div_unit != -1) {
            se_info(num_div, num_div_unit);
        }
    })

    $('.creat_one_bonus,.ryna_count,.ryna_work_count').bind('focus', function () {
        var thisObj = $(this);
        if ($.trim(thisObj.val()) == 0) {
            thisObj.val('');
        }
    });
    $('.creat_one_bonus,.ryna_count,.ryna_work_count').bind('blur', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val());
        if (val == '' || val == '-') {
            thisObj.val(0);
        }
    });


    $("#hp_gate").bind('keyup', function () {
        var $this = $(this);
        var firstVal = $this.val();
        var val = $.trim(firstVal).replace(/[^\d]/gi, '');
        if (val == '' || val == 0)
            val = db_gate[gate_lvl][1];
        if (val != firstVal)
            $this.val(val);
    }).bind("change", function () {
        var $this = $(this);
        var val = $.trim($this.val());
        if (val == 0)
            val = db_gate[gate_lvl][1];
        $this.val(val);
        gate_hp[num_volna] = parseInt(val);
    });


    $('.norm_bonus').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).replace(/[^\d,-]/gi, '');
        var num = thisObj.data('num');
        var inp = thisObj.data('inp');
        if (val == '' || val == '-') {
            thisObj.val(0);
            unitu[num].create_bonus[inp] = 0;
        }
        else {
            unitu[num].create_bonus[inp] = parseInt(val);
        }
        thisObj.val(val);
    });

    $('.no_norm_bonus').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).replace(/[^\d,-]/gi, '');
        var num = thisObj.data('num');
        var inp = thisObj.data('inp');
        if (val == '' || val == '-') {
            thisObj.val(0);
            unitu[num].create_bonus_no_standart[inp] = 0;
        }
        else {
            unitu[num].create_bonus_no_standart[inp] = parseInt(val);
        }
        thisObj.val(val);
    });

    $('.ryna_count').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).replace(/[^\d,-]/gi, '');
        var num = thisObj.data('num');
        var inp = thisObj.data('inp');
        var numSmotka = thisObj.data('smotka');
        if (val == '' || val == '-' || parseInt(val) == 0) {
            thisObj.val(0);
            heroes[num].rynu[numSmotka][0][inp] = 0;
            thisObj.parent().find('.ryna_img').removeClass('ryna_img_vkl_' + inp).addClass('ryna_img_' + inp);
        }
        else {
            thisObj.parent().find('.ryna_img').removeClass('ryna_img_' + inp).addClass('ryna_img_vkl_' + inp);
            heroes[num].rynu[numSmotka][0][inp] = parseInt(val);
        }
        thisObj.val(val);
    });

    $('.ryna_work_count').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).replace(/[^\d,-]/gi, '');
        var num = thisObj.data('num');
        var inp = thisObj.data('inp');
        var numSmotka = thisObj.data('smotka');
        if (val == '' || val == '-') {
            thisObj.val(0);
            heroes[num].rynu[numSmotka][1][inp] = 0;
        }
        else {
            heroes[num].rynu[numSmotka][1][inp] = parseInt(val);
        }
        thisObj.val(val);
    });

    $('.no_norm_bonus_vrag').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).replace(/[^\d,-]/gi, '');
        var num = thisObj.data('num');
        var inp = thisObj.data('inp');
        if (val == '' || val == '-') {
            thisObj.val(0);
            unitu[num].create_bonus_no_standart_vrag[inp] = 0;
        }
        else {
            unitu[num].create_bonus_no_standart_vrag[inp] = parseInt(val);
        }
        thisObj.val(val);
    });

    $('.ysilok').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).replace(/[^\d,-]/gi, '');
        var num = thisObj.data('num');
        var inp = thisObj.data('inp');
        if (val == '' || val == '-') {
            thisObj.val(0);
            unitu[num].yselenit_damag = 0;
        }
        else {
            unitu[num].yselenit_damag = parseInt(val);
        }
        thisObj.val(val);
    });


    $(".blour").live('blur', function () {
        var obj = $(this);
        var thisVal = parseInt($.trim(obj.val()));
        thisVal = thisVal == undefined ? 0 : thisVal;
        thisVal = isNaN(thisVal) ? 0 : thisVal;
        obj.val(thisVal);
    });

    //    document.getElementById("auto").onclick = function(){
    //        auto_start();
    //    }
    //клики по кнопкам волн
    document.getElementById("b1").onclick = function () {
        volnu_change(0);
    }
    document.getElementById("b2").onclick = function () {
        volnu_change(1);
    }
    document.getElementById("b3").onclick = function () {
        volnu_change(2);
    }
    document.getElementById("save").onclick = function () {
        save_all();
    }
    document.getElementById("load").onclick = function () {
        load_all();
    }
    document.getElementById("feo_load").onclick = function () {
        feo_load_all();
    }
    document.getElementById("ur_load").onclick = function () {
        ur_load_all();
    }
    document.getElementById("torn_load").onclick = function () {
        torn_load_all();
    }
    document.getElementById("io_load").onclick = function () {
        io_load_all();
    }

    document.getElementById("rad_load").onclick = function () {
        rad_load_all();
    }

    document.getElementById("tir_load").onclick = function () {
        tir_load_all();
    }

    document.getElementById("gify_load").onclick = function () {
        gify_load_all();
    }

    document.getElementById("ia_load").onclick = function () {
        ia_load_all();
    }

    document.getElementById("hegl_load").onclick = function () {
        hegl_load_all();
    }
    document.getElementById("a_a_load").onclick = function () {
        a_a_load_all();
    }
    document.getElementById("a_aa_load").onclick = function () {
        a_aa_load_all();
    }
    document.getElementById("a_aaa_load").onclick = function () {
        a_aaa_load_all();
    }
    document.getElementById("a_aaaa_load").onclick = function () {
        a_aaaa_load_all();
    }
    document.getElementById("a_aaaaa_load").onclick = function () {
        a_aaaaa_load_all();
    }
    document.getElementById("b_b_load").onclick = function () {
        b_b_load_all();
    }
    document.getElementById("b_bb_load").onclick = function () {
        b_bb_load_all();
    }
    document.getElementById("b_bbb_load").onclick = function () {
        b_bbb_load_all();
    }
    document.getElementById("b_bbbb_load").onclick = function () {
        b_bbbb_load_all();
    }
    document.getElementById("c_c_load").onclick = function () {
        c_c_load_all();
    }
    document.getElementById("c_cc_load").onclick = function () {
        c_cc_load_all();
    }
    document.getElementById("c_ccc_load").onclick = function () {
        c_ccc_load_all();
    }
    document.getElementById("c_cccc_load").onclick = function () {
        c_cccc_load_all();
    }
    document.getElementById("c_ccccc_load").onclick = function () {
        c_ccccc_load_all();
    }
    document.getElementById("d_d_load").onclick = function () {
        d_d_load_all();
    }
    document.getElementById("d_dd_load").onclick = function () {
        d_dd_load_all();
    }
    document.getElementById("d_ddd_load").onclick = function () {
        d_ddd_load_all();
    }
    document.getElementById("d_dddd_load").onclick = function () {
        d_dddd_load_all();
    }
    document.getElementById("d_ddddd_load").onclick = function () {
        d_ddddd_load_all();
    }
    document.getElementById("fiolet_load").onclick = function () {
        fiolet_load_all();
    }
/*сарки*/
document.getElementById("armyres1_load").onclick = function () {
    armyres1_load_all();
}

document.getElementById("armyres1s_load").onclick = function () {
    armyres1s_load_all();
}

document.getElementById("armyres2_load").onclick = function () {
    armyres2_load_all();
}

document.getElementById("armyres2s_load").onclick = function () {
    armyres2s_load_all();
}

document.getElementById("armyres3_load").onclick = function () {
    armyres3_load_all();
}

document.getElementById("armyres3s_load").onclick = function () {
    armyres3s_load_all();
}

document.getElementById("armyres4_load").onclick = function () {
    armyres4_load_all();
}

document.getElementById("armyres4s_load").onclick = function () {
    armyres4s_load_all();
}

document.getElementById("armyres5_load").onclick = function () {
    armyres5_load_all();
}

document.getElementById("armyres5s_load").onclick = function () {
    armyres5s_load_all();
}

document.getElementById("armyresally1_load").onclick = function () {
    armyresally1_load_all();
        
}

document.getElementById("armyresally1s_load").onclick = function () {
    armyresally1s_load_all();
}

document.getElementById("armyresally2_load").onclick = function () {
    armyresally2_load_all();
}

document.getElementById("armyresally2s_load").onclick = function () {
    armyresally2s_load_all();
}

document.getElementById("armyresally3_load").onclick = function () {
    armyresally3_load_all();
}

document.getElementById("armyresally3s_load").onclick = function () {
    armyresally3s_load_all();
}

document.getElementById("armyresally4_load").onclick = function () {
    armyresally4_load_all();
}

document.getElementById("armyresally4s_load").onclick = function () {
    armyresally4s_load_all();
}

document.getElementById("armystrength1_load").onclick = function () {
    armystrength1_load_all();
}

document.getElementById("armystrength1s_load").onclick = function () {
    armystrength1s_load_all();
}

document.getElementById("armystrength2_load").onclick = function () {
    armystrength2_load_all();
}

document.getElementById("armystrength2s_load").onclick = function () {
    armystrength2s_load_all();
}

document.getElementById("armystrength3_load").onclick = function () {
    armystrength3_load_all();
}

document.getElementById("armystrength3s_load").onclick = function () {
    armystrength3s_load_all();
}

document.getElementById("armystrength4_load").onclick = function () {
    armystrength4_load_all();
}

document.getElementById("armystrength4s_load").onclick = function () {
    armystrength4s_load_all();
}

document.getElementById("armystrength5_load").onclick = function () {
    armystrength5_load_all();
}

document.getElementById("armystrength5s_load").onclick = function () {
    armystrength5s_load_all();
}

document.getElementById("armystrengthally1_load").onclick = function () {
    armystrengthally1_load_all();
}

document.getElementById("armystrengthally1s_load").onclick = function () {
    armystrengthally1s_load_all();
}

document.getElementById("armystrengthally2_load").onclick = function () {
    armystrengthally2_load_all();
}

document.getElementById("armystrengthally2s_load").onclick = function () {
    armystrengthally2s_load_all();
}

document.getElementById("armystrengthally3_load").onclick = function () {
    armystrengthally3_load_all();
}

document.getElementById("armystrengthally3s_load").onclick = function () {
    armystrengthally3s_load_all();
}

document.getElementById("armystrengthally4_load").onclick = function () {
    armystrengthally4_load_all();
}

document.getElementById("armystrengthally4s_load").onclick = function () {
    armystrengthally4s_load_all();
}
//
document.getElementById("enemdef1_load").onclick = function () {
    enemdef1_load_all();
}

document.getElementById("enemdef1s_load").onclick = function () {
    enemdef1s_load_all();
}

document.getElementById("enemdef2_load").onclick = function () {
    enemdef2_load_all();
}

document.getElementById("enemdef2s_load").onclick = function () {
    enemdef2s_load_all();
}

document.getElementById("enemdef3_load").onclick = function () {
    enemdef3_load_all();
}

document.getElementById("enemdef3s_load").onclick = function () {
    enemdef3s_load_all();
}

document.getElementById("enemdef4_load").onclick = function () {
    enemdef4_load_all();
}

document.getElementById("enemdef4s_load").onclick = function () {
    enemdef4s_load_all();
}

document.getElementById("enemhealth1_load").onclick = function () {
    enemhealth1_load_all();
}

document.getElementById("enemhealth1s_load").onclick = function () {
    enemhealth1s_load_all();
}

document.getElementById("enemhealth2_load").onclick = function () {
    enemhealth2_load_all();
}
//
document.getElementById("enemhealth2s_load").onclick = function () {
    enemhealth2s_load_all();
}

document.getElementById("enemhealth3_load").onclick = function () {
    enemhealth3_load_all();
}

document.getElementById("enemhealth3s_load").onclick = function () {
    enemhealth3s_load_all();
}

document.getElementById("enemhealth4_load").onclick = function () {
    enemhealth4_load_all();
}

document.getElementById("enemhealth4s_load").onclick = function () {
    enemhealth4s_load_all();
}

document.getElementById("enemmaxdef1_load").onclick = function () {
    enemmaxdef1_load_all();
}

document.getElementById("enemmaxdef1s_load").onclick = function () {
    enemmaxdef1s_load_all();
}

document.getElementById("enemmaxdef2_load").onclick = function () {
    enemmaxdef2_load_all();
}

document.getElementById("enemmaxdef2s_load").onclick = function () {
    enemmaxdef2s_load_all();
}

document.getElementById("enemmaxdef3_load").onclick = function () {
    enemmaxdef3_load_all();
}

document.getElementById("enemmaxdef3s_load").onclick = function () {
    enemmaxdef3s_load_all();
}

document.getElementById("enemweak1_load").onclick = function () {
    enemweak1_load_all();
}

document.getElementById("enemweak1s_load").onclick = function () {
    enemweak1s_load_all();
}

document.getElementById("enemweak2_load").onclick = function () {
    enemweak2_load_all();
}

document.getElementById("enemweak2s_load").onclick = function () {
    enemweak2s_load_all();
}

document.getElementById("enemweak3_load").onclick = function () {
    enemweak3_load_all();
}

document.getElementById("enemweak3s_load").onclick = function () {
    enemweak3s_load_all();
}

document.getElementById("enemweak4_load").onclick = function () {
    enemweak4_load_all();
}

document.getElementById("enemweak4s_load").onclick = function () {
    enemweak4s_load_all();
}
//
document.getElementById("heoexp1_load").onclick = function () {
    heoexp1_load_all();
}

document.getElementById("heoexp1s_load").onclick = function () {
    heoexp1s_load_all();
}

document.getElementById("heoexp2_load").onclick = function () {
    heoexp2_load_all();
}

document.getElementById("heoexp2s_load").onclick = function () {
    heoexp2s_load_all();
}

document.getElementById("heoexp3_load").onclick = function () {
    heoexp3_load_all();
}

document.getElementById("heoexp3s_load").onclick = function () {
    heoexp3s_load_all();
}

document.getElementById("heoexp4_load").onclick = function () {
    heoexp4_load_all();
}

document.getElementById("heoexp4s_load").onclick = function () {
    heoexp4s_load_all();
}

document.getElementById("heoexp5_load").onclick = function () {
    heoexp5_load_all();
}

document.getElementById("heoexp5s_load").onclick = function () {
    heoexp5s_load_all();
}

document.getElementById("herospeed1_load").onclick = function () {
    herospeed1_load_all();
}

document.getElementById("herospeed1s_load").onclick = function () {
    herospeed1s_load_all();
}

document.getElementById("herospeed2_load").onclick = function () {
    herospeed2_load_all();
}

document.getElementById("herospeed2s_load").onclick = function () {
    herospeed2s_load_all();
}

document.getElementById("herospeed3_load").onclick = function () {
    herospeed3_load_all();
}

document.getElementById("herospeed3s_load").onclick = function () {
    herospeed3s_load_all();
}

document.getElementById("magdefense1_load").onclick = function () {
    magdefense1_load_all();
}

document.getElementById("magdefense1s_load").onclick = function () {
    magdefense1s_load_all();
}

document.getElementById("magdefense2_load").onclick = function () {
    magdefense2_load_all();
}

document.getElementById("magdefense2s_load").onclick = function () {
    magdefense2s_load_all();
}

document.getElementById("magdefense3_load").onclick = function () {
    magdefense3_load_all();
}

document.getElementById("magdefense3s_load").onclick = function () {
    magdefense3s_load_all();
}

document.getElementById("magdefense4_load").onclick = function () {
    magdefense4_load_all();
}

document.getElementById("magdefense4s_load").onclick = function () {
    magdefense4s_load_all();
}

document.getElementById("magdefense5_load").onclick = function () {
    magdefense5_load_all();
}

document.getElementById("magdefense5s_load").onclick = function () {
    magdefense5s_load_all();
}
//
document.getElementById("maxdef1_load").onclick = function () {
    maxdef1_load_all();
}
document.getElementById("maxdef1s_load").onclick = function () {
    maxdef1s_load_all();
}

document.getElementById("maxdef2_load").onclick = function () {
    maxdef2_load_all();
}

document.getElementById("maxdef2s_load").onclick = function () {
    maxdef2s_load_all();
}

document.getElementById("maxdef3_load").onclick = function () {
    maxdef3_load_all();
}

document.getElementById("maxdef3s_load").onclick = function () {
    maxdef3s_load_all();
}

document.getElementById("maxdefally1_load").onclick = function () {
    maxdefally1_load_all();
}

document.getElementById("maxdefally1s_load").onclick = function () {
    maxdefally1s_load_all();
}

document.getElementById("maxdefally2_load").onclick = function () {
    maxdefally2_load_all();
}

document.getElementById("maxdefally2s_load").onclick = function () {
    maxdefally2s_load_all();
}

document.getElementById("protectally1_load").onclick = function () {
    protectally1_load_all();
}

document.getElementById("protectally1s_load").onclick = function () {
    protectally1s_load_all();
}

document.getElementById("protectally2_load").onclick = function () {
    protectally2_load_all();
}

document.getElementById("protectally2s_load").onclick = function () {
    protectally2s_load_all();
}

document.getElementById("protectally3_load").onclick = function () {
    protectally3_load_all();
}

document.getElementById("protectally3s_load").onclick = function () {
    protectally3s_load_all();
}

document.getElementById("protectally4_load").onclick = function () {
    protectally4_load_all();
}

document.getElementById("protectally4s_load").onclick = function () {
    protectally4s_load_all();
}
//
document.getElementById("protection1_load").onclick = function () {
    protection1_load_all();
}

document.getElementById("protection1s_load").onclick = function () {
    protection1s_load_all();
}

document.getElementById("protection2_load").onclick = function () {
    protection2_load_all();
}

document.getElementById("protection2s_load").onclick = function () {
    protection2s_load_all();
}

document.getElementById("protection3_load").onclick = function () {
    protection3_load_all();
}

document.getElementById("protection3s_load").onclick = function () {
    protection3s_load_all();
}

document.getElementById("protection4_load").onclick = function () {
    protection4_load_all();
}

document.getElementById("protection4s_load").onclick = function () {
    protection4s_load_all();
}

document.getElementById("protection5_load").onclick = function () {
    protection5_load_all();
}

document.getElementById("protection5s_load").onclick = function () {
    protection5s_load_all();
}

document.getElementById("terr1_load").onclick = function () {
    terr1_load_all();
}

document.getElementById("terr1s_load").onclick = function () {
    terr1s_load_all();
}

document.getElementById("terr2_load").onclick = function () {
    terr2_load_all();
}

document.getElementById("terr2s_load").onclick = function () {
    terr2s_load_all();
}

document.getElementById("terr3_load").onclick = function () {
    terr3_load_all();
}

document.getElementById("terr3s_load").onclick = function () {
    terr3s_load_all();
}



    $("#load_in_file").bind('click', function () {
        $("#files").click();
    });

    $('#files').bind('change', function () {
        readBlob();
    });

    $('.search_input').bind('keyup', function () {
        var thisObj = $(this);
        var val = $.trim(thisObj.val()).toLowerCase();
        if (val == '') {
            thisObj.parent().find('.div_magick').css('display', 'inline-block');
            //TODO: показать все
        }
        var num = thisObj.data('num');

        var len = db_magick.length;
        do {
            len--;
            if (db_magick[len][0].toLowerCase().indexOf(val) + 1) {
                $("#div_magick_" + num + '_' + len).css('display', 'inline-block');
            }
            else {
                $("#div_magick_" + num + '_' + len).hide();
            }
        } while (len);
        var tmp = 'бесстрашие';
        if (tmp.indexOf(val) + 1) {
            $("#div_magick_" + num + '_120').css('display', 'inline-block');
        }
        else {
            $("#div_magick_" + num + '_120').hide();
        }
        $('.hide_this_magick').hide();
    });

    function readBlob() {

        var files = document.getElementById('files').files;
        if (!files.length) {
            alert('Please select a file!');
            return;
        }

        var file = files[0];
        var start = 0;
        var stop = file.size - 1;

        var reader = new FileReader();

        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                var data = evt.target.result;

                
                var all3 = JSON.parse(data);
                var skill_ost_mech = all3.skill_ost_mech;
                if (all3.other !== false) {
                    spes = all3.other[0];
                    max_z = all3.other[1];
                    teretory = all3.other[2];
                    limit_b = all3.other[3];
                    lvl_mb_1 = all3.other[4];
                    lvl_mb_2 = all3.other[5];
                    lvl_bb_1 = all3.other[6];
                    lvl_bb_2 = all3.other[7];
                    kol_vo_yb = all3.other[8];
                    victory = all3.other[9];
                    type_raz_ = all3.other[10];
                    $("#type_doing").val(type_raz_);
                    num_volna = all3.other[11];
                    ficha_ruinu = all3.other[12];
                    othero = all3.other[13];
                    if (all3.other[15] == undefined)
                        all3.other[15] = false;
                    kz = all3.other[15];

                    if (all3.other[16] == undefined)
                        all3.other[16] = [db_gate[0][1], db_gate[0][1], db_gate[0][1]];
                    gate_hp = all3.other[16];
                    if (all3.other[17] == undefined)
                        all3.other[17] = 0;
                    gate_lvl = all3.other[17];
                    if (all3.other[18] == undefined)
                        all3.other[18] = [false, false, false];
                    flags_gate = all3.other[18];

                    if (flags_gate[num_volna] && kz) {
                        document.getElementById("gate_add").style.display = 'none';
                        document.getElementById("gate").style.display = 'inline-block';
                    }
                    else {
                        document.getElementById("gate_add").style.display = 'inline-block';
                        document.getElementById("gate").style.display = 'none';
                    }

                    $("#hp_gate").val(gate_hp[num_volna]);
                    checkShowOrHideKZ();

                    if (all3.other[14] == undefined) {
                        go_back = [0, 0, 0, 0, 0];
                    }
                    else {
                        go_back = all3.other[14];
                    }



                    if (all3.other[19] != undefined) {
                        hero_vkl = all3.other[19];
                        for (var u = 0; u < 3; u++) {
                            for (var p = 0; p < 3; p++) {
                                hero_voln[u][p].rewrite(all3.other[20][u][p]);
                            }
                        }
                    }

                    if (all3.other[21] != undefined) {
                        type_server = all3.other[21];
                    }
                    else {
                        type_server = 1;
                    }
                    $('.type_server input[type=radio]').removeAttr('checked');
                    $('#servak-' + type_server).attr('checked', 'checked');
                    miniFun();


                    //выствляем номер волны
                    document.getElementById("b1").style.background = "#FFFFFF";
                    document.getElementById("b2").style.background = "#FFFFFF";
                    document.getElementById("b3").style.background = "#FFFFFF";
                    document.getElementById("b" + (num_volna + 1)).style.background = "#66FFFF";
                    //герой включен ли
                    //фон

                    $("#armor_content_left").removeClass().addClass('terr_' + teretory);

                    //ОТКЛ ГЕРОЯ!!!!!!!!!!!!

                    //башень
                    if (limit_b) {
                        if (limit_b == 1) { //если только одна башня
                            if (lvl_mb_1 > -1) { //если магическая
                                document.getElementById('mb_add').style.display = 'none';
                                document.getElementById('bb_add').style.display = 'inline-block';
                                document.getElementById('mb1').style.display = 'inline-block';
                                document.getElementById('mb2').style.display = 'none';
                                document.getElementById('bb1').style.display = 'none';
                                document.getElementById('bb2').style.display = 'none';
                            }
                            else { //если простая
                                document.getElementById('mb_add').style.display = 'inline-block';
                                document.getElementById('bb_add').style.display = 'none';
                                document.getElementById('mb1').style.display = 'none';
                                document.getElementById('mb2').style.display = 'none';
                                document.getElementById('bb1').style.display = 'inline-block';
                                document.getElementById('bb2').style.display = 'none';
                            }
                        }
                        else {//если две башни
                            if (lvl_mb_1 > -1 && lvl_mb_2 > -1) {//две магические
                                document.getElementById('bb1').style.display = 'none';
                                document.getElementById('bb2').style.display = 'none';
                                document.getElementById('bb_add').style.display = 'none';
                                document.getElementById('mb_add').style.display = 'none';
                                document.getElementById('mb1').style.display = 'inline-block';
                                document.getElementById('mb2').style.display = 'inline-block';
                                document.getElementById('plas_mb1').style.display = 'none';
                                //document.getElementById('plas_mb2').style.display = 'none';
                                document.getElementById('del_mb1').style.display = 'none';
                                document.getElementById('del_mb2').style.display = 'inline-block';
                            }
                            else {
                                if (lvl_mb_1 > -1) { //по одной каждого типа
                                    document.getElementById('bb2').style.display = 'none';
                                    document.getElementById('mb2').style.display = 'none';
                                    document.getElementById('bb_add').style.display = 'none';
                                    document.getElementById('mb_add').style.display = 'none';
                                    document.getElementById('mb1').style.display = 'inline-block';
                                    document.getElementById('bb1').style.display = 'inline-block';
                                    document.getElementById('plas_mb1').style.display = 'none';
                                    document.getElementById('plas_bb1').style.display = 'none';
                                    document.getElementById('del_mb1').style.display = 'inline-block';
                                    document.getElementById('del_bb1').style.display = 'inline-block';
                                }
                                else { //две простые башни
                                    document.getElementById('mb1').style.display = 'none';
                                    document.getElementById('mb2').style.display = 'none';
                                    document.getElementById('mb_add').style.display = 'none';
                                    document.getElementById('bb_add').style.display = 'none';
                                    document.getElementById('bb1').style.display = 'inline-block';
                                    document.getElementById('bb2').style.display = 'inline-block';
                                    document.getElementById('plas_bb1').style.display = 'none';
                                    //document.getElementById('plas_bb2').style.display = 'none';
                                    document.getElementById('del_bb1').style.display = 'none';
                                    document.getElementById('del_bb2').style.display = 'inline-block';
                                }
                            }
                        }
                    }
                    else {
                        document.getElementById('mb_add').style.display = 'inline-block';
                        document.getElementById('bb_add').style.display = 'inline-block';
                        document.getElementById('mb1').style.display = 'none';
                        document.getElementById('mb2').style.display = 'none';
                        document.getElementById('bb1').style.display = 'none';
                        document.getElementById('bb2').style.display = 'none';
                    }
                    //ставим соответствующие картинки на башни

                    lvl_mb_1 > -1 ? $("#mb1_img").html(lvl_mb_1 + 1) : $("#mb1_img").html(1);
                    lvl_mb_2 > -1 ? $("#mb2_img").html(lvl_mb_2 + 1) : $("#mb2_img").html(1);
                    lvl_bb_1 > -1 ? $("#bb1_img").html(lvl_bb_1 + 1) : $("#bb1_img").html(1);
                    lvl_bb_2 > -1 ? $("#bb2_img").html(lvl_bb_2 + 1) : $("#bb2_img").html(1);
                    //                    document.getElementById("mb1_img").src = do_name_b("M",lvl_mb_1>-1?lvl_mb_1:0);
                    //                    document.getElementById("mb2_img").src = do_name_b("M",lvl_mb_2>-1?lvl_mb_2:0);
                    //                    document.getElementById("bb1_img").src = do_name_b("B",lvl_bb_1>-1?lvl_bb_1:0);
                    //                    document.getElementById("bb2_img").src = do_name_b("B",lvl_bb_2>-1?lvl_bb_2:0);
                    //укрепления
                    var ik, sm;
                    for (ik = 0, sm = 0; ik < 8; ik++) {
                        sm += kol_vo_yb[ik];
                        document.getElementById('_Y' + ik).value = kol_vo_yb[ik];
                    }
                    if (sm) {
                        yb_add();
                    }
                    else {
                        yb_delete();
                    }

                    document.getElementById("ter").selectedIndex = teretory;
                    $("#mz").attr("checked", max_z);
                    $("#oz").attr("checked", othero);
                    $("#kz").attr("checked", kz);
                    spec_change(spes);

                }


                //растановка данных и шмоток как при save
                for (var m = 0; m < 7; m++) {
                    //скрываем дивы с октивными заклнаниями внизу
                    if (all3.unitu[m] !== false) {
                        var tmp = unitu[m].hero;
                        unitu[m].rewrite(all3.unitu[m]);
                        unitu[m].input_true();
                        //растановка рас вклюая руины
                        unitu[m].change_type(true);
                        unitu[m].otst_true();//не пашет
                        unitu[m].checked_true();
                        if (tmp && all3.heroes[m] === false) {
                            unitu[m].hero = true;
                        }

                    }
                    if (all3.heroes[m] !== false) {
                        for (var ms = 0; ms < 160; ms++) {
                            document.getElementById("pas_do_magick_" + m + "_" + ms).style.display = 'none';
                        }

                        heroes[m].rewrite(all3.heroes[m]);
                        heroes[m].hero_true(true, m);
                        heroes[m].hide_all_dress();
                    }
                }

                if (heroes[2].magick[118]) {
                    document.getElementById("magic_on_hero_2").style.display = 'inline-block';
                } else {
                    document.getElementById("do_magick_2_118").style.display = 'none';
                }


                //закрыть открыть дивы
                unitu[1].div_true();
                unitu[3].div_true();
                unitu[4].div_true();
                unitu[5].div_true();
                unitu[6].div_true();


            }
        };

        var blob = file.slice(start, stop + 1);
        reader.readAsBinaryString(blob);
    }

    $("#save_in_file").bind("click", function () {
        var check_varion = [];
        var check_hero = [];
        $(".check_worion").each(function () {
            var thisObj = $(this);
            check_varion[parseInt(thisObj.data('id'))] = thisObj.is(':checked');
        });

        $(".check_hero_save").each(function () {
            var thisObj = $(this);
            check_hero[parseInt(thisObj.data('id'))] = thisObj.is(':checked');
        });

        var lanshaft = $("#lanshaft").is(':checked');

        all3.skill_ost_mech = skill_ost_mech;

        var all = new Object();
        all.unitu = new Object();
        all.heroes = new Object();
        for (var k = 7; k--;) {
            check_varion[k] ? all.unitu[k] = unitu[k] : all.unitu[k] = false;
            check_hero[k] ? all.heroes[k] = heroes[k] : all.heroes[k] = false;
        }
        if (lanshaft) {
            all.other = new Array(
                spes,
                max_z,
                teretory,
                limit_b,
                lvl_mb_1,
                lvl_mb_2,
                lvl_bb_1,
                lvl_bb_2,
                kol_vo_yb,
                victory,
                type_raz_,
                num_volna,
                ficha_ruinu,
                othero,
                go_back,
                kz,
                gate_hp,
                gate_lvl,
                flags_gate,
                hero_vkl,
                hero_voln,
                type_server
            );
        }
        else {
            all.other = false;
        }

        var str = JSON.stringify(all);
        if ($.browser.msie) //jQuery used
        {
            var mydoc = window.open();
            mydoc.document.write(str);
            mydoc.document.execCommand("saveAs", true, ".txt");
        }
        else {
            var mydoc = window.open("data:application/download;charset=utf-8;base64," + btoa(str)); // see http://en.wikipedia.org/wiki/Data_URI_scheme
        }

    });

    $('#open_ditals').click(function () {
        $('#open_ditals').hide();
        $('#ditals').show();
    })

    $('.closs_ditals').click(function () {
        $('#open_ditals').show();
        $('#ditals').hide();
    })

    $('#open_ditals_maraderstvo').click(function () {
        $('#open_ditals_maraderstvo').hide();
        $('#maraderstvo').show();
    })

    $('.closs_ditals_maraderstvo').click(function () {
        $('#open_ditals_maraderstvo').show();
        $('#maraderstvo').hide();
    })

    $('#open_cost').click(function () {
        $('#open_cost').hide();
        $('#cost').show();
    })

    $('.closs_cost').click(function () {
        $('#open_cost').show();
        $('#cost').hide();
    })

    document.getElementById("begin").onclick = function () {
        rashet();
    }
    unitu[0].min_max = 0;
    unitu[1].min_max = 0;
    unitu[6].min_max = 0;
    unitu[2].min_max = 1;
    unitu[3].min_max = 1;
    unitu[4].min_max = 1;
    unitu[5].min_max = 1;

    if ($_GET['saveID'] != undefined)
        load_all($_GET['saveID']);
}

function min_max_select() {
    type_raz_ = document.getElementById("type_doing").selectedIndex;
    document.getElementById("setting_min_max").style.display = 'none';

    switch (type_raz_) {
        case 0:
            {
                unitu[0].min_max = 0;
                unitu[1].min_max = 0;
                unitu[6].min_max = 0;
                unitu[2].min_max = 1;
                unitu[3].min_max = 1;
                unitu[4].min_max = 1;
                unitu[5].min_max = 1;
                break;
            }
        case 1:
            {
                unitu[0].min_max = 1;
                unitu[1].min_max = 1;
                unitu[6].min_max = 1;
                unitu[2].min_max = 0;
                unitu[3].min_max = 0;
                unitu[4].min_max = 0;
                unitu[5].min_max = 0;
                break;
            }
        case 2:
            {
                unitu[0].min_max = 1;
                unitu[1].min_max = 1;
                unitu[6].min_max = 1;
                unitu[2].min_max = 3;
                unitu[3].min_max = 3;
                unitu[4].min_max = 3;
                unitu[5].min_max = 3;
                break;
            }
        case 3:
            {
                unitu[0].min_max = 0;
                unitu[1].min_max = 0;
                unitu[6].min_max = 0;
                unitu[2].min_max = 3;
                unitu[3].min_max = 3;
                unitu[4].min_max = 3;
                unitu[5].min_max = 3;
                break;
            }
        case 4:
            {
                unitu[0].min_max = 3;
                unitu[1].min_max = 3;
                unitu[6].min_max = 3;
                unitu[2].min_max = 1;
                unitu[3].min_max = 1;
                unitu[4].min_max = 1;
                unitu[5].min_max = 1;
                break;
            }
        case 5:
            {
                unitu[0].min_max = 3;
                unitu[1].min_max = 3;
                unitu[6].min_max = 3;
                unitu[2].min_max = 0;
                unitu[3].min_max = 0;
                unitu[4].min_max = 0;
                unitu[5].min_max = 0;
                break;
            }
        case 6:
            {
                unitu[0].min_max = 2;
                unitu[1].min_max = 2;
                unitu[6].min_max = 2;
                unitu[2].min_max = 2;
                unitu[3].min_max = 2;
                unitu[4].min_max = 2;
                unitu[5].min_max = 2;
                break;
            }
        case 7:
            {
                document.getElementById("setting_min_max").style.display = 'block';
                document.getElementById("type_doing_0").selectedIndex = unitu[0].min_max;
                document.getElementById("type_doing_1").selectedIndex = unitu[1].min_max;
                document.getElementById("type_doing_6").selectedIndex = unitu[6].min_max;
                document.getElementById("type_doing_2").selectedIndex = unitu[2].min_max;
                document.getElementById("type_doing_3").selectedIndex = unitu[3].min_max;
                document.getElementById("type_doing_4").selectedIndex = unitu[4].min_max;
                document.getElementById("type_doing_5").selectedIndex = unitu[5].min_max;
                break;
            }
    }
}

function one_min_max(num) {
    unitu[num].min_max = document.getElementById("type_doing_" + num).selectedIndex;
}

function calcCostDead() {
    cost_dead_army = [[0, 0, 0, 0, 0], //цена убитых атакующиз
    [0, 0, 0, 0, 0]];

    var numArr = 0;
    for (var i = 0; i < 7; i++) {
        if (i >= 2 && i <= 5)
            numArr = 1;
        else
            numArr = 0;

        if (unitu[i].bul_v_boy) {
            var tmpArrayCost = db_cost;
            if (unitu[i].type == 4) {
                if (kz && i == 2) {
                    tmpArrayCost = db_cost_casol_monster;
                }
                else {
                    tmpArrayCost = db_cost_monster;
                }
            }

            for (var k = 0; k < 8; k++) {
                var tmpVal = parseInt($("#min_unitu_" + i + "_" + k).val());
                if (!isNaN(tmpVal) && 0 != tmpVal) {
                    for (var xm = 0; xm < 5; xm++)
                        cost_dead_army[numArr][xm] += tmpVal * tmpArrayCost[k][unitu[i].lvl[k]][1 + xm];
                }
            }
        }
    }

}

function calculate_marader() {
    var countProcAtacSum = 0;
    var countProcDeffSum = 0;
    var mainLimit = parseInt($('#marader_lvl').val());

    if (mainLimit < 1 || mainLimit > 100)
        return false;
    calcCostDead();
    var countAtac = [parseInt($('#marad_lvl_0').val()), 0, 0];
    var countDeff = [parseInt($('#marad_lvl_2').val()), 0, 0, 0];

    if (unitu[1].bul_v_boy)
        countAtac[1] = parseInt($('#marad_lvl_1').val());
    if (unitu[6].bul_v_boy)
        countAtac[2] = parseInt($('#marad_lvl_6').val());
    if (unitu[3].bul_v_boy)
        countDeff[1] = parseInt($('#marad_lvl_3').val());
    if (unitu[4].bul_v_boy)
        countDeff[2] = parseInt($('#marad_lvl_4').val());
    if (unitu[5].bul_v_boy)
        countDeff[3] = parseInt($('#marad_lvl_5').val());

    countProcAtacSum = countAtac[0] + countAtac[1] + countAtac[2];
    countProcDeffSum = countDeff[0] + countDeff[1] + countDeff[2] + countDeff[3];

    unitu[0].count_marader = countAtac[0];
    unitu[1].count_marader = countAtac[1];
    unitu[6].count_marader = countAtac[2];
    unitu[2].count_marader = countDeff[0];
    unitu[3].count_marader = countDeff[1];
    unitu[4].count_marader = countDeff[2];
    unitu[5].count_marader = countDeff[3];

    if (countProcAtacSum > mainLimit) {
        var mnojetel = mainLimit / countProcAtacSum;
        for (var c = 0; c < countAtac.length; c++)
            countAtac[c] *= mnojetel;
    }

    if (countProcDeffSum > mainLimit) {
        var mnojetel = mainLimit / countProcDeffSum;
        for (var c = 0; c < countDeff.length; c++)
            countDeff[c] *= mnojetel;
    }
    calcMaraderOne(0, cost_dead_army[1], countAtac[0]);
    calcMaraderOne(1, cost_dead_army[1], countAtac[1]);
    calcMaraderOne(6, cost_dead_army[1], countAtac[2]);

    calcMaraderOne(2, cost_dead_army[0], countDeff[0]);
    calcMaraderOne(3, cost_dead_army[0], countDeff[1]);
    calcMaraderOne(4, cost_dead_army[0], countDeff[2]);
    calcMaraderOne(5, cost_dead_army[0], countDeff[3]);

}

function calcMaraderOne(num, cost, proc) {
    for (var i = 0; i < 5; i++) {
        $('#cost_marad_' + num + '_' + i).val(Math.round(cost[i] / 100 * proc * -1));
    }
}

//todo: check number logick for this function
function rashet() {

    try {
        min_max_select();
        //    if(auto_start_bool){
        //        auto_start_bool = false;
        //        for(i=0;i<8;i++){
        //            unitu[0].qq[i] = document.getElementById('input_0_'+i).value;
        //        }
        //    }
        damagInBatle = [0, 0, 0, 0, 0, 0, 0];
        //масив параметров отступления для бонуса ловушки
        // alert(unitu[0].qq[0] + " " + unitu[0].vq[0]);
        var otst = [unitu[0].otst, unitu[1].otst, unitu[6].otst];
        //обнуление всех переменных от прошлого подсчета    
        for (i = 0; i < 7; i++) {
            // heroes[i].efects_new();
            //TODO: разобраться с ефектом от костюма
            unitu[i].proc();
            unitu[i].null_bonusu();
            unitu[i].null_proc_damag();
            unitu[i].win = false;
            unitu[i].xxx = 0;
            unitu[i].presled_damag = [0, 0, 0, 0];
            for (var cmx = 0; cmx < 8; cmx++)
                unitu[i].qq[cmx] = unitu[i].vq[num_volna][cmx];
        }

        //заклятие жалость
        if (heroes[2].magick[118]) {
            unitu[0].plus_bonus(861, unitu[2].type, unitu[0].type);
            unitu[1].plus_bonus(861, unitu[2].type, unitu[1].type);
            unitu[6].plus_bonus(861, unitu[2].type, unitu[6].type);
        }

        //определение кто чей враг по рассе
        unitu[0].type_vrag = unitu[2].type;
        unitu[1].type_vrag = unitu[2].type;
        unitu[6].type_vrag = unitu[2].type;
        unitu[2].type_vrag = unitu[0].type;
        unitu[3].type_vrag = unitu[0].type;
        unitu[4].type_vrag = unitu[0].type;
        unitu[5].type_vrag = unitu[0].type;

        //востановление значений в бою
        unitu[0].boy = true;
        unitu[2].boy = true;
        if (unitu[1].bul_v_boy) {
            unitu[1].boy = true;
        }
        if (unitu[3].bul_v_boy) {
            unitu[3].boy = true;
        }
        if (unitu[4].bul_v_boy) {
            unitu[4].boy = true;
        }
        if (unitu[5].bul_v_boy) {
            unitu[5].boy = true;
        }
        if (unitu[6].bul_v_boy) {
            unitu[6].boy = true;
        }

        //настройка полей и дивов для вывода подробной инфы
        for (i = 0; i < 20; i++) {
            $('#raund_' + i).hide();
        }
        $(".ditals_inp").val('').css({ 'border-color': '#BBB', 'color': 'black' });

        //делаем отступников
        falses = true;
        if (unitu[0].type == unitu[2].type && !unitu[2].red && unitu[0].type != 4) {
            unitu[0].red = true;
            unitu[0].bonus_damag_add_all(-50);
        }
        if (unitu[1].type == unitu[2].type && !unitu[2].red && unitu[0].type != 4) {
            unitu[1].red = true;
            unitu[1].bonus_damag_add_all(-50);
        }
        if (unitu[6].type == unitu[2].type && !unitu[2].red && unitu[0].type != 4) {
            unitu[6].red = true;
            unitu[6].bonus_damag_add_all(-50);
        }
        if (unitu[2].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[2].red = true;
        }
        if (unitu[3].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[3].red = true;
        }
        if (unitu[4].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[4].red = true;
        }
        if (unitu[5].type == unitu[0].type && !unitu[0].red && unitu[0].type != 4) {
            unitu[5].red = true;
        }
        //подсвечуем отсупников если это не сделал пользователь
        for (var iks = 0; iks < 7; iks++) {
            if (unitu[iks].bul_v_boy) {
                $("#red_" + iks).attr("checked", unitu[iks].red);
            }
        }
        //-=-=-расчет бонусов
        kalk_bonusu();
        //       

 
        //бонусы фракционки
        if ((!unitu[0].type && unitu[2].type == 1 || !unitu[2].type && unitu[0].type == 1 || !unitu[0].type && unitu[2].type == 6 || !unitu[2].type && unitu[0].type == 6  || unitu[0].type == 2 && unitu[2].type == 3 || unitu[0].type == 3 && unitu[2].type == 2 || unitu[0].type == 2 && unitu[2].type == 5 || unitu[0].type == 5 && unitu[2].type == 2 || unitu[0].type == 3 && unitu[2].type == 5 || unitu[0].type == 5 && unitu[2].type == 3 ) && !unitu[2].red) {
            unitu[0].bonus_damag_add_all(-25);
        }
        if ((!unitu[1].type && unitu[2].type == 1 || !unitu[2].type && unitu[1].type == 1 || !unitu[1].type && unitu[2].type == 6 || !unitu[2].type && unitu[1].type == 6  || unitu[1].type == 2 && unitu[2].type == 3 || unitu[1].type == 3 && unitu[2].type == 2 || unitu[1].type == 2 && unitu[2].type == 5 || unitu[1].type == 5 && unitu[2].type == 2 || unitu[1].type == 3 && unitu[2].type == 5 || unitu[1].type == 5 && unitu[2].type == 3 ) && !unitu[2].red) {
            unitu[1].bonus_damag_add_all(-25);
        }

        //бонусы защиты от укреплений

        bonus_ot_yb = kol_vo_yb[0] * db_yb_tmp[0][spes][1] + kol_vo_yb[1] * db_yb_tmp[1][spes][1] + kol_vo_yb[2] * db_yb_tmp[2][spes][1] + kol_vo_yb[3] * db_yb_tmp[3][spes][1] + kol_vo_yb[4] * db_yb_tmp[4][spes][1] + kol_vo_yb[5] * db_yb_tmp[5][spes][1] + kol_vo_yb[6] * db_yb_tmp[6][spes][1] + kol_vo_yb[7] * db_yb_tmp[7][spes][1];
        i = 0;
        do {
            unitu[2].bonusu[i] += bonus_ot_yb;
            i++;
        } while (i < 8);
        //бонусы макс защиты
        if (max_z) {
            i = 0;
            do {
                unitu[2].bonusu[i] = 75;
                i++;
            } while (i < 8);
        }

        //массив для бонуа урона магов (костыль заклинания "усиление магов")
        var mag_bonus = [0, 0, 0, 0, 0, 0, 0, 0];

        //-=-=-валидация бонусов
        for (i = 0; i < 7; i++) {
            mag_bonus[i] = unitu[i].bonusu[15];
            unitu[i].limit_bonus_all(8, 15, -90, false);//проверка урона на превышение -90%
            unitu[i].limit_bonus(24, 75, true); //проверка лимита макс защиты 
            unitu[i].limit_bonus(24, 0, false); //проверка лимита мин защиты 

            if (i == 2) {
                for (var ppp = 0; ppp < 8; ppp++) {
                    //               if(unitu[i].bonusu[24]<75&&max_z){
                    //                   unitu[i].bonusu[ppp] -= (75-unitu[i].bonusu[24]);
                    //               }

                    if (max_z) {
                        unitu[i].bonusu[ppp] = unitu[i].bonusu[24];
                    }

                }
            }

            unitu[i].limit_bonus_all(0, 7, unitu[i].bonusu[24], true);//проверка защиты на превышение лимита
            unitu[i].limit_bonus_all(0, 7, 0, false);//проверка защиты на превышение лимита
            unitu[i].limit_bonus(35, 90, true); //проверка лимита побега

            unitu[i].limit_bonus(40, -90, false); //проверка лимита мин атаки
            unitu[i].limit_bonus(41, -90, false); //проверка лимита мин атаки
            unitu[i].limit_bonus(42, -90, false); //проверка лимита мин атаки
            unitu[i].limit_bonus(43, -90, false); //проверка лимита мин атаки
            //
            //запись самых первых значений войск в масив с волнами
            unitu[i].volna_save();
        }
        //бонус простой башни
        unitu[2].bonusu[44] = unitu[2].bonusu[44] < (-100) ? -100 : unitu[2].bonusu[44];

        //-=-=-побег войск

        //проверка на ловушку 36
        if (heroes[2].magick[36]) {
            unitu[0].bonusu[35] = 0;
            unitu[1].bonusu[35] = 0;
            unitu[0].otst = 100;
            unitu[1].otst = 100;
            unitu[6].bonusu[35] = 0;
            unitu[6].otst = 100;
        }
        //проверка на шмотку королевского кастюма

        
        for (var zk = 0; zk <= 6; zk++) {
 if (heroes[0].dress[7] == 46 || heroes[1].dress[7] == 46 || heroes[6].dress[7] == 46 || heroes[0].magick[120] != 0 || heroes[1].magick[120] != 0  || heroes[6].magick[120] != 0) 
 {

if ((heroes[2].dress[7] == 48 || heroes[3].dress[7] == 48 || heroes[4].dress[7] == 48 || heroes[5].dress[7] == 48) && (unitu[0].bonusu[35] != 0 || unitu[1].bonusu[35] != 0 || unitu[6].bonusu[35] != 0)) 
{
    
    if ((heroes[2].dress_old[7] == 1 && heroes[2].dress[7] == 48) || (heroes[3].dress_old[7] == 1 && heroes[3].dress[7] == 48) || (heroes[4].dress_old[7] == 1 && heroes[4].dress[7] == 48) || (heroes[5].dress_old[7] == 1 && heroes[5].dress[7] == 48))
    {
      
       if (zk === 0 || zk === 1 || zk === 6) 
       {
            if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0 )
            { 
                if (zk === 0)
            {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;} // Добавляет только юнитам 0 и 1
            }

            if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
            { 
                if (zk === 1)
            {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;} // Добавляет только юнитам 0 и 1
            }

            if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
            { 
                if (zk === 6)
            {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;} // Добавляет только юнитам 0 и 1
            }
       }        

    }
    else
    {
        if ((heroes[2].dress_old[7] == 0 && heroes[2].dress[7] == 48) || (heroes[3].dress_old[7] == 0 && heroes[3].dress[7] == 48) || (heroes[4].dress_old[7] == 0 && heroes[4].dress[7] == 48) || (heroes[5].dress_old[7] == 0 && heroes[5].dress[7] == 48))
        {
            
      
           if (zk === 0 || zk === 1 || zk === 6) 
           {
                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                { 
                    if (zk === 0)
                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;} // Добавляет только юнитам 0 и 1
                }
    
                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                { 
                    if (zk === 1)
                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;} // Добавляет только юнитам 0 и 1
                }
    
                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                { 
                    if (zk === 6)
                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;} // Добавляет только юнитам 0 и 1
                }
           }

        }
    }     
            
        }
        else 
        {
            /* Если нет матери, то убираем ужас вообще */
            if (heroes[2].dress[7] != 48 && heroes[3].dress[7] != 48 && heroes[4].dress[7] != 48 && heroes[5].dress[7] != 48)
            
                {                
                  
                    if (heroes[0].dress[7] == 46 || heroes[0].magick[120] != 0 )
                    { 
                        if (zk === 0)
                    {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                    }
        
                    if (heroes[1].dress[7] == 46 || heroes[1].magick[120] != 0)
                    { 
                        if (zk === 1)
                    {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                    }
        
                    if (heroes[6].dress[7] == 46 || heroes[6].magick[120] != 0)
                    { 
                        if (zk === 6)
                    {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                    }

                
            }
        }


            }


/* ДРУГАЯ СТОРОНА */ /* ДРУГАЯ СТОРОНА */ /* ДРУГАЯ СТОРОНА */ /* ДРУГАЯ СТОРОНА */ /* ДРУГАЯ СТОРОНА */ /* ДРУГАЯ СТОРОНА */


            if (heroes[2].dress[7] == 46 || heroes[3].dress[7] == 46 || heroes[4].dress[7] == 46 || heroes[5].dress[7] == 46 || heroes[2].magick[120] != 0  || heroes[3].magick[120] != 0  || heroes[4].magick[120] != 0 || heroes[5].magick[120] != 0) 
            {
           if ((heroes[0].dress[7] == 48 || heroes[1].dress[7] == 48 || heroes[6].dress[7] == 48) && (unitu[2].bonusu[35] != 0 || unitu[3].bonusu[35] != 0 || unitu[4].bonusu[35] != 0 || unitu[5].bonusu[35] != 0)) 
           
           {
               if ((heroes[0].dress_old[7] == 1 && heroes[0].dress[7] == 48) || (heroes[1].dress_old[7] == 1 && heroes[1].dress[7] == 48) || (heroes[6].dress_old[7] == 1  && heroes[6].dress[7] == 48))
               {

                    if (zk === 2 || zk === 3 || zk === 4 || zk === 5) 
                    {
                        /* Срезаем только перчатку */
                                /* Срезаем только перчатку */
                                if (heroes[zk].dress[7] == 46  || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 2)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;}
                                }
                                
                                if (heroes[zk].dress[7] == 46  || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 3)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;}
                                }

                                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 4)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;}
                                }

                                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 5)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.6;}
                                }
                    }

               }
               else
               {
                   if ((heroes[0].dress_old[7] == 0 && heroes[0].dress[7] == 48) || (heroes[1].dress_old[7] == 0 && heroes[1].dress[7] == 48) || (heroes[6].dress_old[7] == 0  && heroes[6].dress[7] == 48))
                   {

                            if (zk === 2 || zk === 3 || zk === 4 || zk === 5) 
                            {
                                /* Срезаем только перчатку */
                                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 2)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;}
                                }
                               
                                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 3)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;}
                                }

                                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 4)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;}
                                }

                                if (heroes[zk].dress[7] == 46 || heroes[zk].magick[120] != 0)
                                {
                                    if (zk === 5)
                                {unitu[zk].bonusu[35] = unitu[zk].bonusu[35] * 0.5;}
                                }
                            }
                            
                   }
               }
                   }

                   else 
                   {
                       /* Если нет матери, то убираем ужас вообще */
                       if (heroes[zk].dress[7] != 48)
                       
                           {                

                            if (heroes[2].dress[7] == 46 || heroes[2].magick[120] != 0 )
                            { 
                                if (zk === 2)
                            {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                            }
                
                            if (heroes[3].dress[7] == 46 || heroes[3].magick[120] != 0)
                            { 
                                if (zk === 3)
                            {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                            }
                
                            if (heroes[4].dress[7] == 46 || heroes[4].magick[120] != 0)
                            { 
                                if (zk === 4)
                            {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                            }

                            if (heroes[5].dress[7] == 46 || heroes[5].magick[120] != 0)
                            { 
                                if (zk === 5)
                            {unitu[zk].bonusu[35] = 0} // Добавляет только юнитам 0 и 1
                            }

                       }
                   }

                   
                       }
            
    }
        i = 6;
        do {
            if (unitu[i].bul_v_boy) {
                $('#escape_' + i).show();
                $('#back_' + i).show();
            }
            //если есть побег
            if (unitu[i].bonusu[35] && !go_back[i]) {

                j = 7;
                do {

                    unitu[i].qq0[j] = unitu[i].qq[j] > 0 ? (unitu[i].qq[j] / 100) * unitu[i].bonusu[35] : 0;
                    unitu[i].qq[j] -= unitu[i].qq0[j];
                    unitu[i].qq0[j] = Math.round(unitu[i].qq0[j]);
                    unitu[i].qq[j] = Math.round(unitu[i].qq[j]);
                    if (unitu[i].qq0[j]) {
                        $('#escape_' + i + '_' + j).val(-unitu[i].qq0[j]).css({ 'border-color': 'red', 'color': 'red' });
                        $('#back_' + i + '_' + j).val('+' + unitu[i].qq0[j]).css(
                            {
                                'border-color': 'green',
                                'color': 'green'
                            });

                            
                    }
                    j--;

                }

                while (j + 1);
                unitu[i].proc();
                //todo пересчитать бонусь отсупления
            }

            i--;
        } while (i + 1);

        
        //-=-=-проход укреплений
        //todo dobavit summu unitov pogibshux na ykrepleniah(zashitnik)
        var sum_for_yb_zash = [(unitu[2].sum_units() - unitu[2].qq[6]), (unitu[3].sum_units() - unitu[3].qq[6]), (unitu[4].sum_units() - unitu[4].qq[6]), (unitu[5].sum_units() - unitu[5].qq[6])];
        var poteri_ot_yb_zash = (Math.round(unitu[0].bonusu[48] /*+ (unitu[0].bonusu[48]/100) *unitu[0].bonusu[28]*/));

        if (unitu[1].bul_v_boy)
            poteri_ot_yb_zash += (Math.round(unitu[1].bonusu[48] /*+ (unitu[1].bonusu[48]/100) *unitu[1].bonusu[28]*/));

        if (unitu[6].bul_v_boy)
            poteri_ot_yb_zash += (Math.round(unitu[6].bonusu[48] /*+ (unitu[6].bonusu[48]/100) *unitu[6].bonusu[28]*/));

        //подсчет будущих сметрников + бонус
        var poteri_ot_yb = kol_vo_yb[0] * db_yb_tmp[0][spes][0] +
            kol_vo_yb[1] * db_yb_tmp[1][spes][0] +
            kol_vo_yb[2] * db_yb_tmp[2][spes][0] +
            kol_vo_yb[3] * db_yb_tmp[3][spes][0] +
            kol_vo_yb[4] * db_yb_tmp[4][spes][0] +
            kol_vo_yb[5] * db_yb_tmp[5][spes][0] +
            kol_vo_yb[6] * db_yb_tmp[6][spes][0] +
            kol_vo_yb[7] * db_yb_tmp[7][spes][0];
        poteri_ot_yb += (Math.round((poteri_ot_yb / 100) * unitu[2].bonusu[28]) + unitu[2].bonusu[48]);
        //todo добавить потери от союзников
        if (unitu[3].bul_v_boy)
            poteri_ot_yb += (Math.round(unitu[3].bonusu[48] + (unitu[3].bonusu[48] / 100) * unitu[3].bonusu[28]));
        if (unitu[4].bul_v_boy)
            poteri_ot_yb += (Math.round(unitu[4].bonusu[48] + (unitu[4].bonusu[48] / 100) * unitu[4].bonusu[28]));
        if (unitu[5].bul_v_boy)
            poteri_ot_yb += (Math.round(unitu[5].bonusu[48] + (unitu[5].bonusu[48] / 100) * unitu[5].bonusu[28]));
        poteri_ot_yb = poteri_ot_yb > 0 ? poteri_ot_yb : 0;
        poteri_ot_yb_zash = poteri_ot_yb_zash > 0 ? poteri_ot_yb_zash : 0;

        var sum_for_yb = [(unitu[0].sum_units() - unitu[0].qq[6]), (unitu[1].sum_units() - unitu[1].qq[6]), (unitu[6].sum_units() - unitu[6].qq[6])];

        if (!unitu[1].bul_v_boy) {
            sum_for_yb[1] = 0;
            $('#go_ykrp_1').hide();
        }
        else {
            $('#go_ykrp_1').show();
        }
        if (!unitu[6].bul_v_boy) {
            sum_for_yb[2] = 0;
            $('#go_ykrp_6').hide();
        }
        else {
            $('#go_ykrp_6').show();
        }

        if (!unitu[2].bul_v_boy) {
            sum_for_yb_zash[0] = 0;
            $('#go_ykrp_2').hide();
        }
        else {
            $('#go_ykrp_2').show();
        }

        if (!unitu[3].bul_v_boy) {
            sum_for_yb_zash[1] = 0;
            $('#go_ykrp_3').hide();
        }
        else {
            $('#go_ykrp_3').show();
        }

        if (!unitu[4].bul_v_boy) {
            sum_for_yb_zash[2] = 0;
            $('#go_ykrp_4').hide();
        }
        else {
            $('#go_ykrp_4').show();
        }

        if (!unitu[5].bul_v_boy) {
            sum_for_yb_zash[3] = 0;
            $('#go_ykrp_5').hide();
        }
        else {
            $('#go_ykrp_5').show();
        }
        //соотношение потерь по союзникам
        var tmpSum = ((sum_for_yb[0] + sum_for_yb[1] + sum_for_yb[2]) / 100);
        unitu[0].proc_damag = (sum_for_yb[0]) / tmpSum;
        unitu[0].proc_damag = isNaN(unitu[0].proc_damag) ? 0 : unitu[0].proc_damag;
        unitu[1].proc_damag = unitu[0].proc_damag < 100 ? (sum_for_yb[1]) / tmpSum : 0;
        unitu[1].proc_damag = isNaN(unitu[1].proc_damag) ? 0 : unitu[1].proc_damag;
        unitu[6].proc_damag = unitu[0].proc_damag < 100 ? (sum_for_yb[2]) / tmpSum : 0;
        unitu[6].proc_damag = isNaN(unitu[6].proc_damag) ? 0 : unitu[6].proc_damag;

        tmpSum = ((sum_for_yb_zash[0] + sum_for_yb_zash[1] + sum_for_yb_zash[2] + sum_for_yb_zash[3]) / 100);

        unitu[2].proc_damag = (sum_for_yb_zash[0]) / tmpSum;
        unitu[2].proc_damag = isNaN(unitu[2].proc_damag) ? 0 : unitu[2].proc_damag;

        unitu[3].proc_damag = (sum_for_yb_zash[1]) / tmpSum;
        unitu[3].proc_damag = isNaN(unitu[3].proc_damag) ? 0 : unitu[3].proc_damag;

        unitu[4].proc_damag = (sum_for_yb_zash[2]) / tmpSum;
        unitu[4].proc_damag = isNaN(unitu[4].proc_damag) ? 0 : unitu[4].proc_damag;

        unitu[5].proc_damag = (sum_for_yb_zash[3]) / tmpSum;
        unitu[5].proc_damag = isNaN(unitu[5].proc_damag) ? 0 : unitu[5].proc_damag;
        //сотношение в нутри
        unitu[0].procentu_dla_damaga_yb();
        unitu[1].procentu_dla_damaga_yb();
        unitu[2].procentu_dla_damaga_yb();
        unitu[3].procentu_dla_damaga_yb();
        unitu[4].procentu_dla_damaga_yb();
        unitu[5].procentu_dla_damaga_yb();
        unitu[6].procentu_dla_damaga_yb();

        //нанесение потерь
        i = 8;
        var time_var;
        do {
            i--;
            time_var = Math.round((((poteri_ot_yb / 100) * unitu[0].proc_damag) / 100) * unitu[0].proc_damag_unitu[i]);
            if (time_var > unitu[0].qq[i])
                time_var = unitu[0].qq[i];
            unitu[0].qq[i] -= time_var;
            if (unitu[0].qq[i] < 0) {
                unitu[0].qq[i] = 0;
            }
            if (time_var) {
                $('#go_ykrp_0_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
            }
            if (unitu[1].proc_damag > 0) {
                time_var = Math.round((((poteri_ot_yb / 100) * unitu[1].proc_damag) / 100) * unitu[1].proc_damag_unitu[i]);
                if (time_var > unitu[1].qq[i])
                    time_var = unitu[1].qq[i];
                unitu[1].qq[i] -= time_var;
                if (unitu[1].qq[i] < 0) {
                    unitu[1].qq[i] = 0;
                }
                if (time_var) {
                    $('#go_ykrp_1_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
                }
            }

            if (unitu[6].proc_damag > 0) {

                time_var = Math.round((((poteri_ot_yb / 100) * unitu[6].proc_damag) / 100) * unitu[6].proc_damag_unitu[i]);
                if (time_var > unitu[6].qq[i])
                    time_var = unitu[6].qq[i];
                unitu[6].qq[i] -= time_var;
                if (unitu[6].qq[i] < 0) {
                    unitu[6].qq[i] = 0;
                }
                if (time_var) {
                    $('#go_ykrp_6_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
                }
            }

            if (unitu[2].proc_damag > 0) {

                time_var = Math.round((((poteri_ot_yb_zash / 100) * unitu[2].proc_damag) / 100) * unitu[2].proc_damag_unitu[i]);
                if (time_var > unitu[2].qq[i])
                    time_var = unitu[2].qq[i];
                unitu[2].qq[i] -= time_var;
                if (unitu[2].qq[i] < 0) {
                    unitu[2].qq[i] = 0;
                }
                if (time_var) {
                    $('#go_ykrp_2_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
                }
            }

            if (unitu[3].proc_damag > 0) {

                time_var = Math.round((((poteri_ot_yb_zash / 100) * unitu[3].proc_damag) / 100) * unitu[3].proc_damag_unitu[i]);
                if (time_var > unitu[3].qq[i])
                    time_var = unitu[3].qq[i];
                unitu[3].qq[i] -= time_var;
                if (unitu[3].qq[i] < 0) {
                    unitu[3].qq[i] = 0;
                }
                if (time_var) {
                    $('#go_ykrp_3_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
                }
            }

            if (unitu[4].proc_damag > 0) {

                time_var = Math.round((((poteri_ot_yb_zash / 100) * unitu[4].proc_damag) / 100) * unitu[4].proc_damag_unitu[i]);
                if (time_var > unitu[4].qq[i])
                    time_var = unitu[4].qq[i];
                unitu[4].qq[i] -= time_var;
                if (unitu[4].qq[i] < 0) {
                    unitu[4].qq[i] = 0;
                }
                if (time_var) {
                    $('#go_ykrp_4_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
                }
            }

            if (unitu[5].proc_damag > 0) {

                time_var = Math.round((((poteri_ot_yb_zash / 100) * unitu[5].proc_damag) / 100) * unitu[5].proc_damag_unitu[i]);
                if (time_var > unitu[5].qq[i])
                    time_var = unitu[5].qq[i];
                unitu[5].qq[i] -= time_var;
                if (unitu[5].qq[i] < 0) {
                    unitu[5].qq[i] = 0;
                }
                if (time_var) {
                    $('#go_ykrp_5_' + i).val(-time_var).css({ 'border-color': 'red', 'color': 'red' });
                }
            }
        } while (i);

        //проверка на участие в бою
        //союзников
        if (unitu[0].boy) unitu[0].go_home();
        if (unitu[1].boy) unitu[1].go_home();
        if (unitu[6].boy) unitu[6].go_home();
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        //-=-=-раунды(1-20)
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

        var big_cukl = 0;
        mbb = [lvl_mb_1, lvl_mb_2, lvl_bb_1, lvl_bb_2];
        damag_bb = [0, 0, 0, 0]; //кастыль для заклятие "катапульта"
        do {

            if (big_cukl == 0) {
                $('#gateEnd').val(0);
                gate_hp[num_volna] = parseInt($.trim($("#hp_gate").val()));
            }

            $('#raund_' + big_cukl).show();

            dead_unit = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 8; j++) {
                    dead_unit[i][j] = unitu[i].qq[j];
                }
            }

            //=-=-=-=кастыль катапульта   
            //расчет среднего дамага для маг.башен
            if (mbb[0] > -1 || mbb[1] > -1) {
                unitu[2].nanas_damag_all(0);
                damag_na_zaw = unitu[2].ataks;
                unitu[2].ataks = 0;
                unitu[2].nanas_damag_all(1);
                sredn_damag = (damag_na_zaw + unitu[2].ataks) / 2;
                unitu[2].ataks = 0;
            }
            //наносимый дамаг со сторон
            damag_na_zaw = 0;
            damag_na_atk = 0;
            //расчет дамага башен +/-бонусы +/-плавающие бонусы
            //магические

            if (mbb[0] > -1) {
                damag_bb[0] = sredn_damag * db_mb_tmp[mbb[0]];
                if (mbb[1] > -1) {
                    damag_bb[1] = sredn_damag * db_mb_tmp[mbb[1]];
                }
                //подавление дамага башен бонусами
                damag_bb[0] = ((damag_bb[0] / 100) * (100 + unitu[2].bonusu[30]));
                damag_bb[1] = ((damag_bb[1] / 100) * (100 + unitu[2].bonusu[30]));
            }


            //простые
            if (mbb[2] > -1) {
                switch (unitu[2].min_max) {
                    case 0:
                        {
                            damag_bb[2] = (db_bb_tmp[mbb[2]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                            break;
                        }
                    case 1:
                        {
                            damag_bb[2] = (db_bb_tmp[mbb[2]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                            break;
                        }
                    case 2:
                        {
                            damag_bb[2] = (db_bb_tmp[mbb[2]][0] + random_value(db_bb_tmp[mbb[2]][2])) / 100 * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                            break;
                        }
                    case 3:
                        {
                            damag_bb[2] = (((db_bb_tmp[mbb[2]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]) + (db_bb_tmp[mbb[2]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes])) / 2.0);
                            break;
                        }
                }
                if (mbb[3] > -1) {
                    switch (unitu[3].min_max) {
                        case 0:
                            {
                                damag_bb[3] = (db_bb_tmp[mbb[3]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                                break;
                            }
                        case 1:
                            {
                                damag_bb[3] = (db_bb_tmp[mbb[3]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                                break;
                            }
                        case 2:
                            {
                                damag_bb[3] = (db_bb_tmp[mbb[3]][0] + random_value(db_bb_tmp[mbb[3]][2])) / 100 * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                                break;
                            }
                        case 3:
                            {
                                damag_bb[3] = (((db_bb_tmp[mbb[3]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]) + (db_bb_tmp[mbb[3]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes])) / 2.0);
                                break;
                            }
                    }
                }
            }
            num_b_kill = 0;
            //определяем у какой башни больший урон для "катапульты"
            for (var perem = 1; perem < 4; perem++) {
                if (damag_bb[num_b_kill] <= damag_bb[perem]) {
                    num_b_kill = perem;
                }
            }

            //=-=-=-=-=-кастыль катапульта конец 

            //заклятие катапульта и бонус от 10-й шапки
            if (heroes[0].magick[0] && unitu[0].hero ||
                heroes[1].magick[0] && unitu[1].hero ||
                heroes[6].magick[0] && unitu[6].hero ||
                heroes[0].dress[0] == 10 && teretory == 7 ||
                heroes[1].dress[0] == 10 && teretory == 7 ||
                heroes[6].dress[0] == 10 && teretory == 7) {
                mbb[num_b_kill]--;
            }

            //расчет среднего дамага для маг.башен
            if (mbb[0] > -1 || mbb[1] > -1) {
                unitu[2].nanas_damag_all(0);
                damag_na_zaw = unitu[2].ataks;
                unitu[2].ataks = 0;
                unitu[2].nanas_damag_all(1);
                sredn_damag = (damag_na_zaw + unitu[2].ataks) / 2;
                unitu[2].ataks = 0;
            }
            //наносимый дамаг со сторон
            damag_na_zaw = 0;
            damag_na_atk = 0;
            //расчет дамага башен +/-бонусы +/-плавающие бонусы
            //магические

            if (mbb[0] > -1) {
                damag_na_atk += sredn_damag * db_mb_tmp[mbb[0]];
                if (mbb[1] > -1) {
                    damag_na_atk += sredn_damag * db_mb_tmp[mbb[1]];
                }
                //подавление дамага башен бонусами
                damag_na_atk = ((damag_na_atk / 100) * (100 + unitu[2].bonusu[30]));
            }

            //простые
            if (mbb[2] > -1) {
                switch (unitu[2].min_max) {
                    case 0:
                        {
                            damag_na_atk += (db_bb_tmp[mbb[2]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                            break;
                        }
                    case 1:
                        {
                            damag_na_atk += (db_bb_tmp[mbb[2]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                            break;
                        }
                    case 2:
                        {
                            damag_na_atk += (db_bb_tmp[mbb[2]][0] + random_value(db_bb_tmp[mbb[2]][2])) / 100 * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                            break;
                        }
                    case 3:
                        {
                            damag_na_atk += (((db_bb_tmpdb_bb_tmp[mbb[2]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]) + (db_bb_tmp[mbb[2]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes])) / 2.0);
                            break;
                        }
                }
                if (mbb[3] > -1) {
                    switch (unitu[3].min_max) {
                        case 0:
                            {
                                damag_na_atk += (db_bb_tmp[mbb[3]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                                break;
                            }
                        case 1:
                            {
                                damag_na_atk += (db_bb_tmp[mbb[3]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                                break;
                            }
                        case 2:
                            {
                                damag_na_atk += (db_bb_tmp[mbb[3]][0] + random_value(db_bb_tmp[mbb[3]][2])) / 100 * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]);
                                break;
                            }
                        case 3:
                            {
                                damag_na_atk += (((db_bb_tmp[mbb[3]][0] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes]) + (db_bb_tmp[mbb[3]][1] / 100) * (100 + unitu[2].bonusu[44] + db_mb_bonus[spes])) / 2.0);
                                break;
                            }
                    }
                }
            }

            //TODO: проверка на наличеи магов в бою
            //подавление дамага башен магами
            second_pod = tretiy_pod = 0;
            if (unitu[0].boy) {
                first_pod = unitu[0].qq[7] * db_u[unitu[0].type][7][unitu[0].lvl[7]][3];
            } else {
                first_pod = 0;
            }
            if (unitu[1].bul_v_boy) {
                if (unitu[1].boy)
                    second_pod = unitu[1].qq[7] * db_u[unitu[1].type][7][unitu[1].lvl[7]][3];
            } else {
                second_pod = 0;
            }
            if (unitu[6].bul_v_boy) {
                if (unitu[6].boy)
                    tretiy_pod = unitu[6].qq[7] * db_u[unitu[6].type][7][unitu[6].lvl[7]][3];
            } else {
                tretiy_pod = 0;
            }

            if (unitu[0].boy) {
                first_pod += first_pod / 100 * unitu[0].bonusu[49];
            } else {
                first_pod = 0;
            }
            if (unitu[1].bul_v_boy) {
                if (unitu[1].boy)
                    second_pod += second_pod / 100 * unitu[1].bonusu[49];
            } else {
                second_pod = 0;
            }
            if (unitu[6].bul_v_boy) {
                if (unitu[6].boy)
                    tretiy_pod += tretiy_pod / 100 * unitu[6].bonusu[49];
            } else {
                tretiy_pod = 0;
            }

            var tmpdamagInBattle = [0, 0, 0, 0, 0, 0, 0];
            damag_na_atk = damag_na_atk - first_pod - second_pod - tretiy_pod;
            damag_na_atk = damag_na_atk < 0 ? 0 : damag_na_atk;
            tmpdamagInBattle[2] += damag_na_atk;

            //расчет общего дамага +/- плавающие бонусы и просто бонусы
            //расчет без плавающих бонусов но с бонусами от эфектов
            if (unitu[0].boy) {
                unitu[0].nanas_damag_all(unitu[0].min_max);
                if (unitu[0].hero)
                    unitu[0].ataks += unitu[0].bonusu[36]; //бонусный левый дамаг от свитков и тд
            }
            ;

            if (unitu[6].bul_v_boy) {
                if (unitu[6].boy) {
                    unitu[6].nanas_damag_all(unitu[6].min_max);
                    if (unitu[6].hero)
                        unitu[6].ataks += unitu[6].bonusu[36];
                }
                ;
            } else {
                unitu[6].ataks = 0;
            }

            if (unitu[1].bul_v_boy) {
                if (unitu[1].boy) {
                    unitu[1].nanas_damag_all(unitu[1].min_max);
                    if (unitu[1].hero)
                        unitu[1].ataks += unitu[1].bonusu[36];
                }
                ;
            } else {
                unitu[1].ataks = 0;
            }

            var flagDo = true;
            if (kz) {
                if (flags_gate[num_volna] && gate_hp[num_volna] > 0)
                    flagDo = false;
            }

            if (flagDo) {
                if (unitu[2].boy) {
                    unitu[2].nanas_damag_all(unitu[2].min_max);
                    if (unitu[2].hero)
                        unitu[2].ataks += unitu[2].bonusu[36];
                }
                ;
                if (unitu[3].bul_v_boy) {
                    if (unitu[3].boy) {
                        unitu[3].nanas_damag_all(unitu[3].min_max);
                        if (unitu[3].hero)
                            unitu[3].ataks += unitu[3].bonusu[36];
                    }
                    ;
                } else {
                    unitu[3].ataks = 0;
                }
                if (unitu[4].bul_v_boy) {
                    if (unitu[4].boy) {
                        unitu[4].nanas_damag_all(unitu[4].min_max);
                        if (unitu[4].hero)
                            unitu[4].ataks += unitu[4].bonusu[36];
                    }
                    ;
                } else {
                    unitu[4].ataks = 0;
                }
                if (unitu[5].bul_v_boy) {
                    if (unitu[5].boy) {
                        unitu[5].nanas_damag_all(unitu[5].min_max);
                        if (unitu[5].hero)
                            unitu[5].ataks += unitu[5].bonusu[36];
                    }
                    ;
                } else {
                    unitu[5].ataks = 0;
                }
                damag_na_atk += (unitu[2].ataks + unitu[3].ataks + unitu[4].ataks + unitu[5].ataks);

            }

            //добавление к дамагу расчитаных дамагов войск
            damag_na_zaw += (unitu[0].ataks + unitu[1].ataks + unitu[6].ataks);

            //add damag in var for frukcuonka

            for (var pe = 0; pe < 7; pe++)
                tmpdamagInBattle[pe] += unitu[pe].ataks;

            //подавление общего дамага магами при наличии данного бонуса
            x_atk = unitu[0].qq[7] * (unitu[0].bonusu[29] > 0 ? unitu[0].bonusu[29] : 0);
            if (unitu[1].bul_v_boy) {
                x_atk += (unitu[1].qq[7] * (unitu[1].bonusu[29] > 0 ? unitu[1].bonusu[29] : 0));
            }
            if (unitu[6].bul_v_boy) {
                x_atk += (unitu[6].qq[7] * (unitu[6].bonusu[29] > 0 ? unitu[6].bonusu[29] : 0));
            }

            x_zaw = 0;
            if (flagDo)//todo может нужно отключить и разрешить подовлять в крепасти дамаг атакующих?
            {
                x_zaw = unitu[2].qq[7] * (unitu[2].bonusu[29] > 0 ? unitu[2].bonusu[29] : 0);
                if (unitu[3].bul_v_boy) {
                    x_zaw += (unitu[3].qq[7] * (unitu[3].bonusu[29] > 0 ? unitu[3].bonusu[29] : 0));
                }
                if (unitu[4].bul_v_boy) {
                    x_zaw += (unitu[4].qq[7] * (unitu[4].bonusu[29] > 0 ? unitu[4].bonusu[29] : 0));
                }
                if (unitu[5].bul_v_boy) {
                    x_zaw += (unitu[5].qq[7] * (unitu[5].bonusu[29] > 0 ? unitu[5].bonusu[29] : 0));
                }
            }

            damag_na_atk -= x_atk < 0 ? 0 : x_atk;
            damag_na_zaw -= x_zaw < 0 ? 0 : x_zaw;
            //валидность бонуса подавление дамага магами damag>=0
            if (damag_na_atk > 0) {
                var miniNum = 2;
                var strahovka = 0;
                while (x_atk--) {
                    if (tmpdamagInBattle[miniNum]) {
                        tmpdamagInBattle[miniNum]--;
                        strahovka = 0;
                    }
                    else {
                        strahovka++;
                        x_atk++;
                    }
                    if (strahovka > 10)
                        break;
                    miniNum++;
                    if (miniNum > 5)
                        miniNum = 2;
                }
            }
            else {
                damag_na_atk = 0;
                tmpdamagInBattle[2] = 0;
                tmpdamagInBattle[3] = 0;
                tmpdamagInBattle[4] = 0;
                tmpdamagInBattle[5] = 0;
            }

            if (damag_na_zaw > 0) {
                var miniNum = 0;
                var strahovka = 0;
                while (x_zaw--) {
                    if (tmpdamagInBattle[miniNum]) {
                        tmpdamagInBattle[miniNum]--;
                        strahovka = 0;
                    }
                    else {
                        strahovka++;
                        x_zaw++;
                    }
                    if (strahovka > 10)
                        break;

                    miniNum++;
                    if (miniNum == 2)
                        miniNum = 6;
                    if (miniNum > 6)
                        miniNum = 0;
                }
            }
            else {
                damag_na_zaw = 0;
                tmpdamagInBattle[0] = 0;
                tmpdamagInBattle[1] = 0;
                tmpdamagInBattle[5] = 0;
            }

            //расчет коофициэнтов получения
            //внутри сторон proc_damag
            sum_uns = [0, 0, 0, 0, 0, 0, 0];
            for (var mfp = 0; mfp < 7; mfp++) {
                sum_uns[mfp] = unitu[mfp].sum_units();
            }
            if (!unitu[1].bul_v_boy) {
                sum_uns[1] = 0;
            }
            if (!unitu[6].bul_v_boy) {
                sum_uns[6] = 0;
            }
            if (!unitu[3].bul_v_boy) {
                sum_uns[3] = 0;
            }
            if (!unitu[4].bul_v_boy) {
                sum_uns[4] = 0;
            }
            if (!unitu[5].bul_v_boy) {
                sum_uns[5] = 0;
            }


            var tmpSum = ((unitu[0].boy ? sum_uns[0] : 0) + (unitu[1].boy ? sum_uns[1] : 0) + (unitu[6].boy ? sum_uns[6] : 0)) / 100;
            unitu[0].proc_damag = sum_uns[0] / (tmpSum);
            unitu[0].proc_damag = isNaN(unitu[0].proc_damag) ? 0 : unitu[0].proc_damag;
            if (unitu[1].bul_v_boy) {
                unitu[1].proc_damag = unitu[1].boy ? (sum_uns[1] / (tmpSum)) : 0;
                unitu[1].proc_damag = isNaN(unitu[1].proc_damag) ? 0 : unitu[1].proc_damag;
            }
            if (unitu[6].bul_v_boy) {
                unitu[6].proc_damag = unitu[6].boy ? (sum_uns[6] / (tmpSum)) : 0;
                unitu[6].proc_damag = isNaN(unitu[6].proc_damag) ? 0 : unitu[6].proc_damag;
            }
            tmpSum = (unitu[2].boy ? sum_uns[2] : 0);
            if (unitu[3].bul_v_boy)
                tmpSum += (unitu[3].boy ? sum_uns[3] : 0);
            if (unitu[4].bul_v_boy)
                tmpSum += (unitu[4].boy ? sum_uns[4] : 0);
            if (unitu[5].bul_v_boy)
                tmpSum += (unitu[5].boy ? sum_uns[5] : 0);
            tmpSum /= 100;
            unitu[2].proc_damag = sum_uns[2] / (tmpSum);
            unitu[2].proc_damag = isNaN(unitu[2].proc_damag) ? 0 : unitu[2].proc_damag;
            if (unitu[3].bul_v_boy) {
                unitu[3].proc_damag = unitu[3].boy ? (sum_uns[3] / (tmpSum)) : 0;
                unitu[3].proc_damag = isNaN(unitu[3].proc_damag) ? 0 : unitu[3].proc_damag;
            }
            if (unitu[4].bul_v_boy) {
                unitu[4].proc_damag = unitu[4].boy ? (sum_uns[4] / (tmpSum)) : 0;
                unitu[4].proc_damag = isNaN(unitu[4].proc_damag) ? 0 : unitu[4].proc_damag;
            }
            if (unitu[5].bul_v_boy) {
                unitu[5].proc_damag = unitu[5].boy ? (sum_uns[5] / (tmpSum)) : 0;
                unitu[5].proc_damag = isNaN(unitu[5].proc_damag) ? 0 : unitu[5].proc_damag;
            }
            //внутри войск
            proc_for_all_u();

            //перевод процентов в дамаг 
            //дамаг в нутри сторон
            unitu[0].proc_damag = (damag_na_atk / 100) * unitu[0].proc_damag;
            unitu[1].proc_damag = (damag_na_atk / 100) * unitu[1].proc_damag;
            if (flagDo) {
                unitu[2].proc_damag = (damag_na_zaw / 100) * unitu[2].proc_damag;
                unitu[3].proc_damag = (damag_na_zaw / 100) * unitu[3].proc_damag;
                unitu[4].proc_damag = (damag_na_zaw / 100) * unitu[4].proc_damag;
                unitu[5].proc_damag = (damag_na_zaw / 100) * unitu[5].proc_damag;
            }
            unitu[6].proc_damag = (damag_na_atk / 100) * unitu[6].proc_damag;

            //дамаг в нутри войска    !!!!            
            in_damag_u();


            procentu = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
            //if (flagDo){
            //            //расчет дамага преследователей
            if (unitu[0].boy) unitu[0].presled_nanos();
            if (unitu[2].boy) unitu[2].presled_nanos();
            if (unitu[1].bul_v_boy) {
                if (unitu[1].boy) unitu[1].presled_nanos(); else unitu[1].presled_damag = [0, 0, 0, 0];
            }
            if (unitu[3].bul_v_boy) {
                if (unitu[3].boy) unitu[3].presled_nanos(); else unitu[3].presled_damag = [0, 0, 0, 0];
            }
            if (unitu[4].bul_v_boy) {
                if (unitu[4].boy) unitu[4].presled_nanos(); else unitu[4].presled_damag = [0, 0, 0, 0];
            }
            if (unitu[5].bul_v_boy) {
                if (unitu[5].boy) unitu[5].presled_nanos(); else unitu[5].presled_damag = [0, 0, 0, 0];
            }
            if (unitu[6].bul_v_boy) {
                if (unitu[6].boy) unitu[6].presled_nanos(); else unitu[6].presled_damag = [0, 0, 0, 0];
            }
            //
            //            //добавление дамага преследователей к процентному дамагу
            //            //перенос дамагов преследователей в переменные основных войск
            //            i=4;
            //            do{
            //                i--;
            //                if(unitu[1].bul_v_boy){unitu[0].presled_damag[i]+= unitu[1].presled_damag[i];}
            //                if(unitu[6].bul_v_boy){unitu[0].presled_damag[i]+= unitu[6].presled_damag[i];}
            //                if(unitu[3].bul_v_boy){unitu[2].presled_damag[i]+= unitu[3].presled_damag[i];}
            //                if(unitu[4].bul_v_boy){unitu[2].presled_damag[i]+= unitu[4].presled_damag[i];}
            //                if(unitu[5].bul_v_boy){unitu[2].presled_damag[i]+= unitu[5].presled_damag[i];}
            //            }while(i);
            //
            //            procentu = [[0,0,0,0],
            //                [0,0,0,0],
            //                [0,0,0,0],
            //                [0,0,0,0],
            //                [0,0,0,0],
            //                [0,0,0,0],
            //                [0,0,0,0]];//проценты наносимого дамага от преследователей в общем числе дамага по жертвам
            //            //добавление к дамагу дамага преследователей на пехоту, коней и летающих
            //            j=1;
            //            do{
            //                sum_qq = [unitu[0].qq[j],unitu[1].qq[j],unitu[2].qq[j],unitu[3].qq[j],unitu[4].qq[j],unitu[5].qq[j],unitu[6].qq[j]];
            //                if(!unitu[1].bul_v_boy){
            //                    sum_qq[1] = 0;
            //                }
            //                if(!unitu[3].bul_v_boy){
            //                    sum_qq[3] = 0;
            //                }
            //                if(!unitu[4].bul_v_boy){
            //                    sum_qq[4] = 0;
            //                }
            //                if(!unitu[5].bul_v_boy){
            //                    sum_qq[5] = 0;
            //                }
            //                if(!unitu[6].bul_v_boy){
            //                    sum_qq[6] = 0;
            //                }
            //                //соотношение в нутри стороны
            //                tmpSum = (sum_qq[0] + sum_qq[1] + sum_qq[6])/100;
            //                unitu[0].proc_damag = sum_qq[0]/tmpSum;
            //                unitu[0].proc_damag = isNaN(unitu[0].proc_damag) ? 0 : unitu[0].proc_damag;
            //                unitu[1].proc_damag = sum_qq[1]/tmpSum;
            //                unitu[1].proc_damag = isNaN(unitu[1].proc_damag) ? 0 : unitu[1].proc_damag;
            //                unitu[6].proc_damag = sum_qq[6]/tmpSum;
            //                unitu[6].proc_damag = isNaN(unitu[6].proc_damag) ? 0 : unitu[6].proc_damag;
            //                tmpSum = (sum_qq[2] + sum_qq[3] + sum_qq[4] + sum_qq[5])/100;
            //                unitu[2].proc_damag = sum_qq[2]/tmpSum;
            //                unitu[2].proc_damag = isNaN(unitu[2].proc_damag) ? 0 : unitu[2].proc_damag;
            //                unitu[3].proc_damag = sum_qq[3]/tmpSum;
            //                unitu[3].proc_damag = isNaN(unitu[3].proc_damag) ? 0 : unitu[3].proc_damag;
            //                unitu[4].proc_damag = sum_qq[4]/tmpSum;
            //                unitu[4].proc_damag = isNaN(unitu[4].proc_damag) ? 0 : unitu[4].proc_damag;
            //                unitu[5].proc_damag = sum_qq[5]/tmpSum;
            //                unitu[5].proc_damag = isNaN(unitu[5].proc_damag) ? 0 : unitu[5].proc_damag;
            //
            //                // распределение дамага и проверка на необходимость нанесения дамага
            //                unitu[0].proc_damag_unitu[j]+= (unitu[0].proc_damag>0 ? ((unitu[2].presled_damag[j] / 100) * unitu[0].proc_damag) : 0);
            //                unitu[1].proc_damag_unitu[j]+= (unitu[1].proc_damag>0 ? ((unitu[2].presled_damag[j] / 100) * unitu[1].proc_damag) : 0);
            //                unitu[6].proc_damag_unitu[j]+= (unitu[6].proc_damag>0 ? ((unitu[2].presled_damag[j] / 100) * unitu[6].proc_damag) : 0);
            //                unitu[2].proc_damag_unitu[j]+= (unitu[2].proc_damag>0 ? ((unitu[0].presled_damag[j] / 100) * unitu[2].proc_damag) : 0);
            //                unitu[3].proc_damag_unitu[j]+= (unitu[3].proc_damag>0 ? ((unitu[0].presled_damag[j] / 100) * unitu[3].proc_damag) : 0);
            //                unitu[4].proc_damag_unitu[j]+= (unitu[4].proc_damag>0 ? ((unitu[0].presled_damag[j] / 100) * unitu[4].proc_damag) : 0);
            //                unitu[5].proc_damag_unitu[j]+= (unitu[5].proc_damag>0 ? ((unitu[0].presled_damag[j] / 100) * unitu[5].proc_damag) : 0);
            //
            //                procentu[0][j-1] = ((unitu[2].presled_damag[j] / 100) * unitu[0].proc_damag);
            //                procentu[1][j-1] = ((unitu[2].presled_damag[j] / 100) * unitu[1].proc_damag);
            //                procentu[6][j-1] = ((unitu[6].presled_damag[j] / 100) * unitu[6].proc_damag);
            //                procentu[2][j-1] = ((unitu[0].presled_damag[j] / 100) * unitu[2].proc_damag);
            //                procentu[3][j-1] = ((unitu[0].presled_damag[j] / 100) * unitu[3].proc_damag);
            //                procentu[4][j-1] = ((unitu[0].presled_damag[j] / 100) * unitu[4].proc_damag);
            //                procentu[5][j-1] = ((unitu[0].presled_damag[j] / 100) * unitu[5].proc_damag);
            //                j++;
            //            }while(j<4);
            //
            //            //добавление к дамагу дамага преследователей на лучников
            //            sum_qq = [unitu[0].qq[j],unitu[1].qq[j],unitu[2].qq[j],unitu[3].qq[j],unitu[4].qq[j],unitu[5].qq[j],unitu[6].qq[j]];
            //            if(!unitu[1].bul_v_boy){
            //                sum_qq[1] = 0;
            //            }
            //            if(!unitu[3].bul_v_boy){
            //                sum_qq[3] = 0;
            //            }
            //            if(!unitu[4].bul_v_boy){
            //                sum_qq[4] = 0;
            //            }
            //            if(!unitu[5].bul_v_boy){
            //                sum_qq[5] = 0;
            //            }
            //            if(!unitu[6].bul_v_boy){
            //                sum_qq[6] = 0;
            //            }
            //            //соотношение в нутри стороны
            //
            //            tmpSum = (sum_qq[0] + sum_qq[1] + sum_qq[6])/100;
            //            unitu[0].proc_damag = sum_qq[0]/tmpSum;
            //            unitu[0].proc_damag = isNaN(unitu[0].proc_damag) ? 0 : unitu[0].proc_damag;
            //            unitu[1].proc_damag = sum_qq[1]/tmpSum;
            //            unitu[1].proc_damag = isNaN(unitu[1].proc_damag) ? 0 : unitu[1].proc_damag;
            //            unitu[6].proc_damag = sum_qq[6]/tmpSum;
            //            unitu[6].proc_damag = isNaN(unitu[6].proc_damag) ? 0 : unitu[6].proc_damag;
            //            tmpSum = (sum_qq[2] + sum_qq[3] + sum_qq[4] + sum_qq[5])/100;
            //            unitu[2].proc_damag = sum_qq[2]/tmpSum;
            //            unitu[2].proc_damag = isNaN(unitu[2].proc_damag) ? 0 : unitu[2].proc_damag;
            //            unitu[3].proc_damag = sum_qq[3]/tmpSum;
            //            unitu[3].proc_damag = isNaN(unitu[3].proc_damag) ? 0 : unitu[3].proc_damag;
            //            unitu[4].proc_damag = sum_qq[4]/tmpSum;
            //            unitu[4].proc_damag = isNaN(unitu[4].proc_damag) ? 0 : unitu[4].proc_damag;
            //            unitu[5].proc_damag = sum_qq[5]/tmpSum;
            //            unitu[5].proc_damag = isNaN(unitu[5].proc_damag) ? 0 : unitu[5].proc_damag;
            //
            //            // распределение дамага и проверка на необходимость нанесения дамага
            //            unitu[0].proc_damag_unitu[j] += unitu[0].proc_damag>0 ? ((unitu[2].presled_damag[0] / 100) * unitu[0].proc_damag) : 0;
            //            unitu[1].proc_damag_unitu[j] += unitu[1].proc_damag>0 ? ((unitu[2].presled_damag[0] / 100) * unitu[1].proc_damag) : 0;
            //            unitu[6].proc_damag_unitu[j] += unitu[6].proc_damag>0 ? ((unitu[2].presled_damag[0] / 100) * unitu[6].proc_damag) : 0;
            //            unitu[2].proc_damag_unitu[j] += unitu[2].proc_damag>0 ? ((unitu[0].presled_damag[0] / 100) * unitu[2].proc_damag) : 0;
            //            unitu[3].proc_damag_unitu[j] += unitu[3].proc_damag>0 ? ((unitu[0].presled_damag[0] / 100) * unitu[3].proc_damag) : 0;
            //            unitu[4].proc_damag_unitu[j] += unitu[4].proc_damag>0 ? ((unitu[0].presled_damag[0] / 100) * unitu[4].proc_damag) : 0;
            //            unitu[5].proc_damag_unitu[j] += unitu[5].proc_damag>0 ? ((unitu[0].presled_damag[0] / 100) * unitu[5].proc_damag) : 0;
            //
            //            procentu[0][j-1] = ((unitu[2].presled_damag[0] / 100) * unitu[0].proc_damag);
            //            procentu[1][j-1] = ((unitu[2].presled_damag[0] / 100) * unitu[1].proc_damag);
            //            procentu[6][j-1] = ((unitu[2].presled_damag[0] / 100) * unitu[6].proc_damag);
            //            procentu[2][j-1] = ((unitu[0].presled_damag[0] / 100) * unitu[2].proc_damag);
            //            procentu[3][j-1] = ((unitu[0].presled_damag[0] / 100) * unitu[3].proc_damag);
            //            procentu[4][j-1] = ((unitu[0].presled_damag[0] / 100) * unitu[4].proc_damag);
            //            procentu[5][j-1] = ((unitu[0].presled_damag[0] / 100) * unitu[5].proc_damag);
            //            //распределение дамага по порциям (в формуле не забыть бонусы к ХР)
            //  }

            ostatkiHP = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];

            var tmpFlag = false;
            if (kz)
                if (flags_gate[num_volna] && gate_hp[num_volna] > 0)
                    tmpFlag = true;
            kill_all_u(tmpFlag)


            //todo ostatkiHP


            //обнуляем переменный хранящие общую атаку войска
            null_ataks();

            first = true; //переменная отвечающая за первое погащение урона процентами
            //переводим -юнитов в дополнительный дамага (в формуле не забыть бонусы к ХР) округление выжевших и обнуление минуснутых
            second_damag_all_u();
            first = false;
            for (var zx = 0; zx < 7; zx++) {
                //разбераемся с остаточным дамагом
                //перерасчет коофициэнтов получения
                proc_for_all_u();

                unitu[0].proc_damag = unitu[0].ataks;
                unitu[1].proc_damag = unitu[1].ataks;
                unitu[6].proc_damag = unitu[6].ataks;

                unitu[2].proc_damag = unitu[2].ataks;
                unitu[3].proc_damag = unitu[3].ataks;
                unitu[4].proc_damag = unitu[4].ataks;
                unitu[5].proc_damag = unitu[5].ataks;

                //обнуляем переменный хранящие общую атаку войска
                null_ataks();

                //дамаг в нутри войска
                in_damag_u();

                //нанисение на выживших
                kill_all_u(tmpFlag);

                //обнуление минуснутых и округление
                second_damag_all_u();
            }
            //todo ne zabut dobavit k tmpdamagInBattle damag ot presledovateley
            //            //перенос дамагов преследователей в переменные основных войск
            i = 4;
            do {
                i--;
                if (unitu[1].bul_v_boy) {
                    unitu[0].presled_damag[i] += unitu[1].presled_damag[i];
                }
                if (unitu[6].bul_v_boy) {
                    unitu[0].presled_damag[i] += unitu[6].presled_damag[i];
                }
                if (unitu[3].bul_v_boy) {
                    unitu[2].presled_damag[i] += unitu[3].presled_damag[i];
                }
                if (unitu[4].bul_v_boy) {
                    unitu[2].presled_damag[i] += unitu[4].presled_damag[i];
                }
                if (unitu[5].bul_v_boy) {
                    unitu[2].presled_damag[i] += unitu[5].presled_damag[i];
                }
            } while (i);

            procentu = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];//проценты наносимого дамага от преследователей в общем числе дамага по жертвам
            //добавление к дамагу дамага преследователей на пехоту, коней и летающих
            j = 1;
            do {
                var sum_qq = [unitu[0].qq[j], unitu[1].qq[j], unitu[2].qq[j], unitu[3].qq[j], unitu[4].qq[j], unitu[5].qq[j], unitu[6].qq[j]];
                if (!unitu[1].bul_v_boy) {
                    sum_qq[1] = 0;
                }
                if (!unitu[3].bul_v_boy) {
                    sum_qq[3] = 0;
                }
                if (!unitu[4].bul_v_boy) {
                    sum_qq[4] = 0;
                }
                if (!unitu[5].bul_v_boy) {
                    sum_qq[5] = 0;
                }
                if (!unitu[6].bul_v_boy) {
                    sum_qq[6] = 0;
                }
                //соотношение в нутри стороны
                tmpSum = (sum_qq[0] + sum_qq[1] + sum_qq[6]) / 100;
                unitu[0].proc_damag = sum_qq[0] / tmpSum;
                unitu[0].proc_damag = isNaN(unitu[0].proc_damag) ? 0 : unitu[0].proc_damag;
                unitu[1].proc_damag = sum_qq[1] / tmpSum;
                unitu[1].proc_damag = isNaN(unitu[1].proc_damag) ? 0 : unitu[1].proc_damag;
                unitu[6].proc_damag = sum_qq[6] / tmpSum;
                unitu[6].proc_damag = isNaN(unitu[6].proc_damag) ? 0 : unitu[6].proc_damag;
                tmpSum = (sum_qq[2] + sum_qq[3] + sum_qq[4] + sum_qq[5]) / 100;
                unitu[2].proc_damag = sum_qq[2] / tmpSum;
                unitu[2].proc_damag = isNaN(unitu[2].proc_damag) ? 0 : unitu[2].proc_damag;
                unitu[3].proc_damag = sum_qq[3] / tmpSum;
                unitu[3].proc_damag = isNaN(unitu[3].proc_damag) ? 0 : unitu[3].proc_damag;
                unitu[4].proc_damag = sum_qq[4] / tmpSum;
                unitu[4].proc_damag = isNaN(unitu[4].proc_damag) ? 0 : unitu[4].proc_damag;
                unitu[5].proc_damag = sum_qq[5] / tmpSum;
                unitu[5].proc_damag = isNaN(unitu[5].proc_damag) ? 0 : unitu[5].proc_damag;

                // распределение дамага и проверка на необходимость нанесения дамага
                unitu[0].proc_damag_unitu[j] += (unitu[0].proc_damag > 0 ? ((unitu[2].presled_damag[j] / 100) * unitu[0].proc_damag) : 0);
                unitu[1].proc_damag_unitu[j] += (unitu[1].proc_damag > 0 ? ((unitu[2].presled_damag[j] / 100) * unitu[1].proc_damag) : 0);
                unitu[6].proc_damag_unitu[j] += (unitu[6].proc_damag > 0 ? ((unitu[2].presled_damag[j] / 100) * unitu[6].proc_damag) : 0);
                unitu[2].proc_damag_unitu[j] += (unitu[2].proc_damag > 0 ? ((unitu[0].presled_damag[j] / 100) * unitu[2].proc_damag) : 0);
                unitu[3].proc_damag_unitu[j] += (unitu[3].proc_damag > 0 ? ((unitu[0].presled_damag[j] / 100) * unitu[3].proc_damag) : 0);
                unitu[4].proc_damag_unitu[j] += (unitu[4].proc_damag > 0 ? ((unitu[0].presled_damag[j] / 100) * unitu[4].proc_damag) : 0);
                unitu[5].proc_damag_unitu[j] += (unitu[5].proc_damag > 0 ? ((unitu[0].presled_damag[j] / 100) * unitu[5].proc_damag) : 0);

                procentu[0][j - 1] = ((unitu[2].presled_damag[j] / 100) * unitu[0].proc_damag);
                procentu[1][j - 1] = ((unitu[2].presled_damag[j] / 100) * unitu[1].proc_damag);
                procentu[6][j - 1] = ((unitu[2].presled_damag[j] / 100) * unitu[6].proc_damag);
                procentu[2][j - 1] = ((unitu[0].presled_damag[j] / 100) * unitu[2].proc_damag);
                procentu[3][j - 1] = ((unitu[0].presled_damag[j] / 100) * unitu[3].proc_damag);
                procentu[4][j - 1] = ((unitu[0].presled_damag[j] / 100) * unitu[4].proc_damag);
                procentu[5][j - 1] = ((unitu[0].presled_damag[j] / 100) * unitu[5].proc_damag);
                j++;
            } while (j < 4);

            //добавление к дамагу дамага преследователей на лучников
            sum_qq = [unitu[0].qq[j], unitu[1].qq[j], unitu[2].qq[j], unitu[3].qq[j], unitu[4].qq[j], unitu[5].qq[j], unitu[6].qq[j]];
            if (!unitu[1].bul_v_boy) {
                sum_qq[1] = 0;
            }
            if (!unitu[3].bul_v_boy) {
                sum_qq[3] = 0;
            }
            if (!unitu[4].bul_v_boy) {
                sum_qq[4] = 0;
            }
            if (!unitu[5].bul_v_boy) {
                sum_qq[5] = 0;
            }
            if (!unitu[6].bul_v_boy) {
                sum_qq[6] = 0;
            }
            //соотношение в нутри стороны

            tmpSum = (sum_qq[0] + sum_qq[1] + sum_qq[6]) / 100;
            unitu[0].proc_damag = sum_qq[0] / tmpSum;
            unitu[0].proc_damag = isNaN(unitu[0].proc_damag) ? 0 : unitu[0].proc_damag;
            unitu[1].proc_damag = sum_qq[1] / tmpSum;
            unitu[1].proc_damag = isNaN(unitu[1].proc_damag) ? 0 : unitu[1].proc_damag;
            unitu[6].proc_damag = sum_qq[6] / tmpSum;
            unitu[6].proc_damag = isNaN(unitu[6].proc_damag) ? 0 : unitu[6].proc_damag;
            tmpSum = (sum_qq[2] + sum_qq[3] + sum_qq[4] + sum_qq[5]) / 100;
            unitu[2].proc_damag = sum_qq[2] / tmpSum;
            unitu[2].proc_damag = isNaN(unitu[2].proc_damag) ? 0 : unitu[2].proc_damag;
            unitu[3].proc_damag = sum_qq[3] / tmpSum;
            unitu[3].proc_damag = isNaN(unitu[3].proc_damag) ? 0 : unitu[3].proc_damag;
            unitu[4].proc_damag = sum_qq[4] / tmpSum;
            unitu[4].proc_damag = isNaN(unitu[4].proc_damag) ? 0 : unitu[4].proc_damag;
            unitu[5].proc_damag = sum_qq[5] / tmpSum;
            unitu[5].proc_damag = isNaN(unitu[5].proc_damag) ? 0 : unitu[5].proc_damag;

            // распределение дамага и проверка на необходимость нанесения дамага
            unitu[0].proc_damag_unitu[j] += unitu[0].proc_damag > 0 ? ((unitu[2].presled_damag[0] / 100) * unitu[0].proc_damag) : 0;
            unitu[1].proc_damag_unitu[j] += unitu[1].proc_damag > 0 ? ((unitu[2].presled_damag[0] / 100) * unitu[1].proc_damag) : 0;
            unitu[6].proc_damag_unitu[j] += unitu[6].proc_damag > 0 ? ((unitu[2].presled_damag[0] / 100) * unitu[6].proc_damag) : 0;
            unitu[2].proc_damag_unitu[j] += unitu[2].proc_damag > 0 ? ((unitu[0].presled_damag[0] / 100) * unitu[2].proc_damag) : 0;
            unitu[3].proc_damag_unitu[j] += unitu[3].proc_damag > 0 ? ((unitu[0].presled_damag[0] / 100) * unitu[3].proc_damag) : 0;
            unitu[4].proc_damag_unitu[j] += unitu[4].proc_damag > 0 ? ((unitu[0].presled_damag[0] / 100) * unitu[4].proc_damag) : 0;
            unitu[5].proc_damag_unitu[j] += unitu[5].proc_damag > 0 ? ((unitu[0].presled_damag[0] / 100) * unitu[5].proc_damag) : 0;

            procentu[0][j - 1] = ((unitu[2].presled_damag[0] / 100) * unitu[0].proc_damag);
            procentu[1][j - 1] = ((unitu[2].presled_damag[0] / 100) * unitu[1].proc_damag);
            procentu[6][j - 1] = ((unitu[2].presled_damag[0] / 100) * unitu[6].proc_damag);
            procentu[2][j - 1] = ((unitu[0].presled_damag[0] / 100) * unitu[2].proc_damag);
            procentu[3][j - 1] = ((unitu[0].presled_damag[0] / 100) * unitu[3].proc_damag);
            procentu[4][j - 1] = ((unitu[0].presled_damag[0] / 100) * unitu[4].proc_damag);
            procentu[5][j - 1] = ((unitu[0].presled_damag[0] / 100) * unitu[5].proc_damag);
            //распределение дамага по порциям (в формуле не забыть бонусы к ХР)

            kill_all_u(tmpFlag);

            //округляем и прибовляем остатки
            for (i = 0; i < 7; i++) {
                for (j = 0; j < 8; j++) {
                    ostatkiHP[i][j] = Math.round(ostatkiHP[i][j]);
                    if (0 != ostatkiHP[i][j])
                        unitu[i].qq[j] += ostatkiHP[i][j];
                }
            }


            //проверка если преследоватили убили больше чем нужно
            for (i = 0; i < 7; i++) {
                for (j = 0; j < 8; j++) {
                    if (unitu[i].qq[j] < 0)
                        unitu[i].qq[j] = 0;
                }
            }


            for (i = 0; i < 7; i++) {
                if (unitu[i].bul_v_boy) {

                    $('#raynd_' + big_cukl + '_' + i).show();
                    for (j = 0; j < 8; j++) {
                        var sum_d = unitu[i].qq[j] - dead_unit[i][j];
                        //                    if (tmpFlag && dead_unit[i][j] != 0 && dead_unit[i][j] == unitu[i].qq[j])
                        //                      sum_d =-unitu[i].qq[j];
                        if (sum_d) {
                            $('#raynd_' + big_cukl + '_' + i + '_' + j).val(sum_d).css({
                                'border-color': 'red',
                                'color': 'red'
                            });
                        }
                        //dead_unit[i][j] = unitu[i].qq[j];
                    }

                    if (tmpFlag && i >= 2 && i <= 5) {
                        for (j = 0; j < 8; j++) {
                            $('#raynd_' + big_cukl + '_' + i + '_' + j).val('').css({
                                'border-color': '#BBB',
                                'color': 'black'
                            });
                        }
                    }
                }
                else {
                    for (j = 0; j < 8; j++) {
                        $('#raynd_' + big_cukl + '_' + i + '_' + j).val('').css({
                            'border-color': '#BBB',
                            'color': 'black'
                        });
                    }
                }
            }

            //обнуляем переменный хранящие общую атаку войска
            null_ataks();


            for (var mg = 0; mg < 7; mg++)
                damagInBatle[mg] += tmpdamagInBattle[mg];

            var crashGate = null;
            if (flags_gate[num_volna] && kz && gate_hp[num_volna] > 0)///todo proverit na KZ
            {
                var tmpSumHP = 0;

                if (unitu[2].boy)
                    tmpSumHP += unitu[2].sum_hp_all();
                if (unitu[3].boy)
                    tmpSumHP += unitu[3].sum_hp_all();
                if (unitu[4].boy)
                    tmpSumHP += unitu[4].sum_hp_all();
                if (unitu[5].boy)
                    tmpSumHP += unitu[5].sum_hp_all();

                tmpSumHP = Math.floor(tmpSumHP / 10);

                //-подавление
                var minusHpCount = 0;
                damag_na_zaw -= db_gate[gate_lvl][0];
                if (0 > damag_na_zaw) damag_na_zaw = 0;
                else {
                    damag_na_zaw = Math.floor(damag_na_zaw - (damag_na_zaw / 1000 * tmpSumHP / 2000));
                }
                var tmpHpGate = Math.round(gate_hp[num_volna] /*+ (gate_hp[num_volna]/100*unitu[2].bonusu[51])*/);
                if (damag_na_zaw > tmpHpGate) {
                    gate_hp[num_volna] -= damag_na_zaw;
                    minusHpCount = -tmpHpGate;
                    //    crashGate = true
                    $("#crash").show();
                    $("#no-crash").hide();
                    switch (num_volna) {
                        case 0:
                            flags_gate[1] = false;
                            flags_gate[2] = false;
                            break;

                        case 1:
                            flags_gate[2] = false;
                            break;
                    }
                }
                else {
                    gate_hp[num_volna] -= damag_na_zaw;
                    minusHpCount = -damag_na_zaw;
                    // crashGate = false;
                    switch (num_volna) {
                        case 0:
                            gate_hp[1] = tmpHpGate + minusHpCount;
                            gate_hp[1] = Math.round(gate_hp[1]/*/100 *(100+unitu[2].bonusu[51])*/);
                            gate_hp[2] = gate_hp[1];
                            flags_gate[1] = true;
                            flags_gate[2] = true;
                            break;

                        case 1:
                            gate_hp[2] = tmpHpGate + minusHpCount;
                            gate_hp[2] = Math.round(gate_hp[2]/*/100 *(100+unitu[2].bonusu[51])*/);
                            flags_gate[2] = true;
                            break;
                    }
                    $("#crash").hide();
                    $("#no-crash").show();
                }

                var tmpObj = $('#gateEnd');
                var tmpMinus = parseInt(tmpObj.val());
                minusHpCount += tmpMinus;
                tmpObj.val(minusHpCount);


                if (minusHpCount < 0) {
                    document.getElementById("gateEnd").style.border = "2px  solid #ff0000";
                    document.getElementById("gateEnd").style.color = "#ff0000";
                }
                else {
                    document.getElementById("gateEnd").style.border = "2px solid #bbb";
                    document.getElementById("gateEnd").style.color = "#000";
                }
            }


            //flags_gate = [false,false,false];

            //todo
            //todo         var gate_hp = [0,0,0];
            //todo         var gate_lvl = 0;
            //todo


            //проверка достижение лимита отступления
            if (unitu[0].boy) unitu[0].go_home();
            if (unitu[2].boy) unitu[2].go_home();
            if (unitu[1].boy) unitu[1].go_home();
            if (unitu[3].boy) unitu[3].go_home();
            if (unitu[4].boy) unitu[4].go_home();
            if (unitu[5].boy) unitu[5].go_home();
            if (unitu[6].boy) unitu[6].go_home();

            //проверка на победителя
            if (!unitu[0].win && !unitu[1].win && !unitu[6].win) {
                unitu[2].win = true;
                if (unitu[3].bul_v_boy) unitu[3].win = true;
                if (unitu[4].bul_v_boy) unitu[4].win = true;
                if (unitu[5].bul_v_boy) unitu[5].win = true;
            }
            else {
                if ((unitu[0].win || unitu[1].win || unitu[6].win) && (!unitu[2].win && !unitu[3].win && !unitu[4].win && !unitu[5].win)) {
                    unitu[0].win = true;
                    if (unitu[1].bul_v_boy) unitu[1].win = true;
                    if (unitu[6].bul_v_boy) unitu[6].win = true;
                }
            }

            if (unitu[0].boy) unitu[0].null_proc_damag();
            if (unitu[2].boy) unitu[2].null_proc_damag();
            if (unitu[1].boy) unitu[1].null_proc_damag();
            if (unitu[3].boy) unitu[3].null_proc_damag();
            if (unitu[4].boy) unitu[4].null_proc_damag();
            if (unitu[5].boy) unitu[5].null_proc_damag();
            if (unitu[6].boy) unitu[6].null_proc_damag();

            //выход из цикла если все с одной стороны мертвы
            if (!unitu[0].boy && !unitu[1].boy && !unitu[6].boy || !unitu[2].boy && !unitu[3].boy && !unitu[4].boy && !unitu[5].boy) {
                break;
            }

            //кастыль заклинание "воодушевление магов"

 /*           for (var lick = 0; lick < 7; lick++) {
                if (unitu[lick].hero) {
                    if (heroes[lick].magick[7]) {
                        mag_bonus[lick] += (heroes[lick].magick[7] * 75);//20 это проценты за каждый уровень заклинания !!!
                        unitu[lick].bonusu[15] = mag_bonus[lick];
                        unitu[lick].limit_bonus(15, -90, false); //проверка лимита мин урона для мага 
                    }

                }
            }*/
           // alert(unitu[0].bonusu[15]+"До Цикла");


            /* РАБОЧИЙ КОД НА ВООДУШЕВЛЕНИе АРХИМАга НАРУЧИ */
for (var lick = 0; lick < 7; lick++) {
                    if (unitu[lick].hero){
                       if (heroes[lick].dress[9] == 44){
                          if (heroes[lick].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] +=  90;//Древний наруч архимага
                                }
                                else
                                {
                                    mag_bonus[lick] += 75;//Обычный наруч архимага
                                }
                       }

                    mag_bonus[lick] += (heroes[lick].magick[7] * 20);//20 это проценты за каждый уровень заклинания
                    mag_bonus[lick] += (heroes[lick].magick[119] * 30);//30 это проценты за каждый уровень заклинания
                    //mag_bonus[lick] += (heroes[lick].magick[???????] * 30);//30 это проценты за каждый уровень древнего заклинания, вместо вопросов номер в массиве заклов
                    }

            switch (lick){
                case 0:{//первый атакер
                  if (heroes[2].dress[9] == 12 && unitu[2].hero){//вместо вопросто номер комплекта антимага 2 лвл от главного защитника
                          if (heroes[2].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[2].dress[9] == 0 && unitu[2].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от главного защитника
                          if (heroes[2].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[3].dress[9] == 12 && unitu[3].hero){//вместо вопросто номер комплекта антимага 2 лвл от 1го дэфера
                          if (heroes[3].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[3].dress[9] == 0 && unitu[3].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го дэфера
                          if (heroes[3].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[4].dress[9] == 12 && unitu[4].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го дэфера
                          if (heroes[4].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[4].dress[9] == 0 && unitu[4].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го дэфера
                          if (heroes[4].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[5].dress[9] == 12 && unitu[5].hero){//вместо вопросто номер комплекта антимага 2 лвл от монстров в КЗ - не бывает, но если кто-то поставит, то будет считать
                          if (heroes[5].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[5].dress[9] == 0 &&unitu[5].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от мостров в КЗ - не бывает, но сли кто-то поставит, то будет считать
                          if (heroes[5].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
                case 1:{
                  if (heroes[2].dress[9] == 12 &&unitu[2].hero){//вместо вопросто номер комплекта антимага 2 лвл от главного защитника
                          if (heroes[2].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[2].dress[9] == 0 &&unitu[2].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от главного защитника
                          if (heroes[2].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[3].dress[9] == 12 &&unitu[3].hero){//вместо вопросто номер комплекта антимага 2 лвл от 1го дэфера
                          if (heroes[3].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[3].dress[9] == 0 &&unitu[3].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го дэфера
                          if (heroes[3].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[4].dress[9] == 12 &&unitu[4].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го дэфера
                          if (heroes[4].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[4].dress[9] == 0 &&unitu[4].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го дэфера
                          if (heroes[4].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[5].dress[9] == 12 &&unitu[5].hero){//вместо вопросто номер комплекта антимага 2 лвл от монстров в КЗ - не бывает, но если кто-то поставит, то будет считать
                          if (heroes[5].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[5].dress[9] == 0 &&unitu[5].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от мостров в КЗ - не бывает, но сли кто-то поставит, то будет считать
                          if (heroes[5].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
                case 2:{
                  if (heroes[0].dress[9] == 12 &&unitu[0].hero){//вместо вопросто номер комплекта антимага 2 лвл 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[0].dress[9] == 0 &&unitu[0].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[1].dress[9] == 12 &&unitu[1].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[1].dress[9] == 0 &&unitu[1].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[6].dress[9] == 12 &&unitu[6].hero){//вместо вопросто номер комплекта антимага 2 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[6].dress[9] == 0 &&unitu[6].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
                case 3:{
                  if (heroes[0].dress[9] == 12 &&unitu[0].hero){//вместо вопросто номер комплекта антимага 2 лвл 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[0].dress[9] == 0 &&unitu[0].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[1].dress[9] == 12 &&unitu[1].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[1].dress[9] == 0 &&unitu[1].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[6].dress[9] == 12 &&unitu[6].hero){//вместо вопросто номер комплекта антимага 2 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[6].dress[9] == 0 &&unitu[6].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
                case 4:{
                  if (heroes[0].dress[9] == 12 &&unitu[0].hero){//вместо вопросто номер комплекта антимага 2 лвл 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[0].dress[9] == 0 &&unitu[0].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[1].dress[9] == 12 &&unitu[1].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[1].dress[9] == 0 &&unitu[1].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[6].dress[9] == 12 &&unitu[6].hero){//вместо вопросто номер комплекта антимага 2 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[6].dress[9] == 0 &&unitu[6].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
                case 5:{
                  if (heroes[0].dress[9] == 12 &&unitu[0].hero){//вместо вопросто номер комплекта антимага 2 лвл 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[0].dress[9] == 0 &&unitu[0].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го атакера
                          if (heroes[0].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[1].dress[9] == 12 &&unitu[1].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[1].dress[9] == 0 &&unitu[1].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го атакера
                          if (heroes[1].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[6].dress[9] == 12 &&unitu[6].hero){//вместо вопросто номер комплекта антимага 2 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[6].dress[9] == 0 &&unitu[6].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 3го атакера
                          if (heroes[6].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
                case 6:{
                  if (heroes[2].dress[9] == 12 &&unitu[2].hero){//вместо вопросто номер комплекта антимага 2 лвл от главного защитника
                          if (heroes[2].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[2].dress[9] == 0 &&unitu[2].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от главного защитника
                          if (heroes[2].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[3].dress[9] == 12 &&unitu[3].hero){//вместо вопросто номер комплекта антимага 2 лвл от 1го дэфера
                          if (heroes[3].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[3].dress[9] == 0 &&unitu[3].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 1го дэфера
                          if (heroes[3].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подаввителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[4].dress[9] == 12 &&unitu[4].hero){//вместо вопросто номер комплекта антимага 2 лвл от 2го дэфера
                          if (heroes[4].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[4].dress[9] == 0 &&unitu[4].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от 2го дэфера
                          if (heroes[4].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                  if (heroes[5].dress[9] == 12 &&unitu[5].hero){//вместо вопросто номер комплекта антимага 2 лвл от монстров в КЗ - не бывает, но если кто-то поставит, то будет считать
                          if (heroes[5].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -36;//Древний наруч антимага
                                }
                                else
                                {
                                    mag_bonus[lick] += -30;//Обычный наруч антимага
                                }
                  }
                  if (heroes[5].dress[9] == 0 &&unitu[5].hero){//вместо вопросто номер комплекта Подавителя магов 3 лвл от мостров в КЗ - не бывает, но сли кто-то поставит, то будет считать
                          if (heroes[5].dress_old[9] == 1)
                                {                                  
                                    mag_bonus[lick] += -48;//Древний наруч подавителя
                                }
                                else
                                {
                                    mag_bonus[lick] += -40;//Обычный наруч подавителя
                                }
                  }
                    break;
                }
            }
                    unitu[lick].bonusu[15] = mag_bonus[lick];
                    unitu[lick].limit_bonus(15, -90, false); //проверка лимита мин урона для мага 
                
}

//alert(mag_bonus[0]+"_1");
//alert(mag_bonus[1]+"_1");
//alert(mag_bonus[2]+"_2");
//alert(mag_bonus[3]+"_3");
//alert(mag_bonus[4]+"_4");
//alert(mag_bonus[5]+"_6");
//alert(mag_bonus[7]+"_7");
//alert(unitu[0].bonusu[15]);

  /************************************************************************** */          




            big_cukl++;
        } while (big_cukl < 20);
        gate_hp[num_volna] = parseInt($.trim($("#hp_gate").val()));
        if (flags_gate[num_volna] && kz) {
            $('.gateEnds').show();
        }
        else {
            $('.gateEnds').hide();
        }
        //елси 20 раундо в то растановка победителей
        if (big_cukl == 20 && (unitu[2].win || unitu[3].win || unitu[4].win || unitu[5].win)) {
            unitu[2].win = true;
            if (unitu[3].bul_v_boy) unitu[3].win = true;
            if (unitu[4].bul_v_boy) unitu[4].win = true;
            if (unitu[5].bul_v_boy) unitu[5].win = true;
            unitu[0].win = false;
            if (unitu[1].bul_v_boy) unitu[1].win = false;
            if (unitu[6].bul_v_boy) unitu[6].win = false;
        }


        //востанавливаем параметры отступления если было заклинание "ловушка"
        unitu[0].otst = otst[0];
        unitu[1].otst = otst[1];
        unitu[6].otst = otst[2];

        var msk;
        var xilu = [0, 0, 0, 0, 0, 0, 0];
        var kol_ybitux = [0, 0, 0, 0, 0, 0, 0]; //количество убитых войск (добивание)
        var maxHill = [0, 0, 0, 0, 0, 0, 0]; //количество максималь хилов на войско
        dead_unit = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        //-=-=-воскрешение войс с учетом +/- % бонусов и бонусов на запрет % воскрешения
        for (i = 0; i < 7; i++) {
            if (unitu[i].bul_v_boy) {
                unitu[i].xxx = 0;
                //считаем количество зарядов для хилов у каждого войска с бонусам
                unitu[i].xxx = Math.floor(unitu[i].hils());
                //считаем кол-во убитых 
                unitu[i].dead_mean();

                //перепесь убитых для вывода в подробностях боя
                for (j = 0; j < 8; j++) {
                    dead_unit[i][j] = unitu[i].proc_damag_unitu[j];
                }

                msk = unitu[i].xxx;
                //this.ataks
                kol_ybitux[i] = Math.round(unitu[i].ataks / 100 * unitu[i].bonusu[26]);
                //todo fix this xxx
                maxHill[i] = unitu[i].ataks - kol_ybitux[i];
                //                unitu[i].xxx = unitu[i].ataks - kol_ybitux[i];
                //                msk -= unitu[i].xxx;


                if (unitu[i].xxx > unitu[i].ataks) {
                    unitu[i].xxx = unitu[i].ataks - kol_ybitux[i];
                    msk -= unitu[i].xxx;
                }
                else {
                    if (unitu[i].ataks - kol_ybitux[i] < unitu[i].xxx) {
                        unitu[i].xxx = unitu[i].ataks - kol_ybitux[i];
                    }
                    msk -= unitu[i].xxx;
                }

                //хиляем
                maxHill[i] -= unitu[i].xxx;
                unitu[i].xilaem();
                unitu[i].xxx = msk;
                xilu[i] = unitu[i].xxx;


               /* Тут попробовать написать процент убитых */
               
               /*добавить проверку , относится ли аппонент монстром */
               //Если игрок0 за  НЕЖИТЬ
               
               if (unitu[0].win)
               {
               if (unitu[0].type == 5 && unitu[0].hero == true) 
               {
                procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[2][0] / 100) + (dead_unit[3][0] / 100) + (dead_unit[4][0] / 100) + (dead_unit[5][0] / 100)); //НОС 
                procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[2][1] / 100) + (dead_unit[3][1] / 100) + (dead_unit[4][1] / 100) + (dead_unit[5][1] / 100)); //ВОИН
                procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[2][2] / 100) + (dead_unit[3][2] / 100) + (dead_unit[4][2] / 100) + (dead_unit[5][2] / 100)); //КОНЬ
                procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[2][3] / 100) + (dead_unit[3][3] / 100) + (dead_unit[4][3] / 100) + (dead_unit[5][3] / 100)); //ЛЕТУН
                procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[2][4] / 100) + (dead_unit[3][4] / 100) + (dead_unit[4][4] / 100) + (dead_unit[5][4] / 100)); //ЛУК
                procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[2][5] / 200) + (dead_unit[3][5] / 200) + (dead_unit[4][5] / 200) + (dead_unit[5][5] / 200)); //ЛЕК
                procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[2][6] / 100) + (dead_unit[3][6] / 100) + (dead_unit[4][6] / 100) + (dead_unit[5][6] / 100)); //НАЙМ
                procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[2][7] / 200) + (dead_unit[3][7] / 200) + (dead_unit[4][7] / 200) + (dead_unit[5][7] / 200)); //МАГ


                document.getElementById("nej_unitu_0_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
                document.getElementById("nej_unitu_0_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
                document.getElementById("nej_unitu_0_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
                document.getElementById("nej_unitu_0_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
                document.getElementById("nej_unitu_0_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
                document.getElementById("nej_unitu_0_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
                document.getElementById("nej_unitu_0_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
                document.getElementById("nej_unitu_0_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
               
            }
            if (unitu[1].type == 5 && unitu[1].hero == true) 
            {
             procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[2][0] / 100) + (dead_unit[3][0] / 100) + (dead_unit[4][0] / 100) + (dead_unit[5][0] / 100)); //НОС 
             procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[2][1] / 100) + (dead_unit[3][1] / 100) + (dead_unit[4][1] / 100) + (dead_unit[5][1] / 100)); //ВОИН
             procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[2][2] / 100) + (dead_unit[3][2] / 100) + (dead_unit[4][2] / 100) + (dead_unit[5][2] / 100)); //КОНЬ
             procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[2][3] / 100) + (dead_unit[3][3] / 100) + (dead_unit[4][3] / 100) + (dead_unit[5][3] / 100)); //ЛЕТУН
             procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[2][4] / 100) + (dead_unit[3][4] / 100) + (dead_unit[4][4] / 100) + (dead_unit[5][4] / 100)); //ЛУК
             procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[2][5] / 100) + (dead_unit[3][5] / 100) + (dead_unit[4][5] / 100) + (dead_unit[5][5] / 100)); //ЛЕК
             procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[2][6] / 100) + (dead_unit[3][6] / 100) + (dead_unit[4][6] / 100) + (dead_unit[5][6] / 100)); //НАЙМ
             procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[2][7] / 100) + (dead_unit[3][7] / 100) + (dead_unit[4][7] / 100) + (dead_unit[5][7] / 100)); //МАГ


             document.getElementById("nej_unitu_1_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
             document.getElementById("nej_unitu_1_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
             document.getElementById("nej_unitu_1_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
             document.getElementById("nej_unitu_1_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
             document.getElementById("nej_unitu_1_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
             document.getElementById("nej_unitu_1_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
             document.getElementById("nej_unitu_1_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
             document.getElementById("nej_unitu_1_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
             
            
            }

            if (unitu[6].type == 5 && unitu[6].hero == true) 
            {
             procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[2][0] / 100) + (dead_unit[3][0] / 100) + (dead_unit[4][0] / 100) + (dead_unit[5][0] / 100)); //НОС 
             procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[2][1] / 100) + (dead_unit[3][1] / 100) + (dead_unit[4][1] / 100) + (dead_unit[5][1] / 100)); //ВОИН
             procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[2][2] / 100) + (dead_unit[3][2] / 100) + (dead_unit[4][2] / 100) + (dead_unit[5][2] / 100)); //КОНЬ
             procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[2][3] / 100) + (dead_unit[3][3] / 100) + (dead_unit[4][3] / 100) + (dead_unit[5][3] / 100)); //ЛЕТУН
             procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[2][4] / 100) + (dead_unit[3][4] / 100) + (dead_unit[4][4] / 100) + (dead_unit[5][4] / 100)); //ЛУК
             procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[2][5] / 100) + (dead_unit[3][5] / 100) + (dead_unit[4][5] / 100) + (dead_unit[5][5] / 100)); //ЛЕК
             procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[2][6] / 100) + (dead_unit[3][6] / 100) + (dead_unit[4][6] / 100) + (dead_unit[5][6] / 100)); //НАЙМ
             procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[2][7] / 100) + (dead_unit[3][7] / 100) + (dead_unit[4][7] / 100) + (dead_unit[5][7] / 100)); //МАГ


             document.getElementById("nej_unitu_6_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
             document.getElementById("nej_unitu_6_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
             document.getElementById("nej_unitu_6_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
             document.getElementById("nej_unitu_6_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
             document.getElementById("nej_unitu_6_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
             document.getElementById("nej_unitu_6_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
             document.getElementById("nej_unitu_6_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
             document.getElementById("nej_unitu_6_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
             
            
            }

                     
        }
        else
        {
            /* Обнуляем массив и записываем пустые переменные для вывода, тк поражение */
            procent_ot_ybitix_nejiti_attacerami = [0,0,0,0,0,0,0,0];
            document.getElementById("nej_unitu_0_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
            document.getElementById("nej_unitu_0_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
            document.getElementById("nej_unitu_0_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
            document.getElementById("nej_unitu_0_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
            document.getElementById("nej_unitu_0_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
            document.getElementById("nej_unitu_0_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
            document.getElementById("nej_unitu_0_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
            document.getElementById("nej_unitu_0_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];

            document.getElementById("nej_unitu_1_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
            document.getElementById("nej_unitu_1_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
            document.getElementById("nej_unitu_1_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
            document.getElementById("nej_unitu_1_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
            document.getElementById("nej_unitu_1_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
            document.getElementById("nej_unitu_1_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
            document.getElementById("nej_unitu_1_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
            document.getElementById("nej_unitu_1_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];

            document.getElementById("nej_unitu_6_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
            document.getElementById("nej_unitu_6_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
            document.getElementById("nej_unitu_6_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
            document.getElementById("nej_unitu_6_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
            document.getElementById("nej_unitu_6_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
            document.getElementById("nej_unitu_6_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
            document.getElementById("nej_unitu_6_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
            document.getElementById("nej_unitu_6_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];

           /************ */
           if (unitu[2].win)
               {
               if (unitu[2].type == 5 && unitu[2].hero == true) 
               {
                procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[0][0] / 100) + (dead_unit[1][0] / 100) + (dead_unit[6][0] / 100)); //НОС 
                procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[0][1] / 100) + (dead_unit[1][1] / 100) + (dead_unit[6][1] / 100)); //ВОИН
                procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[0][2] / 100) + (dead_unit[1][2] / 100) + (dead_unit[6][2] / 100)); //КОНЬ
                procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[0][3] / 100) + (dead_unit[1][3] / 100) + (dead_unit[6][3] / 100)); //ЛЕТУН
                procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[0][4] / 100) + (dead_unit[1][4] / 100) + (dead_unit[6][4] / 100)); //ЛУК
                procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[0][5] / 100) + (dead_unit[1][5] / 100) + (dead_unit[6][5] / 100)); //ЛЕК
                procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[0][6] / 100) + (dead_unit[1][6] / 100) + (dead_unit[6][6] / 100)); //НАЙМ
                procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[0][7] / 100) + (dead_unit[1][7] / 100) + (dead_unit[6][7] / 100)); //МАГ
 

                document.getElementById("nej_unitu_2_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
                document.getElementById("nej_unitu_2_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
                document.getElementById("nej_unitu_2_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
                document.getElementById("nej_unitu_2_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
                document.getElementById("nej_unitu_2_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
                document.getElementById("nej_unitu_2_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
                document.getElementById("nej_unitu_2_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
                document.getElementById("nej_unitu_2_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
               
            }
            if (unitu[3].type == 5 && unitu[3].hero == true) 
            {
                procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[0][0] / 100) + (dead_unit[1][0] / 100) + (dead_unit[6][0] / 100)); //НОС 
                procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[0][1] / 100) + (dead_unit[1][1] / 100) + (dead_unit[6][1] / 100)); //ВОИН
                procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[0][2] / 100) + (dead_unit[1][2] / 100) + (dead_unit[6][2] / 100)); //КОНЬ
                procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[0][3] / 100) + (dead_unit[1][3] / 100) + (dead_unit[6][3] / 100)); //ЛЕТУН
                procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[0][4] / 100) + (dead_unit[1][4] / 100) + (dead_unit[6][4] / 100)); //ЛУК
                procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[0][5] / 100) + (dead_unit[1][5] / 100) + (dead_unit[6][5] / 100)); //ЛЕК
                procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[0][6] / 100) + (dead_unit[1][6] / 100) + (dead_unit[6][6] / 100)); //НАЙМ
                procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[0][7] / 100) + (dead_unit[1][7] / 100) + (dead_unit[6][7] / 100)); //МАГ
 

             document.getElementById("nej_unitu_3_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
             document.getElementById("nej_unitu_3_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
             document.getElementById("nej_unitu_3_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
             document.getElementById("nej_unitu_3_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
             document.getElementById("nej_unitu_3_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
             document.getElementById("nej_unitu_3_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
             document.getElementById("nej_unitu_3_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
             document.getElementById("nej_unitu_3_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
             
            
            }

            if (unitu[4].type == 5 && unitu[4].hero == true) 
            {
             procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[2][0] / 100) + (dead_unit[3][0] / 100) + (dead_unit[4][0] / 100) + (dead_unit[5][0] / 100)); //НОС 
             procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[2][1] / 100) + (dead_unit[3][1] / 100) + (dead_unit[4][1] / 100) + (dead_unit[5][1] / 100)); //ВОИН
             procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[2][2] / 100) + (dead_unit[3][2] / 100) + (dead_unit[4][2] / 100) + (dead_unit[5][2] / 100)); //КОНЬ
             procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[2][3] / 100) + (dead_unit[3][3] / 100) + (dead_unit[4][3] / 100) + (dead_unit[5][3] / 100)); //ЛЕТУН
             procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[2][4] / 100) + (dead_unit[3][4] / 100) + (dead_unit[4][4] / 100) + (dead_unit[5][4] / 100)); //ЛУК
             procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[2][5] / 100) + (dead_unit[3][5] / 100) + (dead_unit[4][5] / 100) + (dead_unit[5][5] / 100)); //ЛЕК
             procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[2][6] / 100) + (dead_unit[3][6] / 100) + (dead_unit[4][6] / 100) + (dead_unit[5][6] / 100)); //НАЙМ
             procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[2][7] / 100) + (dead_unit[3][7] / 100) + (dead_unit[4][7] / 100) + (dead_unit[5][7] / 100)); //МАГ


             document.getElementById("nej_unitu_4_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
             document.getElementById("nej_unitu_4_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
             document.getElementById("nej_unitu_4_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
             document.getElementById("nej_unitu_4_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
             document.getElementById("nej_unitu_4_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
             document.getElementById("nej_unitu_4_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
             document.getElementById("nej_unitu_4_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
             document.getElementById("nej_unitu_4_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
             
            
            }

            if (unitu[5].type == 5 && unitu[5].hero == true) 
            {
             procent_ot_ybitix_nejiti_attacerami[0] =  Math.ceil((dead_unit[2][0] / 100) + (dead_unit[3][0] / 100) + (dead_unit[4][0] / 100) + (dead_unit[5][0] / 100)); //НОС 
             procent_ot_ybitix_nejiti_attacerami[1] =  Math.ceil((dead_unit[2][1] / 100) + (dead_unit[3][1] / 100) + (dead_unit[4][1] / 100) + (dead_unit[5][1] / 100)); //ВОИН
             procent_ot_ybitix_nejiti_attacerami[2] =  Math.ceil((dead_unit[2][2] / 100) + (dead_unit[3][2] / 100) + (dead_unit[4][2] / 100) + (dead_unit[5][2] / 100)); //КОНЬ
             procent_ot_ybitix_nejiti_attacerami[3] =  Math.ceil((dead_unit[2][3] / 100) + (dead_unit[3][3] / 100) + (dead_unit[4][3] / 100) + (dead_unit[5][3] / 100)); //ЛЕТУН
             procent_ot_ybitix_nejiti_attacerami[4] =  Math.ceil((dead_unit[2][4] / 100) + (dead_unit[3][4] / 100) + (dead_unit[4][4] / 100) + (dead_unit[5][4] / 100)); //ЛУК
             procent_ot_ybitix_nejiti_attacerami[5] =  Math.ceil((dead_unit[2][5] / 100) + (dead_unit[3][5] / 100) + (dead_unit[4][5] / 100) + (dead_unit[5][5] / 100)); //ЛЕК
             procent_ot_ybitix_nejiti_attacerami[6] =  Math.ceil((dead_unit[2][6] / 100) + (dead_unit[3][6] / 100) + (dead_unit[4][6] / 100) + (dead_unit[5][6] / 100)); //НАЙМ
             procent_ot_ybitix_nejiti_attacerami[7] =  Math.ceil((dead_unit[2][7] / 100) + (dead_unit[3][7] / 100) + (dead_unit[4][7] / 100) + (dead_unit[5][7] / 100)); //МАГ


             document.getElementById("nej_unitu_5_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
             document.getElementById("nej_unitu_5_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
             document.getElementById("nej_unitu_5_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
             document.getElementById("nej_unitu_5_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
             document.getElementById("nej_unitu_5_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
             document.getElementById("nej_unitu_5_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
             document.getElementById("nej_unitu_5_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
             document.getElementById("nej_unitu_5_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
             
            
            }

             }
             else{

                    /* Обнуляем массив и записываем пустые переменные для вывода, тк поражение */
                    procent_ot_ybitix_nejiti_attacerami = [0,0,0,0,0,0,0,0];
                    document.getElementById("nej_unitu_2_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
                    document.getElementById("nej_unitu_2_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
                    document.getElementById("nej_unitu_2_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
                    document.getElementById("nej_unitu_2_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
                    document.getElementById("nej_unitu_2_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
                    document.getElementById("nej_unitu_2_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
                    document.getElementById("nej_unitu_2_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
                    document.getElementById("nej_unitu_2_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
        
                    document.getElementById("nej_unitu_3_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
                    document.getElementById("nej_unitu_3_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
                    document.getElementById("nej_unitu_3_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
                    document.getElementById("nej_unitu_3_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
                    document.getElementById("nej_unitu_3_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
                    document.getElementById("nej_unitu_3_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
                    document.getElementById("nej_unitu_3_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
                    document.getElementById("nej_unitu_3_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
        
                    document.getElementById("nej_unitu_4_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
                    document.getElementById("nej_unitu_4_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
                    document.getElementById("nej_unitu_4_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
                    document.getElementById("nej_unitu_4_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
                    document.getElementById("nej_unitu_4_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
                    document.getElementById("nej_unitu_4_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
                    document.getElementById("nej_unitu_4_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
                    document.getElementById("nej_unitu_4_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];

                    document.getElementById("nej_unitu_5_0" ).value = procent_ot_ybitix_nejiti_attacerami[0];
                    document.getElementById("nej_unitu_5_1" ).value = procent_ot_ybitix_nejiti_attacerami[1];
                    document.getElementById("nej_unitu_5_2" ).value = procent_ot_ybitix_nejiti_attacerami[2];
                    document.getElementById("nej_unitu_5_3" ).value = procent_ot_ybitix_nejiti_attacerami[3];
                    document.getElementById("nej_unitu_5_4" ).value = procent_ot_ybitix_nejiti_attacerami[4];
                    document.getElementById("nej_unitu_5_5" ).value = procent_ot_ybitix_nejiti_attacerami[5];
                    document.getElementById("nej_unitu_5_6" ).value = procent_ot_ybitix_nejiti_attacerami[6];
                    document.getElementById("nej_unitu_5_7" ).value = procent_ot_ybitix_nejiti_attacerami[7];
        

             }
    
    
    }



/* АНАЛОГИЧНО СДЕЛАТЬ ДЛЯ ЗАЩИТНИКА - НО ЕСЛИ АТАКУЮЩИЙ ПРОИГРАЛ */


                $('#marader_res_' + i).show();
                $('#cost_' + i).show();
            }
            else {
                $('#marader_res_' + i).hide();
                $('#cost_' + i).hide();
            }
        }


        //todo: startcheck number logick for this function(lastfixrow)

        // считаем количестово подмог
        var bulo_v_boy_atack = 0;
        if (unitu[1].bul_v_boy)
            bulo_v_boy_atack++;
        if (unitu[6].bul_v_boy)
            bulo_v_boy_atack++;

 //хилы 2 меняем на 0
 // макс хилл 3 меняем на 1
 // юниты 3 меняем на 1
 
 if (xilu[0] > 0) {
    var countHill = xilu[0];
    if (xilu[0] > maxHill[1])
        countHill = maxHill[1];
    unitu[1].xxx = countHill;
    unitu[1].xilaem();
    xilu[0] -= countHill;
    xilu[0] += unitu[1].xxx;
    maxHill[1] -= countHill;

    if (xilu[0] > 0) {
        var countHill = xilu[0];
        if (xilu[0] > maxHill[6])
            countHill = maxHill[6];
        unitu[6].xxx = countHill;
        unitu[6].xilaem();
        xilu[2] -= countHill;
        xilu[2] += unitu[6].xxx;
        maxHill[6] -= countHill;
        /*if (xilu[2] > 0) {
            var countHill = xilu[5];
            if (xilu[2] > maxHill[5])
                countHill = maxHill[5];
            unitu[5].xxx = countHill;
            unitu[5].xilaem();
            xilu[2] -= countHill;
            xilu[2] += unitu[5].xxx;
            maxHill[5] -= countHill;
        }*/
    }
}

//если у второго есть хилы дарим их всем по очереди
if (xilu[1] > 0) {
    var countHill = xilu[1];
    if (xilu[1] > maxHill[0])
        countHill = maxHill[0];
    unitu[0].xxx = countHill;
    unitu[0].xilaem();
    xilu[1] -= countHill;
    xilu[1] += unitu[0].xxx;
    maxHill[0] -= countHill;

    if (xilu[1] > 0) {
        var countHill = xilu[1];
        if (xilu[1] > maxHill[6])
            countHill = maxHill[6];
        unitu[6].xxx = countHill;
        unitu[6].xilaem();
        xilu[1] -= countHill;
        xilu[1] += unitu[6].xxx;
        maxHill[6] -= countHill;
      /*  if (xilu[3] > 0) {
            var countHill = xilu[5];
            if (xilu[3] > maxHill[5])
                countHill = maxHill[5];
            unitu[5].xxx = countHill;
            unitu[5].xilaem();
            xilu[3] -= countHill;
            xilu[3] += unitu[5].xxx;
            maxHill[5] -= countHill;
        }*/
    }
}
//если у третего есть хилы дарим их всем по очереди
if (xilu[6] > 0) {
    var countHill = xilu[6];
    if (xilu[6] > maxHill[0])
        countHill = maxHill[0];
    unitu[0].xxx = countHill;
    unitu[0].xilaem();
    xilu[6] -= countHill;
    xilu[6] += unitu[0].xxx;
    maxHill[0] -= countHill;

    if (xilu[6] > 0) {
        var countHill = xilu[6];
        if (xilu[6] > maxHill[1])
            countHill = maxHill[1];
        unitu[1].xxx = countHill;
        unitu[1].xilaem();
        xilu[6] -= countHill;
        xilu[6] += unitu[1].xxx;
        maxHill[1] -= countHill;
     /*   if (xilu[4] > 0) {
            var countHill = xilu[5];
            if (xilu[4] > maxHill[5])
                countHill = maxHill[5];
            unitu[5].xxx = countHill;
            unitu[5].xilaem();
            xilu[4] -= countHill;
            xilu[4] += unitu[5].xxx;
            maxHill[5] -= countHill;
        }*/
    }
}


        //todo временный кастыль хилов на 4-рых
        //если у первого есть хилы дарим их всем по очереди
        if (xilu[2] > 0) {
            var countHill = xilu[2];
            if (xilu[2] > maxHill[3])
                countHill = maxHill[3];
            unitu[3].xxx = countHill;
            unitu[3].xilaem();
            xilu[2] -= countHill;
            xilu[2] += unitu[3].xxx;
            maxHill[3] -= countHill;

            if (xilu[2] > 0) {
                var countHill = xilu[2];
                if (xilu[2] > maxHill[4])
                    countHill = maxHill[4];
                unitu[4].xxx = countHill;
                unitu[4].xilaem();
                xilu[2] -= countHill;
                xilu[2] += unitu[4].xxx;
                maxHill[4] -= countHill;
                if (xilu[2] > 0) {
                    var countHill = xilu[5];
                    if (xilu[2] > maxHill[5])
                        countHill = maxHill[5];
                    unitu[5].xxx = countHill;
                    unitu[5].xilaem();
                    xilu[2] -= countHill;
                    xilu[2] += unitu[5].xxx;
                    maxHill[5] -= countHill;
                }
            }
        }
        
        //если у второго есть хилы дарим их всем по очереди
        if (xilu[3] > 0) {
            var countHill = xilu[3];
            if (xilu[3] > maxHill[2])
                countHill = maxHill[2];
            unitu[2].xxx = countHill;
            unitu[2].xilaem();
            xilu[3] -= countHill;
            xilu[3] += unitu[2].xxx;
            maxHill[2] -= countHill;

            if (xilu[3] > 0) {
                var countHill = xilu[3];
                if (xilu[3] > maxHill[4])
                    countHill = maxHill[4];
                unitu[4].xxx = countHill;
                unitu[4].xilaem();
                xilu[3] -= countHill;
                xilu[3] += unitu[4].xxx;
                maxHill[4] -= countHill;
                if (xilu[3] > 0) {
                    var countHill = xilu[5];
                    if (xilu[3] > maxHill[5])
                        countHill = maxHill[5];
                    unitu[5].xxx = countHill;
                    unitu[5].xilaem();
                    xilu[3] -= countHill;
                    xilu[3] += unitu[5].xxx;
                    maxHill[5] -= countHill;
                }
            }
        }
        //если у третего есть хилы дарим их всем по очереди
        if (xilu[4] > 0) {
            var countHill = xilu[4];
            if (xilu[4] > maxHill[2])
                countHill = maxHill[2];
            unitu[2].xxx = countHill;
            unitu[2].xilaem();
            xilu[4] -= countHill;
            xilu[4] += unitu[2].xxx;
            maxHill[2] -= countHill;

            if (xilu[4] > 0) {
                var countHill = xilu[4];
                if (xilu[4] > maxHill[3])
                    countHill = maxHill[3];
                unitu[3].xxx = countHill;
                unitu[3].xilaem();
                xilu[4] -= countHill;
                xilu[4] += unitu[3].xxx;
                maxHill[3] -= countHill;
                if (xilu[4] > 0) {
                    var countHill = xilu[5];
                    if (xilu[4] > maxHill[5])
                        countHill = maxHill[5];
                    unitu[5].xxx = countHill;
                    unitu[5].xilaem();
                    xilu[4] -= countHill;
                    xilu[4] += unitu[5].xxx;
                    maxHill[5] -= countHill;
                }
            }
        }
        //если у четрветого есть хилы дарим их всем по очереди
        if (xilu[5] > 0) {
            var countHill = xilu[5];
            if (xilu[5] > maxHill[2])
                countHill = maxHill[2];
            unitu[2].xxx = countHill;
            unitu[2].xilaem();
            xilu[5] -= countHill;
            xilu[5] += unitu[2].xxx;
            maxHill[2] -= countHill;

            if (xilu[5] > 0) {
                var countHill = xilu[5];
                if (xilu[5] > maxHill[3])
                    countHill = maxHill[3];
                unitu[3].xxx = countHill;
                unitu[3].xilaem();
                xilu[5] -= countHill;
                xilu[5] += unitu[3].xxx;
                maxHill[3] -= countHill;
                if (xilu[5] > 0) {
                    var countHill = xilu[4];
                    if (xilu[5] > maxHill[4])
                        countHill = maxHill[4];
                    unitu[4].xxx = countHill;
                    unitu[4].xilaem();
                    xilu[5] -= countHill;
                    xilu[5] += unitu[4].xxx;
                    maxHill[4] -= countHill;
                }
            }
        }


        //todo: end check number logick for this function(lastfixrow)

        for (i = 0; i < 7; i++) {
            if (unitu[i].bul_v_boy) {
                $('#xil_' + i).show();
            }
            unitu[i].ataks = 0; //обнуляем после хилов
            unitu[i].xxx = xilu[i];
            //выводим количесто отхиляных
            for (j = 0; j < 8; j++) {
                msk = dead_unit[i][j] - unitu[i].proc_damag_unitu[j];
                if (msk) {
                    $('#xil_' + i + '_' + j).val('+' + msk).css({ 'border-color': 'green', 'color': 'green' });
                }
            }
            //записуем оставшиеся заряды в поле
            document.getElementById('zaradu_' + i).value = unitu[i].xxx;
        }
        //ставим надписе о победе проиграше
        if (unitu[0].win) {
            $('.atk_title').html(window.MLI18N ? MLI18N.t("calc.won") : "победил");
            $('.def_title').html(window.MLI18N ? MLI18N.t("calc.lost") : "проиграл");
            $('.atac_fatal, #maraderstvo .fon_green').hide();
            $('.zash_fatal').show();
        }
        else {
            $('.atk_title').html(window.MLI18N ? MLI18N.t("calc.lost") : "проиграл");
            $('.def_title').html(window.MLI18N ? MLI18N.t("calc.won") : "победил");
            $('.atac_fatal').show();
            $('.zash_fatal, #maraderstvo .fon_red').hide();
        }
        //обнуляем переменный хранящие % атаку войска (использовал для хранения метрвяков)
        unitu[0].null_proc_damag();
        unitu[2].null_proc_damag();
        unitu[1].null_proc_damag();
        unitu[3].null_proc_damag();
        unitu[4].null_proc_damag();
        unitu[5].null_proc_damag();
        unitu[6].null_proc_damag();

        //-=-=-востоновление убижавших
        for (i = 0; i < 7; i++) {
            unitu[i].go_back_b();
            unitu[i].dead_to_naim();//подсчет убитых
        }

        //-=-=-перевод % убитых в наймов !!!!!!!!!!!!!!!!!доделать проверку на этот бонус и уточнить когда он работает (только при победе?) 
        for (i = 0; i < 7; i++) {
            if (unitu[i].bul_v_boy) {
                $("#nickrom_" + i).show();
                unitu[i].naimu_iz_ybitux();
            }
        }
        //обнуляем переменный хранящие общую атаку войска
        null_ataks();

        //запись результатов боя в ячейки
        for (i = 0; i < 7; i++) {
            unitu[i].see_rez();
            unitu[i].perepis();
        }
        //расчет потерь в ресурсах
        var sum;
        for (i = 0; i < 7; i++) {
            if (unitu[i].bul_v_boy) {
                var tmpArrayCost = db_cost;
                if (unitu[i].type == 4) {
                    if (kz && i == 2) {
                        tmpArrayCost = db_cost_casol_monster;
                    }
                    else {
                        tmpArrayCost = db_cost_monster;
                    }
                }

                $('#cost_' + i).show();
                for (j = 0; j < 5; j++) {
                    sum = 0;
                    for (var k = 0; k < 8; k++) {
                        sum += unitu[i].proc_damag_unitu[k] * tmpArrayCost[k][unitu[i].lvl[k]][j + 1];
                    }

                    var cost = $('#cost_' + i + '_' + j);
                    if (sum < 0) {
                        cost.css({ 'color': 'red', 'border-color': 'red' }).val(sum);
                    }
                    else {
                        if (sum > 0) {
                            cost.val('+' + sum).css({ 'color': 'dodgerblue', 'border-color': 'dodgerblue' });
                        }
                    }
                }
            }
        }
        calculate_marader();
        //Расчет фракционки
        //проверка на рассу защитника, а точнее на рассу монстров
        if (unitu[2].type != 4) {
            //если расса не монстр,то
            //расчет фракционка из погибших 1-защитника + фракционка из погибших 2-защитника(если расса не монстр)+ фракционка из погибших 3-защитника(если расса не монстр)
            frakc = (unitu[2].cost(unitu[2].proc_damag_unitu) + (unitu[3].type != 4 ? unitu[3].cost(unitu[3].proc_damag_unitu) : 0) + (unitu[4].type != 4 ? unitu[4].cost(unitu[4].proc_damag_unitu) : 0) + (unitu[5].type != 4 ? unitu[5].cost(unitu[5].proc_damag_unitu) : 0)) * (-1);
            //распределение фракционного рейтинга между атакующими по нанесенного урона

            var cost_unit_atak = [damagInBatle[0], damagInBatle[1], damagInBatle[6]];
            if (!unitu[1].bul_v_boy) {
                cost_unit_atak[1] = 0;
            }
            if (!unitu[6].bul_v_boy) {
                cost_unit_atak[2] = 0;
            }
            tmpSum = (cost_unit_atak[0] + cost_unit_atak[1] + cost_unit_atak[2]) / 100;
            unitu[0].ataks = cost_unit_atak[0] / tmpSum;
            unitu[1].ataks = cost_unit_atak[1] / tmpSum;
            unitu[6].ataks = cost_unit_atak[2] / tmpSum;

            unitu[0].ataks = frakc / 100 * unitu[0].ataks;
            unitu[1].ataks = frakc / 100 * unitu[1].ataks;
            unitu[6].ataks = frakc / 100 * unitu[6].ataks;
            unitu[0].ataks = isNaN(unitu[0].ataks) ? 0 : Math.round(unitu[0].ataks);
            unitu[1].ataks = isNaN(unitu[1].ataks) ? 0 : Math.round(unitu[1].ataks);
            unitu[6].ataks = isNaN(unitu[6].ataks) ? 0 : Math.round(unitu[6].ataks);

            //определение является ли рейтин отрецательным для 1-го атакующего
            if (unitu[0].type == unitu[2].type && !unitu[2].red ||
               !unitu[0].type && unitu[2].type == 1 && !unitu[2].red || 
                unitu[0].type == 1 && !unitu[2].type && !unitu[2].red ||
                unitu[0].type == 0 && unitu[2].type == 6 && !unitu[2].red ||
                unitu[0].type == 6 && unitu[2].type == 0 && !unitu[2].red ||
                unitu[0].type == 1 && unitu[2].type == 6 && !unitu[2].red ||
                unitu[0].type == 6 && unitu[2].type == 1 && !unitu[2].red ||
                unitu[0].type == 3 && unitu[2].type == 2 && !unitu[2].red ||
                unitu[0].type == 2 && unitu[2].type == 3 && !unitu[2].red ||
                unitu[0].type == 5 && unitu[2].type == 3 && !unitu[2].red ||
                unitu[0].type == 3 && unitu[2].type == 5 && !unitu[2].red ||
                unitu[0].type == 5 && unitu[2].type == 2 && !unitu[2].red ||
                unitu[0].type == 2 && unitu[2].type == 5 && !unitu[2].red ) {
                //снижение отрецательной бонусом
                unitu[0].ataks += unitu[0].ataks / 100 * unitu[0].bonusu[27];  //Проверить!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - на -
                unitu[0].ataks = isNaN(unitu[0].ataks) ? 0 : Math.round(unitu[0].ataks);
                document.getElementById("frakcuonka_0").value = "-" + unitu[0].ataks;
                document.getElementById("frakcuonka_0").style.border = "2px  solid #ff0000";
                document.getElementById("frakcuonka_0").style.color = "#ff0000";
            }
            else {
                document.getElementById("frakcuonka_0").value = unitu[0].ataks;
                document.getElementById("frakcuonka_0").style.border = "2px  solid #009900";
                document.getElementById("frakcuonka_0").style.color = "#009900";

            }
            //определение является ли рейтин отрецательным для 2-го атакующего
            if (unitu[1].type == unitu[2].type && !unitu[2].red || !unitu[1].type && unitu[2].type == 1 && !unitu[2].red ||
                unitu[1].type == 1 && !unitu[2].type && !unitu[2].red ||
                unitu[1].type == 0 && unitu[2].type == 6 && !unitu[2].red ||
                unitu[1].type == 6 && unitu[2].type == 0 && !unitu[2].red ||
                unitu[1].type == 1 && unitu[2].type == 6 && !unitu[2].red ||
                unitu[1].type == 6 && unitu[2].type == 1 && !unitu[2].red ||
                unitu[1].type == 3 && unitu[2].type == 2 && !unitu[2].red || 
                unitu[1].type == 2 && unitu[2].type == 3 && !unitu[2].red ||
                unitu[1].type == 5 && unitu[2].type == 3 && !unitu[2].red ||
                unitu[1].type == 3 && unitu[2].type == 5 && !unitu[2].red ||
                unitu[1].type == 5 && unitu[2].type == 2 && !unitu[2].red ||
                unitu[1].type == 2 && unitu[2].type == 5 && !unitu[2].red ) {
                //снижение отрецательной бонусом
                unitu[1].ataks += unitu[1].ataks / 100 * unitu[1].bonusu[27];
                unitu[1].ataks = isNaN(unitu[1].ataks) ? 0 : Math.round(unitu[1].ataks);
                document.getElementById("frakcuonka_1").value = "-" + unitu[1].ataks;
                document.getElementById("frakcuonka_1").style.border = "2px  solid #ff0000";
                document.getElementById("frakcuonka_1").style.color = "#ff0000";
            }
            else {
                document.getElementById("frakcuonka_1").value = unitu[1].ataks;
                document.getElementById("frakcuonka_1").style.border = "2px  solid #009900";
                document.getElementById("frakcuonka_1").style.color = "#009900";
            }

            //определение является ли рейтин отрецательным для 3-го атакующего
            if (unitu[6].type == unitu[2].type && !unitu[2].red || !unitu[6].type && unitu[2].type == 1 && !unitu[2].red ||
                unitu[6].type == 1 && !unitu[2].type && !unitu[2].red ||
                unitu[6].type == 0 && unitu[2].type == 6 && !unitu[2].red ||
                unitu[6].type == 6 && unitu[2].type == 0 && !unitu[2].red ||
                unitu[6].type == 1 && unitu[2].type == 6 && !unitu[2].red ||
                unitu[6].type == 6 && unitu[2].type == 1 && !unitu[2].red ||
                unitu[6].type == 3 && unitu[2].type == 2 && !unitu[2].red || 
                unitu[6].type == 2 && unitu[2].type == 3 && !unitu[2].red ||
                unitu[6].type == 5 && unitu[2].type == 3 && !unitu[2].red ||
                unitu[6].type == 3 && unitu[2].type == 5 && !unitu[2].red ||
                unitu[6].type == 5 && unitu[2].type == 2 && !unitu[2].red ||
                unitu[6].type == 2 && unitu[2].type == 5 && !unitu[2].red ) {
                //снижение отрецательной бонусом
                unitu[6].ataks += unitu[6].ataks / 100 * unitu[6].bonusu[27];
                unitu[6].ataks = isNaN(unitu[6].ataks) ? 0 : Math.round(unitu[6].ataks);
                document.getElementById("frakcuonka_6").value = "-" + unitu[6].ataks;
                document.getElementById("frakcuonka_6").style.border = "2px  solid #ff0000";
                document.getElementById("frakcuonka_6").style.color = "#ff0000";
            }
            else {
                document.getElementById("frakcuonka_6").value = unitu[6].ataks;
                document.getElementById("frakcuonka_6").style.border = "2px  solid #009900";
                document.getElementById("frakcuonka_6").style.color = "#009900";
            }

            unitu[0].ataks = 0;
            unitu[1].ataks = 0;
            unitu[6].ataks = 0;
        }
        else {
            document.getElementById("frakcuonka_0").value = 0;
            document.getElementById("frakcuonka_0").style.border = "2px  solid #009900";
            document.getElementById("frakcuonka_0").style.color = "#009900";
            document.getElementById("frakcuonka_1").value = 0;
            document.getElementById("frakcuonka_1").style.border = "2px  solid #009900";
            document.getElementById("frakcuonka_1").style.color = "#009900";
            document.getElementById("frakcuonka_6").value = 0;
            document.getElementById("frakcuonka_6").style.border = "2px  solid #009900";
            document.getElementById("frakcuonka_6").style.color = "#009900";
        }


        //подсчет и вывод опыта герое для шахтерского сервера
        new_expiriens_hero_u();

        //показуем див с результатом
        unitu[1].bul_v_boy ? document.getElementById("rez_1").style.display = "block" : document.getElementById("rez_1").style.display = "none";
        unitu[3].bul_v_boy ? document.getElementById("rez_3").style.display = "block" : document.getElementById("rez_3").style.display = "none";
        unitu[4].bul_v_boy ? document.getElementById("rez_4").style.display = "block" : document.getElementById("rez_4").style.display = "none";
        unitu[5].bul_v_boy ? document.getElementById("rez_5").style.display = "block" : document.getElementById("rez_5").style.display = "none";
        unitu[6].bul_v_boy ? document.getElementById("rez_6").style.display = "block" : document.getElementById("rez_6").style.display = "none";

        document.getElementById("rez_faiting").style.display = "block";

    }
    catch (e) {
        console.log(e);
    }
}