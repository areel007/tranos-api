const express = require("express");
const router = express.Router();

const hero = require("../../../controllers/home/hero-images/hero.images");

router.route("/hero-image-one").post(hero.postHeroImageOne);
router.route("/hero-image-two").post(hero.postHeroImageTwo);
router.route("/hero-image-three").post(hero.postHeroImageThree);
router
  .route("/hero-image-one/:id")
  .get(hero.getHeroImageOne)
  .patch(hero.updateHeroImageOne);
router
  .route("/hero-image-two/:id")
  .get(hero.getHeroImageTwo)
  .patch(hero.updateHeroImageTwo);
router
  .route("/hero-image-three/:id")
  .get(hero.getHeroImageThree)
  .patch(hero.updateHeroImageThree);

module.exports = router;
