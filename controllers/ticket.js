const { db } = require('../config/database');
const { transporter, mailOptions } = require('../config/email');

class Ticket{
    
    static activateTicket = (req, res) => {
        const { userId, qrCode } = req.body;
        
    }
    static buyTicket = (req, res) => {
        //res.send("Bought");
        //Generate qr code here and send to email

        //TODO
        //Make mailOptions dynamic
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: 'dannegareh@gmail.com',
            subject: 'Text gmail email',
            text: 'Email text with qr code'
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) res.json({ err: 'Server error' });
            res.json({ msg: 'Email sent' });
        });
    }
}

module.exports = Ticket;