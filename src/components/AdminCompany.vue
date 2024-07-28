<script setup>
import { useStore } from '../stores/PlanStore';
import { getCompany, getDirection, saveCompany } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getCompany();
getDirection();
//------------------------------------
function setStatus(index_company) {
    if (admin.companies[index_company].status != 2) admin.companies[index_company].status = 1;
}
function addCompany() {
    admin.companies.push({'id': null, 'id_direction': null, 'name': '', 'status': 2});
}
function deleteCompany(index_company) {
    let result = confirm(`Вы уверены что хотите удалить компанию ${admin.companies[index_company].name}?`);
    if (result) {
        admin.companies[index_company].status = admin.companies[index_company].status != 2 ? 0 : 3;
        saveCompany();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка предприятий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Дирекция</th>
                <th style="width: 80px;">Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(company, index_company) in admin.companies" :key="index_company">
                <tr v-if="company.status != 0 && company.status != 3">
                    <td>{{ company.id}}</td>
                    <td><input type="text" v-model="company.name" @change="setStatus(index_company)"/></td>
                    <td>
                        <select v-model="company.id_direction" @change="setStatus(index_company)">
                        <template v-for="(direction, index_direction) in admin.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                    </td>
                    <td>
                        <button class="red" @click="deleteCompany(index_company)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveCompany()">Сохранить</button>
    <button class="add" @click="addCompany()">Добавить предприятие</button>
</template>

<style scoped>
table {
    background-color: #ffffff;
    font-size: 16px;
    border-collapse: collapse;
    width: 100%;
    max-width: 1660px;
    border-radius: 10px;
    overflow: hidden;

    tr {

        th, td {
            text-align: center;
            padding: 5px 15px;
            box-sizing: border-box;
        }

        th {
            color: #ffffff;
            font-weight: normal;
            background-color: #8f8f8f;
            border: solid 1px #8f8f8f;
            position: sticky;
            top: 0;
        }

        td {
            border: solid 1px #d8d8d8;
            cursor: pointer;
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
input {
    padding: 5px 10px;
    width: 400px;
}
select {
    padding: 5px 10px;
    width: 350px;
}
button {
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;

    &.green {
        color: black;
        background-color: rgb(217 255 228);

        &:hover {
            background: rgb(198, 226, 193);
        }
    }
    
    &.red {
        background-color: rgb(253 220 214);

        &:hover {
            background: rgb(252 191 179);
        }
    }

    &.add {
        margin: 15px 0 0 0;
        background: rgb(240 237 255);

        &:hover {
            background: rgb(208, 228, 239);
        }
    }
}
</style>