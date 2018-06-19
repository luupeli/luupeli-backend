const Bodypart = require('../models/bodypart')

const initialBodyparts = [
    {
        name: 'pää'
    },
    {
        name: 'keho'
    },
    {
        name: 'eturaaja'
    },
    {
        name: 'takaraaja'
    }
]

const formatBodypart = (bodypart) => {
    return {
        id: bodypart._id,
        name: bodypart.name
    }
}

const bodypartsInDb = async () => {
    const bodyparts = await Bodypart.find({})
    return bodyparts.map(formatBodypart)
}

module.exports = {
    initialBodyparts, formatBodypart, bodypartsInDb
  }