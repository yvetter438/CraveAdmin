# 📊 Metrics Tracking Guide for Crave

## Current Metrics on Dashboard

Your Overview page now tracks these essential metrics (hardcoded for now):

### ✅ Currently Tracked
- **Total Users** - Total registered users
- **Videos Uploaded** - Total number of videos on platform
- **User Demos** - Number of product demos conducted
- **Customer Interviews** - Number of user research interviews
- **Total Video Minutes** - Cumulative video content (minutes)
- **App Store Ranking** - Position for "Crave" keyword (with/without ads)
- **DAU / MAU** - Daily and Monthly Active Users

---

## 🎯 Additional Metrics You Should Track

### **Engagement & Retention**
- **DAU/MAU Ratio** (Daily Active / Monthly Active) - Stickiness metric, aim for >20%
- **7-Day Retention Rate** - % of users who return after 7 days
- **30-Day Retention Rate** - % of users who return after 30 days
- **Session Duration** - Average time users spend in app per session
- **Sessions per User** - How often users come back each day/week

### **Content Performance**
- **Videos per User** - Average videos uploaded per active user
- **Video Completion Rate** - % of videos watched to the end
- **Engagement Rate** - Likes, comments, shares per video
- **Content Creation Rate** - % of users who upload videos
- **Average Video Length** - Helps understand content trends

### **Growth & Acquisition**
- **New Signups per Week/Month** - User acquisition rate
- **Activation Rate** - % of signups who complete key actions (upload first video, etc.)
- **Referral Rate** - % of users who invite others
- **Viral Coefficient** - How many new users each user brings (aim for >1.0)
- **Churn Rate** - % of users who stop using the app

### **Product Health**
- **Crash Rate** - % of sessions that crash
- **API Error Rate** - Backend reliability
- **Time to Approve Posts** - Moderation speed
- **Content Approval Rate** - % of videos approved vs rejected
- **Report Resolution Time** - How fast you handle reports

### **Business / Marketing**
- **App Store Reviews per Week** - Social proof growth
- **Average Rating** - Quality indicator (aim for 4.5+)
- **App Store Impressions** - How many people see your app
- **Conversion Rate** - App store views → downloads
- **Cost per Install (CPI)** - If running paid ads
- **Social Media Followers** - Brand awareness growth

### **Feature Adoption**
- **Feature X Usage Rate** - % of users using specific features
- **Push Notification Opt-in Rate** - Communication channel
- **Profile Completion Rate** - User investment in platform

---

## 📈 Recommended Weekly Dashboard

### **The Power 5** (Check Daily)
1. **DAU** - Are people using the app?
2. **New Signups** - Are you growing?
3. **Videos Uploaded** - Is content being created?
4. **Crash Rate** - Is the app stable?
5. **Pending Moderation** - Are you keeping up?

### **The North Star Metric** (Weekly Review)
For a social video app, your North Star should likely be:
- **Weekly Active Creators** (users who upload videos)
- OR **Total Minutes of Video Watched** (engagement)

Choose ONE metric that best represents value to users and growth for your business.

---

## 🗄️ Should You Have a Separate Database?

### **Right Now: No**
For your stage (early/pre-product-market-fit), hardcoding metrics is FINE. Here's why:
- ✅ **Speed**: Updates take 10 seconds
- ✅ **Simplicity**: No extra infrastructure
- ✅ **Focus**: You're learning what matters
- ✅ **Flexibility**: Easy to add/remove metrics

### **Later: Yes (When to Switch)**
Build a proper analytics system when:
1. **You're tracking 15+ metrics** - Too tedious to hardcode
2. **You need real-time data** - Hardcoding = stale data
3. **Multiple people need access** - Can't all edit code
4. **You're making data-driven decisions daily** - Need up-to-date numbers
5. **You have >1000 DAU** - Too much data to manually track

### **What to Build Later**
Two approaches:

#### **Option 1: Analytics Service (Recommended)**
Use existing tools instead of building:
- **Mixpanel** / **Amplitude** - User behavior & events
- **Google Analytics** - Web traffic & app downloads
- **Firebase Analytics** - Mobile app analytics
- **Segment** - Collects everything, sends to other tools
- **PostHog** - Open source, self-hosted option

**Pros**: Built-in dashboards, advanced features, proven
**Cons**: Monthly cost ($0-$200+), some learning curve

#### **Option 2: Custom Dashboard**
Build your own analytics with:
- **Separate Postgres Database** for metrics
- **Daily cron jobs** to aggregate Supabase data
- **API endpoints** to serve metrics
- **Chart.js / Recharts** for visualizations

**Pros**: Full control, no monthly fees, custom to your needs
**Cons**: Takes time to build and maintain

---

## 💡 Quick Wins

### **This Week**
1. ✅ **Start tracking the Power 5 manually** - Update your dashboard weekly
2. ✅ **Pick your North Star Metric** - What's the ONE number that matters most?
3. ✅ **Set weekly goals** - e.g., "Get to 50 DAU by end of month"

### **Next Month**
1. Add **7-day retention** tracking (manually query Supabase)
2. Set up **Google Analytics** for app store page
3. Create a **weekly metrics review habit** (every Monday)

### **When You Hit 500 Users**
1. Set up **Mixpanel** or **Amplitude**
2. Instrument key events (signup, video upload, share, etc.)
3. Build automated weekly email digest of key metrics

---

## 🎯 Action Items

### **Immediate**
- [ ] Update hardcoded metrics on your dashboard weekly
- [ ] Take screenshots of your metrics each week (for historical reference)
- [ ] Post metrics in a Notion/Docs for team visibility

### **This Month**
- [ ] Decide on your North Star Metric
- [ ] Query Supabase for actual DAU/MAU numbers
- [ ] Set up basic SQL queries for key metrics

### **Future (500+ users)**
- [ ] Evaluate Mixpanel vs Amplitude vs PostHog
- [ ] Set up event tracking in your mobile app
- [ ] Build automated dashboard (or use external tool)

---

## 📚 Resources

### **Learn About Metrics**
- [Lean Analytics](https://leananalyticsbook.com/) - Best book on startup metrics
- [Andrew Chen's Blog](https://andrewchen.com/) - Growth & metrics insights
- [First Round Review](https://review.firstround.com/) - Great metric frameworks

### **Metric Definitions**
- **DAU**: Unique users who open app in 24 hours
- **MAU**: Unique users who open app in 30 days
- **Retention**: % of users who return after X days
- **Churn**: % of users who stop using the app
- **Stickiness**: DAU/MAU ratio (higher = more engaged)

---

**Remember**: Early stage = focus on learning, not tracking. Track what helps you make decisions, ignore vanity metrics. 🚀

