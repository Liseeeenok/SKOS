<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const professions = ref();
const directions = ref();
getProfession();
function getProfession() {
    axios
    .get('https://'+host+'/professions')
    .then(response => {
        professions.value = response.data;
    });
}
function setStatus(index_direction) {
    if (directions.value[index_direction].status != 2) directions.value[index_direction].status = 1;
}
function addDirection() {
    directions.value.push({'id':null, 'name': '', 'status': 2});
}
function deleteDirection(index_direction) {
    let result = confirm(`Вы уверены что хотите удалить подразделение ${directions.value[index_direction].name}?`);
    if (result && directions.value[index_direction].status != 2) directions.value[index_direction].status = 0;
    if (result && directions.value[index_direction].status == 2) directions.value[index_direction].status = 3;
}
function save() {
    let answer = directions.value.filter((direction) => typeof direction.status !== "undefined" && direction.status != 3);
    console.log(1, answer);
    axios
        .post('https://' + host + '/directions', answer)
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
            <template v-for="(direction, index_direction) in directions" :key="index_direction">
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
    <button class="green" @click="save()">Сохранить</button>
    <button class="add" @click="addDirection()">Добавить дирекцию</button>
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
    width: 400px;
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