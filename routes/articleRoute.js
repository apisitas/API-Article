const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
    listAll,
    show,
    create,
    update,
    remove,
} = require("../controllers/articleController");

const multer = require("multer");
const uploadsDir = path.join(__dirname, "../public/uploads");
fs.access(uploadsDir, (error) => {
    if (error) {
        fs.mkdir(uploadsDir, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log(
                    "New Directory 'public/uploads' created successfully !!"
                );
            }
        });
    } else {
        // console.log("Given Directory already exists !!");
    }
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const allowedExtensions = ["png", "jpeg", "jpg", "gif"];
        const fileExtension = file.originalname.split(".").pop();

        if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
            const error = new Error(
                "Invalid file format. Only png, jpeg, jpg, and gif images are supported."
            );
            error.status = 400;
            cb(error);
        } else {
            req.cover = `${Date.now()}-${path.basename(file.originalname)}`;
            cb(null, req.cover);
        }
    },
});

const upload = multer({ storage: storage });

router.route("/").get(listAll);
router.get("/:id", show);
router.post("/", (req, res, next) => {
    upload.single("cover")(req, res, (err) => {
        if (err) {
            return res.status(err.status).json({ error: err.message });
        }
        create(req, res);
    });
});
router.put("/:id", (req, res, next) => {
    upload.single("cover")(req, res, (err) => {
        if (err) {
            return res.status(err.status).json({ error: err.message });
        }
        update(req, res);
    });
});

router.route("/:id").delete(remove);

module.exports = router;
