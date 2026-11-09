import axios from "axios"


const AxiosInstance = axios.create({
     baseURL:`${import.meta.env.VITE_PUBLIC_API_URL}/api/users`     
                           
})



export { AxiosInstance};