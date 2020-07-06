const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;
// {
//     "name": "Weekend Grand Buffet",
//     "image": "images/buffet.png",
//     "label": "New",
//     "price": "19.99",
//     "description": "Featuring . . .",
//     "featured": false
// }
var promotionSchema = new Schema(
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
    label: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
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
var Promotions = mongoose.model("Promotion", promotionSchema);

module.exports = Promotions;
