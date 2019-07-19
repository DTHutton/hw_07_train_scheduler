$(document).ready(function () {

    // pushes user input to schedule table
    $("#submit").on("click", function (event) {
        event.preventDefault();

        let userTrain = $("#newTrainInfo").val().trim();
        let userDest = $("#newDestinationInfo").val().trim();
        let userFreq = $("#newTrainFrequency").val().trim();

        console.log(userTrain);
        console.log(userDest);
        console.log(userFreq);

        let userArrival = nextArrival();
        let userMinutes = minutesAway();

        let userInput = `
        <tr>
            <td>${userTrain}</td>
            <td>${userDest}</td>
            <td>${userFreq}</td>
            <td>${userArrival}</td>
            <td>${userMinutes}</td>
        </tr>
        `

        $("#newTrain").prepend(userInput);
    });

    //calculates next arrival
    let nextArrival = () => {

        let userTime = $("#newStartTime").val().trim();

        let userTimeVal = moment(userTime, "HHmm").format("HH:mm");

        let currentTimeVal = moment().format("HH:mm");

        console.log(userTimeVal.diff(moment(currentTimeVal, "HHmm"), "minutes"));
        

    }

    //calculates minutes away
    let minutesAway = () => {

        console.log(moment().format('LT'))

    }



});