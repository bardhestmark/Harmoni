const daoParentTicket = require('./dao.ts');
const Ticket = require('./Ticket.ts');

export interface ticket {
    ticketId : number;
    eventId : number;
    price : number;
    type : string;
}

export default class ticketDao extends daoParentTicket {
    constructor(pool) {
        super(pool);
    }

    getAllTickets(callback) {
        super.query("SELECT * FROM ticket", [], callback);
    }

    getTicketsByEventId(eventId : number, callback) {
        super.query('SELECT * FROM ticket WHERE event_id = ?', [eventId], callback);
    }

    addTicket(ticket : ticket, callback) {
        super.query('INSERT INTO ticket VALUES(DEFAULT, ?, ?, ?)', [ticket.eventId, ticket.price, ticket.type], callback);
    }


    deleteTicket(ticketId: number, callback){
        super.query('DELETE FROM ticket WHERE ticket_id = ?', [ticketId], callback);
    }
    
    deleteAllTicketsForEvent(eventId: number, callback){
        super.query('DELETE * FROM ticket WHERE event_id = ?', [eventId], callback);
    }

};
