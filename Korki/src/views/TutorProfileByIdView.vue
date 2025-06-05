<template>
  <div class="main">
    <UserProfileCard 
      v-if="teacher && allInfo"
      :id="teacher.user.id"
      :firstName="teacher.user.firstName"
      :lastName="teacher.user.lastName"
      :avatar="`https://i.pravatar.cc/150?img=${randomProf}`"
      :subjects="getSubjects()"
      :locations="teacher.locations"
      :description="teacher.description"
      :reviews="allInfo.ratings"
        />
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import UserProfileCard from '@/components/TutorProfileCard.vue'
import { getTeacherById } from '@/service/teacherService'

const allInfo = ref<any>(null);
const teacher = ref<any>(null);
const randomProf = ref<number>(0)
const prop = defineProps<{id:string}>()

onMounted(async () => {
  const result = await getTeacherById(prop.id);
  allInfo.value = result;
  teacher.value = result.teacher;
  randomProf.value = Math.floor(Math.random() * 100)
});

function getSubjects(): Array<{subjectId: number,name: string,price: number}> {
   return teacher.value.subjects.map((subjectEntry: any) => ({
    subjectId: subjectEntry.subject.id,
    name: subjectEntry.subject.name,
    price: subjectEntry.schoolPrices[0]?.price ?? 0 
  }));
}

</script>

<style lang="css" scoped>

.main{
  width: 100vw;
  height: calc(100vh - var(--navbar-height));
  overflow: scroll;
  scrollbar-width: none;
  display: flex;
}

</style>
