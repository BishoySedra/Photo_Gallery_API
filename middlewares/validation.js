function validate(schema) {
    return async function (req, res, next) {
        try {
            const validatedResult = await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            res.json({ message: error.details });
        }
    }
}

export default validate;