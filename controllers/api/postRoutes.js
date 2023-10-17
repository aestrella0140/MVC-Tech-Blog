const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/api/posts', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: title,
            comment: comment,
            date_created: date_created,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch {
        res.status(500).json({ message: 'couldnt create new post!' })
    }
});



module.exports = router;