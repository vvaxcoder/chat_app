module.exports = {
    addPost(req, resp) {
        console.log(req.cookies);
        console.log(req.user);
    }
};