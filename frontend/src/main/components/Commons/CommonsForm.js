import {Button, Form, Row, Col} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useBackend} from "main/utils/useBackend";

import HealthUpdateStrategiesDropdown from "main/components/Commons/HealthStrategiesUpdateDropdown";

function CommonsForm({initialCommons, submitAction, buttonLabel = "Create"}) {
  // Stryker disable all
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm(
    {defaultValues: initialCommons || {}}
  );
  // Stryker restore all

  const {data: healthUpdateStrategies} = useBackend(
    "/api/commons/all-health-update-strategies", {
      method: "GET",
      url: "/api/commons/all-health-update-strategies",
    },
  );

  const testid = "CommonsForm";

  const curr = new Date();
  const today = curr.toISOString().substring(0, 10);

  const defaultValues = {
    startingBalance: 10000,
    cowPrice: 100,
    milkPrice: 20,
    degradationRate: 1.5,
    carryingCapacity: 100
  } 

  const belowStrategy = initialCommons?.belowCapacityStrategy || healthUpdateStrategies?.defaultBelowCapacity;
  const aboveStrategy = initialCommons?.aboveCapacityStrategy || healthUpdateStrategies?.defaultAboveCapacity;
  
  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      <Row>
      {initialCommons && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Control
            data-testid={`${testid}-id`}
            id="id"
            type="text"
            {...register("id")}
            value={initialCommons.id}
            disabled
          />
        </Form.Group>
      )}
      </Row>

      <Row>
      <Col xs={6} md={4}>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="name">Commons Name</Form.Label>
        <Form.Control
          data-testid={`${testid}-name`}
          id="name"
          type="text"
          isInvalid={!!errors.name}
          {...register("name", {required: "Commons name is required"})}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>

      <Col xs={6} md={4}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="startingBalance">Starting Balance</Form.Label>
        <Form.Control
          id="startingBalance"
          data-testid={`${testid}-startingBalance`}
          type="number"
          step="0.01"
          defaultValue={defaultValues.startingBalance}
          isInvalid={!!errors.startingBalance}
          {...register("startingBalance", {
            valueAsNumber: true,
            required: "Starting Balance is required",
            min: {value: 0.00, message: "Starting Balance must be ≥ 0.00"},
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.startingBalance?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
      </Row>

      <Row>
      <Col xs={6} md={4}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="milkPrice">Milk Price</Form.Label>
        <Form.Control
          data-testid={`${testid}-milkPrice`}
          id="milkPrice"
          type="number"
          step="0.01"
          defaultValue={defaultValues.milkPrice}
          isInvalid={!!errors.milkPrice}
          {...register("milkPrice", {
            valueAsNumber: true,
            required: "Milk price is required",
            min: {value: 0.01, message: "Milk price must be ≥ 0.01"},
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.milkPrice?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>

      <Col xs={6} md={4}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="cowPrice">Cow Price</Form.Label>
        <Form.Control
          data-testid={`${testid}-cowPrice`}
          id="cowPrice"
          type="number"
          step="0.01"
          defaultValue={defaultValues.cowPrice}
          isInvalid={!!errors.cowPrice}
          {...register("cowPrice", {
            valueAsNumber: true,
            required: "Cow price is required",
            min: {value: 0.01, message: "Cow price must be ≥ 0.01"},
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.cowPrice?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
      </Row>

      <Row>
      <Col xs={6} md={4}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="degradationRate">Degradation Rate</Form.Label>
        <Form.Control
          data-testid={`${testid}-degradationRate`}
          id="degradationRate"
          type="number"
          step="0.001"
          defaultValue={defaultValues.degradationRate}
          isInvalid={!!errors.degradationRate}
          {...register("degradationRate", {
            valueAsNumber: true,
            required: "Degradation rate is required",
            min: {value: 0.000, message: "Degradation rate must be ≥ 0.000"},
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.degradationRate?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>

      <Col xs={6} md={4}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="carryingCapacity">Carrying Capacity</Form.Label>
        <Form.Control
          data-testid={`${testid}-carryingCapacity`}
          id="carryingCapacity"
          type="number"
          step="1"
          defaultValue={defaultValues.carryingCapacity}
          isInvalid={!!errors.carryingCapacity}
          {...register("carryingCapacity", {
            valueAsNumber: true,
            required: "Carrying capacity is required",
            min: {value: 1, message: "Carrying Capacity must be ≥ 1"},
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.carryingCapacity?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
      </Row>
      
      <Row>
      <Col xs={6} md={4}>
      <Form.Group className="mb-3">  
        <Form.Label htmlFor="startingDate">Starting Date</Form.Label>
        <Form.Control
          data-testid={`${testid}-startingDate`}
          id="startingDate"
          type="date"
          defaultValue={today}
          isInvalid={!!errors.startingDate}
          {...register("startingDate", {
            valueAsDate: true,
            validate: {
              isPresent: (v) => !isNaN(v) 
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.startingDate?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
      </Row>

      <Row>
      <Col>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="capacityPerUser">Capacity Per User</Form.Label>
        <Form.Control
          data-testid={`${testid}-capacityPerUser`}
          id="capacityPerUser"
          type="number"
          step="1"
          isInvalid={!!errors.capacityPerUser}
          {...register("capacityPerUser", {
            valueAsNumber: true,
            required: "Capacity Per User is required",
            min: {value: 1, message: "Capacity Per User must be ≥ 1"},
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.capacityPerUser?.message}
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
      </Row>
          
      <h4>
        Health update formula
      </h4>
      <Row>
        <Col xs={12} md={8}>
      <HealthUpdateStrategiesDropdown
        formName={"aboveCapacityHealthUpdateStrategy"}
        displayName={"When above capacity"}
        initialValue={ aboveStrategy }
        register={register}
        healthUpdateStrategies={healthUpdateStrategies}
      />
      </Col>
      </Row>
      <Row>
      <Col xs={12} md={8}>
      <HealthUpdateStrategiesDropdown
        formName={"belowCapacityHealthUpdateStrategy"}
        displayName={"When below capacity"}
        initialValue={ belowStrategy }
        register={register}
        healthUpdateStrategies={healthUpdateStrategies}
      />
      </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="showLeaderboard">Show Leaderboard?</Form.Label>
        <Form.Check
          data-testid={`${testid}-showLeaderboard`}
          type="checkbox"
          id="showLeaderboard"
          {...register("showLeaderboard")}
        />
      </Form.Group>

      <Button type="submit" data-testid="CommonsForm-Submit-Button">{buttonLabel}</Button>
    </Form>
  );
}

export default CommonsForm;
