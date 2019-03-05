const Joi = require('joi');


const joiValidationForCreateHero = (req) => {

    // !Instead of we validating the request body - weather particular property is there, data-type of a
    // ! property is correct, We can use Joi for validating our  http reqest body matches our mongooses schema
    const idealSchemaForHeroModel = Joi.object().keys({
        heroName: Joi.string().required(),
        heroHeight: Joi.number().integer().required(),
        heroType: Joi.boolean().required(),
        canFly: Joi.boolean().required(),
        fanFollowing: Joi.number(),
        superPowers: Joi.array().optional(),
        fightsWon: Joi.number().optional()
    });

    // !JOI is mainly used to validate our schema
    // !Below JOi is validation our Idealschema with the request body send by frontend (instead we
    // !writing each validation logic manually)

    const result = Joi.validate(req.body, idealSchemaForHeroModel);

    // const {
    //     error,
    //     value
    // } = Joi.validate(req.body, idealSchemaForHeroModel);

    return result
};


const joiValidationForUpdateHero = (req) => {
    // !Instead of we validating the request body - weather particular property is there, data-type of a
    // ! property is correct, We can use Joi for validating our  http reqest body matches our mongooses schema
    const idealSchemaForHeroModel = Joi.object().keys({
        heroName: Joi.string().optional(),
        heroHeight: Joi.number().integer().optional(),
        heroType: Joi.boolean().optional(),
        canFly: Joi.boolean().optional(),
        fanFollowing: Joi.number().optional(),
        superPowers: Joi.array().optional(),
        fightsWon: Joi.number().optional()
    });

    // !JOI is mainly used to validate our schema
    // !Below JOi is validation our Idealschema with the request body send by frontend (instead we
    // !writing each validation logic manually)
    const {
        error,
        value
    } = Joi.validate(req.body, idealSchemaForHeroModel);

    return {
        error,
        value
    };
};


module.exports = {
    joiValidationForCreateHero,
    joiValidationForUpdateHero
}