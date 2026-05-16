"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Phone, Loader2, Save } from "lucide-react";
import { updateUserData } from "@/services/auth";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const updateUserDataSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
});

type UpdateUserDataValues = z.infer<typeof updateUserDataSchema>;

interface UpdateUserDataProps {
  initialData: {
    name: string;
    phone?: string;
  };
}

export function UpdateUserData({ initialData }: UpdateUserDataProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UpdateUserDataValues>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues: {
      name: initialData.name || "",
      phone: initialData.phone || "",
    },
  });

  const onSubmit = async (values: UpdateUserDataValues) => {
    setIsLoading(true);
    try {
      const res = await updateUserData(values);
      if (res.success) {
        toast.success("Profile information updated!");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-xl border shadow-sm h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-bold uppercase text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Edit Information
        </CardTitle>
        <CardDescription className="text-[11px] font-medium leading-relaxed">
          Update your public profile information and contact details.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="John Doe"
                        className="rounded-lg h-10 pl-10"
                        {...field}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="017XXXXXXXX"
                        className="rounded-lg h-10 pl-10"
                        {...field}
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full rounded-lg h-10 font-bold uppercase text-[10px] bg-primary hover:bg-primary/90"
              disabled={isLoading || !form.formState.isDirty}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
