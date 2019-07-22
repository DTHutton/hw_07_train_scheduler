$(document).ready(function () {

    // Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBqNPntAXDbx62IPfxozuimQ1KUYZzx6Bc",
        authDomain: "hw-07-train-scheduler.firebaseapp.com",
        databaseURL: "https://hw-07-train-scheduler.firebaseio.com",
        projectId: "hw-07-train-scheduler",
        storageBucket: "",
        messagingSenderId: "646046649536",
        appId: "1:646046649536:web:1c3e6e769c40ab09"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //database reference
    const database = firebase.database();

    //inital values
    let userTrain = "";
    let userDest = "";
    let userFreq = 0;
    let userTime = "";

    // pushes user input to schedule table
    $("#submit").on("click", function (event) {
        event.preventDefault();

        //user values
        userTrain = $("#newTrainInfo").val().trim();
        userDest = $("#newDestinationInfo").val().trim();
        userFreq = $("#newTrainFrequency").val().trim();
        userTime = $("#newStartTime").val().trim();

        //push values to db
        database.ref().push({
            userTrain,
            userDest,
            userFreq,
            userTime
        });

        //math
        const userTimeConvert = moment(userTime, "HH:mm").subtract(1, "years");
        const userTimeDiff = moment().diff(moment(userTimeConvert), "minutes");
        const timeApart = userTimeDiff % userFreq;
        const timeUntilTrain = userFreq - timeApart;
        const nextTrain = moment().add(timeUntilTrain, "minutes");
        const nextTrainVal = moment(nextTrain).format("hh:mm");

        //template string
        // const userInput = `
        // <tr>
        //     <td>${userTrain}</td>
        //     <td>${userDest}</td>
        //     <td>${userFreq}</td>
        //     <td>${nextTrainVal}</td>
        //     <td>${timeUntilTrain}</td>  
        // </tr>
        // `
        // $("#newTrain").prepend(userInput);
    });

    // firebase watcher
    database.ref().on("child_added", function (snapshot) {

        // log snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().userTrain);
        console.log(snapshot.val().userDest);
        console.log(snapshot.val().userFreq);
        console.log(snapshot.val().userTime);

        // db values
        const userTrainDB = snapshot.val().userTrain;
        const userDestDB = snapshot.val().userDest;
        const userFreqDB = snapshot.val().userFreq;
        const userTimeDB = snapshot.val().userTime;

        //math
        const userTimeConvertDB = moment(userTimeDB, "HH:mm").subtract(1, "years");
        const userTimeDiffDB = moment().diff(moment(userTimeConvertDB), "minutes");
        const timeApartDB = userTimeDiffDB % userFreqDB;
        const timeUntilTrainDB = userFreqDB - timeApartDB;
        const nextTrainDB = moment().add(timeUntilTrainDB, "minutes");
        const nextTrainValDB = moment(nextTrainDB).format("hh:mm");

        const userInputDB = `
        <tr>
            <td>${userTrainDB}</td>
            <td>${userDestDB}</td>
            <td>${userFreqDB}</td>
            <td>${nextTrainValDB}</td>
            <td>${timeUntilTrainDB}</td>
        </tr>
        `
        $("#newTrain").prepend(userInputDB);

        // errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});