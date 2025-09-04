import { ArrowRight } from 'lucide-react';

const CustomerTestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      title: "Awesome Services!",
      content: "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
      author: "ANNA JACKSON",
      role: "TRAVELLER"
    },
    {
      id: 2,
      title: "Recommendations Of Everything!",
      content: "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
      author: "JAMES MASON",
      role: "FREELANCER"
    }
  ];

  const StarRating = () => (
    <div className="flex gap-0.5 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const QuoteIcon = () => (
    <div className="mb-4">
      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
      </svg>
    </div>
  );

  return (
    <div className="bg-gray-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-serif text-white mb-6 font-normal">
              What Our Customer Say About Us
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Diam et habitasse tortor cras donec urna eget dolor in turpis<br className="hidden lg:block" />
              <span className="lg:hidden"> </span>venenatis eget pulvinar ipsum quisque non arcu nulla
            </p>
          </div>
          
          <button className="bg-yellow-400 px-6 py-3 text-black text-sm font-semibold tracking-wide flex items-center gap-2 hover:bg-yellow-500 transition-colors">
            VIEW ALL
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Testimonials - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6">
              {/* Quote Icon */}
              <QuoteIcon />
              
              {/* Star Rating */}
              <StarRating />
              
              {/* Testimonial Title */}
              <h3 className="text-xl font-serif text-gray-900 mb-4 font-normal">
                {testimonial.title}
              </h3>
              
              {/* Testimonial Content */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {testimonial.content}
              </p>
              
              {/* Author Info with Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-400"></div>
                <div>
                  <div className="text-gray-900 font-bold text-xs tracking-wider">
                    {testimonial.author}
                  </div>
                  <div className="text-blue-500 text-xs font-medium tracking-wider">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonialsSection;