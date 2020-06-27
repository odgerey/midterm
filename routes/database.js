const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email LIKE $1;
  `;
  return pool.query(queryString, [email]).then((res) => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

//What params do I pass through?
const getAllListings = function (guest_id, limit = 10) {
  const queryString = `
  query to get all listings
;`;
  const values = [guest_id, limit];
  return pool.query(queryString, values).then((res) => {
    return res.rows;
  });
};
exports.getAllListings = getAllListings;

const getAllListingsByPrice = function (guest_id, limit = 10) {
  const queryString = `
  query to get all listings
;`;
  const values = [guest_id, limit];
  return pool.query(queryString, values).then((res) => {
    return res.rows;
  });
};
exports.getAllListingsByPrice = getAllListingsByPrice;
