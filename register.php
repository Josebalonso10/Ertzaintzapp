<?php
require_once 'api.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $professional_id = $_POST['professional_id'] ?? '';
  $password = $_POST['password'] ?? '';

  if ($professional_id === '' || $password === '') {
    echo json_encode(['success' => false, 'message' => 'Campos obligatorios']);
    exit;
  }

  if (findUserByProfessionalId($professional_id)) {
    echo json_encode(['success' => false, 'message' => 'Usuario ya existe']);
    exit;
  }

  $hash = password_hash($password, PASSWORD_DEFAULT);
  $ok = createUser($professional_id, $hash, 0); // no admin, no aprobado aún

  if ($ok) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Error de alta']);
  }
  exit;
}

echo json_encode(['success' => false, 'message' => 'Método no permitido']);
