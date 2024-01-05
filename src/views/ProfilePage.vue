<script setup>
import MenuNav from '../components/MenuNav.vue';
const level = localStorage.getItem('skos-token');
</script>

<template>
    <div class="wrapper">
        <MenuNav index="1"/>
        <div class="wrapper_profile">
            <div class="profile">
                <div class="photo">ФОТО</div>
                <div class="inform">
                    <table>
                        <tr>
                            <td class="title_table">Фамилия:</td>
                            <td class="item_table">Иванов</td>
                        </tr>
                        <tr>
                            <td class="title_table">Имя:</td>
                            <td class="item_table">Иван</td>
                        </tr>
                        <tr>
                            <td class="title_table">Отчество:</td>
                            <td class="item_table">Иванович</td>
                        </tr>
                        <tr>
                            <td class="title_table">Номер телефона:</td>
                            <td class="item_table">88005553535</td>
                        </tr>
                        <tr>
                            <td class="title_table">Должность:</td>
                            <td class="item_table">{{ level == 'ved' ? 'Ведущий Инженер': 'Инженер ДПМВ'}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper_profile {
    margin: 10vw 0 0 0;
}
.profile {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: auto;
}
.photo {
    width: 270px;
    height: 267px;
    border-radius: 20px;
    background: rgba(220, 218, 221, 0.50);
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 37px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.inform {
    background-color: rgba(220, 218, 221, 0.50);
    padding: 20px;
    border-radius: 20px;
}
.title_table {
    color: #000;
    font-family: Arial;
    font-size: 37px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-right: 20px;
}
.item_table {
    color: #000;
    font-family: Arial;
    font-size: 37px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
