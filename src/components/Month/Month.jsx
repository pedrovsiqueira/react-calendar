import { Day } from "../Day/Day";

export const Month = ({ month }) => {
  return (
    <div className="date-grid">
      {month.map((row, rowIndex) =>
        row.map((day, index) => (
          <Day day={day} key={index} rowIndex={rowIndex} />
        ))
      )}
    </div>
  );
};
