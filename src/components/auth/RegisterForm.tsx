"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { ErrorToast, SuccessToast } from "@/lib/utils";
import { signUpUser, verifySignupOTP } from "@/services/auth";

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(6, { message: "Please enter a valid phone number." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .strict();

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "otp">("register");
  const [userEmail, setUserEmail] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const maskedEmail = useMemo(() => {
    if (!userEmail) return "";
    const [name, domain] = userEmail.split("@");
    if (!domain) return userEmail;
    const safeName = name.length <= 2 ? name : `${name.slice(0, 2)}***`;
    return `${safeName}@${domain}`;
  }, [userEmail]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    try {
      const payload = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };

      const res = await signUpUser(payload);
      if (res?.success) {
        SuccessToast(res?.message || "OTP sent successfully. Please verify.");
        setUserEmail(res?.data?.userEmail || values.email);
        setOtpValue("");
        setStep("otp");
      } else {
        ErrorToast(res?.message || "Registration failed");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerifyOtp() {
    if (!userEmail) {
      ErrorToast("Email is required");
      return;
    }
    if (otpValue.length !== 6) {
      ErrorToast("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifySignupOTP({ userEmail, otp: otpValue });
      if (res?.success) {
        SuccessToast(res?.message || "Account verified successfully!");
        router.push("/");
      } else {
        ErrorToast(res?.message || "OTP verification failed");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      {step === "register" ? (
        <>
          <CardHeader className="space-y-1">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Create account
            </CardTitle>
            <CardDescription className="text-center">
              Sign up and verify with OTP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="John"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Doe"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="+8801..."
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  loading={isLoading}
                  loadingText="Creating..."
                >
                  Create account
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Verify OTP
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code sent to {maskedEmail || userEmail}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full"
              onClick={onVerifyOtp}
              loading={isLoading}
              loadingText="Verifying..."
            >
              Verify
            </Button>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setStep("register");
                  setOtpValue("");
                }}
              >
                Change email
              </Button>
              <Button variant="link" asChild>
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
