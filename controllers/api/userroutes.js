const router = require('express').Router();
const { User } = require('../../models');
// just to get the data
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch {
        res.status(400).json({ message: 'post request failed'});
    }
});

// logged in post data
router.post('/login', async (req, res) => {
    try {
        const userData = await user.findOne({ where: { email: req.body.email } });
    }
})