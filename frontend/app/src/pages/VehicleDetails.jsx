import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function VehicleDetails() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const response = await api.get(`/vehicles/${id}`);

        setVehicle(response.data);
      } catch (error) {
        console.error("Vehicle Details Error:", error);

        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError("Failed to load vehicle details.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading vehicle details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/vehicles"
          className="btn btn-secondary"
        >
          Back to Vehicles
        </Link>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Vehicle not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="row g-5">

        {/* Vehicle Image */}
        <div className="col-md-6">

          <img
            src={
              vehicle.image
                ? `/images/${vehicle.image}`
                : "https://via.placeholder.com/600x400?text=Vehicle"
            }
            alt={vehicle.name}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
            onError={(event) => {
              event.target.src =
                "https://via.placeholder.com/600x400?text=Vehicle";
            }}
          />

        </div>


        {/* Vehicle Information */}
        <div className="col-md-6">

          <h1 className="fw-bold">
            {vehicle.name}
          </h1>

          <p className="text-muted fs-5">
            {vehicle.brand} {vehicle.model}
          </p>

          <hr />


          <div className="row">

            <div className="col-6 mb-4">
              <strong>Manufacturing Year</strong>
              <p className="mt-1">
                {vehicle.manufacturing_year}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Category</strong>
              <p className="mt-1">
                {vehicle.category}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Transmission</strong>
              <p className="mt-1">
                {vehicle.transmission}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Fuel</strong>
              <p className="mt-1">
                {vehicle.fuel}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Seats</strong>
              <p className="mt-1">
                {vehicle.seats}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Color</strong>
              <p className="mt-1">
                {vehicle.color || "Not specified"}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Mileage</strong>
              <p className="mt-1">
                {vehicle.mileage
                  ? `${vehicle.mileage} km`
                  : "Not specified"}
              </p>
            </div>

            <div className="col-6 mb-4">
              <strong>Registration</strong>
              <p className="mt-1">
                {vehicle.registration_number}
              </p>
            </div>

          </div>

          <hr />


          {/* Price */}
          <h3 className="text-primary fw-bold">
            Rs. {vehicle.price_per_day} / day
          </h3>


          {/* Availability */}
          <p className="mt-3">

            Status:{" "}

            <span className="badge bg-success">
              {vehicle.availability_status}
            </span>

          </p>


          {/* Buttons */}
          <div className="mt-4">

            {vehicle.availability_status === "Available" &&
              vehicle.vehicle_status === "Active" && (

                <Link
                  to={`/booking?vehicle_id=${vehicle.id}`}
                  className="btn btn-primary btn-lg me-2"
                >
                  Book This Vehicle
                </Link>

              )}

            <Link
              to="/vehicles"
              className="btn btn-outline-secondary btn-lg"
            >
              Back to Vehicles
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VehicleDetails;