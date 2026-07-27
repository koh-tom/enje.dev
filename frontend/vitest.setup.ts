import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// server-only はテストでは無効化する
vi.mock("server-only", () => ({}));
