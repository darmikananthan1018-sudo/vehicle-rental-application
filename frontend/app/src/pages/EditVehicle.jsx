import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditVehicle() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const response = await api.get(
          `/vehicles/${id}`
        );

        const vehicle = response.data;

        setFormData({
          name: vehicle.name || "",
          brand: vehicle.brand || "",
          model: vehicle.model || "",
          manufacturing_year:
            vehicle.manufacturing_year || "",
          registration_number:
            vehicle.registration_number || "",
          category: vehicle.category || "",
          transmission: vehicle.transmission || "",
          fuel: vehicle.fuel || "",
          seats: vehicle.seats || "",
          price_per_day:
            vehicle.price_per_day || "",
          image: vehicle.image || "",
          mileage: vehicle.mileage || "",
          color: vehicle.color || "",
          availability_status:
            vehicle.availability_status || "Available",
          vehicle_status:
            vehicle.vehicle_status || "Active",
        });

      } catch (error) {
        console.error(
          "Load Vehicle Error:",
          error
        );

        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError(
            "Failed to load vehicle."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      const data = {
        ...formData,
        manufacturing_year: Number(
          formData.manufacturing_year
        ),
        seats: Number(formData.seats),
        price_per_day: Number(
          formData.price_per_day
        ),
        mileage: formData.mileage
          ? Number(formData.mileage)
          : null,
      };

      await api.put(
        `/vehicles/${id}`,
        data
      );

      alert(
        "Vehicle updated successfully!"
      );

      navigate("/admin/vehicles");

    } catch (error) {
      console.error(
        "Update Vehicle Error:",
        error
      );

      if (error.response?.data?.detail) {
        setError(
          error.response.data.detail
        );
      } else {
        setError(
          "Failed to update vehicle."
        );
      }
    } finally {
      setSaving(false);
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

  return (
    <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="fw-bold text-center mb-4">
                Edit Vehicle
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">
                      Vehicle Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Brand
                    </label>

                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Model
                    </label>

                    <input
                      type="text"
                      name="model"
                      className="form-control"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Manufacturing Year
                    </label>

                    <input
                      type="number"
                      name="manufacturing_year"
                      className="form-control"
                      value={
                        formData.manufacturing_year
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Registration Number
                    </label>

                    <input
                      type="text"
                      name="registration_number"
                      className="form-control"
                      value={
                        formData.registration_number
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>


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


                  <div className="col-md-6">
                    <label className="form-label">
                      Transmission
                    </label>

                    <select
                      name="transmission"
                      className="form-select"
                      value={
                        formData.transmission
                      }
                      onChange={handleChange}
                      required
                    >
                      <option value="Automatic">
                        Automatic
                      </option>

                      <option value="Manual">
                        Manual
                      </option>
                    </select>
                  </div>


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


                  <div className="col-md-6">
                    <label className="form-label">
                      Seats
                    </label>

                    <input
                      type="number"
                      name="seats"
                      className="form-control"
                      value={formData.seats}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Price Per Day
                    </label>

                    <input
                      type="number"
                      name="price_per_day"
                      className="form-control"
                      value={
                        formData.price_per_day
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Mileage (km)
                    </label>

                    <input
                      type="number"
                      name="mileage"
                      className="form-control"
                      value={formData.mileage}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Color
                    </label>

                    <input
                      type="text"
                      name="color"
                      className="form-control"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Image File Name
                    </label>

                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">
                      Availability
                    </label>

                    <select
                      name="availability_status"
                      className="form-select"
                      value={
                        formData.availability_status
                      }
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


                  <div className="col-md-6">
                    <label className="form-label">
                      Vehicle Status
                    </label>

                    <select
                      name="vehicle_status"
                      className="form-select"
                      value={
                        formData.vehicle_status
                      }
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
                    className="btn btn-success"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "Update Vehicle"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate(
                        "/admin/vehicles"
                      )
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

export default EditVehicle;