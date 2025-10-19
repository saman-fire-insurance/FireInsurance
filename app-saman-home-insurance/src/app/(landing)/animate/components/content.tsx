"use client";

import { motion } from "motion/react";

const LoginAnimation = () => {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <div className="lg:block hidden">
        {/* Background clouds animation */}
        <motion.div
          className="absolute top-10 -left-8"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img src="/img/cloud.png" className="w-20" alt="Cloud" />
        </motion.div>

        <motion.div
          className="absolute top-20 right-1/12"
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
          className="absolute top-48 left-1/2"
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

        {/* Main content area */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* You can add your main content here */}
          </motion.div>
        </div>

        {/* Houses at the bottom */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
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

        {/* Animated smoke */}
        <motion.div
          className="absolute xl:bottom-[45%] lg:bottom-1/3 xl:left-1/5 lg:left-[17%]"
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
            // delay: 1,
          }}
        >
          <img src="/img/smoke.png" className="w-32 h-auto" alt="Smoke" />
        </motion.div>
      </div>

      {/* <<<<<<<<<<<<< MOBILE VIEW >>>>>>>>>>>>>>> */}
      <div className="lg:hidden block">
        <div className="absolute bottom-0 right-0 w-full">
          <img src="/img/smokeHousesMob.png" className="w-full" />
        </div>
        <div className="absolute top-10 -right-7">
          <img src="/img/fullCloud.png" className="w-32" />
        </div>
        <div className="absolute top-1/3 -left-7">
          <img src="/img/fullCloud.png" className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default LoginAnimation;
