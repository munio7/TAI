<script setup lang="ts">
import {ref} from 'vue';
import { NCheckbox, NSelect, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const isOnline = ref(false);

const handleOnline = () => {
  isOnline.value = !isOnline.value;
};

const router = useRouter()
const goToCatalog = () => {
  router.push("/catalog")
}

const subjectOptions = [{
  label: 'Najczęściej wybierane:',
  value: 'none',
  disabled: true
},
{
  label: 'Matematyka',
  value: 'matematyka',
},
{
  label: 'Angielski',
  value: 'angielski',
},
{
  label: 'Polski',
  value: 'polski',
},
{
  label: 'Geografia',
  value: 'geografia',
},
{
  label: 'Inne:',
  value: 'none',
  disabled: true
},
]

const locOptions = [{
  label: 'Najczęściej wybierane:',
  value: 'none',
  disabled: true
},
{
  label: 'Warszawa',
  value: 'warszawa',
},
{
  label: 'Gdańsk',
  value: 'gdansk',
},
{
  label: 'Kraków',
  value: 'krakow',
},
{
  label: 'Lublin',
  value: 'lublin',
},
{
  label: 'Inne:',
  value: 'none',
  disabled: true
},
]



</script>

<template>
  <main>
    <div class="content">
      <header>
        Nie mamy wszystkiego.<br><span>Mamy wszystko, czego potrzebujesz.</span>
      </header>
      <div id="search-bar">
        <div id="heading">
          Znajdz korepetytora
        </div>
        <div class="selection-options">
          <div class="select" id="subject">
            <NSelect placeholder="Przedmiot" :options="subjectOptions" />
          </div>
          <div class="select" id="localization">
            <NSelect placeholder="Lokalizacja" :options="locOptions" :disabled="isOnline" :class="isOnline ? 'online' : ''"/>
          </div>
          <div id="check-box">
            <NCheckbox @click="handleOnline"/>
            <span>Online</span>
          </div>
          <div id="search">
            <NButton @click="goToCatalog" round >Szukaj</NButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
*{
  color: white;
}

  main{
    height: calc(100% - var(--navbar-height));
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--main-bg-color);
  }
  .content{
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 80vw;

  }
  
  header{
    word-break: break-word;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  header > span{
    color: var(--text-accent-color);
    text-wrap: wrap;
  }
  #search-bar{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--secondary-color);
    border: 1px solid white;
    height: fit-content;
    border-radius: 10px;
    padding: 2rem;
  }

  #search-bar > #heading{
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .selection-options{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .online{
    background-color: red;
  }

  .select{
    flex: 1;
  }

  #check-box{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: fit-content;
  }


</style>
