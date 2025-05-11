<template>
  <main>
    <div class="first">
      <div class="rating">
        <span style="font-size: 0.875rem;">({{ ratingsCount }})</span>
        <n-rate readonly :value="props.rating / 20" :count="5" size="20" />
    </div>
      <img src="../assets/logo.svg">
      <span>{{ name }} {{ surname }}</span>
    </div>
    <div class="second">
      {{ discription }}
    </div>
    <div class="third">
      <span>{{priceFrom}} / h</span>
      <NButton round>Skontaktuj się</NButton>
      <NButton style="text-decoration: underline;" text>Zobacz profil</NButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NButton, NRate } from 'naive-ui'

const props = defineProps({
  name: String,
  surname: String,
  rating: Number,
  ratingsCount: Number,
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
        height: 100%;
        padding: 0 1rem;
    }
    .first{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
        max-width: 20%;
    }
    .rating{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    img{
        max-height: 100px;
    }
    .second{
        max-width: 60ch;
        border-left: 1px solid rgba(0, 0, 0, 0.3);
        border-right: 1px solid rgba(0, 0, 0, 0.3);
    }
    .third{

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:space-around;
        gap: 0.5rem;
        max-width: fit-content;
    }
</style>