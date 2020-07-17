const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Favorites = require("../models/favorite");
const cors = require("./cors");
const dishRouter = express.Router();
var authenticate = require("../authenticate");

favoriteRouter.use(bodyParser.json());
favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .populate("user")
      .populate("dishes")
      .then(
        (favorites) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorites);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.create(req.body)
      .then(
        (favorite) => {
          console.log("Favorite Created ", dish);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
