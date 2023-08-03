"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Publishers", [
            {
                name: "ScienceDaily",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "The New York Times",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "National Geographic",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Publishers", null, {});
    },
};
