export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: 'user' | 'admin';
}

export interface Review {
  id: string;
  userId: string;
  busId: string;
  rating: number;
  comment: string;
  createdAt: string;
}