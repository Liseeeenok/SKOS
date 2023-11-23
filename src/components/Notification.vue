<script setup>
import { ref } from 'vue';
const arr_notifications = [{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},
{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},
{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДТ", "division":"Суховское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"30.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДПО", "division":"Северобайкальское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"29.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"ДПО", "division":"Улан-Удэнское", "code":"РПБ.1-2023-1.1", "status":"Не прочитано", "date_dispatch":"23.04.2023","date_read":"-","number_order":"252345"},{"directorate":"ДРП", "division":"Иркутское", "code":"МПД.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"},{"directorate":"Т", "division":"Суховское", "code":"ПМТЭ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"}]
const page = ref(1);
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
                        <th>Дата отправки</th>
                        <th>Дата прочтения</th>
                        <th>Номер приказа</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notification, index) in arr_notifications.slice(0 + 12 * (page - 1), 12 + 12 * (page - 1))">
                        <td>{{ index + 1 + 12 * (page - 1)}}</td>
                        <td>{{ notification.directorate }}</td>
                        <td>{{ notification.division }}</td>
                        <td>{{ notification.code }}</td>
                        <td :class="notification.status == 'Не прочитано' ? 'red' : ''">{{ notification.status }}</td>
                        <td>{{ notification.date_dispatch }}</td>
                        <td>{{ notification.date_read }}</td>
                        <td>{{ notification.number_order }}</td>
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
    margin: 10px 0 0 140px;
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
