import logo from "../../assets/jobsity_logo_small.png";
import { Button } from "../Button/Button";
import { ButtonIcon } from "../Button/ButtonIcon";
import { ReactComponent as LeftArrowIcon } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrawIcon } from "../../assets/arrow-right.svg";
import { CalendarContext } from "../../hooks/calendarContext";
import { useContext } from "react";

export const Header = () => {
  const { monthIndex, setMonthIndex } = useContext(CalendarContext);
  const handleMonthChange = (operation) => {
    let currentIndex = operation === "-" ? monthIndex - 1 : monthIndex + 1;

    setMonthIndex(currentIndex);
  };

  const handleCurrentMonth = () => {
    setMonthIndex(new Date().getMonth());
  };

  return (
    <header className="header">
      <div className="header__row">
        <img src={logo} alt="Jobsity Logo" />
        <h1>Jobsity Calendar</h1>
      </div>
      <div className="header__row">
        <Button
          onClick={handleCurrentMonth}
          type="submit"
          transparent="transparent"
        >
          Today
        </Button>

        <ButtonIcon
          onClick={() => handleMonthChange("-")}
          Icon={LeftArrowIcon}
          className="btn--arrow-icon"
        />
        <ButtonIcon
          onClick={() => handleMonthChange("+")}
          Icon={RightArrawIcon}
          className="btn--arrow-icon"
        />
      </div>
      <h2>
        {new Date(new Date().getFullYear(), monthIndex).toLocaleDateString(
          "default",
          { month: "long", year: "numeric" }
        )}
      </h2>
    </header>
  );
};
