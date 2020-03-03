module.exports = (token) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<h4>Greetings from Lex </h4>
<p> please click the link below to reset your password </p>
<a href="http://127.0.0.1:3031/users/reset_password/${token}"> Click me :) </a>
</body>
</html>`
};