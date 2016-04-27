<?php
/* Message Handler */

require_once("../config.php");


if (isset($_POST["ajax"])) {
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

    // display the error messsage
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
			$statment = $db->prepare("INSERT INTO guestbook (name,message,ip,date_time) VALUES (?,?,?,now())");
			$statment->bind_param("ssi", $name, $message, $ip);

			if(!$result = $statment->execute()){
				die('There was an error running the query [' . $db->error . ']');
			}

			$statment->close();
			$db->close();

			$response = array('success' => true);
		}
	}


} else {
	$response = array('success' => false,'msg' => 'Inválido');
}


echo json_encode($response);
?>