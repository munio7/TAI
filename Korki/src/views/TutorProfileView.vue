<template>
  <div class="main">  
    <UserPanelHeader />
    <UserProfileCard 
      v-if="teacher && allInfo"
      :id="teacher.user.id"
      :firstName="teacher.user.firstName"
      :lastName="teacher.user.lastName"
      :avatar="'https://i.pravatar.cc/150?img=69'"
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
import UserPanelHeader from '@/components/UserPanelHeader.vue'
import { getMe } from '@/service/teacherService'

const allInfo = ref<any>(null);
const teacher = ref<any>(null);

onMounted(async () => {
  const result = await getMe();
  allInfo.value = result;
  teacher.value = result.teacher;
  console.log(teacher.value.user.firstName)
});

function getSubjects(): Array<{subjectId: number,name: string,price: number}> {
   return teacher.value.subjects.map(subjectEntry => ({
    subjectId: subjectEntry.subject.id,
    name: subjectEntry.subject.name,
    price: subjectEntry.schoolPrices[0]?.price ?? 0 
  }));
}

</script>
