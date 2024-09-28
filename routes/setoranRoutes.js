const express = require("express");
const router = express.Router();
const {
    getSetoran,
    getSetoranBySantriId,
    setSetoran,
    updateSetoran,
    deleteSetoran
} = require("../controllers/setoranController");

router.route("/").get(getSetoran).post(setSetoran);
router.route("/:id").get(getSetoranBySantriId).put(updateSetoran).delete(deleteSetoran);

module.exports = router;