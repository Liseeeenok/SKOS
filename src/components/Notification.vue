<script setup>
import { useStore } from '../stores/PlanStore';
import { getDirection, getDivision, getNotify, getSection } from '../helpers/API.js';
import { ref } from 'vue';
//------------------------------------
const admin = useStore();
getNotify();
getDirection();
getDivision();
getSection();
const page = ref(1);
//-----------------------------------
function getNameById(arr, id) {
    let name = '';
    if (arr != undefined)
        arr.forEach(item => {
            if (item.id == id) {
                name = item.name;
                return;
            }
        });
    return name;
}
function changeMenuStatus(index, notifyId) {
    admin.menuStatus = index;
    admin.notifyId = notifyId;
    localStorage.setItem('skos-menu-status', index);
    localStorage.setItem('skos-notify-id', notifyId);
}
//-----------------------------------
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
                        <th>Направление</th>
                        <th>Количество человек</th>
                        <th>Статус</th>
                        <th>Начало обучения</th>
                        <th>Дата прочтения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notification, index_notification) in admin.notify" :key="index_notification" class="tr_notification" @click="changeMenuStatus('notifyEdit', notification.id)">
                        <td>{{ index_notification + 1 + 12 * (page - 1)}}</td>
                        <td>{{ getNameById(admin.directions, notification.id_direction) }}</td>
                        <td>{{ getNameById(admin.divisions, notification.id_division) }}</td>
                        <td>{{ getNameById(admin.sections, notification.id_section) }}</td>
                        <td>{{  notification.count_people }}</td>
                        <td :class="notification.status_notification ? '' : 'red'">{{ notification.status_notification ? 'Прочитано' : 'Не прочитано' }}</td>
                        <td>{{ notification.date_start_training }}</td>
                        <td>{{ notification.date_reading }}</td>
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
