"use client";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      className={cn(
        "pointer-events-none fixed right-2.5 bottom-5 cursor-pointer rounded-none border-0 opacity-0 transition-opacity duration-200 ease-in-out xl:right-5",
        isVisible && "pointer-events-auto opacity-100",
      )}
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp />
    </Button>
  );
}
