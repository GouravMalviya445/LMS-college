import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { _POST } from "@/lib/apiClient";
import { toast } from "sonner";
import { AUTH_ROUTES } from "@/config/apiRoutes";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      userName: ""
    }
  });

  const navigate = useNavigate();
  
  const signupUser = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { email, password, userName } = data;
      const res = await _POST(AUTH_ROUTES.SIGNUP, { email, password, userName });
      if (res.data.userId) {
        setLoading(false);
        
        const userId = res.data.userId;
        // store user id to localstorage 
        localStorage.setItem("userId", userId);
        
        const otpRes = await _POST(AUTH_ROUTES.SEND_OTP, { userId, email });
        if (otpRes.data.message) {
          toast.success(`User registered | we sent OTP to ${email} please verify`)
        }
        
        reset();
        navigate("/user/verify");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error)
      toast.error(error.response.data.detail || "User registration Failed | try later");
    }
  });
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="flex flex-col border p-8 max-h-[70vh] md:max-h-[40vh] min-w-[80vw] md:min-w-[22vw] rounded-lg">
        <h1 className="md:text-3xl text-2xl font-semibold md:font-bold text-gray-700 text-center mb-8">Create an Account</h1>
        <form onSubmit={signupUser} className="w-full flex flex-col gap-y-3">

          {/* email field */}
          <div className="flex items-center justify-between gap-12">
            <label htmlFor="email">
              Email:
            </label>
            <Input
              disabled={loading}
              id="email"
              type="text"
              className="w-full"
              placeholder="name@example.com"
              {...register("email", { 
                required: "Please enter your email address",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* name field */}
          <div className="flex items-center justify-between gap-12">
            <label htmlFor="name">
              Name:
            </label>
            <Input
              disabled={loading}
              id="name"
              type="text"
              className="w-full"
              placeholder="John Doe"
              {...register("userName", { 
                required: "Please enter your name",
              })}
              />
          </div>
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}

          {/* password field */}
          <div className="flex items-center justify-between gap-5">
            <label htmlFor="password">
              Password:
            </label>
            <Input
              disabled={loading}
              id="password"
              type="password"
              className="w-full"
              placeholder="*******"
              {...register("password", { 
                required: "Please enter your password",
                minLength: { value: 8, message: "Password must be at least 8 characters long" },
                maxLength: { value: 50, message: "Password must be at most 50 characters long" }
              })}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* login button */}
          <Button type="submit" className={`${loading ? "bg-gray-600 pointer-events-none" : "w-full text-lg mt-4 transition-all duration-300 ease-in-out"} cursor-pointer`}>
            {loading ? <Loader variant="spinner" height="25px" width="25px"/> : "Sign up"}
          </Button>
          
          <div className="flex items-center justify-center">
            <p>Already have an account?</p>
            <Link to="/auth/login">
              <Button variant="link" className="text-blue-500 p-2 cursor-pointer">Login</Button>
            </Link>
          </div>
        </form>        
      </div>
    </div>
  )
}