<script setup>
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { preLoad } from '../helpers/API.js';
import { useStore } from '../stores/PlanStore';
const admin = useStore();
const auth_err = ref(false);
const login =  ref('');
const password =  ref('');
const host = 'mypew.ru:7070'; //имя или ip хоста api
function authorization() {
    let request = {
        login: login.value,
        password: password.value
    }
    axios
        .post('https://' + host + '/login', request)
        .then((response_jwt) => {
            console.log(response_jwt);
            if (response_jwt.data.jwt) {
                let response = jwtDecode(response_jwt.data.jwt);
                console.log(response);
                auth_err.value = false;
                localStorage.setItem('skos-token', response_jwt.data.jwt);
                admin.chapter = 1;
                localStorage.setItem('skos-chapter', 1);
                admin.chapterStatus = 'main';
                localStorage.setItem('skos-chapter-status', 'main');
                admin.menu = 3;
                localStorage.setItem('skos-menu', 3);
                admin.menuStatus = 'main';
                localStorage.setItem('skos-menu-status', 'main');
                //preLoad();
                router.push('/main');
            } else {
                auth_err.value = true;
            }
        })
}
</script>

<template>
    <div>
        <form>
            <h3>СИСТЕМА КОНТРОЛЯ ОБУЧЕНИЯ СОТРУДНИКОВ</h3>
            <label for="username" class="noselect">Логин</label>
            <input v-model="login"  type="text" placeholder="Логин" id="username">
            <label for="password" class="noselect">Пароль</label>
            <input v-model="password" type="password" placeholder="Пароль" id="password">
            <div v-if="auth_err" class="auth_err noselect">Неверный логин или пароль</div>
            <button type="button" @click="authorization()" class="noselect">ВОЙТИ</button>
        </form>
        <div class="background noselect">
            <img alt="СКОС" class="shape" src="@/assets/logo.svg" width="125" height="125" draggable="false"/>
        </div>
    </div>
</template>

<style scoped>


.background{
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    left: -285px;
    top: -370px;
}
form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #000000;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 22px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    border: solid 1px black;
}
::placeholder{
    color: #9b9494;
}
button{
    margin-top: 30px;
    width: 100%;
    background-color: #e31b1a;
    color: rgba(255, 255, 255, .75);
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
button:hover{
    background-color: #ca1110;
    color: #fff;
}
.auth_err{
    color: #f93000;
}
.noselect {
    -webkit-user-drag: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>