const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');
// god get router
router.get('/', async (req, res) => {
    console.log('first');
    let postData;
    try {
        console.log('second');
        postData = await Posts.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        console.log('adrian');

        const allPost = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            allPost,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'not working' });
    }
});

//TODO get by post id


router.get('/post/:id', async (req, res) => {
    console.log('step one post');
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        console.log('steptwo post');

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
        console.log('stepthree post');
    } catch (err) {
        res.status(505).json({ message: 'Couldnt get Post By id!' });
    }
});


//TODO get by profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Posts }],
        });
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(505).json({ message: 'Couldnt find user based on the session ID.' })
    }
});

//TODO get login redirect to dashboard
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    // console.log('login render before');
    res.render('login');
    // console.log('login after');
});

module.exports = router;