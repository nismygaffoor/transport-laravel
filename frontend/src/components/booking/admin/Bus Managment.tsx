import { useState, useEffect } from "react";

const fetchBuses = async () => {
  return [
    { id: 1, number: "AB1234", type: "Luxury", capacity: 40 },
    { id: 2, number: "CD5678", type: "Semi-Luxury", capacity: 30 },
  ];
};

export function BusManagement() {
  const [buses, setBuses] = useState<{ id: number; number: string; type: string; capacity: number }[]>([]);
  const [newBus, setNewBus] = useState<{ number: string; type: string; capacity: number }>({
    number: "",
    type: "",
    capacity: 0, // Initialize capacity as a number
  });

  useEffect(() => {
    const loadBuses = async () => {
      const data = await fetchBuses();
      setBuses(data);
    };
    loadBuses();
  }, []);

  const handleAddBus = () => {
    setBuses([...buses, { id: buses.length + 1, ...newBus }]);
    setNewBus({ number: "", type: "", capacity: 0 }); // Reset to initial state
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bus Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Bus Number"
          value={newBus.number}
          onChange={(e) => setNewBus({ ...newBus, number: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={newBus.type}
          onChange={(e) => setNewBus({ ...newBus, type: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newBus.capacity}
          onChange={(e) => setNewBus({ ...newBus, capacity: e.target.valueAsNumber })}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleAddBus}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Bus
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="border px-4 py-2">Bus Number</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td className="border px-4 py-2">{bus.number}</td>
              <td className="border px-4 py-2">{bus.type}</td>
              <td className="border px-4 py-2">{bus.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
