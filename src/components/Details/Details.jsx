import { Input } from "../Input/Input";
import { Divider } from "../Divider/Divider";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { ButtonIcon } from "../Button/ButtonIcon";
import { ReactComponent as EditIcon } from "../../assets/pencil.svg";
import { ReactComponent as RemoveIcon } from "../../assets/trash.svg";
import { CalendarContext } from "../../hooks/calendarContext";
import { useContext } from "react";
import { notifySuccess } from "../../utils/utils";

export const Details = ({ event }) => {
  const { setTriggerFormModal, setSelectedEvent, dispatchCallEvent } =
    useContext(CalendarContext);

  const handleEditEvent = () => {
    setSelectedEvent(event);
    setTriggerFormModal(true);
  };

  const handleRemoveEvent = () => {
    dispatchCallEvent({ type: "REMOVE_EVENT", payload: event });
    notifySuccess("Event removed successfully");
  };

  return (
    <div className="details">
      <Input
        disabled={true}
        value={event.title}
        type="text"
        label="Event title"
      />

      <Input
        value={event.description}
        maxLength={250}
        type="textarea"
        label="Event description"
      />

      <Input value={event.city} maxLength={120} type="text" label="City" />

      <Input value={event.date} type="datetime-local" label="Date" />

      <div className="details__group">
        <ColorPicker event={event} />

        <div className="details__group--content">
          <ButtonIcon
            onClick={(event) => handleEditEvent(event)}
            Icon={EditIcon}
            className="btn--close-modal"
          />

          <ButtonIcon
            onClick={handleRemoveEvent}
            Icon={RemoveIcon}
            className="btn--close-modal"
          />
        </div>
      </div>

      <Divider />
    </div>
  );
};
