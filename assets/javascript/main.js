$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();

        let userTrain = $("#newTrainInfo").val().trim();
        let userDest = $("#newDestinationInfo").val().trim();
        let userTime = $("#newStartTime").val().trim();
        let userFreq = $("#newTrainFrequency").val().trim();

        console.log(userTrain);
        console.log(userDest);
        console.log(userTime);
        console.log(userFreq);

        let userInput = `
        <tr>
            <td>${userTrain}</td>
            <td>${userDest}</td>
            <td>${userFreq}</td>
            <td>placeholder</td>
            <td>placeholder</td>
        </tr>
        `
        $("#newTrain").prepend(userInput);
    });
});