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

export async function addSlots(data : Array<{date: string, timeList: string[]}>){
    axios.post(api_url + "lesson/add",data,header);
}

export async function getAllSlots(teacherId: string){
    const response =  await axios.get(api_url + `lesson/all/${teacherId}`,{
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return response.data;
}

export async function getPendingSlots(): Promise<Array<{

  lessonId: number,
  sFirstName: string,
  sLastName: string,
  tFirstName: string,
  tLastName: string,
  subject: string,
  price: number,
  date: string,
  time: string,
  tAccepted: boolean,
  sAccepted: boolean
}>>{
    const response =  await axios.get(api_url + `lesson/pending`,header);
  return response.data;
}

export async function bookSlot(data: {mode:string,userID:string | null,subjectID: number,schoolID:number,slotIDs:Array<number>}){
  try{
  var path = ''
  console.log(role)
  if(role.value == "[ROLE_USER]"){
    path = `lesson/book/${data.mode}/${data.subjectID}/${data.schoolID}`
  }else if(role.value == "[ROLE_TEACHER]"){
    path = `lesson/book/${data.mode}/${data.userID}/${data.subjectID}/${data.schoolID}`
    console.log("error")
    throw error
    }
    console.log(path)
    axios.patch(api_url + path,data.slotIDs,header)
  } catch (error) {
    console.log(error)
  }
}

export async function confirmLessons(lessonsId:Array<number>){
  try {
    axios.patch(api_url + "lesson/confirm",lessonsId,header)
  } catch (error) {
    
  }
}
export async function declineLessons(lessonsId:Array<number>){
  try {
    axios.patch(api_url + "lesson/decline",lessonsId,header)
  } catch (error) {
    
  }
}