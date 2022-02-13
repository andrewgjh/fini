-- Users table seeds here (Example)
INSERT INTO locations (city, country)
VALUES
('Toronto', 'Canada'),
('Montreal', 'Canada'),
('Vancouver', 'Canada');

INSERT INTO users (email, first_name, last_name, password,location_id) VALUES
('alice@gmail.com','Alice', 'Lee', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',2),
('kira@gmail.com','Kira','Go', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',3),
('andrew@gmail.com','Andrew', 'Ho', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',1),
('matthew@gmail.com','Matthew', 'Bednarski', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',1),
('vivian@gmail.com','Vivian', 'Trinh', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',1);

INSERT INTO categories (name, icon_url)
VALUES ('to Watch', 'http://www.mcicon.com/wp-content/uploads/2021/01/Music_Movie_1-copy-2.jpg'),
('to Read', 'http://www.mcicon.com/wp-content/uploads/2020/12/Education_Book_1-copy-9.jpg'),
('to Buy', 'https://www.pngkey.com/png/detail/261-2611214_picture-transparent-supermarket-remove-shopping-icon-e-shopping.png'),
('to Eat', 'https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg'),
('to Do', 'https://t3.ftcdn.net/jpg/02/65/68/08/360_F_265680890_VW2YoRXKBbV4ukv5X9SCyXAvHcIgh9v2.jpg');


