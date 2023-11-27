<script setup>
import { ref } from 'vue';
const plan = ref([]);
function addDirection() {
    //plan.value.push('test');
    plan.value.push({'division':'123','preparation':'','profession':[]});
    console.log(plan.value);
}
function addProfession(index) {
    //plan.value[index].profession.push({'number':'', 'name':'', 'code':'', 'to1':'', 'per':'', 'indt':'', 'tren':'', 'exam':'', 'all1':'', 'all2':'', 'to2':'', 'po':'', 'start_po':'', 'end_po':'', 'qual_ex':'', 'count_p':'', 'direction':[], 'count':[]});
    plan.value[index].profession.push({'number':'1', 'name':'Машинист', 'code':'Дуоматик', 'to1':'752', 'per':'26', 'indt':'', 'tren':'', 'exam':'8', 'all1':'760', 'all2':'22', 'to2':'19', 'po':'3','start_o':'16.11.2021', 'start_po':'24.02.2021', 'end_po':'17.03.2022', 'qual_ex':'28.04.2022', 'count_p':'14', 'direction':[], 'count':[]});
    console.log(plan);
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
                            Теоритическое обучение
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
                    <tr v-for="(prof, index2) in division.profession" :key="index2">
                        <td>{{ prof.number }}</td>
                        <td>{{ prof.name }}</td>
                        <td>{{ prof.code }}</td>
                        <td>{{ prof.to1 }}</td>
                        <td>{{ prof.per }}</td>
                        <td>{{ prof.indt }}</td>
                        <td>{{ prof.tren }}</td>
                        <td>{{ prof.exam }}</td>
                        <td>{{ prof.all1 }}</td>
                        <td>{{ prof.all2 }}</td>
                        <td>{{ prof.to2 }}</td>
                        <td>{{ prof.po }}</td>
                        <td>{{ prof.start_o }}</td>
                        <td>{{ prof.start_po }}</td>
                        <td>{{ prof.end_po }}</td>
                        <td>{{ prof.qual_ex }}</td>
                        <td>{{ prof.count_p }}</td>
                        <td>Дирекции</td>
                        <td>Число</td>
                    </tr>
                    <tr>
                        <td colspan="19">
                            <div class="title add_direction" @click="addProfession(index)">Добавить профессию</div>
                        </td>
                    </tr>
                    <tr>
                    <td colspan="19">
                            Переподготовка
                            <input type="text" v-model="division.preparation">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <div class="title add_direction" @click="addDirection()">Добавить подразделение</div>
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
    transform: scale(1.2);
}
.vetical_text {
    display: inline-block;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
}
</style>
