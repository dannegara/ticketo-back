const { db, call } = require('../config/database');

class Events {
    static getEvents = (req, res) => {
        const {
            params: {
                eventId = null
            },
            query: {
                userId = null
            }
        } = req;
        db.query('call GetEvents(?,?)', [eventId, userId], (err, [events]) => {
            res.json(eventId ? events[0] : events);
        });
    }
    static createEvent = async (req, res) => {
        const {
            userId: organizerId,
            file: { path },
            body: {
                title,
                description,
                event_date,
                event_time,
                country_id,
                city,
                address,
                price
            }
        } = req;

        const [[ msg ]] = await call('CreateEvent', [
            title,
            description,
            organizerId,
            event_date,
            event_time,
            country_id,
            city,
            address,
            price,
            path
        ]);
        res.json(msg);
    }
}

module.exports = Events;