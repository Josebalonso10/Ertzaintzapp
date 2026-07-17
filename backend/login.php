<?php
session_start();
require_once 'api.php';

$method = $_SERVER['REQUEST_METHOD'];

if (isset($_GET['action']) && $_GET['action'] === 'logout') {
  session_destroy();
  echo json_encode(['success' => true]);
  exit;
}

if ($method === 'POST') {
  $professional_id = $_POST['professional_id'] ?? '';
  $password = $_POST['password'] ?? '';

  $user = findUserByProfessionalId($professional_id);
  if (!$user) {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
    exit;
  }
  if (!$user['approved']) {
    echo json_encode(['success' => false, 'message' => 'Usuario pendiente de aprobación']);
    exit;
  }
  if (!password_verify($password, $user['password_hash'])) {
    echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
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
  exit;
}

echo json_encode(['success' => false, 'message' => 'Método no permitido']);
