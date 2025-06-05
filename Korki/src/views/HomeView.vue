<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { NCheckbox, NSelect, NButton, collapseItemProps, NDropdown } from 'naive-ui';
import { useRouter } from 'vue-router';
import { couldStartTrivia } from 'typescript';

const isOnline = ref(false);

const handleOnline = () => {
  isOnline.value = !isOnline.value;
};

const router = useRouter()
const goToCatalog = () => {
  router.push("/catalog")
}

const subjectOptions = ref()
const locOptions = ref()

async function getAllSubject() {
  try {
    const response = await fetch("http://localhost:8080/subject/all")
    const data =  await response.json()
    subjectOptions.value = data.map((subject:any) =>(
      {
        label: subject.name,
        key: subject.id
      }
  ))
  } catch (err) {
    console.error(err);
  }
}

interface Location {
  id: string,
  town: string;
  district: string | null;
}

async function getAllLocations() {




  locOptions.value = options;
}

const choosenSubject = ref("Wybierz przedmiot")

const handleSubjectSelection = (key: string | number, option ) => {
  choosenSubject.value = option.label
}
const choosenLocalization = ref("Wybierz lokalizację")

const handleLocSelection = (key: string | number, option ) => {
  choosenLocalization.value = option.label
}



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
          <div class="select" id="subject" @click="getAllSubject()">
            <span>Przedmiot:</span>
            <NDropdown @select="handleSubjectSelection" :options="subjectOptions">
              <n-button text >{{ choosenSubject }}</n-button>
            </NDropdown>
          </div>
          <div class="select" :class="{online:isOnline}" id="localization" :disabled="isOnline" @click="getAllLocations()" >
            <span>Lokalizacja:</span>
            <NDropdown @select="handleLocSelection" :options="locOptions" >
              <n-button text>{{ choosenLocalization }}</n-button>
            </NDropdown>

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

  .selection-options span{
    font-weight: bold;
    font-size: 1rem;
  }

  .online{
    border: 1px solid gray !important;
    color: gray !important;
  }

  .select{
    border: 1px solid white;
    flex: 1;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-radius: 10px;

  }

  #check-box{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: fit-content;
  }
  :deep(.select .n-button){
    font-size: 1rem;
    font-style: italic;
    color: var(--text-accent-color);
  }



</style>
