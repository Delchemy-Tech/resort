import { ArrowRight, StarIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    id: 1,
    title: "Awesome Services!",
    content:
      "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    author: "ANNA JACKSON",
    role: "TRAVELLER",
    rating: 5,
  },
  {
    id: 2,
    title: "Recommendations Of Everything!",
    content:
      "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    author: "JAMES MASON",
    role: "FREELANCER",
    rating: 5,
  },
];

const CustomerTestimonialsSection: React.FC = () => {
  return (
    <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Background Section with Dark Gradient */}
        <div className="relative w-full min-h-[400px] bg-[linear-gradient(13deg,rgba(34,34,34,1)_0%,rgba(34,34,34,0)_100%),linear-gradient(0deg,rgba(34,34,34,1)_0%,rgba(34,34,34,1)_100%)] rounded-lg flex flex-col items-center justify-center">
          {/* Header Content */}
          <div className="absolute top-8 left-0 right-0 px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-center lg:text-left">
                <div className="flex flex-col gap-3 max-w-2xl mx-auto lg:mx-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-tight">
                    What Our Customer Say About Us
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Diam et habitasse tortor cras donec urna eget dolor in turpis
                    venenatis eget pulvinar ipsum quisque non arcu nulla
                  </p>
                </div>
                
                <button className="bg-yellow-400 px-6 py-2 text-black font-medium text-sm uppercase tracking-wide flex items-center gap-2 hover:bg-yellow-500 transition-colors flex-shrink-0 mx-auto lg:mx-0">
                  VIEW ALL
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials Grid inside the dark container */}
          <div className="absolute -bottom-16 left-0 right-0 px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
                {testimonials.slice(0, 1).map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-fit md:block"
                  >
                    <CardContent className="p-6 space-y-4">
                      {/* Quote Icon */}
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>

                      {/* Star Rating */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, index) => (
                            <StarIcon
                              key={index}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ),
                        )}
                      </div>

                      {/* Testimonial Title */}
                      <h3 className="text-lg font-serif font-normal text-gray-900 leading-tight">
                        {testimonial.title}
                      </h3>

                      {/* Testimonial Content */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {testimonial.content}
                      </p>

                      {/* Author Info with Avatar */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarFallback className="bg-gray-400 text-white font-semibold text-sm">
                            {testimonial.author
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <div className="text-gray-900 font-bold text-xs tracking-wider">
                            {testimonial.author}
                          </div>
                          <div className="text-blue-500 text-xs font-medium tracking-wider">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Second card - only show on lg screens and above */}
                <div className="hidden lg:block">
                  {testimonials.slice(1, 2).map((testimonial) => (
                    <Card
                      key={testimonial.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-fit"
                    >
                      <CardContent className="p-6 space-y-4">
                        {/* Quote Icon */}
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>

                        {/* Star Rating */}
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, index) => (
                              <StarIcon
                                key={index}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ),
                          )}
                        </div>

                        {/* Testimonial Title */}
                        <h3 className="text-lg font-serif font-normal text-gray-900 leading-tight">
                          {testimonial.title}
                        </h3>

                        {/* Testimonial Content */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {testimonial.content}
                        </p>

                        {/* Author Info with Avatar */}
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                          <Avatar className="w-10 h-10 flex-shrink-0">
                            <AvatarFallback className="bg-gray-400 text-white font-semibold text-sm">
                              {testimonial.author
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col">
                            <div className="text-gray-900 font-bold text-xs tracking-wider">
                              {testimonial.author}
                            </div>
                            <div className="text-blue-500 text-xs font-medium tracking-wider">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonialsSection;