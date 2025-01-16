import { render, screen, fireEvent } from "@testing-library/react";
import WeatherSearch from "../Components/WeatherSearch";

describe("WeatherSearch", () => {
  it("calls onSearch with city name", () => {
    const onSearch = vi.fn();
    render(<WeatherSearch onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(screen.getByText("Get weather"));

    expect(onSearch).toHaveBeenCalledWith("London");
  });
});
