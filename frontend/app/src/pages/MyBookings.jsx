import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelLoading, setCancelLoading] = useState(null);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/bookings/");

      setBookings(response.data);
    } catch (error) {
      console.error("My Bookings Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to load bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancelLoading(bookingId);
      setError("");

      await api.put(
        `/bookings/${bookingId}/cancel`
      );

      await loadBookings();

    } catch (error) {
      console.error("Cancel Booking Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to cancel booking.");
      }
    } finally {
      setCancelLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading your bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">
          My Bookings
        </h1>

        <p className="text-muted">
          View and manage your vehicle bookings.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-info">
            You don't have any bookings yet.
          </div>

          <Link
            to="/vehicles"
            className="btn btn-primary"
          >
            Browse Vehicles
          </Link>
        </div>
      ) : (
        <div className="row g-4">

          {bookings.map((booking) => (
            <div
              className="col-md-6 col-lg-4"
              key={booking.id}
            >
              <div className="card h-100 shadow-sm">

                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <h5 className="fw-bold mb-0">
                      Booking #{booking.id}
                    </h5>

                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : booking.status === "Pending"
                          ? "bg-warning text-dark"
                          : booking.status === "Active"
                          ? "bg-primary"
                          : booking.status === "Completed"
                          ? "bg-secondary"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <hr />

                  <p>
                    <strong>
                      Vehicle ID:
                    </strong>{" "}
                    {booking.vehicle_id}
                  </p>

                  <p>
                    <strong>
                      Start Date:
                    </strong>{" "}
                    {booking.start_date}
                  </p>

                  <p>
                    <strong>
                      End Date:
                    </strong>{" "}
                    {booking.end_date}
                  </p>

                  <p>
                    <strong>
                      Number of Days:
                    </strong>{" "}
                    {booking.days}
                  </p>

                  <p>
                    <strong>
                      Price Per Day:
                    </strong>{" "}
                    Rs. {booking.price_per_day}
                  </p>

                  <div className="alert alert-light border">
                    <strong>
                      Total Price
                    </strong>

                    <h4 className="text-primary fw-bold mb-0">
                      Rs. {booking.total_price}
                    </h4>
                  </div>

                  {(booking.status === "Pending" ||
                    booking.status === "Confirmed") && (
                    <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={() =>
                        handleCancel(booking.id)
                      }
                      disabled={
                        cancelLoading === booking.id
                      }
                    >
                      {cancelLoading === booking.id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyBookings;