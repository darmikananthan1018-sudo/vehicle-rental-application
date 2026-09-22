import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/vehicles/");

      setVehicles(response.data);
    } catch (error) {
      console.error("Vehicle Management Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to load vehicles.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleDelete = async (vehicleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(vehicleId);
      setError("");

      await api.delete(`/vehicles/${vehicleId}`);

      setVehicles((currentVehicles) =>
        currentVehicles.filter(
          (vehicle) => vehicle.id !== vehicleId
        )
      );

    } catch (error) {
      console.error("Delete Vehicle Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to delete vehicle.");
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading vehicles...
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="fw-bold">
            Vehicle Management
          </h1>

          <p className="text-muted mb-0">
            Manage all rental vehicles.
          </p>
        </div>

        <Link
          to="/admin/vehicles/add"
          className="btn btn-primary"
        >
          + Add Vehicle
        </Link>

      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {vehicles.length === 0 ? (
        <div className="alert alert-warning text-center">
          No vehicles found.
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Transmission</th>
                <th>Fuel</th>
                <th>Price / Day</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>

                  <td>
                    {vehicle.id}
                  </td>

                  <td>
                    <strong>
                      {vehicle.name}
                    </strong>

                    <br />

                    <small className="text-muted">
                      {vehicle.model}
                    </small>
                  </td>

                  <td>
                    {vehicle.brand}
                  </td>

                  <td>
                    {vehicle.category}
                  </td>

                  <td>
                    {vehicle.transmission}
                  </td>

                  <td>
                    {vehicle.fuel}
                  </td>

                  <td>
                    Rs. {vehicle.price_per_day}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        vehicle.availability_status ===
                        "Available"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {vehicle.availability_status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        vehicle.vehicle_status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {vehicle.vehicle_status}
                    </span>
                  </td>

                  <td>

                    <div className="d-flex gap-2">

                      <Link
                        to={`/admin/vehicles/edit/${vehicle.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDelete(vehicle.id)
                        }
                        disabled={
                          deleteLoading === vehicle.id
                        }
                      >
                        {deleteLoading === vehicle.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default VehicleManagement;