import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/users/me");

        setUser(response.data);
      } catch (error) {
        console.error("Profile Error:", error);

        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading profile...
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

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          User information not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-7 col-lg-6">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center fw-bold mb-4">
                My Profile
              </h2>

              <div className="mb-3">
                <strong>Full Name</strong>

                <p className="form-control bg-light">
                  {user.full_name}
                </p>
              </div>

              <div className="mb-3">
                <strong>Email</strong>

                <p className="form-control bg-light">
                  {user.email}
                </p>
              </div>

              <div className="mb-3">
                <strong>Phone</strong>

                <p className="form-control bg-light">
                  {user.phone}
                </p>
              </div>

              <div className="mb-3">
                <strong>Role</strong>

                <p>
                  <span className="badge bg-primary">
                    {user.role}
                  </span>
                </p>
              </div>

              <div className="mb-3">
                <strong>Account Status</strong>

                <p>
                  {user.is_active ? (
                    <span className="badge bg-success">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Inactive
                    </span>
                  )}
                </p>
              </div>

              <div>
                <strong>Created At</strong>

                <p className="text-muted">
                  {new Date(user.created_at).toLocaleString()}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;