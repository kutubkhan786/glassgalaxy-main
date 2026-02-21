import { Routes, Route } from "react-router-dom";
import InvoiceCreate from "./pages/InvoiceCreate";
import Dashboard from "./pages/Dashboard";
import QuotationCreate from "./pages/QuatationCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-invoice" element={<InvoiceCreate />} />
      <Route path="/create-quotation" element={<QuotationCreate />} />
    </Routes>
  );
}

export default App;