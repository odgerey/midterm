//Checks if the user is the buyer or the admin and returns the listing
const userCheck = function (db, cookie, buyerID) {
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
    db.query(getListing, [cookie]),
    db.query(getBuyer, [buyerID]),
  ]).then(([listingResults, buyerResults]) => {
    const buyer = buyerResults.rows[0];
    const listing = listingResults.rows[0];
    if (buyer.is_admin || buyer.id === listing.seller_id) {
      return listing;
    } else {
      return Promise.reject({ message: "not allowed" });
    }
  });
};

const isAdmin = function (db, cookie) {
  const getAdmin = `
  SELECT *
  FROM buyers
  WHERE is_admin = true
  AND id = $1;
  `;
  return db.query(getAdmin, [cookie]).then((data) => {
    if (!data.rows[0]) {
      return false;
    }
    return true;
  });
};

// const isAdmin = function (db, cookie) {
//   const getAdmin = `
//   SELECT *
//   FROM buyers
//   WHERE is_admin = true
//   AND id = $1;
//   `;
//   return db.query(getAdmin, [cookie]).then((data) => {
//     if (data.rows[0].id === undefined) {
//       return "hello";
//     }
//     return true;
//   });
// };

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
  userCheck,
  isAdmin,
};
