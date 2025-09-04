"use client";
import line1 from "./line-1.svg";
import villague from "./villague.svg";

export const FeaturesSection = () => {
  const navigationItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "DEALS", href: "#deals" },
    { label: "BLOG", href: "#blog" },
    { label: "MORE", href: "#more" },
  ];

  return (
    <div className="absolute w-[1602px] h-[82px] top-0 left-0">
      <div className="relative w-[1600px] h-[82px]">
        <header
          className="absolute w-[1600px] h-[82px] top-0 left-0 bg-transparent"
          role="banner"
        >
          <div className="flex w-[1049px] items-center justify-between px-0 py-4 absolute top-0 left-[276px]">
            <img
              className="relative w-[127.8px] h-[31.07px]"
              alt="Villague"
              src={villague}
            />

            <nav
              className="inline-flex items-center gap-8 relative flex-[0_0_auto]"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className={`${item.label === "DEALS" ? "inline-flex items-center justify-center gap-8 px-[18px] py-0 relative flex-[0_0_auto]" : ""}`}
                >
                  <a
                    href={item.href}
                    className="relative w-fit mt-[-1.00px] font-link-normal font-[number:var(--link-normal-font-weight)] text-white text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)] hover:opacity-80 transition-opacity"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>

            <div className="relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] mr-[-1.00px] border border-solid border-white inline-flex items-center justify-center gap-2 px-6 py-4">
              <div className="relative w-fit mt-[-0.50px] [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap"></div>
            </div>
          </div>

          <img
            className="absolute w-[1600px] h-px top-20 left-0 object-cover"
            alt="Line"
            src={line1}
          />
        </header>

        <div className="absolute top-[26px] left-[1098px] [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-white text-base tracking-[0] leading-7 whitespace-nowrap"></div>

        <div className="absolute w-3 h-7 top-[26px] left-[827px]">
          <div className="absolute top-0 left-0 [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-white text-base tracking-[0] leading-7 whitespace-nowrap"></div>
        </div>

        <button
          className="h-[50px] absolute top-4 left-[1169px] bg-primary inline-flex items-center justify-center gap-2 px-6 py-4 hover:opacity-90 transition-opacity cursor-pointer"
          aria-label="Book now"
        >
          <span className="relative w-fit font-link-normal font-[number:var(--link-normal-font-weight)] text-dark text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
            BOOK NOW
          </span>

          <span className="relative w-fit [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-dark text-xs tracking-[0] leading-[normal] whitespace-nowrap"></span>
        </button>
      </div>
    </div>
  );
};