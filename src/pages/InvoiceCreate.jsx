import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/invoice.css";
import logo from "/gglogo.png";

function InvoiceCreate() {
    const pdfRef = useRef();

    const [items, setItems] = useState([
        { item: "", size: "", sqft: "", rate: "", total: 0 },
    ]);

    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handleChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;

        if (field === "sqft" || field === "rate") {
            const sqft = Number(updatedItems[index].sqft) || 0;
            const rate = Number(updatedItems[index].rate) || 0;
            updatedItems[index].total = sqft * rate;
        }

        setItems(updatedItems);
    };

    const addRow = () => {
        setItems([
            ...items,
            { item: "", size: "", sqft: "", rate: "", total: 0 },
        ]);
    };

    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    const today = new Date().toLocaleDateString();
    const invoiceNumber = "INV-" + Date.now();

    const downloadPDF = async () => {
        const element = pdfRef.current;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${invoiceNumber}.pdf`);
    };

    return (
        <div>
            {/* Buttons */}
            <div className="action-buttons">
                <button onClick={addRow}>+ Add Item</button>
                <button onClick={downloadPDF}>Download PDF</button>
            </div>

            {/* Visible Responsive Layout */}
            <div className="invoice-container">
                <div className="invoice-header">
                    <div className="company-info">
                        <img src={logo} alt="Glass Galaxy Logo" className="company-logo" />
                        <h2>Glass Galaxy</h2>
                        <p>GST No: ____________</p>
                        <p>Phone: ____________</p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                        <div className="invoice-title">INVOICE</div>
                        <p>Invoice No: {invoiceNumber}</p>
                        <p>Date: {today}</p>
                    </div>
                </div>

                <div className="section-box">
                    <h3>From:</h3>
                    <p>Glass Galaxy</p>
                    <p>Dwarka, Nashik</p>
                    <p>+91 866899322</p>
                </div>

                <div className="section-box">
                    <h3>To:</h3>
                    <input
                        placeholder="Customer Name"
                        value={customer.name}
                        onChange={(e) =>
                            setCustomer({ ...customer, name: e.target.value })
                        }
                    />
                    <input
                        placeholder="Customer Address"
                        value={customer.address}
                        onChange={(e) =>
                            setCustomer({ ...customer, address: e.target.value })
                        }
                    />
                    <input
                        placeholder="Customer Phone"
                        value={customer.phone}
                        onChange={(e) =>
                            setCustomer({ ...customer, phone: e.target.value })
                        }
                    />
                </div>

                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Size</th>
                            <th>Sq.ft</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        value={row.item}
                                        onChange={(e) =>
                                            handleChange(index, "item", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        value={row.size}
                                        onChange={(e) =>
                                            handleChange(index, "size", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.sqft}
                                        onChange={(e) =>
                                            handleChange(index, "sqft", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.rate}
                                        onChange={(e) =>
                                            handleChange(index, "rate", e.target.value)
                                        }
                                    />
                                </td>
                                <td>{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="total-section">
                    Grand Total: ₹ {grandTotal}
                </div>

                <div className="signature">
                    <div className="signature-box">Customer Signature</div>
                    <div className="signature-box">Authorized Signature</div>
                </div>

                <div className="invoice-footer">
                    +91 866899322 | Address: Dwarka Nashik |
                    Email: kutubmerchant598@gmail.com
                </div>
            </div>

            {/* Hidden Desktop Layout for PDF */}
            <div className="hidden-pdf">
                <div className="invoice-container pdf-layout" ref={pdfRef}>
                    <div className="invoice-header">
                        <div className="company-info">
                            <img src={logo} alt="Glass Galaxy Logo" className="company-logo" />
                            <p>GST No: ____________</p>
                            <p>Phone: ____________</p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div className="invoice-title">INVOICE</div>
                            <p>Invoice No: {invoiceNumber}</p>
                            <p>Date: {today}</p>
                        </div>
                    </div>

                    <div className="section-box">
                        <h3>From:</h3>
                        <p>Glass Galaxy</p>
                        <p>Dwarka, Nashik</p>
                        <p>+91 866899322</p>
                    </div>

                    <div className="section-box">
                        <h3>To:</h3>
                        <p>{customer.name}</p>
                        <p>{customer.address}</p>
                        <p>{customer.phone}</p>
                    </div>

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Size</th>
                                <th>Sq.ft</th>
                                <th>Rate</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.item}</td>
                                    <td>{row.size}</td>
                                    <td>{row.sqft}</td>
                                    <td>{row.rate}</td>
                                    <td>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total-section">
                        Grand Total: ₹ {grandTotal}
                    </div>

                    <div className="signature">
                        <div className="signature-box">Customer Signature</div>
                        <div className="signature-box">Authorized Signature</div>
                    </div>

                    <div className="invoice-footer">
                        +91 866899322 | Address: Dwarka Nashik |
                        Email: kutubmerchant598@gmail.com
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceCreate;