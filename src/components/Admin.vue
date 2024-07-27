<script setup>
</script>

<template>
    <div class="container">
        <div class="admin">
            <div class="container_menu">
                <div class="menu">
                    <router-link to="/admin/division">
                        <div class="menu_item">Подразделения</div>
                    </router-link>
                    <router-link to="/admin/section">
                        <div class="menu_item">Секции</div>
                    </router-link>
                    <router-link to="/admin/directions">
                        <div class="menu_item">Дирекции</div>
                    </router-link>
                    <router-link to="/admin/companies">
                        <div class="menu_item">Предприятия</div>
                    </router-link>
                    <router-link to="/admin/professions">
                        <div class="menu_item">Профессии</div>
                    </router-link>
                    <router-link to="/admin/users">
                        <div class="menu_item">Пользователи</div>
                    </router-link>
                    <router-link to="/admin/roles">
                        <div class="menu_item">Роли</div>
                    </router-link>
                    <router-link to="/admin/permission/-1">
                        <div class="menu_item">Права</div>
                    </router-link>
                    <router-link to="/admin/positions">
                        <div class="menu_item">Должности</div>
                    </router-link>
                </div>
            </div>
            <div class="container_content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss"scoped>
.container {
    padding: 10px 20px 0 20px;

    .admin {
        display: flex;

        .container_menu {
            padding-right: 20px;

            .menu_item {
                font-size: 24px;
                cursor: pointer;
                transition: 0.2s;
                padding: 10px 20px;
                border-radius: 10px;
                margin: 5px 0;
                color: black;

                &:hover {
                    background: rgba(182, 168, 189, 0.50);
                    transform: scale(1.1);
                }
            }

            .router-link-active {
                .menu_item {
                    background: rgb(255 255 255 / 50%);
                }
            }
        }

        .container_content {
            padding-bottom: 50px;
        }
    }
}
</style>
