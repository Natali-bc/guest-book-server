const Joi = require('joi');
const Review = require('../models/Review');

async function listReviews(req, res) {
  const reviews = await Review.find();

  res.json(reviews);
}
async function addReview(req, res) {
  try {
    const { body } = req;
    const review = await Review.create(body);
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
}
function validateAddedReview(req, res, next) {
  const validationRules = Joi.object().keys({
    username: Joi.string().required(),
    content: Joi.string().required(),
  });
  const validationResult = validationRules.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send({ message: 'Missing required field' });
  }

  next();
}

module.exports = {
  listReviews,
  addReview,
  validateAddedReview,
};
