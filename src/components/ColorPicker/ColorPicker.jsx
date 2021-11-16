import checkImg from "../../assets/check.svg";
import bookmarkImg from "../../assets/bookmark.svg";
import { colors } from "../../utils/utils";
import { useContext } from "react";
import { CalendarContext } from "../../hooks/calendarContext";

export const ColorPicker = ({ event }) => {
  const { setSelectedColor, selectedEvent, selectedColor } =
    useContext(CalendarContext);

  const colorConditional = selectedEvent?.color
    ? selectedEvent.color
    : selectedColor;

  return (
    <div className="color">
      <img src={bookmarkImg} alt="Bookmark Icon" />
      <span className="color__picker">
        {event ? (
          <span key={event.color} className={`color__picker--${event.color}`}>
            <img src={checkImg} alt="Check Icon" />
          </span>
        ) : (
          colors.map((color) => (
            <span
              key={color}
              className={`color__picker--${color} color__picker--pointer`}
              onClick={() => setSelectedColor(color)}
            >
              {colorConditional === color && (
                <img src={checkImg} alt="Check Icon" />
              )}
            </span>
          ))
        )}
      </span>
    </div>
  );
};
