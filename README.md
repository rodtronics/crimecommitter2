# crimecommitter2
 
attempty the second

this document serves as a place for me to write out my ideas and the plan

first crime thing is a countdown timer like I've had in the past
struct for each timed_crime
 // state refers to where the crime is at
    // 0 = ready to run
    // 1 = running
    // 2 = completed but haven't collected resources
    // 3 = unavailable (need more noto)
    this.state = state;
    this.numberTimesCommitted = numberTimesCommitted;
    this.datetimeCrimeWillEnd = datetimeCrimeWillEnd;
    this.datetimeCrimeStarted = datetimeCrimeStarted;



and a house module