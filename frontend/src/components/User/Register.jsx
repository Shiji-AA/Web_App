import { useState } from "react";
import { AxiosInstance } from "../../../api/axiosInstance";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate=useNavigate();
    const[name,setName]=useState("");
       const[email,setEmail]=useState("")
          const[password,setPassword]=useState("")


  const handleSubmit=(e)=>{
    e.preventDefault();
    AxiosInstance.post("/register",{name,email,password})
    // -------------------------------------------------------------
    .then((response)=>{
      if(response.data){
         console.log(response.data,"response");
          toast.success(response.data.message);
         navigate("/login")

      }
    })
  }
 
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
         
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}          
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
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
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
         
          
        </p>
      </div>
    </main>
  );
}