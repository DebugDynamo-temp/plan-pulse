import { fireEvent, render } from "@testing-library/react";
import Timer from "../src/components/Timer";
import { expect } from "vitest";

describe('Should display timer that counts up starting when button is pushed', () => {
    const { queryByTestId } = render(<Timer />);
    const button = queryByTestId('timer-toggle');

    it('Has a Start Timer button', () => {
        expect(button).toBeInTheDocument();
    })
    
    fireEvent.click(button);

    it('Starts timer when button is clicked', () => {
        expect(button).toHaveTextContent("Stop Timer");
    })
})