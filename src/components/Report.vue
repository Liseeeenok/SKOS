<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/PlanStore';
import { verify, preLoad, getDirection, getDivision, getProfession, getStatement, getExcel } from '../helpers/API.js';
import router from '../router/index.js';
//-------------AUTH-------------------
verify();
preLoad();
//------------------------------------
const admin = useStore();
</script>

<template>
    <div class="container">
        <div class="title">
            Отчет на <input type="number" style="width: 100px; font-size: 16px;" v-model="admin.academic_year" @change=""/> год
        </div>
        <table class="table"></table>
        <div class="div_button">
            <button class="add" @click="getExcel()">Скачать excel</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin-top: 30px;
    padding: 10px 0 0 0;
    background-color: white;
    border-radius: 10px;

    .title {
        text-align: center;
        color: #000;
        font-family: Arial;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .table {
        margin: 10px;
        width: calc(100% - 20px);
    }

    table.table {
        background-color: #ffffff;
        font-size: 16px;
        border-collapse: collapse;

        thead tr {
            th {
                position: sticky;
                border: 1px solid #000;
                background-color: white;
                top: 35px;
            }

            &:first-child th {
                position: sticky;
                border: 1px solid #000;
                background-color: white;
                top: 0px;
            }
        }

        tr {

            th, td {
                text-align: center;
                box-sizing: border-box;
                color: #000;
                font-family: Arial;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                border: 1px solid #000;
                top: 0;
            }
        }

        tbody tr {
            transition: background-color 150ms ease-out;

            &:nth-child(2n+1) {
                background-color: rgb(255 255 255);
            }

            &:nth-child(2n) {
                background-color: rgb(245 245 245);
            }

            &:hover {
                background-color: rgb(216 216 216);
            }
        }
    }
}
.input_filter {
    display: flex;
    width: 80%;
    margin: auto;
}
.filter_table td {
    border: 0;
}
.input_text {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    min-width: 65px;
}
.input_titles {
    width: 500px;
}
.div_button {
    margin: 10px auto;
    width: 60%;
    display: flex;
    justify-content: space-around;

    button {
        padding: 5px 10px;
        margin: 0 10px;
        border-radius: 5px;
        border: solid 1px #000;
        cursor: pointer;
        transition: 0.15s;

        &.add {
            margin: 15px 0;
            background: rgb(240 237 255);

            &:hover {
                background: rgb(208, 228, 239);
            }
        }
    }
}
</style>
