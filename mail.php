<?php
$enable_captcha = false;
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /?err=1');
    exit;
}
if ($enable_captcha) {
    if (empty($_POST['g-recaptcha-response'])) {
        header('Location: /?err=2');
        exit;
    }

    $captcha_response = $_POST['g-recaptcha-response'];
    if (empty($captcha_response)) {
        header('Location: /?err=3');
        exit;
    }
    $captcha_response = urlencode($captcha_response);
    $remoteip = $_SERVER['REMOTE_ADDR'];

    $secret = file_get_contents('recaptcha_key');

    if ($curl = curl_init()) {
        curl_setopt($curl, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, "secret=$secret&response=$captcha_response&remoteip=$remoteip");
        $out = curl_exec($curl);
        $response = json_decode($out);
        curl_close($curl);

        if (empty($response) || empty($response['success']) || $response['success'] !== TRUE) {
            header('Location: /?err=4');
            exit;
        }
    }
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
$q = $con->query('INSERT INTO mail (`email`, `subject`, `message`, `ip`) VALUES (' . $values . ')');
$con->close();
header('Location: /?err=5');
