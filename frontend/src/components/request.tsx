import React, { useState, useEffect } from "react";

const RequestResource = () => {
  const [name, setName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comments, setComments] = useState("");
  const [labNo, setLabNo] = useState("");
  const [time, setTime] = useState("");
  const [bookingAlert, setBookingAlert] = useState("");
  const [requestsHistory, setRequestsHistory] = useState<any[]>([]);
  const [labBookingsHistory, setLabBookingsHistory] = useState<any[]>([]);
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
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setLabBookingsHistory(data);
    } catch (e) {
      setError("Failed to fetch lab booking history.");
      console.error("Error fetching bookings:", e);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSubmitRequest = async () => {
    try {
      const response = await fetch("/api/requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, resourceType, quantity, comments }),
      });
      if (!response.ok) throw new Error("Failed to submit resource request.");
      alert("Resource request submitted!");
      setName("");
      setResourceType("");
      setQuantity("");
      setComments("");
    } catch (e) {
      console.error("Submit error:", e);
      alert("Error submitting request.");
    }
  };

  const handleSubmitBooking = async () => {
    try {
      const response = await fetch("/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, labNo, time }),
      });
      if (!response.ok) throw new Error("Failed to book lab.");
      setBookingAlert("Lab booked successfully!");
      setLabNo("");
      setTime("");
    } catch (e) {
      console.error("Booking error:", e);
      setBookingAlert("Error booking lab.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Resource Request</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input type="text" placeholder="Resource Type" value={resourceType} onChange={(e) => setResourceType(e.target.value)} /><br />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br />
      <input type="text" placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} /><br />
      <button onClick={handleSubmitRequest}>Submit Resource Request</button>

      <h2 style={{ marginTop: "30px" }}>Lab Booking</h2>
      <input type="text" placeholder="Lab No" value={labNo} onChange={(e) => setLabNo(e.target.value)} /><br />
      <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} /><br />
      <button onClick={handleSubmitBooking}>Book Lab</button>
      {bookingAlert && <p>{bookingAlert}</p>}

      <hr style={{ margin: "30px 0" }} />
      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide" : "Show"} Request/Booking History
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showHistory && (
        <>
          <h3>Resource Requests History</h3>
          {loadingRequests ? (
            <p>Loading requests...</p>
          ) : (
            <ul>
              {requestsHistory.map((req, index) => (
                <li key={index}>
                  {req.name} requested {req.quantity} of {req.resourceType} - {req.comments}
                </li>
              ))}
            </ul>
          )}

          <h3>Lab Bookings History</h3>
          {loadingBookings ? (
            <p>Loading bookings...</p>
          ) : (
            <ul>
              {labBookingsHistory.map((book, index) => (
                <li key={index}>
                  {book.name} booked Lab {book.labNo} at {book.time}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default RequestResource;
