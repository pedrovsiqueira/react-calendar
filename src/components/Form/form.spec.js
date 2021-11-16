import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import { ContextProvider } from "../../hooks/calendarContext";
import { Form } from "./Form";

jest.mock("../../utils/utils", () => ({
  ...jest.requireActual("../../utils/utils"),
  handleWeatherFetch: () => ({
    data: {
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04n",
        },
      ],
      main: {
        temp: 294.98,
        feels_like: 295.39,
        temp_min: 294.5,
        temp_max: 294.98,
        pressure: 1016,
        humidity: 83,
      },
    },
  }),
}));

const FormComponent = ({ children }) => (
  <ContextProvider>
    {children}
    <ToastContainer />
  </ContextProvider>
);

test("Should render Home without crashing", () => {
  render(<Form />, { wrapper: FormComponent });
});

test("Should throw an error if title is over 30 chars", async () => {
  render(<Form />, { wrapper: FormComponent });
  const title = screen.getByLabelText("Event title");

  userEvent.type(title, "x".repeat(40));
  expect(title.value).toHaveLength(30);
});

test("Should render a form with correct data", async () => {
  render(<Form />, { wrapper: FormComponent });
  const title = screen.getByLabelText("Event title");
  const description = screen.getByLabelText("Event description");
  const city = screen.getByLabelText("City");
  const date = screen.getByLabelText("Date");

  userEvent.type(title, "Test title");
  userEvent.type(description, "Test description");
  userEvent.type(city, "Goiânia");
  fireEvent.change(date, {
    target: { value: new Date().toISOString().slice(0, 16) },
  });

  const submit = screen.getByRole("button", { name: "Save" });
  userEvent.click(submit);

  expect(await screen.findByRole("alert")).toHaveTextContent(/saved/i);
});
