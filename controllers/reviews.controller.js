const Joi = require('joi');
const Review = require('../models/Review');

async function listReviews(req, res) {
  const reviews = await Review.find({}, null, { sort: { _id: -1 } });

  res.json(reviews);
}
async function addReview(req, res) {
  try {
    const { body } = req;
    const newRecord = { date: Date.now(), ...body };
    const review = await Review.create(newRecord);
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
