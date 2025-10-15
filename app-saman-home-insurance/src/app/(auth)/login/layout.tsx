import { Metadata, Viewport } from "next";
import { RecaptchaProvider } from "./components/recaptcha-provider";

export const metadata: Metadata = {
  title: "ورود | بیمه سامان",
  description: "ورود به پنل کاربری بیمه سامان",
};

export const viewport: Viewport = {
  themeColor: "#1A56DB",
  width: "device-width",
  initialScale: 1,
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
    // <RecaptchaProvider>
    //   <>{children}</>
    // </RecaptchaProvider>
  );
}
