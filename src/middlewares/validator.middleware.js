exports.validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch(error) {
        return res.status(400)
            .json(
                error.errors.map((error) => {
                    return ({
                        field: error.path[0],
                        message: error.message
                    })
                })
            )
    }
}