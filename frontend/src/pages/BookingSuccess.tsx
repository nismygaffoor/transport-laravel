import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Your bus tickets have been booked successfully
            </p>
          </div>

          {/* Booking Reference */}
          <div className="mb-8 rounded-lg bg-blue-50 p-4 text-center">
            <p className="text-sm text-blue-700">Booking Reference</p>
            <p className="text-lg font-bold text-blue-900">{booking.id}</p>
          </div>

          {/* Journey Details */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Journey Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium text-gray-900">{booking.bus.from}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium text-gray-900">{booking.bus.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{booking.travelDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-900">{booking.bus.departureTime}</p>
              </div>
            </div>
          </div>

          {/* Bus Details */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Bus Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Bus Name</p>
                <p className="font-medium text-gray-900">{booking.bus.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Operator</p>
                <p className="font-medium text-gray-900">{booking.bus.operator}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seat Numbers</p>
                <p className="font-medium text-gray-900">{booking.seats.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount (including service fee)</p>
                <p className="font-medium text-gray-900">Rs. {booking.totalPrice }</p>
              

              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="mb-8 rounded-lg bg-yellow-50 p-4">
            <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-700">
              <li>Please arrive at least 15 minutes before departure</li>
              <li>Carry a valid ID proof for verification</li>
              <li>Download or take a screenshot of this ticket</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex-1"
            >
              Download Ticket
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Book Another Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
