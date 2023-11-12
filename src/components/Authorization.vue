<template>
  <div class="container">
    <div class="title">СИСТЕМА КОНТРОЛЯ ОБУЧЕНИЯ СОТРУДНИКОВ</div>
    <input type="text" class="input" placeholder="Логин">
    <input type="password" class="input" placeholder="Пароль">
    <button class="btn_in">ВОЙТИ</button>
  </div>
</template>

<style scoped>
.container {
    background-color: white;
    width: 451px;
    height: 476px;
    margin: auto;
    border-radius: 20px;
    border: 1px solid #000;
    background: rgba(255, 255, 255, 0.56);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.title {
    color: #000;
    text-align: center;
    font-family: Arial;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    margin: 42px auto 57.33px;
    max-width: 365.315px;
}
.input {
    display: block;
    border: 0;
    border-radius: 20px;
    background: rgb(216, 211, 211);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 309.978px;
    height: 50.874px;
    margin: 27.41px auto;
    padding: 0 10px;
    color: rgba(0, 0, 0, 0.50);
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.btn_in {
    display: block;
    border: 0;
    border-radius: 20px;
    background: rgb(194, 193, 240);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 309.978px;
    height: 50.874px;
    margin: 27.41px auto;
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
</style>

<script setup>

</script>