-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2025 at 04:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kanban_board`
--

-- --------------------------------------------------------

--
-- Table structure for table `asmjob`
--

CREATE TABLE `asmjob` (
  `AO` int(11) NOT NULL,
  `PARTNUM` varchar(64) DEFAULT NULL,
  `SHIPDATE` date NOT NULL,
  `QTY` smallint(5) UNSIGNED NOT NULL,
  `ASMTIME` decimal(3,1) NOT NULL,
  `complete` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asmjob`
--

INSERT INTO `asmjob` (`AO`, `PARTNUM`, `SHIPDATE`, `QTY`, `ASMTIME`, `complete`) VALUES
(12425, 'SomePart21', '2025-04-01', 82, 13.0, b'0'),
(13067, 'SomePart11', '2025-03-30', 68, 1.0, b'0'),
(15030, 'SomePart23', '2025-04-01', 76, 19.0, b'0'),
(15450, 'SomePart29', '2025-04-02', 32, 10.0, b'0'),
(15691, 'SomePart22', '2025-04-01', 31, 2.0, b'0'),
(19432, 'SomePart4', '2025-03-29', 26, 12.0, b'1'),
(19447, 'SomePart15', '2025-03-31', 78, 16.0, b'0'),
(23054, 'SomePart17', '2025-03-31', 58, 1.0, b'0'),
(23289, 'SomePart3', '2025-03-29', 90, 1.0, b'1'),
(27173, 'SomePart8', '2025-03-30', 58, 8.0, b'0'),
(30101, 'SomePart13', '2025-03-31', 11, 15.0, b'0'),
(31110, 'SomePart5', '2025-03-29', 62, 1.0, b'1'),
(34624, 'SomePart16', '2025-03-31', 63, 11.0, b'0'),
(44632, 'SomePart27', '2025-04-02', 39, 2.0, b'0'),
(46584, 'SomePart25', '2025-04-02', 2, 6.0, b'0'),
(53960, 'SomePart24', '2025-04-01', 62, 20.0, b'0'),
(56435, 'SomePart12', '2025-03-31', 31, 15.0, b'0'),
(58517, 'SomePart20', '2025-04-01', 43, 15.0, b'0'),
(60760, 'SomePart6', '2025-03-30', 37, 4.0, b'0'),
(62880, 'SomePart19', '2025-04-01', 4, 19.0, b'0'),
(64308, 'SomePart9', '2025-03-30', 18, 12.0, b'0'),
(73263, 'SomePart30', '2025-04-02', 33, 13.0, b'0'),
(79322, 'SomePart', '2025-03-29', 2, 15.0, b'1'),
(82907, 'SomePart7', '2025-03-30', 47, 11.0, b'0'),
(85561, 'SomePart10', '2025-03-30', 6, 7.0, b'0'),
(90155, 'SomePart2', '2025-03-29', 98, 18.0, b'0'),
(91307, 'SomePart28', '2025-04-02', 4, 9.0, b'0'),
(92577, 'SomePart26', '2025-04-02', 57, 3.0, b'0'),
(94928, 'SomePart14', '2025-03-31', 74, 18.0, b'0'),
(98280, 'SomePart18', '2025-04-01', 57, 9.0, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `user` varchar(56) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `password`) VALUES
(1, 'asd', 'asd'),
(6, 'bananabread', 'banana'),
(11, 'user2', '$2b$10$sxJS8GYY9QESSObreBu25uRZOPIm.tfQgN3Wq.AkqQfSDETHlVCZW'),
(12, 'user3', '$2b$10$ey.bEwMsOaHlk.2ksk0hIuoYI76.Ny/wRPg/Jd0LNPswZ22wEcHFS'),
(13, 'user4', '$2b$10$MEbsNM.NCO9JULdRD8pG4OjJgG7N2t52wZfHvRw1IY5Sgg3MoOEIO'),
(16, 'future1', '$2b$10$zANJXSzmWO.POF0i6ZAey.TcpAKjMOd20iAvB5649rHOmkORzfY2K'),
(18, 'test1', '$2b$10$.N4oAL6.g28dnEGhcT2pHuMkcaApR9n7PlZhkzXHm0nhJGPNDD6Sm'),
(19, 'banana', '$2b$10$pLTcfEvEMSE4E2VQza3UOOF266mYPSpP7Aw1xyCIG5nIRwvanf05O'),
(20, 'testing', '$2b$10$DrriBAxEvHeXUc5Fm5V.9.t86gx96OijuINPkUrrSwLPqKCh3PHVG'),
(21, 'admin2', '$2b$10$mb2ezeOKHBejU7j8rVBmvuDgm7CddCoAHfVpZCPAKksffGHnh9OD.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asmjob`
--
ALTER TABLE `asmjob`
  ADD PRIMARY KEY (`AO`),
  ADD KEY `DATE` (`SHIPDATE`),
  ADD KEY `PARTNUM` (`PARTNUM`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
