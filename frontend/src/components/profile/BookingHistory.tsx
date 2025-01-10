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

interface BookingHistoryProps {
  bookings: BookingDetails[];
  onReview: (bookingId: string) => void;
}

export function BookingHistory({ bookings, onReview }: BookingHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
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
              {booking.status}
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
            <div className="mt-4">
              <p className="text-sm font-semibold">Your Review:</p>
              <p className="text-sm">{booking.review.comment}</p>
              <p className="text-sm">Rating: {booking.review.rating}⭐</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReview(booking.id)}
                >
                  Edit Review
                </Button>
              </div>
            </div>
          ) : (
            booking.status === "completed" && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReview(booking.id)}
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
