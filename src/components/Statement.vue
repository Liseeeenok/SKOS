<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/PlanStore';
import { verify, preLoad, getDirection, getDivision, getProfession, getStatement } from '../helpers/API.js';
import router from '../router/index.js';
//-------------AUTH-------------------
verify();
preLoad();
//------------------------------------
const admin = useStore();

let date = new Date();
admin.from_date = date.getFullYear() + '-01-01';
admin.to_date = date.getFullYear() + '-12-31';
getStatement();
getDirection();
getDivision();
getProfession();
//-------------Filter------------------------
const division_filter = ref('');
const direction_filter = ref('');
const profession_filter = ref('');
//-------------Filter------------------------
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
//------------------------------------
</script>

<template>
    <div class="container">
        <div>
            <div class="input_filter">
                <table class="filter_table">
                    <tr>
                        <td>Подразделение:</td>
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
                        <td>Профессия:</td>
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
                        <td>Дирекция:</td>
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
        <div class="title">
            Ведомость с <input type="date" style="width: 150px; font-size: 16px;" v-model="admin.from_date" @change="getStatement()"/> по 
            <input type="date" style="width: 150px; font-size: 16px;" v-model="admin.to_date" @change="getStatement()"/>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th rowspan="2">№</th>
                    <th rowspan="2">Наименование профессии</th>
                    <th colspan="3" style="height: 35px;">План</th>
                    <th colspan="2">Факт</th>
                    <th colspan="2">Количество прошедших обучение</th>
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
                        Количество
                    </th>
                    <th style="writing-mode: vertical-rl; transform: rotate(180deg);">Всего</th>
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
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ profession.count_people_fact }}</td>
                                <td style="visibility: hidden;"></td>
                                <td :rowspan="Math.max(profession.count_directions + 1, 2)">{{ profession.count_people_trained }}</td>
                            </tr>
                            <template v-for="(direction, index_direction) in profession.directions" :key="index_direction">
                                <tr v-if="direction_filter == '' || direction_filter == direction.id_direction"
                                :class="direction.count_people > direction.count_people_fact ? 'bc_red' : ''">
                                    <td>{{ admin.directions[direction.id_direction].name }}</td>
                                    <td>{{ direction.count_people }}</td>
                                    <td>{{ direction.count_people_fact }}</td>
                                    <td>{{ direction.count_people_trained }}</td>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
        <div class="div_button">
            <button class="add" @click="router.push('/training/statement/edit')">Редактировать</button>
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
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .table {
        margin: 10px;
        width: calc(100% - 20px);
    }

    table.table {
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

                &.bc_red {
                    background-color: rgb(255 202 202);

                    td {
                        border: solid 1px rgb(205 152 152);
                    }
                }
            }

            &:nth-child(2n) {
                background-color: rgb(245 245 245);

                &.bc_red {
                    background-color: rgb(245 192 192);

                    td {
                        border: solid 1px rgb(205 152 152);
                    }
                }
            }

            &:hover {
                background-color: rgb(216 216 216);

                &.bc_red {
                    background-color: rgb(205 152 152);
                }
            }
        }
    }
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
    font-size: 16px;
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
