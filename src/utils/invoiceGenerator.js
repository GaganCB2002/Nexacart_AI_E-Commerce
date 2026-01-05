export const generateInvoice = (order) => {
    const invoiceWindow = window.open('', '_blank');

    // Safety check if popup blocked
    if (!invoiceWindow) {
        alert("Please allow popups to view the invoice.");
        return;
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - ${order.id}</title>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
                .header { display: flex; justify-content: space-between; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #eee; }
                .company-name { font-size: 28px; font-weight: bold; color: #2563eb; }
                .invoice-title { font-size: 24px; text-transform: uppercase; color: #666; text-align: right; }
                .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
                .section-title { font-size: 14px; color: #888; text-transform: uppercase; margin-bottom: 10px; font-weight: bold; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                th { text-align: left; padding: 15px; background: #f8f9fa; border-bottom: 2px solid #eee; font-size: 14px; text-transform: uppercase; }
                td { padding: 15px; border-bottom: 1px solid #eee; }
                .total-section { text-align: right; }
                .total-row { font-size: 20px; font-weight: bold; padding-top: 10px; }
                .footer { margin-top: 60px; text-align: center; color: #999; font-size: 12px; }
                .print-btn { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px; margin-bottom: 20px; }
                @media print { .print-btn { display: none; } }
            </style>
        </head>
        <body>
            <button onclick="window.print()" class="print-btn">Download / Print PDF</button>

            <div class="header">
                <div>
                    <div class="company-name">NexaCart</div>
                    <div style="font-size: 14px; margin-top: 5px; color: #666;">Premium E-Commerce</div>
                    <div style="font-size: 14px; color: #666;">123 Galaxy Tower, Bangalore</div>
                </div>
                <div>
                    <div class="invoice-title">Tax Invoice</div>
                    <div style="margin-top: 10px; text-align: right;">
                        <strong>Invoice #:</strong> INV-${order.id}<br>
                        <strong>Date:</strong> ${order.date}<br>
                        <strong>Order ID:</strong> ${order.id}
                    </div>
                </div>
            </div>

            <div class="details">
                <div>
                    <div class="section-title">Bill To</div>
                    <strong>Customer Name</strong><br>
                    123, User Address<br>
                    Bangalore, India
                </div>
                <!-- Add Shipping Address if available -->
            </div>

            <table>
                <thead>
                    <tr>
                        <th style="width: 50%;">Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th style="text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>
                                <strong>${item.name}</strong>
                                <div style="font-size: 12px; color: #888;">ID: ${item.id}</div>
                            </td>
                            <td>1</td>
                            <td>Rs. ${item.price?.toLocaleString() || order.total.toLocaleString()}</td>
                            <td style="text-align: right;">Rs. ${item.price?.toLocaleString() || order.total.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="total-section">
                <div>Subtotal: Rs. ${order.total.toLocaleString()}</div>
                <div>Tax (18%): Rs. ${(order.total * 0.18).toLocaleString()}</div>
                <div class="total-row">Grand Total: Rs. ${(order.total * 1.18).toLocaleString()}</div>
            </div>

            <div class="footer">
                Thank you for shopping with NexaCart!<br>
                This is a computer-generated invoice.
            </div>

            <script>
                // Auto-print on load if desired, but button is safer
                // window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `;

    invoiceWindow.document.write(htmlContent);
    invoiceWindow.document.close();
};
