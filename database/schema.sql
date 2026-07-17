CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  professional_id VARCHAR(20) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  approved TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario admin inicial 29023 / admin29023 (hash por ejemplo con password_hash en PHP)
INSERT INTO users (professional_id, password_hash, is_admin, approved)
VALUES ('29023', '$2y$10$REEMPLAZAR_POR_HASH', 1, 1);
