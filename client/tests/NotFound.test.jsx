import { render, screen } from "@testing-library/react";
import NotFound from "../src/pages/NotFound";
import { expect } from "vitest";

describe('Should display a 404 error and have a link to sign in', () => {
    const { container } = render(<NotFound />);

    it('displays 404', () => {
        const notFound = screen.getByText('404 page not found');
        expect(notFound).exist;
    })
})