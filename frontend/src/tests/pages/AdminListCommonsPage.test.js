import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockConsole from "jest-mock-console";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import AdminListCommonPage from "main/pages/AdminListCommonPage";
import commonsPlusFixtures from "fixtures/commonsPlusFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("AdminListCommonPage tests", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "CommonsTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders three commons without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").reply(200, commonsPlusFixtures.threeCommonsPlus);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByTestId(`${testId}-cell-row-0-col-commons.id`)).toHaveTextContent("1");
        expect(screen.getByTestId(`${testId}-cell-row-1-col-commons.id`)).toHaveTextContent("2");
        expect(screen.getByTestId(`${testId}-cell-row-2-col-commons.id`)).toHaveTextContent("3");
    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").timeout();

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        restoreConsole();

        expect(screen.queryByTestId(`${testId}-cell-row-0-col-commons.id`)).not.toBeInTheDocument();
    });

    test("what happens when you click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").reply(200, commonsPlusFixtures.threeCommonsPlus);
        axiosMock.onDelete("/api/commons", {params: {id: 1}}).reply(200, "Commons with id 1 was deleted");

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByTestId(`${testId}-cell-row-0-col-commons.id`)).toBeInTheDocument();
        expect(screen.getByTestId(`${testId}-cell-row-0-col-commons.id`)).toHaveTextContent("1"); 

        const deleteButton2 = screen.getByTestId(`${testId}-cell-row-2-col-Delete-button`);
        expect(deleteButton2).toBeInTheDocument();
        expect(document.body).not.toContainElement(screen.queryByTestId(`delete-modal`));

        fireEvent.click(deleteButton2);

        expect(await screen.findByTestId(`delete-modal`)).toBeInTheDocument();
        expect(document.body).toContainElement(screen.queryByTestId(`delete-modal`));
        const cancelButton = screen.getByTestId(`cancel-delete-button`);

        fireEvent.click(cancelButton);
        
        await waitFor(() => { expect(document.body).not.toContainElement(screen.queryByTestId(`delete-modal`)) });
        const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
       
        fireEvent.click(deleteButton);

        expect(await screen.findByTestId(`delete-modal`)).toBeInTheDocument();
        expect(document.body).toContainElement(screen.queryByTestId(`delete-modal`));
        const confirmDeleteButton = screen.getByTestId(`confirm-delete-button`);

        fireEvent.click(confirmDeleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("Commons with id 1 was deleted") });
    });

    test("what happens when you click edit as an admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").reply(200, commonsPlusFixtures.threeCommonsPlus);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByTestId(`${testId}-cell-row-0-col-commons.id`)).toHaveTextContent("1");
      
        const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/admin/editcommons/1'));
    });

    test("what happens when you click leaderboard as an admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/commons/allplus").reply(200, commonsPlusFixtures.threeCommonsPlus);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminListCommonPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByTestId(`${testId}-cell-row-0-col-commons.id`)).toHaveTextContent("1");
      
        const leaderboardButton = screen.getByTestId(`${testId}-cell-row-0-col-Leaderboard-button`);
        expect(leaderboardButton).toBeInTheDocument();

        fireEvent.click(leaderboardButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/leaderboard/1'));
    })
});
