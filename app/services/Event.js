/**
 * Created by yasmi on 11/10/2017.
 */

(function(jQuery, window, ticketsManager){
    
    var eventService = {

        ticketsManager: ticketsManager,

        config: {},

        init: function(config) {
            this.config = config;
            this.generateEvents(this.config.gridSize);
        },

        getEvent: function (searchType, data) {
            var eventElement;
            switch (searchType) {
                case 'id':
                    eventElement =  $(".event[id='" + data.id + "']");
                    break;
                case 'coordinates':
                    eventElement = $(".event[data-x-position='" + data.xCord + "'][data-y-position='" + data.yCord +"']").addClass("event--active");
                    break;
            }
            return eventElement;
        },


        updateEvent: function (eventElement, distance) {

            var event = {
                name: eventElement.data('name'),
                _id: eventElement.attr('id'),
                xPosition: eventElement.data('xPosition'),
                yPosition: eventElement.data('yPosition'),
                distance: distance,
                cheapestTicket: eventElement.data('cheapest-ticket')
            };

            return event;
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
            this.appendEvents(events);

        },

        appendEvents: function (events) {

            for (i = 0; i < events.length; i++) {
                $("<div class='event' id='" + events[i]._id + "' data-x-position='" + events[i].xPosition + "' data-y-position='" + events[i].yPosition + "' data-name='" + events[i].name + "' data-cheapest-ticket='" + events[i].tickets.cheapestTicket.ticketPrice + "'>").appendTo(this.config.gridContainer);
            }
        },

        findCurrentEvent: function(inputXCord, inputYCord) {
            $('.event').removeClass('event--active');
            var eventItem = this.getEvent('coordinates',{xCord:inputXCord, yCord:inputYCord });
            eventItem.addClass("event--active");
        },

        findCheapestNeighbors: function (inputXCord, inputYCord, events, maxNeighborsToReturn) {
            var distance= [];
            var nearestNeighbours= [];

            for(i = 0; i< events.length; i++)  {
                computedDistance = Math.abs(inputXCord - $(events[i]).data('xPosition')) + Math.abs(inputYCord - $(events[i]).data('yPosition'));

                var cellDistance = {
                    eventID: $(events[i]).attr('id'),
                    distanceFromInput: computedDistance
                };

                distance.push(cellDistance);
            }

            //sort the events based on how close they are
            distance = distance.sort(function(a, b) {
                return a.distanceFromInput - b.distanceFromInput;
            });


            //return the closest ones only based on how much we need to display from config
            nearestNeighbours = distance.slice(1,maxNeighborsToReturn);

            for(var i = 0; i<nearestNeighbours.length; i++) {
                nearestNeighbourEventItem= this.getEvent("id",{id:nearestNeighbours[i].eventID});
                nearestNeighbours[i] = this.updateEvent(nearestNeighbourEventItem,nearestNeighbours[i].distanceFromInput);
            }

            return nearestNeighbours;
        }
        
    };

    window.eventService = eventService;

})(jQuery, window, window.TicketManager);