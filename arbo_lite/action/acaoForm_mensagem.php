<?php
require_once($_SERVER['DOCUMENT_ROOT']."class/class.phpmailer.php");
require_once($_SERVER['DOCUMENT_ROOT']."class/class.pop3.php");
require_once($_SERVER['DOCUMENT_ROOT']."class/class.smtp.php");

$nome = (isset($_POST['nome'])) ? $_POST['nome'] : "";
$email = (isset($_POST['email'])) ? $_POST['email'] : "";
$telefone = (isset($_POST['telefone'])) ? $_POST['telefone'] : "";
$mensagem = (isset($_POST['mensagem'])) ? $_POST['mensagem'] : "";

$text_email = "<ul>";
$text_email.= "
	<li><strong>Nome:</strong> $nome</li>
	<li><strong>Email:</strong> $email</li>
	<li><strong>Telefone:</strong> $telefone</li>
	<li><strong>Mensagem:</strong> $mensagem</li>
";
$text_email.= "</ul>";

if(enviaEmail($text_email))
	echo json_encode(array('erro'=>false));
else
	echo json_encode(array('erro'=>true));

function enviaEmail($texto) {
	$mail = new PHPMailer;

	// $mail->isSMTP();
	// $mail->Host = "201.59.158.18"; // HOST SMTP
	// $mail->SMTPAuth = true;
	// $mail->Username = "contato@arbo.eco.br"; // USER SMTP
	// $mail->Password = "123456"; // PASSWORD SMTP
	// $mail->Port = 587;

	$mail->From = "contato@arbo.eco.br";
	$mail->FromName = 'Contato';
	$mail->addAddress("contato@arbo.eco.br");

	$mail->isHTML(true);
	$mail->Subject = 'Nova Mensagem arbo.eco.br - '.date("d")."/".date("m")."/".date("Y");
	$mail->Body = $texto;
	
	return $mail->send();
}