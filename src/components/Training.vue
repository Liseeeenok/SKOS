<script setup>
import { verify, preLoad } from '../helpers/API.js';
//-------------AUTH-------------------
verify();
preLoad();
//------------------------------------
</script>

<template>
    <div class="container">
        <router-link to="/training/development/view">
            <div class="block worker">
                <div>
                    Проф. развитие
                </div>
            </div>
        </router-link>
        <router-link to="/training/statement/view">
            <div class="block statement">
                <div>
                    Ведомость
                </div>
            </div>
        </router-link>
        <router-link to="/training/report/view">
            <div class="block none">
                <div>
                    Отчет (в разработке)
                </div>
            </div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
$g: .75em;

.container {
    margin: 30px auto 0px;
    max-width: 1660px;
    box-sizing: border-box;
	display: grid;
	grid-gap: $g;
	grid-template-columns: repeat(auto-fit, 15em);
	padding: $g;

    .block {
        height: 10em;
        background: white;
        border-radius: 4px;
        box-shadow: 2px 2px 5px rgba(#000, .7);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: 0.2s ease-out;
        padding: 10px;

        &:first-child {
            grid-column: 1/ -1;
        }

        &:hover {
            background-color: rgb(222, 222, 222);
        }

        div {
            width: 100%;
            text-align: center;
            color: black;
            font-size: 20px;
        }

        &.worker:before {
            opacity: 0.2;
            content: "";
            width: 90px;
            height: 100px;
            background: url('../assets/worker.png');
            background-repeat: no-repeat;
            background-size: contain;
        }

        &.statement:before {
            opacity: 0.2;
            content: "";
            width: 90px;
            height: 100px;
            background: url('../assets/statement.svg');
            background-repeat: no-repeat;
            background-size: contain;
        }

        &.none:before {
            opacity: 0.2;
            content: "";
            width: 90px;
            height: 100px;
            background: url('');
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
}
</style>
