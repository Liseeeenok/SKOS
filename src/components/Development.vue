<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const plan = ref([]);
const final = ref({year: '', arr_plan: plan, arr_plan_result: {}, results: false})
//Обязательное обучение в соответствии с законодательством РФ
//console.log(JSON.stringify(plan.value));
const host = 'mypew.ru:7070'; //имя или ip хоста api
//---------------------------API-----------------------------
const level = localStorage.getItem('skos-token');
import { usePlanStore } from '../stores/PlanStore';
const planStore = usePlanStore();
final.value = planStore.plans[0];
plan.value = planStore.plans[0].arr_plan;
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
function openEditor() {
    router.push({name: 'developmentEdit'});
}
</script>

<template>
    <div class="container">
        <div>
            <div class="title">План-график</div>
            <div class="title">профессианального развития рабочих и служащих в Восточно-Сибирском учебном центре профессиональных квалификаций</div>
            <div class="title">Восточно-Сибирской железной дороги - филиала ОАО "РЖД"</div>
            <div class="title">на {{ final.year }} год</div>
        </div>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th rowspan="2">
                            № п/п
                        </th>
                        <th rowspan="2">
                            Наименование профессии
                        </th>
                        <th rowspan="2">
                            Шифр Группы
                        </th>
                        <th colspan="5">
                            Количество часов для педагогической нагрузки
                        </th>
                        <th colspan="3">
                            Продолжительность обучения
                        </th>
                        <th colspan="4">
                            Календарные сроки обучения
                        </th>
                        <th rowspan="2" style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Количество человек
                        </th>
                        <th colspan="2">
                            Комплетование групп
                        </th>
                    </tr>
                    <tr>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Теоретическое <br> обучение
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Индивидуальное <br> занятия по оказанию <br> перв. мед. помощи
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Тренажерная <br> подготовка <br> преподавателей
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Экзамен
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Всего
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Всего
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Теоретическое <br> обучение
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Производственное <br> обучение на рабочем <br> месте
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Начало обучения
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Начало <br> производственного <br> обучения
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Окончание <br> производственного <br> обучения
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Квалификационный <br> экзамен/Зачет
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Дирекция/<br>структурное <br> подразделение
                        </th>
                        <th style="writing-mode: vertical-rl; transform: rotate(180deg);">
                            Количество
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(division, index_division) in plan" :key="index_division">
                    <tr>
                        <td colspan="19">
                            Подразделение {{ getNameById(arr_name_division, division.division) }}
                        </td>
                    </tr>
                    <template v-for="(chapter, index_chapter) in division.arr_chapter" :key="index_chapter">
                    <tr>
                        <td colspan="18">
                            {{ getNameById(arr_name_section, chapter.title) }}
                        </td>
                    </tr>
                    <template v-for="(profession, index_profession) in chapter.arr_profession" :key="index_profession">
                    <tr>
                        <td :rowspan="profession.code.length">{{ index_profession + 1 }}</td>
                        <td :rowspan="profession.code.length">
                            {{ getNameById(arr_name_profession, profession.name) }}
                        </td>
                        <td>
                            {{ getNameById(arr_name_profession_groups[profession.name], profession.code[0]) }}
                        </td>
                        <td :rowspan="profession.code.length">{{ profession.to1 }}</td>
                        <td :rowspan="profession.code.length">{{ profession.indt}}</td>
                        <td :rowspan="profession.code.length">{{ profession.tren }}</td>
                        <td :rowspan="profession.code.length">{{ profession.exam }}</td>
                        <td :rowspan="profession.code.length" style="min-width: 50px">{{ Number(profession.to1) + Number(profession.exam) }}</td>
                        <td :rowspan="profession.code.length" style="min-width: 50px">{{ Number(profession.po) + Number(profession.to2) }}</td>
                        <td :rowspan="profession.code.length">{{ profession.to2 }}</td>
                        <td :rowspan="profession.code.length">{{ profession.po }}</td>
                        <td>{{ profession.start_o[0] }}</td>
                        <td>{{ profession.start_po[0] }}</td>
                        <td>{{ profession.end_po[0] }}</td>
                        <td>{{ profession.qual_ex[0] }}</td>
                        <td :rowspan="profession.code.length" style="min-width: 50px">{{ profession.count_people }}</td>
                        <td class="nested_table" :rowspan="profession.code.length">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.direction" :key="index_dir">
                                    <td class="nested_input">
                                        {{ getNameById(arr_name_direction, profession.direction[index_dir]) }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table" :rowspan="profession.code.length">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.count" :key="index_dir">
                                    <td class="nested_input">
                                        {{ profession.count[index_dir] }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr v-for="n in profession.code.length-1" :key="n">
                        <td>
                            {{ getNameById(arr_name_profession_groups[profession.name], profession.code[n]) }}
                        </td>
                        <td>{{ profession.start_o[n] }}</td>
                        <td>{{ profession.start_po[n] }}</td>
                        <td>{{ profession.end_po[n] }}</td>
                        <td>{{ profession.qual_ex[n] }}</td>
                    </tr>
                    </template>
                    <template v-if="chapter.results">
                    <tr>
                        <td></td>
                        <td>Итого по ПР ({{ getNameById(arr_name_section, chapter.title) }}) {{ getNameById(arr_name_division, division.division) }}</td>
                        <td></td>
                        <td>{{ chapter.arr_profession_results['to1'] }}</td>
                        <td>{{ chapter.arr_profession_results['indt'] }}</td>
                        <td>{{ chapter.arr_profession_results['tren'] }}</td>
                        <td>{{ chapter.arr_profession_results['exam'] }}</td>
                        <td>{{ chapter.arr_profession_results['to1'] + chapter.arr_profession_results['exam'] }}</td>
                        <td>{{ chapter.arr_profession_results['to2'] + chapter.arr_profession_results['po'] }}</td>
                        <td>{{ chapter.arr_profession_results['to2'] }}</td>
                        <td>{{ chapter.arr_profession_results['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ chapter.arr_profession_results['count_people'] }}</td>
                        <td></td>
                        <td>{{ chapter.arr_profession_results['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in chapter.arr_profession_results['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(arr_name_direction, index_result) }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ result == 0 ? ' ': result }}</td>
                    </tr>
                    </template> 
                    </template>
                    <template v-if="division.results">
                    <tr>
                        <td></td>
                        <td>Итого по подразделению {{ getNameById(arr_name_division, division.division) }}</td>
                        <td></td>
                        <td>{{ division.arr_chapter_results['to1'] }}</td>
                        <td>{{ division.arr_chapter_results['indt'] }}</td>
                        <td>{{ division.arr_chapter_results['tren'] }}</td>
                        <td>{{ division.arr_chapter_results['exam'] }}</td>
                        <td>{{ division.arr_chapter_results['to1'] + division.arr_chapter_results['exam'] }}</td>
                        <td>{{ division.arr_chapter_results['to2'] + division.arr_chapter_results['po'] }}</td>
                        <td>{{ division.arr_chapter_results['to2'] }}</td>
                        <td>{{ division.arr_chapter_results['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ division.arr_chapter_results['count_people'] }}</td>
                        <td></td>
                        <td>{{ division.arr_chapter_results['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in division.arr_chapter_results['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(arr_name_direction, index_result) }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ result == 0 ? ' ': result }}</td>
                    </tr>
                    </template> 
                </tbody>
                <tbody>
                    <template v-if="final.results">
                    <tr>
                        <td></td>
                        <td>ВСЕГО ПРОФЕССИОНАЛЬНОМУ РАЗВИТИЮ в УЦПК</td>
                        <td></td>
                        <td>{{ final.arr_plan_result['to1'] }}</td>
                        <td>{{ final.arr_plan_result['indt'] }}</td>
                        <td>{{ final.arr_plan_result['tren'] }}</td>
                        <td>{{ final.arr_plan_result['exam'] }}</td>
                        <td>{{ final.arr_plan_result['to1'] + final.arr_plan_result['exam'] }}</td>
                        <td>{{ final.arr_plan_result['to2'] + final.arr_plan_result['po'] }}</td>
                        <td>{{ final.arr_plan_result['to2'] }}</td>
                        <td>{{ final.arr_plan_result['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ final.arr_plan_result['count_people'] }}</td>
                        <td></td>
                        <td>{{ final.arr_plan_result['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in final.arr_plan_result['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(arr_name_direction, index_result) }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ result == 0 ? ' ': result }}</td>
                    </tr>
                    </template> 
                </tbody>
            </table>
            <div class="div_button">
                <button class="button_save" @click="router.back()">Назад</button>
                <button class="button_save" v-if="level == 'ved'" @click="openEditor()">Редактировать</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 100px 20px 0 20px;
}
.title {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
#input_year {
    width: 60px;
}
.table {
    margin: 10px 0 0 0;
    width: 100%;
}
table {
    border-collapse: collapse;
}
th {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
td {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
.add_direction {
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
}
.add_direction:hover {
    transform: scale(1.1);
}
.vetical_text {
    display: inline-block;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
}
.nested_table {
    padding: 0;
}
.table_nested {
    width: 100%;
}
.input_text {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    min-width: 65px;
}
.input_titles {
    width: auto;
}
.nested_input {
    padding: 0;
}
.nested_text {
    display: flex;
    justify-content: center;
}
.div_button {
    margin: 50px auto;
    width: 60%;
    display: flex;
    justify-content: space-around;
}
.button_save {
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
}
</style>
