<script setup>
import { useStore } from '../stores/PlanStore';
import { getRole, saveRole } from '../helpers/API.js';
import router from '../router/index.js';
//------------------------------------
const store = useStore();
getRole();
//------------------------------------
function setStatus(index_role) {
    if (store.roles[index_role].status != 2) store.roles[index_role].status = 1;
}
function addRole() {
    store.roles[Object.keys(store.roles).pop() + 1] = {'id': null, 'name': '', 'status': 2};
}
function deleteRole(index_role) {
    let result = confirm(`Вы уверены что хотите удалить роль ${store.roles[index_role].name}?`);
    if (result) {
        store.roles[index_role].status = store.roles[index_role].status != 2 ? 0 : 3;
        saveRole();
    }
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
                <th style="width: 250px;">Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(role, index_role) in store.roles" :key="index_role">
                <tr v-if="role.status != 0 && role.status != 3">
                    <td>{{ role.id }}</td>
                    <td><input type="text" v-model="role.name" @change="setStatus(index_role)"/></td>
                    <td>
                        <div class="buttons">
                            <button v-if="role.status != 2" @click="router.push(`/admin/permission/${role.id}`)">Редактировать права</button>
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
    background-color: #ffffff;
    font-size: 16px;
    border-collapse: collapse;
    width: 100%;
    max-width: 1660px;
    border-radius: 10px;
    overflow: hidden;

    tr {

        th, td {
            text-align: center;
            padding: 5px 15px;
            box-sizing: border-box;
        }

        th {
            color: #ffffff;
            font-weight: normal;
            background-color: #8f8f8f;
            border: solid 1px #8f8f8f;
            position: sticky;
            top: 0;
        }

        td {
            border: solid 1px #d8d8d8;
            cursor: pointer;
        }
    }

    tbody tr {
        transition: background-color 150ms ease-out;

        &:nth-child(2n+1) {
            background-color: rgb(255 255 255);
        }

        &:nth-child(2n) {
            background-color: rgb(245 245 245);
        }

        &:hover {
            background-color: rgb(216 216 216);
        }
    }
}
input {
    padding: 5px 10px;
    width: 1000px;
}
button {
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;

    &.green {
        color: black;
        background-color: rgb(217 255 228);

        &:hover {
            background: rgb(198, 226, 193);
        }
    }
    
    &.red {
        background-color: rgb(253 220 214);

        &:hover {
            background: rgb(252 191 179);
        }
    }

    &.add {
        margin: 15px 0 0 0;
        background: rgb(240 237 255);

        &:hover {
            background: rgb(208, 228, 239);
        }
    }
}
.buttons {
    display: flex;
}
</style>