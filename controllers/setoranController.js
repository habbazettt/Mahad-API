const asyncHandler = require('express-async-handler')
const Setoran = require('../models/setoranModel')
const Santri = require('../models/santriModel')
const { getHalaman } = require('../utils/helper')

// @desc Get setoran by kategori
// @route GET /api/setoran/kategori/:kategori
// @access Public
//* params : kategori
const getSetoranByKategori = asyncHandler(async (req, res) => {
    const setoran = await Setoran.find({ kategori: req.params.kategori })

    res.status(200).json({
        message: 'Get setoran by kategori',
        data: setoran
    })
})

// @desc Get setoran by juz
// @route GET /api/setoran/juz/:juz
// @access Public
//* params : juz
const getSetoranByJuz = asyncHandler(async (req, res) => {
    const setoran = await Setoran.find({ juz: req.params.juz })

    res.status(200).json({
        message: 'Get setoran by juz',
        data: setoran
    })
})

// @desc Get all setoran
// @route GET /api/setoran
// @access Public
const getSetoran = asyncHandler(async (req, res) => {
    const setoran = await Setoran.find({})

    res.status(200).json({
        message: 'Get all setoran',
        data: setoran
    })
})

// @desc Get setoran by santriId
// @route GET /api/setoran/:id
// @access Public
//* params : id
const getSetoranById = asyncHandler(async (req, res) => {
    const setoran = await Setoran.findById(req.params.id)

    res.status(200).json({
        message: 'Get setoran by id',
        data: setoran
    })
})

// @desc Create setoran
// @route POST /api/setoran
// @access Private
//* body : santriId, kategori, juz, halaman
const setSetoran = asyncHandler(async (req, res) => {
    const santri = await Santri.findById(req.body.santriId)

    if (!santri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    const setoran = await Setoran.create({
        santriId: req.body.santriId,
        santriName: santri.name,
        kategori: req.body.kategori,
        juz: req.body.juz,
        halaman: req.body.halaman,
        total: getHalaman(req.body.halaman).length,
    })

    const updatedSantri = await Santri.findByIdAndUpdate(santri._id, {
        $push: {
            setoran: {
                kategori: setoran.kategori,
                juz: setoran.juz,
                halaman: setoran.halaman,
                total: setoran.total
            },
        },
    }, {
        new: true
    })

    if (!updatedSantri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    res.status(200).json({
        message: 'Create setoran',
        data: setoran
    })
})

// @desc Update setoran
// @route PUT /api/setoran/:id
// @access Private
//* params : id
const updateSetoran = asyncHandler(async (req, res) => {
    const setoran = await Setoran.findById(req.params.id)

    if (!setoran) {
        res.status(400)
        throw new Error('Setoran not found')
    }

    const updatedSetoran = await Setoran.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    if (!updatedSetoran) {
        res.status(400)
        throw new Error('Setoran not found')
    }

    const updatedSantri = await Santri.findByIdAndUpdate(setoran.santriId, {
        $set: {
            'setoran.$[elem]._id': updatedSetoran._id,
            'setoran.$[elem].kategori': updatedSetoran.kategori,
            'setoran.$[elem].juz': updatedSetoran.juz,
            'setoran.$[elem].total': updatedSetoran.total,
        }
    }, {
        arrayFilters: [{ 'elem.kategori': setoran.kategori }],
        new: true
    })

    if (!updatedSantri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    res.status(200).json({
        message: 'Update setoran',
        data: updatedSetoran
    })
})

// @desc Delete setoran
// @route DELETE /api/setoran/:id
// @access Private
//* params : id
const deleteSetoran = asyncHandler(async (req, res) => {
    const setoran = await Setoran.findByIdAndDelete(req.params.id)

    if (!setoran) {
        res.status(400)
        throw new Error('Setoran not found')
    }

    const updatedSantri = await Santri.findByIdAndUpdate(setoran.santriId, {
        $pull: {
            'setoran': {
                kategori: setoran.kategori
            }
        }
    }, {
        new: true
    })

    if (!updatedSantri) {
        res.status(400)
        throw new Error('Santri not found')
    }

    res.status(200).json({
        message: 'Delete setoran',
        data: setoran
    })
})



module.exports = {
    getSetoran,
    getSetoranById,
    getSetoranByKategori,
    getSetoranByJuz,
    updateSetoran,
    setSetoran,
    deleteSetoran
}