const mongoose = require('mongoose')

// Database schema for image
const imageSchema = new mongoose.Schema({
    difficulty: String,
    url: String,
    bone: { type: mongoose.Schema.Types.ObjectId, ref: 'bone' }
})

// Formats image from the database to be used in the app
imageSchema.statics.format = (image) => {
    return {
        id: image._id,
        difficulty: image.difficulty,
        url: image.url,
        //add animal here
        //and url-lite
        //and think how to do left/right, copyrights, info
        bone: image.bone
    }
}

const image = mongoose.model('image', imageSchema)

module.exports = image