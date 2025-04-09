import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    quantity: number;
    available: number;
}

interface Loan {
    id: number;
    book: number; // Book ID
    book_title?: string; // From serializer
    borrower_type: 'teacher' | 'class' | 'learner';
    borrower_id: number;
    borrow_date: string;
    return_date: string | null;
}

interface OrderRequest {
    id: number;
    book: number; // Book ID
    book_title?: string; // From serializer
    request_date: string;
}

const LibraryManagement: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [orderRequests, setOrderRequests] = useState<OrderRequest[]>([]);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookAuthor, setNewBookAuthor] = useState('');
    const [newBookISBN, setNewBookISBN] = useState('');
    const [newBookQuantity, setNewBookQuantity] = useState(1);
    const [newLoanBookId, setNewLoanBookId] = useState(0);
    const [newLoanBorrowerType, setNewLoanBorrowerType] = useState<'teacher' | 'class' | 'learner'>('teacher');
    const [newLoanBorrowerId, setNewLoanBorrowerId] = useState(0);
    const [newLoanBorrowDate, setNewLoanBorrowDate] = useState('');
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
        fetchLoans();
        fetchOrderRequests();
    }, []);

    const fetchBooks = async () => {
        setLoadingBooks(true);
        setError(null);
        try {
            const response = await fetch('/api/library/books/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Book[] = await response.json();
            setBooks(data);
        } catch (e: any) {
            setError('Failed to fetch books.');
            console.error('Fetch books error:', e);
        } finally {
            setLoadingBooks(false);
        }
    };

    const fetchLoans = async () => {
        setLoadingLoans(true);
        setError(null);
        try {
            const response = await fetch('/api/library/loans/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Loan[] = await response.json();
            setLoans(data);
        } catch (e: any) {
            setError('Failed to fetch loans.');
            console.error('Fetch loans error:', e);
        } finally {
            setLoadingLoans(false);
        }
    };

    const fetchOrderRequests = async () => {
        setLoadingOrders(true);
        setError(null);
        try {
            const response = await fetch('/api/library/orders/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: OrderRequest[] = await response.json();
            setOrderRequests(data);
        } catch (e: any) {
            setError('Failed to fetch order requests.');
            console.error('Fetch order requests error:', e);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleAddBook = async () => {
        setError(null);
        try {
            const response = await fetch('/api/library/books/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newBookTitle,
                    author: newBookAuthor,
                    isbn: newBookISBN,
                    quantity: newBookQuantity,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add book: ${JSON.stringify(errorData)}`);
            }
            await response.json(); // Optionally handle the created book data
            fetchBooks();
            setNewBookTitle('');
            setNewBookAuthor('');
            setNewBookISBN('');
            setNewBookQuantity(1);
        } catch (e: any) {
            setError('Failed to add book.');
            console.error('Add book error:', e);
        }
    };

    const handleCreateLoan = async () => {
        setError(null);
        try {
            const response = await fetch('/api/library/loans/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    book: newLoanBookId,
                    borrower_type: newLoanBorrowerType,
                    borrower_id: newLoanBorrowerId,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create loan: ${JSON.stringify(errorData)}`);
            }
            await response.json(); // Optionally handle the created loan data
            fetchLoans();
            fetchBooks(); // Update book availability
            setNewLoanBookId(0);
            setNewLoanBorrowerType('teacher');
            setNewLoanBorrowerId(0);
            setNewLoanBorrowDate('');
        } catch (e: any) {
            setError('Failed to create loan.');
            console.error('Create loan error:', e);
        }
    };

    const handleReturnBook = async (loanId: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/library/loans/${loanId}/return_book/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    return_date: new Date().toISOString().split('T')[0],
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to return book: ${JSON.stringify(errorData)}`);
            }
            await response.json(); // Optionally handle the response
            fetchLoans();
            fetchBooks(); // Update book availability
        } catch (e: any) {
            setError('Failed to return book.');
            console.error('Return book error:', e);
        }
    };

    const handleOrderRequest = async (bookId: number) => {
        setError(null);
        try {
            const response = await fetch(`/api/library/books/${bookId}/order/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to request order for book: ${JSON.stringify(errorData)}`);
            }
            await response.json(); // Optionally handle the response
            fetchOrderRequests();
        } catch (e: any) {
            setError('Failed to request order.');
            console.error('Order request error:', e);
        }
    };

    if (loadingBooks || loadingLoans || loadingOrders) {
        return <div>Loading library data...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            <h1>Library Management</h1>

            <h2 className="mt-4">Book Management</h2>
            <div className="mb-3">
                <input type="text" placeholder="Title" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} className="form-control" />
                <input type="text" placeholder="Author" value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)} className="form-control mt-2" />
                <input type="text" placeholder="ISBN" value={newBookISBN} onChange={(e) => setNewBookISBN(e.target.value)} className="form-control mt-2" />
                <input type="number" placeholder="Quantity" value={newBookQuantity} onChange={(e) => setNewBookQuantity(Number(e.target.value))} className="form-control mt-2" />
                <button onClick={handleAddBook} className="btn btn-primary mt-2">Add Book</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr><th>ID</th><th>Title</th><th>Author</th><th>ISBN</th><th>Quantity</th><th>Available</th><th>Order</th></tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.quantity}</td>
                            <td>{book.available}</td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => handleOrderRequest(book.id)}>Order</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mt-4">Loan Management</h2>
            <div className="mb-3">
                <select value={newLoanBookId} onChange={(e) => setNewLoanBookId(Number(e.target.value))} className="form-select">
                    <option value={0}>Select Book</option>
                    {books.map((book) => (<option key={book.id} value={book.id}>{book.title}</option>))}
                </select>
                <select value={newLoanBorrowerType} onChange={(e) => setNewLoanBorrowerType(e.target.value as 'teacher' | 'class' | 'learner')} className="form-select mt-2">
                    <option value="teacher">Teacher</option>
                    <option value="class">Class</option>
                    <option value="learner">Learner</option>
                </select>
                <input type="number" placeholder="Borrower ID" value={newLoanBorrowerId} onChange={(e) => setNewLoanBorrowerId(Number(e.target.value))} className="form-control mt-2" />
                <input type="date" value={newLoanBorrowDate} onChange={(e) => setNewLoanBorrowDate(e.target.value)} className="form-control mt-2" />
                <button onClick={handleCreateLoan} className="btn btn-success mt-2">Create Loan</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr><th>ID</th><th>Book</th><th>Borrower Type</th><th>Borrower ID</th><th>Borrow Date</th><th>Return Date</th><th>Return</th></tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>{books.find(book => book.id === loan.book)?.title}</td>
                            <td>{loan.borrower_type}</td>
                            <td>{loan.borrower_id}</td>
                            <td>{new Date(loan.borrow_date).toLocaleDateString()}</td>
                            <td>{loan.return_date ? new Date(loan.return_date).toLocaleDateString() : 'Not Returned'}</td>
                            <td>{loan.return_date === null && <button onClick={() => handleReturnBook(loan.id)} className="btn btn-sm btn-info">Return</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mt-4">Order Requests</h2>
            <ul>
                {orderRequests.map((order) => (
                    <li key={order.id}>{books.find(book => book.id === order.book)?.title} (Requested: {new Date(order.request_date).toLocaleDateString()})</li>
                ))}
            </ul>
        </div>
    );
};

export default LibraryManagement;