interface PaymentSummaryProps {
  subtotal: number;
  serviceFee: number;
  total: number;
}

export function PaymentSummary({ subtotal, serviceFee, total }: PaymentSummaryProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
      
      <div className="mt-4 space-y-3 border-b border-gray-200 pb-4">
        <PriceRow label="Subtotal" value={subtotal} />
        <PriceRow label="Service Fee" value={serviceFee} />
      </div>
      
      <div className="mt-4 flex justify-between">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-lg font-bold text-blue-600">Rs. {total}</span>
      </div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900">Rs. {value}</span>
    </div>
  );
}