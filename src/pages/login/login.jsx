import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

import logo from "/src/shared/images/logo.png";
import { logIn } from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const handleLogin = async () => {
    let userData = {
      userName: email,
      password: password,
    };

    try {
      await dispatch(logIn(userData));
      toast.success("Login successful");
      goTo("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) goTo("/dashboard");
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-[#1c2536] w-[50%] h-[100vh] hidden md:flex items-center pl-0 md:pl-[5%]">
        <div className="">
          <p className="text-2xl text-white font-medium">Welcome to admin panel</p>
          <div>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
      <div className="bg-white md:w-[50%] h-[75vh] md:h-[100vh] flex items-center justify-center md:justify-start pl-0 md:pl-[10%]">
        <div className="flex flex-col gap-5">
          <h2 className="text-[#111927] text-2xl font-bold">Log in</h2>
          <div className=" space-y-5">
            <div className="p-3 border border-[#BFBFBF] rounded-[4px] w-[300px]">
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full outline-none border-none" type="text" placeholder="Email" />
            </div>
            <div className="p-3 border border-[#BFBFBF] rounded-[4px] w-[300px]">
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full outline-none border-none" type="text" placeholder="Password" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Link to="/" className="text-center text-[#2563EB] font-medium">
              Forgot Password?
            </Link>
            <Button onClick={handleLogin} variant="contained" className="w-full !normal-case">
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
