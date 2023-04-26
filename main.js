// WELCOME TO THE CODE OF CRIME COMMITTER II


// ***
// GLOBALS
// ***
var versionNumber = "v0.2.2";
var versionCode = "many crimes";


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
var globalFundamentals = new structOfGlobalFundamentals(0, 0, 0);

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
    this.timedCrimeButton = document.createElement("button");

}




// ***
// FUNCTIONS
// ***

// ***
// THESE ARE FUNCTIONS THAT GET LOOPED THRU

// update the header where it shows basic numbers like $$ and crime
// to do: convert notoriety into a word like petty criminal etc
// to do: make money and crimes committed some of those things that handles big numbers
function updateHeaderGlobalFundamentals() {
    var newHeaderGlobalFundamentalsHTML = globalFundamentals.playerCrimesCommitted.toLocaleString("en-US") + " crimes committed" +
        "<br>$" + globalFundamentals.playerMoney.toLocaleString("en-US") +
        "<br>" + globalFundamentals.playerNoto + " notoriety"
    document.getElementById("headerGlobalFundamentals").innerHTML = newHeaderGlobalFundamentalsHTML;
    addPanelsIfEligible();
}


// this simply changes what is on the comms panel
// titleText can be left blank
function updateCommsPanel(titleText, bodyText) {
    var newCommsInnerHTML = "";
    if (titleText != "") {
        newCommsInnerHTML += "<h2>" + titleText + "</h2>";
    }
    newCommsInnerHTML += "<br>" + bodyText;
    document.getElementById("commsBlockID").innerHTML = newCommsInnerHTML;
}

//this function just changes what text is on timers
// it doesnt test them to see if time has paseds
function refreshCrimeTimers(timedCrimeIndex) {
    switch (setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state) {
        case 0:
            setOfTimedCrimes[timedCrimeIndex].timedCrimeButton.innerHTML = "commit crime";
            break;
        case 1:
            var formattedTime = "";
            var timeUntilComplete = dayjs.duration(dayjs(setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.datetimeCrimeWillEnd).diff(dayjs()));
            timeUntilComplete.seconds = timeUntilComplete.format("ss");
            setOfTimedCrimes[timedCrimeIndex].timedCrimeButton.innerHTML = "time until complete<br>" +
                timeUntilComplete.seconds + " s";
            break;
        case 2:
            setOfTimedCrimes[timedCrimeIndex].timedCrimeButton.innerHTML = "crime committed";
            break;
        case 3:
            setOfTimedCrimes[timedCrimeIndex].timedCrimeButton.innerHTML = "locked";
    }

}


// just tests to see if the time on the timer has already passed
function checkIfTimersElapsed(timedCrimeIndex) {
    if (setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state == 1) {
        if (dayjs().isAfter(setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.datetimeCrimeWillEnd)) {
            setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state = 2;
            if (autoCrimeState == true) {

                globalFundamentals.playerMoney += setOfTimedCrimes[timedCrimeIndex].rewardMoney;
                globalFundamentals.playerNoto += setOfTimedCrimes[timedCrimeIndex].rewardNoto;
                globalFundamentals.playerCrimesCommitted += 1;

                setDatetimes(timedCrimeIndex);
                setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state = 1;
            }
        }
    }
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
    for (var cyclerIndex = 0; cyclerIndex < 2; cyclerIndex++) {
        checkIfTimersElapsed(cyclerIndex);
        refreshCrimeTimers(cyclerIndex);
    }
    // and set up the refresh loop to start next repaint of the frame
    window.requestAnimationFrame(refreshLoop);
}




function clickOnCrimeButton(timedCrimeIndex) {
    if (setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state == 0) {
        setDatetimes(timedCrimeIndex);
        setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state = 1;
    }
    if (setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state == 2) {
        globalFundamentals.playerMoney += setOfTimedCrimes[timedCrimeIndex].rewardMoney;
        globalFundamentals.playerNoto += setOfTimedCrimes[timedCrimeIndex].rewardNoto;
        globalFundamentals.playerCrimesCommitted += 1;

        setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.state = 0;
        updateCommsPanel("update", "you got<br><br>" + setOfTimedCrimes[timedCrimeIndex].rewardMoney + " money<br><br>" + setOfTimedCrimes[timedCrimeIndex].rewardNoto + " notoriety")

    }

}

function setDatetimes(timedCrimeIndex) {
    // set time crime initiated
    setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.datetimeCrimeStarted = dayjs();
    completionMS = setOfTimedCrimes[timedCrimeIndex].millisecondsToComplete;
    // set time the crime will be completed
    setOfTimedCrimes[timedCrimeIndex].timedCrimeValues.datetimeCrimeWillEnd = dayjs().add(dayjs(completionMS, "millisecond"));
    // console.log("now is " + dayjs().format("DD/MM/YY HH:mm:ss"));
    // console.log("will finish at " + dayjs(crime001_content.timedCrimeValues.datetimeCrimeWillEnd).format("DD/MM/YY HH:mm:ss"));
}

function addPanelsIfEligible() {
    if (globalFundamentals.playerNoto > 5 && panelsAvailable_autocrime == false) {
        panelsAvailable_autocrime = true;
        createAutoCrimePanel();
    }
}

// this should be called once to create a div for housing
// just ran once at start
function createAccomodationDiv() {
    var accomodationDiv = document.createElement("div");
    accomodationDiv.className = "unit_of_crime";
    accomodationDiv.id = "acommodationDivID";
    document.getElementById("crimeBlockID").appendChild(accomodationDiv);
    accomodationDiv.innerHTML = "accomodation:";
    var accomodationButton = createInfoButton("a cardboard box", "this is your home. it isn't much but.. well it's inexpensive");
    accomodationButton.id = "accomodationButtonID";
    accomodationDiv.appendChild(accomodationButton);
}

function createAutoCrimePanel() {
    var autoCrimeDiv = createCrimeDiv("friendship", "you have made a friend uwu<br><br>your friend is a passionate criminal,<br>" +
        "and if you want, they can encourage you to recommit crimes once you've finished them");
    var autoCrimeButton = document.createElement("button");
    autoCrimeButton.className = "unit_of_crime_button";
    autoCrimeButton.id = "autoCrimeButtonID";
    autoCrimeButton.addEventListener("click", () => toggleAutoCrimeButton());
    autoCrimeDiv.appendChild(autoCrimeButton);
    document.getElementById("autoCrimeButtonID").innerHTML = "autocrime is OFF";
}

function toggleAutoCrimeButton() {
    if (autoCrimeState == true) {
        autoCrimeState = false;
        document.getElementById("autoCrimeButtonID").innerHTML = "autocrime is OFF";
    } else {
        autoCrimeState = true;
        document.getElementById("autoCrimeButtonID").innerHTML = "autocrime is ON";

    }
}


function createCrimeDiv(titleOfDiv, textDisplayedInComms) {
    var newDiv = document.createElement("div");
    newDiv.className = "unit_of_crime";
    newDiv.id = titleOfDiv + "DivID";
    document.getElementById("crimeBlockID").appendChild(newDiv);
    newDiv.appendChild(createInfoButton(titleOfDiv, textDisplayedInComms));
    return newDiv;
}

function createInfoButton(textInButton, textDisplayedInComms) {
    var newInfoButton = document.createElement("button");
    newInfoButton.innerHTML = textInButton;
    newInfoButton.className = "unit_of_crime_info";
    newInfoButton.addEventListener("click", () => updateCommsPanel(textInButton, textDisplayedInComms));
    return newInfoButton;
}

function createTimedCrimeButton(timedCrimeIndex) {
    var newTimeCrimeButton = document.createElement("button");
    newTimeCrimeButton.className = "unit_of_crime_button";
    newTimeCrimeButton.addEventListener("click", () => clickOnCrimeButton(timedCrimeIndex))
    return newTimeCrimeButton;
}


function panelCreateMinorCrimes() {
    // make minor crimes panel
    var minorCrimesDiv = createCrimeDiv("MINOR CRIMES", "these crimes, they don't really matter, it's impossible for them to hurt people");

    minorCrimesDiv.appendChild(createInfoButton("jaywalking", "the lamest of crimes"));
    setOfTimedCrimes.push(new timedCrime("jaywalking", 5000, 0, 0, 0, 5));
    setOfTimedCrimes[0].timedCrimeButton = createTimedCrimeButton(0);
    minorCrimesDiv.appendChild(setOfTimedCrimes[0].timedCrimeButton);

    minorCrimesDiv.appendChild(createInfoButton("loitering", "the shamest of crimes"));
    setOfTimedCrimes.push(new timedCrime("loitering", 10000, 0, 0, 0, 20));
    setOfTimedCrimes[1].timedCrimeButton = createTimedCrimeButton(1);
    minorCrimesDiv.appendChild(setOfTimedCrimes[1].timedCrimeButton);
}

function panelCreateMiniCrimes() {
    var minorCrimesDiv = createCrimeDiv("MINI CRIMES", "small crimes<br>but still meaningingful<br>a life of crime may be peppered with the salt that is mini crimes<br><br>these crimes are the spice of life");


}

// ***
// START OF THE EXECUTION
// ***

// createAutoCrimePanel();
createAccomodationDiv();
updateCommsPanel("", "this is a game");

// init all the panels to off
var panelsAvailable_autocrime = false;


var setOfTimedCrimes = [];
panelCreateMinorCrimes();
panelCreateMiniCrimes();
var autoCrimeState = false;




// set the title text, version number and made by text, from values just above
updateHeaderGlobalFundamentals();

document.getElementById("titleID").innerHTML = "";
var crimeCommitterLogoButton = document.createElement("button");
crimeCommitterLogoButton.className = "main_title";
crimeCommitterLogoButton.innerHTML = "crime committer II<br>" + versionNumber + " " + versionCode + " <br>wfproductionsnz " + dayjs().year()
document.getElementById("titleID").appendChild(crimeCommitterLogoButton);
document.getElementById("titleID").addEventListener("click", () => updateCommsPanel("crime committer ][",
    "welcome to the game<br><br>" +
    "click on things to execute crimes<br><br>I really hope you enjoy"));


//addBunchOfCrimeBlocks(50);




// finally, request the refresh loop is called every single frame lol
window.requestAnimationFrame(refreshLoop);