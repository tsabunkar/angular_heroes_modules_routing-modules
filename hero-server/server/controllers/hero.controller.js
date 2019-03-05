const {
    HeroModel
} = require('../models/hero.model');
const joiValidation = require('../helpers/request-validation');

const {
    ObjectID,
    ObjectId
} = require('mongodb');

const findAllHeroes = async (req, resp, next) => {
    // console.log('Inside the controller');
    try {

        const query = {};
        // console.log(HeroModel);
        const heroes = await HeroModel.find(query) // find all documents

        /* resp.status(200).json({
            message: 'fetched all records',
            data: heroes,
            status: 200
        }); */
        resp.status(200).json(heroes);

    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }

};



const createHero = async (req, resp, next) => { // eslint-disable-line

    const {
        error,
        value
    } = joiValidation.joiValidationForCreateHero(req);


    if (error) {
        const errorObj = new Error('Request body Validation of Schema failed'); // Error or exception are same in JS
        errorObj.status = 500;
        errorObj.message = error;
        next(errorObj);
        return;
    }


    const heroModel = new HeroModel(value);


    try {
        const heroCreated = await heroModel.save();

        if (!heroCreated) {
            resp.status(500).json({
                message: 'Failed to create Hero Object',
                data: '',
                status: 500
            });
            return;
        }

        resp.status(200).json({
            message: 'You have created object succesfully!',
            data: heroCreated,
            status: 200
        });

    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }



};

const deleteAllHeroes = async (req, resp, next) => { // eslint-disable-line


    try {
        // const heroesDeleted = await HeroModel.deleteMany();
        /*   const heroesDeleted = await HeroModel.find({
              "superPowers": {
                  "$size": 3
              }
          }); */


        const heroesDeleted = await HeroModel.deleteMany({

            /*  "$or": [{
                     "superPowers": {
                         "$size": 0
                     }
                 },
                 {
                     "superPowers": {
                         "$size": 1
                     }
                 },
                 {
                     "superPowers": {
                         "$size": 2
                     }
                 }
             ] */

            "$where": function () {
                return this.superPowers.length >= 2
            }


        });

        console.log(heroesDeleted);

        if (!heroesDeleted) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but some error while deleting the documents',
                data: '',
                status: 404
            });
            return;
        }

        //success
        resp.status(200).json({
            message: 'All Heroes deleted successfully',
            data: heroesDeleted,
            status: 200
        });
    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }
};


const findHeroById = async (req, resp, next) => { // eslint-disable-line

    console.log(req.params);
    const uriIdFetch = req.params.id;

    console.log('uriIdFetch', uriIdFetch);
    console.log('uriIdFetch', typeof (uriIdFetch));

    if (!ObjectID.isValid(uriIdFetch)) {
        resp.status(404).json({
            message: 'Id Format is not valid',
            data: '',
            status: 404
        });
        return;
    }


    try {
          const hero = await HeroModel.findOne({
              _id: uriIdFetch
          });
        // const hero = await HeroModel.findById(uriIdFetch);

        console.log('hero value is', hero);
        if (!hero) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but no docu found with this id',
                data: '',
                status: 404
            });
            return;
        }

        //success
        resp.status(200).json({
            message: 'Hero found by the Id - ' + uriIdFetch,
            data: hero,
            status: 200
        });
    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }

};


const findHeroByCanFly = async (req, resp, next) => { // eslint-disable-line

    const isFlyable = req.get('canFly');

    // console.log('isFlyable', isFlyable);
    // console.log('isFlyable type', typeof (isFlyable));

    if (!(isFlyable == 'true' || isFlyable == 'false')) {
        resp.status(404).json({
            message: 'headers is not valid',
            data: '',
            status: 404
        });
        return;
    }


    try {
        const hero = await HeroModel.find({
            canFly: isFlyable
        });

        if (!hero) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but no docu found with this id',
                data: '',
                status: 404
            });
            return;
        }

        //success
        resp.status(200).json({
            message: 'Hero found by the canFly property - ' + isFlyable,
            data: hero,
            status: 200
        });
    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }

};

const updateAllHeroes = async (req, resp, next) => { // eslint-disable-line

    const {
        error,
        value
    } = joiValidation.joiValidationForUpdateHero(req);

    if (error) {
        resp.status(500).json({
            message: error,
            data: '',
            status: 500
        });
        return;
    }

    try {
        /*   const heroesUpdated = await HeroModel.find({

              "$and": [{
                      "fightsWon": {
                          "$gt": 9
                      }
                  },
                  {
                      "superPowers": {
                          "$all": ["dance", "swim"]
                      }
                  }
              ]


          }); */
        const heroesUpdated = await HeroModel.updateMany({

            "$and": [{
                    "fightsWon": {
                        "$gt": 10
                    }
                },
                {
                    "superPowers": {
                        "$all": ["dance", "swim"]
                    }
                }
            ]


        }, value, {
            new: true
        });

        // console.log(heroesUpdated);


        //success
        resp.status(200).json({
            message: 'All Heroes updated successfully',
            data: heroesUpdated,
            status: 200
        });
    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }
};

const updateHeroById = async (req, resp, next) => { // eslint-disable-line

    const {
        error,
        value
    } = joiValidation.joiValidationForUpdateHero(req);

    if (error) {
        resp.status(500).json({
            message: error,
            data: '',
            status: 500
        });
        return;
    }



    const uriIdFetch = req.params.tejasId;

    // !checking the objectId is valid hain ki nahi
    if (!ObjectID.isValid(uriIdFetch)) {
        resp.status(404).json({
            message: 'Id Format is not valid',
            data: '',
            status: 404
        });
        return;
    }

    try {
        const heroUpdated = await HeroModel.findOneAndUpdate({
            _id: uriIdFetch,
        }, value, {
            new: true
        });

        if (!heroUpdated) {
            resp.status(404).json({
                message: 'Id format is valid but no docu found with this id',
                data: '',
                status: 404
            });
            return;
        }

        //success
        resp.status(200).json({
            message: 'Hero updated successfully',
            data: heroUpdated,
            status: 200
        });

    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }


};

const deleteHerobyId = async (req, resp, next) => { // eslint-disable-line

    const uriIdFetch = req.params.id;

    if (!ObjectID.isValid(uriIdFetch)) {
        resp.status(404).json({
            message: 'Id Format is not valid',
            data: '',
            status: 404
        });
        return;
    }

    try {
        const heroDeleted = await HeroModel.findOneAndRemove({ //findOneAndRemove() fun return promise Object so, use await :)
            _id: uriIdFetch,
        });


        if (!heroDeleted) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but no docu found with this id',
                data: '',
                status: 404
            });
            return;
        }

        //success
        resp.status(200).json({
            message: 'Hero deleted successfully!',
            data: heroDeleted,
            status: 200
        });
    } catch (err) {
        resp.status(500).json({
            message: err,
            data: '',
            status: 500
        });
    }
};

module.exports = {
    findAllHeroes,
    createHero,
    deleteAllHeroes,
    findHeroById,
    findHeroByCanFly,
    deleteHerobyId,
    updateHeroById,
    updateAllHeroes
}