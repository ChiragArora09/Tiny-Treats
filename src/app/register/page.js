"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    setCreatingUser(false);
    if (response.ok) {
      setUserCreated(true);
    } else {
      setUserCreated(false);
      setError(true);
    }
  };

  return (
    <section className="my-20 mx-auto bg-white rounded-lg py-12 max-w-lg">
      <h1 className="text-center text-primary text-4xl">Register</h1>
      {userCreated && (
        <div className="my-3 text-sm font-thin text-center">
          User created successfully!{" "}
          <Link
            className="text-blue-600 font-medium text-lg underline"
            href={"/login"}
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-3 text-sm text-center text-red-600">
          An error has occured! Please try again.
        </div>
      )}

      <form className="block max-w-md mt-4 mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button
          disabled={creatingUser}
          className="mt-8 bg-primary text-white"
          type="submit"
        >
          Register
        </button>
        <p className="text-center font-thin mt-2 text-gray-400 text-sm">or</p>
        <button
          type="button"
          disabled={creatingUser}
          className="mt-2 flex gap-2 items-center font-thin text-gray-500"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={"/google.png"} alt="google logo" width={22} height={22} />
          Google
        </button>
      </form>
      <div className="text-center text-gray-500 mt-8">
        Already have an account,{" "}
        <Link className="text-blue-500" href={"/login"}>
          Login
        </Link>
      </div>
      <footer className="text-gray-400 text-xs text-center mt-16">
        &copy; 2024 All rights reserved
      </footer>
    </section>
  );
};

export default RegisterPage;
