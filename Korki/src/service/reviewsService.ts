import axios from 'axios';
import { useAuth } from '@/stores/authStore';
import { error } from 'naive-ui/es/_utils/naive/warn';

const {role} = useAuth()

const header = {        
      headers: {
            'Content-Type': 'application/json'
        },
      withCredentials: true
   }
const api_url = "http://localhost:8080/";

export async function addReview(data:{rate:number,teacherId:string,content:string}) {
    try {
        axios.post(api_url + "rating/add",data,header)
    } catch (error) {
        
    }
}