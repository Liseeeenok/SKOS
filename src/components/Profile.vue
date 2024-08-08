<script setup>
import { useStore } from '../stores/PlanStore';
import { getPosition, getUser } from '../helpers/API.js';
import { verify, preLoad } from '../helpers/API.js';
//-------------AUTH-------------------
verify();
preLoad();
//------------------------------------
const admin = useStore();
getUser();
getPosition();
//------------------------------------
</script>

<template>
    <div class="wrapper_profile">
        <div class="card">
            <img class="card-image" src="../assets/0c17a445397e137ca3dcc70f7cbd396b.jpg" width="300" height="460"/>
            <div class="inform">
                <div class="profile">
                    <h3>Профиль</h3>
                </div>
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
                        <td class="item_table">{{ admin.positions[admin.user.id_position].name }}</td>
                    </tr>
                    <tr>
                        <td class="title_table">Роль:</td>
                        <td class="item_table">{{ admin.user.role_name }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  </template>

<style lang="scss" scoped>
.wrapper_profile {
    height: 100%;
    display: flex;
	justify-content: space-around;
    align-items: center;

    .card {
        width: 600px;
        max-width: 100%;
        min-height: 320px;
        border-radius: 8px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background-color:white;
        position: relative;	
        display: -webkit-box; 
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex; 
        display: flex;

        .card-image{
            background-color: rgba(0,0,0,0.2);		
            background-position: center;
            background-size: cover;	
            width: 300px;
            height: 460px;
            border-radius:8px;
        }

        .inform {
            width: 100%;

            table {
                margin: 10px;
                width: calc(100% - 20px);

                .item_table {
                    padding-left: 10px;
                }
            }

            .profile {
                width: 100%;
                text-align: center;
                font-size: 32px;
            }
        }
    }
}
</style>