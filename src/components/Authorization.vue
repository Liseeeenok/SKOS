<script setup>
import { ref } from 'vue';
import router from '../router';
const auth_err = ref(false);
const login =  ref('');
const password =  ref('');
function authorization() {
    console.log(login.value);
    console.log(password.value);
    //запрос
    if (login.value == 'ved' && password.value == '123') {
        auth_err.value = false;
        router.push('/notification');
        localStorage.setItem('skos-token', 'ved');
    } else if (login.value == 'dirDPMV' && password.value == '123') {
        auth_err.value = false;
        router.push('/notification');
        localStorage.setItem('skos-token', 'dir');
        localStorage.setItem('skos-dir', 'ДПМВ');
    } else {
        auth_err.value = true;
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div class="title">СИСТЕМА КОНТРОЛЯ ОБУЧЕНИЯ СОТРУДНИКОВ</div>
            <input v-model="login" type="text" class="input" placeholder="Логин">
            <input v-model="password" type="password" class="input" placeholder="Пароль">
            <div v-if="auth_err" class="auth_err">Логин или пароль неверный</div>
            <button @click="authorization()" class="btn_in">ВОЙТИ</button>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
}
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
    cursor: pointer;
    transition: 0.2s;
}
.btn_in:hover {
    transform: scale(1.1);
}
.auth_err {
    margin: auto;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
    color: rgb(243, 66, 66)
}
</style>