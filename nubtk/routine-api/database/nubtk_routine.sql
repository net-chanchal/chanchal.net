-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 04, 2023 at 01:24 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nubtk_routine`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` smallint UNSIGNED NOT NULL,
  `course_title` varchar(255) NOT NULL,
  `course_code` varchar(35) NOT NULL,
  `credit` tinyint UNSIGNED NOT NULL
);

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_title`, `course_code`, `credit`) VALUES
(1, 'Introduction to Computers', 'CSE 1101', 2),
(2, 'Structured Programming Language', 'CSE 1103', 3),
(3, 'Structured Programming Language Lab', 'CSE 1104', 1),
(4, 'Mathematics I: Differential Calculus & Integral Calculus', 'MATH 1101', 3),
(5, 'Physics I :Heat and Thermodynamics, Properties of Matters, Waves and Oscillations', 'PHY 1101', 3),
(6, 'Chemistry', 'CHEM 1101', 3),
(7, ' Chemistry Lab', 'CHEM 1102', 1),
(8, 'English Language I : Communicative Skill', 'ENG 1105', 3),
(9, 'Government and Sociology', 'GED 1101', 2),
(10, 'Object - Oriented Programming I', 'CSE 1201', 3),
(11, 'Object - Oriented Programming I Lab', 'CSE 1202', 1),
(12, 'Digital Logic Design', 'CSE 1205', 3),
(13, 'Digital Logic Design Lab', 'CSE 1206', 1),
(14, 'Mathematics II : Matrices, Vectors and Coordinate Geometry', 'MATH 1203', 3),
(15, 'Physics II : Electromagnetism, Optics and Modern Physics', 'PHY 1201', 3),
(16, 'Physics II Lab', 'PHY 1202', 1),
(17, 'English Language II : Listening, Speaking, Reading and Writing', 'ENG 1205', 3),
(18, 'Media and Information Technology Law', 'GED 1201', 2),
(19, 'Data Structure', 'CSE 2101', 3),
(20, 'Data Structure Lab', 'CSE 2102', 1),
(21, 'Algorithms Design & Analysis', 'CSE 2103', 3),
(22, 'Algorithms Lab', 'CSE 2104', 1),
(23, 'Software Development I', 'CSE 2106', 1),
(24, 'Electrical Engineering and Circuit Analysis', 'CSE 2107', 3),
(25, 'Electrical Engineering and Circuit Analysis Lab', 'CSE 2108', 1),
(26, 'Mathematics IV :Complex Variable & Laplace Transformation', 'MATH 2101', 2),
(27, 'Media and Information Technology Law', 'GED 2101', 3),
(28, 'Linear Programming And Combinatorial Optimization', 'CSE 2201', 3),
(29, 'Linear Programming And Combinatorial Optimization Lab', 'CSE 2202', 1),
(30, 'Computer Architecture', 'CSE 3101 ', 3),
(31, 'Computer Architecture Lab ', 'CSE 3102 ', 1),
(32, 'Electrical Engineering and Circuit Analysis Lab', 'CSE 2108 ', 1),
(33, 'Data Communication', 'CSE 2207', 3),
(34, 'Numerical Methods', 'CSE 2203', 3),
(35, 'Numerical Methods Lab', 'CSE 2204', 1),
(36, 'Object - Oriented Programming II', 'CSE 2205', 3),
(37, 'Object - Oriented Programming II Lab', 'CSE 2206', 1),
(38, 'Government and Sociology', 'GED 2201', 3),
(39, 'Economics', 'GED 2203', 2),
(40, 'Communication Engineering', 'CSE 3105', 3),
(41, 'Database Management System', 'CSE 3103', 3),
(42, 'Database Management System Lab', 'CSE 3104', 1),
(43, 'Operating System', 'CSE 3107 ', 3),
(44, 'Operating System Lab ', 'CSE 3108 ', 1),
(45, 'Software Engineering', 'CSE 3109', 3),
(46, 'Industrial Management', 'IPE 3201', 2),
(47, 'Information System and Design', 'CSE 3209', 3),
(48, 'Database Management System Lab ', 'CSE 3104 ', 1),
(49, 'Communication Engineering ', 'CSE 3105 ', 3),
(50, 'Software Engineering ', 'CSE 3109 ', 3),
(51, 'Mathematics V :Statistics and Probability', 'MATH 3101 ', 2),
(52, 'Software Development II', 'CSE 3201', 1),
(53, 'Microprocessor and Assembly Language programming', 'CSE 3203', 3),
(54, 'Microprocessor and Assembly Language programming Lab', 'CSE 3204', 1),
(55, 'Theory of Computation', 'CSE 3205', 3),
(56, 'Embedded System', 'CSE 4201', 3),
(57, 'Embedded System Lab', 'CSE 4202', 1),
(58, 'Computer Networks', 'CSE 4105', 3),
(59, 'Computer Networks Lab', 'CSE 4106', 1),
(60, 'Computer Graphics and Multimedia System', 'CSE 4107', 3),
(61, 'Computer Graphics and Multimedia System Lab', 'CSE 4108', 1),
(62, 'Artificial Intelligence and Expert Systems', 'CSE 4111', 3),
(63, 'Artificial Intelligence and Expert Systems Lab', 'CSE 4112', 1),
(64, 'Mathematical Analysis for Computer Science', 'CSE 3207', 3),
(65, 'Financial and Managerial Accounting', 'GED 3101', 2),
(66, 'Project & Thesis', 'CSE 4200', 4),
(67, 'Compiler Design', 'CSE 4101', 3),
(68, 'Compiler Design Lab', 'CSE 4102', 1),
(69, 'Software Development III', 'CSE 4104', 1),
(70, 'Mobile Computing', 'CSE 4203', 3),
(71, 'Mobile Computing Lab', 'CSE 4204', 1),
(72, 'Neural Network', 'CSE 4205', 3),
(73, 'Neural Network Lab', 'CSE 4206', 1),
(74, 'Pattern Recognition', 'CSE 4207', 3),
(75, 'Pattern Recognition Lab', 'CSE 4208', 1),
(76, 'Field Work/Industrial Training', 'CSE 4100', 1),
(77, 'English Language I:Sentence & Their Elements', 'ENG 1101', 0),
(78, 'Discrete Mathematics', 'CSE 1203', 3),
(79, 'English Language III :Reading & Writing', 'ENG 1201', 3),
(80, 'AAA', 'CSE 233', 2);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` tinyint UNSIGNED NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `department_short_name` varchar(35) NOT NULL
);

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_name`, `department_short_name`) VALUES
(1, 'Computer Science and Engineering', 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` smallint UNSIGNED NOT NULL,
  `room_title` varchar(255) NOT NULL,
  `level` tinyint UNSIGNED NOT NULL
);

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_title`, `level`) VALUES
(1, '401', 4),
(2, '402', 4),
(3, '403', 4),
(4, '404', 4),
(5, '405', 4),
(6, '406', 4),
(7, '407', 4),
(8, '408', 4),
(9, '502', 5),
(10, '503', 5),
(11, '509', 5),
(12, '706', 7),
(13, 'Lab1', 0),
(14, 'Lab2', 0),
(15, 'EEE Lab', 0),
(16, '506', 5),
(17, '507', 5),
(18, '508', 5),
(19, '701', 7),
(20, '702', 7),
(21, '703', 7),
(22, '704', 7),
(23, 'Lab1', 0),
(24, 'Lab2', 0),
(25, 'Phy Lab', 0),
(26, 'Chem Lab', 0),
(27, 'Lab1', 0),
(28, 'Lab2', 0),
(29, 'DLD Lab', 0),
(30, 'Lab1', 0),
(31, 'Lab2', 0),
(32, 'Lab1', 0),
(33, 'Lab2', 0),
(34, 'EEE Lab', 0);

-- --------------------------------------------------------

--
-- Table structure for table `routines`
--

CREATE TABLE `routines` (
  `id` int UNSIGNED NOT NULL,
  `semester_id` smallint UNSIGNED NOT NULL,
  `section_id` smallint UNSIGNED NOT NULL,
  `department_id` tinyint UNSIGNED NOT NULL,
  `shift` enum('1st Shift','2nd Shift','Evening Shift') NOT NULL
);

--
-- Dumping data for table `routines`
--

INSERT INTO `routines` (`id`, `semester_id`, `section_id`, `department_id`, `shift`) VALUES
(1, 1, 34, 1, '1st Shift'),
(2, 1, 1, 1, '1st Shift'),
(3, 1, 8, 1, '1st Shift'),
(4, 1, 31, 1, '1st Shift'),
(5, 1, 57, 1, '1st Shift'),
(6, 1, 4, 1, '1st Shift'),
(7, 1, 9, 1, '1st Shift'),
(8, 1, 5, 1, '1st Shift'),
(9, 1, 2, 1, '1st Shift'),
(10, 1, 7, 1, '1st Shift'),
(11, 1, 3, 1, '1st Shift'),
(12, 1, 43, 1, '1st Shift'),
(13, 1, 45, 1, '1st Shift'),
(14, 1, 15, 1, '1st Shift'),
(15, 1, 101, 1, '1st Shift'),
(16, 1, 10, 1, '1st Shift'),
(17, 1, 58, 1, '1st Shift'),
(18, 1, 16, 1, '1st Shift');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `routine_id` int UNSIGNED NOT NULL,
  `course_id` smallint UNSIGNED NOT NULL,
  `teacher_id` smallint UNSIGNED NOT NULL,
  `time_id` tinyint UNSIGNED NOT NULL,
  `room_id` smallint UNSIGNED NOT NULL,
  `day` enum('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL
);

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`routine_id`, `course_id`, `teacher_id`, `time_id`, `room_id`, `day`) VALUES
(1, 38, 13, 1, 1, 'Saturday'),
(2, 4, 3, 1, 2, 'Saturday'),
(3, 6, 4, 1, 3, 'Saturday'),
(4, 24, 14, 1, 6, 'Saturday'),
(5, 30, 6, 1, 7, 'Saturday'),
(6, 1, 19, 1, 8, 'Saturday'),
(7, 5, 9, 1, 9, 'Saturday'),
(8, 5, 2, 1, 10, 'Saturday'),
(9, 3, 5, 1, 13, 'Saturday'),
(10, 3, 20, 1, 14, 'Saturday'),
(9, 5, 2, 1, 9, 'Sunday'),
(11, 78, 5, 1, 11, 'Sunday'),
(6, 4, 3, 1, 20, 'Sunday'),
(12, 20, 22, 1, 13, 'Sunday'),
(2, 7, 18, 1, 26, 'Sunday'),
(13, 39, 13, 5, 1, 'Saturday'),
(14, 14, 7, 5, 2, 'Saturday'),
(8, 4, 7, 5, 3, 'Saturday'),
(15, 56, 3, 5, 4, 'Saturday'),
(10, 4, 7, 5, 5, 'Saturday'),
(11, 1, 19, 5, 6, 'Saturday'),
(16, 1, 22, 5, 7, 'Saturday'),
(3, 9, 3, 5, 8, 'Saturday'),
(17, 45, 10, 5, 9, 'Saturday'),
(18, 15, 7, 5, 10, 'Saturday'),
(6, 5, 2, 5, 11, 'Saturday'),
(2, 3, 5, 5, 13, 'Saturday'),
(1, 27, 13, 2, 1, 'Saturday'),
(2, 1, 19, 2, 2, 'Saturday'),
(9, 8, 17, 2, 3, 'Saturday'),
(10, 5, 16, 2, 5, 'Saturday'),
(4, 21, 21, 2, 6, 'Saturday'),
(5, 50, 10, 2, 7, 'Saturday'),
(6, 4, 5, 2, 8, 'Saturday'),
(7, 8, 17, 2, 9, 'Saturday'),
(8, 9, 23, 2, 10, 'Saturday'),
(16, 6, 4, 2, 11, 'Saturday'),
(11, 3, 5, 2, 13, 'Saturday'),
(3, 3, 20, 2, 14, 'Saturday'),
(13, 36, 19, 3, 1, 'Saturday'),
(2, 8, 17, 3, 2, 'Saturday'),
(9, 4, 10, 3, 3, 'Saturday'),
(10, 5, 10, 3, 5, 'Saturday'),
(11, 6, 10, 3, 6, 'Saturday'),
(5, 45, 22, 3, 7, 'Saturday'),
(3, 1, 7, 3, 8, 'Saturday'),
(17, 30, 9, 3, 9, 'Saturday'),
(8, 6, 4, 3, 10, 'Saturday'),
(16, 8, 17, 3, 11, 'Saturday'),
(6, 3, 5, 3, 13, 'Saturday'),
(7, 3, 20, 3, 14, 'Saturday'),
(4, 25, 14, 3, 15, 'Saturday'),
(13, 28, 22, 4, 1, 'Saturday'),
(2, 2, 5, 4, 2, 'Saturday'),
(9, 1, 14, 4, 3, 'Saturday'),
(10, 9, 3, 4, 5, 'Saturday'),
(11, 5, 2, 4, 6, 'Saturday'),
(3, 6, 4, 4, 8, 'Saturday'),
(17, 45, 10, 4, 9, 'Saturday'),
(7, 5, 9, 4, 10, 'Saturday'),
(6, 6, 13, 4, 11, 'Saturday'),
(8, 3, 6, 4, 27, 'Saturday'),
(16, 3, 20, 4, 33, 'Saturday');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` smallint UNSIGNED NOT NULL,
  `section_name` char(2) NOT NULL
);

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `section_name`) VALUES
(1, '1A'),
(2, '1B'),
(3, '1C'),
(4, '1D'),
(5, '1E'),
(6, '1F'),
(7, '1G'),
(8, '1H'),
(9, '1I'),
(10, '1J'),
(11, '1K'),
(12, '1L'),
(13, '1M'),
(14, '1N'),
(15, '2A'),
(16, '2B'),
(17, '2C'),
(18, '2D'),
(19, '2E'),
(20, '2F'),
(21, '2G'),
(22, '2H'),
(23, '2I'),
(24, '2J'),
(25, '2K'),
(26, '2L'),
(27, '2M'),
(28, '2N'),
(29, '3A'),
(30, '3B'),
(31, '3C'),
(32, '3D'),
(33, '3E'),
(34, '3F'),
(35, '3G'),
(36, '3H'),
(37, '3I'),
(38, '3J'),
(39, '3K'),
(40, '3L'),
(41, '3M'),
(42, '3N'),
(43, '4A'),
(44, '4B'),
(45, '4C'),
(46, '4D'),
(47, '4E'),
(48, '4F'),
(49, '4G'),
(50, '4H'),
(51, '4I'),
(52, '4J'),
(53, '4K'),
(54, '4L'),
(55, '4M'),
(56, '4N'),
(57, '5A'),
(58, '5B'),
(59, '5C'),
(60, '5D'),
(61, '5E'),
(62, '5F'),
(63, '5G'),
(64, '5H'),
(65, '5I'),
(66, '5J'),
(67, '5K'),
(68, '5L'),
(69, '5M'),
(70, '5N'),
(71, '6A'),
(72, '6B'),
(73, '6C'),
(74, '6D'),
(75, '6E'),
(76, '6F'),
(77, '6G'),
(78, '6H'),
(79, '6I'),
(80, '6J'),
(81, '6K'),
(82, '6L'),
(83, '6M'),
(84, '6N'),
(85, '7A'),
(86, '7B'),
(87, '7C'),
(88, '7D'),
(89, '7E'),
(90, '7F'),
(91, '7G'),
(92, '7H'),
(93, '7I'),
(94, '7J'),
(95, '7K'),
(96, '7L'),
(97, '7M'),
(98, '7N'),
(99, '8A'),
(100, '8B'),
(101, '8C'),
(102, '8D'),
(103, '8E'),
(104, '8F'),
(105, '8G'),
(106, '8H'),
(107, '8I'),
(108, '8J'),
(109, '8K'),
(110, '8L'),
(111, '8M'),
(112, '8N');

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `id` smallint UNSIGNED NOT NULL,
  `semester_name` varchar(255) NOT NULL,
  `session` year NOT NULL
);

--
-- Dumping data for table `semesters`
--

INSERT INTO `semesters` (`id`, `semester_name`, `session`) VALUES
(1, 'Fall 2023', '2023');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` smallint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` longtext NOT NULL
);

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `name`, `value`) VALUES
(1, 'HELP', 'What is Lorem Ipsum?\r\n<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has <i>survived</i> not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages');

-- --------------------------------------------------------

--
-- Table structure for table `student_profile`
--

CREATE TABLE `student_profile` (
  `uuid` varchar(32) NOT NULL,
  `department_id` tinyint UNSIGNED NOT NULL,
  `section_id` smallint UNSIGNED NOT NULL,
  `semester_id` smallint UNSIGNED NOT NULL,
  `student_id` varchar(36) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `student_email` varchar(255) DEFAULT NULL,
  `shift_name` enum('1st Shift','2nd Shift','Evening Shift') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(255) NOT NULL
);

--
-- Dumping data for table `student_profile`
--

INSERT INTO `student_profile` (`uuid`, `department_id`, `section_id`, `semester_id`, `student_id`, `student_name`, `student_email`, `shift_name`, `created_at`, `ip`) VALUES
('1696406014298', 1, 1, 1, '11210320654', 'Md. Chanchal Biswas', 'mchanchalbd@gmail.com', '1st Shift', '2023-10-04 13:54:28', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` smallint UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `short_name` varchar(35) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `phone` char(11) NOT NULL
);

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `full_name`, `short_name`, `designation`, `phone`) VALUES
(1, 'Md. Riaz Mahmud', 'RM', 'Lecturer', '01925158914'),
(2, 'Md. Deloar Hossain', 'MDH', 'Lecturer', '01722955229'),
(3, 'Ferdib-Al-Islam', 'FAI', 'Lecturer', '01730584481'),
(4, 'Md. Mahamudul Hasan Khalid', 'MMHK', 'Lecturer', '01742962794'),
(5, 'Abdullah Al Noman', 'AAN', 'Lecturer', '01601160217'),
(6, 'Md. Tahmid Hasan', 'MTH', 'Lecturer', '01747804726'),
(7, 'Md. Toufiqul Islam', 'MTI', 'Lecturer', '01749483808'),
(8, 'Arjan Ghosh', 'AG', 'Lecturer', '01752914949'),
(9, 'Nandita Swanan Mandira', 'NSM', 'Lecturer', '01521314749'),
(10, 'Md. Azizul Islam', 'MAI', 'Lecturer', '01851266902'),
(11, 'Md. Hasibul Islam', 'MHI', 'Lecturer', '01786646636'),
(12, 'Kazi Asif Ahmed', 'KAA', 'Lecturer', '01712831885'),
(13, 'Shahadat Hoshen Moz', 'SHM', 'Lecturer', '01859743490'),
(14, 'Md. Apu Hosen', 'MAH', 'Lecturer', '01948085306'),
(15, 'Partha Protim Gharami', 'PPG', 'Lecturer', '01737208394'),
(16, 'Md. Shamim Parvej', 'MSP', 'Lecturer', '01726779787'),
(17, 'Nuzhat Tabassum', 'NT', 'Lecturer', '01919895282'),
(18, 'Md. Nazim Uddin', 'MNU', 'Lecturer', '01719021062'),
(19, 'Md. Azizul Haque Tousif', 'MAHT', 'Lecturer', '01521422744'),
(20, 'Abid Afsan Hamid', 'MAAH', 'Lecturer', '01518642275'),
(21, 'Vashkar Kar', 'VK', 'Lecturer', '01516784918'),
(22, 'Mahbub E-Elahi', 'MEE', 'Lecturer', '01952986642'),
(23, 'Md. Foyjur Rahman', 'MFR', 'Lecturer', '01921231023'),
(24, 'Chanchal Biswas', 'CB', 'Lecturer', '01921231023');

-- --------------------------------------------------------

--
-- Table structure for table `times`
--

CREATE TABLE `times` (
  `id` tinyint UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
);

--
-- Dumping data for table `times`
--

INSERT INTO `times` (`id`, `start_time`, `end_time`) VALUES
(1, '08:00:00', '09:00:00'),
(2, '09:00:00', '10:00:00'),
(3, '10:00:00', '11:00:00'),
(4, '11:00:00', '12:00:00'),
(5, '12:00:00', '13:00:00'),
(6, '14:00:00', '15:00:00'),
(7, '15:00:00', '16:00:00'),
(8, '16:00:00', '17:00:00'),
(9, '17:00:00', '18:00:00'),
(10, '18:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_routines`
-- (See below for the actual view)
--
CREATE TABLE `view_routines` (
`course_code` varchar(35)
,`course_title` varchar(255)
,`day` enum('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday')
,`department_short_name` varchar(35)
,`end_time` time
,`full_name` varchar(255)
,`room_title` varchar(255)
,`section_name` char(2)
,`semester_name` varchar(255)
,`shift` enum('1st Shift','2nd Shift','Evening Shift')
,`short_name` varchar(35)
,`start_time` time
);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(32) NOT NULL,
  `name` enum('student','teacher') NOT NULL,
  `ip` varchar(255) NOT NULL,
  `data` json NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `uuid`, `name`, `ip`, `data`, `created_at`) VALUES
(1, '1696405895283', 'student', '::1', '{\"section\": \"1A\", \"semester\": \"Fall 2023\", \"department\": \"CSE\", \"section_id\": \"1\", \"shift_name\": \"1st Shift\", \"semester_id\": \"1\", \"department_id\": \"1\"}', '2023-10-04 07:51:35'),
(2, '1696406014298', 'student', '::1', '{\"section\": \"1A\", \"semester\": \"Fall 2023\", \"department\": \"CSE\", \"section_id\": \"1\", \"shift_name\": \"1st Shift\", \"semester_id\": \"1\", \"department_id\": \"1\"}', '2023-10-04 07:53:34'),
(3, '1696406237715', 'teacher', '::1', '{\"teacher\": \"AAN - Abdullah Al Noman\", \"semester\": \"Fall 2023\", \"teacher_id\": \"5\", \"semester_id\": \"1\"}', '2023-10-04 07:57:17'),
(4, '1696414024295', 'student', '::1', '{\"section\": \"1A\", \"semester\": \"Fall 2023\", \"department\": \"CSE\", \"section_id\": \"1\", \"shift_name\": \"1st Shift\", \"semester_id\": \"1\", \"department_id\": \"1\"}', '2023-10-04 10:07:04'),
(5, '1696416631821', 'student', '::1', '{\"section\": \"1A\", \"semester\": \"Fall 2023\", \"department\": \"CSE\", \"section_id\": \"1\", \"shift_name\": \"1st Shift\", \"semester_id\": \"1\", \"department_id\": \"1\"}', '2023-10-04 10:50:31');

-- --------------------------------------------------------

--
-- Structure for view `view_routines`
--
DROP TABLE IF EXISTS `view_routines`;

CREATE VIEW `view_routines`  AS SELECT `t9`.`department_short_name` AS `department_short_name`, `t7`.`semester_name` AS `semester_name`, `t8`.`section_name` AS `section_name`, `t3`.`course_title` AS `course_title`, `t3`.`course_code` AS `course_code`, `t4`.`full_name` AS `full_name`, `t4`.`short_name` AS `short_name`, `t5`.`start_time` AS `start_time`, `t5`.`end_time` AS `end_time`, `t6`.`room_title` AS `room_title`, `t1`.`shift` AS `shift`, `t2`.`day` AS `day` FROM ((((((((`routines` `t1` join `schedules` `t2` on((`t1`.`id` = `t2`.`routine_id`))) join `courses` `t3` on((`t2`.`course_id` = `t3`.`id`))) join `teachers` `t4` on((`t2`.`teacher_id` = `t4`.`id`))) join `times` `t5` on((`t2`.`time_id` = `t5`.`id`))) join `rooms` `t6` on((`t2`.`room_id` = `t6`.`id`))) join `semesters` `t7` on((`t1`.`semester_id` = `t7`.`id`))) join `sections` `t8` on((`t1`.`section_id` = `t8`.`id`))) join `departments` `t9` on((`t1`.`department_id` = `t9`.`id`))) ORDER BY `t5`.`start_time` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routines`
--
ALTER TABLE `routines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD KEY `course_id` (`course_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `time_id` (`time_id`),
  ADD KEY `schedules_ibfk_3` (`routine_id`),
  ADD KEY `schedules_ibfk_4` (`teacher_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_profile`
--
ALTER TABLE `student_profile`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `times`
--
ALTER TABLE `times`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `routines`
--
ALTER TABLE `routines`
  ADD CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `routines_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `routines_ibfk_3` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_4` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_5` FOREIGN KEY (`time_id`) REFERENCES `times` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `student_profile`
--
ALTER TABLE `student_profile`
  ADD CONSTRAINT `student_profile_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `student_profile_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `student_profile_ibfk_3` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
