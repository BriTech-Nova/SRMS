import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface InventoryItem {
  itemName: string;
  quantity: number;
  status: 'In Stock' | 'Out of Stock' | 'Damaged';
}

const initialInventory: InventoryItem[] = [
  { itemName: 'Textbooks', quantity: 1120, status: 'In Stock' },
  { itemName: 'Lab Kits', quantity: 5, status: 'Out of Stock' },
  { itemName: 'Exercise Books', quantity: 500, status: 'In Stock' },
  { itemName: 'Laptops', quantity: 2, status: 'Damaged' },
];

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemStatus, setNewItemStatus] = useState<'In Stock' | 'Out of Stock' | 'Damaged'>('In Stock');

  const handleEditClick = (item: InventoryItem) => {
    setEditingItem(item);
    setNewItemName(item.itemName);
    setNewItemQuantity(String(item.quantity));
    setNewItemStatus(item.status);
  };

  const handleOrderClick = (item: InventoryItem) => {
    alert(`Initiating order for ${item.itemName}.`);
    // In a real application, you would trigger an order process here.
  };

  const handleViewClick = (item: InventoryItem) => {
    alert(`Viewing details for ${item.itemName} (Status: ${item.status}, Quantity: ${item.quantity}).`);
    // In a real application, you might show a modal with more details.
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const updatedInventory = inventory.map((item) =>
        item.itemName === editingItem.itemName
          ? { itemName: newItemName, quantity: parseInt(newItemQuantity, 10), status: newItemStatus }
          : item
      );
      setInventory(updatedInventory);
      setEditingItem(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="container mt-4">
      <h1>Inventory Management</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.itemName}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              <td>
                {item.status === 'In Stock' || item.status === 'Damaged' ? (
                  <button className="btn btn-primary me-2" onClick={() => handleEditClick(item)}>
                    Edit
                  </button>
                ) : null}
                {item.status === 'Out of Stock' ? (
                  <button className="btn btn-warning me-2" onClick={() => handleOrderClick(item)}>
                    Order
                  </button>
                ) : null}
                {item.status === 'Damaged' ? (
                  <button className="btn btn-info" onClick={() => handleViewClick(item)}>
                    View
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItem && (
        <div className="card mt-4 p-3">
          <h3>Edit Item: {editingItem.itemName}</h3>
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              value={newItemStatus}
              onChange={(e) => setNewItemStatus(e.target.value as 'In Stock' | 'Out of Stock' | 'Damaged')}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <button className="btn btn-success me-2" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement; 