import { cn } from "@/src/lib/utils";
import { IconPhone } from "./icons/IconPhone";

export default function Hotline({
  isMenu,
  className,
}: {
  isMenu?: boolean;
  className?: string;
}) {
  return (
    <a
      href="tel: 0123 456 789"
      className={cn("flex items-center justify-center", className)}
    >
      <IconPhone
        className={cn("hidden md:block lg:size-8.75", isMenu && "block")}
      />
      <div className={cn("ml-1.5 hidden flex-col lg:flex", isMenu && "flex")}>
        <span className="text-sm">Hotline</span>
        <span className="text-primary text-[18px] font-bold">0123 456 789</span>
      </div>
    </a>
  );
}
