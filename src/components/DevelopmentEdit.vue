<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const plan = ref([]);
const final = ref({year: '', arr_plan: plan, arr_plan_result: {}, results: false})
//Обязательное обучение в соответствии с законодательством РФ
//console.log(JSON.stringify(plan.value));
const host = 'mypew.ru:7070'; //имя или ip хоста api
const level = localStorage.getItem('skos-role');
//---------------------------API-----------------------------
let article = {
    request_type: 'VIEW',
    academic_year: 2022,
    table_type: 2
}
axios
    .post('https://'+host+'/table', article)
    .then(response => {
        console.log(response.data);
        final.value.year = response.data.year;
        final.value.arr_plan_result = response.data.arr_plan_result;
        final.value.results = response.data.results;
        plan.value = response.data.arr_plan;
        plan.value.forEach((division) => {
            division.arr_chapter.forEach((chapter) => {
                chapter.arr_profession.forEach((profession) => {
                    getProfessionGroups(profession.name);
                });
            });
        });
    });
//---------------------------API-----------------------------
const arr_name_division = ref([]);
axios
    .get('https://'+host+'/divisions')
    .then(response => {
        arr_name_division.value = response.data;
    });
const arr_name_section = ref([]);
axios
    .get('https://'+host+'/sections')
    .then(response => {
        arr_name_section.value = response.data;
    });
const arr_name_direction = ref([]);
axios
    .get('https://'+host+'/directions')
    .then(response => {
        arr_name_direction.value = response.data;
    });
const arr_name_profession = ref([]);
axios
    .get('https://'+host+'/professions')
    .then(response => {
        arr_name_profession.value = response.data;
    });
const arr_name_profession_groups = ref([]);
function getProfessionGroups(id_profession) {
    console.log('getProfessionGroups');
    axios
        .get('https://'+host+'/profession_groups?id_profession='+id_profession)
        .then(response => {
            arr_name_profession_groups.value[id_profession] = response.data;
        });
}
function addMainDivision() {
    console.log('addMainDivision');
    plan.value.push({division:'', arr_chapter:[{title: '', arr_profession: [], arr_profession_results: {}, results: false}], arr_chapter_results: {}, results: false});
}
function addProfession(index_division, index_chapter) {
    console.log('addProfession');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession.push({id:null, status: 2, name:'', status_code: [2], code:[{id:null,name:'',status:2}], to1:0, per: 0, indt:0, tren:0, exam:0, to2:0, po:0, start_o:[''], start_po:[''], end_po:[''], qual_ex:[''], count_people:0, status_direction: [], direction:[[]], count:[[]]});
}
function addChapter(index_division) {
    console.log('addChapter');
    plan.value[index_division].arr_chapter.push({title: '', arr_profession: [], arr_profession_results: {}, results: false});
}
function getCountPeople(index_division, index_chapter, index_profession) {
    console.log('getCountPeople');
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count) {
        let sum = 0;
        plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count.forEach(array => {
            array.forEach(x => {
                if (x != '')
                sum += x;
            });
        });
        plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count_people = sum;
    };
    getProfessionColumnResult(index_division, index_chapter);
    getProfessionDirections(index_division, index_chapter);
}
function addCode(index_division, index_chapter, index_profession) {
    console.log('addCode');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code.push({id:null,name:'',status:2});
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].start_o.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].start_po.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].end_po.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].qual_ex.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction.push([]);
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count.push([]);
}
function addDirection(index_division, index_chapter, index_profession, index_code) {
    console.log('addDirection');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code].push({id:null,id_direction:'',status:2});
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count[index_code].push(0);
}
function getProfessionResults(index_division, index_chapter) {
    console.log('getProfessionResults');
    getProfessionColumnResult(index_division, index_chapter);
    getProfessionDirections(index_division, index_chapter);
    plan.value[index_division].arr_chapter[index_chapter].results = true;
}
function getProfessionColumnResult(index_division, index_chapter) {
    console.log('getProfessionColumnResult');
    let arr_column = ['to1', 'indt', 'tren', 'exam', 'to2', 'po', 'count_people'];
    arr_column.forEach(column => {
        plan.value[index_division].arr_chapter[index_chapter].arr_profession_results[column] = 0;
        if (plan.value[index_division].arr_chapter[index_chapter]) {
            let sum = 0;
            plan.value[index_division].arr_chapter[index_chapter].arr_profession.forEach(x => {
                if (x[column]) {
                    if (x[column] == '')
                        sum += 0;
                    else
                        sum += x[column];
                }
            });
            plan.value[index_division].arr_chapter[index_chapter].arr_profession_results[column] = sum;
        }
    });
    getChapterColumnResult(index_division);
}
function getProfessionDirections(index_division, index_chapter) {
    console.log('getProfessionDirections');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession_results['directions'] = {};
    plan.value[index_division].arr_chapter[index_chapter].arr_profession.forEach(profession => {
        profession.direction.forEach((code, index_code) => { 
            code.forEach((direction, index_direction) => {
                if (plan.value[index_division].arr_chapter[index_chapter].arr_profession_results['directions'][direction.id_direction] == undefined) 
                    plan.value[index_division].arr_chapter[index_chapter].arr_profession_results['directions'][direction.id_direction] = 0;
                if (profession.count[index_code][index_direction] != '')
                    plan.value[index_division].arr_chapter[index_chapter].arr_profession_results['directions'][direction.id_direction] += profession.count[index_code][index_direction];
            });
        });
    });
    getChapterDirections(index_division);
}
function getNameById(arr, id) {
    let name = '';
    arr.forEach(item => {
        if (item.id == id) {
            name = item.name;
            return;
        }
    });
    return name;
}
function getChapterResults(index_division) {
    console.log('getChapterResults');
    getChapterColumnResult(index_division);
    getChapterDirections(index_division);
    plan.value[index_division].results = true;
}
function getChapterColumnResult(index_division) {
    console.log('getChapterColumnResult');
    let arr_column = ['to1', 'indt', 'tren', 'exam', 'to2', 'po', 'count_people'];
    arr_column.forEach(column => {
        plan.value[index_division].arr_chapter_results[column] = 0;
        if (plan.value[index_division]) {
            let sum = 0;
            plan.value[index_division].arr_chapter.forEach(x => {
                if (x['arr_profession_results'][column]) {
                    if (x['arr_profession_results'][column] == '')
                        sum += 0;
                    else
                        sum += x['arr_profession_results'][column];
                }
            });
            plan.value[index_division].arr_chapter_results[column] = sum;
        }
    });
    getDivisionColumnResult();
}
function getChapterDirections(index_division) {
    console.log('getChapterDirections');
    plan.value[index_division].arr_chapter_results['directions'] = {};
    plan.value[index_division].arr_chapter.forEach(x => {
        for (let index_direction in x.arr_profession_results.directions) {
            if (plan.value[index_division].arr_chapter_results['directions'][index_direction] == undefined) 
                plan.value[index_division].arr_chapter_results['directions'][index_direction] = 0;
            plan.value[index_division].arr_chapter_results['directions'][index_direction] += x.arr_profession_results.directions[index_direction];
        };
    });
    getDivisionDirections();
}
function getDivisionResults() {
    console.log('getDivisionResults');
    getDivisionColumnResult();
    getDivisionDirections();
    final.value.results = true;
}
function getDivisionColumnResult() {
    console.log('getDivisionColumnResult');
    let arr_column = ['to1', 'indt', 'tren', 'exam', 'to2', 'po', 'count_people'];
    arr_column.forEach(column => {
        final.value.arr_plan_result[column] = 0;
        if (final.value) {
            let sum = 0;
            final.value.arr_plan.forEach(x => {
                if (x['arr_chapter_results'][column]) {
                    if (x['arr_chapter_results'][column] == '')
                        sum += 0;
                    else
                        sum += x['arr_chapter_results'][column];
                }
            });
            final.value.arr_plan_result[column] = sum;
        }
    });
}
function getDivisionDirections() {
    console.log('getDivisionDirections');
    final.value.arr_plan_result['directions'] = {};
    final.value.arr_plan.forEach(x => {
        for (let index_direction in x.arr_chapter_results.directions) {
            if (final.value.arr_plan_result['directions'][index_direction] == undefined) 
                final.value.arr_plan_result['directions'][index_direction] = 0;
            final.value.arr_plan_result['directions'][index_direction] += x.arr_chapter_results.directions[index_direction];
        };
    });
}
function SAVE() {
    let answer = {
        request_type: "SAVE",
        training_list: [],
        academic_year: 2022,
        table_type: 2
    }
    plan.value.forEach((division) => {
        division.arr_chapter.forEach((chapter) => {
            chapter.arr_profession.forEach((profession) => {
                if (profession.status == undefined) return;
                let profession_groups = [];
                profession.code.forEach((group, index_group) => {
                    let directions = [];
                    profession.direction[index_group].forEach((direction, index_direction) => {
                        directions.push({
                            "id":direction.id,
                            "status":direction.status,
                            "id_direction":direction.id_direction,
                            "count_people":profession.count[index_group][index_direction]
                        });
                    });
                    profession_groups.push({
                        "id":group.id,
                        "id_PG":group.name,
                        "status":group.status,
                        "date_start_training":profession.start_o[index_group],
                        "date_start_industrial_training":profession.start_po[index_group],
                        "date_end_industrial_training":profession.end_po[index_group],
                        "date_exam":profession.qual_ex[index_group],
                        "directions":directions
                    });
                });
                answer.training_list.push({
                    "id":profession.id, 
                    "status":profession.status,
                    "academic_year":final.value.year,
                    "table_type":2,
                    "id_division":division.division,
                    "id_section":chapter.title,
                    "id_profession":profession.name,
                    "profession_groups": profession_groups,
                    "to1":profession.to1,
                    "per":profession.per,
                    "indt":profession.indt,
                    "tren":profession.tren,
                    "exam":profession.exam,
                    "to2":profession.to2,
                    "po":profession.po
                });
            });
        });
    });
    console.log((final.value));
    console.log((answer));
    console.log(JSON.stringify(final.value));
    console.log(JSON.stringify(answer));
    axios
        .post('https://' + host + '/table', answer)
        .then((response) => {
            console.log(response);
            router.go(0);
        })
}
function setProfessionStatusChange(index_division, index_chapter, index_profession) {
    console.log('setProfessionStatusChange');
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].name == '') {
        if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].id == undefined) {
            plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status = undefined;
        } else {
            plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status = 0;
        }
        return;
    }
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status == 2) return;
    else plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].status = 1;
}
function setCodeStatusChange(index_division, index_chapter, index_profession, index_code) {
    console.log('setCodeStatusChange');
    setProfessionStatusChange(index_division, index_chapter, index_profession);
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].name == '') {
        if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].id == undefined) {
            plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status = undefined;
        } else {
            plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status = 0;
        }
        return;
    }
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status == 2) return;
    else plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code[index_code].status = 1;
}
function setDirectionStatusChange(index_division, index_chapter, index_profession, index_direction, index_code) {
    console.log('setDirectionStatusChange');
    setCodeStatusChange(index_division, index_chapter, index_profession, index_code);
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code][index_direction].id_direction == '') {
        if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code][index_direction].id == undefined) {
            plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code][index_direction].status = undefined;
        } else {
            plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code][index_direction].status = 0;
        }
        return;
    }
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code][index_direction].status == 2) return;
    else plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction[index_code][index_direction].status = 1;
}
function debug() {
    console.log(final.value);
    console.log(JSON.stringify(final.value));
}
</script>

<template>
    <div class="container">
        <div>
            <div class="title">План-график</div>
            <div class="title">профессианального развития рабочих и служащих в Восточно-Сибирском учебном центре профессиональных квалификаций</div>
            <div class="title">Восточно-Сибирской железной дороги - филиала ОАО "РЖД"</div>
            <div class="title">на 
                <input type="number" class="title" id="input_year" v-model="final.year">
                год
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
                        <th colspan="5">
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
                <tbody v-for="(division, index_division) in plan" :key="index_division">
                    <tr>
                        <td colspan="18">
                            Подразделение
                            <select v-model="division.division" class="input_text input_titles">
                                <option value="" disabled>Наименование подразделения</option>
                                <option v-for="name_division in arr_name_division" :key="name_division.id" :value="name_division.id">{{ name_division.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <template v-for="(chapter, index_chapter) in division.arr_chapter" :key="index_chapter">
                    <tr>
                        <td colspan="18">
                            <select v-model="chapter.title" class="input_text input_titles">
                                <option value="" disabled>Название раздела</option>
                                <option v-for="name_section in arr_name_section" :key="name_section.id" :value="name_section.id">{{ name_section.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <template v-for="(profession, index_profession) in chapter.arr_profession" :key="index_profession">
                    <tr>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">{{ index_profession + 1 }}</td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <select v-model="profession.name" class="input_text" 
                            @change="getProfessionGroups(profession.name);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                                <option value=""></option>
                                <option v-for="name_profession in arr_name_profession" :key="name_profession.id" :value="name_profession.id">{{ name_profession.name }}</option>
                            </select>
                        </td>
                        <td>
                            <template v-if="profession.code.length > 0">
                            <select v-model="profession.code[0].name" class="input_text" @change="setCodeStatusChange(index_division, index_chapter, index_profession, 0)">
                                <option value=""></option>
                                <option v-for="name_profession_groups in arr_name_profession_groups[profession.name]" :key="name_profession_groups.id" :value="name_profession_groups.id">{{ name_profession_groups.name }}</option>
                            </select>
                            </template>
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <input type="number" class="input_text" v-model="profession.to1" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <input type="number" class="input_text" v-model="profession.indt" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <input type="number" class="input_text" v-model="profession.tren" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <input type="number" class="input_text" v-model="profession.exam" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)" style="min-width: 50px">{{ Number(profession.to1) + Number(profession.exam) }}</td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)" style="min-width: 50px">{{ Number(profession.po) + Number(profession.to2) }}</td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <input type="number" class="input_text" v-model="profession.to2" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)">
                            <input type="number" class="input_text" v-model="profession.po" 
                            @change="getProfessionColumnResult(index_division, index_chapter);setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.start_o[0]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.start_po[0]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.end_po[0]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.qual_ex[0]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td :rowspan="Math.max(profession.code.length+1, 2)" style="min-width: 50px">{{ profession.count_people }}</td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.direction[0]" :key="index_dir">
                                    <td class="nested_input">
                                        <select v-model="dir.id_direction" class="input_text" 
                                        @change="getCountPeople(index_division, index_chapter, index_profession);
                                        setDirectionStatusChange(index_division, index_chapter, index_profession, index_dir, 0)">
                                            <option value=""></option>
                                            <option v-for="name_direction in arr_name_direction" :key="name_direction.id" :value="name_direction.id">{{ name_direction.name }}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" @click="addDirection(index_division, index_chapter, index_profession, 0)">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.count[0]" :key="index_dir">
                                    <td class="nested_input">
                                        <input class="input_text" type="number" v-model="profession.count[0][index_dir]" 
                                        @change="getCountPeople(index_division, index_chapter, index_profession);
                                        setDirectionStatusChange(index_division, index_chapter, index_profession, index_dir, 0)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr v-for="n in Math.max(profession.code.length-1, 0)" :key="n">
                        <td>
                            <select v-model="profession.code[n].name" class="input_text" @change="setCodeStatusChange(index_division, index_chapter, index_profession, n)">
                                <option value=""></option>
                                <option v-for="name_profession_groups in arr_name_profession_groups[profession.name]" :key="name_profession_groups.id" :value="name_profession_groups.id">{{ name_profession_groups.name }}</option>
                            </select>
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.start_o[n]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.start_po[n]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.end_po[n]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td>
                            <input type="date" class="input_text" v-model="profession.qual_ex[n]" @change="setProfessionStatusChange(index_division, index_chapter, index_profession)">
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.direction[n]" :key="index_dir">
                                    <td class="nested_input">
                                        <select v-model="dir.id_direction" class="input_text" 
                                        @change="getCountPeople(index_division, index_chapter, index_profession);
                                        setDirectionStatusChange(index_division, index_chapter, index_profession, index_dir, n)">
                                            <option value=""></option>
                                            <option v-for="name_direction in arr_name_direction" :key="name_direction.id" :value="name_direction.id">{{ name_direction.name }}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" @click="addDirection(index_division, index_chapter, index_profession, n)">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.count[n]" :key="index_dir">
                                    <td class="nested_input">
                                        <input class="input_text" type="number" v-model="profession.count[n][index_dir]" 
                                        @change="getCountPeople(index_division, index_chapter, index_profession);
                                        setDirectionStatusChange(index_division, index_chapter, index_profession, index_dir, n)">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title add_direction" style="opacity: 0;">Добавить дирекцию</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="add_direction" @click="addCode(index_division, index_chapter, index_profession)">Добавить группу</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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
                        <td>Итого по ПР ({{ getNameById(arr_name_section, chapter.title) }}) {{ getNameById(arr_name_division, division.division) }}</td>
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
                    <tr v-for="(result, index_result) in chapter.arr_profession_results['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(arr_name_direction, index_result) }}</td>
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
                        <td>Итого по подразделению {{ getNameById(arr_name_division, division.division) }}</td>
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
                    <tr v-for="(result, index_result) in division.arr_chapter_results['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(arr_name_direction, index_result) }}</td>
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
                            <div class="nested_text" v-if="!final.results"><text class="title add_direction" @click="getDivisionResults()">Подвести общие итоги</text></div>
                            <div class="nested_text" v-if="true"><text class="title add_direction" @click="debug()">DEBUG</text></div>
                        </td>
                    </tr>
                    <template v-if="final.results">
                    <tr>
                        <td></td>
                        <td>ВСЕГО ПРОФЕССИОНАЛЬНОМУ РАЗВИТИЮ в УЦПК</td>
                        <td></td>
                        <td>{{ final.arr_plan_result['to1'] }}</td>
                        <td>{{ final.arr_plan_result['indt'] }}</td>
                        <td>{{ final.arr_plan_result['tren'] }}</td>
                        <td>{{ final.arr_plan_result['exam'] }}</td>
                        <td>{{ final.arr_plan_result['to1'] + final.arr_plan_result['exam'] }}</td>
                        <td>{{ final.arr_plan_result['to2'] + final.arr_plan_result['po'] }}</td>
                        <td>{{ final.arr_plan_result['to2'] }}</td>
                        <td>{{ final.arr_plan_result['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ final.arr_plan_result['count_people'] }}</td>
                        <td></td>
                        <td>{{ final.arr_plan_result['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in final.arr_plan_result['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(arr_name_direction, index_result) }}</td>
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
                <button class="button_save" @click="router.back()">Назад</button>
                <button class="button_save" v-if="level == 2" @click="SAVE()">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 100px 20px 0 20px;
}
.title {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
#input_year {
    width: 60px;
}
.table {
    margin: 10px 0 0 0;
    width: 100%;
}
table {
    border-collapse: collapse;
}
th {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
td {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
.add_direction {
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
}
.add_direction:hover {
    transform: scale(1.1);
}
.vetical_text {
    display: inline-block;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
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
    margin: 50px auto;
    width: 60%;
    display: flex;
    justify-content: space-around;
}
.button_save {
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
}
</style>
