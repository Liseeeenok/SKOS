<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const sections = ref();
getSection();
function getSection() {
    axios
    .get('https://'+host+'/sections')
    .then(response => {
        sections.value = response.data;
    });
}
function setStatus(index_section) {
    if (sections.value[index_section].status != 2) sections.value[index_section].status = 1;
}
function addSection() {
    sections.value.push({'id':null, 'name': '', 'status': 2});
}
function deleteSection(index_section) {
    let result = confirm(`Вы уверены что хотите удалить направление ${sections.value[index_section].name}?`);
    if (result) {
        if (sections.value[index_section].status != 2) sections.value[index_section].status = 0;
        else sections.value[index_section].status = 3;
        save();
    }
}
function save() {
    let answer = {
        jwt: localStorage.getItem('skos-token'),
        sections: sections.value.filter((section) => typeof section.status !== "undefined" && section.status != 3)
    };
    axios
        .post('https://' + host + '/sections', answer)
        .then((response) => {
            console.log(response);
            router.go(0);
        })
}
</script>
<template>
    <h1>Настройка секций</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(section, index_section) in sections" :key="index_section">
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
    <button class="green" @click="save()">Сохранить</button>
    <button class="add" @click="addSection()">Добавить направление</button>
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