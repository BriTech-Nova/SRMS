// storekeeper.tsx
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
  teacherId: number;
  quantity: number;
  issued: number;
}

const Storekeeper: React.FC = () => {
  const [exerciseBooks, setExerciseBooks] = useState<ExerciseBook[]>([]);
  const [learningMaterials, setLearningMaterials] = useState<LearningMaterial[]>([]);
  const [teacherNoteBooks, setTeacherNoteBooks] = useState<TeacherNoteBook[]>([]);
  const [orderRequests, setOrderRequests] = useState<string[]>([]); // material names

  const [newExerciseBookType, setNewExerciseBookType] = useState('');
  const [newExerciseBookQuantity, setNewExerciseBookQuantity] = useState(1);
  const [newLearningMaterialName, setNewLearningMaterialName] = useState('');
  const [newLearningMaterialDescription, setNewLearningMaterialDescription] = useState('');
  const [newLearningMaterialQuantity, setNewLearningMaterialQuantity] = useState(1);
  const [newTeacherNoteBookTeacherId, setNewTeacherNoteBookTeacherId] = useState(0);
  const [newTeacherNoteBookQuantity, setNewTeacherNoteBookQuantity] = useState(1);

  useEffect(() => {
    // Replace with API calls to fetch data
    setExerciseBooks([
      { id: 1, type: 'Lined', quantity: 100, issued: 50 },
      { id: 2, type: 'Squared', quantity: 50, issued: 20 },
    ]);
    setLearningMaterials([
      { id: 1, name: 'Maps', description: 'World Maps', quantity: 20, issued: 10 },
      { id: 2, name: 'Charts', description: 'Science Charts', quantity: 30, issued: 15 },
    ]);
    setTeacherNoteBooks([
      { id: 1, teacherId: 101, quantity: 10, issued: 5 },
      { id: 2, teacherId: 102, quantity: 15, issued: 8 },
    ]);
  }, []);

  const handleAddExerciseBook = () => {
    const newBook: ExerciseBook = {
      id: exerciseBooks.length + 1,
      type: newExerciseBookType,
      quantity: newExerciseBookQuantity,
      issued: 0,
    };
    setExerciseBooks([...exerciseBooks, newBook]);
    setNewExerciseBookType('');
    setNewExerciseBookQuantity(1);
  };

  const handleAddLearningMaterial = () => {
    const newMaterial: LearningMaterial = {
      id: learningMaterials.length + 1,
      name: newLearningMaterialName,
      description: newLearningMaterialDescription,
      quantity: newLearningMaterialQuantity,
      issued: 0,
    };
    setLearningMaterials([...learningMaterials, newMaterial]);
    setNewLearningMaterialName('');
    setNewLearningMaterialDescription('');
    setNewLearningMaterialQuantity(1);
  };

  const handleAddTeacherNoteBook = () => {
    const newNoteBook: TeacherNoteBook = {
      id: teacherNoteBooks.length + 1,
      teacherId: newTeacherNoteBookTeacherId,
      quantity: newTeacherNoteBookQuantity,
      issued: 0,
    };
    setTeacherNoteBooks([...teacherNoteBooks, newNoteBook]);
    setNewTeacherNoteBookTeacherId(0);
    setNewTeacherNoteBookQuantity(1);
  };

  const handleIssueExerciseBooks = (bookId: number, issueQuantity: number) => {
    setExerciseBooks(exerciseBooks.map(book =>
      book.id === bookId ? { ...book, quantity: book.quantity - issueQuantity, issued: book.issued + issueQuantity } : book
    ));
  };

  const handleIssueLearningMaterials = (materialId: number, issueQuantity: number) => {
    setLearningMaterials(learningMaterials.map(material =>
      material.id === materialId ? { ...material, quantity: material.quantity - issueQuantity, issued: material.issued + issueQuantity } : material
    ));
  };

  const handleIssueTeacherNoteBooks = (noteBookId: number, issueQuantity: number) => {
    setTeacherNoteBooks(teacherNoteBooks.map(noteBook =>
      noteBook.id === noteBookId ? { ...noteBook, quantity: noteBook.quantity - issueQuantity, issued: noteBook.issued + issueQuantity } : noteBook
    ));
  };

  const handleOrderRequest = (itemName: string) => {
    if (!orderRequests.includes(itemName)) {
      setOrderRequests([...orderRequests, itemName]);
    }
  };

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
              <td>{noteBook.teacherId}</td>
              <td>{noteBook.quantity}</td>
              <td>{noteBook.issued}</td>
              <td><button onClick={() => handleIssueTeacherNoteBooks(noteBook.id, 1)} className="btn btn-sm btn-success">Issue 1</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-4">Order Requests</h2>
      <ul>
        {orderRequests.map((itemName) => (<li key={itemName}>{itemName}</li>))}
      </ul>
    </div>
  );
};

export default Storekeeper;