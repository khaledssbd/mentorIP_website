import { getCurrentUser, fetchMyProfile, logOut } from "@/services/auth";
import { 
  Mail, 
  ShieldCheck, 
  Calendar, 
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { format } from "date-fns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdatePhoto } from "@/components/profile/UpdatePhoto";
import { ChangePassword } from "@/components/profile/ChangePassword";
import { UpdateUserData } from "@/components/profile/UpdateUserData";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const profileRes = await fetchMyProfile();
  const fullProfile = profileRes?.success ? profileRes.data : null;

  const userData = fullProfile || user;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-500">
      {/* Simple Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-muted border rounded-2xl shadow-sm">
        <UpdatePhoto initialImage={userData.image} name={userData.name} />
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              {userData.name}
            </h1>
            <Badge variant="secondary" className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border-primary/20">
              {userData.role}
            </Badge>
          </div>
          <p className="text-muted-foreground font-medium">
            Professional Member
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
            <Badge variant="outline" className="text-muted-foreground font-medium">
              ID: {userData._id.slice(-6).toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full space-y-6">
        <TabsList className="bg-muted border p-1 rounded-xl h-11 w-full md:w-auto">
          <TabsTrigger value="info" className="rounded-lg px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Edit User Data Form */}
            <UpdateUserData initialData={{ name: userData.name, phone: userData.phone }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info Readonly */}
              <Card className="rounded-xl border shadow-sm">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Public Email</p>
                      <p className="text-sm font-bold truncate text-foreground">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Status</p>
                      <p className="text-sm font-bold text-foreground uppercase">
                        Verified {userData.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security / Member Info */}
              <Card className="rounded-xl border shadow-sm">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
                    Member Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Joined Date</p>
                      <p className="text-sm font-bold text-foreground">
                        {userData.createdAt ? format(new Date(userData.createdAt), "MMMM yyyy") : "January 2026"}
                      </p>
                    </div>
                  </div>

                  <form action={async () => {
                    "use server";
                    await logOut();
                    redirect("/");
                  }} className="pt-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      type="submit"
                      className="w-full font-bold gap-2 rounded-lg text-[10px] uppercase"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Secure Logout
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="max-w-2xl">
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
}
