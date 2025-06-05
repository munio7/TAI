import axios from 'axios';
const api_url = "http://localhost:8080/";

export async function getUserName(): Promise<{firstName:string,lastName: string}>{
    try {
        const response =  await axios.get(api_url + 'users/me',{headers: { 'Content-Type': 'application/json' },withCredentials: true})
        return {firstName: response.data.firstName, lastName: response.data.lastName}
    } catch (error) {
        throw error
    }
}