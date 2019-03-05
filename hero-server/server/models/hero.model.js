const {
    mongoose
} = require('../db/mongoose_config');

const {
    Schema
} = require('mongoose');


const heroSchema = mongoose.Schema({
    heroName: {
        type: String,
        required: true
    },
    heroHeight: {
        type: Number,
        required: true
    },
    heroType: {
        type: Boolean,
        required: true
    },
    canFly: {
        type: Boolean,
        required: true
    },
    fanFollowing: {
        type: Number
    },
    superPowers: {
        type: Array
    },
    fightsWon: {
        type: Number
    }
});

const HeroModel = mongoose.model('heros_collection', heroSchema);

module.exports = {
    HeroModel
};