import axios from 'axios';
import { useAuth } from '@/stores/authStore';

const api_url = "http://localhost:8080/";

export async function setRoleFromBackend() {
  const { setRole } = useAuth();
  const res = await axios.get(api_url + 'auth/role', {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  setRole(res.data);
}

export async function loginUser(data: { email: string; password: string }): Promise<string> {
  try {
    const response = await axios.post<string>(api_url + 'auth/login', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    await setRoleFromBackend();
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Błędny email lub hasło');
    }
    throw new Error('Błąd logowania: ' + error.message);
  }
}

export async function logout() {
  try {
    await axios.get(api_url + "auth/logout", {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    const { setRole } = useAuth();
    setRole(null);
  } catch (err: any) {
    throw err;
  }
}

export async function registerUser
    (userData:
        { email: string, password: string, firstName: string,lastName: string, role: 'user' | 'teacher' | string }
    ):
    Promise<
        { id: number; email: string; name: string; role: string; }
    > 
{
    const response = await axios.post(
        api_url + 'auth/' + userData.role + '/register',
    {
        password: userData.password,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthDate: null
    },
    {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
);
    return response.data;
}

export async function setO2AuthRole(){
  try {
    const {tempRole} = useAuth()
    await axios.get(api_url + `auth/set_${tempRole.value}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    
    const { setRole } = useAuth();
    setRole(tempRole.value == "user" ? "[ROLE_USER]":"[ROLE_TEACHER]");
  } catch (err: any) {
    throw err;
  }
}

