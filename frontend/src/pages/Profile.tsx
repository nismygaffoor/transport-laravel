import { useState } from "react";
import { User } from "../types/user";
import { BookingDetails } from "../types/booking";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { BookingHistory } from "../components/profile/BookingHistory";
import { ReviewForm } from "../components/review/ReviewForm";

// Mock data for the user and bookings
const mockUser: User = {
  id: "1",
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "+94 71 234 5678",
  role: "user",
};

const mockBookings: BookingDetails[] = [
  {
    id: "1",
    userId: "1",
    busId: "1",
    seats: [12, 13],
    totalPrice: 2400,
    bookingDate: "2024-03-15",
    travelDate: "2024-03-20",
    status: "confirmed",
    bus: {
      name: "Express Line",
      operator: "Lanka Bus Lines",
      from: "Colombo",
      to: "Kandy",
      departureTime: "08:00",
      arrivalTime: "14:00",
    },
  },
  {
    id: "2",
    userId: "1",
    busId: "1",
    seats: [12, 13],
    totalPrice: 2400,
    bookingDate: "2024-03-15",
    travelDate: "2024-03-20",
    status: "completed",
    bus: {
      name: "Express Line",
      operator: "Lanka Bus Lines",
      from: "Colombo",
      to: "Kandy",
      departureTime: "08:00",
      arrivalTime: "14:00",
    },
    review: { rating: 5, comment: "Excellent service" },
  },
  {
    id: "3",
    userId: "1",
    busId: "1",
    seats: [12, 13],
    totalPrice: 2400,
    bookingDate: "2024-03-15",
    travelDate: "2024-03-20",
    status: "completed",
    bus: {
      name: "Express Line",
      operator: "Lanka Bus Lines",
      from: "Colombo",
      to: "Kandy",
      departureTime: "08:00",
      arrivalTime: "14:00",
    },
  },
];

export function Profile() {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });

  // Handle profile update logic
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Profile updated:", user);
  };

  // Handle review form submission
  const handleReviewSubmit = (_rating: number, _comment: string) => {
    console.log("Review submitted:", { rating: _rating, comment: _comment });
    // const updatedBookings = mockBookings.map((booking) =>
    //   booking.id === selectedBookingId
    //     ? { ...booking, review: { rating: _rating, comment: _comment } }
    //     : booking
    // );
    setShowReviewForm(false);
    setSelectedBookingId(null);
  };

  // Handle the review button click to show the review form
  const handleReview = (bookingId: string) => {
    const selectedBooking = mockBookings.find(
      (booking) => booking.id === bookingId
    );
    if (selectedBooking?.review) {
      setReviewData({
        rating: selectedBooking.review.rating,
        comment: selectedBooking.review.comment,
      });
    } else {
      setReviewData({ rating: 0, comment: "" });
    }
    setSelectedBookingId(bookingId);
    setShowReviewForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Profile Information Section */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Profile Information</h2>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
              <Input
                label="Full Name"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={!isEditing}
              />
              <Input
                label="Phone Number"
                value={user.phoneNumber}
                onChange={(e) =>
                  setUser({ ...user, phoneNumber: e.target.value })
                }
                disabled={!isEditing}
              />

              {isEditing && (
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              )}
            </form>
          </div>

          {/* Booking History Section */}
          <div>
            <h2 className="text-2xl font-bold">Booking History</h2>
            <div className="mt-4">
              <BookingHistory bookings={mockBookings} onReview={handleReview} />
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Write a Review</h2>
              <div className="mt-4">
                <ReviewForm
                  rating={reviewData.rating}
                  comment={reviewData.comment}
                  onSubmit={handleReviewSubmit}
                />
              </div>
            </div>
          )}

          {/* Display Selected Booking ID */}
          {selectedBookingId && (
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <p className="text-gray-700">
                Selected Booking ID:{" "}
                <span className="font-bold">{selectedBookingId}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
