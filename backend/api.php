<?php
function getDb() {
  static $pdo;
  if ($pdo) return $pdo;

  $host = getenv('DB_HOST') ?: 'localhost';
  $name = getenv('DB_NAME') ?: 'ertzaintza';
  $user = getenv('DB_USER') ?: 'root';
  $pass = getenv('DB_PASS') ?: '';

  $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $pdo;
}

function findUserByProfessionalId($id) {
  $db = getDb();
  $stmt = $db->prepare('SELECT * FROM users WHERE professional_id = ?');
  $stmt->execute([$id]);
  return $stmt->fetch(PDO::FETCH_ASSOC);
}

function createUser($professional_id, $hash, $is_admin = 0) {
  $db = getDb();
  $stmt = $db->prepare('INSERT INTO users (professional_id, password_hash, is_admin, approved) VALUES (?, ?, ?, 0)');
  return $stmt->execute([$professional_id, $hash, $is_admin]);
}

function listUsers() {
  $db = getDb();
  $stmt = $db->query('SELECT professional_id, is_admin, approved FROM users ORDER BY professional_id');
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function approveUser($professional_id) {
  $db = getDb();
  $stmt = $db->prepare('UPDATE users SET approved = 1 WHERE professional_id = ?');
  return $stmt->execute([$professional_id]);
}

function deactivateUser($professional_id) {
  $db = getDb();
  $stmt = $db->prepare('UPDATE users SET approved = 0 WHERE professional_id = ?');
  return $stmt->execute([$professional_id]);
}
