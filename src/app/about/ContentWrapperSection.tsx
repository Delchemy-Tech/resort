"use client";

export const ContentWrapperSection = () => {
  const facilities = [
    {
      title: "Family Experience",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    },
    {
      title: "Private Spa",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    },
    {
      title: "Games",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    },
    {
      title: "Water Activities",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    },
  ];

  return (
    <section className="absolute w-[1063px] h-[2988px] top-[2690px] left-[268px]">
      <header className="w-[540px] items-start top-0 left-0 flex flex-col gap-8 absolute">
        <h2 className="text-[length:var(--title-section-font-size)] relative self-stretch mt-[-1.00px] font-title-section font-[number:var(--title-section-font-weight)] text-dark tracking-[var(--title-section-letter-spacing)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]">
          Our Facilities
        </h2>

        <p className="text-gray-1 text-[length:var(--body-text-large-font-size)] leading-[var(--body-text-large-line-height)] relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] tracking-[var(--body-text-large-letter-spacing)] [font-style:var(--body-text-large-font-style)]">
          Diam et habitasse tortor cras donec urna eget dolor in turpis
          venenatis eget pulvinar ipsum quisque non arcu nulla
        </p>
      </header>

      <button className="inline-flex absolute top-0 left-[906px] items-center justify-center gap-2 px-6 py-4 bg-[#f6d167] hover:bg-[#f4c842] transition-colors duration-200">
        <span className="relative w-fit mt-[-0.50px] font-link-normal font-[number:var(--link-normal-font-weight)] text-dark text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
          BOOK NOW
        </span>

        <span
          className="relative w-fit [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-dark text-xs tracking-[0] leading-[normal] whitespace-nowrap"
          aria-hidden="true"
        ></span>
      </button>

      {facilities.map((facility, index) => (
        <article
          key={facility.title}
          className="absolute w-[1050px] h-[623px] left-0"
          style={{ top: `${196 + index * 723}px` }}
        >
          <div className="relative h-[623px]">
            <div className="absolute w-[1050px] h-[623px] top-0 left-0">
              <div className="absolute w-[1050px] h-[353px] top-0 left-0 bg-gray-4 rotate-180" />

              <div className="flex flex-col w-[510px] items-start gap-8 pt-0 pb-8 px-8 absolute top-[310px] left-[540px] bg-white shadow-shadow">
                <header className="flex flex-col h-16 items-start gap-4 relative self-stretch w-full">
                  <div className="relative w-[9px] h-3.5 rounded bg-primary" />

                  <h3 className="mb-[-13.00px] font-title-section font-[number:var(--title-section-font-weight)] text-dark text-[length:var(--title-section-font-size)] leading-[var(--title-section-line-height)] relative w-fit tracking-[var(--title-section-letter-spacing)] [font-style:var(--title-section-font-style)]">
                    {facility.title}
                  </h3>

                  <div className="relative self-stretch w-full h-[17px] mb-[-47.00px]" />
                </header>

                <p className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
                  {facility.description}
                </p>

                <div className="flex items-center gap-8 relative self-stretch w-full flex-[0_0_auto]">
                  <button className="flex relative flex-1 grow items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary/90 transition-colors duration-200">
                    <span className="relative w-fit mt-[-0.50px] font-link-normal font-[number:var(--link-normal-font-weight)] text-dark text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
                      VIEW DETAILS
                    </span>

                    <span
                      className="relative w-fit [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-dark text-xs tracking-[0] leading-[normal] whitespace-nowrap"
                      aria-hidden="true"
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute w-60 h-60 top-[383px] left-0 bg-gray-4" />

            <div className="absolute w-60 h-60 top-[383px] left-[270px] bg-gray-4" />
          </div>
        </article>
      ))}
    </section>
  );
};