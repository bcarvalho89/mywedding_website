<?php
require 'phpmailer/PHPMailerAutoload.php';
require 'phpmailer/config.php';

if (!empty($_POST)) {
	$confirmation = $_POST["confirmation"];
	switch ($confirmation) {
		case 'yes':
		$confirmationMsg = "Confirmo minha presença.";
		break;
		case 'maybe':
		$confirmationMsg = "Não tenho certeza se estarei presente.";
		break;
		case 'no':
		$confirmationMsg = "Nâo poderei comparecer.";
		break;
	}

	$message = 'E-mail enviado através do formulário RSVP do site http://brukel.cf. Não responda.\n';
	$message .= 'Resposta do convidado: ' . $confirmationMsg . '\n';
	$message .= 'Pessoas:\n';

	$messageHtml = '<h2>E-mail enviado através do formulário RSVP do site http://brukel.cf. Não responda.</h2>';
	$messageHtml .= '<h3>Resposta do convidado: <small>' . $confirmationMsg . '</small></h3>';
	$messageHtml .= '<h3>Pessoas:</h3>';

	foreach ($_POST["people"] as $key => $value) {
		if ($value["child"] === "0") {
			$message .= 'Nome: ' . $value["name"] .'\n';
			$messageHtml .= '<h4>Nome: <small>' . $value["name"] . '</small></h4>';
		} else {
			$message .= 'Nome: ' . $value["name"] .' (Criança) - ' . $value["age"] . ' anos \n';
			$messageHtml .= '<h4>Nome: <small>' . $value["name"] .' (Criança) - ' . $value["age"] . ' anos</small></h4>';
		}
	}

	$mail = new PHPMailer;

	$mail->isSMTP();
	$mail->Host = $mailConfig['host'];
	$mail->SMTPAuth = true;
	$mail->Username = $mailConfig['username'];
	$mail->Password = $mailConfig['password'];
	$mail->Port = 587;
	//$mail->SMTPSecure  = 'ssl';
	$mail->CharSet = 'UTF-8';
	$mail->SMTPOptions = array(
		'ssl' => array(
			'verify_peer' => false,
			'verify_peer_name' => false,
			'allow_self_signed' => true
			)
		);         

	$mail->From = $mailConfig['from_mail'];
	$mail->FromName = $mailConfig['from_name'];

	foreach ($mailConfig['recipients'] as $value) {
		$mail->addAddress($value);
	}

	$mail->isHTML(true);

	$mail->Subject = $mailConfig['subject'];
	$mail->Body    = $messageHtml;
	$mail->AltBody = $message;

	if(!$mail->send()) {
		$response = array("error" => true, "msg" => $mail->ErrorInfo); 
		echo json_encode($response);
	} else {
		$response = array("success" => true, "msg" => "Sua confirmação foi registrada com sucesso."); 
		echo json_encode($response);
	}

} else {
	header("location:index.php");
}
?>
