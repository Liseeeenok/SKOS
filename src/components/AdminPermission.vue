<script setup>
import { useStore } from '../stores/PlanStore';
import { getRole, saveRole, getDirection, getSection, getDivision, getProfession } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getRole();
getDivision();
getSection();
getDirection();
getProfession();
//------------------------------------
function setStatus() {
    if (admin.roles.find(x => x.id == admin.roleId).status != 2) admin.roles.find(x => x.id == admin.roleId).status = 1;
}
function updateRole() {
    if (admin.role.status == 1 || admin.role.status == 2) saveRole();
    localStorage.setItem('skos-role-id', admin.roleId);
    admin.role = admin.roles.find(x => x.id == admin.roleId);
}
//------------------------------------
</script>
<template>
    <h1>Настройка прав доступа ролям</h1>
    <select v-model="admin.roleId" @change="updateRole()">
        <template v-for="(role, index_role) in admin.roles" :key="index_role">
            <option :value="role.id">{{ role.name }}</option>
        </template>
    </select>
    <table>
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
                    <select v-model="admin.role.perm_admin_panel.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Подразделения</td>
                <td style="min-width: 370px;">
                    <select v-model="admin.role.perm_divisions.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="admin.role.perm_divisions.access == 'limited'" v-model="admin.role.perm_divisions.id_division" @change="setStatus()">
                        <template v-for="(division, index_division) in admin.divisions" :key="index_division">
                            <option :value="division.id">{{ division.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Секции</td>
                <td>
                    <select v-model="admin.role.perm_sections.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="admin.role.perm_sections.access == 'limited'" v-model="admin.role.perm_sections.id_section" @change="setStatus()">
                        <template v-for="(section, index_section) in admin.sections" :key="index_section">
                            <option :value="section.id">{{ section.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Дирекции</td>
                <td>
                    <select v-model="admin.role.perm_directions.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="admin.role.perm_directions.access == 'limited'" v-model="admin.role.perm_directions.id_direction" @change="setStatus()">
                        <template v-for="(direction, index_direction) in admin.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Предприятия</td>
                <td>
                    <select v-model="admin.role.perm_companies.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="admin.role.perm_directions.access == 'limited'" v-model="admin.role.perm_directions.id_direction" @change="setStatus()">
                        <template v-for="(direction, index_direction) in admin.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Профессии</td>
                <td>
                    <select v-model="admin.role.perm_professions.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="admin.role.perm_professions.access == 'limited'" v-model="admin.role.perm_professions.id_profession" @change="setStatus()">
                        <template v-for="(profession, index_profession) in admin.professions" :key="index_profession">
                            <option :value="profession.id">{{ profession.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Группы профессий</td>
                <td>
                    <select v-model="admin.role.perm_profession_groups.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Ограничен</option>
                        <option value="*">Все</option>
                    </select>
                    <select class="selected_two" v-if="admin.role.perm_profession_groups.access == 'limited'" v-model="admin.role.perm_profession_groups.id_profession" @change="setStatus()">
                        <template v-for="(profession, index_profession) in admin.professions" :key="index_profession">
                            <option :value="profession.id">{{ profession.name }}</option>
                        </template>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Роли</td>
                <td>
                    <select v-model="admin.role.perm_roles.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Пользователи</td>
                <td>
                    <select v-model="admin.role.perm_users.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Уведомления</td>
                <td>
                    <select v-model="admin.role.perm_notifications.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="*">Все</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>План-график</td>
                <td>
                    <select v-model="admin.role.perm_plan_schedule.access" @change="setStatus()">
                        <option value="-">Закрыт</option>
                        <option value="limited">Просмотр</option>
                        <option value="*">Редактирование</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Ведомость</td>
                <td>
                    <select v-model="admin.role.perm_statement.access" @change="setStatus()">
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
    border-collapse: collapse;
    margin-bottom: 20px;
}
th {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
td {
    padding: 5px 10px;
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    border: 1px solid #000;
}
input {
    padding: 5px 10px;
    font-size: 20px;
    width: 500px;
}
button {
    padding: 5px 10px;
    font-size: 20px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;
}
button:hover {
    transform: scale(1.05);
}
select {
    font-size: 20px;
    margin: 15px 10px;
    max-width: 300px;
}
.selected_two {
    width: 300px;
}
.green {
    color: black;
    background-color: #2a9630b0;
}
.red {
    background-color: #cc5e5e;
}
.add {
    margin: 15px 0 0 0;
}
.buttons {
    display: flex;
}
</style>