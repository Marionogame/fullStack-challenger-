import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Ree from "../index";
import { mocks, errorMock } from "./Mock/Mock";

describe("Ree Component", () => {
  test("should render without crashing", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Ree />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(`REE (Opciones)`)).toBeDefined();
    });
  });

  describe("Ree Component", () => {
    test("should render without crashing", async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Ree />
        </MockedProvider>
      );
      await waitFor(() => {
        expect(screen.getByText(`REE (Opciones)`)).toBeDefined();
      });
    });

    test("displays loading state initially", async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Ree />
        </MockedProvider>
      );
      await waitFor(() => {
        expect(screen.getByText(/Loading.../i)).toBeDefined();
      });
    });

    test("loads and displays data", async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Ree />
        </MockedProvider>
      );

      const elements = await screen.findAllByText(/REE \(Opciones\)/i);
      expect(elements).toHaveLength(3);
    });

    test("shows error message when query fails", async () => {
      render(
        <MockedProvider mocks={errorMock} addTypename={false}>
          <Ree />
        </MockedProvider>
      );

      const errorMessage = await screen.findByText(/Error occurred/i);
      expect(errorMessage).toBeDefined();
    });

    test("renders fallback UI when no data is available", async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <Ree />
        </MockedProvider>
      );

      const alertElement = await screen.findByRole("alert");
      expect(alertElement.textContent).toMatch(/Error occurred/i);
    });
  });
});
