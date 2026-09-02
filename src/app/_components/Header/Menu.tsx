"use client";
import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { navList } from "@/src/config";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuBriefcaseBusiness, LuCircleUserRound } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import Hotline from "./Hotline";

const icons = [
  AiOutlineHome,
  AiOutlineInfoCircle,
  IoNewspaperOutline,
  LuBriefcaseBusiness,
  MdOutlineMail,
];

function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="text-primary relative top-1.25 text-[30px] md:hidden">
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
        <DrawerTrigger
          render={
            <Button variant="secondary" onClick={() => setOpen(true)}>
              <RiMenu2Fill className="text-primary size-7.5" />
            </Button>
          }
        />
        <DrawerContent>
          <div className="mr-3 ml-auto p-2" onClick={() => setOpen(false)}>
            <IoMdClose className="size-7.5 text-[#333]" />
          </div>
          <div className="flex-1 p-4 text-base font-medium">
            <div className="flex items-center text-[17px]">
              <BiCategory />
              <span className="ml-2">Danh mục sản phẩm</span>
              <IoIosArrowDown />
              <IoIosArrowUp />
            </div>
            <ul className="mt-7 text-[17px]">
              {navList.map((item, index) => {
                const Icon = icons[index];
                return (
                  <li
                    key={index}
                    className="border-primary-light flex items-center border-b py-4"
                  >
                    <Icon />
                    <span className="pl-2">{item}</span>
                  </li>
                );
              })}

              <li className="flex items-center py-4">
                <LuCircleUserRound />
                <span className="pl-2">Đăng nhập</span>
              </li>
            </ul>
            <Hotline isMenu className="mt-13" />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default Menu;
