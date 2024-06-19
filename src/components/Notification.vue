<script setup>
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';
import { useStore } from '../stores/PlanStore';
import { getNotify } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getNotify();
//---------------------------API-----------------------------
const host = 'mypew.ru:7070'; //имя или ip хоста api
const arr_name_division = ref([]);
const arr_name_direction = ref([]);
const arr_name_profession = ref([]);
const level = ref(1);
let counter = 0;
//---------------------------API-----------------------------
</script>

<template>
    <div>
        <div class="title">Уведомления</div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Дирекция</th>
                        <th>Подразд. УЦПК</th>
                        <th>Статус</th>
                        <th>Начало обучения</th>
                        <th>Дата прочтения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notification, index) in admin.notify" :key="index" @click="openNotification(notification)" class="tr_notification">
                        <td>{{ index + 1 + 12 * (page - 1)}}</td>
                        <td>{{ notification.direction }}</td>
                        <td>{{ notification.division }}</td>
                        <td :class="notification.status == 'Не прочитано' ? 'red' : ''">{{ notification.status }}</td>
                        <td>{{ notification.start_o }}</td>
                        <td>{{ notification.date_read }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="nav"  v-if="false">
            <button class="decrement but" v-if="page > 1" @click="page -= 1">>></button>
            <button class="but" @click="page += 1" v-if="arr_notifications.length > page*12">>></button>
        </div>
    </div>
</template>

<style scoped>
.title {
    text-align: center;
    margin-top: 41px;
    color: #000;
    font-family: Arial;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
table {
    width: 80%;
    margin: auto;
    text-align: center;
}
th {
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
td {
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px;
}
.red {
    color: #F00;
}
.nav {
    margin: 10px 0 0 140px;
    width: 80%;
    display: flex;
    justify-content: end;
}
.but {
    width: 54px;
    height: 52px;
    border: 0;
    border-radius: 10px;
    background-color: rgba(103, 96, 106, 0.50);
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0 10px;
    cursor: pointer;
}
.decrement {
    transform: rotate(179.195deg);
}
.tr_notification {
    cursor: pointer;
}
</style>
