<script setup>
import { useStore } from '../stores/PlanStore';
import { getDirection, saveDirection } from '../helpers/API.js';
//------------------------------------
const store = useStore();
getDirection();
//------------------------------------
function setStatus(index_direction) {
    if (store.directions[index_direction].status != 2) store.directions[index_direction].status = 1;
}
function addDirection() {
    store.directions[Object.keys(store.directions).pop() + 1] = {'id': null, 'name': '', 'status': 2};
}
function deleteDirection(index_direction) {
    let result = confirm(`Вы уверены что хотите удалить подразделение ${store.directions[index_direction].name}?`);
    if (result) {
        store.directions[index_direction].status = store.directions[index_direction].status != 2 ? 0 : 3;
        saveDirection();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка дирекций</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(direction, index_direction) in store.directions" :key="index_direction">
                <tr v-if="direction.status != 0 && direction.status != 3">
                    <td>{{ direction.id}}</td>
                    <td><input type="text" v-model="direction.name" @change="setStatus(index_direction)"/></td>
                    <td>
                        <button class="red" @click="deleteDirection(index_direction)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveDirection()">Сохранить</button>
    <button class="add" @click="addDirection()">Добавить дирекцию</button>
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