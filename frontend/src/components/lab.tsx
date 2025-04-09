// lab.tsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

interface Equipment {
  id: number;
  name: string;
  quantity: number;
  location: string;
  status: 'available' | 'in-use' | 'broken';
}

interface Booking {
  id: number;
  teacherName: string;
  equipmentIds: number[];
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
}

const LabManagement: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newEquipmentName, setNewEquipmentName] = useState('');
  const [newEquipmentQuantity, setNewEquipmentQuantity] = useState(1);
  const [newEquipmentLocation, setNewEquipmentLocation] = useState('');
  const [newBookingTeacherName, setNewBookingTeacherName] = useState('');
  const [newBookingEquipmentIds, setNewBookingEquipmentIds] = useState<number[]>([]);
  const [newBookingDate, setNewBookingDate] = useState('');
  const [newBookingTime, setNewBookingTime] = useState('');

  // Example data (replace with API calls in real application)
  useEffect(() => {
    setEquipments([
      { id: 1, name: 'Microscope', quantity: 10, location: 'Lab A', status: 'available' },
      { id: 2, name: 'Beaker', quantity: 50, location: 'Lab B', status: 'available' },
      { id: 3, name: 'Bunsen Burner', quantity: 5, location: 'Lab A', status: 'in-use' },
    ]);
    setBookings([
      { id: 1, teacherName: 'Mr. Smith', equipmentIds: [1, 2], date: '2024-10-27', time: '10:00', status: 'pending' },
      { id: 2, teacherName: 'Ms. Jones', equipmentIds: [3], date: '2024-10-28', time: '14:00', status: 'approved' },
    ]);
  }, []);

  const handleAddEquipment = () => {
    const newEquipment: Equipment = {
      id: equipments.length + 1,
      name: newEquipmentName,
      quantity: newEquipmentQuantity,
      location: newEquipmentLocation,
      status: 'available',
    };
    setEquipments([...equipments, newEquipment]);
    setNewEquipmentName('');
    setNewEquipmentQuantity(1);
    setNewEquipmentLocation('');
  };

  const handleApproveBooking = (bookingId: number) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'approved' } : booking
    ));
  };

  const handleRejectBooking = (bookingId: number) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
    ));
  };

  const handleAddBooking = () => {
    const newBooking: Booking = {
      id: bookings.length + 1,
      teacherName: newBookingTeacherName,
      equipmentIds: newBookingEquipmentIds,
      date: newBookingDate,
      time: newBookingTime,
      status: 'pending',
    };
    setBookings([...bookings, newBooking]);
    setNewBookingTeacherName('');
    setNewBookingEquipmentIds([]);
    setNewBookingDate('');
    setNewBookingTime('');
  };

  return (
    <div className="container">
      <h1>Laboratory Management</h1>

      <h2 className="mt-4">Equipment Management</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Equipment Name"
          value={newEquipmentName}
          onChange={(e) => setNewEquipmentName(e.target.value)}
          className="form-control"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newEquipmentQuantity}
          onChange={(e) => setNewEquipmentQuantity(Number(e.target.value))}
          className="form-control mt-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={newEquipmentLocation}
          onChange={(e) => setNewEquipmentLocation(e.target.value)}
          className="form-control mt-2"
        />
        <button onClick={handleAddEquipment} className="btn btn-primary mt-2">
          Add Equipment
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td>{equipment.id}</td>
              <td>{equipment.name}</td>
              <td>{equipment.quantity}</td>
              <td>{equipment.location}</td>
              <td>{equipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-4">Booking Management</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Teacher Name"
          value={newBookingTeacherName}
          onChange={(e) => setNewBookingTeacherName(e.target.value)}
          className="form-control"
        />
        <input
          type="text"
          placeholder="Equipment IDs (comma separated)"
          value={newBookingEquipmentIds.join(',')}
          onChange={(e) => setNewBookingEquipmentIds(e.target.value.split(',').map(Number))}
          className="form-control mt-2"
        />
        <input
          type="date"
          value={newBookingDate}
          onChange={(e) => setNewBookingDate(e.target.value)}
          className="form-control mt-2"
        />
        <input
          type="time"
          value={newBookingTime}
          onChange={(e) => setNewBookingTime(e.target.value)}
          className="form-control mt-2"
        />
        <button onClick={handleAddBooking} className="btn btn-success mt-2">
          Add Booking
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Teacher</th>
            <th>Equipments</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.teacherName}</td>
              <td>{booking.equipmentIds.join(', ')}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === 'pending' && (
                  <>
                    <button onClick={() => handleApproveBooking(booking.id)} className="btn btn-sm btn-primary">
                      Approve
                    </button>
                    <button onClick={() => handleRejectBooking(booking.id)} className="btn btn-sm btn-danger ms-1">
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabManagement;