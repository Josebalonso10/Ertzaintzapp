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

function updateUserPassword($professional_id, $password_hash, $is_admin = null, $approved = null) {
  $db = getDb();
  $sql = "UPDATE users SET password_hash = :password_hash";
  $params = [
    ':professional_id' => $professional_id,
    ':password_hash' => $password_hash
  ];

  if ($is_admin !== null) {
    $sql .= ", is_admin = :is_admin";
    $params[':is_admin'] = $is_admin ? true : false;
  }

  if ($approved !== null) {
    $sql .= ", approved = :approved";
    $params[':approved'] = $approved ? true : false;
  }

  $sql .= " WHERE professional_id = :professional_id";

  $stmt = $db->prepare($sql);
  return $stmt->execute($params);
}

function ensureDefaultAdmin() {
  $hash = password_hash('admin29023', PASSWORD_DEFAULT);
  $existing = findUserByProfessionalId('29023');

  if (!$existing) {
    createUser('29023', $hash, true, true);
    return;
  }

  if (
    empty($existing['password_hash']) ||
    !password_verify('admin29023', $existing['password_hash']) ||
    !(bool)$existing['is_admin'] ||
    !(bool)$existing['approved']
  ) {
    updateUserPassword('29023', $hash, true, true);
  }
}
