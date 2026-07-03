import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import useAuth from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/helpers";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      await registerAccount(values);
      toast.success("Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.name?.message}
        label="Full name"
        placeholder="Your name"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Name must be at least 3 characters" },
          maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
        })}
      />

      <Input
        error={errors.email?.message}
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />

      <Input
        error={errors.password?.message}
        label="Password"
        placeholder="At least 8 characters"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Password must be at least 8 characters" },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
            message: "Use uppercase, lowercase, number, and special character",
          },
        })}
      />

      <Button className="w-full" isLoading={isLoading} type="submit">
        <UserPlus className="h-4 w-4" />
        Register
      </Button>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link className="font-semibold text-brand-600 hover:text-brand-700" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
