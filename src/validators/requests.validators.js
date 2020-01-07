const Joi = require('@hapi/joi');
const idValidate = Joi.object({
    id: Joi.number()
})
const permanentDeleteQuery = Joi.object({
    permanent: Joi.boolean()
})


module.exports = {
    idValidate,
    permanentDeleteQuery
}