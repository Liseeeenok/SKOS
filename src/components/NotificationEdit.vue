<script setup>
import { useStore } from '../stores/PlanStore';
import { getCompany, getDirection, getDivision, getNotify, getProfession, getSection, saveNotification } from '../helpers/API.js';
import { ref } from 'vue';
//------------------------------------
const admin = useStore();
getDivision();
getDirection();
getSection();
getCompany();
getNotify();
getProfession();
const bc = ref({0: 'bc_red'});
//-----------------------------------
const arr_company = ref([]);
function addCompany() {
    arr_company.value.push({telegram:'',name:'',count:0});
};
function changeNotifyStatus(status) {
    admin.notify[admin.menuId].status = 1;
    admin.notify[admin.menuId].status_notification = status;
    admin.notify[admin.menuId].date_reading = status ? (new Date()).toISOString().substring(0, 10) : "";
    saveNotification();
}
</script>

<template>
    <div>
        <div v-if="admin.menuId && admin.notify[admin.menuId]">
            <table>
                <thead>
                    <tr>
                        <th>Дирекция</th>
                        <th>Подразд. УЦПК</th>
                        <th>Направление</th>
                        <th>Профессия</th>
                        <th>Количество человек</th>
                        <th>Статус</th>
                        <th>Начало обучения</th>
                        <th>Дата прочтения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="bc[admin.notify[admin.menuId].status_notification]">
                        <td>{{ admin.directions[admin.notify[admin.menuId].id_direction] ? admin.directions[admin.notify[admin.menuId].id_direction].name : '' }}</td>
                        <td>{{ admin.divisions[admin.notify[admin.menuId].id_division] ? admin.divisions[admin.notify[admin.menuId].id_division].name : '' }}</td>
                        <td>{{ admin.sections[admin.notify[admin.menuId].id_section] ? admin.sections[admin.notify[admin.menuId].id_section].name : '' }}</td>
                        <td>
                            {{ admin.professions[admin.notify[admin.menuId].id_profession] ? admin.professions[admin.notify[admin.menuId].id_profession].name : '' }}
                        </td>
                        <td>{{ admin.notify[admin.menuId].count_people }}</td>
                        <td>{{ admin.notify[admin.menuId].status_notification ? 'Прочитано' : 'Не прочитано' }}</td>
                        <td>{{ admin.notify[admin.menuId].date_start_training }}</td>
                        <td>{{ admin.notify[admin.menuId].date_reading }}</td>
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
                        <tr @click="addCompany()" class="addCompany">
                            <td colspan="3">
                                <button>Добавить предприятие</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="div_button">
                    <a class="button_save" @click="saveNotification()">Сохранить</a>
                    <a v-if="admin.notify[admin.menuId].status_notification" class="button_status_0" @click="changeNotifyStatus(0)">
                        Отметить не прочитанным
                    </a>
                    <a v-else class="button_status_1" @click="changeNotifyStatus(1)">Отметить прочитанным</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
table {
    background-color: #ffffff;
    font-size: 16px;
    border-collapse: collapse;
    width: 100%;
    max-width: 1660px;
    tr {
        th, td {
            text-align: center;
            padding: 15px;
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
        }
    }
    tbody tr {
        transition: background-color 150ms ease-out;

        &:nth-child(2n+1) {
            background-color: rgb(255 255 255);

            &.bc_red {
                background-color: rgb(255 202 202);

                td {
                    border: solid 1px rgb(205 152 152);
                }
            }
        }

        &:nth-child(2n) {
            background-color: rgb(245 245 245);

            &.bc_red {
                background-color: rgb(245 192 192);

                td {
                    border: solid 1px rgb(205 152 152);
                }
            }
        }
    }
}
.answer_table {
    margin: 30px auto;
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
    padding: 16px 42px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: rgb(151 127 255);
    text-decoration: none;
    user-select: none;
    color: white;
    letter-spacing: .08em;
    position: relative;
    transition: background-color .6s ease;

    &:hover {
        background: rgb(150 98 220);
    }
}
.button_status_0 {
    font-size: 20px;
    padding: 16px 42px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: rgb(252 110 81);
    text-decoration: none;
    user-select: none;
    color: white;
    letter-spacing: .08em;
    position: relative;
    transition: background-color .6s ease;

    &:hover {
        background: rgb(251 81 46);
    }
}
.button_status_1 {
    font-size: 20px;
    padding: 16px 42px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: rgb(18 154 57);
    text-decoration: none;
    user-select: none;
    color: white;
    letter-spacing: .08em;
    position: relative;
    transition: background-color .6s ease;

    &:hover {
        background: rgb(17 125 22);
    }
}
.addCompany {
    cursor: pointer;

    button {
        transition: 0.2s;
        color: #000;
        font-family: Arial;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        background: none;
        border: 0px;
        cursor: pointer;
    }
}
.addCompany:hover {
    button {
        transform: scale(1.1);
    }
}
</style>
