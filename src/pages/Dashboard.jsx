import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import logo from "/gglogo.png";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-card">
        <img src={logo} alt="Glass Galaxy Logo" className="dashboard-logo" />

        <h1>GLASS GALAXY</h1>
        <p>Business Management System</p>

        <div className="dashboard-buttons">
          <button
            className="dashboard-btn invoice-btn"
            onClick={() => navigate("/create-invoice")}
          >
            Create Invoice
          </button>

          <button
            className="dashboard-btn quotation-btn"
            onClick={() => navigate("/create-quotation")}
          >
            Create Quotation
          </button>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;