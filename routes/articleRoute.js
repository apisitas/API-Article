const express = require("express");
const router = express.Router();
const path = require("path");
const {
    listAll,
    create,
    update,
    remove,
} = require("../controllers/articleController");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
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
router.post("/", (req, res, next) => {
    upload.single("cover")(req, res, (err) => {
        if (err) {
            return res.status(err.status).json({ error: err.message });
        }
        create(req, res); // Call the create controller function here after successful file upload
    });
});
router.put("/:id", upload.single("cover"), update); // Use the same upload middleware for update route

router.route("/:id").delete(remove);

module.exports = router;
