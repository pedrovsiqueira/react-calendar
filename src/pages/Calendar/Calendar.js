import { useContext, useEffect, useState } from "react";
import { ButtonIcon } from "../../components/Button/ButtonIcon";
import { Header } from "../../components/Header/Header";
import { Modal } from "../../components/Modal/Modal";
import { Month } from "../../components/Month/Month";
import { CalendarContext } from "../../hooks/calendarContext";
import { getMonth } from "../../utils/utils";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { Form } from "../../components/Form/Form";

export const Calendar = () => {
  const {
    monthIndex,
    triggerFormModal,
    setTriggerFormModal,
    setSelectedEvent,
  } = useContext(CalendarContext);
  const [month, setMonth] = useState(getMonth());

  useEffect(() => {
    setMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handleClose = () => {
    setTriggerFormModal(!triggerFormModal);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar">
      <Header />

      <div className="calendar__content">
        <Month month={month} />
        <Modal isOpen={triggerFormModal} className="react__modal__content">
          <ButtonIcon
            onClick={handleClose}
            Icon={CloseIcon}
            className="btn--close-modal"
          />
          <Form />
        </Modal>
      </div>
    </div>
  );
};
