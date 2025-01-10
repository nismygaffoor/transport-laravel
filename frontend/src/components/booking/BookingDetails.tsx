import { Bus } from "../../types/bus";

interface BookingDetailsProps {
  bus: Pick<
    Bus,
    "name" | "operator" | "from" | "to" | "departureTime" | "arrivalTime"
  >;
  seats: number[];
  totalPrice: number;
  travelDate: string;
}

export function BookingDetails({
  bus,
  seats,
  totalPrice,
  travelDate,
}: BookingDetailsProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Bus Details</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem label="Bus Name" value={bus.name} />
          <DetailItem label="Operator" value={bus.operator} />
          <DetailItem label="From" value={bus.from} />
          <DetailItem label="To" value={bus.to} />
          <DetailItem label="Departure" value={bus.departureTime} />
          <DetailItem label="Arrival" value={bus.arrivalTime} />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem label="Travel Date" value={travelDate} />
          <DetailItem label="Selected Seats" value={seats.join(", ")} />
          <DetailItem label="Number of Seats" value={seats.length.toString()} />
          <DetailItem
            label="Price per Seat"
            value={`Rs. ${totalPrice / seats.length}`}
          />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
