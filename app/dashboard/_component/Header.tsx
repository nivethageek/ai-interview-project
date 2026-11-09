"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Header() {
  const pathName = usePathname();
  useEffect(() => {
    console.log(pathName);
  });
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-primary hover:font-bold cursor-pointer ${pathName == "/dashboard" && "text-primary font-bold"}`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold cursor-pointer ${pathName == "/dashboard/question" && "text-primary font-bold"}`}
        >
          Question
        </li>
        <li
          className={`hover:text-primary hover:font-bold cursor-pointer ${pathName == "/dashboard/upgrade" && "text-primary font-bold"}`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold cursor-pointer ${pathName == "/dashboard/how" && "text-primary font-bold"}`}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
