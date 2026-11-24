
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../Redux/Slices/AuthSlice";


export default function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.auth.userdata);
    console.log(user,"user INFORMATION")

    useEffect(()=>{
  if(user){
    navigate("/home")
  }
})



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit=(e)=> {
  e.preventDefault();
AxiosInstance.post("/login",{email,password})

// --------------------------------------------------------backend

.then((response)=>{
if(response.data){
    //console.log(response.data,"reponseeeeeeeeeeeeeeeeeeee")
  localStorage.setItem("token",response.data.token)
  dispatch(setUserInfo(response.data.user))
  toast.success(response.data.message); 
  navigate("/home");

}
})
}
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Login to Your Account
          </h1>
        </div>

        <form  onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Not Registered?
          <Link
            to="/register"
            className="ml-1 text-blue-600 font-semibold hover:underline"
          >
            register
          </Link>
        </p>
      </div>
    </main>
  );
}
