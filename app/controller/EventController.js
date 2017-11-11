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
            this.showNeighbours(cheapestNeighbors);

        },
        
        showNeighbours: function (nearestNeighbours) {

        }

    };

    window.eventController = eventController;

})(jQuery, window, window.eventService);