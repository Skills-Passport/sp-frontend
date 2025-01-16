"use client"
import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import SubmitFormButton from "@/components/SubmitFormButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/routing";
import { postData } from "@/lib/actions/data.action";
import { ResetPasswordRequest } from "@/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ResetPasswordFormProps {
  token: string;
}

const PasswordResetPage = (props: { params: Promise<{ token: string }> }) => {
  const params = props.params;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const t = useTranslations("general")
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof ResetPasswordRequest>>({
    resolver: zodResolver(ResetPasswordRequest),
    defaultValues: {
      email: searchParams.get("email") || "",
      password: "",
      password_confirmation: "",
    },
  });

  const { formState: { isSubmitting } } = form

  const onSubmit = async (values: z.infer<typeof ResetPasswordRequest>) => {
    const { token } = await params
    try {
      const res = await postData({
        url: "/reset-password",
        data: {
          ...values,
          token,
        },
        path: "/login",
      });

      if (res && res.success) {
        toast.success("Password reset successfully");
        router.push("/login");
      }
    }
    catch (error) {
      toast.error(t("genericError"))
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }>
      <p className="paragraph-regular text-slate900_light800">
        You can reset your password here.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="background-light900_dark text-slate900_light800 placeholder no-focus slate-border outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <div className="background-light900_dark slate-border flex items-center justify-between rounded-md border">
                  <FormControl>
                    <>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        className="text-slate900_light800 placeholder no-focus flex-1 border-none bg-transparent outline-none"
                        {...field}
                      />
                      <div
                        className="flex cursor-pointer select-none items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeClosedIcon className="text-slate900_light800 size-4" />
                        ) : (
                          <EyeIcon className="text-slate900_light800 size-4" />
                        )}
                      </div>
                    </>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Password Confirmation <span className="text-red-500">*</span>
                </FormLabel>
                <div className="background-light900_dark slate-border flex items-center justify-between rounded-md border">
                  <FormControl>
                    <>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="text-slate900_light800 placeholder no-focus flex-1 border-none bg-transparent outline-none"
                        {...field}
                      />
                      <div
                        className="flex cursor-pointer select-none items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeClosedIcon className="text-slate900_light800 size-4" />
                        ) : (
                          <EyeIcon className="text-slate900_light800 size-4" />
                        )}
                      </div>
                    </>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitFormButton
            isSubmitting={isSubmitting}
            submitLabel="Reset"
          />
        </form>
      </Form>
    </AuthCard>
  )
}

export default PasswordResetPage
