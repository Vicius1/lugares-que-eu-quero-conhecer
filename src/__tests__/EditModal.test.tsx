import { render, screen, fireEvent } from "@testing-library/react";
import EditModal from "../components/EditModal";

describe("EditModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockPlace = { location: "Paris", date: "12/2025" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o modal com os valores corretos", () => {
    render(<EditModal open={true} onClose={mockOnClose} place={mockPlace} onSave={mockOnSave} />);
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Paris")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12/2025")).toBeInTheDocument();
  });

  it("deve permitir alterar os valores dos inputs", () => {
    render(<EditModal open={true} onClose={mockOnClose} place={mockPlace} onSave={mockOnSave} />);

    const locationInput = screen.getByPlaceholderText("Digite o local que deseja conhecer");
    fireEvent.change(locationInput, { target: { value: "Londres" } });
    expect(locationInput).toHaveValue("Londres");

    const dateInput = screen.getByPlaceholderText("mês/ano");
    fireEvent.change(dateInput, { target: { value: "06/2026" } });
    expect(dateInput).toHaveValue("06/2026");
  });

  it("deve chamar onSave com os valores atualizados ao clicar no botão Salvar", () => {
    render(<EditModal open={true} onClose={mockOnClose} place={mockPlace} onSave={mockOnSave} />);

    const locationInput = screen.getByPlaceholderText("Digite o local que deseja conhecer");
    fireEvent.change(locationInput, { target: { value: "Londres" } });

    const dateInput = screen.getByPlaceholderText("mês/ano");
    fireEvent.change(dateInput, { target: { value: "06/2026" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({ location: "Londres", date: "06/2026" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("deve chamar onClose ao clicar no botão de fechar", () => {
    render(<EditModal open={true} onClose={mockOnClose} place={mockPlace} onSave={mockOnSave} />);

    const closeButton = screen.getByRole("button", { name: /fechar/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
