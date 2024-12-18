import { fireEvent, render, screen } from "@testing-library/react";
import Board from "../src/components/Board";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";
import { UserProvider } from "../src/contexts/User";

describe('Should display tasks assigned to that board sorted by status', () => {
    const boardProp = {
        title: "Group 2", 
        type: "PUBLIC",
        creatorId: "0",
        collaboratorIds: [1, 2, 3],
    }
    const { container, queryByTestId } = render(
        <BrowserRouter>
            <UserProvider>
                <Board board={boardProp} />
            </UserProvider>
        </BrowserRouter>
    );
    const button = queryByTestId('create-task');

    it('Has four status blocks', () => {
        const td = container.querySelector(".to_do");
        const ip = container.querySelector(".in_progress");
        const ir = container.querySelector(".in_review");
        const d = container.querySelector(".done");
        expect(td).toBeInTheDocument();
        expect(ip).toBeInTheDocument();
        expect(ir).toBeInTheDocument();
        expect(d).toBeInTheDocument();
    })
})