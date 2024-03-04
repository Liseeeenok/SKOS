<script setup>
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';

const host = 'mypew.ru:7070'; //имя или ip хоста api
const level = localStorage.getItem('skos-role');
const page_data = ref({});
page_data.value.year = 2022;
//---------------------------API-----------------------------
const statement = ref([]);
const statement_filter = ref([]);
let article = {
    request_type: 'VIEW_STATEMENT',
    academic_year: page_data.value.year,
    table_type: 2
}
axios
    .post('https://'+host+'/table', article)
    .then(response => {
        console.log(response.data);
        statement.value = response.data;
        statement.value.forEach(profession => {
            getProfessionGroups(profession.id_profession);
            profession.count_directions = 0;
            profession.count_people = 0;
            profession.count_people_fact = 0;
            profession.count_people_trained = 0;
            profession.profession_groups.forEach((profession_group, index_profession_group) => {
                profession_group.directions.forEach((direction, index_direction) => {
                    profession.count_people += direction.count_people;
                    profession.count_people_fact += direction.count_people_fact;
                    profession.count_people_trained += direction.count_people_trained;
                    profession.count_directions++;
                });
                if (profession_group.directions.length == 0) {
                    profession.count_directions++;
                }
            });
        });
        statement_filter.value = JSON.parse(JSON.stringify(statement.value));
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
    statement_filter.value = JSON.parse(JSON.stringify(statement.value));
    statement_filter.value = statement_filter.value.filter((profession) => {
        if (division_filter.value == '' || division_filter.value == profession.id_division) {
            let contains_direction = false;
            if (profession_filter.value == '' || profession_filter.value == profession.id_profession) {
                profession.count_directions = 0;
                profession.count_people = 0;
                profession.count_people_fact = 0;
                profession.count_people_trained = 0;
                profession.profession_groups = profession.profession_groups.filter((profession_group, index_profession_group) => {
                    let contains_direction_in_profession_group = false;
                    profession_group.directions = profession_group.directions.filter((direction, index_direction) => {
                        if (direction_filter.value == '' || direction_filter.value == direction.id_direction) {
                            profession.count_people += direction.count_people;
                            profession.count_people_fact += direction.count_people_fact;
                            profession.count_people_trained += direction.count_people_trained;
                            profession.count_directions++;
                            contains_direction = true;
                            contains_direction_in_profession_group = true;
                            return contains_direction;
                        }
                    });
                    if (direction_filter.value == '' && profession_group.directions.length == 0) {
                        profession.count_directions++;
                        contains_direction = true;
                        contains_direction_in_profession_group = true;
                    }
                    return contains_direction_in_profession_group;
                })
                return contains_direction;
            }
            return contains_direction;
        }
    });
}
function getCountPeople(index_profession, id_profession, name_arr, index_direction) {
    statement.value.forEach(profession => {
        if (profession.id_profession == id_profession) {
            profession.directions[index_direction]['count_people' + name_arr] = statement_filter.value[index_profession].directions[index_direction]['count_people' + name_arr];
            profession.status = 1;
            profession.directions[index_direction].status = 1;
        }
    });
    filterPlan();
}
function setDirectionStatus(index_profession, index_profession_group, index_direction) {
    return 0;
}
function SAVE() {
    let answer = {
        request_type: "SAVE_STATEMENT",
        training_list: [],
        academic_year: page_data.value.year,
        table_type: 2
    }
    answer.training_list = statement.value.filter((profession) => {
        if (profession.status == 1) return true;
    })
    console.log((answer));
    console.log(JSON.stringify(answer));
    axios
        .post('https://' + host + '/table', answer)
        .then((response) => {
            console.log(response);
            router.go(0);
        })
}
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
            <h1>Ведомость на {{ page_data.year }} год</h1>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th rowspan="2">№</th>
                    <th rowspan="2">Наименование профессии</th>
                    <th rowspan="2">Шифр группы </th>
                    <th colspan="3">План</th>
                    <th colspan="3">Факт</th>
                    <th colspan="3">Количество прошедших обучение</th>
                </tr>
                <tr>
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
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">Всего</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(profession, index_profession) in statement_filter" :key="index_profession">
                <tr>
                    <td :rowspan="Math.max(profession.count_directions, 1)">{{ index_profession + 1 }}</td>
                    <td :rowspan="Math.max(profession.count_directions, 1)">{{ getNameById(arr_name_profession, profession.id_profession) }}</td>
                    <td :rowspan="Math.max(profession.profession_groups[0].directions.length, 1)">
                        {{ getNameById(arr_name_profession_groups[profession.id_profession], profession.profession_groups[0].id_PG) }}
                    </td>
                    <template v-if="profession.profession_groups[0].directions.length > 0">
                    <td>{{ getNameById(arr_name_direction, profession.profession_groups[0].directions[0].id_direction) }}</td>
                    <td>{{ profession.profession_groups[0].directions[0].count_people }}</td>
                    </template>
                    <template v-else>
                    <td></td>
                    <td></td>
                    </template>
                    <td :rowspan="Math.max(profession.count_directions, 1)">{{ profession.count_people }}</td>
                    <template v-if="profession.profession_groups[0].directions.length > 0">
                    <td>{{ getNameById(arr_name_direction, profession.profession_groups[0].directions[0].id_direction) }}</td>
                    <td>{{ profession.profession_groups[0].directions[0].count_people_fact }}</td>
                    </template>
                    <template v-else>
                    <td></td>
                    <td></td>
                    </template>
                    <td :rowspan="Math.max(profession.count_directions, 1)">{{ profession.count_people_fact }}</td>
                    <template v-if="profession.profession_groups[0].directions.length > 0">
                    <td>{{ getNameById(arr_name_direction, profession.profession_groups[0].directions[0].id_direction) }}</td>
                    <td>{{ profession.profession_groups[0].directions[0].count_people_trained }}</td>
                    </template>
                    <template v-else>
                    <td></td>
                    <td></td>
                    </template>
                    <td :rowspan="Math.max(profession.count_directions, 1)">{{ profession.count_people_trained }}</td>
                </tr>
                <template v-for="(direction, index_direction) in profession.profession_groups[0].directions" :key="index_direction">
                <tr v-if="index_direction > 0">
                    <td>{{ getNameById(arr_name_direction, direction.id_direction) }}</td>
                    <td>{{ direction.count_people }}</td>
                    <td>{{ getNameById(arr_name_direction, direction.id_direction) }}</td>
                    <td>{{ direction.count_people_fact }}</td>
                    <td>{{ getNameById(arr_name_direction, direction.id_direction) }}</td>
                    <td>{{ direction.count_people_trained }}</td>
                </tr>
                </template>
                <template v-for="(profession_group, index_profession_group) in profession.profession_groups" :key="index_profession_group">
                <tr v-if="index_profession_group > 0">
                    <td :rowspan="Math.max(profession_group.directions.length, 1)">
                        {{ getNameById(arr_name_profession_groups[profession.id_profession], profession_group.id_PG) }}
                    </td>
                    <template v-if="profession_group.directions.length > 0">
                    <td>{{ getNameById(arr_name_direction, profession_group.directions[0].id_direction) }}</td>
                    <td>{{ profession_group.directions[0].count_people }}</td>
                    <td>{{ getNameById(arr_name_direction, profession_group.directions[0].id_direction) }}</td>
                    <td>{{ profession_group.directions[0].count_people_fact }}</td>
                    <td>{{ getNameById(arr_name_direction, profession_group.directions[0].id_direction) }}</td>
                    <td>{{ profession_group.directions[0].count_people_trained }}</td>
                    </template>
                    <template v-else>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </template>
                </tr>
                <template v-if="index_profession_group > 0" >
                <template v-for="(direction, index_direction) in profession_group.directions" :key="index_direction">
                <tr v-if="index_direction > 0">
                    <td>{{ getNameById(arr_name_direction, direction.id_direction) }}</td>
                    <td>{{ direction.count_people }}</td>
                    <td>{{ getNameById(arr_name_direction, direction.id_direction) }}</td>
                    <td>{{ direction.count_people_fact }}</td>
                    <td>{{ getNameById(arr_name_direction, direction.id_direction) }}</td>
                    <td>{{ direction.count_people_trained }}</td>
                </tr>
                </template>
                </template>
                </template>
                </template>
            </tbody>
        </table>
        <div class="div_button">
            <button class="button_save" @click="router.back()">Назад</button>
            <button class="button_save" v-if="level == 3" @click="SAVE()">Сохранить</button>
        </div>
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
.input_number {
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
</style>
