// WELCOME TO THE CODE OF CRIME COMMITTER II


// ***
// GLOBALS
// ***
var versionNumber = "v0.2";
var versionCode = "jaywalker";


// ***
// STRUCTS
// which are actually functions that are instantiated to hold data
// ***
//
// this function is a struct that contains the global fundamental values like money etc
function structOfGlobalFundamentals(
    playerMoney,
    playerNoto,
    playerCrimesCommitted
) {
    this.playerMoney = playerMoney;
    this.playerNoto = playerNoto;
    this.playerCrimesCommitted = playerCrimesCommitted;
}
//
var globalFundamentals = new structOfGlobalFundamentals(500000, 0, 0);

// this function is a struct that lays out the values for a timed crime
// (these will change over time)
function timedCrimeValues(
    state,
    numberOfTimesCommitted,
    datetimeCrimeWillEnd,
    datetimeCrimeStarted
) {
    // 0 = ready to run
    // 1 = running
    // 2 = completed but haven't collected resources
    // 3 = unavailable (need more noto)
    this.state = state;
    this.numberOfTimesCommitted = numberOfTimesCommitted;
    this.datetimeCrimeWillEnd = datetimeCrimeWillEnd;
    this.datetimeCrimeStarted = datetimeCrimeStarted;
}
// this function is a struct that holds the content for a timed crime
// the names, text about it etc, (these wont changge)
// INCLUDING a function/struct that it creates to hold the values
function timedCrime(
    name,
    millisecondsToComplete,
    notoToUnlock,
    notoToBeVisible,
    rewardMoney,
    rewardNoto
) {
    this.name = name;
    this.millisecondsToComplete = millisecondsToComplete;
    this.notoToUnlock = notoToUnlock;
    this.notoToBeVisible = notoToBeVisible;
    this.rewardMoney = rewardMoney,
        this.rewardNoto = rewardNoto,
        this.timedCrimeValues = new timedCrimeValues(
            0, 0, 0, 0
        )
}



// ***
// FUNCTIONS
// ***

// update the header where it shows basic numbers like $$ and crime
// to do: convert notoriety into a word like petty criminal etc
// to do: make money and crimes committed some of those things that handles big numbers
function updateHeaderGlobalFundamentals() {
    var newHeaderGlobalFundamentalsHTML = globalFundamentals.playerCrimesCommitted.toLocaleString("en-US") + " crimes committed" +
        "<br>$" + globalFundamentals.playerMoney.toLocaleString("en-US") +
        "<br>" + globalFundamentals.playerNoto + " notoriety"
    document.getElementById("headerGlobalFundamentals").innerHTML = newHeaderGlobalFundamentalsHTML;
}

// experiement to add a bunch of crime blocks

function addBunchOfCrimeBlocks(number_of_blocks_to_make) {

    for (let divnum = 0; divnum < number_of_blocks_to_make; divnum++) {
        // make new div of element div
        var newdiv = document.createElement("div");
        //define its class
        newdiv.className = "unit_of_crime";
        //wont bother giving it a name for this
        //but will put something in it
        newdiv.innerHTML = "words" + divnum;

        // append into the crimes box
        document.getElementById("crimeBlockID").appendChild(newdiv);

    }
}

//this function just changes what text is on timers
// it doesnt test them to see if time has paseds
function refreshCrimeTimers() {
    switch (crime001_content.timedCrimeValues.state) {
        case 0:

            crime001_button.innerHTML = "commit crime";
            break;
        case 1:
            var formattedTime = "";
            var timeUntilComplete = dayjs.duration(dayjs(crime001_content.timedCrimeValues.datetimeCrimeWillEnd).diff(dayjs()));
            timeUntilComplete.seconds = timeUntilComplete.format("ss");
            crime001_button.innerHTML = "time until complete<br>" +
                timeUntilComplete.seconds + " s";
            break;
        case 2:
            crime001_button.innerHTML = "crime committed";


    }

}

function checkIfTimersElapsed() {
    if (crime001_content.timedCrimeValues.state == 1) {
        if (dayjs().isAfter(crime001_content.timedCrimeValues.datetimeCrimeWillEnd)) {
            crime001_content.timedCrimeValues.state = 2;
        }
    }
}



// this should be called once to create a div for housing
function createAccomodationDiv() {
    var accomodationDiv = document.createElement("div");
    accomodationDiv.className = "unit_of_crime";
    accomodationDiv.id = "acommodationDivID";
    document.getElementById("crimeBlockID").appendChild(accomodationDiv);
    accomodationDiv.innerHTML = "accomodation:<br>a cardboard box";


}




/// ***
/// MODAL
///***








// ***
// LOOP CALLED EVERY FRAME
// ***
function refreshLoop(timestamp) {
    updateHeaderGlobalFundamentals();
    // globalFundamentals.playerCrimesCommitted = globalFundamentals.playerCrimesCommitted + 1;


    // refresh all the timers
    checkIfTimersElapsed();
    refreshCrimeTimers();
    // and set up the refresh loop to start next repaint of the frame
    window.requestAnimationFrame(refreshLoop);
}



// ***
// START OF THE EXECUTION
// ***

function clickOnCrimeButton() {
    if (crime001_content.timedCrimeValues.state == 0) {
        setDatetimes();
        crime001_content.timedCrimeValues.state = 1;
    }
    if (crime001_content.timedCrimeValues.state == 2) {
        globalFundamentals.playerMoney += crime001_content.rewardMoney;
        globalFundamentals.playerNoto += crime001_content.rewardNoto;
        crime001_content.timedCrimeValues.state = 0;

    }

}

function setDatetimes() {
    // set time crime initiated
    crime001_content.timedCrimeValues.datetimeCrimeStarted = dayjs();
    completionMS = crime001_content.millisecondsToComplete;
    // set time the crime will be completed
    crime001_content.timedCrimeValues.datetimeCrimeWillEnd = dayjs().add(dayjs(completionMS, "millisecond"));
    // console.log("now is " + dayjs().format("DD/MM/YY HH:mm:ss"));
    // console.log("will finish at " + dayjs(crime001_content.timedCrimeValues.datetimeCrimeWillEnd).format("DD/MM/YY HH:mm:ss"));
}

createAccomodationDiv();

// make first crime and then add as a div
var crime001_content = new timedCrime('jaywalking', 10000, 0, 0, 0, 10);
var crime001_div = document.createElement("div");
// set the class for the css
crime001_div.className = "unit_of_crime";
crime001_div.id = "crime001";
// set the text inside
crime001_div.innerHTML = crime001_content.name;
document.getElementById("crimeBlockID").appendChild(crime001_div);
var crime001_button = document.createElement("button");
crime001_button.className = "unit_of_crime_button";
crime001_button.id = "crime001_button";
crime001_button.innerHTML = "commit crime<br>";
document.getElementById("crime001").appendChild(crime001_button);

document.getElementById("crime001_button").addEventListener("click", () => clickOnCrimeButton());









// set the title text, version number and made by text, from values just above
document.getElementById("titleID").innerHTML = "crime committer II<br>" + versionNumber + " " + versionCode + " <br>wfproductionsnz " + dayjs().year();
updateHeaderGlobalFundamentals();


//addBunchOfCrimeBlocks(50);




// finally, request the refresh loop is called every single frame lol
window.requestAnimationFrame(refreshLoop);