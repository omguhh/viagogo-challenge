/**
 * Created by yasmi on 11/10/2017.
 */

(function(jQuery, window){
    
    var TicketManager = {

        generateTicket: function () {

            var ticketCost, ticketsAvailable, ticket, tickets, cheapestTicket;

            tickets = [];

            ticketsAvailable = Math.floor(Math.random() * (101));
            ticketCost = Math.floor(Math.random() * (101));

            for(var i = 0; i < ticketsAvailable; i++) {

                ticketCost = Math.floor(Math.random() * (101));

                ticket  = {
                    ticketPrice: ticketCost
                };

                if (!cheapestTicket || ticket.ticketPrice < cheapestTicket) {
                    cheapestTicket = ticket;
                }

                tickets.push(ticket);

            }

           return {
               tickets: tickets,
               cheapestTicket: cheapestTicket  || 0
           };

        }
        
    };

    window.TicketManager = TicketManager;

})(jQuery, window);