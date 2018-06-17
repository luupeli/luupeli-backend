const imagesRouter = require('express').Router()
const Image = require('../models/image')
const Bone = require('../models/bone')
const multer = require('multer')

// Saves images to server
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    limits:{fileSize: 5000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(file.originalname.toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images only!')
    }
}

// Finds all images from database after GET-request and returns in JSON
imagesRouter.get('/', async (request, response) => {
    const images = await Image
        .find({})
        .populate('bone', { name: 1, nameLatin: 1, bodypart: 1, animal: 1 })
    console.log('operation returned images ', images)
    response.json(images.map(Image.format))
})

// Finds and returns one image in JSON
imagesRouter.get('/:id', async (request, response) => {
    try {
        const image = await Image
            .findById(request.params.id)
            .populate('bone', { name: 1, nameLatin: 1, bodypart: 1, animal: 1 })
        if (image) {
            response.json(Image.format(image))
        } else {
            response.status(404).end()
        }
    } catch (err) {
        console.log(err)
        response.status(404).send({ error: 'malformatted id' })
    }
})

// Saves image to folder /images/ and return image url
imagesRouter.post('/upload', (request, response) => {
    upload(request, response, (err => {
        if (err) {
            response.status(400).json({ error: err })
        } else {
            console.log(request)
            response.json({ url: '/images/' + request.file.name})
        }
    }))
})

// Creates a image from given request and saves it to the database
imagesRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.difficulty === undefined) {
            return response.status(400).json({ error: 'difficulty missing' })
        }

        if (body.url === undefined) {
            return response.status(400).json({ error: 'url missing' })
        }

        const image = new Image({
            difficulty: body.difficulty,
            url: body.url,
            bone: body.bone
        })
        const savedImage = await image.save()

        // Connect image and bone if bone is given
        if (body.bone !== undefined) {
            const bone = await Bone.findById(body.bone)
            bone.images = bone.images.concat(savedImage._id)
            await bone.save()
        }

        response.json(Image.format(image))
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Finds one image by id and deletes it from database. Also removes bone-image connection.
imagesRouter.delete('/:id', async (request, response) => {
    try {
        const image = await Image.findById(request.params.id)
        const bone = await Bone.findById(image.bone._id)

        bone.images = bone.images.filter(i => new String(i._id).valueOf() !== new String(image._id).valueOf())

        await Image.remove(image)
        await bone.save()

        response.status(204).end()
    } catch (err) {
        console.log(err)
        response.status(400).send({ error: 'malformatted id' })
    }
})

// Method does not allow bone and url changing because it's not necessary?
imagesRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        const oldImage = await Image.findById(request.params.id)

        const image = {
            difficulty: body.difficulty,
            url: oldImage.url,
            bone: oldImage.bone
        }

        const updatedImage = await Image.findByIdAndUpdate(request.params.id, image, { new: true })

        response.json(Image.format(updatedImage))
    } catch (err) {
        console.log(err)
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = imagesRouter
