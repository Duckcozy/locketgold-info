ALTER TABLE plans ADD COLUMN old_price INTEGER CHECK (old_price IS NULL OR old_price >= 0);
