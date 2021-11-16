import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CalendarContext } from "../../hooks/calendarContext";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { colors, notifyError, notifySuccess } from "../../utils/utils";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { api } from "../../service/api";
import { Temperature } from "../Temperature/Temperature";

export const Form = () => {
  const {
    selectedDay,
    dispatchCallEvent,
    setTriggerFormModal,
    selectedEvent,
    setSelectedEvent,
    selectedColor,
    setSelectedColor,
  } = useContext(CalendarContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: selectedEvent });

  const handleFormSubmit = async (values) => {
    const id = selectedEvent ? selectedEvent.id : new Date().getTime();

    try {
      const weatherResults = await handleWeatherFetch(values.city);
      const temperature = weatherResults?.data?.main?.temp || "Unavailable";
      const weather = weatherResults?.data?.weather?.[0]?.main || "Unavailable";
      const weatherImgId =
        weatherResults?.data?.weather?.[0]?.icon || "Unavailable";

      const event = {
        ...values,
        color: selectedColor,
        id,
        weather,
        temperature,
        weatherImgId,
      };

      if (selectedEvent) {
        dispatchCallEvent({
          type: "UPDATE_EVENT",
          payload: {
            event,
          },
        });
        notifySuccess("Event updated successfully");
      } else {
        dispatchCallEvent({ type: "ADD_EVENT", payload: event });
        notifySuccess("Event saved successfully");
      }
      setSelectedColor(colors[0]);
      setTriggerFormModal(false);
    } catch (error) {
      setError("city", {
        type: "manual",
        message: error?.response?.data?.message?.toUpperCase(),
      });
      notifyError("Error fetching data from API");
    }
  };

  const handleWeatherFetch = async (city) =>
    api.get("weather", {
      params: {
        appid: process.env.REACT_APP_API_KEY,
        unit: "metric",
        q: city,
      },
    });

  const handleEventRemoval = () => {
    dispatchCallEvent({ type: "REMOVE_EVENT", payload: selectedEvent });
    notifySuccess("Event removed successfully");
    setSelectedEvent(null);
    setTriggerFormModal(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        maxLength={30}
        type="text"
        label="Event title"
        placeholder="Please fill out event title"
        error={errors.title?.message}
        {...register("title", {
          required: "Required Field",
        })}
      />

      <Input
        maxLength={250}
        type="textarea"
        label="Event description"
        placeholder="Please fill out event description"
        error={errors.description?.message}
        {...register("description", { required: "Required Field" })}
      />

      <Input
        maxLength={120}
        type="text"
        label="City"
        placeholder="Please select event city"
        error={errors.city?.message}
        {...register("city", {
          required: "Required Field",
        })}
      />

      <Input
        type="datetime-local"
        label="Date"
        initialValue={selectedDay?.toISOString().slice(0, 16)}
        placeholder="Please select event date"
        error={errors.date?.message}
        {...register("date", {
          required: "Required Field",
        })}
      />

      <ColorPicker />

      <Temperature event={selectedEvent} />

      <div className="form__footer">
        <Button
          color="red"
          disabled={!selectedEvent}
          onClick={handleEventRemoval}
        >
          Delete
        </Button>

        <Button type="submit" color="blue" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};
