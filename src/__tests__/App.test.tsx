import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "../App";

jest.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o logo e o formulário", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: [] });

    render(<App />);

    const logo = await screen.findByAltText("Lugares que quero conhecer");
    expect(logo).toBeInTheDocument();

    const formElement = screen.getByTestId("place-form");
    expect(formElement).toBeInTheDocument();
  });

  it("deve carregar e exibir os lugares da API", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: [
        { id: 1, name: "Paris", country: "France" },
        { id: 2, name: "Tóquio", country: "Japan" }
      ]
    });

    render(<App />);

    expect(await screen.findByText("Paris")).toBeInTheDocument();
    expect(await screen.findByText("Tóquio")).toBeInTheDocument();
  });
});
