import { render, screen } from "@testing-library/react";
import WeatherCard from "../Components/WeatherCard";

describe("WeatherCard", () => {
  it("displays weather information", () => {
    const weather = {
      location: { name: "London", country: "UK" },
      current: {
        temp_c: 15,
        condition: {
          text: "Cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        },
      },
    };

    render(<WeatherCard weather={weather} onClear={vi.fn()} />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Country: UK")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 15°C")).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
  });
});
