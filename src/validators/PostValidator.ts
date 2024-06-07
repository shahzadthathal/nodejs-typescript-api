import Joi from 'joi';

export const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).required(),
    status: Joi.number().valid(0, 1).required(),
    category_id: Joi.number().integer().required()
});
