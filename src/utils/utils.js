import { toast } from "react-toastify";
import { api } from "../service/api";

const today = new Date();

export const getMonth = (month = today.getMonth()) => {
  const year = today.getFullYear();
  const firstDayOfTheMonth = new Date(year, month, 1).getDay();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  return new Array(5).fill([]).map(() =>
    new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return new Date(year, month, currentMonthCount);
    })
  );
};

const toastMessageDefaults = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const notifySuccess = (message) => {
  toast.success(message, { ...toastMessageDefaults });
};

export const notifyError = (message) => {
  toast.error(message, { ...toastMessageDefaults });
};

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};

export const colors = ["purple", "gray", "green", "red", "blue", "pink"];

export const handleWeatherFetch = async (city) =>
  api.get("weather", {
    params: {
      appid: process.env.REACT_APP_API_KEY,
      unit: "metric",
      q: city,
    },
  });
