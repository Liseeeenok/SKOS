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
function addRole() {
    admin.roles.push({'id': null, 'name': '', 'status': 2});
}
function deleteRole(index_role) {
    let result = confirm(`Вы уверены что хотите удалить роль ${admin.roles[index_role].name}?`);
    if (result) {
        admin.roles[index_role].status != 2 ? admin.roles[index_role].status = 0 : admin.roles[index_role].status = 3;
        saveRole();
    }
}
function openPermission(roleId) {
    admin.setChapter(7); 
    admin.setRoleId(roleId);
    localStorage.setItem('skos-menu', 7)
    localStorage.setItem('skos-role-id', roleId)
}
//------------------------------------
</script>
<template>
    <h1>Настройка ролей</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(role, index_role) in admin.roles" :key="index_role">
                <tr v-if="role.status != 0 && role.status != 3">
                    <td>{{ role.id }}</td>
                    <td><input type="text" v-model="role.name" @change="setStatus(index_role)"/></td>
                    <td>
                        <div class="buttons">
                            <button v-if="role.status != 2" @click="openPermission(role.id)">Редактировать права</button>
                            <button class="red" @click="deleteRole(index_role)">Удалить</button>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveRole()">Сохранить</button>
    <button class="add" @click="addRole()">Добавить роль</button>
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