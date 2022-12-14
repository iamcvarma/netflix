import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
    const {signIn,signUp,error,loading}=useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (!login) {
        await signIn(email,password)
        if (error && !loading){
          toast('Email/Passoword wrong. Try Again')
        }
    } else {
        await signUp(email,password)
        if (error &&!loading){
          toast('Email already registered')
        }
    }
  };
  return (
    <div className="relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent p-8">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt="bg-images"
        src="/images/login-bg.jpg"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
      />
      <img
        src="/images/logo.svg"
        alt="logo"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10  md:top-6"
      />
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">
          {!login ? "Sign In" : "Sign up"}
        </h1>
        <div className="space-y-4">
          <label htmlFor="" className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1text-[13px] font-light text-orange-500">
                Please enter valid email
              </p>
            )}
          </label>
          <label htmlFor="" className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1text-[13px] font-light text-orange-500">
                Your password must contain 4 to 20 characters
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          {!login ? "Sign In" : "Sign up"}
        </button>
        {!login && (
          <div className="text-[gray]">
            New to Netflix?{"  "}
            <button
              onClick={() => setLogin(true)}
              className="text-white hover:underline"
            >
              Sign up now
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
