<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/PlanStore'; 
import { verify, preLoad, getExcel, getReport, getPDF } from '../helpers/API.js';
//-------------AUTH-------------------
verify();
preLoad();
//------------------------------------
const admin = useStore();

let date = new Date();
admin.from_date = date.getFullYear() + '-01-01';
admin.to_date = date.getFullYear() + '-12-31';

getReport();
function toggleDirection(name_section, name_division) 
{
    admin.report.data[name_section][name_division]['showDirection'] = !admin.report.data[name_section][name_division]['showDirection'] ?? true;
}
</script>

<template>
    <div class="container">
        <div class="title">
            Отчет с <input type="date" style="width: 150px; font-size: 16px;" v-model="admin.from_date" @change="getReport(from_date, to_date)"/> по 
            <input type="date" style="width: 150px; font-size: 16px;" v-model="admin.to_date" @change="getReport(from_date, to_date)"/>
        </div>
        <div>
            <table class="table" v-if="admin.report">
                <thead>
                    <tr>
                        <th>
                            Наименование подразделений
                        </th>
                        <th>
                            План
                        </th>
                        <th>
                            Факт
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(divisions, name_section) in admin.report.data" :key="name_section" v-if="admin.report.data">
                    <tr>
                        <td colspan="18">
                            {{ name_section }}
                        </td>
                    </tr>
                    <template v-for="(directions, name_division) in divisions" :key="name_division">
                        <tr @click="toggleDirection(name_section, name_division)" :class="directions[-1][0] > directions[-1][1] ? 'bc_red' : ''">
                            <td>
                                {{ name_division }}
                            </td>
                            <td>
                                {{ directions[-1][0] }}
                            </td>
                            <td>
                                {{ directions[-1][1] }}
                            </td>
                        </tr>
                        <template v-if="directions['showDirection']">
                            <template v-for="(direction, name_direction) in directions" :key="name_direction">
                                <tr v-if="name_direction !== '-1' && name_direction !== 'showDirection'" 
                                :class="[(directions['showDirection'] ? 'open-direction' : 'close-direction'), (direction[0] > direction[1] ? 'bc_red' : '')]">
                                    <td>
                                        {{ name_direction }}
                                    </td>
                                    <td>
                                        {{ direction[0] }}
                                    </td>
                                    <td>
                                        {{ direction[1] }}
                                    </td>
                                </tr>
                            </template> 
                        </template>
                    </template> 
                </tbody>
            </table>
        </div>
        <div class="div_button">
            <button class="add" @click="getExcel()">Скачать excel</button>
            <button class="add" @click="getPDF()">Скачать pdf</button>
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

.open-direction {
    animation-name: openDirection;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);

    &:nth-child(2n+1) {
        background-color: rgb(230 230 230) !important;

        &.bc_red {
            background-color: rgb(255 202 202) !important;

            td {
                border: solid 1px rgb(205 152 152) !important;
            }
        }
    }

    &:nth-child(2n) {
        background-color: rgb(220 220 220) !important;

        &.bc_red {
            background-color: rgb(245 192 192) !important;

            td {
                border: solid 1px rgb(205 152 152) !important;
            }
        }
    }

    &:hover {
        background-color: rgb(191 191 191) !important;

        &.bc_red {
            background-color: rgb(205 152 152) !important;
        }
    }
}

@keyframes openDirection {
    0% {
        height: 0;
        opacity: 0;
        transform: scaleY(0);
    }

    100% {
        height: auto;
        opacity: 1;
        transform: scaleY(1);
    }
}

.close-direction {
    animation-name: closeDirection;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

@keyframes closeDirection {
    0% {
        height: auto;
        opacity: 1;
        transform: scaleY(1);
    }

    100% {
        height: 0;
        opacity: 0;
        transform: scaleY(0);
    }
}

</style>