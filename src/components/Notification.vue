<script setup>
import { useStore } from '../stores/PlanStore';
import { verify, getDirection, getDivision, getNotify, getSection } from '../helpers/API.js';
import { ref } from 'vue';
import { changeMenu } from '../helpers/navigation.js';
//-------------AUTH-------------------
verify();
//------------------------------------
const admin = useStore();
getNotify();
getDirection();
getDivision();
getSection();
const page = ref(1);
const bc = ref({0: 'bc_red'});
//-----------------------------------
</script>

<template>
    <div v-if="admin.isAuth">   
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
                    <tr v-for="(notification, key, index_notification) in admin.notify" :key="index_notification" :class="bc[notification.status_notification]" @click="changeMenu('notificationEdit', notification.id)">
                        <td>{{ index_notification + 1 + 12 * (page - 1)}}</td>
                        <td>{{ admin.directions[notification.id_direction] ? admin.directions[notification.id_direction].name : '' }}</td>
                        <td>{{ admin.divisions[notification.id_division] ? admin.divisions[notification.id_division].name : '' }}</td>
                        <td>{{ admin.sections[notification.id_section] ? admin.sections[notification.id_section].name : '' }}</td>
                        <td>{{ notification.count_people }}</td>
                        <td>{{ notification.status_notification ? 'Прочитано' : 'Не прочитано' }}</td>
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
            cursor: pointer;
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
        &:hover {
            background-color: #d8d8d8;

            &.bc_red {
                background-color: rgb(205 152 152);
            }
        }
    }
}
</style>
