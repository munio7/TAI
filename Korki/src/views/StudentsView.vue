<template>
    <main>
        <UserPanelHeader />
        <div class="students-section block info">
                <div class="students-precise">
                    <NCard v-for="student in students" :key="student.id" class="student">
                        <template #default>
                            <StudentBlock :id="Number(student.id)" :svgPath="getSvgPath('profile')"
                                :name="student.name" :surname="student.surname" :subject="student.subject"
                                :price="Number(student.price)" />
                        </template>
                    </NCard>
                </div>
            </div>
    </main>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import UserPanelHeader from '@/components/UserPanelHeader.vue'
import UserPanelBlockInfo from '@/components/UserPanelBlockInfo.vue'
import { NCalendar, NCard, NTag } from 'naive-ui'
import WeekCalendar from '@/components/DayCalendar.vue'
import StudentBlock from '@/components/StudentBlock.vue'
import { getStudents } from '@/service/teacherService'

const getSvgPath = (filename: string) => {
    return new URL(`../assets/${filename}.svg`, import.meta.url).href
}

function getStudentById(id: number) {
  return students.find(s => s.id === id)
}

const upcomingPayments = computed(() => {
  return mockEvents.map(event => {
    const student = getStudentById(event.studentId)
    if (!student) return null
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      date: event.date,
      time: event.time,
      price: student.price,
      subject: student.subject
    }
  }).filter(Boolean)
})

const mockEvents = [
  { studentId: 1, date: '2025-05-09', time: '09:00' },
  { studentId: 2, date: '2025-05-09', time: '10:30' },
  { studentId: 3, date: '2025-05-09', time: '14:00' },
  { studentId: 4, date: '2025-05-10', time: '11:00' },
  { studentId: 5, date: '2025-05-10', time: '12:30' },
  { studentId: 6, date: '2025-05-10', time: '15:00' },
  { studentId: 7, date: '2025-05-10', time: '16:30' },
  { studentId: 8, date: '2025-05-11', time: '08:00' },
  { studentId: 1, date: '2025-05-11', time: '09:30' },
  { studentId: 2, date: '2025-05-11', time: '13:00' },
  { studentId: 3, date: '2025-05-11', time: '14:30' },
  { studentId: 4, date: '2025-05-12', time: '10:00' },
  { studentId: 5, date: '2025-05-12', time: '11:30' },
  { studentId: 6, date: '2025-05-12', time: '13:00' },
  { studentId: 7, date: '2025-05-12', time: '14:30' },
  { studentId: 8, date: '2025-05-13', time: '09:00' },
  { studentId: 9, date: '2025-05-13', time: '10:30' },
  { studentId: 10, date: '2025-05-13', time: '13:00' },
  { studentId: 1, date: '2025-05-13', time: '14:30' },
  { studentId: 2, date: '2025-05-13', time: '16:00' }
]

const students = [
    { id: 1, name: 'Anna', surname: 'Kowalska', subject: 'Matematyka', price: 120 },
    { id: 2, name: 'Marek', surname: 'Nowak', subject: 'Angielski', price: 100 },
    { id: 3, name: 'Zofia', surname: 'Wiśniewska', subject: 'Biologia', price: 130 },
    { id: 4, name: 'Kamil', surname: 'Kowalczyk', subject: 'Chemia', price: 140 },
    { id: 5, name: 'Elżbieta', surname: 'Dąbrowska', subject: 'Fizyka', price: 150 },
    { id: 6, name: 'Tomasz', surname: 'Jankowski', subject: 'Polski', price: 90 },
    { id: 7, name: 'Natalia', surname: 'Szymańska', subject: 'Historia', price: 110 },
    { id: 8, name: 'Piotr', surname: 'Wójcik', subject: 'Geografia', price: 95 },
    { id: 9, name: 'Karolina', surname: 'Zielińska', subject: 'Informatyka', price: 160 },
    { id: 10, name: 'Paweł', surname: 'Lewandowski', subject: 'Anatomia', price: 180 },
]

function formatISODate(date: Date): string {
    return date.toISOString().split('T')[0]
}

function getEventsForDate(date: Date) {
    const iso = formatISODate(date)
    return mockEvents.filter(e => e.date === iso)
}


onMounted(async () =>{
    await getStudents()
})

</script>

<style scoped>
main{
    height: calc(100% - var(--navbar-height));
    overflow: scroll;

}
.students-section {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 60%;
    margin: 0 auto;

}
.students-precise {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 1rem;
    padding: 0 0.5rem;
    overflow: hidden;

}

.info {
    border-radius: 10px;
}
.student {
    min-width: fit-content;
    border: none;
    color: white;
    background-color: var(--blocks-color);
    border-radius: 10px;
    width: 100%;
}

</style>
