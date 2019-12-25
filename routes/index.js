const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require('moment');
const { sessionChecker } = require("../middleware/auth");
const User = require('../models/user');
const Party = require('../models/party');

const saltRounds = 10;

router.route('/')
  .get(async (req, res, next) => {
      const party = await Party.find({});
      res.render('channel', { party });
});

router.route('/login')
  .get(sessionChecker, (req, res, next) => {
    const user = req.session.user;
    res.render('login', { user });
  })
    .post(async (req, res) => {
        const { login, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username: login });
        if (user) {
            req.session.user = user;
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = user;
            res.redirect("/channel");
            // res.json({status: true});
        } else {
            res.redirect("/login");
            // res.json({status: false});
        }
    });


router.route('/signup')
  .get(sessionChecker, (req, res, next) => {
  // let entries = await User.mostRecent();
  // // console.log(entries);
    const user = req.session.user;
    console.log(user);
    res.render('signup', { user });
  })
  .post(async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
        // console.log(req.body)
      const user = new User({
        username,
        password: await bcrypt.hash(password, saltRounds),
        email
      });
      await user.save();
      req.session.user = user;
      // res.json(user);
      res.redirect('/channel');
    } catch (error) {
      next(error);
    }
});

router.route('/logout')
    .get(async (req, res, next) => {
        if (req.session.user) {
            try {
                await req.session.destroy();
                res.clearCookie("user_sid");
                res.redirect("/");
            } catch (error) {
                next(error);
            }
        } else {
            res.redirect("/");
        }
    });

router.route('/channel')
    .get(async(req, res, next) => {
        // console.log(req.session.user + 'Ok');
        const user = req.session.user;
        const party = await Party.find({});
        // console.log(user);
        // const login = req.session.user.username;
        res.render('channel', { user, party });
    });

router.route('/channel/new')
    .get(async (req, res, next) => {
        console.log('OK')
        const user = req.session.user;
        return res.render('new', { user });
    });

router.route('/channel/new')
    .post(async (req, res, next) => {
        console.log('Post')
        const { name, location, date} = req.body;
        const party = new Party({ name: name, location: location, date: date, status: false});

        try {
            await party.save();
            // throw Error('You shall all fill complete');
            return res.redirect(`/channel/${party.id}`);
        }
        catch (err) {
            return res.render('channel/new', { errors: [err] });
        }
    });

router.route('/channel/:id')
    .get(async function (req, res, next) {
    const user = req.session.user;
    let party = await Party.findById(req.params.id);
    res.render('show', { party, user });
    });

router.route('/channel/:id')
    .delete(async function (req, res, next) {
        await Party.deleteOne({'_id': req.params.id});
        res.redirect('/channel');
    });

router.route('/channel/edit/:id')
    .put(async function (req, res, next) {
        let party = await Party.findById(req.params.id);
        console.log(req.body);
        const { party_name, party_location, party_date } = req.body;

        party.name = party_name;
        party.location = party_location;
        party.date = party_date;
        await party.save();
        res.redirect(`/channel/${party.id}`);
    });

router.route('/channel/edit/:id')
    .get(async function (req, res, next) {
        let party = await Party.findById(req.params.id);
        res.render('edit', { party });
    });


module.exports = router;
