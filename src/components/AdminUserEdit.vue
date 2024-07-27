<script setup>
import { useStore } from '../stores/PlanStore';
import { getUsers, getRole, saveUsers, getDivision, getDirection, getProfession, getCompany, getPosition } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
if (!admin.users) getUsers();
getRole();
getDivision();
getDirection();
getProfession();
getCompany();
getPosition();
//------------------------------------
function deleteUser(id) {
    let result = confirm(`Вы уверены что хотите удалить пользователя ${admin.users[id].name}?`);
    if (result) {
        admin.users[id].status = admin.users[id].status != 2 ? 0 : 3;
        saveUsers(id);
    }
}
function setStatus(id) {
    if (admin.users[id].status != 2) admin.users[id].status = 1;
}
//------------------------------------
</script>
<template>
    <h1>Настройка пользователя</h1>
    <table>
        <tbody v-if="admin.users[$route.params.id]">
            <tr>
                <td class="required">Логин</td>
                <td v-if="admin.users[$route.params.id].status == 2">
                    <input v-model="admin.users[$route.params.id].login" @change="setStatus($route.params.id)"/>
                </td>
                <td v-else>{{ admin.users[$route.params.id].login }}</td>
            </tr>
            <tr>
                <td>Фамилия</td>
                <td><input v-model="admin.users[$route.params.id].surname" @change="setStatus($route.params.id)"/></td>
            </tr>
            <tr>
                <td>Имя</td>
                <td><input v-model="admin.users[$route.params.id].name" @change="setStatus($route.params.id)"/></td>
            </tr>
            <tr>
                <td>Отчество</td>
                <td><input v-model="admin.users[$route.params.id].patronymic" @change="setStatus($route.params.id)"/></td>
            </tr>
            <tr>
                <td>Телефон</td>
                <td><input v-model="admin.users[$route.params.id].phone_number" @change="setStatus($route.params.id)"/></td>
            </tr>
            <tr>
                <td>Должность</td>
                <td>
                    <select v-model="admin.users[$route.params.id].id_position" @change="setStatus($route.params.id)">
                        <template v-for="(position, index_position) in admin.positions" :key="index_position">
                            <option :value="position.id">{{ position.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="required">Роль</td>
                <td>
                    <select v-model="admin.users[$route.params.id].role" @change="setStatus($route.params.id)">
                        <template v-for="(role, index_role) in admin.roles" :key="index_role">
                            <option :value="role.id">{{ role.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Подразделение</td>
                <td>
                    <select v-model="admin.users[$route.params.id].id_division" @change="setStatus($route.params.id)">
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
                    <select v-model="admin.users[$route.params.id].id_direction" @change="setStatus($route.params.id)">
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
                    <select v-model="admin.users[$route.params.id].id_profession" @change="setStatus($route.params.id)">
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
                    <select v-model="admin.users[$route.params.id].id_company" @change="setStatus($route.params.id)">
                        <option :value="null">Не привязан</option>
                        <template v-for="(company, index_company) in admin.companies" :key="index_company">
                            <option :value="company.id">{{ company.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Новый пароль</td>
                <td><input v-model="admin.users[$route.params.id].password" @change="setStatus($route.params.id)"/></td>
            </tr>
        </tbody>
    </table>
    <button class="add green" @click="saveUsers($route.params.id)">Сохранить</button>
    <button class="red" @click="deleteUser($route.params.id)">Удалить</button>
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

            &.required::after {
                content: ' *';
                color: red;
            }
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
    width: 350px;
}
select {
    padding: 5px 10px;
    width: 350px;
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
</style>