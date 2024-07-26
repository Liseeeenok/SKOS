<script setup>
import { RouterView } from 'vue-router';
import MenuNav from './components/MenuNav.vue';
</script>

<template>
    <div class="background"></div>
    <main>
        <div class="wrapper">
            <MenuNav/>
            <div class="content">
                <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <component :is="Component" />
                        </transition>
                </router-view>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
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

main {
    position: relative; 
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;

    .wrapper {
        width: 100vw;

        .content {
            margin: 30px auto 0px;
            max-width: 1660px;
            height: calc(100vh - 120px);
            overflow: auto;

            .fade-enter-active,
            .fade-leave-active {
                transition: opacity 0.5s ease;
            }

            .fade-enter-from,
            .fade-leave-to {
                opacity: 0;
            }
        }
    }
}
</style>
