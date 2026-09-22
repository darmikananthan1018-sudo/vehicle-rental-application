import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const vehicleId = searchParams.get("vehicle_id");

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load selected vehicle
  useEffect(() => {
    const loadVehicle = async () => {
      if (!vehicleId) {
        setError("Vehicle ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          `/vehicles/${vehicleId}`
        );

        setVehicle(response.data);
      } catch (error) {
        console.error("Vehicle Error:", error);

        setError("Failed to load vehicle.");
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [vehicleId]);

  const handleBooking = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date.");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await api.post("/bookings/", {
        vehicle_id: Number(vehicleId),
        start_date: startDate,
        end_date: endDate,
      });

      console.log("Booking Response:", response.data);

      setSuccess(
        "Booking created successfully!"
      );

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);

    } catch (error) {
      console.error("Booking Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to create booking.");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">

        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading vehicle...
        </p>

      </div>
    );
  }

  if (error && !vehicle) {
    return (
      <div className="container mt-5">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-8 col-lg-6">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="fw-bold mb-4 text-center">
                Book Vehicle
              </h2>

              {vehicle && (
                <div className="alert alert-light border mb-4">

                  <h4 className="fw-bold">
                    {vehicle.name}
                  </h4>

                  <p className="mb-1">
                    {vehicle.brand} {vehicle.model}
                  </p>

                  <p className="mb-0 text-primary fw-bold">
                    Rs. {vehicle.price_per_day} / day
                  </p>

                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              <form onSubmit={handleBooking}>

                <div className="mb-3">

                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(event) =>
                      setStartDate(event.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(event) =>
                      setEndDate(event.target.value)
                    }
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={bookingLoading}
                >
                  {bookingLoading
                    ? "Creating Booking..."
                    : "Confirm Booking"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Booking;