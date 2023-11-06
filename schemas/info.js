import Joi from 'joi';

export const albumSchema = Joi.object({
    name: Joi.string().regex(/^[\w,\s-]{5,30}$/).required(),
    description: Joi.string().max(255).required(),
    has_photos: Joi.array().items(Joi.number().integer()).min(0)
});

export const photoSchema = Joi.object({
    name: Joi.string().regex(/^[\w,\s-]{5,30}$/).required(),
    description: Joi.string().max(255).required(),
    photo: Joi.string().min(0)
});
