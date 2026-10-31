"use client";
import { useState, useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

const items = [
  { id: 1, title: "item-1", image: "slide-1.png" },
  { id: 2, title: "item-2", image: "slide-2.jpg" },
  { id: 3, title: "item-3", image: "slide-3.png" },
];

export default function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleMouseEnter = () => {
    plugin.current.stop();
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    plugin.current.play();
    setShowActions(false);
  };

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
    plugin.current.play();
  };

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={item.id} className="relative">
            <Card className="py-0">
              <CardContent className="px-0">
                <Image
                  alt={item.title}
                  src={`/uploads/banners/${item.image}`}
                  width={1200}
                  height={400}
                  // preload={index === 0}
                  // loading="eager"
                  className="h-50 w-full md:h-100"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-5 mt-4 flex w-full justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "size-3 cursor-pointer rounded-full transition-colors",
              current === index
                ? "bg-white"
                : "bg-gray-300/60 hover:bg-gray-300",
            )}
          />
        ))}
      </div>
      <div
        className={cn(
          "hidden opacity-0 transition-opacity duration-200 ease-in lg:block",
          showActions && "opacity-100",
        )}
      >
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
