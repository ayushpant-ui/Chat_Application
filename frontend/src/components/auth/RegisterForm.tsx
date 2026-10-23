"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User } from "lucide-react";

import { Input } from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { register as registerUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

// 1. Define validation rules with Zod
const registerSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email"),

    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]{3,20}$/,
        "3-20 characters: letters, numbers, underscore",
      ),

    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(128, "Password must not exceed 128 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// 2. Derive the TypeScript type from the schema
type RegisterFormData = z.infer<typeof registerSchema>;

const delay = (ms: number) => ({
  animationDelay: `${ms}ms`,
});

const BAR_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
];

const LABELS = ["Weak", "Fair", "Good", "Strong"];

// 3. Calculate password strength
function getStrength(password: string) {
  if (!password) return 0;

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return Math.max(strength, 1);
}

export default function RegisterForm() {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [serverError, setServerError] = useState("");

  // 4. Initialize React Hook Form
  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 5. Watch the password field for the strength indicator
  const password = watch("password");

  const strength = getStrength(password);

  // 6. Submit valid form data to the backend
 const onSubmit = async (data: RegisterFormData) => {
  setServerError("");

  try {
    const { email, username, password } = data;

    // Make a single registration API request
    const { user, accessToken } = await registerUser({
      email,
      username,
      password,
    });

    // Save the authenticated user and access token
    setAuth(user, accessToken);

    // Navigate to the chat page
    router.replace("/chat");
  } catch (error) {
    setServerError(getErrorMessage(error));
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError && (
        <div
          key={serverError}
          role="alert"
          className="animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
        >
          {serverError}
        </div>
      )}

      {/* Email */}
      <div className="animate-fade-up" style={delay(100)}>
        <Input
          id="email"
          type="email"
          label="Email"
          icon={<Mail size={18} />}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...registerField("email")}
        />
      </div>

      {/* Username */}
      <div className="animate-fade-up" style={delay(180)}>
        <Input
          id="username"
          label="Username"
          icon={<User size={18} />}
          placeholder="your_username"
          autoComplete="username"
          error={errors.username?.message}
          {...registerField("username")}
        />
      </div>

      {/* Password */}
      <div className="animate-fade-up" style={delay(260)}>
        <Input
          id="password"
          type="password"
          label="Password"
          icon={<Lock size={18} />}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...registerField("password")}
        />

        {password && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    index < strength ? BAR_COLORS[strength - 1] : "bg-subtle"
                  }`}
                />
              ))}
            </div>

            <span className="w-12 text-right text-xs text-muted">
              {LABELS[strength - 1]}
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="animate-fade-up" style={delay(340)}>
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          icon={<Lock size={18} />}
          placeholder="Repeat your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...registerField("confirmPassword")}
        />
      </div>

      {/* Submit */}
      <div className="animate-fade-up pt-1" style={delay(420)}>
        <SubmitButton loading={isSubmitting} loadingText="Creating account...">
          Create account
        </SubmitButton>
      </div>

      {/* Login link */}
      <p
        className="animate-fade-up text-center text-sm text-muted"
        style={delay(500)}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
