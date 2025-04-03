import { render, screen, fireEvent } from "@testing-library/react";
import PlaceCard from "../components/PlaceCard/PlaceCard";

const mockPlace = {
  country: "France",
  location: "Paris",
  date: "06/2025",
  flag: "https://flagcdn.com/w320/fr.png",
};

describe("PlaceCard Component", () => {
  test("renderiza corretamente os dados do local", () => {
    render(<PlaceCard {...mockPlace} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText("FRANCE")).toBeInTheDocument();
    expect(screen.getByText("Local: Paris")).toBeInTheDocument();
    expect(screen.getByText("Meta: 06/2025")).toBeInTheDocument();
    expect(screen.getByAltText("Bandeira de France")).toHaveAttribute("src", mockPlace.flag);
  });

  test("chama onDelete corretamente quando botão de excluir é clicado", () => {
    const mockOnDelete = jest.fn();
    render(<PlaceCard {...mockPlace} onEdit={jest.fn()} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByTestId("CloseIcon");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test("abre o modal ao clicar no botão de editar", () => {
    render(<PlaceCard {...mockPlace} onEdit={jest.fn()} onDelete={jest.fn()} />);

    const editButton = screen.getByTestId("EditIcon");
    fireEvent.click(editButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
