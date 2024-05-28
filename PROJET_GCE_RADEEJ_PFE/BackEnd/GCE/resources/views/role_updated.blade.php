<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rôle mis à jour</title>
</head>
<body>
  <p>Bonjour {{ $user->name }},</p>
  <p>Votre rôle a été mis à jour dans notre système. Vous êtes maintenant un(e) {{ $user->role }}.</p>
</body>
</html>
