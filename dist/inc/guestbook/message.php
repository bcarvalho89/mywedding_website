<?php
/* Message Handler */

require_once("../config.php");




if (isset($_POST["insert"])) {
	$response = array('success' => true);

	// assigning the $_POST values to varaible
	$name = trim($db->escape_string($_POST["name"]));
	$message = trim($db->escape_string($_POST["message"]));
	$ip = ip2long($_SERVER["REMOTE_ADDR"]);

	// if the validate false, it will concatinate the error message
	if($name == '') { 
		$response['success'] = false; 
		$response['msg'][] = 'Digite seu nome';
	}
	if($message == '') { 
		$response['success'] = false; 
		$response['msg'][] = 'Digite sua mensagem';
	}

    // display the error message
	if(!$response["success"]) { 
		echo json_encode($response);
		die;
	}

    // if there is no error message,  inserts into database
	if($response["success"]) { 

		// Check if has a message for this IP
		$statement = $db->prepare("SELECT ip FROM guestbook WHERE ip = ?");
		$statement->bind_param("i", $ip);
		$statement->execute();
		$statement->store_result();

		if ($statement->num_rows > 0) {
			$response['success'] = false;
			$response['msg'][] = 'Já foi enviada uma mensagem com o mesmo endereço de IP';

			$db->close();
		} else {
			$statement = $db->prepare("INSERT INTO guestbook (name,message,ip,date_time) VALUES (?,?,?,now())");
			$statement->bind_param("ssi", $name, $message, $ip);

			if(!$result = $statement->execute()){
				die('There was an error running the query [' . $db->error . ']');
			}

			$statement->close();
			$db->close();

			$response = array('success' => true);
		}
	}


} else if (isset($_GET["select"])) {

	$pageNum = $_GET['page'];

	$offset = ($pageNum - 1) * $rowsPerPage;
	$results = '';

	$query = "SELECT name,message,date_time FROM guestbook ORDER by date_time DESC LIMIT $offset, $rowsPerPage";

	if ($statement = $db->prepare($query)) {
		/* execute statement */
		$statement->execute();

		/* bind result variables */
		$statement->bind_result($name, $message, $date_time);

		/* fetch values */
		while ($statement->fetch()) {
			$phpdate = strtotime( $date_time );
			$date_time = date( 'd/m/Y', $phpdate );

			$results[] = array(
				'name' => $name,
				'message' => $message,
				'date_time' => $date_time
				);
		}

		if ($results == '') {
			$response = array('success' => false);
		} else {
			$response = array('success' => true, 'data' => $results, 'page' => $pageNum);
		}


		$statement->free_result();

		/* close statement */
		$statement->close();
	}

	$db->close();
}


else {
	$response = array('success' => false,'msg' => 'Inválido');
}


echo json_encode($response);
?>