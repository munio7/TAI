<template>
  <main>
    <div class="first">
      <div class="rating">
        <span style="font-size: 0.875rem;">
          ({{ props.ratingsCount ?? 0 }})
        </span>
        <div class="stars">
          <NIcon v-for="_ in Math.max(0, Number(props.ratingsCount) || 0)" :key="'full' + _">
            <FullStar />
          </NIcon>
          <NIcon v-for="_ in Math.max(0, 5 - (Number(props.ratingsCount) || 0))" :key="'empty' + _">
            <EmptyStar />
          </NIcon>
        </div>
      </div>
      <img :src="'src/assets/logo.svg'" alt="avatar" />
      <span>{{ props.name ?? 'Brak imienia' }} {{ props.surname ?? '' }}</span>
    </div>

    <div class="second ellipsis-multiline">
      {{ props.discription?.trim() ? props.discription : 'Brak opisu' }}
    </div>

    <div class="third">
      <span>
        {{
          props.priceFrom == null
            ? 'Brak informacji o cenie'
            : props.priceFrom + ' / godzinę'
        }}
      </span>
      <NButton round>Skontaktuj się</NButton>
      <NButton @click="handleLookupProfile" style="text-decoration: underline;" text>
        Zobacz profil
      </NButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import {
  Star48Filled as FullStar,
  Star48Regular as EmptyStar
} from '@vicons/fluent'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
  name?: string
  surname?: string
  avgRating?: number
  ratingsCount?: number
  priceFrom?: number
  imgPath?: string
  discription?: string
}>()

const router = useRouter()

function handleLookupProfile() {
  if (props.id) {
    router.push('/teacher/' + props.id)
  }
}
</script>

<style scoped>
main {
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 5px;
  height: fit-content;
  box-sizing: border-box;
  box-shadow: 2px 3px white;
}

main > div {
  flex: 1;
  height: 100%;
  padding: 0 1rem;
}

.first {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  max-width: 20%;
}

.rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

img {
  height: 100px;
}

.second {
  max-width: 60ch;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  word-break: break-word;
}

.third {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  max-width: fit-content;
}

.stars {
  display: flex;
  align-items: center;
}

.ellipsis-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
