<script setup>
import { useStore } from '../stores/PlanStore';
import { verify, getCompany, getDirection, getDivision, getNotify, getProfession, getSection, saveNotification } from '../helpers/API.js';
import { ref } from 'vue';
import router from '../router/index.js'
//-------------AUTH-------------------
verify();
//------------------------------------
const admin = useStore();
getDivision();
getDirection();
getSection();
getCompany();
getNotify();
getProfession();
const bc = ref({0: 'bc_red'});
const notifyId = ref(-1);
router.beforeEach((to,from,next) => {notifyId.value = to.params.id ?? -1; next();});
//-----------------------------------
function addCompany(id) {
    admin.notify[id].companies.push({'id': null, 'telegram': '', 'id_company': '', 'count_people': 0, 'status': 2, 'writ': null});
    admin.notify[id].status = 1;
};
function changeNotifyStatus(id, status) {
    admin.notify[id].status = 1;
    admin.notify[id].status_notification = status;
    admin.notify[id].date_reading = status ? (new Date()).toISOString().substring(0, 10) : "";
    saveNotification();
}
</script>

<template>
    <div>
        <div v-if="$route.params.id && admin.notify[$route.params.id]">
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
                    <tr :class="bc[admin.notify[$route.params.id].status_notification]">
                        <td>{{ admin.directions[admin.notify[$route.params.id].id_direction] && admin.directions[admin.notify[$route.params.id].id_direction].name}}</td>
                        <td>{{ admin.divisions[admin.notify[$route.params.id].id_division] ? admin.divisions[admin.notify[$route.params.id].id_division].name : '' }}</td>
                        <td>{{ admin.sections[admin.notify[$route.params.id].id_section] ? admin.sections[admin.notify[$route.params.id].id_section].name : '' }}</td>
                        <td>
                            {{ admin.professions[admin.notify[$route.params.id].id_profession] ? admin.professions[admin.notify[$route.params.id].id_profession].name : '' }}
                        </td>
                        <td>{{ admin.notify[$route.params.id].count_people }}</td>
                        <td>{{ admin.notify[$route.params.id].status_notification ? 'Прочитано' : 'Не прочитано' }}</td>
                        <td>{{ admin.notify[$route.params.id].date_start_training }}</td>
                        <td>{{ admin.notify[$route.params.id].date_reading }}</td>
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
                        <tr v-for="(company, index_company) in admin.notify[$route.params.id].companies" :key="index_company">
                            <td>
                                <input type="text" v-model="company.telegram">
                            </td>
                            <td>
                                <select v-model="company.id_company">
                                    <option v-for="company_name in admin.companies" :key="company_name.id" :value="company_name.id">{{ company_name.name }}</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" v-model="company.count_people">
                            </td>
                        </tr>
                        <tr @click="addCompany($route.params.id)" class="addCompany">
                            <td colspan="3">
                                <button>Добавить предприятие</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="div_button">
                    <a class="button_save" @click="saveNotification()">Сохранить</a>
                    <a v-if="admin.notify[$route.params.id].status_notification" class="button_status_0" @click="changeNotifyStatus($route.params.id, 0)">
                        Отметить не прочитанным
                    </a>
                    <a v-else class="button_status_1" @click="changeNotifyStatus($route.params.id, 1)">Отметить прочитанным</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    background: rgb(240 237 255);
    text-decoration: none;
    user-select: none;
    color: black;
    letter-spacing: .08em;
    position: relative;
    transition: background-color .6s ease;

    &:hover {
        background: rgb(208, 228, 239);
    }
}
.button_status_0 {
    font-size: 20px;
    padding: 16px 42px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: rgb(253 220 214);
    text-decoration: none;
    user-select: none;
    color: black;
    letter-spacing: .08em;
    position: relative;
    transition: background-color .6s ease;

    &:hover {
        background: rgb(252 191 179);
    }
}
.button_status_1 {
    font-size: 20px;
    padding: 16px 42px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: rgb(217 255 228);
    text-decoration: none;
    user-select: none;
    color: black;
    letter-spacing: .08em;
    position: relative;
    transition: background-color .6s ease;

    &:hover {
        background: rgb(198, 226, 193);
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
