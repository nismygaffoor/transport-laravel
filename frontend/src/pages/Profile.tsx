import { useEffect, useState } from "react";
import { User } from "../types/user";
import { BookingDetails } from "../types/booking";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { BookingHistory } from "../components/profile/BookingHistory";
import { ReviewForm } from "../components/review/ReviewForm";
import { apiUrl } from "../components/http";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const userInfoRaw = localStorage.getItem("userInfo");
    if (!userInfoRaw) {
      setError("Please log in to view your profile.");
      return;
    }
    const userInfo = JSON.parse(userInfoRaw);
    const userId = userInfo.id;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch user
        const userRes = await fetch(`${apiUrl}/users/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userJson = await userRes.json();
        const mappedUser: User = {
          id: String(userJson.id),
          fullName: userJson.name,
          email: userJson.email,
          phoneNumber: userJson.phone ?? "",
          role: userJson.role === "admin" ? "admin" : "user",
        };
        setUser(mappedUser);

        // Load avatar from localStorage
        const storedAvatar = localStorage.getItem(`userAvatar:${userId}`);
        if (storedAvatar) {
          setAvatarUrl(storedAvatar);
        }

        // Fetch bookings for user
        const bookingsRes = await fetch(`${apiUrl}/bookings/user/${userId}`);
        if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
        const bookingsJson = await bookingsRes.json();
        const mapped: BookingDetails[] = bookingsJson.map((b: any) => ({
          id: String(b.id),
          userId: String(b.user_id),
          busId: String(b.bus_id),
          seats: (b.seat_numbers || "")
            .split(",")
            .map((s: string) => parseInt(s, 10))
            .filter((n: number) => !Number.isNaN(n)),
          totalPrice: Number(b.total_price ?? 0),
          bookingDate: b.created_at,
          travelDate: b.travel_date,
          status: (b.status ?? "confirmed") as BookingDetails["status"],
          bus: {
            name: b.bus?.name ?? "",
            operator: b.bus?.operator ?? "",
            from: b.bus?.from ?? "",
            to: b.bus?.to ?? "",
            departureTime: b.bus?.departure_time ?? "",
            arrivalTime: b.bus?.arrival_time ?? "",
          },
          review: b.review
            ? {
              rating: b.review.rating,
              comment: b.review.comment,
            }
            : undefined,
        }));
        setBookings(mapped);
      } catch (err: any) {
        setError(err?.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem(`userAvatar:${user.id}`, dataUrl);
      setAvatarUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-28 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border bg-white p-6 shadow-sm text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Handle profile update logic
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Profile updated:", user);
  };

  // Handle review form submission
  const handleReviewSubmit = async (_rating: number, _comment: string) => {
    if (!user || !selectedBookingId) return;
    const selected = bookings.find((b) => b.id === selectedBookingId);
    const busId = selected?.busId;
    if (!busId) return;

    try {
      const res = await fetch(`${apiUrl}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: Number(user.id),
          bus_id: Number(busId),
          booking_id: Number(selectedBookingId),
          rating: _rating,
          comment: _comment,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit review');

      // Optimistically update local state
      const updated = bookings.map((b) =>
        b.id === selectedBookingId
          ? { ...b, review: { rating: _rating, comment: _comment } }
          : b
      );
      setBookings(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setShowReviewForm(false);
      setSelectedBookingId(null);
    }
  };

  // Handle the review button click to show the review form
  const handleReview = (bookingId: string) => {
    const selectedBooking = bookings.find(
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

            {/* Avatar */}
            <div className="mt-6 flex items-center gap-4">
              <img
                src={avatarUrl || "/user-interface.png"}
                alt="Avatar"
                className="h-16 w-16 rounded-full object-cover border"
              />
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="mt-1"
                  />
                  <p className="mt-1 text-xs text-gray-500">Stored locally. Visible in navbar.</p>
                </div>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
                {user && (
                  <Input
                    label="Full Name"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({ ...user, fullName: e.target.value })
                    }
                  />
                )}
                <Input
                  label="Email"
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) =>
                    user && setUser({ ...user, email: e.target.value })
                  }
                />
                <Input
                  label="Phone Number"
                  value={user?.phoneNumber || ""}
                  onChange={(e) =>
                    user && setUser({ ...user, phoneNumber: e.target.value })
                  }
                />

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            ) : (
              <div className="mt-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-base font-medium text-gray-900">{user?.fullName || ""}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base font-medium text-gray-900">{user?.email || ""}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="text-base font-medium text-gray-900">{user?.phoneNumber || ""}</p>
                </div>
              </div>
            )}
          </div>

          {/* Booking History Section */}
          <div>
            <h2 className="text-2xl font-bold">Booking History</h2>
            <div className="mt-4">
              <BookingHistory bookings={bookings} onReview={handleReview} />
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
