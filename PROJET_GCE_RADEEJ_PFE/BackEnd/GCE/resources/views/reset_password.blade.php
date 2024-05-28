<!DOCTYPE html>
<html>
<head>
    <title>Réinitialisation de mot de passe</title>
</head>
<body>
    <h2>Réinitialisation de mot de passe</h2>
    <p>Bonjour {{ $user->name }},</p>
    <p>Vous avez demandé une réinitialisation de mot de passe. Voici votre nouveau mot de passe :</p>
    <p>Nouveau mot de passe : {{ $newPassword }}</p>
    <p>Assurez-vous de changer ce mot de passe après vous être connecté.</p>
    <p>Si vous n'avez pas demandé cette réinitialisation de mot de passe, veuillez ignorer cet e-mail.</p>
    <p>Cordialement,<br>L'équipe de votre application</p>
</body>
</html>
