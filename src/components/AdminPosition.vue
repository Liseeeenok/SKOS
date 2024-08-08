<script setup>
import { useStore } from '../stores/PlanStore';
import { getPosition, savePosition } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getPosition();
//------------------------------------
function setStatus(index_position) {
    if (admin.positions[index_position].status != 2) admin.positions[index_position].status = 1;
}
function addPosition() {
    admin.positions.push({'id': null, 'name': '', 'status': 2});
}
function deletePosition(index_position) {
    let result = confirm(`Вы уверены что хотите удалить долность ${admin.positions[index_position].name}?`);
    if (result) {
        admin.positions[index_position].status != 2 ? admin.positions[index_position].status = 0 : admin.positions[index_position].status = 3;
        savePosition();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка должностей</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th style="width: 80px;">Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(position, index_position) in admin.positions" :key="index_position">
                <tr v-if="position.status != 0 && position.status != 3">
                    <td>{{ position.id}}</td>
                    <td><input type="text" v-model="position.name" @change="setStatus(index_position)"/></td>
                    <td>
                        <button class="red" @click="deletePosition(index_position)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="savePosition()">Сохранить</button>
    <button class="add" @click="addPosition()">Добавить должность</button>
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
    width: 1000px;
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