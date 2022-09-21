const notFound = (req, res) => {
    res.status(404).send('Unknown')
}

module.exports = notFound