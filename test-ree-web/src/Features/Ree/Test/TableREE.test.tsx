import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { get } from "lodash";
import { cleanup } from "@testing-library/react";
import TableRee from "../Components/TableRee";
import { MocksData } from "./Mock/Mock";
import { IRee } from "../../../Interface/ree";

describe("Component TableRee", () => {
  let data: IRee[] = [];
  beforeEach(() => {
    data = get(MocksData[0], "result.data.getData", []);
    cleanup();
  });

  test("TableRee should render with data", () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={data[0]} />);
    const firstItem = screen.getByText(/User profile information/i);
    expect(firstItem).toBeDefined();
  });
  test("TableRee should render without data", () => {
    render(<TableRee data={[]} handleButtom={() => {}} tableValue={null} />);
    const listCard = screen.getByText(/No Data Found/i);
    expect(listCard).toBeDefined();
  });
  test("TableRee handles button filter and updates table without data", async () => {
    render(<TableRee data={[]} handleButtom={() => {}} tableValue={data[0]} />);

    const button = await screen.findByRole("button", { name: /filterTable/i });

    button.click();

    await waitFor(() => {
      const empyTable = screen.getByText(/No Data Found/i);
      expect(empyTable).toBeDefined();
    });
  });
  test("TableRee handles button filter and updates table with data", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={data[0]} />);

    const button = await screen.findByRole("button", { name: /filterTable/i });
    button.click();

    await waitFor(() => {
      const dataTable = screen.findAllByRole("button", { name: /Seleccionar/i });

      expect(dataTable).toBeDefined();
    });
  });
  test("FilterByDateRange filters data correctly by date range", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={data[0]} />);
    const startDateInput = await screen.getByLabelText(/start-date/i);
    const endDateInput = await screen.getByLabelText(/end-date/i);
    const filterButton = await screen.findByRole("button", { name: /filterTable/i });

    fireEvent.change(startDateInput, { target: { value: "2024-04-05" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-15" } });
    fireEvent.click(filterButton);
    await waitFor(() => {
      const dataTable = screen.findAllByRole("button", { name: /Seleccionar/i });

      expect(dataTable).toBeDefined();
    });
  });
  test("Displays all data when no dates are provided", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={data[0]} />);

    const button = await screen.findByRole("button", { name: /filterTable/i });
    fireEvent.click(button);

    await waitFor(() => {
      const dataTable = screen.findAllByRole("button", { name: /Seleccionar/i });

      expect(dataTable).toBeDefined();
    });
  });
  test("Filters data from start date onwards when end date is empty", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={null} />);
    const startDateInput = await screen.getByLabelText(/start-date/i);
    const endDateInput = await screen.getByLabelText(/end-date/i);
    const filterButton = await screen.findByRole("button", { name: /filterTable/i });

    fireEvent.change(startDateInput, { target: { value: "2024-04-05" } });
    fireEvent.change(endDateInput, { target: { value: "" } });
    fireEvent.click(filterButton);

    await waitFor(() => {
      const dataTable = screen.findAllByRole("button", { name: /Seleccionar/i });
      expect(dataTable).toBeDefined();
    });
  });
  test("Displays empty message when no data in range", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={null} />);
    const startDateInput = screen.getByLabelText(/start-date/i);
    const endDateInput = screen.getByLabelText(/end-date/i);
    const filterButton = await screen.findByRole("button", { name: /filterTable/i });

    fireEvent.change(startDateInput, { target: { value: "2035-05-01" } });
    fireEvent.change(endDateInput, { target: { value: "2035-05-10" } });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText(/No Data Found/i)).toBeDefined();
    });
  });
  test("Does not break when data is empty or not an array", async () => {
    render(<TableRee data={[]} handleButtom={() => {}} tableValue={null} />);
    const filterButton = await screen.findByRole("button", { name: /filterTable/i });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText(/No Data Found/i)).toBeDefined();
    });
  });
  test("Handle pagination", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={null} />);
    const filterButton = await screen.getByLabelText(/page-change-2/i);
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText(/This is a sample description/i)).toBeDefined();
    });
  });
  test("Pagination forward and backward", async () => {
    render(<TableRee data={data} handleButtom={() => {}} tableValue={null} />);
    const buttonNext = await screen.getByLabelText(/page-change-next/i);
    fireEvent.click(buttonNext);
    const textIndex2 = screen.getByText(/This is a sample description/i);

    const buttonBack = await screen.getByLabelText(/page-change-back/i);
    fireEvent.click(buttonBack);
    const textIndex = screen.getByText(/User profile information/i);

    await waitFor(() => {
      expect(textIndex).toBeDefined();
      expect(textIndex2).toBeDefined();
    });
  });
  test("Should call handleButtom with the correct item when button is clicked", async () => {
    const handleButtomMock = vi.fn();
    render(<TableRee data={data} handleButtom={handleButtomMock} tableValue={null} />);

    const dataTable = await screen.findAllByRole("button", { name: /Seleccionar/i });
    fireEvent.dblClick(dataTable[0]);
    fireEvent.click(dataTable[1]);

    expect(handleButtomMock).toHaveBeenCalledTimes(2);
  });
});
