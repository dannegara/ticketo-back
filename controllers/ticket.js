const uuid = require('uuid/v4');
const QRCode = require('qrcode');
const { db } = require('../config/database');
const { transporter } = require('../config/email');

class Ticket{
    
    static activateTicket = (req, res) => {
        const { userId, qrCode } = req.body;
        
    }
    static buyTicket = (req, res) => {
        //TODO
        //Make mailOptions dynamic

        QRCode.toDataURL(uuid(), (err, url) => {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: 'dannegareh@gmail.com',
                subject: 'Text gmail email',
                html: `<h1>Check file attached to see your code</h1>`,
                attachments: [{
                    path: url
                }]
            };            
            transporter.sendMail(mailOptions, (err, mailInfo) => {
                if(err) res.json({ err: 'server error' });
                res.json({ msg: 'Email sent' });
            });
        });
    }
}

module.exports = Ticket;