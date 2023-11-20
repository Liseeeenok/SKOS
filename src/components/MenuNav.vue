<script setup>
defineProps({
index: {
type: String,
required: true
}
})
</script>

<template>
    <nav class="nav">
        <RouterLink to="/profile"><div class="menu_item" :class="index == '1' ? 'active' : ''">Профиль</div></RouterLink>
        <RouterLink to="/notification"><div class="menu_item" :class="index == '2' ? 'active' : ''">Уведомления</div></RouterLink>
        <RouterLink to="/profile"><div class="menu_item" :class="index == '3' ? 'active' : ''">Обучение</div></RouterLink>
        <RouterLink to="/"><div class="menu_item">Выход</div></RouterLink>
    </nav>
</template>

<style scoped>
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
</style>