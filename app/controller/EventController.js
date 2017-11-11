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

            for(var i = 0; i<cheapestNeighbors.length; i++) {
                this.showNeighbours(cheapestNeighbors[i]);
            }

        },
        
        showNeighbours: function (nearestNeighbours) {

            var template = $('#closestEventList').text();

            var renderedTemplate = this.parseTemplate(
                template,
                {
                    eventName: nearestNeighbours.name,
                    eventXPosition: nearestNeighbours.xPosition,
                    eventYPosition: nearestNeighbours.yPosition,
                    eventDistance: nearestNeighbours.distance
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