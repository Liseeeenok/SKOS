<script setup>
</script>

<template>
    <div class="wrapper">
        <nav class="nav">
            <RouterLink to="/profile"><div class="menu_item active">Профиль</div></RouterLink>
            <RouterLink to="/profile"><div class="menu_item">Уведомления</div></RouterLink>
            <RouterLink to="/profile"><div class="menu_item">Обучение</div></RouterLink>
            <RouterLink to="/"><div class="menu_item">Выход</div></RouterLink>
        </nav>
        <div class="wrapper_profile">
            <div class="profile">
                <div class="photo">ФОТО</div>
                <div>
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
                            <td class="item_table">Инженер</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.nav {
    padding: 99px 14.4% 0 28.7%;
    display: flex;
    justify-content: space-between;
}
.menu_item {
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    transition: 0.2s;
}
.active {
    background: rgba(103, 96, 106, 0.50);
}
.menu_item:hover {
    background: rgba(182, 168, 189, 0.50);
}
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
