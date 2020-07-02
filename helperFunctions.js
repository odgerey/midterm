const isAdmin = function (db, id, buyerID) {
  const getListing = `
    SELECT *
    FROM listings
    WHERE id = $1
    `;
  const getBuyer = `
    SELECT *
    FROM buyers
    WHERE id = $1
    `;
  return Promise.all([
    db.query(getListing, [id]),
    db.query(getBuyer, [buyerID]),
  ]).then(([listingResults, buyerResults]) => {
    const buyer = buyerResults.rows[0];
    const listing = listingResults.rows[0];
    console.log("Buyer", buyer, "listing", listing);

    if (buyer.is_admin || buyer.id === listing.seller_id) {
      return listing;
    } else {
      return Promise.reject({ message: "not allowed" });
    }
  });
};

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
  isAdmin,
};
