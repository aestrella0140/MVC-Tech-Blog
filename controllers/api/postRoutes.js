const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth async (req, res) => {
    try {
        const postData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const posts = postData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch {
        res.status(500).json({ message: 'couldnt render homepage, you may not be logged in!'})
    }
});

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
        res.status(500).json({ message: 'couldnt create new post!'})
    }
});

module.exports = router;