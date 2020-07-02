const ifLoggedIn = function (cookie) {
  if (cookie === null) {
    return false;
  }
  return true;
};

const isFavorite = function (listingID, favoritesArray) {
  const favoriteIDs = favoritesArray.map(function (favorite) {
    return favorite.listing_id;
  });
  return favoriteIDs.includes(listingID);
};

//Middleware
const logInMiddleware = function (req, res, next) {
  if (
    req.path === "/login"
    // req.path.startsWith("/styles") ||
    // req.path.startsWith("/scripts")
  ) {
    next();
  } else if (!(req.session && ifLoggedIn(req.session.email))) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = {
  logInMiddleware,
  isFavorite,
};
