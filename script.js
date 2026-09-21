let state = "S0";
let occupied = 0;
let detected = false;

function updateDisplay() {

    let stateText = "";

    if (state === "S0") {
        stateText = "S0 - Empty";
    }
    else if (state === "S1") {
        stateText = "S1 - Vehicle Detected";
    }
    else if (state === "S2") {
        stateText = "S2 - Occupied";
    }
    else if (state === "S3") {
        stateText = "S3 - Full";
    }
    highlightState(state);

    document.getElementById("state").innerText =
        "Current State: " + stateText;

    document.getElementById("occupied").innerText =
        occupied;
}


function startSimulation() {

    document.getElementById("simulation")
        .scrollIntoView();

}


function detectVehicle() {

    if (occupied >= 5) {

        document.getElementById("message").innerText =
            "❌ Parking is FULL!";

        return;
    }

    if (detected) {

        document.getElementById("message").innerText =
            "❌ Vehicle already detected!";

        return;
    }

    state = "S1";
    detected = true;

    document.getElementById("message").innerText =
        "Vehicle detected. Confirm parking.";

    updateDisplay();
}


function parkVehicle() {

    if (!detected) {

        document.getElementById("message").innerText =
            "❌ Invalid! Detect vehicle first.";

        return;
    }

    occupied++;
    updateDisplay();
    detected = false;

    if (occupied === 5) {
        state = "S3";
    }
    else {
        state = "S2";
    }

    document.getElementById("message").innerText =
        "✅ Vehicle parked successfully.";

    updateDisplay();
    if (state === "S3") {
    updateCurrentState(
        "S3 - Full",
        "Parking is full. All 5 slots are occupied."
    );
}
else {
    updateCurrentState(
        "S2 - Occupied",
        "Vehicle has been parked successfully."
    );
}
}


function exitVehicle() {

    if (occupied === 0) {

        document.getElementById("message").innerText =
            "❌ Invalid! Parking is already empty.";

        return;
    }

    occupied--;

    if (occupied === 0) {
        state = "S0";
    }
    else {
        state = "S2";
    }

    document.getElementById("message").innerText =
        "🚗 Vehicle exited successfully.";

    updateDisplay();
    if (state === "S0") {
    updateCurrentState(
        "S0 - Empty",
        "Last vehicle exited. Parking is empty."
    );
}
else {
    updateCurrentState(
        "S2 - Occupied",
        occupied + " vehicle(s) remain in the parking area."
    );
}
}


function resetSystem() {

    state = "S0";
    occupied = 0;
    detected = false;

    document.getElementById("message").innerText =
        "System reset.";

    updateDisplay();
    updateCurrentState(
    "S0 - Empty",
    "System has been reset. Parking is ready."
);
}


updateDisplay();
function showState(state) {

    const info = document.getElementById("state-info");

    if (state === "S0") {
        info.innerHTML = `
            <h3>S0 - Empty</h3>
            <p>No vehicle is currently occupying the parking system.</p>
        `;
    }

    else if (state === "S1") {
        info.innerHTML = `
            <h3>S1 - Detected</h3>
            <p>A vehicle has been detected and is waiting for parking confirmation.</p>
        `;
    }

    else if (state === "S2") {
        info.innerHTML = `
            <h3>S2 - Occupied</h3>
            <p>Parking space is occupied by a vehicle.</p>
        `;
    }

    else if (state === "S3") {
        info.innerHTML = `
            <h3>S3 - Full</h3>
            <p>All available parking spaces are occupied.</p>
        `;
    }
}

            
function updateCurrentState(state, message) {
    const currentState = document.getElementById("current-state");

    currentState.innerHTML = `
        <h3>Current State: ${state}</h3>
        <p>${message}</p>
    `;
}
updateCurrentState(
    "S0 - Empty",
    "Parking system is ready."
);
function vehicleDetected() {
    updateCurrentState(
        "S1 - Detected",
        "A vehicle has been detected and is waiting for parking confirmation."
    );
}
function parkingConfirmed() {
    updateCurrentState(
        "S2 - Occupied",
        "Parking has been confirmed and the slot is occupied."
    );
}
function highlightState(state) {

    document.querySelectorAll(".fsm-state").forEach(function(element) {
        element.classList.remove("active-state");
    });

    const currentState = document.querySelector(".fsm-state." + state.toLowerCase());

    if (currentState) {
        currentState.classList.add("active-state");
    }
}
function showTransition(from, event, to) {

    const info = document.getElementById("state-info");

    info.innerHTML = `
        <h3>Transition: ${from} → ${to}</h3>
        <p><b>Event:</b> ${event}</p>
        <p>The system changes from ${from} to ${to}.</p>
    `;
}