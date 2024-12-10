import { render, fireEvent, getByLabelText, getByRole, screen } from "@testing-library/react";
import { login } from "../src/services/auth";
import { expect } from "vitest";

describe('Login testing', () => {
    it("Attempts login with correctly formatted data", async () => {
        vi.mock('../src/services/auth', { spy: true });

        const result = await login('username', 'password');
        expect(result).toHaveProperty('success');
        expect(result.success).to.eql(false);
    });
})