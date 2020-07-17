const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Favorites = require("../models/favorite");
const cors = require("./cors");
const favoriteRouter = express.Router();
var authenticate = require("../authenticate");

favoriteRouter.use(bodyParser.json());
favoriteRouter
  .route("/")
  .get(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate("user")
      .populate("dishes")
      .then(
        (favs) => {
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favs);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favs) => {
          if (favs == null) {
            entry = { user: req.user._id, dishes: req.body };
            Favorites.create(entry)
              .then(
                (favs) => {
                  res.StatusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favs);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          } else {
            console.log(favs);
            console.log(req.body);
            req.body.forEach((element) => {
              favs.dishes.addToSet(element);
            });
            favs.save();
            res.StatusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favs);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favs) => {
        if (favs != null) {
          Favorites.findByIdAndDelete(favs._id).then(
            (favs) => {
              res.StatusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favs);
            },
            (err) => next(err)
          );
        } else {
          err = new Error("No favorite dish found!");
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .get(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favs) => {
          if (favs.dishes.includes(req.params.dishId)) {
            Dishes.findById(req.params.dishId)
              .then(
                (dish) => {
                  res.status(200).json({ user: req.user, dish: dish });
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          } else {
            res.status(404).json(null);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favs) => {
          if (favs == null) {
            // console.log("null");
            entry = { user: req.user._id, dishes: req.params.dishId };
            Favorites.create(entry)
              .then(
                (favs) => {
                  res.StatusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favs);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          } else {
            console.log("not null");
            console.log(favs);
            console.log(req.body);
            favs.dishes.push(req.params.dishId);
            favs.save();
            res.StatusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favs);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favs) => {
        if (favs != null) {
          index = favs.dishes.indexOf(req.params.dishId);
          if (index >= 0) {
            favs.dishes.splice(index, 1);
            favs.save();
            res.status(200).json(favs);
          } else {
            err = new Error(
              "No favorite dish with id " + req.params.dishId + " found!"
            );
            err.status = 404;
            return next(err);
          }
        } else {
          err = new Error("No favorite dish " + req.params.dishId + " found!");
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
