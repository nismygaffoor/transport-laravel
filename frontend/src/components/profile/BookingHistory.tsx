// import { BookingDetails } from "../../types/booking";
// import { Button } from "../ui/Button";

// interface BookingHistoryProps {
//   bookings: BookingDetails[];
//   onReview: (bookingId: string) => void;
// }

// export function BookingHistory({ bookings, onReview }: BookingHistoryProps) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       case "completed":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {bookings.map((booking) => (
//         <div key={booking.id} className="rounded-lg border bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold">{booking.bus.name}</h3>
//               <p className="text-sm text-gray-600">{booking.bus.operator}</p>
//             </div>
//             <div className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(booking.status)}`}>
//               {booking.status}
//             </div>
//           </div>
//           <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
//             <div>
//               <p className="text-sm text-gray-600">From</p>
//               <p className="font-medium">{booking.bus.from}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">To</p>
//               <p className="font-medium">{booking.bus.to}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Travel Date</p>
//               <p className="font-medium">{booking.travelDate}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Seats</p>
//               <p className="font-medium">{booking.seats.join(", ")}</p>
//             </div>
//           </div>
//           {booking.status === "completed" && (
//             <div className="mt-4 flex justify-end">
//               <Button variant="outline" size="sm" onClick={() => onReview(booking.id)}>
//                 Write Review
//               </Button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import { BookingDetails } from "../../types/booking";
import { Button } from "../ui/Button";
import { useState } from "react";
import { Star } from "lucide-react";

interface BookingHistoryProps {
  bookings: BookingDetails[];
  onReview: (bookingId: string) => void;
}

export function BookingHistory({ bookings, onReview }: BookingHistoryProps) {
  const [reviewingBookingId, setReviewingBookingId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [hoveredRatings, setHoveredRatings] = useState<Record<string, number>>({});

  const getStatusColor = (status: string) => {
    const normalizedStatus = String(status).toLowerCase().trim();
    switch (normalizedStatus) {
      case "booked":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const normalizedStatus = String(status).toLowerCase().trim();
    return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
  };

  const handleSubmitReview = (bookingId: string) => {
    const rating = ratings[bookingId] || 0;
    const comment = comments[bookingId] || "";
    if (rating === 0 || !comment) {
      alert("Please provide both rating and comment");
      return;
    }
    onReview(bookingId);
    setReviewingBookingId(null);
    setRatings({ ...ratings, [bookingId]: 0 });
    setComments({ ...comments, [bookingId]: "" });
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{booking.bus.name}</h3>
              <p className="text-sm text-gray-600">{booking.bus.operator}</p>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                booking.status
              )}`}
            >
              {getStatusLabel(booking.status)}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-medium">{booking.bus.from}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">To</p>
              <p className="font-medium">{booking.bus.to}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Travel Date</p>
              <p className="font-medium">{booking.travelDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Seats</p>
              <p className="font-medium">{booking.seats.join(", ")}</p>
            </div>
          </div>

          {/* Show existing review if available */}
          {booking.review ? (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-semibold">Your Review:</p>
              <div className="mt-2 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < booking.review!.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm">{booking.review.comment}</p>
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewingBookingId(booking.id)}
                >
                  Edit Review
                </Button>
              </div>
            </div>
          ) : reviewingBookingId === booking.id ? (
            <div className="mt-4 border-t pt-4 space-y-3">
              <p className="text-sm font-semibold">Write a Review</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRatings({ ...ratings, [booking.id]: value })}
                      onMouseEnter={() => setHoveredRatings({ ...hoveredRatings, [booking.id]: value })}
                      onMouseLeave={() => setHoveredRatings({ ...hoveredRatings, [booking.id]: 0 })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${value <= (hoveredRatings[booking.id] || ratings[booking.id] || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  rows={3}
                  value={comments[booking.id] || ""}
                  onChange={(e) => setComments({ ...comments, [booking.id]: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewingBookingId(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSubmitReview(booking.id)}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          ) : (
            String(booking.status).toLowerCase().trim() === "completed" && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewingBookingId(booking.id)}
                >
                  Write Review
                </Button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
