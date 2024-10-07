const asyncHandler = require('express-async-handler')
const Mentor = require('../models/mentorModel')

// @desc Get all mentors
// @route GET /api/mentors
// @access Public
const getMentors = asyncHandler(async (req, res) => {
    const mentors = await Mentor.find({})

    res.status(200).json({
        message: 'Get all mentors',
        data: mentors
    })
})

// @desc Get mentor by id
// @route GET /api/mentors/:id
// @access Public
//* params : id 
const getMentorById = asyncHandler(async (req, res) => {
    const mentor = await Mentor.findById(req.params.id)

    if (!mentor) {
        res.status(400)
        throw new Error('Mentor not found')
    }

    res.status(200).json({
        message: 'Get mentor by id',
        data: mentor
    })
})

// @desc Get Mentor by gender
// @route GET /api/mentors/gender/:gender
// @access Public
//* params : gender
const getMentorByGender = asyncHandler(async (req, res) => {
    const mentor = await Mentor.find({ gender: req.params.gender })

    if (!mentor) {
        res.status(400)
        throw new Error('Mentor not found')
    }

    res.status(200).json({
        message: 'Get mentor by gender',
        data: mentor
    })
})

// @desc Create new mentor
// @route POST /api/mentors
// @access Private
//* body: name
const setMentor = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name')
    }

    const mentor = await Mentor.create({
        name: req.body.name,
        gender: req.body.gender,
        santri: []
    })

    res.status(200).json({
        message: 'Create new mentor',
        data: {
            id: mentor._id,
            name: mentor.name,
            gender: mentor.gender,
            santri: mentor.santri
        }
    })
})

// @desc Update mentor
// @route PUT /api/mentors/:id
// @access Private
//* params: id
//* body: name
const updateMentor = asyncHandler(async (req, res) => {
    const mentor = await Mentor.findById(req.params.id)

    if (!mentor) {
        res.status(400)
        throw new Error('Mentor not found')
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({
        message: 'Update mentor',
        data: updatedMentor
    })
})

// @desc Delete mentor
// @route DELETE /api/mentors/:id
// @access Private
//* params: id
const deleteMentor = asyncHandler(async (req, res) => {
    const mentor = await Mentor.findByIdAndDelete(req.params.id)

    if (!mentor) {
        res.status(400)
        throw new Error('Mentor not found')
    }

    const updatedSantri = await Santri.deleteMany({
        'mentorName': mentor.name
    })

    res.status(200).json({
        message: 'Delete mentor',
        data: {
            id: mentor._id,
            name: mentor.name
        }
    })
})


module.exports = {
    getMentors,
    getMentorById,
    getMentorByGender,
    setMentor,
    updateMentor,
    deleteMentor
}