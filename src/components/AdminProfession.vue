<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const professions = ref();
getProfession();
function getProfession() {
    axios
    .get('https://'+host+'/professions')
    .then(response => {
        professions.value = response.data;
    });
}
function setStatus(index_profession) {
    if (professions.value[index_profession].status != 2) professions.value[index_profession].status = 1;
}
function addProfession() {
    professions.value.push({'id':null, 'name': '', 'status': 2});
}
function deleteProfession(index_profession) {
    let result = confirm(`Вы уверены что хотите удалить профессию ${professions.value[index_profession].name}?`);
    if (result && professions.value[index_profession].status != 2) professions.value[index_profession].status = 0;
    if (result && professions.value[index_profession].status == 2) professions.value[index_profession].status = 3;
}
function save() {
    let answer = professions.value.filter((profession) => typeof profession.status !== "undefined" && profession.status != 3);
    console.log(1, answer);
    axios
        .post('https://' + host + '/professions', answer)
        .then((response) => {
            console.log(response);
            //router.go(0);
        })
}
</script>
<template>
    <h1>Настройка профессий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(profession, index_profession) in professions" :key="index_profession">
                <tr v-if="profession.status != 0 && profession.status != 3">
                    <td>{{ profession.id}}</td>
                    <td><input type="text" v-model="profession.name" @change="setStatus(index_profession)"/></td>
                    <td>
                        <button class="red" @click="deleteProfession(index_profession)">Удалить</button>
                    </td>
                </tr>
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
    width: 1000px;
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
</style>