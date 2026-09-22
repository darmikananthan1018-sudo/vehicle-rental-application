import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    transmission: "",
    fuel: "",
    max_price: "",
  });

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/vehicles/", {
        params: {
          brand: filters.brand || undefined,
          category: filters.category || undefined,
          transmission: filters.transmission || undefined,
          fuel: filters.fuel || undefined,
          max_price: filters.max_price || undefined,
        },
      });

      setVehicles(response.data);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    loadVehicles();
  };

  const handleClear = () => {
    const emptyFilters = {
      brand: "",
      category: "",
      transmission: "",
      fuel: "",
      max_price: "",
    };

    setFilters(emptyFilters);

    api
      .get("/vehicles/")
      .then((response) => {
        setVehicles(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Failed to load vehicles.");
      });
  };

  return (
    <div className="container mt-5">

      {/* Page Header */}
      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Available Vehicles
        </h1>

        <p className="text-muted">
          Find the perfect vehicle for your journey.
        </p>

      </div>


      {/* Search and Filter */}
      <div className="card shadow-sm mb-5">

        <div className="card-body p-4">

          <h4 className="mb-4">
            Search & Filter
          </h4>

          <div className="row g-3">

            {/* Brand */}
            <div className="col-md-4">

              <label className="form-label">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                className="form-control"
                placeholder="Toyota"
                value={filters.brand}
                onChange={handleChange}
              />

            </div>


            {/* Category */}
            <div className="col-md-4">

              <label className="form-label">
                Category
              </label>

              <select
                name="category"
                className="form-select"
                value={filters.category}
                onChange={handleChange}
              >

                <option value="">
                  All Categories
                </option>

                <option value="Sedan">
                  Sedan
                </option>

                <option value="SUV">
                  SUV
                </option>

                <option value="Hatchback">
                  Hatchback
                </option>

                <option value="Van">
                  Van
                </option>

              </select>

            </div>


            {/* Transmission */}
            <div className="col-md-4">

              <label className="form-label">
                Transmission
              </label>

              <select
                name="transmission"
                className="form-select"
                value={filters.transmission}
                onChange={handleChange}
              >

                <option value="">
                  All
                </option>

                <option value="Automatic">
                  Automatic
                </option>

                <option value="Manual">
                  Manual
                </option>

              </select>

            </div>


            {/* Fuel */}
            <div className="col-md-4">

              <label className="form-label">
                Fuel
              </label>

              <select
                name="fuel"
                className="form-select"
                value={filters.fuel}
                onChange={handleChange}
              >

                <option value="">
                  All
                </option>

                <option value="Petrol">
                  Petrol
                </option>

                <option value="Diesel">
                  Diesel
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>

                <option value="Electric">
                  Electric
                </option>

              </select>

            </div>


            {/* Maximum Price */}
            <div className="col-md-4">

              <label className="form-label">
                Maximum Price Per Day
              </label>

              <input
                type="number"
                name="max_price"
                className="form-control"
                placeholder="10000"
                value={filters.max_price}
                onChange={handleChange}
              />

            </div>


            {/* Buttons */}
            <div className="col-md-4 d-flex align-items-end gap-2">

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                Search
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* Loading */}
      {loading && (
        <div className="text-center mt-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3">
            Loading vehicles...
          </p>

        </div>
      )}


      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {/* Vehicle Cards */}
      {!loading && !error && (

        <div className="row g-4">

          {vehicles.length === 0 ? (

            <div className="col-12">

              <div className="alert alert-warning text-center">
                No vehicles found.
              </div>

            </div>

          ) : (

            vehicles.map((vehicle) => (

              <div
                className="col-md-4"
                key={vehicle.id}
              >

                <div className="card h-100 shadow-sm">


                  {/* Image */}
                  <img
                    src={
                      vehicle.image
                        ? `/images/${vehicle.image}`
                        : "https://via.placeholder.com/600x400?text=Vehicle"
                    }
                    className="card-img-top"
                    alt={vehicle.name}
                    style={{
                      height: "230px",
                      objectFit: "cover",
                    }}
                    onError={(event) => {
                      event.target.src =
                        "https://via.placeholder.com/600x400?text=Vehicle";
                    }}
                  />


                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">

                    <h4 className="card-title fw-bold">
                      {vehicle.name}
                    </h4>

                    <p className="text-muted">
                      {vehicle.brand} {vehicle.model}
                    </p>

                    <hr />


                    {/* Vehicle Information */}
                    <div className="row">

                      <div className="col-6 mb-3">

                        <strong>
                          Category
                        </strong>

                        <br />

                        {vehicle.category}

                      </div>


                      <div className="col-6 mb-3">

                        <strong>
                          Seats
                        </strong>

                        <br />

                        {vehicle.seats}

                      </div>


                      <div className="col-6 mb-3">

                        <strong>
                          Transmission
                        </strong>

                        <br />

                        {vehicle.transmission}

                      </div>


                      <div className="col-6 mb-3">

                        <strong>
                          Fuel
                        </strong>

                        <br />

                        {vehicle.fuel}

                      </div>

                    </div>


                    {/* Price and Button */}
                    <div className="mt-auto">

                      <h5 className="text-primary fw-bold mt-3">
                        Rs. {vehicle.price_per_day} / day
                      </h5>


                      <span className="badge bg-success mb-3">
                        {vehicle.availability_status}
                      </span>


                      {/* VIEW DETAILS BUTTON */}
                      <Link
                        to={`/vehicles/${vehicle.id}`}
                        className="btn btn-primary w-100"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      )}

    </div>
  );
}

export default Vehicles;