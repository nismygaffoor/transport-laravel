import { Shield, Clock, HeartHandshake, Headphones } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Safe & Secure",
      description:
        "Your safety is our top priority with verified operators and secure booking systems",
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "24/7 Service",
      description:
        "Round-the-clock customer support to assist you anytime, anywhere",
    },
    {
      icon: <HeartHandshake className="h-12 w-12 text-blue-600" />,
      title: "Best Prices",
      description:
        "Competitive prices with no hidden charges, guaranteed best deals",
    },
    {
      icon: <Headphones className="h-12 w-12 text-blue-600" />,
      title: "Expert Support",
      description: "Dedicated support team to help you with your booking needs",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover Why We're the Best Choice for Your Journey
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
