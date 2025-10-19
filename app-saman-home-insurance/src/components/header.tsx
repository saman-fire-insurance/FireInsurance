"use client";
import Logo from "@/assets/icon/logo";
// import { UserDropdown } from "@/components/userDropdown";
import { MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionEffect } from "./animate-ui/motion-effect";
import { RippleButton } from "./animate-ui/ripple-button";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";

const menuItems = [
  {
    label: "اعلام خسارت",
    href: "/damageDeclaration",
    isHighlighted: true,
  },
  {
    label: "درباره بیمه منازل مسکونی",
    href: "/aboutHomeInsurance",
  },
  {
    label: "درباره ما",
    href: "/aboutUs",
  },
  {
    label: "تماس با ما",
    href: "/contact",
  },
];

export function Header() {
  const { status, update } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  console.log("status", status);

  // Official NextAuth v4 solution for tab switching
  useEffect(() => {
    const visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        // Update session when tab becomes visible
        update();
      }
    };

    window.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false);
  }, [update]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && isVisible) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && !isVisible) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, lastScrollY]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-white shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl xl:max-w-7xl mx-auto flex items-center justify-between h-14 lg:py-3 pl-4 pr-2 xl:px-0 ">
        <MobileMenu />
        <div className="flex items-center justify-start space-x-4 flex-1 md:flex-none">
          <Link href="/">
            <Logo className="h-8 lg:h-11" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center justify-center space-x-6 text-sm w-2/5">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              className={`whitespace-nowrap ${
                item.isHighlighted
                  ? "text-destructive hover:text-destructive"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              key={`HEADER_MENU_ITEM_${item.href}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {status === "loading" ? (
          <>
            <Skeleton className="w-28 h-9 md:w-36 md:h-10 rounded-lg bg-BlueGray" />
          </>
        ) : status === "authenticated" ? (
          // <>{/* <UserDropdown /> */}</>
          <div className="border border-border px-4 py-2 rounded-xl text-sm bg-transparent">
            خوش آمدید!
          </div>
        ) : (
          <Link href="/login">
            <Button
              variant="outline"
              className="w-36 border-gray-200 text-secondary cursor-pointer bg-transparent flex items-center justify-center px-3 py-2"
            >
              <p className="text-xs md:text-sm font-medium">ورود / ثبت نام</p>
              {/* <UserIcon className="size-6 md:hidden" /> */}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

const MobileMenu = () => {
  return (
    // <Drawer>
    //   <DrawerTrigger className="md:hidden w-10">
    //     <MenuIcon className="size-6" />
    //   </DrawerTrigger>
    //   <DrawerContent className="bg-white rounded-t-3xl flex flex-col space-y-3 p-6 pt-0">
    //     {menuItems.map((item) => (
    //       <DrawerClose asChild key={`HEADER_MENU_ITEM_${item.href}`}>
    //         <Link
    //           href={item.href}
    //           key={item.href}
    //           className="w-full text-[1.15rem] text-textBlack"
    //         >
    //           {item.label}
    //         </Link>
    //       </DrawerClose>
    //     ))}
    //   </DrawerContent>
    // </Drawer>
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-dvw h-dvh overflow-hidden bg-white"
        side="right"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center">
            <Link href="/">
              <Logo className="h-10 lg:h-11" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col space-y-4 z-10 relative mb-32">
            {menuItems.map((item) => (
              <SheetClose key={`HEADER_MENU_ITEM_MB_${item.href}`} asChild>
                <Button
                  variant="ghost"
                  asChild
                  className={`whitespace-nowrap text-center font-medium text-xl px-8 !py-4 h-[none] ${
                    item.isHighlighted
                      ? "text-destructive hover:text-destructive"
                      : "text-gray-900"
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </SheetClose>
            ))}
          </div>
        </div>
        {/* <MotionEffect
          slide={{ direction: "right" }}
          fade
          inView
          delay={0.1}
          className="absolute -right-12 -bottom-12 z-0"
        >
          <DoctorWithAmpuleIcon className="size-64" />
        </MotionEffect>
        <MotionEffect
          slide={{ direction: "left" }}
          fade
          inView
          delay={0.1}
          className="absolute -left-12 top-24 z-0"
        >
          <DogIcon className="size-44" />
        </MotionEffect> */}
      </SheetContent>
    </Sheet>
  );
};
