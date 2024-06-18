<script setup>
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';
//---------------------------API-----------------------------
const host = 'mypew.ru:7070'; //имя или ip хоста api
const arr_name_division = ref([]);
const arr_name_direction = ref([]);
const arr_name_profession = ref([]);
let counter = 0;
axios
    .get('https://'+host+'/divisions')
    .then(response => {
        arr_name_division.value = response.data;
        counter++;
        if (counter == 3) {
            formNotification();
            getNotification();
        }
    });
axios
    .get('https://'+host+'/directions')
    .then(response => {
        arr_name_direction.value = response.data;
        counter++;
        if (counter == 3) {
            formNotification();
            getNotification();
        }
    });
axios
    .get('https://'+host+'/professions')
    .then(response => {
        arr_name_profession.value = response.data;
        counter++;
        if (counter == 3) {
            formNotification();
            getNotification();
        }
    });
    
    
function getNameById(arr, id) {
    let name = '';
    //while (arr.length == 0)
    arr.forEach(item => {
        if (item.id == id) {
            name = item.name;
            return;
        }
    });
    return name;
}
const arr_notifications = ref([]);
const page = ref(1);
function getNotification() {
    if (level == 4) {
        let dir = localStorage.getItem('skos-dir');
        arr_notifications.value = arr_notifications_all.filter((el) => {
            return el.direction == dir;
        })
        return arr_notifications.value;
    }
    arr_notifications.value = arr_notifications_all;
}
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
                        <th>Шифр группы</th>
                        <th>Статус</th>
                        <th>Начало обучения</th>
                        <th>Дата прочтения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notification, index) in arr_notifications.slice(0 + 12 * (page - 1), 12 + 12 * (page - 1))" :key="index" @click="openNotification(notification)" class="tr_notification">
                        <td>{{ index + 1 + 12 * (page - 1)}}</td>
                        <td>{{ notification.direction }}</td>
                        <td>{{ notification.division }}</td>
                        <td>{{ notification.code }}</td>
                        <td :class="notification.status == 'Не прочитано' ? 'red' : ''">{{ notification.status }}</td>
                        <td>{{ notification.start_o }}</td>
                        <td>{{ notification.date_read }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="nav">
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
