# Database Schema for App Store Metrics

## Table: `app_store_metrics`

Run this SQL in your Supabase SQL Editor to create the table:

```sql
-- Create app_store_metrics table
CREATE TABLE IF NOT EXISTS app_store_metrics (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  keyword_ranking INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster date queries
CREATE INDEX idx_app_store_metrics_date ON app_store_metrics(date DESC);

-- Add comment to table
COMMENT ON TABLE app_store_metrics IS 'Manual tracking of App Store keyword ranking and review count';

-- Add column comments
COMMENT ON COLUMN app_store_metrics.date IS 'Date of the metric entry (unique per day)';
COMMENT ON COLUMN app_store_metrics.keyword_ranking IS 'App Store keyword search ranking position';
COMMENT ON COLUMN app_store_metrics.review_count IS 'Total number of app reviews';
COMMENT ON COLUMN app_store_metrics.notes IS 'Optional notes about changes or observations';
```

## Initial Data

To add your first entry (current ranking #16):

```sql
INSERT INTO app_store_metrics (date, keyword_ranking, review_count, notes)
VALUES (
  CURRENT_DATE,
  16,
  0,  -- Replace with your actual review count
  'Initial tracking entry'
);
```

## Row Level Security (Optional)

If you want to secure this table (recommended for production):

```sql
-- Enable RLS
ALTER TABLE app_store_metrics ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role (admin API) to do everything
CREATE POLICY "Service role can do everything"
  ON app_store_metrics
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated admins to read
CREATE POLICY "Admins can read metrics"
  ON app_store_metrics
  FOR SELECT
  TO authenticated
  USING (true);
```

## Useful Queries

### Get latest ranking
```sql
SELECT * FROM app_store_metrics 
ORDER BY date DESC 
LIMIT 1;
```

### Get this week's metrics
```sql
SELECT * FROM app_store_metrics 
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY date DESC;
```

### Calculate average ranking over last 30 days
```sql
SELECT AVG(keyword_ranking) as avg_ranking
FROM app_store_metrics
WHERE date >= CURRENT_DATE - INTERVAL '30 days';
```

### Get best ranking ever
```sql
SELECT MIN(keyword_ranking) as best_ranking, date
FROM app_store_metrics
GROUP BY date
ORDER BY best_ranking ASC
LIMIT 1;
```

### Calculate review growth rate
```sql
WITH daily_reviews AS (
  SELECT 
    date,
    review_count,
    LAG(review_count) OVER (ORDER BY date) as prev_count
  FROM app_store_metrics
  ORDER BY date DESC
  LIMIT 30
)
SELECT 
  date,
  review_count,
  review_count - prev_count as daily_growth
FROM daily_reviews
WHERE prev_count IS NOT NULL;
```

