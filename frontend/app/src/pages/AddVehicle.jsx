import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddVehicle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    manufacturing_year: "",
    registration_number: "",
    category: "",
    transmission: "",
    fuel: "",
    seats: "",
    price_per_day: "",
    image: "",
    mileage: "",
    color: "",
    availability_status: "Available",
    vehicle_status: "Active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = {
        ...formData,
        manufacturing_year: Number(
          formData.manufacturing_year
        ),
        seats: Number(formData.seats),
        price_per_day: Number(formData.price_per_day),
        mileage: formData.mileage
          ? Number(formData.mileage)
          : null,
      };

      await api.post("/vehicles/", data);

      alert("Vehicle added successfully!");

      navigate("/admin/vehicles");

    } catch (error) {
      console.error("Add Vehicle Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to add vehicle.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="fw-bold text-center mb-4">
                Add New Vehicle
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  {/* Name */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Vehicle Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Toyota Corolla"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Brand */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Brand
                    </label>

                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      placeholder="Toyota"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Model */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Model
                    </label>

                    <input
                      type="text"
                      name="model"
                      className="form-control"
                      placeholder="Corolla"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Manufacturing Year */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Manufacturing Year
                    </label>

                    <input
                      type="number"
                      name="manufacturing_year"
                      className="form-control"
                      placeholder="2024"
                      value={formData.manufacturing_year}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Registration */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Registration Number
                    </label>

                    <input
                      type="text"
                      name="registration_number"
                      className="form-control"
                      placeholder="CAR-1004"
                      value={formData.registration_number}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Category */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Category
                    </label>

                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Category
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

                  <div className="col-md-6">
                    <label className="form-label">
                      Transmission
                    </label>

                    <select
                      name="transmission"
                      className="form-select"
                      value={formData.transmission}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Transmission
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

                  <div className="col-md-6">
                    <label className="form-label">
                      Fuel
                    </label>

                    <select
                      name="fuel"
                      className="form-select"
                      value={formData.fuel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Fuel
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


                  {/* Seats */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Seats
                    </label>

                    <input
                      type="number"
                      name="seats"
                      className="form-control"
                      placeholder="5"
                      value={formData.seats}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Price */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Price Per Day
                    </label>

                    <input
                      type="number"
                      name="price_per_day"
                      className="form-control"
                      placeholder="9000"
                      value={formData.price_per_day}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Mileage */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Mileage (km)
                    </label>

                    <input
                      type="number"
                      name="mileage"
                      className="form-control"
                      placeholder="20000"
                      value={formData.mileage}
                      onChange={handleChange}
                    />
                  </div>


                  {/* Color */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Color
                    </label>

                    <input
                      type="text"
                      name="color"
                      className="form-control"
                      placeholder="Black"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>


                  {/* Image */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Image File Name
                    </label>

                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="toyota-corolla.jpg"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>


                  {/* Availability */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Availability
                    </label>

                    <select
                      name="availability_status"
                      className="form-select"
                      value={formData.availability_status}
                      onChange={handleChange}
                    >
                      <option value="Available">
                        Available
                      </option>

                      <option value="Booked">
                        Booked
                      </option>

                      <option value="Maintenance">
                        Maintenance
                      </option>
                    </select>
                  </div>


                  {/* Vehicle Status */}

                  <div className="col-md-6">
                    <label className="form-label">
                      Vehicle Status
                    </label>

                    <select
                      name="vehicle_status"
                      className="form-select"
                      value={formData.vehicle_status}
                      onChange={handleChange}
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>

                </div>


                <div className="d-flex gap-2 mt-4">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? "Adding Vehicle..."
                      : "Add Vehicle"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate("/admin/vehicles")
                    }
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddVehicle;