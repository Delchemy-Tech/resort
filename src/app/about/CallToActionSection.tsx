"use client";

export const CallToActionSection = () => {
  const amenities = [
    {
      icon: "/vector-2.svg",
      title: "Trusted",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida.",
    },
    {
      icon: "/vector-3.svg",
      title: "Maintenance",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida.",
    },
    {
      icon: "/vector-4.svg",
      title: "Easy Booking",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida.",
    },
    {
      icon: "/vector-5.svg",
      title: "Help Services",
      description:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida.",
    },
  ];

  return (
    <section
      className="absolute w-[1050px] h-[691px] top-[1899px] left-[275px]"
      aria-labelledby="amenities-title"
    >
      <div className="relative h-[691px]">
        <div className="absolute w-[1050px] h-[601px] top-0 left-0 bg-gray-4" />

        <div className="absolute w-[1050px] h-[601px] top-0 left-0 bg-overlay-1" />

        <header className="w-[630px] items-center top-20 left-[210px] flex flex-col gap-8 absolute">
          <h2
            id="amenities-title"
            className="relative self-stretch mt-[-1.00px] font-title-section font-[number:var(--title-section-font-weight)] text-white text-[length:var(--title-section-font-size)] text-center tracking-[var(--title-section-letter-spacing)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]"
          >
            Other Amenities
          </h2>

          <p className="text-white text-[length:var(--body-text-large-font-size)] text-center leading-[var(--body-text-large-line-height)] relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] tracking-[var(--body-text-large-letter-spacing)] [font-style:var(--body-text-large-font-style)]">
            Diam et habitasse tortor cras donec urna eget dolor in turpis
            venenatis eget pulvinar ipsum quisque non arcu nulla
          </p>
        </header>

        <div className="flex w-[930px] items-start gap-[30px] absolute top-[281px] left-[50px]">
          {amenities.slice(0, 2).map((amenity, index) => (
            <article
              key={index}
              className="flex flex-col items-start gap-4 p-8 relative flex-1 grow bg-white shadow-shadow"
            >
              <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                <div
                  className={`relative w-8 h-8 bg-[url(${amenity.icon})] bg-[100%_100%]`}
                  role="img"
                  aria-hidden="true"
                />

                <h3 className="relative w-fit font-title-card font-[number:var(--title-card-font-weight)] text-dark text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
                  {amenity.title}
                </h3>
              </div>

              <p className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
                {amenity.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex w-[930px] items-start gap-[30px] absolute top-[501px] left-[50px]">
          {amenities.slice(2, 4).map((amenity, index) => (
            <article
              key={index + 2}
              className="flex flex-col items-start gap-4 p-8 relative flex-1 grow bg-white shadow-shadow"
            >
              <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                <div
                  className={`relative w-8 h-8 bg-[url(${amenity.icon})] bg-[100%_100%]`}
                  role="img"
                  aria-hidden="true"
                />

                <h3 className="relative w-fit font-title-card font-[number:var(--title-card-font-weight)] text-dark text-[length:var(--title-card-font-size)] tracking-[var(--title-card-letter-spacing)] leading-[var(--title-card-line-height)] [font-style:var(--title-card-font-style)]">
                  {amenity.title}
                </h3>
              </div>

              <p className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
                {amenity.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};