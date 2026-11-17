
const subjects = [
    "Subject 1",
    "Subject 2",
    "Subject 3",
    "Subject 4",
    "Subject 5",
    "Subject 6"
];

// Generate subject input fields
const subjectTable = document.getElementById("subjectTable");

subjects.forEach((subject, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>
            <input type="text"
                id="name${index}"
                value="${subject}">
        </td>
        <td>
            <input type="number"
                id="marks${index}"
                min="0"
                max="100"
                placeholder="0 - 100"
                required>
        </td>
    `;

    subjectTable.appendChild(row);
});


// Grade calculation function
function getGrade(marks) {

    if (marks < 50) return "F";
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";

    return "D";
}


// Calculate student result
function calculateResult() {

    const studentName =
        document.getElementById("studentName").value.trim();

    const rollNumber =
        document.getElementById("rollNumber").value.trim();

    const department =
        document.getElementById("department").value.trim();

    const semester =
        document.getElementById("semester").value;

    // Validate student name
    const namePattern = /^[\p{L}\s.'-]+$/u;

    if (!namePattern.test(studentName)) {
    alert("Student name must contain only letters!");
    return;
}

    if (!studentName || !rollNumber || !department || !semester) {
        alert("Please enter all student details.");
        return;
    }

    let total = 0;
    let failed = false;
    let resultHTML = "";

    for (let i = 0; i < 6; i++) {

        const nameInput = document.getElementById("name" + i);
        const marksInput = document.getElementById("marks" + i);

        const name = nameInput.value.trim();
        const value = marksInput.value;

        if (!name || value === "") {
            alert("Please enter all subject names and marks.");
            return;
        }

        const marks = Number(value);

        if (!Number.isFinite(marks) || marks < 0 || marks > 100) {
            alert("Marks must be between 0 and 100.");
            return;
        }

        total += marks;

        const grade = getGrade(marks);
        const status = marks >= 50 ? "PASS" : "FAIL";

        if (marks < 50) {
            failed = true;
        }

        resultHTML += `
            <tr>
                <td>${name}</td>
                <td>${marks}</td>
                <td>${grade}</td>
                <td class="${status === "PASS" ? "pass" : "fail"}">
                    ${status}
                </td>
            </tr>
        `;
    }

    const percentage = total / 6;

    const overallGrade = failed ? "F" : getGrade(percentage);

    const finalStatus = failed ? "FAIL" : "PASS";

    // Display student details
    document.getElementById("displayName").textContent = studentName;
    document.getElementById("displayRoll").textContent = rollNumber;
    document.getElementById("displayDept").textContent = department;
    document.getElementById("displaySemester").textContent = semester;

    // Display total and percentage
    document.getElementById("total").textContent =
        total + " / 600";

    document.getElementById("percentage").textContent =
        percentage.toFixed(2) + "%";

    document.getElementById("grade").textContent = overallGrade;

    const statusElement = document.getElementById("status");

    statusElement.textContent = finalStatus;
    statusElement.className = failed ? "fail" : "pass";

    // Display subject results
    document.getElementById("resultTable").innerHTML = resultHTML;

    // Performance remarks
    let remarks;

    if (failed) {
        remarks = "You have failed in one or more subjects. Work harder and improve your performance.";
    }
    else if (percentage >= 90) {
        remarks = "Outstanding performance! Keep up the excellent work.";
    }
    else if (percentage >= 80) {
        remarks = "Excellent performance. Keep improving!";
    }
    else if (percentage >= 70) {
        remarks = "Very good performance. You are doing well.";
    }
    else if (percentage >= 60) {
        remarks = "Good performance. Continue working hard.";
    }
    else {
        remarks = "You passed! Focus on improving your marks.";
    }

    document.getElementById("remarks").textContent = remarks;

    // Show result dashboard
    document.getElementById("result").style.display = "block";

    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });
}


// Reset calculator
function resetForm() {

    document.getElementById("studentName").value = "";
    document.getElementById("rollNumber").value = "";
    document.getElementById("department").value = "";
    document.getElementById("semester").value = "";

    for (let i = 0; i < 6; i++) {
        document.getElementById("name" + i).value =
            "Subject " + (i + 1);

        document.getElementById("marks" + i).value = "";
    }

    document.getElementById("result").style.display = "none";

}
