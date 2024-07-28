<script setup>
import { useStore } from '../stores/PlanStore';
import { getSection, saveSection } from '../helpers/API.js';
//------------------------------------
const store = useStore();
getSection();
//------------------------------------
function setStatus(index_section) {
    if (store.sections[index_section].status != 2) store.sections[index_section].status = 1;
}
function addSection() {
    store.sections[Object.keys(store.sections).pop() + 1] = {'id': null, 'name': '', 'status': 2};
}
function deleteSection(index_section) {
    let result = confirm(`Вы уверены что хотите удалить направление ${store.sections[index_section].name}?`);
    if (result) {
        store.sections[index_section].status = store.sections[index_section].status != 2 ? 0 : 3;
        saveSection();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка секций</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th style="width: 80px;">Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(section, index_section) in store.sections" :key="index_section">
                <tr v-if="section.status != 0 && section.status != 3">
                    <td>{{ section.id}}</td>
                    <td><input type="text" v-model="section.name" @change="setStatus(index_section)"/></td>
                    <td>
                        <button class="red" @click="deleteSection(index_section)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveSection()">Сохранить</button>
    <button class="add" @click="addSection()">Добавить направление</button>
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