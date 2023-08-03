"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Articles", [
            {
                title: "The Future of Artificial Intelligence in Healthcare",
                description:
                    "This article explores the transformative potential of artificial intelligence (AI) in the healthcare industry. From diagnosis to treatment and patient care, AI is poised to revolutionize healthcare practices. Discover the latest advancements and the challenges that lie ahead as AI becomes an integral part of modern medicine.",
                publisherId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "5G Technology: Revolutionizing the Mobile World",
                description:
                    "5G technology promises lightning-fast data speeds and low latency, paving the way for a new era of mobile connectivity. This article delves into the capabilities of 5G networks, the industries it will impact, and the possibilities it opens up for innovations like IoT, augmented reality, and much more.",
                publisherId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "New Discoveries in Quantum Mechanics",
                description:
                    "Quantum mechanics continues to baffle and amaze scientists with its mind-bending principles. This article takes a closer look at recent breakthroughs in quantum research, including quantum entanglement, quantum computing, and quantum teleportation, shedding light on the exciting frontiers of this field.",
                publisherId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Climate Change and Its Impact on Biodiversity",
                description:
                    "Climate change poses a significant threat to the world's biodiversity. In this article, we examine the various ways in which rising temperatures, deforestation, and habitat loss are affecting plant and animal species. We also explore conservation efforts and the role each one of us can play in preserving our planet's rich biodiversity.",
                publisherId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Articles", null, {});
    },
};
