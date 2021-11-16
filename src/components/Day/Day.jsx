import { useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { CalendarContext } from "../../hooks/calendarContext";
import { ButtonIcon } from "../Button/ButtonIcon";
import { Modal } from "../Modal/Modal";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { Details } from "../Details/Details";

export const Day = ({ day, rowIndex }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const [openAllEvents, setOpenAllEvents] = useState(false);

  const {
    triggerFormModal,
    setTriggerFormModal,
    setSelectedDay,
    events,
    setSelectedEvent,
  } = useContext(CalendarContext);
  const today = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    const currentEvents = events.filter((event) => {
      return event?.date?.slice(0, 10) === day?.toISOString().slice(0, 10);
    });
    setDayEvents(currentEvents);
  }, [day, events]);

  useEffect(() => {
    if (!dayEvents.length) {
      setOpenAllEvents(false);
    }
  }, [dayEvents]);

  const getCurrentClass = () =>
    day.setHours(0, 0, 0, 0) === today ? "day__current" : null;

  const handleDayClick = () => {
    setTriggerFormModal(!triggerFormModal);
    setSelectedDay(day);
  };

  const handleAllEventsClick = (event) => {
    event.stopPropagation();
    setOpenAllEvents(!openAllEvents);
  };

  return (
    <>
      <div className="day" onClick={handleDayClick}>
        <header className="day__header">
          {rowIndex === 0 && (
            <p>
              <strong>
                {day.toLocaleString("en-us", { weekday: "short" })}
              </strong>
            </p>
          )}
          <p className={getCurrentClass()}>{day.getDate()}</p>
        </header>

        <div className="day__event__container">
          {dayEvents.slice(0, 3).map((event, index) => (
            <div
              className={`day__event__content day__event__content--${event.color}`}
              onClick={() => setSelectedEvent(event)}
              key={index}
            >
              <span>
                <p data-tip={event.title}>{event.title}</p>
                <ReactTooltip place="top" effect="solid" />
              </span>
            </div>
          ))}

          {dayEvents.length > 2 && (
            <span className="day__event__content--all">
              <p
                onClick={(event) => handleAllEventsClick(event)}
                data-tip="All events"
              >
                {dayEvents.length}
              </p>
              <ReactTooltip place="top" effect="solid" />
            </span>
          )}
        </div>
      </div>
      <Modal isOpen={openAllEvents} className="react__modal__details">
        <h1>All Events</h1>
        <ButtonIcon
          onClick={(event) => handleAllEventsClick(event)}
          Icon={CloseIcon}
          className="btn--close-modal"
        />
        {dayEvents.map((event) => (
          <Details event={event} key={event.id} />
        ))}
      </Modal>
    </>
  );
};
