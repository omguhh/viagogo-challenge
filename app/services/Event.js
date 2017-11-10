/**
 * Created by yasmi on 11/10/2017.
 */

(function(jQuery, window, ticketsManager){
    
    var Event = {

        ticketsManager: ticketsManager,

        config: {
            gridSize: 10,
            selector: '#js-gridOfEvents'
        },

        init: function() {
            this.generateEvents(this.config.gridSize);
        },

        generateEvents: function(gridSize) {

            var x,y;
            var eventCount = 0;
            var events = [];
            for (y = gridSize; y >= -gridSize; y--) {
                for (x = -gridSize; x <= gridSize; x++) {
                    eventCount++;

                    var event = {
                        name: 'Event' + eventCount,
                        _id: eventCount,
                        tickets: this.ticketsManager.generateTicket(),
                        xPosition: x,
                        yPosition: y
                    };

                    events.push(event);
                }
            }
            this.appendEvents(events)

        },

        appendEvents: function (events) {

            for (i = 0; i < events.length; ++i) {
                $("<div class='event' id='" + events[i]._id + "' data-x-position='" + events[i].xPosition + "' data-y-position='" + events[i].yPosition + "' data-name='" + events[i].name + "'>").appendTo(this.config.selector);
            }
        }
        
    };

    window.Event = Event;

})(jQuery, window, window.TicketManager);