import React, { createContext, useEffect, useReducer, useState } from "react";
import { colors } from "../utils/utils";

const CalendarContext = createContext();

const eventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_EVENT":
      return [...state, payload];
    case "UPDATE_EVENT":
      return state.map((event) =>
        event.id === payload.event.id ? payload : event
      );
    case "REMOVE_EVENT":
      return state.filter((event) => event.id !== payload.id);
    default:
      return state;
  }
};

const initialEvents = () => {
  const events = localStorage.getItem("events");

  return events ? JSON.parse(events) : [];
};

const ContextProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [triggerFormModal, setTriggerFormModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    selectedEvent ? selectedEvent.color : colors[0]
  );
  const [events, dispatchCallEvent] = useReducer(
    eventsReducer,
    [],
    initialEvents
  );

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        triggerFormModal,
        setTriggerFormModal,
        selectedDay,
        setSelectedDay,
        events,
        dispatchCallEvent,
        selectedEvent,
        setSelectedEvent,
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { ContextProvider, CalendarContext };
