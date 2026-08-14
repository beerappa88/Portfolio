import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

const renderApp = () =>
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );

describe("App", () => {
  it("renders the main landmark", () => {
    renderApp();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders every section heading", () => {
    renderApp();
    ["About me", "Education Details", "Technologies Stack", "Top Recent Projects", "Work Experience"].forEach(
      (heading) => {
        expect(
          screen.getByRole("heading", { name: new RegExp(heading, "i") })
        ).toBeInTheDocument();
      }
    );
  });

  it("exposes a keyboard-reachable theme toggle", () => {
    renderApp();
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });
});
