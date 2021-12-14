exports.create = (req, res) => {
    res.send("Create weather is done!");
}
exports.findAll = (req, res) => {
    res.send("Find All is working");
}
exports.findOne = (req, res) => {
    const id = req.params.id;
    res.send("Find weather by id: " + id);
}
exports.update = (req, res) => {
    res.send("Update is working");
}
exports.findByIdAndUpdate = (req, res) => {
    res.send("Find By Id And Update is working");
}
exports.delete = (req, res) => {
    res.send("delete is working");
}
exports.deleteAll = (req, res) => {
    res.send("deleteAll is working");
}
exports.update = (req, res) => {
    res.send("Update is working");
}
exports.findAllPublished = (req, res) => {
    res.send("findAllPublished is working");
}