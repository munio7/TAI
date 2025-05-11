<template>
    <div class="main">
        <div class="info">
            <div class="icon">
                <NAvatar size="large" round color="transparent" :src="props.svgPath"></NAvatar>
            </div>
            <div class="name"> 
                <span>{{ props.name }}</span>
                <span>{{ space }}</span>
                <span>{{ props.surname }}</span>
            </div>
        </div>
        <div class="lesson">
            <span id="subject">{{ props.subject }}</span>
            <span>{{ space }}</span>
            <span id="price"> {{ props.price }} zł</span>
        </div> 

    </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui';

const space = " "
const props = defineProps({
    id : Number,
    svgPath : String,
    name : String,
    surname : String,
    subject : String,
    price : Number
})

</script>

<style scoped>
*{
    user-select: none;
}
.main{
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content:space-between;
    align-items: center;
    gap: 1rem;
}
.info{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}
    span{
        color: black;
        text-align: center;

    }
    .name > span{
        font-size: 1rem;
        font-weight: normal;
    }
    .lesson{
        font-size: 1rem;
        text-align: center;

    }
</style>