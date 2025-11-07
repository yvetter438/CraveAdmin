# 📊 App Store Metrics Tracking - Setup Guide

Your manual App Store tracking system is ready! Here's how to set it up and use it.

---

## 🚀 Quick Setup (3 steps)

### Step 1: Create the Database Table

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Paste this SQL and click **Run**:

```sql
CREATE TABLE IF NOT EXISTS app_store_metrics (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  keyword_ranking INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_app_store_metrics_date ON app_store_metrics(date DESC);
```

### Step 2: Add Your First Entry

Run this SQL to add today's data (update the values):

```sql
INSERT INTO app_store_metrics (date, keyword_ranking, review_count, notes)
VALUES (
  CURRENT_DATE,
  16,           -- Your current ranking
  125,          -- Your current review count
  'Initial tracking entry - started monitoring keyword: food social network'
);
```

### Step 3: Access the Dashboard

Go to: **Dashboard → App Metrics** (in the sidebar)

---

## 🎯 Features

### **1. Current Stats Overview**
- 📊 Current keyword ranking
- ⭐ Total review count  
- 🏆 Best ranking ever achieved
- 📅 Total days tracked

### **2. Visual Trend Charts**
- **Purple chart** = Keyword ranking over time (lower is better)
- **Green chart** = Review count growth over time

### **3. Add New Entries**
Click **"Add Entry"** button to log:
- Date (defaults to today)
- Current ranking position
- Current review count
- Optional notes (e.g., "Launched new feature", "Changed keywords")

### **4. Historical Data Table**
See all your entries with:
- Date
- Ranking position
- Review count  
- Daily changes (↑/↓)
- Your notes
- Delete option

---

## 📈 How to Use

### **Daily Routine:**
1. Check your App Store ranking for your target keyword
2. Check total review count
3. Click **"Add Entry"** in App Metrics
4. Enter today's data
5. Add notes if anything changed

### **Weekly Review:**
- Look at the trend charts
- Are you moving up in rankings?
- Are reviews increasing?
- What changes correlate with improvements?

---

## 💡 Pro Tips

### **Tracking Recommendations:**
- ⏰ Check at the same time each day (rankings fluctuate)
- 📝 Add notes when you:
  - Change keywords
  - Launch new features
  - Run marketing campaigns
  - Get featured
  - Update screenshots/description
- 📊 Track at least weekly (daily is better)

### **Keyword to Track:**
Whatever keyword you're optimizing for, like:
- "food social network"
- "restaurant app"
- "food reviews"
- etc.

### **Best Practices:**
1. **Be consistent** - Same keyword, same time
2. **Add context** - Use notes field to explain changes
3. **Track competitors** - Note if they're doing something different
4. **Celebrate wins** - Note when you hit new best rankings!

---

## 📊 Understanding the Data

### **Ranking Changes:**
- ↑ **Green** = Moved up (better)
- ↓ **Red** = Moved down (worse)
- Example: From #20 to #16 = ↑ 4 positions (good!)

### **Review Growth:**
- **+5 reviews** = You got 5 new reviews since last entry
- Consistent growth = Good app store performance
- Sudden spike = Maybe you got featured or went viral

### **Best Ranking:**
- Your lowest number ever (remember, #1 is best)
- Goal: Beat this number!

---

## 🎨 Visual Guide

### **Charts Show:**
```
Ranking Chart (Purple):
━━━━━━━━━━━━━━━━━━━━━━
Bars go UP when ranking IMPROVES (lower number)
Hover over any bar to see details

Review Chart (Green):
━━━━━━━━━━━━━━━━━━━━━━
Bars go UP when you get more reviews
Should steadily increase over time
```

---

## 🔧 Advanced Features

### **Edit an Entry:**
- Currently: Delete old entry → Add new entry
- Future: Edit feature coming soon

### **Bulk Import:**
If you have historical data, you can bulk import via SQL:

```sql
INSERT INTO app_store_metrics (date, keyword_ranking, review_count, notes) VALUES
  ('2024-11-01', 20, 100, 'Started tracking'),
  ('2024-11-02', 19, 102, 'Small improvement'),
  ('2024-11-03', 18, 105, 'Steady climb');
```

### **Export Data:**
Download your data from Supabase:
1. Go to Table Editor → app_store_metrics
2. Click "Export" → CSV

---

## 📱 Real-World Example

```
Day 1: Ranking #20, 100 reviews
       Note: "Initial entry"

Day 2: Ranking #18, 102 reviews  
       ↑ 2 positions, +2 reviews
       Note: "Updated app description"

Day 3: Ranking #16, 105 reviews
       ↑ 2 positions, +3 reviews
       Note: "Got featured in local food blog"

Day 4: Ranking #16, 108 reviews
       No change, +3 reviews
       Note: "Holding steady"
```

---

## 🎯 Goals to Set

### **Short Term (1 month):**
- Get to #10 for your keyword
- Reach 200 reviews
- Track every day for 30 days

### **Mid Term (3 months):**
- Break into top 5
- 500+ reviews
- Identify what changes improve ranking

### **Long Term (6+ months):**
- Hit #1 for target keyword
- 1000+ reviews  
- Consistent top 3 ranking

---

## 🐛 Troubleshooting

### **Can't see the page?**
- Make sure you ran the SQL to create the table
- Check Supabase service key is in your .env.local
- Refresh the page

### **Charts look weird?**
- Need at least 2 entries to show trends
- Charts show last 30 entries

### **Delete not working?**
- Check Supabase connection
- Make sure service role key has permissions

---

## 📞 Need Help?

Common issues:
- **Database error**: Run the SQL schema again
- **No data showing**: Add your first entry
- **Charts empty**: Add more data points

---

## 🚀 Next Steps

1. ✅ Set up the database table (SQL above)
2. ✅ Add your first entry with today's data
3. ✅ Set a calendar reminder to check daily
4. ✅ Start tracking your progress!

**Your current status: Ranking #16** 🎉

Keep tracking and watch those numbers improve! 📈

