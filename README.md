# luupeli-backend
[![Build Status](https://travis-ci.org/luupeli/luupeli-backend.svg?branch=master)](https://travis-ci.org/luupeli/luupeli-backend)

HUOM: Tämä on alkuperäinen backendin repository eikä ole ajantasalla. Backend yhdistettiin 25.8. samaan repositoryyn frontendin kanssa.

### Endpoints

`http://luupeli-backend.herokuapp.com/api`

Path | Method | Description
-----|------|------------
`/bones/` | GET | Returns an array of all bones.
`/bones/` | POST | Creates a new bone.
`/bones/:boneId` | GET | Gets a specific bone.
`/bones/:boneId` | PUT | Edits a Latin name and name. Images cannot be edited, because images add and delete by own methods.
`/bones/:boneId` | DELETE | Removes a specific bone and all images which are connected with it.
`/images/` | GET | Returns an array of all images.
`/images/` | POST | Creates a new image.
`/images/:imageId` | GET | Gets a specific image.
`/images/:imageId` | PUT | Edits difficulty. The bone and url cannot be edited.
`/images/:imageId` | DELETE | Removes a specific image and removes connect if the image is connected with bone.
`/animals/` | GET | Returns an array of all animals.
`/animals/` | POST | Creates a new animal.
`/bodyparts/` | GET | Returns an array of all body parts.
`/bodyparts/` | POST | Creates a new body part.

