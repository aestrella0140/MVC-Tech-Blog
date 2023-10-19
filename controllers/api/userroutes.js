const router = require('express').Router();
const { User } = require('../../models');
// just to get the data
router.post('/', async (req, res) => {
    console.log(req.body)
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
    console.log(req.body);
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        // console.log('this email worked');

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password one.' });
            return;
        }

        const ValPassword = await userData.checkPassword(req.body.password);
        console.log('this email worked');
        if (!ValPassword) {
            res.status(400).json({ message: 'Incorrect email or password two.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'you are now logged in!'});
        });
        
    } catch (err) {
        res.status(404).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;