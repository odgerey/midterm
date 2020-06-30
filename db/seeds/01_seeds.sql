INSERT INTO buyers(username, email, password)
VALUES ('nadia01', 'nadia@gmail.com', '#Nadia123'),
('sarah01', 'sarah@gmail.com', '#Sarah123'),
('john01', 'john@gmail.com', '#John123'),
('rudolph01', 'rudolphe@gmail.com', '#rudolph123'),
('jerry01', 'jerry01@gmail.com', '#jerry01'),
('schmidtKing', 'schmidtking@gmail.com', '#king01'),
('simoneCat', 'thedarksphynx@gmail.com', '#435KIND'),
('Nickyappy', 'nickeyhappy@gmail.com', 'HA34KF');

INSERT INTO sellers(buyer_id )
VALUES (1),
(2),
(1),
(1),
(3),
(2),
(1),
(2),
(4);


INSERT INTO listings(title, description, thumbnail_photo_url, cover_photo_url,price, for_sale, seller_id)
VALUES ('Norman Guiter', 'Brand new, barely used','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 300, true, 1 ),
('Glitter Box', 'Crazy lady selling box of glitter','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 45,true, 2 ),
('The Cranberries RARE autographed copy', 'CD signed by Dolores O Riodan, collectors item','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',80, false, 3),
('Seinfeld Seasons 1-6', 'Mint condition','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 98, true, 4 ),
('Sofa to give away', 'Pick it up and it is yours','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 0,true, 5 ),
('Marathon gear', 'A little sweaty, nothing a little cleaning can fix','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 100,true, 6 ),
('Collection of Encyclopedias', 'The full collection A to Z dating form 1975, vintage!','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 75,false, 7 ),
('Pumpkin', 'Just a pumpkin','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',10,true, 8),
('Rayban sunglasses 1995', 'Brand new, barely used','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 225, true, 9 );



INSERT INTO favorites (buyer_id, listing_id)
VALUES (5, 6),
(3, 5),
(4, 9),
(3, 8);

INSERT INTO messages (buyer_id, seller_id, listing_id, title, description)
VALUES (8, 1, 1, 'INTERESTED', 'Hey, man I really want that'),
(5, 1, 1, 'Call me', 'Can you accept 100?');
