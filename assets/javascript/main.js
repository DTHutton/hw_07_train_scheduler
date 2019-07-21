$(document).ready(function () {

    // pushes user input to schedule table
    $("#submit").on("click", function (event) {
        event.preventDefault();

        //variables
        const userTrain = $("#newTrainInfo").val().trim();
        const userDest = $("#newDestinationInfo").val().trim();
        const userFreq = $("#newTrainFrequency").val().trim();
        const userTime = $("#newStartTime").val().trim();

        //math
        const userTimeConvert = moment(userTime, "HH:mm").subtract(1, "years");
        const userTimeDiff = moment().diff(moment(userTimeConvert), "minutes");
        const timeApart = userTimeDiff % userFreq;
        const timeUntilTrain = userFreq - timeApart;
        const nextTrain = moment().add(timeUntilTrain, "minutes");
        const nextTrainVal = moment(nextTrain).format("hh:mm");

        //template string
        const userInput = `
        <tr>
            <td>${userTrain}</td>
            <td>${userDest}</td>
            <td>${userFreq}</td>
            <td>${nextTrainVal}</td>
            <td>${timeUntilTrain}</td>
        </tr>
        `
        $("#newTrain").prepend(userInput);
    });

});