<script setup>
import { useStore } from '../stores/PlanStore';
import { getUser } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getUser();
//------------------------------------
</script>

<template>
    <div class="wrapper_profile">
        <div class="profile">
            <div class="inform">
                <table>
                    <tr>
                        <td class="title_table">Фамилия:</td>
                        <td class="item_table">{{ admin.user.surname }}</td>
                    </tr>
                    <tr>
                        <td class="title_table">Имя:</td>
                        <td class="item_table">{{ admin.user.name }}</td>
                    </tr>
                    <tr>
                        <td class="title_table">Отчество:</td>
                        <td class="item_table">{{ admin.user.patronymic }}</td>
                    </tr>
                    <tr>
                        <td class="title_table">Номер телефона:</td>
                        <td class="item_table">{{ admin.user.phone_number }}</td>
                    </tr>
                    <tr>
                        <td class="title_table">Должность:</td>
                        <td class="item_table">{{ admin.user.role_name }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  </template>

<style>
.wrapper_profile {
    margin: 10vw 0 0 0;
}
.profile {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: auto;
}
.photo {
    width: 270px;
    height: 267px;
    border-radius: 20px;
    background: rgba(220, 218, 221, 0.50);
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 37px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.inform {
    background-color: rgba(220, 218, 221, 0.50);
    padding: 20px;
    border-radius: 20px;
}
.title_table {
    color: #000;
    font-family: Arial;
    font-size: 37px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-right: 20px;
}
.item_table {
    color: #000;
    font-family: Arial;
    font-size: 37px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>