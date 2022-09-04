const Courses = require('../models/Courses')
const router = require('express').Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', async (req, res) => {
    const newCourse = new Courses(req.body)
    try {
        const savedCourse = await newCourse.save()
        res.status(200).json(savedCourse)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await Courses.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Courses.findByIdAndDelete(req.params.id)
        res.status(200).json('course has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id)
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const courses = await Courses.find(req.body)
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router