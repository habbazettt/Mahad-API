const express = require("express");
const router = express.Router();
const {
    getSantri,
    getSantriById,
    getSantriByJurusan,
    getSantriByMentor,
    setSantri,
    updateSantri,
    deleteSantri
} = require("../controllers/santriController");

router.route("/").get(getSantri).post(setSantri);
router.route("/:id").put(updateSantri).delete(deleteSantri).get(getSantriById);
router.route("/jurusan/:jurusan").get(getSantriByJurusan);
router.route("/mentor/:mentor").get(getSantriByMentor);

module.exports = router