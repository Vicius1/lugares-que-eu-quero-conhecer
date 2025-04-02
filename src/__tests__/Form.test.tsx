import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../components/Form";
import axios from "axios";

jest.mock("axios");

test("deve permitir adicionar um novo lugar", async () => {
  const mockAddPlace = jest.fn();
  
  // Mock da resposta da API
  (axios.get as jest.Mock).mockResolvedValue({
    data: [{ name: "France", flags: { png: "https://flagcdn.com/w320/fr.png" } }],
  });

  render(<Form addPlace={mockAddPlace} />);

  // Aguarda até que "France" esteja visível na lista de opções
  await screen.findByText("France");

  // Seleciona o país "France"
  fireEvent.change(screen.getByTestId("country-select"), { target: { value: "France" } });

  // Simula o preenchimento dos outros campos
  fireEvent.change(screen.getByPlaceholderText("Digite o local que deseja conhecer"), {
    target: { value: "Paris" },
  });

  fireEvent.change(screen.getByPlaceholderText("mês/ano"), {
    target: { value: "06/2025" },
  });

  // Clica no botão de adicionar
  fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

  // Aguarda até que a função seja chamada
  await waitFor(() => expect(mockAddPlace).toHaveBeenCalledTimes(1));

  // Agora verifica os valores passados para a função
  expect(mockAddPlace).toHaveBeenCalledWith({
    country: "France",
    location: "Paris",
    date: "06/2025",
    flag: "https://flagcdn.com/w320/fr.png",
  });
});
