"use client";
import React from "react";
// import border2 from "./border-2.svg";
// import border from "./border.svg";
// import image from "./image.svg";
// import row from "./row.svg";
// import vector from "./vector.svg";

export const AboutUsSection = () => {
  // Statistics data for mapping
  const statisticsData = [
    {
      number: "100k+",
      label: "GUEST SERVED",
    },
    {
      number: "12",
      label: "VILLAS & RESORTS",
    },
    {
      number: "10+",
      label: "LOCATIONS",
    },
  ];

  return (
    <section className="absolute w-[1600px] h-[1302px] top-[500px] left-0">
      <div className="relative h-[1302px]">
        {/* Main content section */}
        <div className="flex flex-col w-[600px] items-start gap-8 pl-16 pr-0 py-0 absolute top-[105px] left-[757px]">
          <h2 className="font-title-section text-dark text-[length:var(--title-section-font-size)] tracking-[var(--title-section-letter-spacing)] relative self-stretch mt-[-1.00px] font-[number:var(--title-section-font-weight)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]">
            About Villague
          </h2>

          <p className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
            Gravida vulputate aliquet tempor sit. Neque sed pretium non urna sed
            etid aenean haretra quam plac adipiscing penatibus aliquam
            adipiscing gravida elementum aliquet eget senectus felis enim diam
            molestie. Aenean haretra quam placerat adipiscing penatibus aliquam
          </p>

          <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="h-[27.99px] text-[length:var(--title-card-font-size)] relative self-stretch mt-[-1.00px] font-title-card font-[number:var(--title-card-font-weight)] text-dark tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
              Our Partners
            </h3>

            <img
              className="relative self-stretch w-full flex-[0_0_auto]"
              alt="Partner logos row"
              // src={row}
              src={''}
            />

            <img
              className="relative self-stretch w-full flex-[0_0_auto]"
              alt="Partner logos image"
              // src={image}
              src={''}
            />
          </div>

          <p className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
            Gravida vulputate aliquet tempor sit. Neque sed pretium non urna sed
            etid aenean haretra quam plac adipiscing penatibus aliquam
            adipiscing gravida elementum aliquet eget senectus felis enim diam
            molestie. Aenean haretra quam placerat adipiscing penatibus aliquam
          </p>

          <button className="relative flex-[0_0_auto] bg-primary inline-flex items-center justify-center gap-2 px-6 py-4 hover:opacity-90 transition-opacity">
            <span className="relative w-fit mt-[-0.50px] font-link-normal font-[number:var(--link-normal-font-weight)] text-dark text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
              BOOK NOW
            </span>

            <span
              className="relative w-fit [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-dark text-xs tracking-[0] leading-[normal] whitespace-nowrap"
              aria-hidden="true"
            ></span>
          </button>
        </div>

        {/* Background and statistics section */}
        <div className="absolute w-[1600px] h-[1302px] top-0 left-0">
          <div className="absolute w-[725px] h-[900px] top-0 left-0 bg-gray-4" />

          <div className="absolute w-[1325px] h-[439px] top-[863px] left-[275px]">
            <div className="absolute w-[605px] h-[439px] top-0 left-[720px] bg-gray-4">
              <img
                className="absolute w-[108px] h-[108px] top-[169px] left-[249px]"
                alt="Decorative vector"
                // src={vector}
                src={''}
              />
            </div>

            <div className="w-[720px] items-start p-16 top-0 left-0 bg-white flex flex-col gap-8 absolute">
              <h2 className="relative self-stretch mt-[-1.00px] font-title-section font-[number:var(--title-section-font-weight)] text-dark text-[length:var(--title-section-font-size)] tracking-[var(--title-section-letter-spacing)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]">
                Access Only The Finest Homes In The Most Desirable Destinations
              </h2>

              <p className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
                Gravida vulputate aliquet tempor sit. Neque sed pretium non urna
                sed etid aenean haretra quam plac adipiscing penatibus aliqua
                adipiscing gravida elementum aliquet eget senectus felis enim
                diam molestie.
              </p>

              <div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
                {statisticsData.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center justify-center gap-2 px-8 py-0 relative flex-1 grow">
                      <div className="relative w-fit mt-[-1.00px] font-title-section font-[number:var(--title-section-font-weight)] text-dark text-[length:var(--title-section-font-size)] text-center tracking-[var(--title-section-letter-spacing)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]">
                        {stat.number}
                      </div>

                      <div className="relative w-fit font-link-small font-[number:var(--link-small-font-weight)] text-tertiary-2 text-[length:var(--link-small-font-size)] text-center tracking-[var(--link-small-letter-spacing)] leading-[var(--link-small-line-height)] [font-style:var(--link-small-font-style)]">
                        {stat.label}
                      </div>
                    </div>

                    {index < statisticsData.length - 1 && (
                      <img
                        className="relative flex-1 self-stretch grow object-cover"
                        alt="Divider border"
                        // src={index === 0 ? border : border2}
                        src={''}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};