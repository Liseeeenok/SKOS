<script setup>
import { useStore } from '../stores/PlanStore';
import { getNotificationPlan, getRole, saveNotificationPlan } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getNotificationPlan();
getRole();
//------------------------------------
function setStatus(id) {
    if (admin.notificationPlan[id].status != 2) admin.notificationPlan[id].status = 1;
}
function addNotificationPlan() {
    admin.notificationPlan.push({'id': null, 'days': 0, 'count_notifications': 0, 'id_position': null, 'type': 1, 'status': 2});
}
function deleteNotificationPlan(index_notification_plan) {
    let result = confirm(`Вы уверены что хотите удалить уведомление ID = ${admin.notificationPlan[index_notification_plan].id}?`);
    if (result) {
        admin.notificationPlan[index_notification_plan].status = admin.notificationPlan[index_notification_plan].status != 2 ? 0 : 3;
        saveNotificationPlan();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка предприятий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>За какое количество дней до начала обучения формировать уведомление</th>
                <th>Количество уведомлений которые будет отправляться</th>
                <th>Роль, которой будут приходить уведомления</th>
                <th>Тип уведомления</th>
                <th style="width: 80px;">Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(notification_plan, index_notification_plan) in admin.notificationPlan" :key="index_notification_plan">
                <tr v-if="notification_plan.status != 0 && notification_plan.status != 3">
                    <td>{{ notification_plan.id }}</td>
                    <td>
                        <input type="number" v-model="notification_plan.days" @change="setStatus(index_notification_plan)"/>
                    </td>
                    <td>
                        <input type="number" v-model="notification_plan.count_notifications" @change="setStatus(index_notification_plan)"/>
                    </td>
                    <td>
                        <select v-model="notification_plan.id_role" @change="setStatus(index_notification_plan)">
                            <template v-for="(role, index_role) in admin.roles" :key="index_role">
                                <option :value="role.id">{{ role.name }}</option>
                            </template>
                        </select>
                    </td>
                    <td>
                        <select v-model="notification_plan.type" @change="setStatus(index_notification_plan)">
                            <option value="1">Дирекции и предприятия</option>
                            <option value="2">Все дирекции</option>
                        </select>
                    </td>
                    <td>
                        <button class="red" @click="deleteNotificationPlan(index_notification_plan)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveNotificationPlan()">Сохранить</button>
    <button class="add" @click="addNotificationPlan()">Добавить уведомление</button>
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
    width: 200px;
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