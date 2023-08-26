const commonsFixtures = {
    threeCommons: [
        {
            "id": 5,
            "name": "Seths Common",
            "day": 5,
            "startingDate": "2022-03-05T15:50:10",
            "lastdayDate": "2022-04-05T15:50:10",
            "startingBalance": 1200.10,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 105,
            "effectiveCapacity": 5250,
            "belowCapacityHealthUpdateStrategy": "Noop",
            "aboveCapacityHealthUpdateStrategy": "Noop"
        },
        {
            "id": 4,
            "name": "Kevin's Commons",
            "day": 5,
            "startingDate": "2012-03-05T15:50:10",
            "lastdayDate": "2012-04-05T15:50:10",
            "startingBalance": 100.50,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 123,
            "capacityPerUser": 110,
            "effectiveCapacity": 5500,
            "belowCapacityHealthUpdateStrategy": "Linear",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 1,
            "name": "Anika's Commons",
            "day": 5,
            "startingDate": "2026-03-05T15:50:10",
            "lastdayDate": "2026-04-05T15:50:10",
            "startingBalance": 200.50,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 42,
            "capacityPerUser": 115,
            "effectiveCapacity": 5750,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        }
    ],
    oneCommons: [
        {
            "id": 1,
            "name": "Anika's Commons",
            "day": 5,
            "startingDate": "2025-03-05T15:50:10",
            "lastdayDate": "2025-04-05T15:50:10",
            "startingBalance": 2000.50,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 314,
            "capacityPerUser": 120,
            "effectiveCapacity": 6000,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        }
    ],
    sevenCommons: [
        {
            "id": 10,
            "name": "Seths Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 125,
            "effectiveCapacity": 6250,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 8,
            "name": "Kevin's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 130,
            "effectiveCapacity": 6500,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 6,
            "name": "Anika's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 135,
            "effectiveCapacity": 6750,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 5,
            "name": "Evan's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 140,
            "effectiveCapacity": 7000,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 4,
            "name": "Joshua's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 145,
            "effectiveCapacity": 7250,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 3,
            "name": "Danny's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 150,
            "effectiveCapacity": 7500,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 2,
            "name": "Jackson's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "carryingCapacity": 100,
            "capacityPerUser": 155,
            "effectiveCapacity": 7750,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        }
    ],
}

export default commonsFixtures;