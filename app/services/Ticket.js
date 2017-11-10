/**
 * Created by yasmi on 11/10/2017.
 */

(function(jQuery, window){
    
    var TicketManager= {

        generateTicket: function () {

            var ticketCost, ticketsAvailable, ticket;

            ticketsAvailable = Math.floor(Math.random() * (101));
            ticketCost = Math.floor(Math.random() * (101));

            ticket  = {
                costPerTicket: ticketCost,
                ticketsAvailable: ticketsAvailable
            };

           return ticket;

        }
        
    };

    window.TicketManager = TicketManager;

})(jQuery, window);