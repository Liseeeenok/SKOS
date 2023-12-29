<script setup>
import { ref } from 'vue';
import axios from 'axios';
const plan = ref([]);
const final = ref({year: '', arr_plan: plan, arr_plan_result: []})
//Обязательное обучение в соответствии с законодательством РФ
//console.log(JSON.stringify(plan.value));
const host = 'mypew.ru:7070'; //имя или ip хоста api
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
    axios
        .get('https://'+host+'/profession_groups?id_profession='+id_profession)
        .then(response => {
            arr_name_profession_groups.value[id_profession] = response.data;
        });
}
function addMainDivision() {
    plan.value.push({division:'', arr_chapter:[{title: '', arr_profession: [], arr_profession_results: {}, results: false}], arr_chapter_results:[], results: false});
}
function addProfession(index_division, index_chapter) {
    plan.value[index_division].arr_chapter[index_chapter].arr_profession.push({name:'Машинист', code:['Маш'], to1:752, per: 0, indt:'', tren:'', exam:8, to2:19, po:3, start_o:['2021-11-16'], start_po:['2021-02-24'], end_po:['2022-03-17'], qual_ex:['2022-04-28'], count_p:'', direction:[], count:[]});
}
function addChapter(index_division) {
    plan.value[index_division].arr_chapter.push({title: '', arr_profession: [], arr_profession_results: {}, results: false});
}
function getCountPeople(index_division, index_chapter, index_profession) {
    if (plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count) {
        let sum = 0;
        plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count.forEach(x => {
            if (x != '')
                sum += x;
        });
        plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count_p = sum;
        return sum;
    } else return 0;
}
function addCode(index_division, index_chapter, index_profession) {
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].code.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].start_o.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].start_po.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].end_po.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].qual_ex.push('');
}
function addDirection(index_division, index_chapter, index_profession) {
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].direction.push('');
    plan.value[index_division].arr_chapter[index_chapter].arr_profession[index_profession].count.push(4);
}
function getProfessionResults(index_division, index_chapter) {
    plan.value[index_division].arr_chapter[index_chapter].results = true;
    console.log(JSON.stringify(plan.value));
}
function getProfessionColumnResult(index_division, index_chapter, column) {
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
        return sum;
    } else return 0;
}
function getProfessionColumnResult2(index_division, index_chapter, column, column2) {
    if (plan.value[index_division].arr_chapter[index_chapter]) {
        let sum = 0;
        plan.value[index_division].arr_chapter[index_chapter].arr_profession.forEach(x => {
            if (x[column])
                sum += x[column];
            if (x[column2])
                sum += x[column2];
        });
        return sum;
    } else return 0;
}
function getProdessionDirections(index_division, index_chapter) {
    let arr_direction_results = {};
    plan.value[index_division].arr_chapter[index_chapter].arr_profession.forEach(x => {
        x.direction.forEach((direction, index_direction) => {
        if (!arr_direction_results[direction]) 
            arr_direction_results[direction] = 0;
        if (x.count[index_direction] == '')
            arr_direction_results[direction] += 0;
        else
            arr_direction_results[direction] += x.count[index_direction];
        });
    });
    plan.value[index_division].arr_chapter[index_chapter].arr_profession_results['directions'] = arr_direction_results; 
    return arr_direction_results;
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
    plan.value[index_division].results = true;
    console.log(JSON.stringify(plan.value));
}
function getChapterColumnResult(index_division, column) {
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
        return sum;
    } else return 0;
}
function getChapterColumnResult2(index_division, column, column2) {
    if (plan.value[index_division]) {
        let sum = 0;
        plan.value[index_division].arr_chapter.forEach(x => {
            if (x['arr_profession_results'][column])
                sum += x['arr_profession_results'][column];
            if (x['arr_profession_results'][column2])
                sum += x['arr_profession_results'][column2];
        });
        return sum;
    } else return 0;
}
function getChapterDirections(index_division) {
    let arr_direction_results = {};
    console.log('getChapterDirections');
    return arr_direction_results;
    plan.value[index_division].arr_chapter.forEach(x => {
        for (let index_direction in x.arr_profession_results.directions) {
            if (!arr_direction_results[index_direction]) 
                arr_direction_results[index_direction] = 0;
            arr_direction_results[index_direction] += x.arr_profession_results.directions[index_direction];
        };
    });
    //plan.value[index_division].arr_chapter_results['directions'] = arr_direction_results; 
    return arr_direction_results;
}
function debug() {
    console.log(JSON.stringify(plan.value));
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
                        <td colspan="19">
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
                        <td :rowspan="profession.code.length+1">{{ index_profession + 1 }}</td>
                        <td :rowspan="profession.code.length+1">
                            <select v-model="profession.name" class="input_text" @change="getProfessionGroups(profession.name)">
                                <option v-for="name_profession in arr_name_profession" :key="name_profession.id" :value="name_profession.id">{{ name_profession.name }}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="profession.code[0]" class="input_text">
                                <option v-for="name_profession_groups in arr_name_profession_groups[profession.name]" :key="name_profession_groups.id" :value="name_profession_groups.id">{{ name_profession_groups.name }}</option>
                            </select>
                        </td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" v-model="profession.to1"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" v-model="profession.indt"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" v-model="profession.tren"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" v-model="profession.exam"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" :value="Number(profession.to1) + Number(profession.exam)"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" :value="Number(profession.po) + Number(profession.to2)"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" v-model="profession.to2"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" v-model="profession.po"></td>
                        <td><input type="date" class="input_text" v-model="profession.start_o[0]"></td>
                        <td><input type="date" class="input_text" v-model="profession.start_po[0]"></td>
                        <td><input type="date" class="input_text" v-model="profession.end_po[0]"></td>
                        <td><input type="date" class="input_text" v-model="profession.qual_ex[0]"></td>
                        <td :rowspan="profession.code.length+1"><input type="number" class="input_text" :value="getCountPeople(index_division, index_chapter, index_profession)"></td>
                        <td class="nested_table" :rowspan="profession.code.length">
                            <table class="table_nested">
                                <tr v-for="(dir, index_profession) in profession.direction" :key="index_profession">
                                    <td class="nested_input">
                                        <select v-model="profession.direction[index_profession]" class="input_text">
                                            <option v-for="name_direction in arr_name_direction" :key="name_direction.id" :value="name_direction.id">{{ name_direction.name }}</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table" :rowspan="profession.code.length">
                            <table class="table_nested">
                                <tr v-for="(dir, index_profession) in profession.count" :key="index_profession">
                                    <td class="nested_input">
                                        <input class="input_text" type="number" v-model="profession.count[index_profession]">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr v-for="n in profession.code.length-1" :key="n">
                        <td>
                            <select v-model="profession.code[n]" class="input_text">
                                <option v-for="name_profession_groups in arr_name_profession_groups[profession.name]" :key="name_profession_groups.id" :value="name_profession_groups.id">{{ name_profession_groups.name }}</option>
                            </select>
                        </td>
                        <td><input type="date" class="input_text" v-model="profession.start_o[n]"></td>
                        <td><input type="date" class="input_text" v-model="profession.start_po[n]"></td>
                        <td><input type="date" class="input_text" v-model="profession.end_po[n]"></td>
                        <td><input type="date" class="input_text" v-model="profession.qual_ex[n]"></td>
                    </tr>
                    <tr>
                        <td class="add_direction" @click="addCode(index_division, index_chapter, index_profession)">Добавить группу</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="title add_direction" @click="addDirection(index_division, index_chapter, index_profession)">Добавить дирекцию</td>
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
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'to1') }}</td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'indt') }}</td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'tren') }}</td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'exam') }}</td>
                        <td>{{ getProfessionColumnResult2(index_division, index_chapter, 'to1', 'exam') }}</td>
                        <td>{{ getProfessionColumnResult2(index_division, index_chapter, 'po', 'to2') }}</td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'to2') }}</td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'po') }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'count_p') }}</td>
                        <td></td>
                        <td>{{ getProfessionColumnResult(index_division, index_chapter, 'count_p') }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in getProdessionDirections(index_division, index_chapter)" :key="result">
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
                        <td>{{ result }}</td>
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
                        <td>{{ getChapterColumnResult(index_division, 'to1') }}</td>
                        <td>{{ getChapterColumnResult(index_division, 'indt') }}</td>
                        <td>{{ getChapterColumnResult(index_division, 'tren') }}</td>
                        <td>{{ getChapterColumnResult(index_division, 'exam') }}</td>
                        <td>{{ getChapterColumnResult2(index_division, 'to1', 'exam') }}</td>
                        <td>{{ getChapterColumnResult2(index_division, 'po', 'to2') }}</td>
                        <td>{{ getChapterColumnResult(index_division, 'to2') }}</td>
                        <td>{{ getChapterColumnResult(index_division, 'po') }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ getChapterColumnResult(index_division, 'count_p') }}</td>
                        <td></td>
                        <td>{{ getChapterColumnResult(index_division, 'count_p') }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in getChapterDirections(index_division)" :key="result">
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
                        <td>{{ result }}</td>
                    </tr>
                    </template> 
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction margin_direction" @click="addMainDivision()">Добавить подразделение</text></div>
                            <div class="nested_text" v-if="false"><text class="title add_direction margin_direction" @click="debug()">DEBUG</text></div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
.margin_direction {
    margin-bottom: 200px;
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
</style>
