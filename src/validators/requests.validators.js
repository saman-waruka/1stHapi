const Joi = require('@hapi/joi');
const idValidate = Joi.object({
    id: Joi.string().length(24).hex()
})
const permanentDeleteQuery = Joi.object({
    permanent: Joi.boolean()
})

const nameLastnameVaidate = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().required()
})

module.exports = {
    idValidate,
    permanentDeleteQuery,
    nameLastnameVaidate
}