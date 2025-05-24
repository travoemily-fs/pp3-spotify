/* 
primary playlist routes are housed here
*/

// pull in needed imports
const axios = require("axios");
// pull in user model
const { User } = require("../../db");

// begin playlist routes

// save track handler
const saveTrackHandler = async (req, res) => {
    // grab user id from token
    // grab playlist id and track URI from req.body 
    // find user in db
    // if user or token is missing, return error
    // send post request to spotify api to add track to playlist
    // return success message
}

// export routes
module.exports = {
    saveTrackHandler
}