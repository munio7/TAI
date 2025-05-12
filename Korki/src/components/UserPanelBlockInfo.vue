<template>
    <div class="main">
        <div class="icon">
            <NAvatar size="large" round color="transparent" :src="props.svgPath"></NAvatar>
        </div>
        <div class="info">
            <span id="number">{{ props.number }}</span>
            <span id="title"> {{ props.title }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui';


const props = defineProps({
    svgPath : String,
    number : String,
    title : String
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
    justify-content:center;
    align-items: center;
    gap: 1rem;
}
.info{
    display: flex;
    flex-direction: column;
}
    span{
        color: white;
        text-align: center;
    }
    #number{
        font-size: 2rem;
        font-weight: bold;
    }
    #title{
        font-size: 1rem;
    }
</style>