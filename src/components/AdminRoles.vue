<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
import { useStore } from '../stores/PlanStore';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const roles = ref();
const admin = useStore();
getRole();
function getRole() {
    let request = {
        type_request: 'roles_info',
        jwt: localStorage.getItem('skos-token'),
    };
    axios
        .post('https://'+host+'/roles', request)
        .then(response => {
            roles.value = response.data;
            console.log(response);
        });
}
function setStatus(index_role) {
    if (roles.value[index_role].status != 2) roles.value[index_role].status = 1;
}
function addRole() {
    roles.value.push({'id':null, 'name': '', 'status': 2});
}
function deleteRole(index_role) {
    let result = confirm(`Вы уверены что хотите удалить роль ${roles.value[index_role].name}?`);
    if (result) {
        if (roles.value[index_role].status != 2) roles.value[index_role].status = 0;
        else roles.value[index_role].status = 3;
        save();
    }
}
function openPermission(roleId) {
    admin.setChapter(7); 
    admin.setRoleId(roleId);
    localStorage.setItem('skos-menu', 7)
    localStorage.setItem('skos-role-id', roleId)
}
function save() {
    let answer = {
        type_request: 'roles_change',
        jwt: localStorage.getItem('skos-token'),
        roles: roles.value.filter((role) => typeof role.status !== "undefined" && role.status != 3)
    };
    axios
        .post('https://' + host + '/roles', answer)
        .then((response) => {
            console.log(answer, response);
            //router.go(0);
        })
}
</script>
<template>
    <h1>Настройка направлений</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(role, index_role) in roles" :key="index_role">
                <tr v-if="role.status != 0 && role.status != 3">
                    <td>{{ role.id }}</td>
                    <td><input type="text" v-model="role.name" @change="setStatus(index_role)"/></td>
                    <td>
                        <div class="buttons">
                            <button @click="openPermission(role.id)">Редактировать права</button>
                            <button class="red" @click="deleteRole(index_role)">Удалить</button>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="save()">Сохранить</button>
    <button class="add" @click="addRole()">Добавить направление</button>
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
    width: 500px;
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
.buttons {
    display: flex;
}
</style>