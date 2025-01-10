// src/api.ts

import { Bus } from '../types/bus';  // Importing the Bus type


const API_URL = "http://localhost:8000/api/admin/buses"; // Replace this with your actual API URL

export const fetchRoutes = async (): Promise<Bus[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }
  return response.json();
};

export const addRoute = async (route: Omit<Bus, "id">): Promise<Bus> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  });
  if (!response.ok) {
    throw new Error("Failed to add route");
  }
  return response.json();
};

export const updateRoute = async (
  id: string,
  route: Partial<Bus>
): Promise<Bus> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  });
  if (!response.ok) {
    throw new Error("Failed to update route");
  }
  return response.json();
};

export const deleteRoute = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete route");
  }
};
