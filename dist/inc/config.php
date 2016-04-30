<?php
/* Config PHP */

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'website');

$messagesPerPage = 3;


$db = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if ($db->connect_errno) {
	echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}

function title($title) {
	$output = "<div class=\"container-fluid title\">
	<div class=\"container\">
		<h2>". $title ."</h2>
	</div>
	<div class=\"line\"></div>
</div>";

echo $output;
}


?>