"use client";
import { register } from "../../server/userController";
import { useFormState, useFormStatus } from "react-dom";

const RegisterForm = () => {
  const [formState, formAction] = useFormState(register, {});
  console.log(formState);
  return (
    <form action={formAction} className="max-w-xs mx-auto">
      {formState.errors?.username && (
        <div
          role="alert"
          className="mx-auto flex flex-row items-center justify-center gap-5 bg-amber-400 text-black rounded-md p-3 w-full mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formState.errors?.username}</span>
        </div>
      )}
      <input
        type="text"
        name="username"
        autoComplete="off"
        placeholder="Username"
        className="mb-3 bg-white border-2 border-gray-300 rounded-md p-3 w-full"
      />
      {formState.errors?.password && (
        <div
          role="alert"
          className="flex flex-row gap-2 bg-amber-400 items-center justify-center text-black rounded-md p-3 w-full mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formState.errors?.password}</span>
        </div>
      )}
      <input
        type="password"
        name="password"
        autoComplete="off"
        placeholder="Password"
        className="mb-3 bg-white border-2 border-gray-300 rounded-md p-3 w-full"
      />
      {formState.errors?.confirmPassword && (
        <div
          role="alert"
          className="flex flex-row gap-2 bg-amber-400 items-center justify-center text-black rounded-md p-3 w-full mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formState.errors?.confirmPassword}</span>
        </div>
      )}
      <input
        type="password"
        name="confirmPassword"
        autoComplete="off"
        placeholder="Confirm Password"
        className="mb-3 bg-white border-2 border-gray-300 rounded-md p-3 w-full"
      />
      <button className="mb-3 bg-red-700 border-2 border-red-700 rounded-md p-3 w-full text-white">
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
