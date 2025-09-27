/*
  # Add Tender Management System

  1. New Tables
    - `tenders` - Store tender information with details
    - `tender_products` - Store tender-specific product pricing and localized names
    - Add tender_id to bills table for tender-based billing

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users

  3. Changes
    - Add tender_id column to bills table
    - Add tender_product_id to bill_items table for tender-specific pricing
*/

-- Create tenders table
CREATE TABLE IF NOT EXISTS tenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  tender_number text UNIQUE NOT NULL,
  client_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Completed', 'Cancelled')),
  total_value numeric(15,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tender_products table for tender-specific pricing
CREATE TABLE IF NOT EXISTS tender_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id uuid REFERENCES tenders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  localized_name text NOT NULL,
  tender_price numeric(10,2) NOT NULL,
  quantity_limit integer,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tender_id, product_id)
);

-- Add tender_id to bills table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bills' AND column_name = 'tender_id'
  ) THEN
    ALTER TABLE bills ADD COLUMN tender_id uuid REFERENCES tenders(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add tender_product_id to bill_items table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bill_items' AND column_name = 'tender_product_id'
  ) THEN
    ALTER TABLE bill_items ADD COLUMN tender_product_id uuid REFERENCES tender_products(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tender_products ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can manage tenders" ON tenders
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Users can manage tender products" ON tender_products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tender_products_tender_id ON tender_products(tender_id);
CREATE INDEX IF NOT EXISTS idx_tender_products_product_id ON tender_products(product_id);
CREATE INDEX IF NOT EXISTS idx_bills_tender_id ON bills(tender_id);
CREATE INDEX IF NOT EXISTS idx_bill_items_tender_product_id ON bill_items(tender_product_id);

-- Create triggers for updated_at
CREATE TRIGGER update_tenders_updated_at BEFORE UPDATE ON tenders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tender_products_updated_at BEFORE UPDATE ON tender_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();