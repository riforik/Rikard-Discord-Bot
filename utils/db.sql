-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 20, 2019 at 01:31 PM
-- Server version: 10.2.24-MariaDB-log-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rikarddiscordbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `customCmds`
--

CREATE TABLE `customCmds` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `server_id` varchar(50) NOT NULL,
  `details` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `userID` int(100) NOT NULL,
  `reason` text NOT NULL,
  `rUsername` text NOT NULL,
  `rID` int(100) NOT NULL,
  `time` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customCmds`
--
ALTER TABLE `customCmds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customCmds`
--
ALTER TABLE `customCmds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
