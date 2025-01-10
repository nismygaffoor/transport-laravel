import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  avatar: string;
  location: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Sarah Fernando",
    rating: 5,
    comment:
      "Excellent service! The bus was comfortable and on time. Will definitely use again.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Colombo",
  },
  {
    id: "2",
    author: "Arun Kumar",
    rating: 4,
    comment: "Very reliable bus service. Clean and comfortable seats.",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Kandy",
  },
  {
    id: "3",
    author: "Malini Perera",
    rating: 5,
    comment: "The online booking process was smooth and hassle-free.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Galle",
  },
  {
    id: "4",
    author: "Nuwan Silva",
    rating: 4,
    comment: "Affordable and reliable service. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Jaffna",
  },
  {
    id: "5",
    author: "Amara Wijesekera",
    rating: 5,
    comment: "A great experience with friendly staff and smooth travel.",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Matara",
  },
  {
    id: "6",
    author: "Saman Perera",
    rating: 4,
    comment: "Good experience, but the ride could be a bit faster.",
    avatar:
      "https://images.unsplash.com/photo-1562577309-b3d38f3ff980?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Negombo",
  },
];

export function ReviewComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewsPerPage = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Math.ceil(reviews.length / reviewsPerPage) - 1
          ? 0
          : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-4 bg-white"> {/* Reduced padding for the main section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6"> {/* Reduced padding for the main container */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900"> {/* Smaller heading */}
            What Our Customers Say
          </h2>
          <p className="mt-2 text-base text-gray-600"> {/* Reduced margin and font size */}
            Read trusted reviews from our happy customers
          </p>
        </div>

        <div className="mt-8 relative"> {/* Reduced margin */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / reviewsPerPage)}%)`, // Adjusted for 4 reviews per page
                width: `${(reviews.length / reviewsPerPage) * 100}%`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-1/4 px-2 box-border" // Reduced padding for reviews
                >
                  <div className="bg-gray-50 rounded-lg p-6 h-full"> {/* Reduced padding inside reviews */}
                    <div className="flex items-center">
                      <img
                        className="h-14 w-14 rounded-full" // Reduced avatar size
                        src={review.avatar}
                        alt={review.author}
                      />
                      <div className="ml-4"> {/* Reduced margin */}
                        <h3 className="text-base font-medium text-gray-900">
                          {review.author}
                        </h3>
                        <p className="text-sm text-gray-600">{review.location}</p> {/* Reduced font size */}
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{review.comment}</p> {/* Reduced font size and margin */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-1"> {/* Reduced margin */}
            {Array.from(
              { length: Math.ceil(reviews.length / reviewsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
