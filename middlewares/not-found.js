function notFoundHandler(req, res) {
    return res.status(404).json({ msg: `This route is Not Found!!` });
}

export default notFoundHandler;