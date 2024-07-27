<script setup>
import { useStore } from '../stores/PlanStore';
import { getRole, saveRole, getDirection, getSection, getDivision, getProfession } from '../helpers/API.js';
import router from '../router/index.js';
//------------------------------------
const store = useStore();
getRole();
getDivision();
getSection();
getDirection();
getProfession();
//------------------------------------
function setStatus(index_role) {
    if (store.roles[index_role].status != 2) store.roles[index_role].status = 1;
}
function updateRole(id) {
    router.push(`/admin/permission/${id}`);
    //if (admin.role.status == 1 || admin.role.status == 2) saveRole();
}
//------------------------------------
</script>

<template>
    <h1>Настройка прав доступа ролям</h1>
    <select v-model="$route.params.id" @change="updateRole($route.params.id)" class="select_role">
        <template v-for="(role, index_role) in store.roles" :key="index_role">
            <option :value="role.id">{{ role.name }}</option>
        </template>
    </select>
    <table v-if="store.roles[$route.params.id]">
        <thead>
            <tr>
                <th>Право</th>
                <th>Уровень доступа</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Панель администратора</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_admin_panel.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Подразделения</td>
                <td style="min-width: 370px;">
                    <select v-model="store.roles[$route.params.id].perm_divisions.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" 
                    v-if="store.roles[$route.params.id].perm_divisions.access == 'limited'" 
                    v-model="store.roles[$route.params.id].perm_divisions.id_division" @change="setStatus($route.params.id)">
                        <template v-for="(division, index_division) in store.divisions" :key="index_division">
                            <option :value="division.id">{{ division.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Секции</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_sections.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="store.roles[$route.params.id].perm_sections.access == 'limited'" 
                    v-model="store.roles[$route.params.id].perm_sections.id_section" @change="setStatus($route.params.id)">
                        <template v-for="(section, index_section) in store.sections" :key="index_section">
                            <option :value="section.id">{{ section.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Дирекции</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_directions.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="store.roles[$route.params.id].perm_directions.access == 'limited'" 
                    v-model="store.roles[$route.params.id].perm_directions.id_direction" @change="setStatus($route.params.id)">
                        <template v-for="(direction, index_direction) in store.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Предприятия</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_companies.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="store.roles[$route.params.id].perm_directions.access == 'limited'" 
                    v-model="store.roles[$route.params.id].perm_directions.id_direction" @change="setStatus($route.params.id)">
                        <template v-for="(direction, index_direction) in store.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Профессии</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_professions.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="store.roles[$route.params.id].perm_professions.access == 'limited'" 
                    v-model="store.roles[$route.params.id].perm_professions.id_profession" @change="setStatus($route.params.id)">
                        <template v-for="(profession, index_profession) in store.professions" :key="index_profession">
                            <option :value="profession.id">{{ profession.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Группы профессий</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_profession_groups.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="store.roles[$route.params.id].perm_profession_groups.access == 'limited'" 
                    v-model="store.roles[$route.params.id].perm_profession_groups.id_profession" @change="setStatus($route.params.id)">
                        <template v-for="(profession, index_profession) in store.professions" :key="index_profession">
                            <option :value="profession.id">{{ profession.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Роли</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_roles.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Должности</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_positions.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Пользователи</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_users.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Уведомления</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_notifications.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>План-график</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_plan_schedule.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Просмотр</option>
                        <option value="*">Редактирование</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Ведомость</td>
                <td>
                    <select v-model="store.roles[$route.params.id].perm_statement.access" @change="setStatus($route.params.id)">
                        <option value="-">Закрыт</option>
                        <option value="limited">Просмотр</option>
                        <option value="*">Редактирование</option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="green" @click="saveRole()">Сохранить</button>
</template>

<style scoped>
table {
    background-color: #ffffff;
    font-size: 16px;
    border-collapse: collapse;
    width: 100%;
    max-width: 1660px;
    border-radius: 10px;
    overflow: hidden;

    tr {

        th, td {
            text-align: center;
            padding: 5px 15px;
            box-sizing: border-box;
        }

        th {
            color: #ffffff;
            font-weight: normal;
            background-color: #8f8f8f;
            border: solid 1px #8f8f8f;
            position: sticky;
            top: 0;
        }

        td {
            border: solid 1px #d8d8d8;
            cursor: pointer;
        }
    }

    tbody tr {
        transition: background-color 150ms ease-out;

        &:nth-child(2n+1) {
            background-color: rgb(255 255 255);
        }

        &:nth-child(2n) {
            background-color: rgb(245 245 245);
        }

        &:hover {
            background-color: rgb(216 216 216);
        }
    }
}
input {
    padding: 5px 10px;
    width: 500px;
}
button {
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;

    &.green {
        color: black;
        background-color: rgb(217 255 228);
        margin: 15px 0 0 0;

        &:hover {
            background: rgb(198, 226, 193);
        }
    }
}

.select_role {
    margin: 15px 0;
}

select {
    padding: 5px 10px;
    width: 180px;
}
</style>