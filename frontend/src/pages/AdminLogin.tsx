import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiUrl } from "../components/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../components/Context/AdminAuth";

interface AdminLoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("AdminLogin must be used within an AdminAuthProvider");
  const { login } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AdminLoginForm> = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.status === 200) {
        const adminInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        login(adminInfo);
        navigate("/admin");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Admin Login
          </h3>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "The email field is required",
              })}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            {errors.email && <p className="invalid">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "The password field is required",
              })}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />
            {errors.password && (
              <p className="invalid">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
