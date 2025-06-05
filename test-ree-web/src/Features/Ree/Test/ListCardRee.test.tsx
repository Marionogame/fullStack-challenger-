import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { get } from "lodash";
import ListCardRee from "../Components/ListCardRee";

import { MocksData } from "./Mock/Mock";

let mocksData: typeof MocksData;

describe("Component ListCardRee", () => {
  beforeEach(() => {
    mocksData = [...MocksData];
  });

  test("Renders listCardRee", async () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(<ListCardRee data={[]} handleButtom={() => {}} tableValue={null} />);
    const listCard = screen.getByText(/No Data Found/i);
    expect(listCard).toBeDefined();
  });

  test("Should call handleButtom with the correct item when button is clicked list card", async () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    const handleButtomMock = vi.fn();

    render(<ListCardRee data={get(mocksData[0], "result.data.getData", [])} handleButtom={handleButtomMock} tableValue={null} />);
    const listCard = await screen.getAllByLabelText(/list-card-select/i);
    fireEvent.click(listCard[0]);

    expect(handleButtomMock).toHaveBeenCalledTimes(1);
  });
});
