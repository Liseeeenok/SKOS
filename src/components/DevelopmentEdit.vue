<script setup>
import { useStore } from '../stores/PlanStore';
import { verify, preLoad, getDirection, getDivision, getPlan, getProfession, getSection, savePlan } from '../helpers/API.js';
//-------------AUTH-------------------
verify();
preLoad();
//------------------------------------
const admin = useStore();
getPlan();
getDivision();
getSection();
getDirection();
getProfession();
//------------------------------------
function addMainDivision() {
    console.log('addMainDivision +');
    admin.plan.arr_plan.push({division:'', arr_chapter:[{title: '', arr_profession: [], arr_profession_results: {}, results: false}], arr_chapter_results: {}, results: false});
}
function addProfession(index_division, index_chapter) {
    console.log('addProfession +');
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession.push({id:null, status: 2, name:'', status_code: [2], code:[{id:null,name:'',status:2}], to1:0, per: 0, indt:0, tren:0, exam:0, to2:0, po:0, start_o:[], start_po:[], end_po:[], qual_ex:[], count_people:0, status_direction: [], direction:[], count:[]});
}
function addChapter(index_division) {
    console.log('addChapter +');
    admin.plan.arr_plan[index_division].arr_chapter.push({title: '', arr_profession: [], arr_profession_results: {}, results: false});
}
function getCountPeople(index_division, index_chapter, index_profession) {
    console.log('getCountPeople +');
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count) {
        let sum = 0;
        admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count.forEach(x => {
            if (x != '')
            sum += x;
        });
        admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count_people = sum;
    };
    getProfessionColumnResult(index_division, index_chapter);
    getProfessionDirections(index_division, index_chapter);
}
function addCode(index_division, index_chapter, index_profession) {
    console.log('addCode +');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code.push({id:null,name:'',status:2});
}
function addDirection(index_division, index_chapter, index_profession) {
    console.log('addDirection +');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction.push(
        {id: null, id_direction: admin.directions[0].id, status: 2}
    );
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count.push(0);
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].start_o.push('');
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].start_po.push('');
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].end_po.push('');
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].qual_ex.push('');
}
function getProfessionResults(index_division, index_chapter) {
    console.log('getProfessionResults +');
    getProfessionColumnResult(index_division, index_chapter);
    getProfessionDirections(index_division, index_chapter);
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].results = true;
}
function getProfessionColumnResult(index_division, index_chapter) {
    console.log('getProfessionColumnResult +');
    let arr_column = ['to1', 'indt', 'tren', 'exam', 'to2', 'po', 'count_people'];
    arr_column.forEach(column => {
        admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession_results[column] = 0;
        if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter]) {
            let sum = 0;
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession.forEach(x => {
                if (x[column]) {
                    if (x[column] == '')
                        sum += 0;
                    else
                        sum += x[column];
                }
            });
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession_results[column] = sum;
        }
    });
    getChapterColumnResult(index_division);
}
function getProfessionDirections(index_division, index_chapter) {
    console.log('getProfessionDirections +');
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession_results['directions'] = {};
    admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession.forEach(profession => {
        profession.direction.forEach((direction, index_direction) => { 
            if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession_results['directions'][direction.id_direction] == undefined) 
                admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession_results['directions'][direction.id_direction] = 0;
            if (profession.count[index_direction] != '')
                admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession_results['directions'][direction.id_direction] += profession.count[index_direction];
        });
    });
    getChapterDirections(index_division);
}
function getChapterResults(index_division) {
    console.log('getChapterResults +');
    getChapterColumnResult(index_division);
    getChapterDirections(index_division);
    admin.plan.arr_plan[index_division].results = true;
}
function getChapterColumnResult(index_division) {
    console.log('getChapterColumnResult +');
    let arr_column = ['to1', 'indt', 'tren', 'exam', 'to2', 'po', 'count_people'];
    arr_column.forEach(column => {
        admin.plan.arr_plan[index_division].arr_chapter_results[column] = 0;
        if (admin.plan.arr_plan[index_division]) {
            let sum = 0;
            admin.plan.arr_plan[index_division].arr_chapter.forEach(x => {
                if (x['arr_profession_results'][column]) {
                    if (x['arr_profession_results'][column] == '')
                        sum += 0;
                    else
                        sum += x['arr_profession_results'][column];
                }
            });
            admin.plan.arr_plan[index_division].arr_chapter_results[column] = sum;
        }
    });
    getDivisionColumnResult();
}
function getChapterDirections(index_division) {
    console.log('getChapterDirections +');
    admin.plan.arr_plan[index_division].arr_chapter_results['directions'] = {};
    admin.plan.arr_plan[index_division].arr_chapter.forEach(x => {
        for (let index_direction in x.arr_profession_results.directions) {
            if (admin.plan.arr_plan[index_division].arr_chapter_results['directions'][index_direction] == undefined) 
                admin.plan.arr_plan[index_division].arr_chapter_results['directions'][index_direction] = 0;
            admin.plan.arr_plan[index_division].arr_chapter_results['directions'][index_direction] += x.arr_profession_results.directions[index_direction];
        };
    });
    getDivisionDirections();
}
function getDivisionResults() {
    console.log('getDivisionResults +');
    getDivisionColumnResult();
    getDivisionDirections();
    admin.plan.results = true;
}
function getDivisionColumnResult() {
    console.log('getDivisionColumnResult +');
    let arr_column = ['to1', 'indt', 'tren', 'exam', 'to2', 'po', 'count_people'];
    arr_column.forEach(column => {
        admin.plan.arr_plan_result[column] = 0;
        if (admin.plan) {
            let sum = 0;
            admin.plan.arr_plan.forEach(x => {
                if (x['arr_chapter_results'][column]) {
                    if (x['arr_chapter_results'][column] == '')
                        sum += 0;
                    else
                        sum += x['arr_chapter_results'][column];
                }
            });
            admin.plan.arr_plan_result[column] = sum;
        }
    });
}
function getDivisionDirections() {
    console.log('getDivisionDirections +');
    admin.plan.arr_plan_result['directions'] = {};
    admin.plan.arr_plan.forEach(x => {
        for (let index_direction in x.arr_chapter_results.directions) {
            if (admin.plan.arr_plan_result['directions'][index_direction] == undefined) 
                admin.plan.arr_plan_result['directions'][index_direction] = 0;
            admin.plan.arr_plan_result['directions'][index_direction] += x.arr_chapter_results.directions[index_direction];
        };
    });
}
function setProfessionStatusChange(index_division, index_chapter, index_profession) {
    console.log('setProfessionStatusChange +');
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].name == '') {
        if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].id == undefined) {
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status = undefined;
        } else {
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status = 0;
        }
        return;
    }
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status == 2) return;
    else admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status = 1;
}
function setCodeStatusChange(index_division, index_chapter, index_profession, index_code) {
    console.log('setCodeStatusChange +');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].name == '') {
        if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].id == undefined) {
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status = undefined;
        } else {
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status = 0;
        }
        return;
    }
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status == 2) return;
    else admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status = 1;
}
function setDirectionStatusChange(index_division, index_chapter, index_profession, index_direction) {
    console.log('setDirectionStatusChange +');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_direction].id_direction == '') {
        if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_direction].id == undefined) {
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_direction].status = undefined;
        } else {
            admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_direction].status = 0;
        }
        return;
    }
    if (admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_direction].status == 2) return;
    else admin.plan.arr_plan[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_direction].status = 1;
}
function changeMenuStatus(index) {
    admin.menuStatus = index;
    localStorage.setItem('skos-menu-status', index);
}
//------------------------------------
</script>

<template>
    <div class="container">
        <div>
            <div class="title">План-график</div>
            <div class="title">профессианального развития рабочих и служащих в Восточно-Сибирском учебном центре профессиональных квалификаций</div>
            <div class="title">Восточно-Сибирской железной дороги - филиала ОАО "РЖД"</div>
            <div class="title">на 
                <input type="number" style="width: 60px;" v-model="admin.academic_year" @change="getPlan()"/> год
            </div>
        </div>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th rowspan="2">
                            № п/п
                        </th>
                        <th rowspan="2">
                            Наименование профессии
                        </th>
                        <th rowspan="2">
                            Шифр Группы
                        </th>
                        <th colspan="5" style="height: 35px;">
                            Количество часов для педагогической нагрузки
                        </th>
                        <th colspan="3">
                            Продолжительность обучения
                        </th>
                        <th colspan="4">
                            Календарные сроки обучения
                        </th>
                        <th rowspan="2" style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Количество человек
                        </th>
                        <th colspan="2">
                            Комплетование групп
                        </th>
                    </tr>
                    <tr>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Теоретическое <br> обучение
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Индивидуальное <br> занятия по оказанию <br> перв. мед. помощи
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Тренажерная <br> подготовка <br> преподавателей
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Экзамен
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Всего
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Всего
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Теоретическое <br> обучение
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Производственное <br> обучение на рабочем <br> месте
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Начало обучения
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Начало <br> производственного <br> обучения
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Окончание <br> производственного <br> обучения
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Квалификационный <br> экзамен/Зачет
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Дирекция/<br>структурное <br> подразделение
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Количество
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(division, index_division) in admin.plan.arr_plan" :key="index_division">
                    <tr>
                        <td colspan="18">
                            Подразделение
                            <select v-model="division.division" class="input_text input_titles">
                                <option value="" disabled>Наименование подразделения</option>
                                <template v-for="(division, index_division) in admin.divisions" :key="index_division">
                                    <option :value="division.id">{{ division.name }}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <template v-for="(chapter, index_chapter) in division.arr_chapter" :key="index_chapter">
                    <tr>
                        <td colspan="18">
                            <select v-model="chapter.title" class="input_text input_titles">
                                <option value="" disabled>Название раздела</option>
                                <template v-for="(section, index_section) in admin.sections" :key="index_section">
                                    <option :value="section.id">{{ section.name }}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <template v-for="(profession, index_profession) in chapter.arr_profession" :key="index_profession">
                    <tr>
                        <td>{{ index_profession + 1 }}</td>
                        <td>
                            <select v-model="profession.name" class="input_text" 
                            @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                                <option value=""></option>
                                <template v-for="(profession, index_profession) in admin.professions" :key="index_profession">
                                    <option :value="profession.id">{{ profession.name }}</option>
                                </template>
                            </select>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(code, index_code) in profession.code" :key="index_code">
                                    <td>
                                        <select v-if="admin.professions[profession.name]" v-model="code.name" class="input_text" @change="setCodeStatusChange(index_division, index_chapter, index_profession, index_code)">
                                            <option value=""></option>
                                            <template v-for="(pg, index_pg) in admin.professions[profession.name].groups" :key="index_pg">
                                                <option :value="pg.id">{{ pg.name }}</option>
                                            </template>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" @click="addCode(index_division, index_chapter, index_profession)">Добавить группу</td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <input type="number" class="input_text" v-model="profession.to1" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="number" class="input_text" v-model="profession.indt" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="number" class="input_text" v-model="profession.tren" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="number" class="input_text" v-model="profession.exam" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td style="min-width: 50px">{{ Number(profession.to1) + Number(profession.exam) }}</td>
                        <td style="min-width: 50px">{{ Number(profession.po) + Number(profession.to2) }}</td>
                        <td>
                            <input type="number" class="input_text" v-model="profession.to2" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="number" class="input_text" v-model="profession.po" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(start_o, index_start_o) in profession.start_o" :key="index_start_o">
                                    <td class="nested_input">
                                        <input type="date" class="input_text" v-model="profession.start_o[index_start_o]" @change="setDirectionStatusChange(index_division, index_chapter, index_profession, index_start_o)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(start_po, index_start_po) in profession.start_po" :key="index_start_po">
                                    <td class="nested_input">
                                        <input type="date" class="input_text" v-model="profession.start_po[index_start_po]" @change="setDirectionStatusChange(index_division, index_chapter, index_profession, index_start_po)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(end_po, index_end_po) in profession.end_po" :key="index_end_po">
                                    <td class="nested_input">
                                        <input type="date" class="input_text" v-model="profession.end_po[index_end_po]" @change="setDirectionStatusChange(index_division, index_chapter, index_profession, index_end_po)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(qual_ex, index_qual_ex) in profession.qual_ex" :key="index_qual_ex">
                                    <td class="nested_input">
                                        <input type="date" class="input_text" v-model="profession.qual_ex[index_qual_ex]" @change="setDirectionStatusChange(index_division, index_chapter, index_profession, index_qual_ex)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td style="min-width: 50px">{{ profession.count_people }}</td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.direction" :key="index_dir">
                                    <td class="nested_input">
                                        <select v-model="dir.id_direction" class="input_text" 
                                        @change="getCountPeople(index_division, index_chapter, index_profession);
                                        setDirectionStatusChange(index_division, index_chapter, index_profession, index_dir)">
                                            <option value=""></option>
                                            <template v-for="(direction, index_direction) in admin.directions" :key="index_direction" >
                                                <option :value="direction.id">{{ direction.name }}</option>
                                            </template>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" @click="addDirection(index_division, index_chapter, index_profession)">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.count" :key="index_dir">
                                    <td class="nested_input">
                                        <input class="input_text" type="number" v-model="profession.count[index_dir]" 
                                        @change="getCountPeople(index_division, index_chapter, index_profession);
                                        setDirectionStatusChange(index_division, index_chapter, index_profession, index_dir)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </template>
                    <tr>
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction" @click="addProfession(index_division, index_chapter)" >Добавить профессию</text></div>
                            <div class="nested_text" v-if="!chapter.results"><text class="title add_direction" @click="getProfessionResults(index_division, index_chapter)">Подвести итоги по разделу</text></div>
                        </td>
                    </tr>
                    <template v-if="chapter.results">
                    <tr>
                        <td></td>
                        <td>Итого по ПР ({{ admin.sections[chapter.title].name }}) {{ admin.divisions[division.division].name }}</td>
                        <td></td>
                        <td>{{ chapter.arr_profession_results['to1'] }}</td>
                        <td>{{ chapter.arr_profession_results['indt'] }}</td>
                        <td>{{ chapter.arr_profession_results['tren'] }}</td>
                        <td>{{ chapter.arr_profession_results['exam'] }}</td>
                        <td>{{ chapter.arr_profession_results['to1'] + chapter.arr_profession_results['exam'] }}</td>
                        <td>{{ chapter.arr_profession_results['to2'] + chapter.arr_profession_results['po'] }}</td>
                        <td>{{ chapter.arr_profession_results['to2'] }}</td>
                        <td>{{ chapter.arr_profession_results['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ chapter.arr_profession_results['count_people'] }}</td>
                        <td></td>
                        <td>{{ chapter.arr_profession_results['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in chapter.arr_profession_results['directions']" :key="index_result">
                        <td></td>
                        <td>{{ admin.directions[index_result].name }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ result == 0 ? ' ': result }}</td>
                    </tr>
                    </template> 
                    </template>
                    <tr>
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction" @click="addChapter(index_division)">Добавить раздел</text></div>
                            <div class="nested_text" v-if="!division.results"><text class="title add_direction" @click="getChapterResults(index_division)">Подвести итоги по подразделению</text></div>
                        </td>
                    </tr>
                    <template v-if="division.results">
                    <tr>
                        <td></td>
                        <td>Итого по подразделению {{ admin.divisions[division.division].name }}</td>
                        <td></td>
                        <td>{{ division.arr_chapter_results['to1'] }}</td>
                        <td>{{ division.arr_chapter_results['indt'] }}</td>
                        <td>{{ division.arr_chapter_results['tren'] }}</td>
                        <td>{{ division.arr_chapter_results['exam'] }}</td>
                        <td>{{ division.arr_chapter_results['to1'] + division.arr_chapter_results['exam'] }}</td>
                        <td>{{ division.arr_chapter_results['to2'] + division.arr_chapter_results['po'] }}</td>
                        <td>{{ division.arr_chapter_results['to2'] }}</td>
                        <td>{{ division.arr_chapter_results['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ division.arr_chapter_results['count_people'] }}</td>
                        <td></td>
                        <td>{{ division.arr_chapter_results['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in division.arr_chapter_results['directions']" :key="index_result">
                        <td></td>
                        <td>{{ admin.directions[index_result].name }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ result == 0 ? ' ': result }}</td>
                    </tr>
                    </template> 
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction" @click="addMainDivision()">Добавить подразделение</text></div>
                            <div class="nested_text" v-if="!admin.plan.results"><text class="title add_direction" @click="getDivisionResults()">Подвести общие итоги</text></div>
                        </td>
                    </tr>
                    <template v-if="admin.plan.results">
                    <tr>
                        <td></td>
                        <td>ВСЕГО ПРОФЕССИОНАЛЬНОМУ РАЗВИТИЮ в УЦПК</td>
                        <td></td>
                        <td>{{ admin.plan.arr_plan_result['to1'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['indt'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['tren'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['exam'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['to1'] + admin.plan.arr_plan_result['exam'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['to2'] + admin.plan.arr_plan_result['po'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['to2'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ admin.plan.arr_plan_result['count_people'] }}</td>
                        <td></td>
                        <td>{{ admin.plan.arr_plan_result['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in admin.plan.arr_plan_result['directions']" :key="index_result">
                        <td></td>
                        <td>{{ admin.directions[index_result].name }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ result == 0 ? ' ': result }}</td>
                    </tr>
                    </template> 
                </tbody>
            </table>
            <div class="div_button">
                <button class="add" @click="savePlan()">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin-top: 30px;
    padding: 10px 0 0 0;
    background-color: white;
    border-radius: 10px;

    .title {
        text-align: center;
        color: #000;
        font-family: Arial;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .table {
        margin: 10px;
        width: calc(100% - 20px);
    }

    table {
        background-color: #ffffff;
        font-size: 16px;
        border-collapse: collapse;

        thead tr {
            th {
                position: sticky;
                border: 1px solid #000;
                background-color: white;
                top: 35px;
            }

            &:first-child th {
                position: sticky;
                border: 1px solid #000;
                background-color: white;
                top: 0px;
            }
        }

        tr {

            th, td {
                text-align: center;
                box-sizing: border-box;
                color: #000;
                font-family: Arial;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                border: 1px solid #000;
                top: 0;
            }
        }

        tbody tr {
            transition: background-color 150ms ease-out;

            &:nth-child(2n+1) {
                background-color: rgb(255 255 255);
            }

            &:nth-child(2n) {
                background-color: rgb(245 245 245);
            }

            &:hover {
                background-color: rgb(216 216 216);
            }
        }
    }
}
.add_direction {
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
}
.add_direction:hover {
    transform: scale(1.1);
}
.nested_table {
    padding: 0;
}
.table_nested {
    width: 100%;
}
.input_text {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    min-width: 65px;
}
.input_titles {
    width: auto;
}
.nested_input {
    padding: 0;
}
.nested_text {
    display: flex;
    justify-content: center;
}
.div_button {
    margin: 10px auto;
    width: 60%;
    display: flex;
    justify-content: space-around;

    button {
        padding: 5px 10px;
        margin: 0 10px;
        border-radius: 5px;
        border: solid 1px #000;
        cursor: pointer;
        transition: 0.15s;

        &.add {
            margin: 15px 0;
            background: rgb(240 237 255);

            &:hover {
                background: rgb(208, 228, 239);
            }
        }
    }
}
</style>
