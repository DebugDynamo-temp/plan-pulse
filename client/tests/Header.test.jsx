import { render, fireEvent, screen, queryByRole } from "@testing-library/react";
import Header from "../src/components/Header";
import { UserProvider } from "../src/components/User";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";

describe('Should open a menu with options to edit your profile or logout', () => {
    const { container, queryByTestId, queryByRole } = render(
        <BrowserRouter>
            <UserProvider>
                <Header />
            </UserProvider>
        </BrowserRouter>
    );
    const button = queryByTestId("icon-button");
    const menu = queryByRole("menu");

    it('Has an icon button to toggle menu', () => {
        expect(button).toBeInTheDocument();
        expect(menu).not.exist;
    })
})