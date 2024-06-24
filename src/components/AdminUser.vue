<script setup>
import { useStore } from '../stores/PlanStore';
import { getUsers, getRole } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getUsers();
getRole();
//------------------------------------
function addUser() {
    admin.users.push({ "login": "", "surname": "", "name": "", "patronymic": "", "phone_number": "", "role": null, "id_direction": null, "id_division": null, "id_profession": null, "id_company": null, "status": 2 });
    admin.userIdx = admin.users.length - 1;
    admin.chapterStatus = 'edit';
}
function openUserEdit(userIdx) {
    admin.userIdx = userIdx;
    admin.chapterStatus = 'edit';
    localStorage.setItem('skos-user-idx', userIdx);
    localStorage.setItem('skos-chapter-status', 'edit');
}
//------------------------------------
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
            </tr>
        </thead>
        <tbody>
            <template v-for="(user, index_user) in admin.users" :key="index_user">
                <tr v-if="user.status != 0 && user.status != 3" @click="openUserEdit(index_user)">
                    <td>{{ user.login }}</td>
                    <td>{{ user.surname }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.patronymic }}</td>
                    <td>{{ user.phone_number }}</td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="add" @click="addUser()">Добавить пользователя</button>
</template>

<style scoped>
table {
    border-collapse: collapse;
}
tr td {
    cursor: pointer;
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
    padding: 15px 20px;
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