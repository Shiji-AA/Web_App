import axios from "axios"


const AxiosInstance = axios.create({
     baseURL:`${import.meta.env.VITE_PUBLIC_API_URL}/api/users`     
                           
})


// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
const token=localStorage.getItem("token");
//console.log(token,"token");
if(token !== null ){
    config.headers.Authorization=`Bearer ${token}`;
}   
 return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);



export { AxiosInstance};