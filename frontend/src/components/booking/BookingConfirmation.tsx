import { Button } from "../ui/Button";
import { BookingDetails } from "./BookingDetails";
import { PaymentSummary } from "./PaymentSummary";

interface BookingConfirmationProps {
  booking: {
    bus: {
      id: string;
      name: string;
      operator: string;
      from: string;
      to: string;
      departureTime: string;
      arrivalTime: string;
      price: number;
    };
    seats: number[];
    totalPrice: number;
    seatPrice: number; // Add seatPrice
    serviceFee: number; // Add serviceFee
    travelDate: string;
  };
  onConfirm: () => void;
}

export function BookingConfirmation({
  booking,
  onConfirm,
}: BookingConfirmationProps) {
  const total = booking.totalPrice + booking.serviceFee;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Booking Confirmation</h1>

      <div className="space-y-6">
        <BookingDetails
          bus={booking.bus}
          seats={booking.seats}
          totalPrice={booking.totalPrice}
          travelDate={booking.travelDate}
        />

        <PaymentSummary
          subtotal={booking.totalPrice}
          serviceFee={booking.serviceFee}
          total={total}
        />

        <div className="flex justify-end">
          <Button onClick={onConfirm} size="lg">
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
