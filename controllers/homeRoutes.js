const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');
// god get router
router.get('/', async (req, res) => {
    console.log('hello world');
try {
    const postData = await Posts.findall({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
    
    const Post = postData.map((post) => post.get({ Plain: true }));

    res.render('homepage', {
        Post,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json(err);
}
});

//TODO get by post id


router.get('post/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
           include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    const Post = postData.get({ plain: true });

    res.render('Posts', {
        ...Post,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(505).json({ message: 'Couldnt get Post By id!'});
    }
});


//TODO get by profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Posts }],
        });
        const user = userData.get ({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(505).json({ message: 'Couldnt find user based on the session ID.'})
    }
});

//TODO get login redirect to dashboard
router.get('login', withAuth, async (req, res) => {
    if (req.sessionlogged_in) {
        res.redirect('/profile');
        return;
    }
  res.render('login');  
});

module.exports = router;