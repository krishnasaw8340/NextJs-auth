import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!token) {
      toast.error("Token is missing from the URL.");
      router.push("/forgot-password");
    }
  }, [token]);

  const handleSubmitResetPass = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/reset-password", { token, password });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h3 className="text-xl font-semibold mb-4">Reset your password</h3>
      <form 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center" 
        onSubmit={handleSubmitResetPass}
      >
        <label htmlFor="password" className="mb-2 font-medium">New Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <label htmlFor="confirmPassword" className="mb-2 font-medium">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
