<script setup>
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';

const host = 'mypew.ru:7070'; //имя или ip хоста api
//---------------------------API-----------------------------
const level = localStorage.getItem('skos-token');
import { usePlanStore } from '../stores/PlanStore';
const planStore = usePlanStore();
const final = ref(planStore.plans[0]);
const plan = ref(planStore.plans[0].arr_plan);
console.log(planStore);
console.log(plan);
plan.value.forEach((division) => {
    division.arr_chapter.forEach((chapter) => {
        chapter.arr_profession.forEach((profession) => {
            getProfessionGroups(profession.name);
        });
    });
});
const plan_filter = ref(JSON.parse(JSON.stringify(plan.value)));
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
//-------------Filter------------------------
const division_filter = ref('');
const direction_filter = ref('');
const profession_filter = ref('');
//-------------Filter------------------------
function getProfessionGroups(id_profession) {
    console.log('getProfessionGroups');
    axios
        .get('https://'+host+'/profession_groups?id_profession='+id_profession)
        .then(response => {
            arr_name_profession_groups.value[id_profession] = response.data;
        });
}
function getNameById(arr, id) {
    let name = '';
    if (arr != undefined)
        arr.forEach(item => {
            if (item.id == id) {
                name = item.name;
                return;
            }
        });
    return name;
}
function filterPlan() {
    plan_filter.value = JSON.parse(JSON.stringify(plan.value));
    plan_filter.value = plan_filter.value.filter((division) => {
        if (division_filter.value == '' || division_filter.value == division.division) {
            let contains_direction = false;
            division.arr_chapter.forEach((chapter) => {
                chapter.arr_profession = chapter.arr_profession.filter((profession) => {
                    if (profession_filter.value == '' || profession_filter.value == profession.name) {
                        profession.count_people = 0;
                        let arr_count = [];
                        profession.direction = profession.direction.filter((direction, index_direction) => {
                            if (direction_filter.value == '' || direction_filter.value == direction) {
                                profession.count_people += profession.count[index_direction];
                                arr_count.push(profession.count[index_direction]);
                                contains_direction = true;
                                return true;
                            }
                        });
                        profession.count = arr_count;
                        return contains_direction;
                    }
                });
            });
            return contains_direction;
        }
    });
    console.log(plan_filter);
}
//chapter.arr_profession.length*index_chapter + chapter.arr_profession.length*division.arr_chapter.length*plan_filter + 1
</script>

<template>
    <div class="container">
        <div>
            <div class="input_filter">
                <table class="filter_table">
                    <tr>
                        <td><h2>Подразделение:</h2></td>
                        <td>
                            <select v-model="division_filter" class="input_text input_titles" @change="filterPlan()">
                                <option value="">Все</option>
                                <option v-for="name_division in arr_name_division" :key="name_division.id" :value="name_division.id">{{ name_division.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><h2>Профессия:</h2></td>
                        <td>
                            <select v-model="profession_filter" class="input_text input_titles" @change="filterPlan()">
                                <option value="">Все</option>
                                <option v-for="name_profession in arr_name_profession" :key="name_profession.id" :value="name_profession.id">{{ name_profession.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><h2>Дирекция:</h2></td>
                        <td>
                            <select v-model="direction_filter" class="input_text input_titles" @change="filterPlan()">
                                <option value="">Все</option>
                                <option v-for="name_direction in arr_name_direction" :key="name_direction.id" :value="name_direction.id">{{ name_direction.name }}</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <h1>Ведомость на {{ final.year }} год</h1>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th rowspan="2">№</th>
                    <th rowspan="2">Наименование профессии</th>
                    <th colspan="3">План</th>
                    <th colspan="3">Факт</th>
                    <th colspan="3">Количество прошедших обучение</th>
                </tr>
                <tr>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">Всего</th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                        Дирекция/<br>структурное <br> подразделение
                    </th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                        Количество
                    </th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">Всего</th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                        Дирекция/<br>структурное <br> подразделение
                    </th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                        Количество
                    </th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">Всего</th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                        Дирекция/<br>структурное <br> подразделение
                    </th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                        Количество
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(division, index_division) in plan_filter" :key="index_division">
                <template v-for="(chapter, index_chapter) in division.arr_chapter" :key="index_chapter">
                <template v-for="(profession, index_profession) in chapter.arr_profession" :key="index_profession">
                <tr>
                    <td :rowspan="profession.count.length">{{ index_profession + chapter.arr_profession.length*index_chapter + chapter.arr_profession.length*division.arr_chapter.length*index_division + 1}}</td>
                    <td :rowspan="profession.count.length">{{ getNameById(arr_name_profession, profession.name) }}</td>
                    <td :rowspan="profession.count.length">{{ profession.count_people }}</td>
                    <td>{{ getNameById(arr_name_direction, profession.direction[0]) }}</td>
                    <td>{{ profession.count[0] }}</td>
                    <td :rowspan="profession.count.length">0</td>
                    <td>{{ getNameById(arr_name_direction, profession.direction[0]) }}</td>
                    <td>0</td>
                    <td :rowspan="profession.count.length">0</td>
                    <td>{{ getNameById(arr_name_direction, profession.direction[0]) }}</td>
                    <td>0</td>
                </tr>
                <template v-for="(direction, index_direction) in profession.direction" :key="index_direction">
                <tr v-if="index_direction > 0">
                    <td>{{ getNameById(arr_name_direction, direction) }}</td>
                    <td>{{ profession.count[index_direction] }}</td>
                    <td>{{ getNameById(arr_name_direction, direction) }}</td>
                    <td>0</td>
                    <td>{{ getNameById(arr_name_direction, direction) }}</td>
                    <td>0</td>
                </tr>
                </template>
                </template>
                </template>
                </template>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    padding: 100px 20px 0 20px;
    text-align: center;
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
.input_filter {
    display: flex;
    width: 80%;
    margin: auto;
}
.filter_table td {
    border: 0;
}
.input_text {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    min-width: 65px;
}
.input_titles {
    width: 500px;
}
</style>
