<script setup>
import { useStore } from '../stores/PlanStore';
import { getRole, saveRole } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getRole();
//------------------------------------
function setStatus(index_role) {
    if (admin.roles[index_role].status != 2) admin.roles[index_role].status = 1;
}
function updateRole() {
    localStorage.setItem('skos-role-id', admin.roleId);
}
//------------------------------------
</script>
<template>
    <h1>Настройка прав доступа ролям</h1>
    <select v-model="admin.roleId" @change="updateRole()">
        <template v-for="(role, index_role) in admin.roles" :key="index_role">
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
    <button class="green" @click="saveRole()">Сохранить</button>
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