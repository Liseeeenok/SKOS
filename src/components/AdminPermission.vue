<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
import { useStore } from '../stores/PlanStore';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const roles = ref();
const admin = useStore();
if (localStorage.getItem('skos-role-id')) {
    admin.setRoleId(localStorage.getItem('skos-role-id'));
}
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
function updateRole() {
    localStorage.setItem('skos-role-id', admin.roleId);
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
    <h1>Настройка прав доступа ролям</h1>
    <select v-model="admin.roleId" @change="updateRole()">
        <template v-for="(role, index_role) in roles" :key="index_role">
            <option :value="role.id">{{ role.name }}</option>
        </template>
    </select>
    <table>
        <thead>
            <tr>
                <th>Право</th>
                <th>Уровень доступа</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Панель администратора</td>
                <td></td>
            </tr>
            <tr>
                <td>Подразделения</td>
                <td></td>
            </tr>
            <tr>
                <td>Секции</td>
                <td></td>
            </tr>
            <tr>
                <td>Дирекции</td>
                <td></td>
            </tr>
            <tr>
                <td>Профессии</td>
                <td></td>
            </tr>
            <tr>
                <td>Группы профессий</td>
                <td></td>
            </tr>
            <tr>
                <td>Роли</td>
                <td></td>
            </tr>
            <tr>
                <td>Пользователи</td>
                <td></td>
            </tr>
            <tr>
                <td>Уведомления</td>
                <td></td>
            </tr>
            <tr>
                <td>План-график</td>
                <td></td>
            </tr>
            <tr>
                <td>Ведомость</td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <button class="green" @click="save()">Сохранить</button>
</template>

<style scoped>
table {
    border-collapse: collapse;
    margin-bottom: 20px;
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
select {
    font-size: 20px;
    margin: 15px 0;
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