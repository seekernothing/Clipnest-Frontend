import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null); // Added email ref
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value; // Get email value

    try {
      await axios.post(
        BACKEND_URL + "/signup",
        {
          username,
          password,
          email, // Include email in request
        },
        {
          withCredentials: true, // Important for cookies
        },
      );

      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Error while signing up");
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <Input reference={emailRef} placeholder="Email" />{" "}
        {/* Added Email Input */}
        <div className="flex justify-center pt-4">
          <Button onClick={signup} variant="primary" text="Signup" size="md" />
        </div>
      </div>
    </div>
  );
};
