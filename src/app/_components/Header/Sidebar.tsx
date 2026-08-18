import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/src/components/ui/drawer";
import { navList } from "@/src/config";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import Hotline from "./Hotline";

export function Sidebar() {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger
        render={
          <Button variant="secondary">
            <RiMenu2Fill className="text-primary size-7.5" />
          </Button>
        }
      />
      <DrawerContent>
        <div className="flex-1 p-4 text-base font-medium">
          <div className="flex">
            <span>Danh mục sản phẩm</span>
            <IoIosArrowDown />
            <IoIosArrowUp />
          </div>
          <ul className="mt-7">
            {navList.map((item, index) => (
              <li key={index} className="my-3">
                {item}
              </li>
            ))}
            <li>Đăng nhập</li>
          </ul>
          <Hotline showIcon showContact className="mt-7" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
