<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </header>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  position: absolute;
  top: 68px;
  left: 7.3%;
  width: 193.538px;
  height: 132.746px;
}
</style>
