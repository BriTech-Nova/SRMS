import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ExerciseBook {
    id: number;
    type: string; // e.g., 'lined', 'squared'
    quantity: number;
    issued: number;
}

interface LearningMaterial {
    id: number;
    name: string;
    description: string;
    quantity: number;
    issued: number;
}

interface TeacherNoteBook {
    id: number;
    teacher_id: number;
    quantity: number;
    issued: number;
}

interface MaterialOrderRequest {
    id: number;
    item_name: string;
    request_date: string;
}

const Storekeeper: React.FC = () => {
    const [exerciseBooks, setExerciseBooks] = useState<ExerciseBook[]>([]);
    const [learningMaterials, setLearningMaterials] = useState<LearningMaterial[]>([]);
    const [teacherNoteBooks, setTeacherNoteBooks] = useState<TeacherNoteBook[]>([]);
    const [orderRequests, setOrderRequests] = useState<MaterialOrderRequest[]>([]);

    const [newExerciseBookType, setNewExerciseBookType] = useState('');
    const [newExerciseBookQuantity, setNewExerciseBookQuantity] = useState(1);
    const [newLearningMaterialName, setNewLearningMaterialName] = useState('');
    const [newLearningMaterialDescription, setNewLearningMaterialDescription] = useState('');
    const [newLearningMaterialQuantity, setNewLearningMaterialQuantity] = useState(1);
    const [newTeacherNoteBookTeacherId, setNewTeacherNoteBookTeacherId] = useState(0);
    const [newTeacherNoteBookQuantity, setNewTeacherNoteBookQuantity] = useState(1);

    const [loadingExerciseBooks, setLoadingExerciseBooks] = useState(true);
    const [loadingLearningMaterials, setLoadingLearningMaterials] = useState(true);
    const [loadingTeacherNoteBooks, setLoadingTeacherNoteBooks] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchExerciseBooks();
        fetchLearningMaterials();
        fetchTeacherNoteBooks();
        fetchOrderRequests();
    }, []);

    const fetchExerciseBooks = async () => {
        setLoadingExerciseBooks(true);
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/exercise-books/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ExerciseBook[] = await response.json();
            setExerciseBooks(data);
        } catch (e: any) {
            setError('Failed to fetch exercise books.');
            console.error('Fetch exercise books error:', e);
        } finally {
            setLoadingExerciseBooks(false);
        }
    };

    const fetchLearningMaterials = async () => {
        setLoadingLearningMaterials(true);
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/learning-materials/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: LearningMaterial[] = await response.json();
            setLearningMaterials(data);
        } catch (e: any) {
            setError('Failed to fetch learning materials.');
            console.error('Fetch learning materials error:', e);
        } finally {
            setLoadingLearningMaterials(false);
        }
    };

    const fetchTeacherNoteBooks = async () => {
        setLoadingTeacherNoteBooks(true);
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/teacher-notebooks/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: TeacherNoteBook[] = await response.json();
            setTeacherNoteBooks(data);
        } catch (e: any) {
            setError('Failed to fetch teacher notebooks.');
            console.error('Fetch teacher notebooks error:', e);
        } finally {
            setLoadingTeacherNoteBooks(false);
        }
    };

    const fetchOrderRequests = async () => {
        setLoadingOrders(true);
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/order-requests/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: MaterialOrderRequest[] = await response.json();
            setOrderRequests(data);
        } catch (e: any) {
            setError('Failed to fetch order requests.');
            console.error('Fetch order requests error:', e);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleAddExerciseBook = async () => {
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/exercise-books/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: newExerciseBookType,
                    quantity: newExerciseBookQuantity,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add exercise book: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchExerciseBooks();
            setNewExerciseBookType('');
            setNewExerciseBookQuantity(1);
        } catch (e: any) {
            setError('Failed to add exercise book.');
            console.error('Add exercise book error:', e);
        }
    };

    const handleAddLearningMaterial = async () => {
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/learning-materials/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newLearningMaterialName,
                    description: newLearningMaterialDescription,
                    quantity: newLearningMaterialQuantity,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add learning material: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchLearningMaterials();
            setNewLearningMaterialName('');
            setNewLearningMaterialDescription('');
            setNewLearningMaterialQuantity(1);
        } catch (e: any) {
            setError('Failed to add learning material.');
            console.error('Add learning material error:', e);
        }
    };

    const handleAddTeacherNoteBook = async () => {
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/teacher-notebooks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacher_id: newTeacherNoteBookTeacherId,
                    quantity: newTeacherNoteBookQuantity,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add teacher notebook: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchTeacherNoteBooks();
            setNewTeacherNoteBookTeacherId(0);
            setNewTeacherNoteBookQuantity(1);
        } catch (e: any) {
            setError('Failed to add teacher notebook.');
            console.error('Add teacher notebook error:', e);
        }
    };

    const handleIssueExerciseBooks = async (bookId: number, issueQuantity: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/storekeeper/exercise-books/${bookId}/issue/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: issueQuantity }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to issue exercise books: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchExerciseBooks();
        } catch (e: any) {
            setError('Failed to issue exercise books.');
            console.error('Issue exercise books error:', e);
        }
    };

    const handleIssueLearningMaterials = async (materialId: number, issueQuantity: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/storekeeper/learning-materials/${materialId}/issue/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: issueQuantity }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to issue learning materials: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchLearningMaterials();
        } catch (e: any) {
            setError('Failed to issue learning materials.');
            console.error('Issue learning materials error:', e);
        }
    };

    const handleIssueTeacherNoteBooks = async (noteBookId: number, issueQuantity: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/storekeeper/teacher-notebooks/${noteBookId}/issue/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: issueQuantity }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to issue teacher notebooks: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchTeacherNoteBooks();
        } catch (e: any) {
            setError('Failed to issue teacher notebooks.');
            console.error('Issue teacher notebooks error:', e);
        }
    };

    const handleOrderRequest = async (itemName: string) => {
        setError(null);
        try {
            const response = await fetch('/api/storekeeper/order-requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_name: itemName }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create order request: ${JSON.stringify(errorData)}`);
            }
            await response.json();
            fetchOrderRequests();
        } catch (e: any) {
            setError('Failed to create order request.');
            console.error('Create order request error:', e);
        }
    };

    if (loadingExerciseBooks || loadingLearningMaterials || loadingTeacherNoteBooks || loadingOrders) {
        return <div>Loading storekeeper data...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            <h1>Storekeeper Management</h1>

            <h2 className="mt-4">Exercise Books</h2>
            <div className="mb-3">
                <input type="text" placeholder="Type (e.g., Lined)" value={newExerciseBookType} onChange={(e) => setNewExerciseBookType(e.target.value)} className="form-control" />
                <input type="number" placeholder="Quantity" value={newExerciseBookQuantity} onChange={(e) => setNewExerciseBookQuantity(Number(e.target.value))} className="form-control mt-2" />
                <button onClick={handleAddExerciseBook} className="btn btn-primary mt-2">Add Book</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr><th>ID</th><th>Type</th><th>Quantity</th><th>Issued</th><th>Issue</th></tr>
                </thead>
                <tbody>
                    {exerciseBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.type}</td>
                            <td>{book.quantity}</td>
                            <td>{book.issued}</td>
                            <td><button onClick={() => handleIssueExerciseBooks(book.id, 10)} className="btn btn-sm btn-success">Issue 10</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mt-4">Learning Materials</h2>
            <div className="mb-3">
                <input type="text" placeholder="Name" value={newLearningMaterialName} onChange={(e) => setNewLearningMaterialName(e.target.value)} className="form-control" />
                <input type="text" placeholder="Description" value={newLearningMaterialDescription} onChange={(e) => setNewLearningMaterialDescription(e.target.value)} className="form-control mt-2" />
                <input type="number" placeholder="Quantity" value={newLearningMaterialQuantity} onChange={(e) => setNewLearningMaterialQuantity(Number(e.target.value))} className="form-control mt-2" />
                <button onClick={handleAddLearningMaterial} className="btn btn-primary mt-2">Add Material</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Description</th><th>Quantity</th><th>Issued</th><th>Issue</th><th>Order</th></tr>
                </thead>
                <tbody>
                    {learningMaterials.map((material) => (
                        <tr key={material.id}>
                            <td>{material.id}</td>
                            <td>{material.name}</td>
                            <td>{material.description}</td>
                            <td>{material.quantity}</td>
                            <td>{material.issued}</td>
                            <td><button onClick={() => handleIssueLearningMaterials(material.id, 5)} className="btn btn-sm btn-success">Issue 5</button></td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => handleOrderRequest(material.name)}>Order</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mt-4">Teacher Note Books</h2>
            <div className="mb-3">
                <input type="number" placeholder="Teacher ID" value={newTeacherNoteBookTeacherId} onChange={(e) => setNewTeacherNoteBookTeacherId(Number(e.target.value))} className="form-control" />
                <input type="number" placeholder="Quantity" value={newTeacherNoteBookQuantity} onChange={(e) => setNewTeacherNoteBookQuantity(Number(e.target.value))} className="form-control mt-2" />
                <button onClick={handleAddTeacherNoteBook} className="btn btn-primary mt-2">Add Note Book</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr><th>ID</th><th>Teacher ID</th><th>Quantity</th><th>Issued</th><th>Issue</th></tr>
                </thead>
                <tbody>
                    {teacherNoteBooks.map((noteBook) => (
                        <tr key={noteBook.id}>
                            <td>{noteBook.id}</td>
                            <td>{noteBook.teacher_id}</td>
                            <td>{noteBook.quantity}</td>
                            <td>{noteBook.issued}</td>
                            <td><button onClick={() => handleIssueTeacherNoteBooks(noteBook.id, 1)} className="btn btn-sm btn-success">Issue 1</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mt-4">Order Requests</h2>
            <ul>
                {orderRequests.map((order) => (
                    <li key={order.id}>{order.item_name} (Requested: {new Date(order.request_date).toLocaleDateString()})</li>
                ))}
            </ul>
        </div>
    );
};

export default Storekeeper;