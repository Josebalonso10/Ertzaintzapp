<?php
function getDb() {
  static $pdo = null;
  if ($pdo) return $pdo;

  $host = getenv('DB_HOST');
  $name = getenv('DB_NAME');
  $user = getenv('DB_USER');
  $pass = getenv('DB_PASS');

  $dsn = "pgsql:host=$host;port=5432;dbname=$name";

  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  return $pdo;
}

function findUserByProfessionalId($professional_id) {
  $db = getDb();
  $stmt = $db->prepare("SELECT * FROM users WHERE professional_id = :professional_id LIMIT 1");
  $stmt->execute([':professional_id' => $professional_id]);
  return $stmt->fetch();
}

function createUser($professional_id, $password_hash, $is_admin = false, $approved = false) {
  $db = getDb();
  $stmt = $db->prepare("
    INSERT INTO users (professional_id, password_hash, is_admin, approved)
    VALUES (:professional_id, :password_hash, :is_admin, :approved)
  ");
  return $stmt->execute([
    ':professional_id' => $professional_id,
    ':password_hash' => $password_hash,
    ':is_admin' => $is_admin ? true : false,
    ':approved' => $approved ? true : false,
  ]);
}

function ensureDefaultAdmin() {
  $existing = findUserByProfessionalId('29023');
  if ($existing) return;

  $hash = password_hash('admin29023', PASSWORD_DEFAULT);
  createUser('29023', $hash, true, true);
}
