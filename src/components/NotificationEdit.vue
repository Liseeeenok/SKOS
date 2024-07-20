<script setup>
import { useStore } from '../stores/PlanStore';
import { getCompany, saveNotification } from '../helpers/API.js';
import { ref } from 'vue';
//------------------------------------
const admin = useStore();
getCompany();
const notifyIndex = ref(0);
//-----------------------------------
const arr_company = ref([]);
function addCompany() {
    arr_company.value.push({telegram:'',name:'',count:0});
};
if (admin.notify) {
    getNotify(admin.notifyId);
} else {
    changeMenuStatus('main');
}
function getNotify(id) {
    notifyIndex.value = admin.notify.findIndex((el) => el.id == id);
}
function changeMenuStatus(index) {
    admin.menuStatus = index;
    localStorage.setItem('skos-menu-status', index);
}
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
function changeNotifyStatus(status) {
    admin.notify[notifyIndex.value].status = 1;
    admin.notify[notifyIndex.value].status_notification = status;
    admin.notify[notifyIndex.value].date_reading = status ? (new Date()).toISOString().substring(0, 10) : "";
}
</script>

<template>
    <div>
        <div class="title">Уведомление</div>
        <div v-if="admin.notifyId">
            <table>
                <thead>
                    <tr>
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
                    <tr>
                        <td>{{ getNameById(admin.directions, admin.notify[notifyIndex].id_direction) }}</td>
                        <td>{{ getNameById(admin.divisions, admin.notify[notifyIndex].id_division) }}</td>
                        <td>{{ getNameById(admin.sections, admin.notify[notifyIndex].id_section) }}</td>
                        <td>{{  admin.notify[notifyIndex].count_people }}</td>
                        <td :class="admin.notify[notifyIndex].status_notification ? '' : 'red' ">{{ admin.notify[notifyIndex].status_notification ? 'Прочитано' : 'Не прочитано' }}</td>
                        <td>{{ admin.notify[notifyIndex].date_start_training }}</td>
                        <td>{{ admin.notify[notifyIndex].date_reading }}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <table class="answer_table">
                    <thead>
                        <tr>
                            <th>
                                Номер телеграммы
                            </th>
                            <th>
                                Предприятие
                            </th>
                            <th>
                                Количество человек
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index_company) in arr_company" :key="index_company">
                            <td>
                                <input type="text" v-model="company.telegram">
                            </td>
                            <td>
                                <select v-model="company.id">
                                    <option v-for="company_name in admin.companies" :key="company_name.id" :value="company_name.id">{{ company_name.name }}</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" v-model="company.count">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <button @click="addCompany()" class="addCompany">Добавить предприятие</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="div_button">
                    <button class="button_save" @click="changeMenuStatus('main')">Назад</button>
                    <button class="button_save" @click="saveNotification()">Сохранить</button>
                    <button v-if="admin.notify[notifyIndex].status_notification" class="button_notice" @click="changeNotifyStatus(0)">Отметить не прочитанным</button>
                    <button v-else class="button_notice" @click="changeNotifyStatus(1)">Отметить прочитанным</button>
                </div>
            </div>
            <div style="display: none;">
                <table class="answer_table">
                    <thead>
                        <tr>
                            <th>
                                Номер телеграммы
                            </th>
                            <th>
                                Предприятие
                            </th>
                            <th>
                                Количество человек
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index_company) in arr_company" :key="index_company">
                            <td>
                                {{ company.telegram }}
                            </td>
                            <td>
                                {{ company.name }}
                            </td>
                            <td>
                                {{ company.count }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="div_button">
                    <button class="button_save" @click="changeMenuStatus('main')">Назад</button>
                </div>
            </div>
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
.answer_table {
    max-width: 800px;
}
select, input {
    font-size: 20px;
}
.div_button {
    margin: 50px auto;
    width: 60%;
    display: flex;
    justify-content: space-around;
}
.button_save {
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
}
.button_notice {
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
}
.addCompany {
    cursor: pointer;
    transition: 0.2s;
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: #e9ebf0;
    border: 0px;
}
.addCompany:hover {
    transform: scale(1.1);
}
</style>
