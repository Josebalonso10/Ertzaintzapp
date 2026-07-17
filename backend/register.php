<?php
require_once 'api.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => 'Método no permitido']);
  exit;
}

$professional_id = $_POST['professional_id'] ?? '';
$password = $_POST['password'] ?? '';

if ($professional_id === '' || $password === '') {
  echo json_encode(['success' => false, 'message' => 'Faltan datos']);
  exit;
}

if (findUserByProfessionalId($professional_id)) {
  echo json_encode(['success' => false, 'message' => 'El usuario ya existe']);
  exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
createUser($professional_id, $hash, false, false);

echo json_encode(['success' => true]);
