// components/home/Hero.tsx
"use client";

import Link from "next/link";
import Carousel from "./ui/Carousel";
import Image from "next/image";
import CategoryLink from "./ui/CategoryLink";

import { heroSlides, stackedCards } from "../data/home/hero";

export default function Hero() {

  return (
    <section className="w-full bg-[#f8f9fa] py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col">

        {/* TOP: Left Large + Right Stacked */}
        <div className="flex flex-col lg:flex-row gap-4 h-[500px] mb-12">
          
          {/* LEFT: Large Feature Card */}
          <div 
            className="lg:flex-[2] relative flex-1 rounded-2xl overflow-hidden animate-fade-in-up opacity-0"
            style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
          >
            <Carousel slides={heroSlides} interval={4000} />
          </div> 

          {/* RIGHT: Stacked Small Cards */}
          <div className="flex-1 flex flex-col gap-6">
            {stackedCards.map((card, index) => (
              <div 
                key={card.id} 
                className="relative flex-1 rounded-2xl overflow-hidden group animate-fade-in-up opacity-0"
                style={{ 
                  animationDelay: `${(index + 1) * 150}ms`, // Starts at 150ms, then 300ms
                  animationFillMode: 'forwards' 
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-2xl font-medium text-white tracking-wide">
                    {card.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Category Links */}
        <div className="flex flex-col md:flex-row gap-8">
          {[
            { title: "Best Selling", href: "/best-selling" },
            { title: "Women's Wear", href: "/womens" },
            { title: "Men's Wear", href: "/mens" }
          ].map((link, index) => (
             <div 
               key={link.title}
               className="flex-1 animate-fade-in-up opacity-0"
               style={{ 
                 animationDelay: `${(index + 3) * 150}ms`, // Starts at 450ms
                 animationFillMode: 'forwards' 
               }}
             >
               <CategoryLink title={link.title} href={link.href} />
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}