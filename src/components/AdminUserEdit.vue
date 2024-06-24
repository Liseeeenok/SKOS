<script setup>
import { useStore } from '../stores/PlanStore';
import { getUsers, getRole, saveUsers, getDivision, getDirection, getProfession, getCompany, getPosition } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
if (localStorage.getItem('skos-chapter-status') == 'edit') getUsers();
getRole();
getDivision();
getDirection();
getProfession();
getCompany();
getPosition();
//------------------------------------
function deleteUser() {
    let result = confirm(`Вы уверены что хотите удалить пользователя ${admin.users[admin.userIdx].name}?`);
    if (result) {
        admin.users[admin.userIdx].status != 2 ? admin.users[admin.userIdx].status = 0 : admin.users[admin.userIdx].status = 3;
        saveUsers(admin.userIdx);
        openUser();
    }
}
function setStatus() {
    if (admin.users[admin.userIdx].status != 2) admin.users[admin.userIdx].status = 1;
}
function openUser() {
    admin.userIdx = null;
    admin.chapterStatus = 'main';
    localStorage.removeItem('skos-user-idx');
    localStorage.setItem('skos-chapter-status', 'main');
}
//------------------------------------
</script>
<template>
    <h1>Настройка пользователя</h1>
    <table>
        <tbody v-if="admin.users">
            <tr>
                <td>Логин</td>
                <td v-if="admin.users[admin.userIdx].status == 2"><input v-model="admin.users[admin.userIdx].login" @change="setStatus()"/></td>
                <td v-else>{{ admin.users[admin.userIdx].login }}</td>
            </tr>
            <tr>
                <td>Фамилия</td>
                <td><input v-model="admin.users[admin.userIdx].surname" @change="setStatus()"/></td>
            </tr>
            <tr>
                <td>Имя</td>
                <td><input v-model="admin.users[admin.userIdx].name" @change="setStatus()"/></td>
            </tr>
            <tr>
                <td>Отчество</td>
                <td><input v-model="admin.users[admin.userIdx].patronymic" @change="setStatus()"/></td>
            </tr>
            <tr>
                <td>Телефон</td>
                <td><input v-model="admin.users[admin.userIdx].phone_number" @change="setStatus()"/></td>
            </tr>
            <tr>
                <td>Должность</td>
                <td>
                    <select v-model="admin.users[admin.userIdx].id_position" @change="setStatus()">
                        <template v-for="(position, index_position) in admin.positions" :key="index_position">
                            <option :value="position.id">{{ position.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Роль</td>
                <td>
                    <select v-model="admin.users[admin.userIdx].role" @change="setStatus()">
                        <template v-for="(role, index_role) in admin.roles" :key="index_role">
                            <option :value="role.id">{{ role.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Подразделение</td>
                <td>
                    <select v-model="admin.users[admin.userIdx].id_division" @change="setStatus()">
                        <option :value="null">Не привязан</option>
                        <template v-for="(division, index_division) in admin.divisions" :key="index_division">
                            <option :value="division.id">{{ division.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Дирекция</td>
                <td>
                    <select v-model="admin.users[admin.userIdx].id_direction" @change="setStatus()">
                        <option :value="null">Не привязан</option>
                        <template v-for="(direction, index_direction) in admin.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Профессия</td>
                <td>
                    <select v-model="admin.users[admin.userIdx].id_profession" @change="setStatus()">
                        <option :value="null">Не привязан</option>
                        <template v-for="(profession, index_profession) in admin.professions" :key="index_profession">
                            <option :value="profession.id">{{ profession.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Предприятие</td>
                <td>
                    <select v-model="admin.users[admin.userIdx].id_company" @change="setStatus()">
                        <option :value="null">Не привязан</option>
                        <template v-for="(company, index_company) in admin.companies" :key="index_company">
                            <option :value="company.id">{{ company.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Новый пароль</td>
                <td><input v-model="admin.users[admin.userIdx].password" @change="setStatus()"/></td>
            </tr>
        </tbody>
    </table>
    <button class="" @click="openUser()">Назад</button>
    <button class="add green" @click="saveUsers(admin.userIdx)">Сохранить</button>
    <button class="red" @click="deleteUser()">Удалить</button>
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
    width: 350px;
}
select {
    padding: 5px 10px;
    font-size: 20px;
    width: 350px;
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