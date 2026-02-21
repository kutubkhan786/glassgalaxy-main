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

    // const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    // const tax = subtotal * 0.18; // 18% GST
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    const today = new Date().toLocaleDateString();
    const invoiceNumber = "INV-" + Date.now();

    const downloadPDF = async () => {
        const element = pdfRef.current;

        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${invoiceNumber}.pdf`);
    };

    return (
        <div className="invoice-wrapper">
            {/* Buttons */}


            {/* Mobile Responsive UI for Data Entry */}
            <div className="invoice-container mobile-entry">
                {/* Header with Logo and INVOICE */}
                <div className="invoice-header">
                    <div className="company-info">
                        <img src={logo} alt="Glass Galaxy Logo" className="company-logo" />
                        <div className="company-details">
                            <h2>GLASS GALAXY</h2>
                            <p className="tagline">We Deal In All Types Of Glass And Fabrication Works</p>
                        </div>
                    </div>
                    <div className="invoice-top-right">
                        <div className="invoice-label">INVOICE</div>
                        <div className="invoice-number">{invoiceNumber}</div>
                    </div>
                </div>

                {/* From Section */}
                <div className="from-section">
                    <h3>FROM:</h3>
                    <p>Glass Galaxy</p>
                    <p>Dwarka, Nashik, Maharashtra</p>
                    <p>+91 866899322</p>
                    <p>kutubmerchant598@gmail.com</p>
                </div>

                {/* To Section */}
                <div className="to-section">
                    <h3>TO:</h3>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Customer Address"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Customer Phone"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                </div>

                {/* Items Table - Mobile Optimized */}
                <div className="items-section">
                    <h3>ITEMS</h3>
                    {items.map((row, index) => (
                        <div key={index} className="mobile-item-row">
                            <div className="item-fields">
                                <input
                                    placeholder="Item"
                                    value={row.item}
                                    onChange={(e) => handleChange(index, "item", e.target.value)}
                                />
                                <input
                                    placeholder="Size"
                                    value={row.size}
                                    onChange={(e) => handleChange(index, "size", e.target.value)}
                                />
                            </div>
                            <div className="item-fields">
                                <input
                                    type="number"
                                    placeholder="Sq.ft"
                                    value={row.sqft}
                                    onChange={(e) => handleChange(index, "sqft", e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Rate (₹)"
                                    value={row.rate}
                                    onChange={(e) => handleChange(index, "rate", e.target.value)}
                                />
                                <div className="item-total">₹ {row.total}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="totals-section">
                    {/* <div className="total-row">
                        <span>Subtotal:</span>
                        <span>₹ {subtotal.toFixed(2)}</span>
                    </div> */}
                    {/* <div className="total-row">
                        <span>Tax (18% GST):</span>
                        <span>₹ {tax.toFixed(2)}</span>
                    </div> */}
                    <div className="grand-total">
                        <span>Grand Total:</span>
                        <span>₹ {grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                {/* Signatures */}
                <div className="signature-section">
                    <div className="signature-box">
                        <p>Customer Signature</p>
                        <div className="signature-line"></div>
                    </div>
                    <div className="signature-box">
                        <p>Authorized Signature</p>
                        <div className="signature-line"></div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout for PDF - Matches Image */}
            <div className="hidden-pdf">
                <div className="invoice-container pdf-layout" ref={pdfRef}>
                    {/* PDF Header with INVOICE */}
                    <div className="pdf-header">
                        <img src={logo} alt="Glass Galaxy Logo" className="company-logo" />
                        <div className="pdf-left">
                            <div className="pdf-title">GLASS GALAXY</div>
                            <div className="pdf-subtitle">We Deal In All Types Of Glass And Fabrication Works</div>
                        </div>
                        <div className="pdf-right">
                            <div className="invoice-label">INVOICE</div>
                            <div className="invoice-number">{invoiceNumber}</div>
                            <div className="invoice-date">Date: {today}</div>
                        </div>
                    </div>

                    {/* PDF From/To section */}
                    <div className="pdf-from-to">
                        <div className="pdf-from">
                            <strong>FROM:</strong><br />
                            Glass Galaxy<br />
                            Dwarka, Nashik, Maharashtra<br />
                            +91 866899322<br />
                            kutubmerchant598@gmail.com
                        </div>
                        <div className="pdf-to">
                            <strong>TO:</strong><br />
                            {customer.name || '____________________'}<br />
                            {customer.address || '____________________'}<br />
                            {customer.phone || '____________________'}
                        </div>
                    </div>

                    {/* PDF Table */}
                    <table className="pdf-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Size</th>
                                <th>Sq.ft</th>
                                <th>Rate (₹)</th>
                                <th>Total (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.item || '______'}</td>
                                    <td>{row.size || '______'}</td>
                                    <td>{row.sqft || '0'}</td>
                                    <td>{row.rate || '0'}</td>
                                    <td>₹ {row.total}</td>
                                </tr>
                            ))}
                            {items.length < 5 && [...Array(5 - items.length)].map((_, i) => (
                                <tr key={`empty-${i}`}>
                                    <td>{items.length + i + 1}</td>
                                    <td>______</td>
                                    <td>______</td>
                                    <td>___</td>
                                    <td>___</td>
                                    <td>₹ 0</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* PDF Totals */}
                    <div className="pdf-totals">
                        {/* <div className="pdf-subtotal">Subtotal: ₹ {subtotal.toFixed(2)}</div> */}
                        {/* <div className="pdf-tax">Tax (18% GST): ₹ {tax.toFixed(2)}</div> */}
                        <div className="pdf-grand-total">Grand Total: ₹ {grandTotal.toFixed(2)}</div>
                    </div>

                    {/* PDF Signatures */}
                    <div className="pdf-signatures">
                        <div className="pdf-signature">
                            <div className="signature-company">GLASS GALAXY</div>
                            <div className="signature-line"></div>
                            <div className="signature-label">Customer Signature</div>
                        </div>
                        <div className="pdf-signature">
                            <div className="signature-line"></div>
                            <div className="signature-label">Authorized Signature</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button onClick={addRow} className="btn-primary">+ Add Item</button>
                <button onClick={downloadPDF} className="btn-secondary">Download PDF</button>
            </div>
        </div>
    );
}

export default InvoiceCreate;