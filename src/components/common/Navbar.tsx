"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  Home,
  Info,
  Users,
  Briefcase,
  Phone,
  Image as ImageIcon,
  Menu,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CurrentUser } from "@/types/user.type";
import { getCurrentUser, logOut } from "@/services/auth";
import { getInitials } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Our Clients", href: "/clients", icon: Users },
  { name: "Service & Practices", href: "/services", icon: Briefcase },
  { name: "Contact Us", href: "/contact", icon: Phone },
  { name: "Team of Lawyers", href: "/team-of-lawyers", icon: Users },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
    };
    fetchUser();
  }, []);

  const isLoggedIn = Boolean(currentUser);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: LOGO */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b shrink-0">
                <SheetTitle className="text-left font-bold text-primary">
                  MENTOR IP
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                  <nav className="flex flex-col space-y-1">
                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Menu
                    </p>
                    {navLinks.map((link) => {
                      const isActive =
                        link.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(link.href);
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                            isActive
                              ? "bg-primary/5 text-primary"
                              : "text-foreground hover:text-primary dark:hover:text-primary hover:bg-muted"
                          }`}
                        >
                          <link.icon
                            className={`w-4 h-4 ${
                              isActive ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                          {link.name}
                        </Link>
                      );
                    })}
                    {isLoggedIn && (
                      <Link
                        href="/profile"
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                          pathname === "/profile"
                            ? "bg-primary/5 text-primary"
                            : "text-foreground hover:text-primary dark:hover:text-primary hover:bg-muted"
                        }`}
                      >
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={currentUser?.image} alt={currentUser?.name} />
                          <AvatarFallback className="text-[8px]">{getInitials(currentUser?.name || "")}</AvatarFallback>
                        </Avatar>
                        Profile
                      </Link>
                    )}
                  </nav>
                  <div className="border-t pt-6">
                    <ScrollArea className="h-[400px]">
                      <Sidebar />
                    </ScrollArea>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Link href="/" className="hidden lg:flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="MENTOR IP"
              width={180}
              height={50}
              priority
              className="h-10 w-auto dark:invert"
            />
          </Link>
        </div>

        {/* Center: Navigation Menu (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium flex items-center gap-1.5 px-3 py-2 rounded-md transition-all relative ${
                  isActive
                    ? "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:text-primary dark:hover:text-primary hover:bg-muted"
                }`}
              >
                <link.icon
                  className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                />
                <span className="hidden xl:inline">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Search & User */}
        <div className="flex items-center justify-end space-x-2">
          {/* Search */}
          <div className="hidden md:flex relative w-full max-w-[180px] xl:max-w-60">
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-full bg-muted border-none pl-9 focus-visible:ring-1"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="User menu">
                <Avatar className="size-9 border">
                  <AvatarImage src={currentUser?.image} alt={currentUser?.name} />
                  <AvatarFallback>
                    {getInitials(currentUser?.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold tracking-wider">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-muted-foreground tracking-widest">
                        {currentUser?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer uppercase text-xs tracking-wider">
                    <Link href="/profile" className="flex items-center gap-2 w-full">
                      <User className="text-primary w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">
                        Welcome to MentorIP
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                        Security for your Innovation
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer uppercase text-xs tracking-wider"
                  >
                    <Link href="/auth/login">
                      <LogOut className="rotate-180 text-primary" />
                      <span>Log In</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer uppercase text-xs tracking-wider"
                  >
                    <Link href="/auth/register">
                      <Users className="text-primary" />
                      <span>Register Account</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />
              <div className="flex items-center justify-between px-2 py-1.5 focus:bg-accent focus:text-accent-foreground select-none">
                <div className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Sun className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Dark Mode
                  </span>
                </div>
                <Switch
                  className="scale-75"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                />
              </div>

              {isLoggedIn && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await logOut();
                      setCurrentUser(null);
                      router.refresh();
                    }}
                    className="text-red-500 focus:text-red-500 cursor-pointer font-black text-xs uppercase tracking-[0.2em]"
                  >
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
