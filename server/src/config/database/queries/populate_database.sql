-- Insérer les fournisseurs
INSERT INTO suppliers (name, contact_email) VALUES
('BBois', 'contact@bbois.fr'),
('MetaLo', 'info@metalo.fr'),
('pPlastique', 'commandes@pplastique.fr');

-- Insérer les matériaux
INSERT INTO materials (name, category, supplier_id, unit, price) VALUES
-- Matériaux de BBois
('frêne', 'bois', (SELECT id FROM suppliers WHERE name = 'BBois'), 'm3', 800.00),
('chêne', 'bois', (SELECT id FROM suppliers WHERE name = 'BBois'), 'm3', 950.00),
('noyer', 'bois', (SELECT id FROM suppliers WHERE name = 'BBois'), 'm3', 1200.00),

-- Matériaux de MetaLo
('acier inoxydable', 'métal', (SELECT id FROM suppliers WHERE name = 'MetaLo'), 'kg', 8.50),
('aluminium', 'métal', (SELECT id FROM suppliers WHERE name = 'MetaLo'), 'kg', 12.00),

-- Matériaux de pPlastique
('plastique', 'plastique', (SELECT id FROM suppliers WHERE name = 'pPlastique'), 'kg', 3.50);

-- Utilisateur admin par défaut
-- Mot de passe : admin123 (haché en production)
INSERT INTO users (email, password, role) VALUES
('admin@furniture.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Quelques exemples de meubles pour les tests
INSERT INTO furniture (name, category, description, width, height, depth, status) VALUES
('Armoire Classique', 'armoire', 'Armoire en bois massif avec portes battantes', 120.0, 200.0, 60.0, 'conception'),
('Étagère Murale', 'étagère', 'Étagère moderne en bois et métal', 80.0, 25.0, 20.0, 'conception');

-- Associer les matériaux aux meubles
INSERT INTO furniture_materials (furniture_id, material_id, quantity, unit) VALUES
-- Armoire Classique (chêne + acier inoxydable pour les charnières)
(1, (SELECT id FROM materials WHERE name = 'chêne'), 0.15, 'm3'),
(1, (SELECT id FROM materials WHERE name = 'acier inoxydable'), 2.5, 'kg'),

-- Étagère Murale (frêne + aluminium pour les supports)
(2, (SELECT id FROM materials WHERE name = 'frêne'), 0.05, 'm3'),
(2, (SELECT id FROM materials WHERE name = 'aluminium'), 1.0, 'kg');

-- Ajouter des mots-clés
INSERT INTO furniture_keywords (furniture_id, keyword) VALUES
(1, 'bois'),
(1, 'classique'),
(1, 'rangement'),
(1, 'chêne'),
(2, 'étagère'),
(2, 'moderne'),
(2, 'mur'),
(2, 'frêne');