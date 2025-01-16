import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

vi.mock("fetch");

describe("WeatherApp", () => {
  it("renders search input and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
    expect(screen.getByText("Get weather")).toBeInTheDocument();
  });

  it("fetches and displays weather data", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        location: { name: "London", country: "UK" },
        current: {
          temp_c: 20,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          },
        },
      }),
    });

    render(<App />);

    const input = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(screen.getByText("Get weather"));

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
      expect(screen.getByText("Country: UK")).toBeInTheDocument();
      expect(screen.getByText("Temperature: 20°C")).toBeInTheDocument();
    });
  });

  it("displays an error message for invalid city", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: { message: "Matching location not found." },
      }),
    });

    render(<App />);

    const input = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(input, { target: { value: "InvalidCity" } });
    fireEvent.click(screen.getByText("Get weather"));

    await waitFor(() => {
      expect(
        screen.getByText("Matching location not found.")
      ).toBeInTheDocument();
    });
  });
});
