const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function leapchecker(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}

function ageCalculate() {
  let today = new Date();
  let input = document.getElementById("date-input").value;

  if (!input) {
    alert("Select birth date and then click on calculate");
    return;
  }

  let inputDate = new Date(input);

  let birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear()
  };

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();

  // Prevent future DOBs
  if (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear && birthDetails.month > currentMonth) ||
    (birthDetails.year === currentYear && birthDetails.month === currentMonth && birthDetails.date > currentDate)
  ) {
    alert("Not yet born!");
    displayResult("-", "-", "-");
    return;
  }

  leapchecker(currentYear);

  let years = currentYear - birthDetails.year;
  let monthsDiff, daysDiff;

  if (currentMonth >= birthDetails.month) {
    monthsDiff = currentMonth - birthDetails.month;
  } else {
    years--;
    monthsDiff = 12 + currentMonth - birthDetails.month;
  }

  if (currentDate >= birthDetails.date) {
    daysDiff = currentDate - birthDetails.date;
  } else {
    monthsDiff--;
    let prevMonth = currentMonth - 2 < 0 ? 11 : currentMonth - 2;
    let daysInPrevMonth = months[prevMonth];
    daysDiff = daysInPrevMonth + currentDate - birthDetails.date;
    if (monthsDiff < 0) {
      monthsDiff = 11;
      years--;
    }
  }

  displayResult(daysDiff, monthsDiff, years);
}

function displayResult(days, months, years) {
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
}