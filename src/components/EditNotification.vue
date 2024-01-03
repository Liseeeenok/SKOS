<script setup>
import { ref } from 'vue';
const level = localStorage.getItem('skos-token');
const notification = {"direction":"ДТ", "division":"Иркутское", "code":"РПБ.1-2023-1.1", "status":"Прочитано", "date_dispatch":"22.04.2023","date_read":"25.04.2023","number_order":"252345"};
const host = 'mypew.ru:7070'; //имя или ip хоста api
const arr_company_name = ref([{id:1, name:'Предприятие 1'},{id:2, name:'Предприятие 2'},{id:3, name:'Предприятие 3'}]);
/*
axios
    .get('https://'+host+'/divisions')
    .then(response => {
        arr_name_division.value = response.data;
    });
    */
const arr_company = ref([]);
function addCompany() {
    arr_company.value.push({telegram:'',name:'',count:0});
};
</script>

<template>
    <div>
        <div class="title">Уведомление</div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Дирекция</th>
                        <th>Подразд. УЦПК</th>
                        <th>Шифр группы</th>
                        <th>Статус</th>
                        <th>Дата прочтения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ notification.direction }}</td>
                        <td>{{ notification.division }}</td>
                        <td>{{ notification.code }}</td>
                        <td :class="notification.status == 'Не прочитано' ? 'red' : ''">{{ notification.status }}</td>
                        <td>{{ notification.date_read }}</td>
                    </tr>
                </tbody>
            </table>
            <template v-if="level == 'dir'">
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
                            <select v-model="company.name">
                                <option v-for="company_name in arr_company_name" :key="company_name.id" :value="company_name.id">{{ company_name.name }}</option>
                            </select>
                        </td>
                        <td>
                            <input type="number" v-model="company.count">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <text @click="addCompany()" style="cursor: pointer;">Добавить предприятие</text>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="div_button">
                <button class="button_save">Сохранить</button>
                <button class="button_notice">Отметить прочитанным</button>
            </div>
            </template>
            <template v-if="level == 'ved'">
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
            </template>
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
    margin: auto;
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
</style>
