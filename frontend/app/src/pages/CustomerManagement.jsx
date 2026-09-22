import { useEffect, useState } from "react";
import api from "../services/api";

function CustomerManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusLoading, setStatusLoading] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/users");

      setUsers(response.data);
    } catch (error) {
      console.error("Customer Management Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to load customers.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      setStatusLoading(userId);
      setError("");

      await api.put(`/admin/users/${userId}/status`, {
        is_active: newStatus,
      });

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? { ...user, is_active: newStatus }
            : user
        )
      );
    } catch (error) {
      console.error("Update Customer Status Error:", error);

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to update customer status.");
      }
    } finally {
      setStatusLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Customer Management</h1>
        <p className="text-muted">
          View and manage customer accounts.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>

                    <td>
                      <strong>{user.full_name}</strong>
                    </td>

                    <td>{user.email}</td>

                    <td>{user.phone}</td>

                    <td>
                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "bg-dark"
                            : "bg-primary"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          user.is_active
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {user.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        user.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {user.role === "admin" ? (
                        <span className="text-muted">
                          Admin
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={`btn btn-sm ${
                            user.is_active
                              ? "btn-danger"
                              : "btn-success"
                          }`}
                          onClick={() =>
                            handleStatusChange(
                              user.id,
                              user.is_active
                            )
                          }
                          disabled={
                            statusLoading === user.id
                          }
                        >
                          {statusLoading === user.id
                            ? "Updating..."
                            : user.is_active
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="alert alert-info text-center mb-0">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;