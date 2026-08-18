import { RiMenu2Fill } from "react-icons/ri";
import { Sidebar } from "./Sidebar";

function Menu() {
  return (
    <div className="text-primary text-[30px] md:hidden">
      <Sidebar />
    </div>
  );
}
export default Menu;
