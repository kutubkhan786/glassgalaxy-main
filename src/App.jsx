import { Routes, Route } from "react-router-dom";
import InvoiceCreate from "./pages/InvoiceCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/create-invoice" element={<InvoiceCreate />} />
    </Routes>
  );
}

export default App;