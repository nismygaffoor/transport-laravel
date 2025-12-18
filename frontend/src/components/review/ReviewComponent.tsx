import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { apiUrl } from "../http";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  avatar: string;
  location: string;
}

export function ReviewComponent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${apiUrl}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();

        const mappedReviews: Review[] = data.map((item: any) => ({
          id: String(item.id),
          author: item.user?.name || "Anonymous",
          rating: item.rating,
          comment: item.comment,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.name || "User")}&background=random`,
          location: item.bus ? `${item.bus.from} - ${item.bus.to}` : "Sri Lanka",
        }));
        setReviews(mappedReviews);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Math.ceil(reviews.length / reviewsPerPage) - 1
          ? 0
          : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Read trusted reviews from our happy customers
          </p>
        </div>

        <div className="mt-8 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / reviewsPerPage)}%)`,
                width: `${Math.max(100, (reviews.length / reviewsPerPage) * 100)}%`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-1/4 px-2 box-border"
                >
                  <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-full"
                          src={review.avatar}
                          alt={review.author}
                        />
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">
                            {review.author}
                          </h3>
                          <p className="text-sm text-gray-600">{review.location}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-5 w-5 ${index < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {reviews.length > reviewsPerPage && (
            <div className="mt-6 flex justify-center space-x-1">
              {Array.from(
                { length: Math.ceil(reviews.length / reviewsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
