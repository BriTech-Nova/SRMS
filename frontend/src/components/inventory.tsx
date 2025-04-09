import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface InventoryItem {
    id: number; // Django will provide an 'id'
    item_name: string;
    quantity: number;
    status: 'In Stock' | 'Out of Stock' | 'Damaged';
}

const InventoryManagement: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');
    const [newItemStatus, setNewItemStatus] = useState<'In Stock' | 'Out of Stock' | 'Damaged'>('In Stock');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/inventory/items/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: InventoryItem[] = await response.json();
            setInventory(data);
        } catch (e: any) {
            setError('Failed to fetch inventory.');
            console.error('Fetch inventory error:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (item: InventoryItem) => {
        setEditingItem(item);
        setNewItemName(item.item_name);
        setNewItemQuantity(String(item.quantity));
        setNewItemStatus(item.status);
    };

    const handleOrderClick = (item: InventoryItem) => {
        alert(`Initiating order for ${item.item_name}.`);
        // In a real application, you would trigger an order process here by sending a request to the backend.
    };

    const handleViewClick = (item: InventoryItem) => {
        alert(`Viewing details for ${item.item_name} (Status: ${item.status}, Quantity: ${item.quantity}).`);
        // In a real application, you might show a modal with more details fetched from the backend if needed.
    };

    const handleSaveEdit = async () => {
        if (editingItem) {
            setError(null);
            try {
                const response = await fetch(`/api/inventory/items/${editingItem.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        item_name: newItemName,
                        quantity: parseInt(newItemQuantity, 10),
                        status: newItemStatus,
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to update item: ${JSON.stringify(errorData)}`);
                }
                const updatedItem: InventoryItem = await response.json();
                const updatedInventory = inventory.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                setInventory(updatedInventory);
                setEditingItem(null);
            } catch (e: any) {
                setError('Failed to update inventory item.');
                console.error('Update inventory item error:', e);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
    };

    if (loading) {
        return <div>Loading inventory...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

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
                        <tr key={item.id}>
                            <td>{item.item_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.status}</td>
                            <td>
                                {(item.status === 'In Stock' || item.status === 'Damaged') && (
                                    <button className="btn btn-primary me-2" onClick={() => handleEditClick(item)}>
                                        Edit
                                    </button>
                                )}
                                {item.status === 'Out of Stock' && (
                                    <button className="btn btn-warning me-2" onClick={() => handleOrderClick(item)}>
                                        Order
                                    </button>
                                )}
                                {item.status === 'Damaged' && (
                                    <button className="btn btn-info" onClick={() => handleViewClick(item)}>
                                        View
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingItem && (
                <div className="card mt-4 p-3">
                    <h3>Edit Item: {editingItem.item_name}</h3>
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