<?php
session_start();
require_once 'api.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => 'Método no permitido']);
  exit;
}

$professional_id = trim($_POST['professional_id'] ?? '');
$password = trim($_POST['password'] ?? '');

if ($professional_id === '' || $password === '') {
  echo json_encode(['success' => false, 'message' => 'Faltan datos']);
  exit;
}

$user = findUserByProfessionalId($professional_id);

if (!$user) {
  echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
  exit;
}

if (!password_verify($password, $user['password_hash'])) {
  echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
  exit;
}

if (!(bool)$user['approved']) {
  echo json_encode(['success' => false, 'message' => 'Usuario pendiente de aprobación']);
  exit;
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['professional_id'] = $user['professional_id'];
$_SESSION['is_admin'] = (bool)$user['is_admin'];

echo json_encode([
  'success' => true,
  'user' => [
    'id' => $user['id'],
    'professional_id' => $user['professional_id'],
    'is_admin' => (bool)$user['is_admin']
  ]
]);
