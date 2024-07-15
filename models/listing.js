const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        requied: true,
    },
    description: String,
    image:{
        // type: String,
    //     default: "https://images.unsplash.com/photo-1710609845812-9546e39dba46?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     set: (v) => v === "" ? "https://images.unsplash.com/photo-1710609845812-9546e39dba46?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    url: String,
    filename: String,

    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review" , 
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            requied: true
        },
        coordinates: {
            type: [Number],
            requied: true
        },
    },
    // category: {
    //     type:String,
    //     enum: 
    // }
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if (listing) {
        await Review.deleteMany({reviews: {$in: listing.reviews}});

    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

