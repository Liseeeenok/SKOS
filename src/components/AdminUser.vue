<script setup>
import router from '../router/index.js';
import { useStore } from '../stores/PlanStore';
import { getUsers } from '../helpers/API.js';
//------------------------------------
const store = useStore();
getUsers();
//------------------------------------
function addUser() {
    store.users.push({ "login": "", "surname": "", "name": "", "patronymic": "", "phone_number": "", "role": null, "id_direction": null, "id_division": null, "id_profession": null, "id_company": null, "status": 2 });
    router.push(`/admin/users/edit/${store.users.length - 1}`);
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
            <template v-for="(user, index_user) in store.users" :key="index_user">
                <tr v-if="user.status != 0 && user.status != 3" @click="router.push(`/admin/users/edit/${index_user}`)">
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
button {
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;

    &.add {
        margin: 15px 0 0 0;
        background: rgb(240 237 255);

        &:hover {
            background: rgb(208, 228, 239);
        }
    }
}
</style>