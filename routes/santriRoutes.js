const express = require("express");
const router = express.Router();
const {
    getSantri,
    getSantriById,
    getSantriByMentor,
    setSantri,
    updateSantri,
    deleteSantri
} = require("../controllers/santriController");

router.route("/").get(getSantri).post(setSantri);
router.route("/:id").put(updateSantri).delete(deleteSantri).get(getSantriById);
router.route("/mentor/:mentor").get(getSantriByMentor);

module.exports = router