<script setup>
import { useStore } from '../stores/PlanStore';
import { getUsers, getRole, saveUsers } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getUsers();
getRole();
//------------------------------------
function setStatus(index_user) {
    if (admin.users[index_user].status != 2) admin.users[index_user].status = 1;
}
function addUser() {
    admin.users.push({'login': '', 'name': '', 'patronymic' : '', 'phone_number' : '', 'role' : '', 'surname' : '', 'status': 2});
}
function deleteUser(index_user) {
    let result = confirm(`Вы уверены что хотите удалить пользователя ${admin.users[index_user].name}?`);
    if (result) {
        admin.users[index_user].status != 2 ? admin.users[index_user].status = 0 : admin.users[index_user].status = 3;
        saveUsers();
    }
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
                <th>Роль</th>
                <th>Новый пароль</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(user, index_user) in admin.users" :key="index_user">
                <tr v-if="user.status != 0 && user.status != 3">
                    <td v-if="user.status == 2"><input type="text" v-model="user.login"/></td>
                    <td v-else>{{ user.login }}</td>
                    <td><input type="text" v-model="user.surname" @change="setStatus(index_user)"/></td>
                    <td><input type="text" v-model="user.name" @change="setStatus(index_user)"/></td>
                    <td><input type="text" v-model="user.patronymic" @change="setStatus(index_user)"/></td>
                    <td><input type="text" v-model="user.phone_number" @change="setStatus(index_user)"/></td>
                    <td>
                        <select v-model="user.role" @change="setStatus(index_user)">
                            <template v-for="(role, index_role) in admin.roles" :key="index_role">
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
    <button class="green" @click="saveUsers()">Сохранить</button>
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