import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import config from '../../../../src/config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SendOrderInvoice = async (orderId, sendTickets, repositories) => {
    try {
        // **Fetch Order Data from Database**
        const orderData = await repositories.organizerGetorderDetails(orderId);
        console.log(orderData);

        if (!orderData) {
            return { status: false, message: 'Order not found' };
        }

        // **Extract Contact Information**
        const { contactInformation, eventId, tickets } = orderData;
        if (!contactInformation || !contactInformation.email) {
            return { status: false, message: 'No email provided in contact information' };
        }

        const { name, email } = contactInformation;

        // **Create PDF Invoice**
        const invoicePath = path.join(__dirname, `invoice_${orderId}.pdf`);
        const pdfGenerated = await generateInvoicePDF(invoicePath, orderData);
        if (!pdfGenerated) {
            return { status: false, message: 'Failed to generate invoice PDF' };
        }

        // **Send Email with Invoice**
        const emailSent = await sendInvoiceEmail(email, name, eventId, invoicePath);
        if (!emailSent) {
            return { status: false, message: 'Failed to send email' };
        }

        return { status: true, message: 'Invoice sent successfully' };
    } catch (error) {
        console.error('Error sending order invoice:', error);
        return { status: false, message: 'Failed to send order invoice' };
    }
};

/**
 * 📌 Generate PDF Invoice
 */
const generateInvoicePDF = async (filePath, orderData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);
            doc.fontSize(20).text(`Invoice for ${orderData.eventId.title}`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(14).text(`Order ID: ${orderData.orderId}`);
            doc.text(`Customer Name: ${orderData.contactInformation.name}`);
            doc.text(`Payment Method: ${orderData.paymentMethod}`);
            doc.text(`Total Amount: $${orderData.paidAmount}`);
            doc.moveDown();

            // **Loop through tickets and add QR Code (if offline event)**
            for (const ticket of orderData.tickets) {
                doc.fontSize(12).text(`Ticket: ${ticket.name}`);
                doc.text(`Ticket ID: ${ticket._id}`);

                if (orderData.eventId.locationType === 'online') {
                    const qrCodeData = JSON.stringify({ orderId: orderData.orderId, ticketId: ticket._id });
                    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

                    doc.image(qrCodeImage, { width: 100, height: 100 });
                }

                doc.moveDown();
            }

            doc.end();
            stream.on('finish', () => resolve(true));
            stream.on('error', reject);
        } catch (error) {
            console.error('Error generating invoice PDF:', error);
            reject(false);
        }
    });
};

/**
 * 📌 Send Email with Invoice
 */
const sendInvoiceEmail = async (email, name, event, invoicePath) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL_USER, // Your email
                pass: config.EMAIL_PASS, // Your email password or app password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Invoice for ${event.title}`,
            html: `
                <h2>Hello ${name},</h2>
                <p>Thank you for your order for <strong>${event.title}</strong>.</p>
                <p><strong>Event Date:</strong> ${new Date(event.startDate).toDateString()}</p>
                <p>Please find your invoice attached.</p>
            `,
            attachments: [
                {
                    filename: `Invoice_${event._id}.pdf`,
                    path: invoicePath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export default SendOrderInvoice;
