<?php
session_start();
require_once 'api.php';

if (!isset($_SESSION['user_id']) || !$_SESSION['is_admin']) {
  echo json_encode(['success' => false, 'message' => 'No autorizado']);
  exit;
}

$action = $_GET['action'] ?? ($_POST['action'] ?? '');

if ($action === 'listUsers') {
  $users = listUsers();
  echo json_encode(['success' => true, 'users' => $users]);
  exit;
}

if ($action === 'approveUser') {
  $id = $_POST['professional_id'] ?? '';
  approveUser($id);
  echo json_encode(['success' => true]);
  exit;
}

if ($action === 'deactivateUser') {
  $id = $_POST['professional_id'] ?? '';
  deactivateUser($id);
  echo json_encode(['success' => true]);
  exit;
}

echo json_encode(['success' => false, 'message' => 'Acción no reconocida']);
