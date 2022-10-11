CREATE DATABASE IF NOT EXISTS zipCo;

/* Tables to create manually
--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accountType` varchar(64) NOT NULL,
  `creditAmount` varchar(255) NOT NULL,
  `isApproved` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_user_id_foreign` (`user_id`),
  CONSTRAINT `account_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(64) DEFAULT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `monthly_expense` int(11) NOT NULL,
  `monthly_salary` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/