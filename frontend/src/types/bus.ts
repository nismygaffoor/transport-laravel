export interface Bus {
  id: string;
  name: string;
  operator: string;
  type: 'Private' | 'Public';
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
}

export interface Seat {
  id: string;
  number: number;
  isAvailable: boolean;
  isSelected?: boolean;
}
