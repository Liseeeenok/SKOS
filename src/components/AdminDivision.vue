<script setup>
import { useStore } from '../stores/PlanStore';
import { getDivision, saveDivision } from '../helpers/API.js';
//------------------------------------
const store = useStore();
getDivision();
//------------------------------------
function setStatus(index_division) {
    if (store.divisions[index_division].status != 2) store.divisions[index_division].status = 1;
}
function addDivision() {
    store.divisions[Object.keys(store.divisions).pop() + 1] = {'id': null, 'name': '', 'status': 2};
}
function deleteDivision(index_division) {
    let result = confirm(`Вы уверены что хотите удалить подразделение ${store.divisions[index_division].name}?`);
    if (result) {
        store.divisions[index_division].status = store.divisions[index_division].status != 2 ? 0 : 3;
        saveDivision();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка подразделений</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(division, index_division) in store.divisions" :key="index_division">
                <tr v-if="division.status != 0 && division.status != 3">
                    <td>{{ division.id}}</td>
                    <td><input type="text" v-model="division.name" @change="setStatus(index_division)"/></td>
                    <td>
                        <button class="red" @click="deleteDivision(index_division)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveDivision()">Сохранить</button>
    <button class="add" @click="addDivision()">Добавить подразделение</button>
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