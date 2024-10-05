const express = require("express");
const router = express.Router();
const {
    getSetoran,
    getSetoranById,
    getSetoranByKategori,
    getSetoranByJuz,
    setSetoran,
    updateSetoran,
    deleteSetoran
} = require("../controllers/setoranController");

router.route("/").get(getSetoran).post(setSetoran);
router.route("/:id").get(getSetoranById).put(updateSetoran).delete(deleteSetoran);
router.route("/kategori/:kategori").get(getSetoranByKategori);
router.route("/juz/:juz").get(getSetoranByJuz);


module.exports = router;