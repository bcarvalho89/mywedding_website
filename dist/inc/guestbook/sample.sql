CREATE TABLE IF NOT EXISTS `guestbook` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `message` varchar(450) NOT NULL,
  `ip` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `idx_date_time` (`date_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;