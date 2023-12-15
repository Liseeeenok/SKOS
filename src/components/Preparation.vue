<script setup>
import { ref } from 'vue';
const plan = ref([]);
function addDirection() {
    plan.value.push({'division':'','preparation':'','arr_preparation':[], 'arr_preparation_results':[], 'add_preparation':true, 'arr_retraining':[], 'arr_retraining_results':[], 'add_retraining':true});
    console.log(plan.value);
}
function addPreparation(index) {
    plan.value[index].arr_preparation.push({'number':'1', 'name':'Машинист', 'code':'Дуоматик', 'to1':752, 'per':26, 'indt':'', 'tren':'', 'exam':8, 'to2':19, 'po':3, 'start_o':'2021-11-16', 'start_po':'2021-02-24', 'end_po':'2022-03-17', 'qual_ex':'2022-04-28', 'count_p':'', 'direction':[], 'count':[], 'add_direction':true});
    console.log(plan);
}
function blockPreparation(index) {
    plan.value[index].add_preparation = false; 
    console.log(plan);
}
function addPreparationDirection(index, index2) {
    plan.value[index].arr_preparation[index2].direction.push('TEST');
    plan.value[index].arr_preparation[index2].count.push(4);
    console.log(plan);
}
function blockPreparationDirection(index, index2) {
    plan.value[index].arr_preparation[index2].add_direction = false;
    let arr_preparation_results = {};
    if (plan.value[index].arr_preparation) {
        plan.value[index].arr_preparation.forEach(preparation => {
            if (preparation.direction) {
                preparation.direction.forEach((x, ind) => {
                    if (!arr_preparation_results[x]) {
                        arr_preparation_results[x] = 0;
                    }
                    arr_preparation_results[x] += preparation.count[ind];
                });
            }
        });
        plan.value[index].arr_preparation_results = arr_preparation_results;
    }
    console.log(plan);
}
function addRetraining(index) {
    plan.value[index].arr_retraining.push({'number':'1', 'name':'Машинист электровоза', 'code':'МЭ', 'to1':728, 'per':'', 'indt':'', 'tren':'', 'exam':8, 'to2':18.4, 'po':2.6, 'start_o':'2021-10-18', 'start_po':'2022-02-04', 'end_po':'2022-02-22', 'qual_ex':'2021-03-31', 'count_p':'', 'direction':[], 'count':[], 'add_direction':true});
    console.log(plan);
}
function blockRetraining(index) {
    plan.value[index].add_retraining = false;
    console.log(plan);
}
function addRetrainingDirection(index, index2) {
    plan.value[index].arr_retraining[index2].direction.push('TEST');
    plan.value[index].arr_retraining[index2].count.push(4);
    console.log(plan);
}
function blockRetrainingDirection(index, index2) {
    plan.value[index].arr_retraining[index2].add_direction = false;
    let arr_retraining_results = {};
    if (plan.value[index].arr_retraining) {
        plan.value[index].arr_retraining.forEach(retraining => {
            if (retraining.direction) {
                retraining.direction.forEach((x, ind) => {
                    if (!arr_retraining_results[x]) {
                        arr_retraining_results[x] = 0;
                    }
                    arr_retraining_results[x] += retraining.count[ind];
                });
            }
        });
        plan.value[index].arr_retraining_results = arr_retraining_results;
    }
    console.log(plan);
}
function getPreparationCountDirection(index, index2) {
    if (plan.value[index].arr_preparation[index2].count) {
        let sum = 0;
        plan.value[index].arr_preparation[index2].count.forEach(x => {
            sum += x;
        });
        plan.value[index].arr_preparation[index2].count_p = sum;
        return sum;
    } else return 0;
}
function getRetrainingCountDirection(index, index2) {
    if (plan.value[index].arr_retraining[index2].count) {
        let sum = 0;
        plan.value[index].arr_retraining[index2].count.forEach(x => {
            sum += x;
        });
        plan.value[index].arr_retraining[index2].count_p = sum;
        return sum;
    } else return 0;
}
function getPreparationCountHours(index, column) {
    if (plan.value[index].arr_preparation) {
        let sum = 0;
        plan.value[index].arr_preparation.forEach(x => {
            sum += x[column];
        });
        return sum;
    } else return 0;
}
function getPreparationCountHours2(index, column, column2) {
    if (plan.value[index].arr_preparation) {
        let sum = 0;
        plan.value[index].arr_preparation.forEach(x => {
            sum += x[column] + x[column2];
        });
        return sum;
    } else return 0;
}
function getRetrainingCountHours(index, column) {
    if (plan.value[index].arr_retraining) {
        let sum = 0;
        plan.value[index].arr_retraining.forEach(x => {
            sum += x[column];
        });
        return sum;
    } else return 0;
}
function getRetrainingCountHours2(index, column, column2) {
    if (plan.value[index].arr_retraining) {
        let sum = 0;
        plan.value[index].arr_retraining.forEach(x => {
            sum += x[column] + x[column2];
        });
        return sum;
    } else return 0;
}
</script>

<template>
    <div class="container">
        <div>
            <div class="title">План-график</div>
            <div class="title">подготовки рабочих и служащих в Восточно-Сибирском учебном центре профессиональных квалификаций</div>
            <div class="title">Восточно-Сибирской железной дороги - филиала ОАО "РЖД"</div>
            <div class="title">на 
                <input type="text" class="title" id="input_year">
                год
            </div>
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
                        <th colspan="6">
                            Количество часов для педагогической нагрузки
                        </th>
                        <th colspan="3">
                            Продолжительность
                        </th>
                        <th colspan="4">
                            Календарные сроки обучения
                        </th>
                        <th rowspan="2">
                            Количество человек
                        </th>
                        <th colspan="2">
                            Комплетование групп
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Теоретическое обучение
                        </th>
                        <th>
                            "Первозимники"
                        </th>
                        <th>
                            Индивидуальное занятия по оказанию перв. мед. помощи
                        </th>
                        <th>
                            Тренажерная подготовка преподавателей
                        </th>
                        <th>
                            Экзамены
                        </th>
                        <th>
                            Всего
                        </th>
                        <th>
                            Всего
                        </th>
                        <th>
                            Теоретическое обучение
                        </th>
                        <th>
                            Производственное обучение на рабочем месте
                        </th>
                        <th>
                            Начало обучения
                        </th>
                        <th>
                            Начало производственного обучения
                        </th>
                        <th>
                            Окончание    производственного обучения
                        </th>
                        <th>
                            Квалификационный экзамен/Зачет
                        </th>
                        <th>
                            Дирекция/Структурное подразделение
                        </th>
                        <th>
                            Количество
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(division, index) in plan" :key="index">
                    <tr>
                        <td colspan="19">
                            Подразделение
                            <input type="text" v-model="division.division">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="19">
                            Подготовка
                            <input type="text" v-model="division.preparation">
                        </td>
                    </tr>
                    <tr v-for="(prof, index2) in division.arr_preparation" :key="index2">
                        <td>{{ index2 + 1 }}</td>
                        <td><textarea class="input_text" v-model="prof.name" rows="5"></textarea></td>
                        <td><textarea class="input_text" v-model="prof.code" rows="5"></textarea></td>
                        <td><input type="number" class="input_text" v-model="prof.to1"></td>
                        <td><input type="number" class="input_text" v-model="prof.per"></td>
                        <td><input type="number" class="input_text" v-model="prof.indt"></td>
                        <td><input type="number" class="input_text" v-model="prof.tren"></td>
                        <td><input type="number" class="input_text" v-model="prof.exam"></td>
                        <td><input type="number" class="input_text" :value="prof.to1 + prof.exam"></td>
                        <td><input type="number" class="input_text" :value="prof.po + prof.to2"></td>
                        <td><input type="number" class="input_text" v-model="prof.to2"></td>
                        <td><input type="number" class="input_text" v-model="prof.po"></td>
                        <td><input type="date" class="input_text" v-model="prof.start_o"></td>
                        <td><input type="date" class="input_text" v-model="prof.start_po"></td>
                        <td><input type="date" class="input_text" v-model="prof.end_po"></td>
                        <td><input type="date" class="input_text" v-model="prof.qual_ex"></td>
                        <td><input type="number" class="input_text" :value="getPreparationCountDirection(index, index2)"></td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index3) in prof.direction" :key="index3">
                                    <td class="nested_input"><input class="input_text" v-model="prof.direction[index3]"></td>
                                </tr>
                                <tr v-if="prof.add_direction">
                                    <td class="title add_direction" @click="addPreparationDirection(index, index2)">Добавить дирекцию</td>
                                </tr>
                                <tr v-if="prof.add_direction"   >
                                    <td class="title add_direction" @click="blockPreparationDirection(index, index2)">Закрыть ввод</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index3) in prof.count" :key="index3">
                                    <td class="nested_input"><input class="input_text" type="number" v-model="prof.count[index3]"></td>
                                </tr>
                                <tr v-if="prof.add_direction">
                                    <td class="title add_direction" @click="addPreparationDirection(index, index2)">Добавить дирекцию</td>
                                </tr>
                                <tr v-if="prof.add_direction"   >
                                    <td class="title add_direction" @click="blockPreparationDirection(index, index2)">Закрыть ввод</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr v-if="division.add_preparation">
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction" @click="addPreparation(index)" >Добавить профессию</text></div>
                            <div class="nested_text"><text class="title add_direction" @click="blockPreparation(index)">Подвести итоги</text></div>
                        </td>
                    </tr>
                    <template v-else>
                    <tr>
                        <td></td>
                        <td>Итого по профессиональной подготовке подразделения {{ division.division }}</td>
                        <td></td>
                        <td>{{ getPreparationCountHours(index, 'to1') }}</td>
                        <td>{{ getPreparationCountHours(index, 'per') }}</td>
                        <td>{{ getPreparationCountHours(index, 'indt') }}</td>
                        <td>{{ getPreparationCountHours(index, 'tren') }}</td>
                        <td>{{ getPreparationCountHours(index, 'exam') }}</td>
                        <td>{{ getPreparationCountHours2(index, 'to1', 'exam') }}</td>
                        <td>{{ getPreparationCountHours2(index, 'po', 'to2') }}</td>
                        <td>{{ getPreparationCountHours(index, 'to2') }}</td>
                        <td>{{ getPreparationCountHours(index, 'po') }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ getPreparationCountHours(index, 'count_p') }}</td>
                        <td></td>
                        <td>{{ getPreparationCountHours(index, 'count_p') }}</td>
                    </tr>
                    <tr v-for="(result, index2) in division.arr_preparation_results" :key="result">
                        <td></td>
                        <td>{{ index2 }}</td>
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
                        <td></td>
                        <td>{{ division.arr_preparation_results[index2] }}</td>
                    </tr>
                    </template>
                    <tr>
                    <td colspan="19">
                            Переподготовка
                            <input type="text" v-model="division.preparation">
                        </td>
                    </tr>
                    <tr v-for="(prof, index2) in division.arr_retraining" :key="index2">
                        <td>{{ index2 + 1 }}</td>
                        <td><textarea class="input_text" v-model="prof.name" rows="5"></textarea></td>
                        <td><textarea class="input_text" v-model="prof.code" rows="5"></textarea></td>
                        <td><input type="number" class="input_text" v-model="prof.to1"></td>
                        <td><input type="number" class="input_text" v-model="prof.per"></td>
                        <td><input type="number" class="input_text" v-model="prof.indt"></td>
                        <td><input type="number" class="input_text" v-model="prof.tren"></td>
                        <td><input type="number" class="input_text" v-model="prof.exam"></td>
                        <td><input type="number" class="input_text" :value="prof.to1 + prof.exam"></td>
                        <td><input type="number" class="input_text" :value="prof.po + prof.to2"></td>
                        <td><input type="number" class="input_text" v-model="prof.to2"></td>
                        <td><input type="number" class="input_text" v-model="prof.po"></td>
                        <td><input type="date" class="input_text" v-model="prof.start_o"></td>
                        <td><input type="date" class="input_text" v-model="prof.start_po"></td>
                        <td><input type="date" class="input_text" v-model="prof.end_po"></td>
                        <td><input type="date" class="input_text" v-model="prof.qual_ex"></td>
                        <td><input type="number" class="input_text" :value="getRetrainingCountDirection(index, index2)"></td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index3) in prof.direction" :key="index3">
                                    <td class="nested_input"><input class="input_text" v-model="prof.direction[index3]"></td>
                                </tr>
                                <tr v-if="prof.add_direction">
                                    <td class="title add_direction" @click="addRetrainingDirection(index, index2)">Добавить дирекцию</td>
                                </tr>
                                <tr v-if="prof.add_direction"   >
                                    <td class="title add_direction" @click="blockRetrainingDirection(index, index2)">Закрыть ввод</td>
                                </tr>
                            </table>
                        </td>
                        <td class="nested_table">
                            <table class="table_nested">
                                <tr v-for="(dir, index3) in prof.count" :key="index3">
                                    <td class="nested_input"><input class="input_text" type="number" v-model="prof.count[index3]"></td>
                                </tr>
                                <tr v-if="prof.add_direction">
                                    <td class="title add_direction" @click="addRetrainingDirection(index, index2)">Добавить дирекцию</td>
                                </tr>
                                <tr v-if="prof.add_direction"   >
                                    <td class="title add_direction" @click="blockRetrainingDirection(index, index2)">Закрыть ввод</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr v-if="division.add_retraining">
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction" @click="addRetraining(index)" >Добавить профессию</text></div>
                            <div class="nested_text"><text class="title add_direction" @click="blockRetraining(index)">Подвести итоги</text></div>
                        </td>
                    </tr>
                    <template v-else>
                    <tr>
                        <td></td>
                        <td>Итого по ПР (переподготовка) {{ division.division }}</td>
                        <td></td>
                        <td>{{ getRetrainingCountHours(index, 'to1') }}</td>
                        <td>{{ getRetrainingCountHours(index, 'per') }}</td>
                        <td>{{ getRetrainingCountHours(index, 'indt') }}</td>
                        <td>{{ getRetrainingCountHours(index, 'tren') }}</td>
                        <td>{{ getRetrainingCountHours(index, 'exam') }}</td>
                        <td>{{ getRetrainingCountHours2(index, 'to1', 'exam') }}</td>
                        <td>{{ getRetrainingCountHours2(index, 'po', 'to2') }}</td>
                        <td>{{ getRetrainingCountHours(index, 'to2') }}</td>
                        <td>{{ getRetrainingCountHours(index, 'po') }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ getRetrainingCountHours(index, 'count_p') }}</td>
                        <td></td>
                        <td>{{ getRetrainingCountHours(index, 'count_p') }}</td>
                    </tr>
                    <tr v-for="(result, index2) in division.arr_retraining_results" :key="result">
                        <td></td>
                        <td>{{ index2 }}</td>
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
                        <td></td>
                        <td>{{ division.arr_retraining_results[index2] }}</td>
                    </tr>
                    </template>
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="19">
                            <div class="nested_text"><text class="title add_direction margin_direction" @click="addDirection()">Добавить подразделение</text></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 100px 20px 0 20px;
    width: min-content;
}
.title {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
#input_year {
    width: 60px;
}
.table {
    margin: 10px 0 0 0;
}
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
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
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
.margin_direction {
    margin-bottom: 200px;
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
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    min-width: 130px;
}
.nested_input {
    padding: 0;
}
.nested_text {
    display: flex;
    justify-content: center;
}
</style>
