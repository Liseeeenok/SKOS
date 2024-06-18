<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const professions = ref();
getProfession();
function getProfession() {
    axios
    .get('https://'+host+'/professions?type=full')
    .then(response => {
        professions.value = response.data;
        console.log(response);
    });
}
function setStatus(index_profession) {
    if (professions.value[index_profession].status != 2) professions.value[index_profession].status = 1;
}
function setStatusGroup(index_profession, index_group) {
    professions.value[index_profession].groups[index_group].id_profession = professions.value[index_profession].id;
    if (professions.value[index_profession].groups[index_group].status != 2) {
        if (professions.value[index_profession].groups[index_group].name == "") professions.value[index_profession].groups[index_group].status = 0;
        else professions.value[index_profession].groups[index_group].status = 1;
    }
}
function addProfession() {
    professions.value.push({'id':null, 'name': '', 'status': 2, 'groups': []});
}
function addGroup(index_profession) {
    professions.value[index_profession].groups.push({'id':null, 'name': '', 'status': 2});
}
function deleteProfession(index_profession) {
    let result = confirm(`Вы уверены что хотите удалить профессию ${professions.value[index_profession].name}?`);
    if (result) {
        if (professions.value[index_profession].status != 2) professions.value[index_profession].status = 0;
        else professions.value[index_profession].status = 3;
        save();
    }
}
function save() {
    let answer = {'professions': professions.value.filter((profession) => typeof profession.status !== "undefined" && profession.status != 3)};
    let trig = 0;
    axios
        .post('https://' + host + '/professions', answer)
        .then((response) => {
            console.log(answer);
            console.log(response);
            if (trig == 2) //router.go(0);
            trig = 1;
        });
    let profession_groups = [];
    professions.value.forEach(element => {
        let groups = element.groups.filter((group) => typeof group.status !== "undefined" && group.status != 3);
        profession_groups = profession_groups.concat(groups);
    });
    axios
        .post('https://' + host + '/profession_groups', {'profession_groups': profession_groups})
        .then((response) => {
            console.log({'profession_groups': profession_groups});
            console.log(response);
            if (trig == 1) //router.go(0);
            trig = 2;
        });
}
function max(a ,b) {
    return a > b ? a : b;
}
</script>
<template>
    <h1>Настройка профессий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Группы</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(profession, index_profession) in professions" :key="index_profession">
                <template v-if="profession.status != 0 && profession.status != 3">
                    <tr>
                        <td :rowspan="max(profession.groups.length, 1)">{{ profession.id}}</td>
                        <td :rowspan="max(profession.groups.length, 1)"><input type="text" v-model="profession.name" @change="setStatus(index_profession)"/></td>
                        <td><input v-if="profession.groups[0]" class="groups" type="text" v-model="profession.groups[0].name" @change="setStatusGroup(index_profession, 0)"/></td>
                        <td :rowspan="max(profession.groups.length, 1)">
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
    <button class="green" @click="save()">Сохранить</button>
    <button class="add" @click="addProfession()">Добавить профессию</button>
</template>

<style scoped>
table {
    border-collapse: collapse;
}
th {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
td {
    padding: 5px 10px;
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
input {
    padding: 5px 10px;
    font-size: 20px;
    width: 800px;
}
button {
    padding: 5px 10px;
    font-size: 20px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;
}
button:hover {
    transform: scale(1.05);
}
.green {
    color: black;
    background-color: #2a9630b0;
}
.red {
    background-color: #cc5e5e;
}
.add {
    margin: 15px 0 0 0;
}
.groups {
    width: 200px;
}
.buttons {
    display: flex;
}
</style>