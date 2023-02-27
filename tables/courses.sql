-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2023 at 03:06 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pembelajaran_itc`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image_thumbnail` varchar(255) NOT NULL,
  `cloudinary_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_division` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `image_thumbnail`, `cloudinary_id`, `createdAt`, `updatedAt`, `id_division`, `id_user`) VALUES
(1, 'Javascript Dasar', 'Course ini akan mengajarkan kalian dasar-dasar javascript', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248737/itc-repo/course/jxajdngscomxbnittnyn.jpg', 'jxajdngscomxbnittnyn', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 2, 1),
(2, 'Python Dasar', 'Course ini akan mengajarkan kalian dasar-dasar python', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248739/itc-repo/course/vajd35gzvj11cwnvpfuz.jpg', 'vajd35gzvj11cwnvpfuz', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 2, 1),
(3, 'Dart Dasar', 'Course ini akan mengajarkan kalian dasar-dasar javascript', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248741/itc-repo/course/vrqn9f2asftwn1bpqpmn.jpg', 'vrqn9f2asftwn1bpqpmn', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 3, 1),
(4, 'Figma From Scratch', 'Course ini akan mengajarkan kalian dasar-dasar python', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248743/itc-repo/course/qhdba7ppv1jgbnwrkybq.jpg', 'qhdba7ppv1jgbnwrkybq', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 4, 1),
(5, 'SQL Dasar', 'Course ini akan mengajarkan kalian dasar-dasar javascript', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248744/itc-repo/course/i5amoybkygdqsrk9p4uk.jpg', 'i5amoybkygdqsrk9p4uk', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 1, 1),
(6, 'Pengenalan Flutter', 'Course ini akan mengajarkan kalian dasar-dasar python', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248746/itc-repo/course/lnqcxydvnknbpfvs9cd1.jpg', 'lnqcxydvnknbpfvs9cd1', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 3, 1),
(7, 'Pengenalan UX', 'Course ini akan mengajarkan kalian dasar-dasar javascript', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248748/itc-repo/course/oztdl8l3ibdlnfxatv2h.jpg', 'oztdl8l3ibdlnfxatv2h', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 5, 1),
(8, 'React JS for Front End', 'Course ini akan mengajarkan kalian dasar-dasar python', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677248750/itc-repo/course/zjmavc32l9ns7s41osf5.jpg', 'zjmavc32l9ns7s41osf5', '2023-02-24 14:25:42', '2023-02-24 14:25:42', 2, 1),
(9, 'Introduction to Project Management', 'Pada materi ini berisi 2 bab mengenai apa itu project management serta metode dalam project management tersebut.', 'https://res.cloudinary.com/dd6stok7k/image/upload/v1677341383/itc-repo/course/qe3uge3zuafnvcrfzxmg.png', 'qe3uge3zuafnvcrfzxmg', '2023-02-25 16:09:43', '2023-02-25 16:09:43', 5, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_division` (`id_division`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`id_division`) REFERENCES `divisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
