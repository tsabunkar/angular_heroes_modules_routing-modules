const express = require('express');

const router = express.Router();

const HeroController = require('../controllers/hero.controller');

//http://localhost:3000/api/heroes
router.route('')
    // .get(HeroController.findHeroByCanFly) //! GET Particular set of heroes
    .get(HeroController.findAllHeroes) // !GET ALL
    .post(HeroController.createHero) // !POST
    .delete(HeroController.deleteAllHeroes) // !DELETE All
    .put(HeroController.updateAllHeroes); // !UPDATE All

//http://localhost:3000/api/heroes/2871987487hdjsf8783    
router.route('/:id')
    .get(HeroController.findHeroById) // !GET by Id
    .delete(HeroController.deleteHerobyId) // !DELETE by Id
    .put(HeroController.updateHeroById); // !PUT


module.exports = {
    heroesRoute: router
};