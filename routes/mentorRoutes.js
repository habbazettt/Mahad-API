const express = require("express");
const router = express.Router();
const {
    getMentors,
    getMentorById,
    getMentorByGender,
    setMentor,
    updateMentor,
    deleteMentor
} = require("../controllers/mentorController");

router.route("/").get(getMentors).post(setMentor);
router.route("/:id").put(updateMentor).delete(deleteMentor).get(getMentorById);
router.route("/gender/:gender").get(getMentorByGender);

module.exports = router