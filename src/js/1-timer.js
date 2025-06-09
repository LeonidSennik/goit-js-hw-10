
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
        iziToast.error({
          title: "Error",
          message: "Please choose a date in the future",
          position: "topRight"
        });
        
        startButton.disabled = true;
      } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
      }
    }
});
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = String(Math.floor(ms / day)).padStart(2, "0");
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, "0");
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, "0");
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, "0");

  return { days, hours, minutes, seconds };
}
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

let timerInterval;
const startButton = document.querySelector("[data-start]");
const datePicker = document.querySelector("#datetime-picker");
let userSelectedDate;
 startButton.addEventListener("click", () => {
  userSelectedDate = new Date(datePicker.value);
  if (!userSelectedDate || userSelectedDate <= new Date()) return;

  startButton.disabled = true;
  datePicker.disabled = true;

  timerInterval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimer(0, 0, 0, 0);
      datePicker.disabled = false;
      startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
});
function updateTimer(days, hours, minutes, seconds) {
    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}
iziToast.success({
    title: "Success",
    message: "Your action was successful!",
    position: "topRight"
  });
  
  iziToast.info({
    title: "Info",
    message: "Here is some information.",
    position: "topRight"
  });

