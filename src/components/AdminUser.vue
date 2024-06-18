<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const users = ref();
const roles = ref();
getUsers();
getRole();
function getUsers() {
    let request = {
        type_request:'users_info',
        jwt: localStorage.getItem('skos-token')
    }
    axios
        .post('https://' + host + '/accounts', request)
        .then((response) => {
            users.value = response.data;
            console.log(response);
        })
}
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
function setStatus(index_user) {
    if (users.value[index_user].status != 2) users.value[index_user].status = 1;
}
function addUser() {
    users.value.push({'login': '', 'name': '', 'patronymic' : '', 'phone_number' : '', 'role' : '', 'surname' : '', 'status': 2});
}
function deleteUser(index_user) {
    let result = confirm(`Вы уверены что хотите удалить пользователя ${users.value[index_user].name}?`);
    if (result) {
        if (users.value[index_user].status != 2) users.value[index_user].status = 0;
        else users.value[index_user].status = 3;
        save();
    }
}
function save() {
    let answer = users.value.filter((user) => typeof user.status !== "undefined" && user.status != 3);
    console.log(answer);
    let count = 0;
    for(let ans of answer) {
        let request = {
            type_request: 'user_change',
            jwt: localStorage.getItem('skos-token'),
            user: ans,
        }
        console.log(request);
        axios
            .post('https://' + host + '/accounts', request)
            .then((response) => {
                console.log(response);
                count++;
                if (count == answer.length) router.go(0);
            })
    };
}
</script>
<template>
    <h1>Настройка пользователей</h1>
    <table>
        <thead>
            <tr>
                <th>Логин</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Телефон</th>
                <th>Роль</th>
                <th>Новый пароль</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(user, index_user) in users" :key="index_user">
                <tr v-if="user.status != 0 && user.status != 3">
                    <td v-if="user.status == 2"><input type="text" v-model="user.login"/></td>
                    <td v-else>{{ user.login }}</td>
                    <td><input type="text" v-model="user.surname" @change="setStatus(index_user)"/></td>
                    <td><input type="text" v-model="user.name" @change="setStatus(index_user)"/></td>
                    <td><input type="text" v-model="user.patronymic" @change="setStatus(index_user)"/></td>
                    <td><input type="text" v-model="user.phone_number" @change="setStatus(index_user)"/></td>
                    <td>
                        <select v-model="user.role" @change="setStatus(index_user)">
                            <template v-for="(role, index_role) in roles" :key="index_role">
                                <option :value="role.id">{{ role.name }}</option>
                            </template>
                        </select>
                    </td>
                    <td><input type="text" v-model="user.password" @change="setStatus(index_user)"/></td>
                    <td>
                        <button class="red" @click="deleteUser(index_user)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="save()">Сохранить</button>
    <button class="add" @click="addUser()">Добавить пользователя</button>
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
    width: 150px;
}
select {
    padding: 5px 10px;
    font-size: 20px;
    max-width: 370px;
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