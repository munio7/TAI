<script setup lang="ts">
import { ref, computed,onMounted,watch } from 'vue'
import Tutor from '@/components/Tutor.vue';
import { useRoute } from 'vue-router';
import { NButton, NIcon, NInput, NRate, NSkeleton, NSlider } from 'naive-ui'
import { fetchTeachers,fetchSubjects } from '@/service/teacherService';


const priceRange = ref<[number, number]>([50, 150])
// const minStars = ref(0) 
const sortAscending = ref(true)


const selectedSubjectId = ref<number | null>(null);
// const searchQuery = ref('');
const allSubjects = ref<SubjectOption[]>([]);

// const filteredTutors = computed(() => {
//   const query = searchQuery.value.toLowerCase().trim()

//   const result = teachers.value.filter(tutor => {
//     const matchesQuery =
//       tutor.firstName.toLowerCase().includes(query) ||
//       tutor.lastName.toLowerCase().includes(query) ||
//       tutor.description.toLowerCase().includes(query)

//     const matchesSubjects =
//       selectedSubjects.value.length === 0 ||
//       selectedSubjects.value.some(subject => tutor.subjects.includes(subject))

//     const matchesPrice =
//       tutor.priceFrom >= priceRange.value[0] &&
//       tutor.priceFrom <= priceRange.value[1]

//     const matchesRating =
//       tutor.rating / 20 >= minStars.value

//     return matchesQuery && matchesSubjects && matchesPrice && matchesRating
//   })

//   return result.sort((a, b) => sortAscending.value
//     ? a.priceFrom - b.priceFrom
//     : b.priceFrom - a.priceFrom)
// })



function toggleSubject(subjectId: number) {
  selectedSubjectId.value = selectedSubjectId.value === subjectId ? null : subjectId
  filter.value.subjectId = selectedSubjectId.value
}



interface TeacherFilter {
  locationId: number[] | null;
  subjectId: number | null;
  schoolId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  page: number;
  size: number;
}
interface SubjectOption {
  id: number
  name: string
}

interface TeacherSearchResponseDto {
  firstName: string;
  lastName: string;
  id: string;
  price: number | null;
  avgRating: number | null;
  description: string;
  ratingCount: number
}

const teachers = ref<TeacherSearchResponseDto[]>([]);
const filter = ref<TeacherFilter>({
  locationId: null,
  subjectId: selectedSubjectId.value,
  schoolId: null,
  minPrice: null,
  maxPrice: null,
  page: 0,
  size: 10
});


async function fetchFilteredTeachers() {
  teachers.value = await fetchTeachers(filter.value) ?? []
  console.log(teachers.value)
}
const randomProf = ref<number>(0)
const route = useRoute()
onMounted(async () => {
randomProf.value = Math.floor(Math.random() * 100)
  allSubjects.value = await fetchSubjects()
  await fetchFilteredTeachers()
})

watch(filter, fetchFilteredTeachers, { deep: true })
watch(priceRange, (range) => {
  filter.value.minPrice = range[0]
  filter.value.maxPrice = range[1]
})




</script>


<template>
    <div class="main">
        <div class="filters-and-catalog">
            <div class="filters">
                <span style="width: 100%;font-size: 1rem;color: white; border-bottom: 1px solid white;">Filtry</span>
                <div class="filter">
                    <!-- <n-input v-model:value="searchQuery" placeholder="Wyszukaj korepetytora" clearable
                        style="width: 100%; max-width: 300px;" /> -->
                    <div class="subjects">    
                        <n-button :focusable="false" v-for="subject in allSubjects" :key="subject.id" round @click="toggleSubject(subject.id)"
                            :type="selectedSubjectId == subject.id ? 'primary' : 'default'">
                            {{ subject.name }}
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
                    <!-- <div class="min-rate" style="width: 100%;">
                        <span style="color: white;">Minimalna ocena:</span>
                        <NRate allow-half v-model:value="minStars" :count="5" allow-clear />
                    </div> -->
                    <n-button :focusable="false" @click="sortAscending = !sortAscending" round>
                        Sortuj po cenie: {{ sortAscending ? 'rosnąco' : 'malejąco' }}
                    </n-button>
                </div>
            </div>
            <div class="catalog">
                <Tutor v-for="(teacher, index) in teachers" :avgRating="teacher.avgRating!" :ratingsCount="teacher.ratingCount" :name="teacher.firstName"
                    :surname="teacher.lastName" :price-from="teacher.price!" :discription="teacher.description" :id="teacher.id" />
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