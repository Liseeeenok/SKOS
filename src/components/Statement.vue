<script setup>
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';

const host = 'mypew.ru:7070'; //имя или ip хоста api
//---------------------------API-----------------------------
const level = localStorage.getItem('skos-token');
import { usePlanStore } from '../stores/PlanStore';
const planStore = usePlanStore();
const final = ref(planStore.plans[0]);
const plan = ref(planStore.plans[0].arr_plan);
console.log(planStore);
console.log(plan);
plan.value.forEach((division) => {
    division.arr_chapter.forEach((chapter) => {
        chapter.arr_profession.forEach((profession) => {
            getProfessionGroups(profession.name);
        });
    });
});
//---------------------------API-----------------------------
const arr_name_division = ref([]);
axios
    .get('https://'+host+'/divisions')
    .then(response => {
        arr_name_division.value = response.data;
    });
const arr_name_section = ref([]);
axios
    .get('https://'+host+'/sections')
    .then(response => {
        arr_name_section.value = response.data;
    });
const arr_name_direction = ref([]);
axios
    .get('https://'+host+'/directions')
    .then(response => {
        arr_name_direction.value = response.data;
    });
const arr_name_profession = ref([]);
axios
    .get('https://'+host+'/professions')
    .then(response => {
        arr_name_profession.value = response.data;
    });
const arr_name_profession_groups = ref([]);
function getProfessionGroups(id_profession) {
    console.log('getProfessionGroups');
    axios
        .get('https://'+host+'/profession_groups?id_profession='+id_profession)
        .then(response => {
            arr_name_profession_groups.value[id_profession] = response.data;
        });
}
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
</script>

<template>
    <div class="container">
        <div>
            <h1>Ведомость</h1>
        </div>
        <table>
            
        </table>
    </div>
</template>

<style scoped>
.container {
    padding: 100px 20px 0 20px;
    text-align: center;
}
</style>
