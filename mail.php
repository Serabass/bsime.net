<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit;
}

$env = include('env.php');
$con = new mysqli($env['MYSQL_HOST'],
    $env['MYSQL_USER'],
    $env['MYSQL_PASSWORD'],
    $env['MYSQL_DB']
);

$email = $con->escape_string($_POST['email']);
$subject = $con->escape_string($_POST['subject']);
$message = $con->escape_string($_POST['message']);

if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$ip = $con->escape_string($ip);
$values = "'$email', '$subject', '$message', '$ip'";
$q = $con->query('INSERT INTO mail (`email`, `subject`, `message`, `ip`) VALUES ('.$values.')');
$con->close();

header('Location: /');
exit;
