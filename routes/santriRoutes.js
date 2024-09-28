const express = require("express");
const router = express.Router();
const {
    getSantri,
    getSantriById,
    setSantri,
    updateSantri,
    deleteSantri
} = require("../controllers/santriController");

router.route("/").get(getSantri).post(setSantri);
router.route("/:id").put(updateSantri).delete(deleteSantri).get(getSantriById);

module.exports = router