import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock do AuthContext para evitar chamadas de API no mount
jest.mock("./context/AuthContext", () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  }),
}));

test("renderiza App sem crashar", () => {
  render(<App />);
  expect(document.body).toBeTruthy();
});
