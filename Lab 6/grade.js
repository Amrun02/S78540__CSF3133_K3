function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    if (name === "") { //Error 5 (grade.js, Line 5): '=' is not a comparison operator
        alert("Name must be filled out.");
        return false;
    }
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }
    if (isNaN(mark)) { //Error 6 (grade.js, Line 9): wrong Nan spelling
        alert("Please enter a valid numeric value.");
        return false;
    }
    mark = parseInt(mark);
    if (mark < 0 || mark > 100) { //Error 7 (grade.js, Line 14): Wrong logical operator
        alert("Mark must be between 0 and 100.");
        return false;
    }
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }
    document.getElementById("result").innerHTML = name + " got grade " + grade; //Error 8 (grade.js, Line 28): Wrong method spelling
    document.getElementById("checkTime").innerHTML = "Checked on: " + Date(); //(New) Adds check time that update every click
    if (grade === "A" || grade === "B"){ //(New) Display result in colors
        document.getElementById("result").style.color = "green"; //Error 9 (grade.js, Line 29): Wrong color spelling
        document.getElementById("checkTime").style.color = "green";
    }else if (grade === "C"){
        document.getElementById("result").style.color = "orange";
        document.getElementById("checkTime").style.color = "orange";
    }else{
        document.getElementById("result").style.color = "red";
        document.getElementById("checkTime").style.color = "red";
    }
    return false; //Error 10 (grade.js, Line 30): Wrong return value
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    for (let i = 0; i < grades.length; i++) { //Error 11 (grade.js, Line 37): Skips index 0
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] +"</td></tr>";
    }
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML; //Error 12 (grade.js, Line 41): Wrong innerHtml spelling
}

//(New) Generates random marks
function randomMark() {
    let rdmMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = rdmMark;
}