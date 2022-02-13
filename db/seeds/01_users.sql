-- Users table seeds here (Example)
INSERT INTO locations (city, country)
VALUES ('Toronto', 'Canada');
INSERT INTO locations (city, country)
VALUES ('Montreal', 'Canada');
INSERT INTO locations (city, country)
VALUES ('Vancouver', 'Canada');

INSERT INTO users (email, first_name, last_name, password,location_id) VALUES ('alice@gmail.com','Alice', 'Lee', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',2);
INSERT INTO users (email, first_name, last_name, password,location_id) VALUES ('kira@gmail.com','Kira','Go', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',3);
INSERT INTO users (email, first_name, last_name, password,location_id) VALUES ('andrew@gmail.com','Andrew', 'Ho', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',1);
INSERT INTO users (email, first_name, last_name, password,location_id) VALUES ('matthew@gmail.com','Matthew', 'Bednarski', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',1);
INSERT INTO users (email, first_name, last_name, password,location_id) VALUES ('vivian@gmail.com','Vivian', 'Trinh', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',1);

