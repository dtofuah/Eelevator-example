const Elevator = require("./elevator");
const Passenger = require("./passenger");

const elevator = new Elevator();
const passengers = [new Passenger("Donald", 7), new Passenger ("Kevin", 12),
	new Passenger("Mike", 3)];
console.log(passengers);


console.log ("Loading passengers ----------------");

let name = Passenger.name;
let floor = Passenger.desiredFloor;

function loadElevator() {
	elevator.loadPassenger(passengers.pop());
	elevator.goUp();
}

function unloadElevator() {
	elevator.unloadPassenger();
	elevator.goDown();
}


loadElevator();

console.log(elevator.currentPassenger.name);


elevator.on("up", function(event)	{
    // console.log(elevator.currentFloor);
    if (event.currentFloor === elevator.currentPassenger.desiredFloor)	{
        console.log("We're at " + elevator.currentPassenger.name + "'s floor!");
        unloadElevator();
        }
    else {
            elevator.goUp();
						console.log("we are on floor " + event.currentFloor);
						console.log("Elevator is moving up.");
        }
});


elevator.on("down", function(event) {
    if (event.currentFloor !== 0) {
			console.log("Going down to floor " + elevator.currentFloor);
        elevator.goDown();
    }


    if (passengers.length > 0 && event.currentFloor === 0) {
        loadElevator();
        console.log(elevator.currentPassenger.name + " is now in the elevator.");
        elevator.goUp();
    }

    if (passengers.length === 0 && event.currentFloor === 0) {
        console.log("Elevator is ready");
    }
});
