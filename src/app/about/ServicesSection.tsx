"use client";

import React from "react";

export const ServicesSection: React.FC = () => {
  const services = [
    { name: "PRIVATE CHEF", marginClass: "ml-[-23.64px] mr-[-23.64px]" },
    { name: "PRIVATE CHEF", marginClass: "ml-[-23.64px] mr-[-23.64px]" },
    { name: "PARKING", marginClass: "ml-[-4.64px] mr-[-4.64px]" },
    { name: "FITNESS", marginClass: "ml-[-3.14px] mr-[-3.14px]" },
    { name: "LAUNDRY", marginClass: "ml-[-7.14px] mr-[-7.14px]" },
    { name: "SECURITY", marginClass: "ml-[-9.14px] mr-[-9.14px]" },
    { name: "SUPPORT", marginClass: "ml-[-6.64px] mr-[-6.64px]" },
  ];

  return (
    <section className="absolute w-[1600px] h-[503px] top-[5778px] left-0 bg-gray-2">
      <div className="relative w-[1050px] h-[283px] top-[100px] left-[275px]">
        <header className="w-[630px] items-center top-0 left-[210px] flex flex-col gap-8 absolute">
          <h2 className="relative self-stretch mt-[-1.00px] font-title-section font-[number:var(--title-section-font-weight)] text-dark text-[length:var(--title-section-font-size)] text-center tracking-[var(--title-section-letter-spacing)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]">
            Other Amenities
          </h2>

          <p className="text-gray-1 text-[length:var(--body-text-large-font-size)] text-center leading-[var(--body-text-large-line-height)] relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] tracking-[var(--body-text-large-letter-spacing)] [font-style:var(--body-text-large-font-style)]">
            Diam et habitasse tortor cras donec urna eget dolor in turpis
            venenatis eget pulvinar ipsum quisque non arcu nulla
          </p>
        </header>

        <div
          className="flex w-[1050px] items-center justify-center gap-[30px] px-[30px] py-0 absolute top-[196px] left-0"
          role="list"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="items-center justify-center gap-2 px-8 py-0 flex-1 grow flex flex-col relative"
              role="listitem"
            >
              <div
                className="flex w-16 h-16 items-center justify-center relative ml-[-6.14px] mr-[-6.14px] bg-white rounded-[100px] shadow-shadow"
                aria-hidden="true"
              >
                <div className="bg-gray-4 relative w-8 h-8" />
              </div>

              <div
                className={`relative w-fit ${service.marginClass} font-link-small font-[number:var(--link-small-font-weight)] text-gray-1 text-[length:var(--link-small-font-size)] text-center tracking-[var(--link-small-letter-spacing)] leading-[var(--link-small-line-height)] [font-style:var(--link-small-font-style)]`}
              >
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};