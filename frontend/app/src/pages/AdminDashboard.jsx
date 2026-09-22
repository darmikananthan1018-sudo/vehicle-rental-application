import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const response = await api.get("/admin/statistics");

        setStatistics(response.data);
      } catch (error) {
        console.error("Statistics Error:", error);

        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError(
            "Failed to load dashboard statistics."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading dashboard...
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
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      {/* Header */}

      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Admin Dashboard
        </h1>

        <p className="text-muted">
          Vehicle Rental Management System
        </p>
      </div>


      {/* Statistics */}

      <div className="row g-4">

        {/* Users */}

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">

              <div className="fs-1">
                👥
              </div>

              <h5 className="text-muted mt-2">
                Total Users
              </h5>

              <h2 className="fw-bold text-primary">
                {statistics.total_users}
              </h2>

            </div>
          </div>
        </div>


        {/* Vehicles */}

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">

              <div className="fs-1">
                🚗
              </div>

              <h5 className="text-muted mt-2">
                Total Vehicles
              </h5>

              <h2 className="fw-bold text-success">
                {statistics.total_vehicles}
              </h2>

            </div>
          </div>
        </div>


        {/* Bookings */}

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">

              <div className="fs-1">
                📅
              </div>

              <h5 className="text-muted mt-2">
                Total Bookings
              </h5>

              <h2 className="fw-bold text-warning">
                {statistics.total_bookings}
              </h2>

            </div>
          </div>
        </div>


        {/* Revenue */}

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">

              <div className="fs-1">
                💰
              </div>

              <h5 className="text-muted mt-2">
                Total Revenue
              </h5>

              <h2 className="fw-bold text-danger">
                Rs. {statistics.total_revenue}
              </h2>

            </div>
          </div>
        </div>

      </div>


      {/* Management */}

      <div className="row mt-5 g-4">


        {/* Vehicle Management */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <div className="fs-1">
                🚗
              </div>

              <h4>
                Vehicle Management
              </h4>

              <p className="text-muted">
                Add, update and manage rental vehicles.
              </p>

              <Link
                to="/admin/vehicles"
                className="btn btn-primary"
              >
                Manage Vehicles
              </Link>

            </div>

          </div>

        </div>


        {/* Customer Management */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <div className="fs-1">
                👥
              </div>

              <h4>
                Customer Management
              </h4>

              <p className="text-muted">
                View and manage customer accounts.
              </p>

              <button
                className="btn btn-primary"
                disabled
              >
                Manage Customers
              </button>

            </div>

          </div>

        </div>


        {/* Booking Management */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <div className="fs-1">
                📅
              </div>

              <h4>
                Booking Management
              </h4>

              <p className="text-muted">
                View and manage all bookings.
              </p>

              <button
                className="btn btn-primary"
                disabled
              >
                Manage Bookings
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;