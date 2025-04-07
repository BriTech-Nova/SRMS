import React, { useState, useEffect } from "react";

const RequestResource = () => {
  const [name, setName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comments, setComments] = useState("");
  const [labNo, setLabNo] = useState("");
  const [time, setTime] = useState("");
  const [bookingAlert, setBookingAlert] = useState("");
  const [requestsHistory, setRequestsHistory] = useState([]);
  const [labBookingsHistory, setLabBookingsHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Simulate fetching user's request history (replace with actual API call)
  useEffect(() => {
    const storedRequests = localStorage.getItem("resourceRequests");
    if (storedRequests) {
      setRequestsHistory(JSON.parse(storedRequests));
    }

    const storedBookings = localStorage.getItem("labBookings");
    if (storedBookings) {
      setLabBookingsHistory(JSON.parse(storedBookings));
    }
  }, [showHistory]); // Re-fetch history when showHistory changes (when button is clicked)

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleResourceTypeChange = (event) => {
    setResourceType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^[1-9]\d*$/.test(value) || value === "") {
      setQuantity(value);
    } else if (value !== "") {
      alert("Please enter a valid positive number for quantity.");
    }
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleLabNoChange = (event) => {
    setLabNo(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleBookLab = () => {
    if (labNo && time) {
      const bookingDetails = { lab: labNo, time: time, bookedAt: new Date().toLocaleString() };
      setLabBookingsHistory((prevHistory) => [...prevHistory, bookingDetails]);
      localStorage.setItem("labBookings", JSON.stringify([...labBookingsHistory, bookingDetails]));
      setBookingAlert(`Lab ${labNo} booked at ${time}`);
      // In a real application, you would send this booking information to a server
    } else {
      alert("Please select a lab and time to book.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRequest = {
      teacherName: name,
      resourceType: resourceType,
      quantity: quantity,
      comments: comments,
      requestedAt: new Date().toLocaleString(),
      status: "Pending", // Initial status
    };
    setRequestsHistory((prevHistory) => [...prevHistory, newRequest]);
    localStorage.setItem("resourceRequests", JSON.stringify([...requestsHistory, newRequest]));
    console.log("Resource Request:", newRequest);
    alert("Resource request submitted!");
    setName("");
    setResourceType("");
    setQuantity("");
    setComments("");
  };

  const handleViewHistoryClick = () => {
    setShowHistory(true);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 mb-4">
        <h1 className="mb-4">Request Materials and Resources</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Teacher's Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          {/*Displays resource by category e.g electronics, stationery e.t.c */}
          <div className="mb-3">
            <label htmlFor="resourceType" className="form-label">
              Resource Type
            </label>
            <select
              id="resourceType"
              className="form-select"
              value={resourceType}
              onChange={handleResourceTypeChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a resource
              </option>
              <option value="book">Textbooks</option>
              <option value="equipment">Stationery</option>
              <option value="software">Electronics</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/*Letters are not accepted and only numbers greater>0 are accepted */}
          {/*Should alert teachers on to enter valid input */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          {/*Teacher gives exact descriptions e.g color, type e.t.c */}
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Additional Comments
            </label>
            <textarea
              id="comments"
              className="form-control"
              rows={3}
              placeholder="Enter specific resource name e.g blue marker pen, Hp laptop"
              value={comments}
              onChange={handleCommentsChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Request
          </button>
        </form>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="mb-4">Lab Booking</h3>
        {bookingAlert && <div className="alert alert-success">{bookingAlert}</div>}
        <div className="mb-3">
          <label htmlFor="labNo" className="form-label">
            Select Lab
          </label>
          <select
            name="labs"
            id="labNo"
            className="form-select"
            value={labNo}
            onChange={handleLabNoChange}
          >
            <option value="">Select a Lab</option>
            <option value="Lab I">Lab I</option>
            <option value="Lab II">Lab II</option>
            <option value="Lab III">Lab III</option>
            <option value="Lab IV">Lab IV</option>
            <option value="Lab V">Lab V</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="form-control"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleBookLab}>
          Book Lab
        </button>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="mb-3">View Your History</h3>
        <button className="btn btn-info" onClick={handleViewHistoryClick}>
          View History
        </button>

        {showHistory && (
          <>
            <h4 className="mt-4">Your Request History</h4>
            {requestsHistory.length === 0 ? (
              <p>No resource requests found.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Requested At</th>
                    <th>Resource Type</th>
                    <th>Quantity</th>
                    <th>Comments</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requestsHistory.map((request, index) => (
                    <tr key={index}>
                      <td>{request.requestedAt}</td>
                      <td>{request.resourceType}</td>
                      <td>{request.quantity}</td>
                      <td>{request.comments}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h4 className="mt-4">Your Lab Booking History</h4>
            {labBookingsHistory.length === 0 ? (
              <p>No lab booking history found.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Booked At</th>
                    <th>Lab</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {labBookingsHistory.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.bookedAt}</td>
                      <td>{booking.lab}</td>
                      <td>{booking.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RequestResource;