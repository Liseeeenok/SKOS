<script setup>
import { ref } from 'vue';
import router from '../router';
const level = localStorage.getItem('skos-token');
const arr_notifications_all = [{"direction":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},
{"direction":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},
{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"direction":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"direction":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"direction":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"}]
const arr_notifications = ref([]);
const page = ref(1);
function getNotification() {
    if (level == 'dir') {
        let dir = localStorage.getItem('skos-dir');
        arr_notifications.value = arr_notifications_all.filter((el) => {
            return el.direction == dir;
        })
        return arr_notifications.value;
    }
    arr_notifications.value = arr_notifications_all;
    return arr_notifications.value;
}
function openNotification(notification) {
    router.push({name: 'editNotification'});
}
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
                        <th>Дата прочтения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notification, index) in getNotification().slice(0 + 12 * (page - 1), 12 + 12 * (page - 1))" :key="index" @click="openNotification(notification)">
                        <td>{{ index + 1 + 12 * (page - 1)}}</td>
                        <td>{{ notification.direction }}</td>
                        <td>{{ notification.division }}</td>
                        <td>{{ notification.code }}</td>
                        <td :class="notification.status == 'Не прочитано' ? 'red' : ''">{{ notification.status }}</td>
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
</style>
