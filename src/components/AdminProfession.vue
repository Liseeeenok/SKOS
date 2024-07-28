<script setup>
import { useStore } from '../stores/PlanStore';
import { getProfession, saveProfession } from '../helpers/API.js';
//------------------------------------
const store = useStore();
getProfession();
//------------------------------------
function setStatus(index_profession) {
    if (store.professions[index_profession].status != 2) store.professions[index_profession].status = 1;
}
function setStatusGroup(index_profession, index_group) {
    store.professions[index_profession].groups[index_group].id_profession = store.professions[index_profession].id;
    if (store.professions[index_profession].groups[index_group].status != 2) {
        store.professions[index_profession].groups[index_group].status = store.professions[index_profession].groups[index_group].name == "" ? 0 : 1;
    }
}
function addProfession() {
    store.professions[Object.keys(store.professions).pop() + 1] = {'id': null, 'name': '', 'status': 2, 'groups': []};
}
function addGroup(index_profession) {
    store.professions[index_profession].groups.push({'id': null, 'name': '', 'status': 2});
}
function deleteProfession(index_profession) {
    let result = confirm(`Вы уверены что хотите удалить профессию ${store.professions[index_profession].name}?`);
    if (result) {
        store.professions[index_profession].status = store.professions[index_profession].status != 2 ? 0 : 3;
        saveProfession();
    }
}
//------------------------------------
</script>
<template>
    <h1>Настройка профессий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Группы</th>
                <th style="width: 250px;">Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(profession, index_profession) in store.professions" :key="index_profession">
                <template v-if="profession.status != 0 && profession.status != 3">
                    <tr>
                        <td :rowspan="Math.max(profession.groups.length, 1)">{{ profession.id}}</td>
                        <td :rowspan="Math.max(profession.groups.length, 1)"><input type="text" v-model="profession.name" @change="setStatus(index_profession)"/></td>
                        <td><input v-if="profession.groups[0]" class="groups" type="text" v-model="profession.groups[0].name" @change="setStatusGroup(index_profession, 0)"/></td>
                        <td :rowspan="Math.max(profession.groups.length, 1)">
                            <div class="buttons">
                                <button @click="addGroup(index_profession)">Добавить группу</button>
                                <button class="red" @click="deleteProfession(index_profession)">Удалить</button>
                            </div>
                        </td>
                    </tr>
                    <template v-for="(group, index_group) in profession.groups" :key="index_group">
                        <tr v-if="index_group != 0">
                            <td><input class="groups" type="text" v-model="group.name" @change="setStatusGroup(index_profession, index_group)"/></td>
                        </tr>
                    </template>
                </template>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveProfession()">Сохранить</button>
    <button class="add" @click="addProfession()">Добавить профессию</button>
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
    width: 800px;
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
.groups {
    width: 200px;
}
.buttons {
    display: flex;
}
</style>