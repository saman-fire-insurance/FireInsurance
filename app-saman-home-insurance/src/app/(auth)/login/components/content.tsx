"use client";

import { motion } from "motion/react";
import { LoginForm } from "./login-form";

interface PropsType {
  callbackUrl: string;
}

const LoginPageForm = (props: PropsType) => {
  const { callbackUrl } = props;
  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      {/* Background clouds animation - Desktop only */}
      <div
        className="absolute top-10 -left-4 lg:block hidden"
        // animate={{
        //   x: [0, 30, 0],
        //   y: [0, -15, 0],
        // }}
        // transition={{
        //   duration: 8,
        //   repeat: Infinity,
        //   ease: "easeInOut",
        // }}
      >
        <img src="/img/cloud.png" className="w-20" alt="Cloud" />
      </div>

      <motion.div
        className="absolute top-20 right-1/12 lg:block hidden"
        animate={{
          x: [0, -25, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src="/img/fullCloud.png" className="w-32" alt="Full Cloud" />
      </motion.div>

      <motion.div
        className="absolute top-64 2xl:right-1/3 xl:right-[40%] right-1/2 lg:block hidden"
        animate={{
          x: [0, -25, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src="/img/fullCloud.png"
          className="w-32 scale-x-[-1]"
          alt="Cloud"
        />
      </motion.div>

      {/* Mobile clouds */}
      <div className="absolute top-10 -right-7 z-0 lg:hidden">
        <img src="/img/fullCloud.png" className="w-32" />
      </div>
      <div className="absolute top-1/3 -left-7 z-0 lg:hidden">
        <img src="/img/fullCloud.png" className="w-32" />
      </div>

      {/* Main content area - Unified for both mobile and desktop */}
      <div className="relative z-10 w-10/12 mx-auto mt-32 md:mt-24 md:w-8/12 lg:absolute lg:right-[13%] lg:top-1/5 lg:w-full lg:max-w-md lg:mx-0 lg:mt-0">
        <motion.div
          className="text-center lg:text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <LoginForm callbackUrl={callbackUrl} />
        </motion.div>
      </div>

      {/* Houses at the bottom - Desktop only */}
      <motion.div
        className="absolute bottom-0 left-0 w-full lg:block hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <img
          src="/img/houses.png"
          className="w-full h-auto object-cover"
          alt="Houses"
        />
      </motion.div>

      {/* Mobile houses with smoke */}
      <div className="absolute bottom-0 right-0 w-full z-0 lg:hidden">
        <img src="/img/smokeHousesMob.png" className="w-full" />
      </div>

      {/* Animated smoke - Desktop only */}
      <motion.div
        className="absolute xl:bottom-[45%] lg:bottom-1/3 xl:left-1/5 lg:left-[17%] lg:block hidden"
        initial={{
          scale: 1.2,
          y: 150,
          opacity: 0,
        }}
        animate={{
          scale: [1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4],
          y: [
            150, 100, 50, 0, -50, -100, -150, -200, -250, -300, -350, -400,
            -450, -500, -550, -600, -650,
          ],
          opacity: [0, 0.3, 0.6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img src="/img/smoke.png" className="w-32 h-auto" alt="Smoke" />
      </motion.div>
    </div>
  );
};

export default LoginPageForm;
