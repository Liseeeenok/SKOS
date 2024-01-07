<script setup>
import { ref } from 'vue';
const die_students = ref(false);
const die_items = ref(false);
const die_professions = ref(false);
</script>

<template>
    <div class="container">
        <div>
            <div class="die die_title">План-график</div>
            <RouterLink to="/preparation"><div class="die die_main" v-if="false">Подготовка</div></RouterLink>
            <RouterLink to="/development"><div class="die die_main">Проф. развитие</div></RouterLink>
            <div class="die die_main" v-if="false">ДПО</div>
        </div>
        <div v-if="false">
            <div class="die die_title">Обучающиеся</div>
            <div class="die die_main" @click="die_students = !die_students" :class="die_students ? 'die_active':''">Студенты</div>
            <div class="die_absolute">
                <div class="die_hidden" :class="die_students ? 'die_active_students':'die_hide'">
                    <div class="die die_main">Опоздание</div>
                    <div class="die die_main">Выпуск</div>
                    <div class="die die_main">Отчисление</div>
                    <div class="die die_main">Пересдача</div>
                </div>
                <div class="die die_main">Группы</div>
            </div>
        </div>
        <div>
            <div class="die die_title">Обучение</div>
            <RouterLink to="/statement"><div class="die die_main">Ведомости</div></RouterLink>
            <div class="die_absolute" v-if="false">
                <div class="die die_main" @click="die_items = !die_items" :class="die_items ? 'die_active':''">Предметы</div>
                <div class="die_hidden" :class="die_items ? 'die_active_items':'die_hide'">
                    <div class="die die_main">Вид контроля</div>
                </div>
                <div class="die die_main">Нагрузка</div>
                <div class="die die_main" @click="die_professions = !die_professions" :class="die_professions ? 'die_active':''">Профессии</div>
                <div class="die_hidden" :class="die_professions ? 'die_active_professions':'die_hide'">
                    <div class="die die_main">Виды обучения</div>
                </div>
            </div>
        </div>
        <div v-if="false">
            <div class="die die_title">Дирекции</div>
            <div class="die die_main">Дирекции</div>
            <div class="die die_main">Подразделения</div>
            <div class="die die_main">Посещения</div>
        </div>
        <div v-if="false">
            <div class="die die_title">Проживание</div>
            <div class="die die_main">Проживание</div>
            <div class="die die_main">Объект прожив.</div>
            <div class="die die_main">Выселение</div>
        </div>
        <div style="margin-bottom: 200px;" v-if="false">
            <div class="die die_title">УЦПК</div>
            <div class="die die_main">Подразделения</div>
            <div class="die die_main">Персонал</div>
            <div class="die die_main">Должности</div>
            <div class="die die_main">Кураторы</div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 80%;
    margin: 100px auto 0 auto;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}
.die {
    width: 90%;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 20px;
    
}
.die_main {
    background: #DCDADD;
    cursor: pointer;
    margin: 10px 5px 0 5px;
    transition: 0.2s;
}
.die_main:hover {
    background: #bcbabd;
    transform: scale(1.1);
}
.die_title {
    font-weight: 700;
    background: #e9ebf0;
}
.die_absolute {
    /*position: absolute;*/
    display: block;
}
.die_hidden {
    overflow: hidden;
    transition: max-height 0.5s ease-out;
}
.die_hidden .die {
    background: #D3CCD7;
}
.die_hide {
    max-height: 0;
}
.die_active {
    background: #a2a2a2;
}
.die_active_students {
    max-height: 252px;
}
.die_active_items {
    max-height: 63px;
}
.die_active_professions {
    max-height: 63px;
}
</style>
