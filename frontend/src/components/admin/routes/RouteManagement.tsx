import { useState } from 'react';
import { Bus } from '../../../types/bus';
import { Button } from '../../ui/Button';
import { BusForm } from './RouteForm';  // Form for adding/editing buses
import { BusList } from './RouteList';  // List of buses


  interface RouteManagementProps {
    buses: Bus[];  // Corrected to accept buses
    onAdd: (bus: Omit<Bus, 'id'>) => void;
    onEdit: (id: string, bus: Partial<Bus>) => void;
    onDelete: (id: string) => void;
  }
  

export function RouteManagement({
  buses,
  onAdd,
  onEdit,
  onDelete,
}: RouteManagementProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Bus Details</h2>
        <Button onClick={() => setIsAdding(true)}>
          {editingId ? 'Edit Bus' : 'Add New Bus'}
        </Button>
      </div>

      {(isAdding || editingId) && (
        <BusForm
          editingBus={editingId ? buses.find((b) => b.id === editingId) : undefined}
          onSubmit={(bus) => {
            if (editingId) {
              onEdit(editingId, bus);
              setEditingId(null);
            } else {
              onAdd(bus);
            }
            setIsAdding(false);
          }}
          onCancel={() => {
            setIsAdding(false);
            setEditingId(null);
          }}
        />
      )}

      <BusList
        buses={buses}
        onEdit={(bus) => {
          setEditingId(bus.id);
          setIsAdding(true);  // Optional: Set `isAdding` to true to show the form
        }}
        onDelete={onDelete}
      />
    </div>
  );
}
