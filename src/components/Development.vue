<script setup>
//------------------------------------
import { useStore } from '../stores/PlanStore';
import { getDirection, getDivision, getPlan, getProfession, getSection } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getPlan();
getDivision();
getSection();
getDirection();
getProfession();
//------------------------------------
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
function changeMenuStatus(index) {
    admin.menuStatus = index;
    localStorage.setItem('skos-menu-status', index);
}
//------------------------------------
</script>

<template>
    <div class="container">
        <div>
            <div class="title">План-график</div>
            <div class="title">профессианального развития рабочих и служащих в Восточно-Сибирском учебном центре профессиональных квалификаций</div>
            <div class="title">Восточно-Сибирской железной дороги - филиала ОАО "РЖД"</div>
            <div class="title">на <input type="number" style="width: 60px;" v-model="admin.academic_year" @change="getPlan()"/> год</div>
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
                <tbody v-for="(division, index_division) in admin.plan.arr_plan" :key="index_division">
                    <tr>
                        <td colspan="18">
                            Подразделение {{ getNameById(admin.divisions, division.division) }}
                        </td>
                    </tr>
                    <template v-for="(chapter, index_chapter) in division.arr_chapter" :key="index_chapter">
                    <tr>
                        <td colspan="18">
                            {{ getNameById(admin.sections, chapter.title) }}
                        </td>
                    </tr>
                    <template v-for="(profession, index_profession) in chapter.arr_profession" :key="index_profession">
                    <tr v-if="admin.professions[profession.name]">
                        <td>{{ index_profession + 1 }}</td>
                        <td>
                            {{ admin.professions[profession.name].name }}
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(code, index_code) in profession.code" :key="index_code">
                                    <td class="nested_input">
                                        {{ getNameById(admin.professions[profession.name].groups, code.name) }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td>{{ profession.to1 }}</td>
                        <td>{{ profession.indt}}</td>
                        <td>{{ profession.tren }}</td>
                        <td>{{ profession.exam }}</td>
                        <td style="min-width: 50px">{{ Number(profession.to1) + Number(profession.exam) }}</td>
                        <td style="min-width: 50px">{{ Number(profession.po) + Number(profession.to2) }}</td>
                        <td >{{ profession.to2 }}</td>
                        <td >{{ profession.po }}</td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(start_o, index_start_o) in profession.start_o" :key="index_start_o">
                                    <td class="nested_input" style="min-width: 80px;min-height: 17px;">
                                        <div style="min-width: 80px;min-height: 17px;">{{ start_o ? start_o.split('-').reverse().join('.') : '' }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(start_po, index_start_po) in profession.start_po" :key="index_start_po">
                                    <td class="nested_input" style="min-width: 80px;min-height: 17px;">
                                        <div style="min-width: 80px;min-height: 17px;">{{ start_po ? start_po.split('-').reverse().join('.') : '' }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(end_po, index_end_po) in profession.end_po" :key="index_end_po">
                                    <td class="nested_input" style="min-width: 80px;min-height: 17px;">
                                        <div style="min-width: 80px;min-height: 17px;">{{ end_po ? end_po.split('-').reverse().join('.') : '' }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(qual_ex, index_qual_ex) in profession.qual_ex" :key="index_qual_ex">
                                    <td class="nested_input">
                                        <div style="min-width: 80px;min-height: 17px;">{{ qual_ex ? qual_ex.split('-').reverse().join('.') : '' }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="min-width: 50px">{{ profession.count_people }}</td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.direction" :key="index_dir">
                                    <td class="nested_input">
                                        {{ getNameById(admin.directions, dir.id_direction) }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index_dir) in profession.count" :key="index_dir">
                                    <td class="nested_input">
                                        {{ dir }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </template>
                    <template v-if="chapter.results">
                    <tr>
                        <td></td>
                        <td>Итого по ПР ({{ getNameById(admin.sections, chapter.title) }}) {{ getNameById(admin.divisions, division.division) }}</td>
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
                        <td>{{ getNameById(admin.directions, index_result) }}</td>
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
                        <td>Итого по подразделению {{ getNameById(admin.divisions, division.division) }}</td>
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
                        <td>{{ getNameById(admin.directions, index_result) }}</td>
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
                    <template v-if="admin.plan.results">
                    <tr>
                        <td></td>
                        <td>ВСЕГО ПРОФЕССИОНАЛЬНОМУ РАЗВИТИЮ в УЦПК</td>
                        <td></td>
                        <td>{{ admin.plan.arr_plan_result['to1'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['indt'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['tren'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['exam'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['to1'] + admin.plan.arr_plan_result['exam'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['to2'] + admin.plan.arr_plan_result['po'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['to2'] }}</td>
                        <td>{{ admin.plan.arr_plan_result['po'] }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ admin.plan.arr_plan_result['count_people'] }}</td>
                        <td></td>
                        <td>{{ admin.plan.arr_plan_result['count_people'] }}</td>
                    </tr>
                    <tr v-for="(result, index_result) in admin.plan.arr_plan_result['directions']" :key="result">
                        <td></td>
                        <td>{{ getNameById(admin.directions, index_result) }}</td>
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
                <button class="button_save" @click="changeMenuStatus('main')">Назад</button>
                <button class="button_save" @click="changeMenuStatus('developmentEdit')">Редактировать</button>
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
