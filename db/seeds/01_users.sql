-- Users table seeds here (Example)
INSERT INTO locations (city, country)
VALUES
('Toronto', 'Canada'),
('Montreal', 'Canada'),
('Vancouver', 'Canada');

INSERT INTO users (email, first_name, last_name, password, photo_url,location_id) VALUES
('alice@gmail.com','Alice', 'Lee', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.','',2),
('kira@gmail.com','Kira','Ga Ga', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.','https://www.biography.com/.image/t_share/MTgxMDg1MDI3MTkzMzMzMDk2/gettyimages-1127409044.jpg',3),
('andrew@gmail.com','Andrew', 'Ho', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.','https://cdn3.dpmag.com/2021/07/Landscape-Tips-Mike-Mezeul-II.jpg',1),
('matthew@gmail.com','Matthew', 'Bednarski', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.','https://static-cdn.jtvnw.net/jtv_user_pictures/4b7eb32b-d59b-4245-b37c-044f0ae85bf2-profile_image-300x300.png',1),
('vivian@gmail.com','Vivian', 'Trinh', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.','https://i.pinimg.com/originals/b0/04/34/b00434d849103f940ebe6e349b0f698c.jpg',1);

INSERT INTO categories (name, icon_url)
VALUES ('to Watch', 'http://www.mcicon.com/wp-content/uploads/2021/01/Music_Movie_1-copy-2.jpg'),
('to Read', 'http://www.mcicon.com/wp-content/uploads/2020/12/Education_Book_1-copy-9.jpg'),
('to Buy', 'https://www.pngkey.com/png/detail/261-2611214_picture-transparent-supermarket-remove-shopping-icon-e-shopping.png'),
('to Eat', 'https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg'),
('to Do', 'https://t3.ftcdn.net/jpg/02/65/68/08/360_F_265680890_VW2YoRXKBbV4ukv5X9SCyXAvHcIgh9v2.jpg');

INSERT INTO to_do_items (title, content, category_id, user_id, priority, deadline, is_completed, created_at, completed_at)
VALUES ('Watch Adventure Time', 'JUST WATCH IT', 1, 4, 1, '2022-12-01 00:00:00', false, '2022-01-01 00:00:00', NULL),
('Relax after presenting', 'Midterm project is done, woo!', 5, 4, 1, '2022-02-18 15:00:00', false, '2022-02-11 09:00:00', NULL),
('Watch Over The Garden Wall', 'SO GOOOOOOOD', 1, 2, 2, '2022-08-18 00:00:00', false, '2021-08-18 00:00:00', NULL),
('Eat at McDonalds', 'Get some ice cream', 4, 1, 1, '2022-02-19 15:00:00', false, '2022-02-13 15:00:00', NULL),
('Read Dune', 'Then watch the movie after!', 2, 1, 1, NULL, true, '2021-10-01 00:00:00', '2021-12-01 00:00:00'),
('Relax after presenting', 'Midterm project is done, woo!', 5, 3, 1, '2022-02-18 15:00:00', false, '2022-02-11 09:00:00', NULL),
('Buy a new phone', 'Android for sure', 3, 3, 4, NULL, true, '2022-01-01 00:00:00', '2022-02-01 00:00:00'),
('Buy groceries', 'Apples and Oranges', 3, 5, 5, '2022-02-20 00:00:00', false, '2022-02-12 00:00:00', NULL),
('Relax after presenting', 'Midterm project is done, woo!', 5, 5, 1, '2022-02-18 15:00:00', false, '2022-02-11 09:00:00', NULL),
('Eat some poutine', 'POTATOES', 4, 1, 3, '2022-02-24 00:00:00', false, '2022-02-12 00:00:00', NULL),
('Get some pizza', 'Try a new place? Or just Pizza Hut?', 4, 1, 2, '2022-02-22 00:00:00', false, '2022-02-10 00:00:00', NULL),
('Go for sushi', 'Invite some friends and get AYCE', 4, 1, 1, NULL, true, '2021-11-03 00:00:00', '2022-02-13 00:00:00');
