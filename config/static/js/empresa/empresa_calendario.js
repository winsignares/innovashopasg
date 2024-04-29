// Function to get the number of days in a month
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Function to generate calendar days
function generateCalendarDays(month, year) {
    var daysContainer = document.getElementById("days");
    daysContainer.innerHTML = '';

    // Get the day of the week the first day of the month falls on
    var firstDayOfWeek = new Date(year, month, 1).getDay();

    // Add placeholders for the days before the first day of the month
    for (var i = 0; i < firstDayOfWeek; i++) {
        var placeholderDiv = document.createElement("div");
        placeholderDiv.classList.add("placeholder");
        daysContainer.appendChild(placeholderDiv);
    }

    // Get the number of days in the month
    var numDays = getDaysInMonth(month, year);

    // Loop through each day of the month and create a div element for each day
    for (var i = 1; i <= numDays; i++) {
        var dayDiv = document.createElement("div");
        dayDiv.textContent = i;
        daysContainer.appendChild(dayDiv);
    }
}

// Function to update the calendar display
function updateCalendar(month, year) {
    // Set the month and year in the heading
    document.getElementById("month-year").textContent = monthNames[month] + " " + year;

    // Generate calendar days
    generateCalendarDays(month, year);
}

// Get the current date
var currentDate = new Date();

// Initialize the current month and year
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

// Array of month names
var monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

// Update the calendar display with the current month and year
updateCalendar(currentMonth, currentYear);

// Event listener for the previous month button
document.getElementById("prevMonth").addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
});

// Event listener for the next month button
document.getElementById("nextMonth").addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
});