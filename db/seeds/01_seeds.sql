INSERT INTO buyers(username, email, password)
VALUES ('nadia01', 'nadia@gmail.com', '1234'),
('sarah01', 'sarah@gmail.com', '1234'),
('john01', 'john@gmail.com', '1234'),
('rudolph01', 'rudolphe@gmail.com', '1234'),
('jerry01', 'jerry01@gmail.com', '1234'),
('schmidtKing', 'schmidtking@gmail.com', '1234'),
('simoneCat', 'thedarksphynx@gmail.com', '1234'),
('Nickyappy', 'nickeyhappy@gmail.com', '1234');

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

INSERT INTO listings(title, description, thumbnail_photo_url, cover_photo_url, created_at, price, for_sale, seller_id)
VALUES ('Norman Guitar', 'Brand new, barely used','https://i.imgur.com/OO1D0ty.jpg', 'CoverPhotoURL','2018-02-12T08:13:20.000Z', 300, true, 1 ),

('Glitter Box', 'Crazy lady selling box of glitter','https://i.imgur.com/BbA3TvF.jpg', 'CoverPhotoURL','2018-02-12T08:13:20.000Z', 45,true, 2 ),

('The Cranberries RARE autographed copy', 'CD signed by Dolores O Riodan, collectors item','https://i.imgur.com/VdV5qpE.jpg', 'CoverPhotoURL','2018-02-12T08:13:20.000Z',80, true, 3),

('Seinfeld Seasons 1-6', 'Mint condition','https://i.imgur.com/lmEYNG9.jpg', 'CoverPhoroURL','2018-02-12T08:13:20.000Z',98, true, 4 ),

('Sofa to give away', 'Pick it up and it is yours','https://i.imgur.com/elgE9Vz.jpg', 'CoverPhotoURL','2018-02-12T08:13:20.000Z',0,true, 5 ),

('Marathon gear', 'A little sweaty, nothing a little cleaning can fix','https://i.imgur.com/cV5hRdH.jpg', 'CoverPhotoURL','2018-02-12T08:13:20.000Z', 100,true, 6 ),

('Collection of Encyclopedias', 'The full collection A to Z dating form 1975, vintage!','https://i.imgur.com/tJVb8mH.jpg', 'CoverPhotoURL','2018-02-12T08:13:20.000Z', 75,true, 7 ),


('Pumpkin', 'Just a pumpkin','https://i.imgur.com/GO396ow.jpg', 'CoverPhotoURL', '2018-02-12T08:13:20.000Z',10,true, 8),

('Rayban sunglasses 1995', 'Brand new, barely used','https://i.imgur.com/q3pFVCN.jpg', 'CoverPhotoURL', '2018-02-12T08:13:20.000Z', 225, true, 9 );


INSERT INTO favorites (buyer_id, listing_id)
VALUES (5, 6),
(3, 5),
(4, 9),
(3, 8);

INSERT INTO messages (buyer_id, seller_id, listing_id, title, description)
VALUES (8, 1, 1, 'INTERESTED', 'Hey, man I really want that'),
(5, 1, 1, 'Call me', 'Can you accept 100?');
