const uuid = require('uuid/v4');
const QRCode = require('qrcode');
const { db } = require('../config/database');
const { transporter } = require('../config/email');
const emailTemplate = require('../config/emailHtmlTemplate');

class Ticket{
    
    static activateTicket = (req, res) => {
        const { userId, qrCode } = req.body;
        
    }
    static buyTicket = (req, res) => {
        const { eventId } = req.body;

        db.query('call GetEvents(?)', [eventId], (err, eventInfo) => {
            if(err) res.json({ err: 'database error' });
            const { title, price, event_date } = eventInfo[0][0];
            const generatedCode = uuid();
            QRCode.toDataURL(generatedCode, (_, qrCodeUri) => {
                const mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: 'dannegareh@gmail.com',
                    subject: 'Ticketo purchase',
                    html: emailTemplate(title, event_date, price),
                    attachments: [{
                        path: qrCodeUri
                    }]
                };
                transporter.sendMail(mailOptions, (err, mailInfo) => {
                    console.log(err);
                    //TODO
                    //Put these messages in a constant file
                    if(err) res.json({ err: 'server error' });
                    res.json({ msg: 'Email sent' });
                }); 
            });
        });
        
        //QRCode.toDataURL(uuid(), (err, url) => {
           
            // transporter.sendMail(mailOptions, (err, mailInfo) => {
            //     console.log(err);
            //     if(err) res.json({ err: 'server error' });
            //     res.json({ msg: 'Email sent' });
            // });
        //});
    }
}

module.exports = Ticket;