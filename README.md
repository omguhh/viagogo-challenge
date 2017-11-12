# viagogo-challenge
# Requirements
* Code in any language you like but please provide clear instructions on how we
should build & run your code.
* Please use any source control system you like, and send us a link via github or google
drive (our email system blocks zip files).
* The first requirement is your code meets the requirements.
* Secondary requirements are whether your code is idiomatic for the language being
coded in, easy to read, and clearly laid out.
# Scenario
* Your program should randomly generate seed data.
* Your program should operate in a world that ranges from -10 to +10 (Y axis), and -10
to +10 (X axis).
* Your program should assume that each co-ordinate can hold a maximum of one
event.
* Each event has a unique numeric identifier (e.g. 1, 2, 3).
* Each event has zero or more tickets.
* Each ticket has a non-zero price, expressed in US Dollars.
* The distance between two points should be computed as the Manhattan distance.
# Instructions
* You are required to write a program which accepts a user location as a pair of coordinates, and returns a list of the five closest events, along with the cheapest ticket
price for each event.
* Please detail any assumptions you have made.

# Example Program Run
Please Input Coordinates:

 4,2

Closest Events to (4,2):

Event 003 - $30.29, Distance 3

Event 001 - $35.20, Distance 5

Event 006 - $01.40, Distance 1

# Instructions

Nothing! Just click on the link in the repo summary, or click right [here](https://omguhh.github.io/viagogo-challenge/) :) 


# Questions

* How might you change your program if you needed to support multiple events at the
same location?

I would create a new object, called location, and would generate the grid with every block being a location instead of an event. 
Within every location block, I would generate multiple events, similar to how multiple tickets are created for the same event. 

* How would you change your program if you were working with a much larger world size?

Well, if it was a larger world, the search implementation would need to improve because right now, there's a loop going through all the event elements that were generated, which is unnecessary if we just need to find the 5 closest elements. 
Maybe a better way to do this, is to change the structure of how these events are organized, so they have information about the neighbours near to them. Ex: Change it from a basic array, to a tree structure that you can easily travel up/down in to find neighbours relevant to that specific point in the grid, without having to look into other unnecessary points.