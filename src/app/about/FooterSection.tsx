"use client";

import Image from 'next/image';
import { useState } from "react";
import border3 from "./border-3.svg";
import villague2 from "./villague-2.svg";

export const FooterSection = () => {
  const [email, setEmail] = useState("");

  const officeInfo = {
    address: "021 Hollywood Boulevard, LA",
    email: "customer@example.com",
    phone: "(021) 345-6789",
  };

  const services = ["Family Experiences", "Events", "Weddings", "Tours"];

  const quickMenuItems = ["Home", "Services", "About Us", "Blog", "Contact Us"];

  const supportItems = [
    "Faq",
    "Privacy & Cookies",
    "Legal",
    "Accessibility",
    "Sitemap",
  ];

  const socialIcons = [
    { platform: "facebook", icon: "" },
    { platform: "twitter", icon: "" },
    { platform: "instagram", icon: "" },
    { platform: "linkedin", icon: "" },
  ];

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    console.log("Subscribing email:", email);
  };

  const handleChatClick = () => {
    console.log("Opening chat");
  };

  return (
    <footer className="absolute w-[1600px] h-[858px] top-[7235px] left-0 bg-dark">
      <div className="absolute w-[1050px] h-[211px] top-[100px] left-[275px]">
        <div className="relative h-[211px]">
          <div className="absolute w-[1049px] h-[211px] top-0 left-px bg-gray-4" />

          <div className="flex w-[1050px] items-center gap-[126px] p-16 absolute top-0 left-0 bg-overlay-2 shadow-[0px_4px_30px_#00000008]">
            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
              <p className="relative self-stretch mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-dark text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
                Speak to us about your travel plans, we&apos;re here to help.
              </p>

              <p className="text-dark text-[length:var(--body-text-normal-font-size)] leading-[var(--body-text-normal-line-height)] relative self-stretch font-body-text-normal font-[number:var(--body-text-normal-font-weight)] tracking-[var(--body-text-normal-letter-spacing)] [font-style:var(--body-text-normal-font-style)]">
                Diam et habitasse tortor cras donec urna eget dolor in turpis
                venenatis eget pulvinar ipsum quisque non arcu nulla
              </p>
            </div>

            <button
              onClick={handleChatClick}
              className="relative flex-[0_0_auto] bg-dark inline-flex items-center justify-center gap-2 px-6 py-4 hover:bg-opacity-90 transition-colors"
              aria-label="Chat with us"
            >
              <div className="relative w-fit mt-[-0.50px] font-link-normal font-[number:var(--link-normal-font-weight)] text-white text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
                CHAT WITH US
              </div>

              <div className="relative w-fit [font-family:'Font_Awesome_5_Brands-Regular',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute w-[1049px] h-[135px] top-[375px] left-[276px]">
        <div className="flex flex-col w-[420px] items-start gap-8 absolute top-0 left-0">
          <Image
            className="relative w-[127.8px] h-[31.07px]"
            alt="Villague"
            src={villague2}
            width={128}
            height={31}
            quality={80}
          />

          <p className="relative self-stretch font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] [font-style:var(--body-text-normal-font-style)]">
            Diam et habitasse tortor cras donec urna eget dolor in turpis
            venenatis eget pulvinar ipsum quisque non arcu nulla
          </p>
        </div>

        <div className="flex flex-col w-[600px] items-start gap-4 absolute top-0 left-[449px]">
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative w-fit mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-white text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
              Join Our Newsletter
            </h3>

            <p className="relative self-stretch font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] [font-style:var(--body-text-normal-font-style)]">
              Diam et habitasse tortor cras donec urna eget dolor in turpis
              venenatis eget.
            </p>
          </div>

          <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-between px-4 py-3 relative flex-1 self-stretch grow bg-white rounded-sm border border-solid border-gray-1">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className="relative w-full font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-gray-1 text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] [font-style:var(--body-text-normal-font-style)] bg-transparent border-none outline-none"
                aria-label="Email address"
              />

              <div className="relative w-fit mt-[-1.00px] [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-white text-lg tracking-[0] leading-7 whitespace-nowrap"></div>
            </div>

            <button
              onClick={handleSubscribe}
              className="relative self-stretch flex-[0_0_auto] bg-primary inline-flex items-center justify-center gap-2 px-6 py-4 hover:bg-opacity-90 transition-colors"
              aria-label="Subscribe to newsletter"
            >
              <div className="relative w-fit font-link-normal font-[number:var(--link-normal-font-weight)] text-dark text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
                SUBSCRIBES
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-[1050px] items-start gap-16 absolute top-[543px] left-[275px]">
        <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
          <h3 className="relative w-fit mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-white text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
            Office
          </h3>

          <div className="inline-flex gap-4 flex-col items-start relative flex-[0_0_auto]">
            <address className="relative w-fit mt-[-1.00px] font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap [font-style:var(--body-text-normal-font-style)] not-italic">
              {officeInfo.address}
            </address>

            <a
              href={`mailto:${officeInfo.email}`}
              className="relative w-fit font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap [font-style:var(--body-text-normal-font-style)] hover:underline"
            >
              {officeInfo.email}
            </a>

            <a
              href={`tel:${officeInfo.phone}`}
              className="relative w-fit font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap [font-style:var(--body-text-normal-font-style)] hover:underline"
            >
              {officeInfo.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <h3 className="mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-[length:var(--title-card-font-size)] leading-[var(--title-card-line-height)] relative w-fit text-white tracking-[var(--title-card-letter-spacing)] [font-style:var(--title-card-font-style)]">
            Services
          </h3>

          <nav className="flex gap-2 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
            {services.map((service, index) => (
              <a
                key={index}
                href="#"
                className="mt-[-1.00px] font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap relative w-fit tracking-[var(--body-text-normal-letter-spacing)] [font-style:var(--body-text-normal-font-style)] hover:underline"
              >
                {service}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <h3 className="relative w-fit mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-white text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
            Quick Menu
          </h3>

          <nav className="flex gap-2 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
            {quickMenuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="mt-[-1.00px] relative w-fit font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap [font-style:var(--body-text-normal-font-style)] hover:underline"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <h3 className="relative w-fit mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-white text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
            Support
          </h3>

          <nav className="flex gap-2 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
            {supportItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="relative w-fit mt-[-1.00px] font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap [font-style:var(--body-text-normal-font-style)] hover:underline"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
          <h3 className="relative w-fit mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-white text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
            Follow Us
          </h3>

          <div className="inline-flex items-start justify-center gap-4 relative flex-[0_0_auto]">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href="#"
                className="flex flex-col items-center justify-center gap-2.5 bg-tertiary-2 rounded-[100px] relative w-8 h-8 hover:bg-opacity-80 transition-colors"
                aria-label={`Follow us on ${social.platform}`}
              >
                <div className="[font-family:'Font_Awesome_5_Brands-Regular',Helvetica] text-dark relative w-fit font-normal text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute w-[1052px] h-14 top-[770px] left-[275px]">
        <Image
          className="absolute w-[1050px] h-px -top-px left-0 object-cover"
          alt="Border"
          src={border3}
          width={1050}
          height={1}
          quality={80}
        />

        <p className="absolute top-8 left-96 font-body-text-normal font-[number:var(--body-text-normal-font-weight)] text-white text-[length:var(--body-text-normal-font-size)] tracking-[var(--body-text-normal-letter-spacing)] leading-[var(--body-text-normal-line-height)] whitespace-nowrap [font-style:var(--body-text-normal-font-style)]">
          © 2021 Aalia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};