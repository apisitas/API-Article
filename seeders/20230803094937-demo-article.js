"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                title: "Ea exercitation est deserunt officia amet laborum et cillum",
                description:
                    "Consectetur non anim irure nulla aliqua sunt occaecat nulla dolor culpa nulla aliqua.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
