function Home() {
  return (
    <div className="home-page">
      <div className="container">

        <div className="home-content">

          <h1 className="home-title">
            Welcome to Vehicle Rental Management System
          </h1>

          <p className="home-description">
            Find and rent your perfect vehicle easily and quickly.
          </p>

          <div className="home-buttons">
            <a
              href="/vehicles"
              className="btn btn-primary home-button"
            >
              Browse Vehicles
            </a>

            <a
              href="/login"
              className="btn btn-outline-secondary home-button"
            >
              Login
            </a>
          </div>

        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="feature-card text-center">

              <div className="feature-icon">
                🚗
              </div>

              <h3>Wide Range of Vehicles</h3>

              <p>
                Choose from different vehicles based on your needs.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card text-center">

              <div className="feature-icon">
                📅
              </div>

              <h3>Easy Booking</h3>

              <p>
                Select your vehicle and book it for your preferred dates.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card text-center">

              <div className="feature-icon">
                🔒
              </div>

              <h3>Secure System</h3>

              <p>
                Your account and booking information are protected.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;
