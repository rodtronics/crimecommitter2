// WELCOME TO THE CODE OF CRIME COMMITTER II


// ***
// GLOBALS
// ***
var versionNumber = "v0.1.1";
var versionCode = "fashion crimes";


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
var globalFundamentals = new structOfGlobalFundamentals(500000, 0, 0);


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








// ***
// LOOP CALLED EVERY FRAME
// ***
function refreshLoop(timestamp) {
    updateHeaderGlobalFundamentals();
    globalFundamentals.playerCrimesCommitted = globalFundamentals.playerCrimesCommitted + 1;


    // and set up the refresh loop to start next repaint of the frame
    window.requestAnimationFrame(refreshLoop);
}



// ***
// START OF THE EXECUTION
// ***


// set the title text, version number and made by text, from values just above
document.getElementById("titleID").innerHTML = "crime committer II<br>" + versionNumber + " " + versionCode + " <br>wfproductionsnz " + dayjs().year();
updateHeaderGlobalFundamentals();





// finally, request the refresh loop is called every single frame lol
window.requestAnimationFrame(refreshLoop);