/**
 * Created by yasmi on 11/10/2017.
 */

/**
 * Created by yasmi on 11/10/2017.
 */

(function(jQuery, window, eventService){

    var eventController = {

        eventService: eventService,

        config: {
            gridSize: 10,
            gridContainer: '#js-gridOfEvents',
            maxNeighborsToReturn: 6
        },


        elements: {
            submitButton: $('.js-submit'),
            event: $('.event')
        },


        setEvents: function() {
            this.elements.submitButton.on('click', this.handleFormSubmit.bind(this));
        },

        init: function () {
            this.eventService.init(this.config);
            this.setEvents();
        },

        handleFormSubmit: function (e) {

            e.preventDefault();
            var xposition = $('#xCoordinate')[0].value;
            var yposition = $('#yCoordinate')[0].value;

            this.eventService.findCurrentEvent(xposition,yposition);
            var cheapestNeighbors = this.eventService.findCheapestNeighbors(xposition,yposition,$('.event'), this.config.maxNeighborsToReturn);
            $("#eventListGroup,#eventSearchResultTitle ").empty();

            this.updateSearchTitle(xposition,yposition);

            for(var i = 0; i<cheapestNeighbors.length; i++) {
                this.showNeighbours(cheapestNeighbors[i]);
            }

        },

        updateSearchTitle: function (xposition,yposition) {
            var lookedUpEvent = this.eventService.getEvent("coordinates",{xCord:xposition, yCord:yposition} );
            $("#eventSearchResultTitle").append("<h4>Top 5 Events for " + lookedUpEvent.data('name') + "</h4>");

        },
        
        showNeighbours: function (nearestNeighbours) {

            var template = $('#closestEventList').text();

            var renderedTemplate = this.parseTemplate(
                template,
                {
                    eventID: nearestNeighbours._id,
                    eventName: nearestNeighbours.name,
                    eventXPosition: nearestNeighbours.xPosition,
                    eventYPosition: nearestNeighbours.yPosition,
                    eventDistance: nearestNeighbours.distance,
                    eventTicketPrice: nearestNeighbours.cheapestTicket,
                    inputEventName: nearestNeighbours.inputEventName
                }
            );

            $("#eventListGroup").append($(renderedTemplate));

        },

        parseTemplate: function(template, data) {

            var variablePlaceholder = /\{\S+\}/g;

            var rendered = template.replace(variablePlaceholder, function(match){

                var variableName = match.substr(1, match.length-2);

                var value = data[variableName];

                return value;

            });

            return rendered;

        }

    };

    window.eventController = eventController;

})(jQuery, window, window.eventService);