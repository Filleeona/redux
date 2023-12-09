import { useState } from "react";
import { z } from "zod";
import { User } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/user/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    try {
      User.parse({
        email,
        password,
        date: Date.now(),
      });
      setErrors(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }

    dispatch(getUser({ email, password })).then(
      () => navigate("/home"),
      (err) => setError(err?.toString())
    );
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="prose flex flex-col gap-5 w-3/4 items-center">
        <h1>Login</h1>
        <div className="w-[100%] flex flex-col gap-5">
          <div>
            <input
              className="rounded-xl p-2 border border-gray-300 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {errors?.email && (
              <div className="text-red-500">{errors?.email?._errors}</div>
            )}
          </div>
          <div>
            <input
              className="rounded-xl p-2 border border-gray-300 w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {errors?.password && (
              <div className="text-red-500">{errors?.password?._errors}</div>
            )}
          </div>
        </div>
        <button
          className="flex items-center justify-center w-[100px] h-8 rounded-xl p-2 border border-black hover:bg-black hover:text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}
