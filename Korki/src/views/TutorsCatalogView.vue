<script setup lang="ts">
import { ref, computed } from 'vue'
import Tutor from '@/components/Tutor.vue';
import { NButton, NIcon, NInput, NRate, NSkeleton, NSlider } from 'naive-ui'
import { useRouter } from 'vue-router'

const priceRange = ref<[number, number]>([50, 150])
const minStars = ref(0) 
const sortAscending = ref(true)


const selectedSubjects = ref<string[]>([]);
const searchQuery = ref('');
const allSubjects = ref(["Matematyka", "Fizyka","Historia", "Chemia","Informatyka","Polski","Biologia","Geografia","Angielski"]);

const filteredTutors = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  const result = tutors.value.filter(tutor => {
    const matchesQuery =
      tutor.name.toLowerCase().includes(query) ||
      tutor.surname.toLowerCase().includes(query) ||
      tutor.discription.toLowerCase().includes(query)

    const matchesSubjects =
      selectedSubjects.value.length === 0 ||
      selectedSubjects.value.some(subject => tutor.subjects.includes(subject))

    const matchesPrice =
      tutor.priceFrom >= priceRange.value[0] &&
      tutor.priceFrom <= priceRange.value[1]

    const matchesRating =
      tutor.rating / 20 >= minStars.value

    return matchesQuery && matchesSubjects && matchesPrice && matchesRating
  })

  return result.sort((a, b) => sortAscending.value
    ? a.priceFrom - b.priceFrom
    : b.priceFrom - a.priceFrom)
})



function toggleSubject(subject: string) {
    const index = selectedSubjects.value.indexOf(subject);
    if (index === -1) {
        selectedSubjects.value.push(subject);
    } else {
        selectedSubjects.value.splice(index, 1);
    }
} 

const tutors = ref([
  { name: "Zosia", surname: "Okrasa", rating: 85, ratingsCount: 34, priceFrom: 120, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Matematyka", "Fizyka"] },
  { name: "Maciej", surname: "Wrotniak", rating: 60, ratingsCount: 12, priceFrom: 70, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Chemia", "Biologia"] },
  { name: "Krystian", surname: "Wrotniak", rating: 75, ratingsCount: 19, priceFrom: 130, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Informatyka", "Matematyka"] },
  { name: "Kamil", surname: "Trojanowski", rating: 50, ratingsCount: 9, priceFrom: 90, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Historia", "WOS"] },
  { name: "Anna", surname: "Nowak", rating: 95, ratingsCount: 108, priceFrom: 100, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Angielski", "Polski"] },
  { name: "Tomasz", surname: "Lis", rating: 65, ratingsCount: 15, priceFrom: 60, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Matematyka", "Angielski"] },
  { name: "Magda", surname: "Kowalczyk", rating: 70, ratingsCount: 27, priceFrom: 110, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Geografia", "Biologia"] },
  { name: "Paweł", surname: "Zieliński", rating: 55, ratingsCount: 8, priceFrom: 50, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Fizyka", "Chemia"] },
  { name: "Ewa", surname: "Kaczmarek", rating: 100, ratingsCount: 189, priceFrom: 150, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Polski", "Historia"] },
  { name: "Jakub", surname: "Maj", rating: 80, ratingsCount: 42, priceFrom: 140, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Matematyka", "Programowanie"] },
  { name: "Katarzyna", surname: "Dąbrowska", rating: 45, ratingsCount: 6, priceFrom: 95, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Francuski", "Polski"] },
  { name: "Robert", surname: "Jankowski", rating: 70, ratingsCount: 21, priceFrom: 60, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["WOS", "Historia"] },
  { name: "Julia", surname: "Wójcik", rating: 60, ratingsCount: 17, priceFrom: 75, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Matematyka", "Geografia"] },
  { name: "Adam", surname: "Sikora", rating: 90, ratingsCount: 91, priceFrom: 135, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Informatyka", "Angielski"] },
  { name: "Natalia", surname: "Baran", rating: 55, ratingsCount: 13, priceFrom: 85, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Biologia", "Chemia"] },
  { name: "Grzegorz", surname: "Michalak", rating: 50, ratingsCount: 5, priceFrom: 100, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Polski", "WOS"] },
  { name: "Marta", surname: "Kubiak", rating: 95, ratingsCount: 165, priceFrom: 150, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Angielski", "Niemiecki"] },
  { name: "Damian", surname: "Król", rating: 65, ratingsCount: 24, priceFrom: 105, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Matematyka", "Fizyka", "Programowanie"] },
  { name: "Izabela", surname: "Pawlak", rating: 90, ratingsCount: 86, priceFrom: 130, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Chemia", "Fizyka"] },
  { name: "Bartosz", surname: "Sadowski", rating: 40, ratingsCount: 7, priceFrom: 55, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Geografia", "Historia"] },
  { name: "Aleksandra", surname: "Czarnecka", rating: 75, ratingsCount: 31, priceFrom: 125, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Biologia", "Angielski"] },
  { name: "Michał", surname: "Urban", rating: 85, ratingsCount: 58, priceFrom: 140, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Programowanie", "Informatyka"] },
  { name: "Weronika", surname: "Górska", rating: 70, ratingsCount: 22, priceFrom: 90, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Francuski", "Historia"] },
  { name: "Patryk", surname: "Wesołowski", rating: 60, ratingsCount: 18, priceFrom: 80, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["WOS", "Angielski"] },
  { name: "Joanna", surname: "Szczepańska", rating: 50, ratingsCount: 10, priceFrom: 65, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Chemia", "Matematyka"] },
  { name: "Filip", surname: "Zawadzki", rating: 95, ratingsCount: 132, priceFrom: 145, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Polski", "Angielski"] },
  { name: "Karolina", surname: "Wilk", rating: 45, ratingsCount: 9, priceFrom: 70, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Niemiecki", "WOS"] },
  { name: "Łukasz", surname: "Kania", rating: 85, ratingsCount: 49, priceFrom: 115, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Historia", "Polski"] },
  { name: "Sandra", surname: "Piotrowska", rating: 80, ratingsCount: 36, priceFrom: 125, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Matematyka", "Informatyka"] },
  { name: "Mateusz", surname: "Olszewski", rating: 90, ratingsCount: 78, priceFrom: 150, imgPath: "../assets/book-cover.jpg", discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, laborum. Dolor officiis non voluptatibus. Enim reprehenderit, inventore corrupti officia tempora fugit ratione magni consequatur id voluptate voluptatibus, totam illo neque?", subjects: ["Fizyka", "Angielski"] }
]);




</script>


<template>
    <div class="main">
        <div class="filters-and-catalog">
            <div class="filters">
                <span style="width: 100%;font-size: 1rem;color: white; border-bottom: 1px solid white;">Filtry</span>
                <div class="filter">
                    <n-input v-model:value="searchQuery" placeholder="Wyszukaj korepetytora" clearable
                        style="width: 100%; max-width: 300px;" />
                    <div class="subjects">    
                        <n-button :focusable="false" v-for="subject in allSubjects" :key="subject" round @click="toggleSubject(subject)"
                            :type="selectedSubjects.includes(subject) ? 'primary' : 'default'">
                            {{ subject }}
                        </n-button>
                    </div>
                    <div style="width: 100%;">
                        <span style="color: white;">Cena za godzinę: {{ priceRange[0] }} - {{ priceRange[1] }} zł</span>
                        <NSlider
                            v-model:value="priceRange"
                            range
                            :min="50"
                            :max="150"
                            :step="5"
                            style="margin-top: 0.5rem;"
                        />
                    </div>
                    <div class="min-rate" style="width: 100%;">
                        <span style="color: white;">Minimalna ocena:</span>
                        <NRate allow-half v-model:value="minStars" :count="5" allow-clear />
                    </div>
                    <n-button :focusable="false" @click="sortAscending = !sortAscending" round>
                        Sortuj po cenie: {{ sortAscending ? 'rosnąco' : 'malejąco' }}
                    </n-button>
                </div>
            </div>
            <div class="catalog">
                <Tutor v-for="(tutor, index) in filteredTutors" :rating="tutor.rating" :ratings-count="tutor.ratingsCount" :name="tutor.name"
                    :surname="tutor.surname" :price-from="tutor.priceFrom" :discription="tutor.discription"
                    :key="index" />
            </div>
        </div>
    </div>
</template>


<style scoped>
:deep(.filters .n-button){
    color: white;
}

.main {
    height: calc(100% - var(--navbar-height));
    /* width: 100%; */
}

.filters-and-catalog {
    --padding: 1rem;

    border-radius: 10px;
    padding: var(--padding);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    height: 100%;
    box-sizing: border-box;
    width: 70%;
    margin: 0 auto;
}

.filters-and-catalog>* {
    width: 100%;
    background-color: var(--secondary-color);
}

.filters {
    border-radius: 10px;
    padding: 10px;
    display: flex;
    min-width: min-content;
    height: fit-content;
    flex: 1 1 25%;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
}

.filter {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}
.subjects{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.subjects > :deep(*){
    flex: 1;
    text-align: center;
}
.min-rate{
    display: flex;
    gap: 1rem;
}

.catalog {
    border-radius: 10px;
    flex: 1 1 70%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow: scroll;
    scrollbar-width: none;
    box-sizing: border-box;
}
</style>