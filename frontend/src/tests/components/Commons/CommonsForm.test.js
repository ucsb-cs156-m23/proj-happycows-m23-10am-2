import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommonsForm from "main/components/Commons/CommonsForm";
import { QueryClient, QueryClientProvider } from "react-query";
import commonsFixtures from "fixtures/commonsFixtures"
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import healthUpdateStrategyListFixtures from "fixtures/healthUpdateStrategyListFixtures";
// Next line uses technique from https://www.chakshunyu.com/blog/how-to-spy-on-a-named-import-in-jest/
import * as useBackendModule from "main/utils/useBackend";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("CommonsForm tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const submitAction = jest.fn();

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction}  />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Commons Name/)).toBeInTheDocument();

    [
      /Starting Balance/,
      /Cow Price/,
      /Milk Price/,
      /Starting Date/,
      /Degradation Rate/,
      /Carrying Capacity/,
      /Show Leaderboard\?/,
      /When below capacity/,
      /When above capacity/,
      /Capacity Per User/,
      /Last Day Date/,

    ].forEach(
      (pattern) => {
        expect(screen.getByText(pattern)).toBeInTheDocument();
      }
    );
    expect(screen.getByText(/Create/)).toBeInTheDocument();
    expect(screen.getByTestId("CommonsForm-Submit-Button")).toHaveTextContent("Create");

  });


  it("has validation errors for required fields", async () => {
    const submitAction = jest.fn();
    const curr = new Date();
    const today = curr.toISOString().substring(0, 10);
    const monthFromToday = new Date(curr.setMonth(curr.getMonth() + 1)).toISOString().substring(0, 10);
    const defaultValues = {
      startingBalance: 10000,
      cowPrice: 100,
      milkPrice: 20,
      degradationRate: 0.003,
      carryingCapacity: 100,
      capacityPerUser: 10
    } 

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);


    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction} buttonLabel="Create New Commons" />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("CommonsForm-name")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CommonsForm-Submit-Button");
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId("CommonsForm-Submit-Button")).toHaveTextContent("Create New Commons");


    fireEvent.click(submitButton);
    expect(await screen.findByText(/commons name is required/i)).toBeInTheDocument();

    expect(screen.getByTestId("CommonsForm-startingBalance")).toHaveValue(defaultValues.startingBalance);
    expect(screen.getByTestId("CommonsForm-cowPrice")).toHaveValue(defaultValues.cowPrice);
    expect(screen.getByTestId("CommonsForm-milkPrice")).toHaveValue(defaultValues.milkPrice);
    expect(screen.getByTestId("CommonsForm-startingDate")).toHaveValue(today);
    expect(screen.getByTestId("CommonsForm-degradationRate")).toHaveValue(defaultValues.degradationRate);
    expect(screen.getByTestId("CommonsForm-carryingCapacity")).toHaveValue(defaultValues.carryingCapacity);
    expect(screen.getByTestId("CommonsForm-capacityPerUser")).toHaveValue(defaultValues.capacityPerUser);
    expect(screen.getByTestId("CommonsForm-lastdayDate")).toHaveValue(monthFromToday);

    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-startingDate"), { target: { value: NaN } });
    fireEvent.change(screen.getByTestId("CommonsForm-degradationRate"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-carryingCapacity"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-capacityPerUser"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-lastdayDate"), { target: { value: NaN } });

    expect(await screen.findByText('Starting Balance is required')).toBeInTheDocument();
    expect(screen.getByText('Cow price is required')).toBeInTheDocument();
    expect(screen.getByText('Milk price is required')).toBeInTheDocument();
    expect(screen.getByText('Degradation rate is required')).toBeInTheDocument();
    expect(screen.getByText('Carrying capacity is required')).toBeInTheDocument();
    expect(screen.getByText('Capacity Per User is required')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-degradationRate"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-carryingCapacity"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-capacityPerUser"), { target: { value: "-1" } });
    fireEvent.click(submitButton);

    const milkPriceInput = await screen.findByTestId('CommonsForm-milkPrice');
    expect(milkPriceInput).toBeInTheDocument();

    // check that each of the fields that has 
    // a validation error is marked as invalid
    // This helps with mutation coverage of code such as:
    //    isInvalid={!!errors.carryingCapacity}

    [
      "CommonsForm-name",
      "CommonsForm-startingBalance",
      "CommonsForm-cowPrice",
      "CommonsForm-milkPrice",
      "CommonsForm-startingDate",
      "CommonsForm-degradationRate",
      "CommonsForm-carryingCapacity",
      "CommonsForm-capacityPerUser",
      "CommonsForm-lastdayDate",
    ].forEach(
      (record) => {
        const element = screen.getByTestId(record);
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("is-invalid");
      }
    );

    // check that the other testids are present

    [
      "CommonsForm-showLeaderboard",
    ].forEach(
      (testid) => {
        const element = screen.getByTestId(testid);
        expect(element).toBeInTheDocument();
      }
    );

    expect(submitAction).not.toBeCalled();
  });


  it("has validation errors for values out of range", async () => {
    const submitAction = jest.fn();

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);


    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction} buttonLabel="Create" />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("CommonsForm-Submit-Button")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CommonsForm-Submit-Button");
    expect(submitButton).toBeInTheDocument();


    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Starting Balance must be ≥ 0.00/i);

    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Cow price must be ≥ 0.01/i);

    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Milk price must be ≥ 0.01/i);

    fireEvent.change(screen.getByTestId("CommonsForm-degradationRate"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Degradation rate must be ≥ 0.000/i);

    fireEvent.change(screen.getByTestId("CommonsForm-carryingCapacity"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Carrying Capacity must be ≥ 1/i);

    fireEvent.change(screen.getByTestId("CommonsForm-capacityPerUser"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Capacity Per User must be ≥ 1/i);


    expect(submitAction).not.toBeCalled();
  });


  it("renders correctly when an initialCommons is passed in", async () => {

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm initialCommons={commonsFixtures.threeCommons[0]} />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Id/)).toBeInTheDocument();


    expect(screen.getByTestId("CommonsForm-id")).toHaveValue(`${commonsFixtures.threeCommons[0].id}`);
    expect(screen.getByTestId("CommonsForm-name")).toHaveValue(commonsFixtures.threeCommons[0].name);
    expect(screen.getByTestId("CommonsForm-startingBalance")).toHaveValue(commonsFixtures.threeCommons[0].startingBalance);
    expect(screen.getByTestId("CommonsForm-cowPrice")).toHaveValue(commonsFixtures.threeCommons[0].cowPrice);

    expect(screen.getByTestId("aboveCapacityHealthUpdateStrategy-Noop")).toBeInTheDocument();
    expect(screen.getByTestId("belowCapacityHealthUpdateStrategy-Noop")).toBeInTheDocument();
  });

  it("renders correctly when an initialCommons is not passed in", async () => {

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/When below capacity/)).toBeInTheDocument();

    expect(screen.getByTestId("aboveCapacityHealthUpdateStrategy-Linear")).toBeInTheDocument();
    expect(screen.getByTestId("aboveCapacityHealthUpdateStrategy-Linear")).toHaveAttribute("selected");
    expect(screen.getByTestId("belowCapacityHealthUpdateStrategy-Constant")).toBeInTheDocument();
    expect(screen.getByTestId("belowCapacityHealthUpdateStrategy-Constant")).toHaveAttribute("selected");
  });

  test("the correct parameters are passed to useBackend", async () => {

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    // https://www.chakshunyu.com/blog/how-to-spy-on-a-named-import-in-jest/
    const useBackendSpy = jest.spyOn(useBackendModule, 'useBackend');

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm />
        </Router>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(useBackendSpy).toHaveBeenCalledWith(
        "/api/commons/all-health-update-strategies", {
        method: "GET",
        url: "/api/commons/all-health-update-strategies",
      },
      );
    });
  });


});
