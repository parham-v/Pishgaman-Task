"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const sendUserInfos = async () => {
    const user = { username, password };
    const result = await axios
      .post("https://exam.pishgamanasia.com/webapi/Account/Login", user)
      .catch((err) => err);
    return result;
  };

  const signIn = () => {
    toast.promise(sendUserInfos, {
      loading: "لطفا منتظر بمانید...",
      success: (result): any => {
        if (result.status === 200 && result.data.status === 1) {
          setUsername("");
          setPassword("");
          toast.success(`${username} عزیز، خوش آمدید !`);
          localStorage.setItem("user-token", result.data.data.userToken);
          router.push("/map");
        } else if (result.status === 200 && result.data.status === 0) {
          toast.error("نام کاربری یا رمز عبور اشتباه است !");
        } else if (result.status === 400) {
          toast.error("لطفا اطلاعات خواسته شده را وارد نمایید !");
        } else {
          toast.error("خطای سرور !");
        }
      },
      error: "لطفا لحظاتی بعد مجددا تلاش کنید..."
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#000000] to-[#454545] font-DanaMedium">
      <div className="flex flex-col items-center w-[24rem] p-5 rounded-3xl bg-white bg-opacity-10">
        {/* ---------------------------- Login Form Avatar ---------------------------- */}
        <Image
          src="/images/default.jpg"
          className="size-[5.4rem] rounded-full object-cover shadow-md mb-3"
          width={150}
          height={150}
          priority
          alt="profile"
        />
        <span className="mt-1 mb-4 text-gray-200 text-xl font-bold">
          ورود به حساب کاربری
        </span>
        {/* ---------------------------- Login Form Inputs ---------------------------- */}
        <input
          value={username}
          type="text"
          className="login-input"
          placeholder="نام کاربری"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          value={password}
          type="password"
          className="login-input"
          placeholder="رمز عبور"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {/* ---------------------------- Login Form Submit Button --------------------- */}
        <button className="login-btn" onClick={signIn}>
          ورود
        </button>
      </div>
    </div>
  );
}

export default LoginForm;