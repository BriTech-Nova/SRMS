import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LibraryManagement from './library'; // Assuming library.tsx is in the same directory
import Storekeeper from './Storekeeper'; // Ensure the file name matches exactly, including case sensitivity
import LabManagement from './lab'; 

interface MaterialOrderRequest {
    id: number;
    item_name: string;
    request_date: string;
}

interface BookOrderRequest {
    id: number;
    book: number;
    book_title?: string;
    request_date: string;
}

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
    const [activeTab, setActiveTab] = useState<'library' | 'storekeeper' | 'lab' | 'orders' | 'reports'>('library');
    const [materialOrders, setMaterialOrders] = useState<MaterialOrderRequest[]>([]);
    const [bookOrders, setBookOrders] = useState<BookOrderRequest[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMaterialOrders();
        fetchBookOrders();
    }, []);

    const fetchMaterialOrders = async () => {
        setLoadingOrders(true);
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/order-requests/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: MaterialOrderRequest[] = await response.json();
            setMaterialOrders(data);
        } catch (e: any) {
            setError('Failed to fetch material orders.');
            console.error('Fetch material orders error:', e);
        } finally {
            setLoadingOrders(false);
        }
    };

    const fetchBookOrders = async () => {
        setLoadingOrders(true);
        setError(null);
        try {
            const response = await fetch('/api/library/orders/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: BookOrderRequest[] = await response.json();
            setBookOrders(data);
        } catch (e: any) {
            setError('Failed to fetch book orders.');
            console.error('Fetch book orders error:', e);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleApproveMaterialOrder = async (orderId: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/storekeeper/order-requests/${orderId}/`, {
                method: 'DELETE', // Or PATCH/PUT depending on your API design
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to approve material order: ${JSON.stringify(errorData)}`);
            }
            await response.json(); // Handle success message if needed
            fetchMaterialOrders();
        } catch (e: any) {
            setError('Failed to approve material order.');
            console.error('Approve material order error:', e);
        }
    };

    const handleApproveBookOrder = async (orderId: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/library/orders/${orderId}/`, {
                method: 'DELETE', // Or PATCH/PUT depending on your API design
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to approve book order: ${JSON.stringify(errorData)}`);
            }
            await response.json(); // Handle success message if needed
            fetchBookOrders();
        } catch (e: any) {
            setError('Failed to approve book order.');
            console.error('Approve book order error:', e);
        }
    };

    const generateLibraryReport = () => {
        window.open('/api/library/reports/', '_blank'); // Assuming you have a Django endpoint for this
    };

    const generateStorekeeperReport = () => {
        window.open('/api/storekeeper/reports/', '_blank'); // Assuming you have a Django endpoint for this
    };

    const generateLabReport = () => {
        window.open('/api/lab/reports/', '_blank'); // Assuming you have a Django endpoint for this
    };

    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'library' ? 'active' : ''}`} onClick={() => setActiveTab('library')}>Library</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'storekeeper' ? 'active' : ''}`} onClick={() => setActiveTab('storekeeper')}>Storekeeper</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'lab' ? 'active' : ''}`} onClick={() => setActiveTab('lab')}>Lab</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Reports</button>
                </li>
            </ul>

            <div className="mt-3">
                {activeTab === 'library' && <LibraryManagement />}
                {activeTab === 'storekeeper' && <Storekeeper />}
                {activeTab === 'lab' && <LabManagement />}
                {activeTab === 'orders' && (
                    <div>
                        <h2>Order Requests</h2>
                        {loadingOrders && <p>Loading orders...</p>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        {!loadingOrders && (
                            <>
                                <h3>Book Orders</h3>
                                {bookOrders.length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr><th>ID</th><th>Book Title</th><th>Request Date</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {bookOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.book_title}</td>
                                                    <td>{new Date(order.request_date).toLocaleDateString()}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success" onClick={() => handleApproveBookOrder(order.id)}>Approve</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No book order requests.</p>
                                )}

                                <h3 className="mt-3">Material Orders</h3>
                                {materialOrders.length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr><th>ID</th><th>Item Name</th><th>Request Date</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {materialOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.item_name}</td>
                                                    <td>{new Date(order.request_date).toLocaleDateString()}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success" onClick={() => handleApproveMaterialOrder(order.id)}>Approve</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No material order requests.</p>
                                )}
                            </>
                        )}
                    </div>
                )}
                {activeTab === 'reports' && (
                    <div>
                        <h2>Generate Reports</h2>
                        <button className="btn btn-primary me-2" onClick={generateLibraryReport}>Generate Library Report</button>
                        <button className="btn btn-primary me-2" onClick={generateStorekeeperReport}>Generate Storekeeper Report</button>
                        <button className="btn btn-primary" onClick={generateLabReport}>Generate Lab Report</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;