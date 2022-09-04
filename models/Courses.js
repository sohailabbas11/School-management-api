const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        books: {
            type: Array
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Course', courseSchema)