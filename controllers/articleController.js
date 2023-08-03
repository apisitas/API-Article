const db = require("../models");
const Article = db.Article;
const Publisher = db.Publisher;
const fs = require("fs");
const HelperFunctions = require("../Helpers/helperFunctions");
const asyncHandler = require("express-async-handler");

const listAll = asyncHandler(async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = HelperFunctions.getPagination(page, size);
    const query = await Article.findAndCountAll({
        include: [
            {
                model: Publisher,
                as: "publisher",
            },
        ],
        limit,
        offset,
        order: [["id", "DESC"]],
    });
    const response = HelperFunctions.getPagingData(query, page, limit);
    return res.status(200).json({ success: response });
});

const show = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const queryCheckArticle = await Article.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: Publisher,
                as: "publisher",
            },
        ],
    });
    if (!queryCheckArticle) {
        return res
            .status(404)
            .json({ error: "Not found this Article in system" });
    }
    await Article.update(
        { totalView: (queryCheckArticle.totalView += 1) },
        {
            where: {
                id: id,
            },
        }
    );
    return res.status(200).json({ success: queryCheckArticle });
});

const create = asyncHandler(async (req, res) => {
    if (!req.body.description) {
        return res.status(400).json({
            error: "Please add description field",
        });
    }
    if (!req.body.title) {
        return res.status(400).json({
            error: "Please add title field",
        });
    }

    if (!req.body.publisherId) {
        return res.status(400).json({
            error: "Please add publisherId field",
        });
    }

    if (!req.file) {
        return res.status(400).json({
            error: "Please add cover field",
        });
    }

    const queryCheckPublisher = await Publisher.findOne({
        where: {
            id: req.body.publisherId,
        },
    });
    if (!queryCheckPublisher) {
        return res
            .status(404)
            .json({ error: "Not found this Publisher in system" });
    }

    const queryCreated = await Article.create({
        title: req.body.title,
        description: req.body.description,
        publisherId: req.body.publisherId,
        cover: `uploads/${req.cover}`, // Use the extracted file name without the extension
    });

    if (queryCreated[0] === 0) {
        return res.status(404).json({ error: "Article create failed" });
    }
    return res.status(200).json({ success: "Article created was a success" });
});

const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, publisherId } = req.body;
    const queryCheckArticle = await Article.findOne({
        where: {
            id: id,
        },
    });
    if (!queryCheckArticle) {
        return res
            .status(404)
            .json({ error: "Not found this Article in system" });
    }

    const queryCheckPublisher = await Publisher.findOne({
        where: {
            id: publisherId,
        },
    });
    if (!queryCheckPublisher) {
        return res
            .status(404)
            .json({ error: "Not found this Publisher in system" });
    }

    if (req.cover) {
        if (queryCheckArticle.cover) {
            fs.unlinkSync(`public/${queryCheckArticle.cover}`);
        }
        req.body.cover = `uploads/${req.cover}`;
    }

    const [updatedRows] = await Article.update(req.body, {
        where: { id },
    });

    if (updatedRows === 0) {
        return res
            .status(404)
            .json({ error: "Article not found or update failed" });
    }
    return res.status(200).json({ success: "Article updated was a success" });
});

const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const queryCheckArticle = await Article.findOne({
        where: {
            id: id,
        },
    });
    if (!queryCheckArticle) {
        return res
            .status(404)
            .json({ error: "Not found this Article in system" });
    }
    const deletedRows = await Article.destroy({
        where: { id },
    });
    if (deletedRows === 0) {
        return res
            .status(404)
            .json({ error: "Article not found or remove failed" });
    }
    if (queryCheckArticle.cover) {
        fs.unlinkSync(`public/${queryCheckArticle.cover}`);
    }
    res.status(200).json({
        success: "Remove Article was a success",
    });
});

module.exports = {
    listAll,
    show,
    create,
    update,
    remove,
};
