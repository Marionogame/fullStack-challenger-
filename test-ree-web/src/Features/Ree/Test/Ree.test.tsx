import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Ree from "../index";

import { MocksData, errorMock } from "./Mock/Mock";

let mocksData: typeof MocksData;

describe("Ree Main Page", () => {
  beforeEach(() => {
    mocksData = [...MocksData];
  });

  test("Should render with data", async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(`REE (Opciones)`)).toBeDefined();
    });
  });

  test("Should render without data", async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(`No Data Found`)).toBeDefined();
    });
  });

  test("Displays loading state initially", async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeDefined();
    });
  });

  test("Shows error message when query fails", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Ree />
      </MockedProvider>
    );

    const errorMessage = await screen.findByText(/Ups, ha ocurrido un error en nuestros servicios./i);
    expect(errorMessage).toBeDefined();
  });
  test("Renders mobile view correctly", async () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );

    const pieChart = await screen.queryByText(/PieChart/i);
    expect(pieChart).toBeDefined();
  });
  test("The screen resize", async () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  test("Renders desktop view correctly", async () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));

    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );

    const barChart = await screen.queryByText(/Bar Chart/i);
    expect(barChart).toBeDefined();
  });

  test("HandleButton click correctly", async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );
    const dataTable = await screen.findAllByRole("button", { name: /Seleccionar/i });
    fireEvent.click(dataTable[1]);
    const buttonList = await screen.getByText(/productList/i);
    expect(buttonList).toBeDefined();
  });

  test("Mobile correctly pieChartData ", async () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <Ree />
      </MockedProvider>
    );

    const button_List = await screen.getAllByLabelText(/button_List_select/i);
    fireEvent.click(button_List[1]);

    await waitFor(() => {
      expect(screen.getByText(/product/i)).toBeDefined();
    });
  });
});
