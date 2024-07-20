<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="background"></div>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
main {
    position: relative; 
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
}

.background {
    height: 100vh;
    width: 100%;
    background-image: url("assets/1647619030_47-amiel-club-p-poezd-kartinki-krasivie-53.jpg");
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.2;
}

</style>
