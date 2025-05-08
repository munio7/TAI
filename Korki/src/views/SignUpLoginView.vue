<template>
    <main>
    <div class="form">
      <div class="header">
        <h1 @click="handleChangeHeader('login')" id="login" :class="login ? 'focused' : '' " style="text-align: center;">Zaloguj</h1>
        <h1  @click="handleChangeHeader('signup')" id="signup" :class="signup ? 'focused' : '' "style="text-align: center;" >Zarejestruj</h1>
      </div>
      <n-form
          ref="formRef"
          :model="formValue"
          :rules="formRules"
      > 
        <n-form-item path="email">
          <n-input 
          v-model:value="formValue.email"
          placeholder="Email" 
          clearable 
          />
        </n-form-item>

        <n-form-item path="password">
          <n-input 
          v-model:value="formValue.password" 
          placeholder="Hasło" 
          clearable
          type="password"
          />
        </n-form-item>

      </n-form>
      
      <Transition>
        <n-checkbox v-if="login"
         v-model:checked="remberMe"
         :focusable="false"
         >
          Pamiętaj mnie
        </n-checkbox>
      </Transition>

      <div class="under-buttons">
        <n-button  @click="handleEnterClick">
          Dalej
        </n-button>

        <div class="divider">OR</div>
        <div @click="handleGoogleClick" class="google">
          <NIcon  size="large" color="#FFFFFF"
            style=
            "
              border: 1px solid white; 
              border-radius: 10px; 
              padding: 2px;
            "
          ><LogoGoogle>
            </LogoGoogle>
          </NIcon>
          <span>oogle</span>
      </div>
    </div>
      
    </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue'
import { NForm,NFormItem,NInput,NButton,NIcon,NCheckbox, type FormInst} from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import {LogoGoogle} from '@vicons/ionicons5'



const route = useRoute()

const login = computed(() => route.params.activePage === 'login')
const signup = computed(() => route.params.activePage === 'signup')

const handleChangeHeader = ( key: string) => {
  router.push(
    {
      name:'who-are-you',
      params: { activePage: key } 
    })
    
    if (!(key == route.params.activePage))
    {
      formValue.value.email = ''
      formValue.value.password = ''
      remberMe.value = false
    }
  }
const formRef = ref<FormInst | null>(null)
const formValue = ref(
  { 
    email: '',
    password: '' 
  })

const formRules= ref({
  email: [{
      required: true,
      message: '',
      trigger: 'manual'
  },
  {
      type: 'email' as const,
      message: 'Pole musi być adresem email',
      trigger: 'manual'
  }],
  password: [{
    validateFirst: true,
    required: true,
    message: "",
    trigger: 'type'
  },
  {
      validator: (rule, value : string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
        if (!regex.test(value)) {
          return new Error('Hasło musi mieć min. 8 znaków, dużą i małą literę oraz cyfrę')
        }
        return true
      },
      trigger: 'manual'
    }]
  })

const remberMe = ref(false)
  const router = useRouter()

  const handleEnterClick = (e: MouseEvent | KeyboardEvent) =>{
    e.preventDefault()
    formRef.value?.validate((errors) => {
      if (!errors) {
        alert("Email: " + formValue.value.email + " Hasło: " + formValue.value.password)
      }
    })
  }
  const handleGoogleClick = () =>{

  }
</script>

<style scoped>

:deep(*){
  --n-font-size: .9rem !important; 
  --n-text-color-hover: rgb(224, 224, 230) !important;
  --n-text-color-pressed: rgb(224, 224, 230) !important;
  --n-text-color-focus: rgb(224, 224, 230) !important;
  --n-text-color-disabled: rgb(51, 54, 57) !important;
  --n-border: 0px solid rgb(224, 224, 230) !important;
  --n-border-hover: 1px solid rgb(224, 224, 230) !important;
  --n-border-pressed: 1px solid rgb(224, 224, 230) !important;
  --n-border-focus: 1px solid rgb(224, 224, 230) !important;
  --n-border-disabled: 1px solid rgb(224, 224, 230) !important;
  --n-ripple-color: rgb(224, 224, 230) !important;
  --n-color-checked: transparent !important;
  --n-text-color:rgb(224, 224, 230) !important;
  --n-border-checked: 1px solid rgb(224, 224, 230) !important;
  --n-border-focus: 1px solid rgb(224, 224, 230) !important;
  --n-color-focus: transparent !important;
  --n-color-focus-error: transparent !important;
}

main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - var(--navbar-height));
}
.header{
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

}

.header > h1{
 flex: 1;
 transition: border-bottom 0.5s ease, color 0.5s ease;
 border-bottom: 2px solid transparent;
 cursor: pointer;
}

.focused{
  border-bottom: 2px solid #359DFF !important;
  color: white;
}

h1{
  display: inline;
  margin: 0px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: grey;
  font-weight:300;
  margin: 0;
}

.form{
  /* min-width: fit-content;
  width: 300px; */
  width: clamp(200px,50vw,300px);
  height: fit-content;
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  padding: 2rem;
  padding-top:0;

}

:deep(.n-form){
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.under-buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.google{
  display: flex;
  color: white;
  cursor: pointer;
}

:deep(.n-checkbox-box){
  --n-size: 1rem;
  background-color: var(--secondary-color);
  border: 1px solid rgb(224, 224, 230) !important;
  --n-box-shadow-focus: 0 0 0 2px transparent;
  
}


.divider {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  font-weight: lighter;
  font-size: 0.7rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 5px;
}

:deep(.forgot-password *) {
  color: #359DFF !important;
  font-weight: normal;
}
:deep(.n-button){
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}
:deep(.n-input){
  background-color: transparent;
  border: 1px dotted white;
}
:deep(.n-form-item-label__text){
  color: white;
  font-weight: bold;
}

:deep(.n-form-item){
  display: block;
  width: 100%;
  margin-bottom: .5rem;
}
:deep(div.n-form-item-feedback-wrapper){
  --n-feedback-height: 12px;
}

</style>