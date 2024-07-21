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
const bc = ref({0: 'bc_red'});
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
                    <tr v-for="(notification, index_notification) in admin.notify" :key="index_notification" :class="bc[notification.status_notification]" @click="changeMenuStatus('notifyEdit', notification.id)">
                        <td>{{ index_notification + 1 + 12 * (page - 1)}}</td>
                        <td>{{ getNameById(admin.directions, notification.id_direction) }}</td>
                        <td>{{ getNameById(admin.divisions, notification.id_division) }}</td>
                        <td>{{ getNameById(admin.sections, notification.id_section) }}</td>
                        <td>{{  notification.count_people }}</td>
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
    margin: 10px auto;
    padding-top: 20px;
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
            border-bottom: solid 2px #8f8f8f;
            position: sticky;
            top: 0;
        }
        td {
            border: solid 1px #d8d8d8;
            border-left: 0;
            border-right: 1px solid #d8d8d8;
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
                    border-right: 1px solid rgb(205 152 152);
                }
            }
        }

        &:nth-child(2n) {
            background-color: rgb(245 245 245);

            &.bc_red {
                background-color: rgb(245 192 192);

                td {
                    border: solid 1px rgb(205 152 152);
                    border-right: 1px solid rgb(205 152 152);
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
