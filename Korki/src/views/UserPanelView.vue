<template>
    <main>
        <UserPanelHeader />
        <div class="facts">
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('student')" number="10" title="Uczniów" />
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('clock')" number="33" title="Godziny" />
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('review')" number="3" title="Opinie" />
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('money')" number="150zł" title="Zarobków" />
        </div>

        <div class="container">
            <div class="students-section block info">
                <h1>Uczniowie</h1>
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
            <div class="late-payments block info">
                <h1>Płatności</h1>
                <div class="payments-list">
                    
                    <NCard
                    v-for="(payment, index) in upcomingPayments"
                    :key="index"
                    class="payment"
                    >
                    <template #default>
                        <div class="payment-item">
                        <strong>{{ payment?.name }} {{ payment?.surname }}</strong><br />
                        <span>{{ payment?.date }} o {{ payment?.time }}</span><br />
                        <span>{{ payment?.subject }} – {{ payment?.price }} zł</span>
                        </div>
                    </template>
                    </NCard>
                </div>
            </div>

            <div class="lessons block info">
                <WeekCalendar>
                <template #default="{ date }">
                    <NTag
                        v-for="event in getEventsForDate(date)"
                        :key="event.studentId"
                        class="event"
                        size="small"
                        type="success"
                        :color="{ color: 'var(--blocks-color)', borderColor: 'none', textColor: 'black' }"
                        round
                    >
                        <template #default>
                        <template v-if="getStudentById(event.studentId)">
                            {{ event.time }} – 
                            {{ getStudentById(event.studentId)?.name }} 
                            {{ getStudentById(event.studentId)?.surname }} 
                            ({{ getStudentById(event.studentId)?.subject }})
                        </template>
                        <template v-else>
                            {{ event.time }} – Nieznany uczeń
                        </template>
                        </template>
                    </NTag>
                </template>
                </WeekCalendar>

            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import UserPanelHeader from '@/components/UserPanelHeader.vue'
import UserPanelBlockInfo from '@/components/UserPanelBlockInfo.vue'
import { NCalendar, NCard, NTag } from 'naive-ui'
import WeekCalendar from '@/components/WeekCalendar.vue'
import StudentBlock from '@/components/StudentBlock.vue'

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
</script>

<style scoped>
main {
    height: calc(100% - var(--navbar-height));
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* .content {
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 70%;
} */

.facts {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    max-height: 100px;
}

.container {
    display: flex;
    gap: 3rem;
    width: 80%;
    height: 70%;

}

.late-payments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  
}

.payments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding: 1rem;
}

.payment {
  background-color: var(--blocks-color);
  color: black;
  border-radius: 10px;
  border: none;
}

.payment-item {
  display: flex;
  flex-direction: column;
}


.students-section {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    /* max-height: 50%; */
}



.students-precise {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 1rem;
    padding: 0 0.5rem;

}

.lessons {
    display: flex;
    
}

h1 {
    color: white;
    border-bottom: 1px solid white;
}

.student {
    min-width: fit-content;
    border: none;
    color: white;
    background-color: var(--blocks-color);
    border-radius: 10px;
    width: 100%;
}

.fact {
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid transparent;
    transition: border 0.3s;
}

.info {
    border-radius: 10px;
}

.block {
    flex: 1;
    background-color: var(--secondary-color);
}

.event {
    height: 100px;
    font-size: 1rem;
}
</style>
