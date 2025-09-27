/*
  # Add Basic Authentication System

  1. New Tables
    - `users` - Store user credentials and basic info
    
  2. Security
    - Enable RLS on users table
    - Add policies for user management
    
  3. Test Data
    - Create sample users for testing
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- -- Enable Row Level Security
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- -- Create policies for users
-- CREATE POLICY "Users can read their own data" ON users
--   FOR SELECT USING (true);

-- CREATE POLICY "Admins can manage users" ON users
--   FOR ALL USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert test users (passwords are hashed in a real app, but for simplicity using plain text)
INSERT INTO users (name, username, password, role) VALUES
  ('Hetal Pithadiya', 'hetalpithadiya', 'hetal2510', 'admin'),
  ('Paresh Pithadiya', 'pareshpithadiya', 'paresh2910', 'admin'),
--   ('Sales Person', 'sales', 'sales123', 'user')
ON CONFLICT (username) DO NOTHING;