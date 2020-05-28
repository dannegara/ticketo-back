const uuid = require('uuid/v4');
const QRCode = require('qrcode');
const { db, call } = require('../config/database');
const { transporter } = require('../config/email');
const emailTemplate = require('../config/emailHtmlTemplate');

class Ticket{
    
    static activateTicket = (req, res) => {
        const { userId, body: { qrCode } } = req;
        db.query('call CheckTicket(?,?)', [userId, qrCode], (err, ticketInfo) => {
            if(err) res.status(500),json({ err: 'database error' });
            const [[{ msg }]] = ticketInfo; //Desctructuring the db info from an object of a two dimensional array
            res.status(200).json({ msg });
        })
    }

    static buyTicket = async (req, res) => {
        const { body: { eventId }, userId } = req;
        const [[{ email }]] = await call('GetUsers', [userId]);
        const generatedCode = uuid();
        await call('AddTicket', [generatedCode, userId, eventId]);

        db.query('call GetEvents(?)', [eventId], (err, eventInfo) => {
            if(err) res.json({ err: 'database error' });
            const { title, price, event_date } = eventInfo[0][0];
            QRCode.toDataURL(generatedCode, (_, qrCodeUri) => {
                const mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: 'Ticketo purchase',
                    html: emailTemplate(title, event_date, price),
                    attachments: [{
                        path: qrCodeUri
                    }]
                };
                transporter.sendMail(mailOptions, (err, mailInfo) => {
                    if(err) res.json({ err: 'server error' });
                    res.json({ msg: 'Email sent' });
                }); 
            });
        });
    }
}

module.exports = Ticket;