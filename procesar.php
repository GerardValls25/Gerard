<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Aquí puedes enviar un email, guardar en base de datos o mostrar un mensaje.

    echo "<h1>¡Gracias $nombre!</h1>";
    echo "<p>Tu mensaje ha sido recibido:</p>";
    echo "<p>$mensaje</p>";
    echo "<a href='index.html'>Regresar al sitio original</a>";
} else {
    http_response_code(405);
    echo "Método no permitido";
}
?>