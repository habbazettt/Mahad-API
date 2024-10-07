const asyncHandler = require('express-async-handler')
const Santri = require('../models/santriModel')
const Mentor = require('../models/mentorModel')
const Setoran = require('../models/setoranModel')

// @desc Get all santri
// @route GET /api/santri
// @access Public
const getSantri = asyncHandler(async (req, res) => {
    const santri = await Santri.find({})

    if (!santri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    res.status(200).json({
        message: 'Get all santri',
        data: santri
    })
})

// @desc Get santri by id
// @route GET /api/santri/:id
// @access Public
//* params : id
const getSantriById = asyncHandler(async (req, res) => {
    const santri = await Santri.findById(req.params.id)

    if (!santri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    res.status(200).json({
        message: 'Get santri by id',
        data: santri
    })
})

// @desc get Santri by Mentor
// @route GET /api/santri/mentor/:mentor
// @access Public
//* params : mentor
const getSantriByMentor = asyncHandler(async (req, res) => {
    const santri = await Santri.find({ mentorName: req.params.mentor })

    if (!santri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    res.status(200).json({
        message: 'Get santri by mentor',
        data: santri
    })
})

// @desc Create new santri
// @route POST /api/santri
// @access Private
//* body: mentorId, name, jurusan 
const setSantri = asyncHandler(async (req, res) => {
    if (!req.body || !Array.isArray(req.body)) {
        res.status(400)
        throw new Error('Please add an array of santri field')
    }

    const santriList = req.body
    const santriData = []

    for (const santri of santriList) {
        const mentor = await Mentor.findById(santri.mentorId)
        if (!mentor) {
            res.status(400)
            throw new Error(`Mentor not found for santri: ${santri.name}`)
        }

        const newSantri = await Santri.create({
            mentorId: mentor._id,
            mentorName: mentor.name,
            name: santri.name,
        })

        santriData.push(newSantri)

        const updatedMentor = await Mentor.findByIdAndUpdate(mentor._id, {
            $push: {
                santri: newSantri.name
            }
        }, {
            new: true
        })

        if (!updatedMentor) {
            res.status(400)
            throw new Error(`Mentor not found for santri: ${santri.name}`)
        }
    }

    res.status(200).json({
        message: 'Create santri',
        data: santriData
    })
})

// @desc Update santri
// @route PUT /api/santri/:id
// @access Private
//* params: id
//* body: mentorId, name, jurusan
const updateSantri = asyncHandler(async (req, res) => {
    const santri = await Santri.findById(req.params.id)

    if (!santri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    const updatedSantri = await Santri.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    const updatedMentor = await Mentor.findByIdAndUpdate(santri.mentorId, {
        $set: {
            'santri.$[elem]': updatedSantri.name
        }
    }, {
        arrayFilters: [{ 'elem.name': santri.name }],
        new: true
    })

    if (!updatedMentor) {
        res.status(400)
        throw new Error('Mentor not found')
    }

    res.status(200).json({
        message: 'Update santri',
        data: updatedSantri
    })
})

// @desc Delete santri
// @route DELETE /api/santri/:id
// @access Private
//* params: id
const deleteSantri = asyncHandler(async (req, res) => {
    const santri = await Santri.findByIdAndDelete(req.params.id)

    if (!santri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(santri.mentorId, {
        $pull: {
            'santri': santri.name
        }
    }, {
        new: true
    })

    const updatedSetoran = await Setoran.deleteMany({
        'santriName': santri.name
    })

    if (!updatedMentor) {
        res.status(400)
        throw new Error('Mentor not found')
    }

    if (!updatedSetoran) {
        res.status(400)
        throw new Error('Setoran not found')
    }

    res.status(200).json({
        message: 'Delete santri',
        data: {
            id: req.params.id,
            name: santri.name
        }
    })
})


module.exports = {
    getSantri,
    getSantriById,
    getSantriByMentor,
    setSantri,
    updateSantri,
    deleteSantri
}