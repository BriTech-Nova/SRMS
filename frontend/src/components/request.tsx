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
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showHistory) {
      fetchRequests();
      fetchBookings();
    } else {
      setRequestsHistory([]);
      setLabBookingsHistory([]);
    }
  }, [showHistory]);

  const fetchRequests = async () => {
    setLoadingRequests(true);
    setError("");
    try {
      const response = await fetch("/api/requests/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRequestsHistory(data);
    } catch (e) {
      setError("Failed to fetch resource requests.");
      console.error("Error fetching requests:", e);
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    setError("");
    try {
      const response = await fetch("/api/bookings/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLabBookingsHistory(data);
    } catch (e) {
      setError("Failed to fetch lab booking history.");
      console.error("Error fetching bookings:", e);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleResourceTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setResourceType(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[1-9]\d*$/.test(value) || value === "") {
      setQuantity(value);
    } else {
      alert("Please enter a valid positive number for quantity.");
    }
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleLabNoChange = (event) => {
    setLabNo(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleBookLab = async () => {
    if (labNo && time) {
      const bookingDetails = { lab: labNo, time: time };
      try {
        const response = await fetch("/api/bookings/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        });
        if (response.ok) {
          const data = await response.json();
          setBookingAlert(`Lab ${data.lab} booked at ${data.time}`);
          fetchBookings(); // Optionally refetch bookings
        } else {
          const errorData = await response.json();
          setError(`Failed to book lab: ${JSON.stringify(errorData)}`);
          console.error("Failed to book lab:", errorData);
        }
      } catch (e) {
        setError("An error occurred while booking the lab.");
        console.error("Error booking lab:", e);
      }
    } else {
      alert("Please select a lab and time to book.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newRequest = {
      teacher_name: name,
      resource_type: resourceType,
      quantity: quantity,
      comments: comments,
    };

    try {
      const response = await fetch("/api/requests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });
      if (response.ok) {
        console.log("Resource Request Submitted:", await response.json());
        alert("Resource request submitted!");
        setName("");
        setResourceType("");
        setQuantity("");
        setComments("");
        fetchRequests(); // Optionally refetch requests
      } else {
        const errorData = await response.json();
        setError(`Failed to submit request: ${JSON.stringify(errorData)}`);
        console.error("Failed to submit request:", errorData);
      }
    } catch (e) {
      setError("An error occurred while submitting the request.");
      console.error("Error submitting request:", e);
    }
  };

  const handleViewHistoryClick = () => {
    setShowHistory(true);
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

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
              required
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
              required
            >
              <option value="" disabled>
                Select a resource
              </option>
              <option value="book">Textbooks</option>
              <option value="stationery">Stationery</option>
              <option value="electronics">Electronics</option>
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
              required
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
        {bookingAlert && (
          <div className="alert alert-success">{bookingAlert}</div>
        )}
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
            required
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
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleBookLab}
        >
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
            {loadingRequests ? (
              <p>Loading resource requests...</p>
            ) : requestsHistory.length === 0 ? (
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
                      <td>{new Date(request.requested_at).toLocaleString()}</td>
                      <td>{request.resource_type}</td>
                      <td>{request.quantity}</td>
                      <td>{request.comments}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h4 className="mt-4">Your Lab Booking History</h4>
            {loadingBookings ? (
              <p>Loading lab booking history...</p>
            ) : labBookingsHistory.length === 0 ? (
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
                      <td>{new Date(booking.booked_at).toLocaleString()}</td>
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
