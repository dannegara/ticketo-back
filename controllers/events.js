const { db } = require('../config/database');

class Events {
    static getEvents = (req, res) => {
        const { eventId = null } = req.params;
        db.query('call GetEvents(?)', [eventId], (err, [events]) => {
            res.json(eventId ? events[0] : events);
        });
    }
    static createEvent = (req, res) => {
        console.log(res.body);
        res.send('hello :)');
    }
}

module.exports = Events;