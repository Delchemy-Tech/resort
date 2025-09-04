"use client";

import React from "react";

export const HeroSection = () => {
  const breadcrumbItems = [
    { text: "HOME", icon: "" },
    { text: "ABOUT US", icon: "" },
  ];

  return (
    <section className="absolute w-[1600px] h-[500px] top-0 left-0 bg-gray-4 bg-[url(/overlay.svg)] bg-[100%_100%]">
      <div className="flex flex-col w-[1050px] items-start gap-8 relative top-48 left-[275px]">
        <div className="font-link-normal text-primary text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] relative self-stretch mt-[-1.00px] font-[number:var(--link-normal-font-weight)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
          ABOUT US
        </div>

        <div className="flex w-[1050px] items-center justify-end gap-4 relative flex-[0_0_auto]">
          <h1 className="flex-1 mt-[-1.00px] font-title-hero font-[number:var(--title-hero-font-weight)] text-[length:var(--title-hero-font-size)] leading-[var(--title-hero-line-height)] relative text-white tracking-[var(--title-hero-letter-spacing)] [font-style:var(--title-hero-font-style)]">
            About Us
          </h1>

          <nav
            className="inline-flex items-center gap-4 relative flex-[0_0_auto]"
            aria-label="Breadcrumb"
          >
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <div className="[font-family:'Font_Awesome_5_Free-Solid',Helvetica] text-light text-center relative w-fit font-normal text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                  {item.icon}
                </div>

                <div className="relative w-fit mt-[-0.50px] font-link-normal font-[number:var(--link-normal-font-weight)] text-light text-[length:var(--link-normal-font-size)] text-center tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
                  {item.text}
                </div>

                {index < breadcrumbItems.length - 1 && (
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-light text-base text-center tracking-[0] leading-[normal] whitespace-nowrap"></div>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};