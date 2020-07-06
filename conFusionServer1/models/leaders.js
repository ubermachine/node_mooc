const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;
// const Currency = mongoose.Types.Currency;
// {
//     "name": "Peter Pan",
//     "image": "images/alberto.png",
//     "designation": "Chief Epicurious Officer",
//     "abbr": "CEO",
//     "description": "Our CEO, Peter, . . .",
//     "featured": false
// /}
var leaderSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "",
      required: true,
    },
    abbr: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
var Leaders = mongoose.model("Leader", leaderSchema);

module.exports = Leaders;
