"use client";

import image2 from "./image-2.svg";
import image3 from "./image-3.svg";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      image: image2,
      rating: "★★★★★",
      title: "Awesome Services!",
      content:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
      author: "ANNA JACKSON",
      role: "TRAVELLER",
    },
    {
      id: 2,
      image: image3,
      rating: "★★★★★",
      title: "Recommendations Of Everything!",
      content:
        "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
      author: "JAMES MASON",
      role: "FREELANCER",
    },
  ];

  return (
    <section
      className="absolute w-[1400px] h-[704px] top-[6431px] left-[100px]"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative h-[704px]">
        <div className="absolute w-[1400px] h-[563px] top-0 left-0 bg-[linear-gradient(55deg,rgba(34,34,34,1)_0%,rgba(34,34,34,0)_100%),linear-gradient(0deg,rgba(34,34,34,1)_0%,rgba(34,34,34,1)_100%)]" />

        <header className="w-[600px] items-start top-[100px] left-[175px] flex flex-col gap-8 absolute">
          <h2
            id="testimonials-heading"
            className="relative self-stretch mt-[-1.00px] font-title-section font-[number:var(--title-section-font-weight)] text-white text-[length:var(--title-section-font-size)] tracking-[var(--title-section-letter-spacing)] leading-[var(--title-section-line-height)] [font-style:var(--title-section-font-style)]"
          >
            What Our Customer Say About Us
          </h2>

          <p className="text-gray-2 text-[length:var(--body-text-large-font-size)] leading-[var(--body-text-large-line-height)] relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] tracking-[var(--body-text-large-letter-spacing)] [font-style:var(--body-text-large-font-style)]">
            Diam et habitasse tortor cras donec urna eget dolor in turpis
            venenatis eget pulvinar ipsum quisque non arcu nulla
          </p>
        </header>

        <a
          href="#all-testimonials"
          className="absolute top-[100px] left-[1081px] bg-primary inline-flex items-center justify-center gap-2 px-6 py-4 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="View all testimonials"
        >
          <span className="relative w-fit mt-[-0.50px] font-link-normal font-[number:var(--link-normal-font-weight)] text-dark text-[length:var(--link-normal-font-size)] tracking-[var(--link-normal-letter-spacing)] leading-[var(--link-normal-line-height)] [font-style:var(--link-normal-font-style)]">
            VIEW ALL
          </span>

          <span
            className="relative w-fit [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-dark text-xs tracking-[0] leading-[normal] whitespace-nowrap"
            aria-hidden="true"
          >
            →
          </span>
        </a>

        <div
          className="inline-flex items-start gap-[30px] absolute top-[296px] left-[175px]"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="w-[510px] items-start gap-6 p-8 bg-white shadow-shadow flex flex-col relative"
              role="listitem"
            >
              <img
                className="relative w-[36.57px] h-[26.69px]"
                alt="Quote icon"
                src={testimonial.image}
              />

              <div
                className="relative w-fit [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal text-primary text-lg tracking-[0] leading-[normal] whitespace-nowrap"
                aria-label={`Rating: 5 out of 5 stars`}
                role="img"
              >
                {testimonial.rating}
              </div>

              <h3 className="relative w-fit font-title-testimonial font-[number:var(--title-testimonial-font-weight)] text-dark text-[length:var(--title-testimonial-font-size)] tracking-[var(--title-testimonial-letter-spacing)] leading-[var(--title-testimonial-line-height)] [font-style:var(--title-testimonial-font-style)]">
                {testimonial.title}
              </h3>

              <blockquote className="relative self-stretch font-body-text-large font-[number:var(--body-text-large-font-weight)] text-gray-1 text-[length:var(--body-text-large-font-size)] tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
                {testimonial.content}
              </blockquote>

              <footer className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
                <div
                  className="relative w-16 h-16 bg-gray-4 rounded-full"
                  role="img"
                  aria-label={`Profile picture of ${testimonial.author}`}
                />

                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <cite className="relative w-fit mt-[-1.00px] font-title-price-normal font-[number:var(--title-price-normal-font-weight)] text-dark text-[length:var(--title-price-normal-font-size)] tracking-[var(--title-price-normal-letter-spacing)] leading-[var(--title-price-normal-line-height)] whitespace-nowrap [font-style:var(--title-price-normal-font-style)] not-italic">
                    {testimonial.author}
                  </cite>

                  <div className="relative w-fit font-link-small font-[number:var(--link-small-font-weight)] text-secondary text-[length:var(--link-small-font-size)] tracking-[var(--link-small-letter-spacing)] leading-[var(--link-small-line-height)] [font-style:var(--link-small-font-style)]">
                    {testimonial.role}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};