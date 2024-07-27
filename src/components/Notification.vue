<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/PlanStore';
import { verify, getDirection, getDivision, getNotify, getSection } from '../helpers/API.js';
import router from '../router/index.js';
//-------------AUTH-------------------
verify();
//------------------------------------
const store = useStore();
getNotify();
getDirection();
getDivision();
getSection();
const bc = ref({0: 'bc_red'});
//-------while not use---------------
const page = ref(1);
//-----------------------------------
</script>

<template>
    <div v-if="store.isAuth">   
        <div class="main_table" :class="$route.params.id && 'hide'">
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
                    <template v-for="(notification, key, index_notification) in store.notify" :key="index_notification">
                        <tr 
                        :class="bc[notification.status_notification]" 
                        @click="router.push(`/notification/edit/${key}`)"
                        >
                            <td>{{ index_notification + 1 }}</td>
                            <td>{{ store.directions[notification.id_direction] && store.directions[notification.id_direction].name }}</td>
                            <td>{{ store.divisions[notification.id_division] && store.divisions[notification.id_division].name }}</td>
                            <td>{{ store.sections[notification.id_section] && store.sections[notification.id_section].name }}</td>
                            <td>{{ notification.count_people }}</td>
                            <td>{{ notification.status_notification ? 'Прочитано' : 'Не прочитано' }}</td>
                            <td>{{ notification.date_start_training }}</td>
                            <td>{{ notification.date_reading }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        
        <div class="nav" v-if="false">
            <button class="decrement but" v-if="page > 1" @click="page -= 1">>></button>
            <button class="but" @click="page += 1" v-if="arr_notifications.length > page*12">>></button>
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
            background-color: rgb(216 216 216);

            &.bc_red {
                background-color: rgb(205 152 152);
            }
        }
    }
}
</style>
