import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonListRee from "../Components/ButtonListRee";

describe("Component ButtonListRee", () => {
  test("Should call handleChart with the correct item when button is clicked ButtonListRee", async () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    const handleButtomMock = vi.fn();
    const mocksDataButtonList = [{ id: "1", title: "Energy", attributes: [{ color: "red", total: 2343, type: "Total" }] }];
    render(<ButtonListRee chartValue={null} data={mocksDataButtonList} handleChart={handleButtomMock} />);
    const button_List = await screen.getAllByLabelText(/button_List_select/i);
    fireEvent.click(button_List[0]);

    expect(handleButtomMock).toHaveBeenCalledTimes(1);
  });
});
