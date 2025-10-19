import * as React from "react";
import Link from "next/link";

const Main = () => {
  return (
    <>
      <div className="h-svh w-svw flex flex-col justify-center items-center">
        <h2 className="text-xl md:text-2xl font-bold">
          صفحه‌ای که دنبال آن بودید پیدا نشد!
        </h2>
        <Link href="/" className="text-mainOrange underline underline-offset-8 mt-6">
          بازگشت به صفحه اصلی
        </Link>
        <div className="size-64 md:size-96 flex items-center justify-center">
          <div className="text-9xl text-gray-300">404</div>
        </div>
      </div>
    </>
  );
};
export default Main;
