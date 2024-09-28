const express = require("express");
const router = express.Router();
const {
    getMentors,
    getMentorById,
    setMentor,
    updateMentor,
    deleteMentor
} = require("../controllers/mentorController");

router.route("/").get(getMentors).post(setMentor);
router.route("/:id").put(updateMentor).delete(deleteMentor).get(getMentorById);

module.exports = router