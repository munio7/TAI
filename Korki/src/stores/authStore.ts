import { TemperaturePlus } from '@vicons/tabler';
import { ref, computed } from 'vue';

const role = ref<string | null>(sessionStorage.getItem('role'));
const tempRole = ref<string | null>(null)
export const useAuth = () => {
  const logged = computed(() => !!role.value);

  const setRole = (newRole: string | null) => {
    role.value = newRole;
    if (newRole) {
      sessionStorage.setItem('role', newRole);
    } else {
      sessionStorage.removeItem('role');
    }
  };

  const refreshRole = () => {
    role.value = sessionStorage.getItem('role');
  };

  const setTempRole = (temprole: string | null) =>{ tempRole.value = temprole}
  

  return {
    role,
    logged,
    tempRole,
    setTempRole,
    setRole,
    refreshRole
  };
};
