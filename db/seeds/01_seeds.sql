INSERT INTO buyers(username, email, password)
VALUES ('nadia01', 'nadia@gmail.com', '#Nadia123'),
VALUES ('sarah01', 'sarah@gmail.com', '#Sarah123'),
VALUES ('john01', 'john@gmail.com', '#John123'),
VALUES ('rudolph01', 'rudolphe@gmail.com', '#rudolph123'),
VALUES ('jerry01', 'jerry01@gmail.com', '#jerry01'),
VALUES ('schmidtKing', 'schmidtking@gmail.com', '#king01'),
VALUES ('simoneCat', 'thedarksphynx@gmail.com', '#435KIND'),
VALUES ('Nickyappy', 'nickeyhappy@gmail.com', 'HA34KF');


INSERT INTO listings(title, description, thumbnail_photo_url, cover_photo_url, price, favorite_id, for_sale)
VALUES ('Norman Guiter', 'Brand new, barely used','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 300, 1, true ),
('Glitter Box', 'Crazy lady selling box of glitter','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 45, 2, true ),
('The Cranberries RARE autographed copy', 'CD signed by Dolores O Riodan, collectors item','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 80, 3, false ),
('Seinfeld Seasons 1-6', 'Mint condition','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 98, 4, true ),
('Sofa to give away', 'Pick it up and it is yours','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 0, 5, true ),
('Marathon gear', 'A little sweaty, nothing a little cleaning can fix','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 100, 6, true ),
('Collection of Encyclopedias', 'The full collection A to Z dating form 1975, vintage!','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 75, 7, false ),
('Pumpkin', 'Just a pumpkin','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 10, false, true ),
('Rayban sunglasses 1995', 'Brand new, barely used','https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https: //images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 225, false, true );

INSERT INTO sellers(buyer_id, listing_id )
VALUES (1, 1),
(2, 2),
(1, 3),
(1, 4),
(3, 5),
(2, 6),
(1, 7),
(2, 8),
(4, 9);

INSERT INTO favorites (buyer_id, listing_id, favorite)
VALUES (5, 6, true),
VALUES (3, 5, true),
VALUES (4, 9, true),
VALUES (3, 8, true),

INSERT INTO messages (buyer_id, seller_id, title, description)
VALUES (8, 1, "INTERESTED", 'Hey, man I really want that'),
VALUES (5, 1, 'Call me', 'Can you accept 100?'),
