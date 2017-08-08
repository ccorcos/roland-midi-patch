var midi = require("midi")

var input = new midi.input()

// Count the available input ports.
const count = input.getPortCount()
console.log("MIDI port count:", count)

if (count === 0) {
	console.log("Midi not connected")
	process.exit(1)
}

// Get the name of a specified input port.
console.log("Connecting to MIDI port 0:", input.getPortName(0))

var output = new midi.output()
output.openVirtualPort("Roland Patch")

const notes = {}

function isOn(message: [number, number, number]): boolean {
	return message[0].toString(16)[0] === "9"
}

function isOff(message: [number, number, number]): boolean {
	return message[0].toString(16)[0] === "8"
}

function getNote(message: [number, number, number]): number {
	return message[1]
}

function turnOff(message: [number, number, number]): [number, number, number] {
	const number = "8" + message[0].toString(16).slice(1)
	message[0] = parseInt(number, 16)
	return message
}

input.on("message", function(deltaTime, message) {
	console.log("m:" + message + " d:" + deltaTime)
	if (isOn(message)) {
		const note = getNote(message)
		if (notes[note] === true) {
			output.sendMessage(turnOff(message))
			notes[note] = false
		} else {
			output.sendMessage(message)
			notes[note] = true
		}
	} else if (isOff(message)) {
		const note = getNote(message)
		output.sendMessage(message)
		notes[note] = false
	}
})

// Open the first available input port.
input.openPort(0)

// // Close the port when done.
// input.closePort()
// // Close the port when done.
// output.closePort()
