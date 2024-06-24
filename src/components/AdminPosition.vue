<script setup>
import { useStore } from '../stores/PlanStore';
import { getPosition } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getPosition();
//------------------------------------
function setStatus(index_position) {
    if (admin.positions[index_position].status != 2) admin.positions[index_position].status = 1;
}
function addPosition() {
    admin.positions.push({'id': null, 'name': '', 'status': 2});
}
function deletePosition(index_position) {
    let result = confirm(`Вы уверены что хотите удалить долность ${admin.positions[index_position].name}?`);
    if (result) {
        admin.positions[index_position].status != 2 ? admin.positions[index_position].status = 0 : admin.positions[index_position].status = 3;
        savePosition();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка должностей</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(position, index_position) in admin.positions" :key="index_position">
                <tr v-if="position.status != 0 && position.status != 3">
                    <td>{{ position.id}}</td>
                    <td><input type="text" v-model="position.name" @change="setStatus(index_position)"/></td>
                    <td>
                        <button class="red" @click="deletePosition(index_position)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="savePosition()">Сохранить</button>
    <button class="add" @click="addPosition()">Добавить должность</button>
</template>

<style scoped>
table {
    border-collapse: collapse;
}
th {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
td {
    padding: 5px 10px;
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
input {
    padding: 5px 10px;
    font-size: 20px;
    width: 400px;
}
select {
    padding: 5px 10px;
    font-size: 20px;
    width: 350px;
}
button {
    padding: 5px 10px;
    font-size: 20px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;
}
button:hover {
    transform: scale(1.05);
}
.green {
    color: black;
    background-color: #2a9630b0;
}
.red {
    background-color: #cc5e5e;
}
.add {
    margin: 15px 0 0 0;
}
.input {
    width: 340px;
}
</style>