import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { _POST } from "@/lib/apiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function VerifyOtp() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (value.length === 0) {
      return toast.error("Please enter an OTP");
    } else if (value.length !== 6) {
      return toast.error("Please enter a valid OTP");
    } else if (isNaN(parseInt(value))) {
      return toast.info("Please enter a valid OTP");
    }
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId"); // get user from localstorage

      const res = await _POST("/verify-otp", { otp: value, userId });
      if (res.data.sessionToken) { 

        // store session token to sessionStorage
        sessionStorage.setItem("sessionToken", res.data.sessionToken);
        toast.success("User verified successfully");
        setValue("");
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message || "Failed to verify OTP");
    }
  }
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="flex flex-col gap-y-3 p-8  rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-700 mb-4 text-center">Enter OTP</h1>
        <form onSubmit={verifyOtp} className="flex flex-col items-center justify-center w-full gap-y-5">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit" className={`${loading ? "pointer-events-none bg-gray-500" : ""} w-full cursor-pointer`}>
            {loading ? <Loader variant="spinner" height="25px" width="25px" /> : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  )
}