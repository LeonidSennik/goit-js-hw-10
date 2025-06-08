import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault(); // Запобігає перезавантаженню сторінки
  
    const delay = Number(event.target.delay.value);
    const shouldResolve = event.target.state.value === "fulfilled";
  
    createPromise(delay, shouldResolve)
      .then((delay) => {
        iziToast.success({
          title: "Success",
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: "topRight",
        });
      })
      .catch((delay) => {
        iziToast.error({
          title: "Error",
          message: `❌ Rejected promise in ${delay}ms`,
          position: "topRight",
        });
      });
  });
  
  function createPromise(delay, shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }