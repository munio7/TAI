<template>
    <main>
        <div class="first">
            <div class="rating">
                {{rating}}
            </div>
            <img src="../assets/logo.svg">
            <span>{{ name }} {{ surname }}</span>
        </div>
        <div class="second">
            {{ discription }}
        </div>
        <div class="third">
            <span>{{priceFrom}} / h</span>
            <NButton round >Skontaktuj się</NButton>
            <NButton style="text-decoration: underline;" text >Zobacz profil</NButton>
        </div>

    </main>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';

const props = defineProps({
    name: String,
    surname: String,
    rating: Number,
    priceFrom: Number,
    imgPath: String,
    discription: String
})

</script>

<style scoped>
    main{
        padding: 1rem;
        display: flex;
        align-items: center;
        background-color: #d9d9d9;
        border-radius: 5px;
        height: fit-content;
        box-sizing: border-box;
        box-shadow: 2px 3px white;
    }
    main > div{
        flex: 1;
    }
    .first{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, 0.3);
    }
    img{
        max-height: 100px;
    }
    .second{
        max-width: 60ch;
    }
    .third{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
</style>