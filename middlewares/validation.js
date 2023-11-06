function validate(schema) {
    return async function (req, res, next) {
        try {
            const validatedResult = await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default validate;