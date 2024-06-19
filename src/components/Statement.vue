<script setup>
import { ref } from 'vue';
import router from '../router';
//------------------------------------
import { useStore } from '../stores/PlanStore';
import { getDirection, getDivision, getProfession, getStatement, saveStatement } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getStatement();
getDirection();
getDivision();
getProfession();
//-------------Filter------------------------
const division_filter = ref('');
const direction_filter = ref('');
const profession_filter = ref('');
//-------------Filter------------------------
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
function filterStatement() {
    admin.statement.forEach((profession) => {
        profession.count_directions = 0;
        profession.count_people = 0;
        profession.count_people_fact = 0;
        profession.count_people_trained = 0;
        if (division_filter.value == '' || division_filter.value == profession.id_division) {
            if (profession_filter.value == '' || profession_filter.value == profession.id_profession) {
                profession.directions.forEach((direction) => {
                    if (direction_filter.value == '' || direction_filter.value == direction.id_direction) {
                        profession.count_people += direction.count_people;
                        profession.count_people_fact += direction.count_people_fact;
                        profession.count_people_trained += direction.count_people_trained;
                        profession.count_directions++;
                    }
                });
            }
        }
    });
}
function openEditor() {
    router.push({name: 'statementEdit'});
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
                            <select v-model="division_filter" class="input_text input_titles" @change="filterStatement()">
                                <option value="">Все</option>
                                <template v-for="(division, index_division) in admin.divisions" :key="index_division">
                                    <option :value="division.id">{{ division.name }}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><h2>Профессия:</h2></td>
                        <td>
                            <select v-model="profession_filter" class="input_text input_titles" @change="filterStatement()">
                                <option value="">Все</option>
                                <template v-for="(profession, index_profession) in admin.professions" :key="index_profession">
                                    <option :value="profession.id">{{ profession.name }}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><h2>Дирекция:</h2></td>
                        <td>
                            <select v-model="direction_filter" class="input_text input_titles" @change="filterStatement()">
                                <option value="">Все</option>
                                <template v-for="(direction, index_direction) in admin.directions" :key="index_direction">
                                    <option :value="direction.id">{{ direction.name }}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <h1>Ведомость на <input type="number" style="width: 100px; font-size: 1em;" v-model="admin.academic_year" @change="getStatement()"/> год</h1>
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
                <template v-for="(profession, index_profession) in admin.statement" :key="index_profession">
                    <template v-if="division_filter == '' || division_filter == profession.id_division">
                        <template v-if="(profession_filter == '' || profession_filter == profession.id_profession) && profession.count_directions > 0">
                            <tr v-if="admin.professions[profession.id_profession]">
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ index_profession + 1 }}</td>
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ admin.professions[profession.id_profession].name }}</td>
                                <td style="visibility: hidden;"></td>
                                <td style="visibility: hidden;"></td>
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ profession.count_people }}</td>
                                <td style="visibility: hidden;"></td>
                                <td style="visibility: hidden;"></td>
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ profession.count_people_fact }}</td>
                                <td style="visibility: hidden;"></td>
                                <td style="visibility: hidden;"></td>
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ profession.count_people_trained }}</td>
                            </tr>
                            <template v-for="(direction, index_direction) in profession.directions" :key="index_direction">
                                <tr v-if="direction_filter == '' || direction_filter == direction.id_direction">
                                    <td>{{ getNameById(admin.directions, direction.id_direction) }}</td>
                                    <td>{{ direction.count_people }}</td>
                                    <td>{{ getNameById(admin.directions, direction.id_direction) }}</td>
                                    <td>{{ direction.count_people_fact }}</td>
                                    <td>{{ getNameById(admin.directions, direction.id_direction) }}</td>
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
            <button class="button_save" @click="openEditor()">Редактировать</button>
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
</style>
