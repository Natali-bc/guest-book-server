const { Router } = require('express');
const ReviewController = require('../controllers/reviews.controller');

const router = Router();

router.get('/', ReviewController.listReviews);

router.post(
  '/',
  ReviewController.validateAddedReview,
  ReviewController.addReview,
);

module.exports = router;
