# 🛡️ Content Moderation Flow Guide

This document explains how to handle reported content in your Crave Admin dashboard.

---

## 📊 Overview

Your admin panel now has **two separate moderation systems**:

1. **Video Approval** (`/dashboard/moderation`) - For NEW uploads
2. **Content Reports** (`/dashboard/reports`) - For REPORTED content

---

## 🎥 1. Video Approval Flow

**Location:** Dashboard → Moderation

### When It Happens:
- User uploads a new video from the mobile app
- Video goes to `pending` status
- Shows up in your moderation queue

### Your Actions:
✅ **Approve** → Video goes live, moves to public bucket  
❌ **Reject** → Video is removed, user is notified

### Process:
```
User Uploads → Pending Queue → You Review → Approve/Reject → Done
```

**Best Practice:** Review videos within 24 hours for best user experience.

---

## 🚩 2. Content Reports Flow

**Location:** Dashboard → Reports

### When It Happens:
- User reports a video, comment, or another user
- Report shows up in your Reports dashboard
- You review and take action

---

## 📹 **Reported Videos Flow**

### What You See:
- Report reason (spam, inappropriate, harassment, etc.)
- Who reported it
- Video description and ID
- When it was reported

### Your Options:

#### Option A: **Dismiss Report** (Keep Video)
```
Click "Dismiss" → Video stays live → Report marked as "Dismissed"
```
**Use when:** Report is invalid, false, or not against guidelines

#### Option B: **Remove Video** (Delete Content)
```
Click "Remove Content" → Video deleted → Report marked as "Resolved"
```
**Use when:** Video violates guidelines and should be removed

### Example Scenarios:

**Scenario 1: False Report**
- User reports video as "inappropriate"
- You review: it's just a normal food video
- **Action:** Dismiss report

**Scenario 2: Valid Report**
- User reports video as "harassment"
- You review: video contains bullying content
- **Action:** Remove content

**Scenario 3: Spam Report**
- Multiple users report same promotional video
- You review: it's clearly spam
- **Action:** Remove content

---

## 💬 **Reported Comments Flow**

### What You See:
- Comment text
- Report reason
- Who reported it
- Which post the comment is on

### Your Options:

#### Option A: **Dismiss Report** (Keep Comment)
```
Click "Dismiss" → Comment stays → Report marked as "Dismissed"
```
**Use when:** Comment doesn't violate guidelines

#### Option B: **Delete Comment** (Remove Content)
```
Click "Remove Content" → Comment deleted → Report marked as "Resolved"
```
**Use when:** Comment violates guidelines

### Example Scenarios:

**Scenario 1: Harsh but Valid Criticism**
- User reports: "This comment is mean!"
- Comment: "This place is overrated"
- **Action:** Dismiss (criticism is allowed)

**Scenario 2: Hate Speech**
- User reports: "harassment"
- Comment: Contains offensive slurs
- **Action:** Delete comment

**Scenario 3: Spam Comments**
- User reports: "spam"
- Comment: "Check out my link!!!"
- **Action:** Delete comment

---

## 👤 **Reported Users Flow** (Future)

Currently, user reports are collected but no automated action is taken.

### Manual Process:
1. View reports about a specific user
2. Check their post/comment history in Supabase
3. Manually ban if needed

### Future Enhancement:
- User profile view in admin panel
- Content history
- Ban/suspend functionality
- Warning system

---

## 🎯 **Report Filters**

### Filter by Status:
- **Pending** - Needs your review (default view)
- **Resolved** - Content was removed
- **Dismissed** - Report was invalid
- **All** - Show everything

### Filter by Type:
- **Videos** - Reported posts
- **Comments** - Reported comments
- **Users** - Reported user accounts
- **All** - Show all types

---

## 📋 **Best Practices**

### Priority Order:
1. **Violence/Safety** - Handle immediately
2. **Harassment** - Review within 24 hours
3. **Spam** - Review within 48 hours
4. **Other** - Review within week

### Decision Guidelines:

#### ✅ Dismiss When:
- Content doesn't violate guidelines
- Reporter misunderstood the rules
- Personal disagreement (not policy violation)
- Competitive reports (rivals flagging each other)

#### ❌ Remove When:
- Clear policy violation
- Illegal content
- Harassment or bullying
- Spam or scams
- Misinformation (if in your policy)

### Gray Areas:
- **Criticism vs Harassment** - Is it attacking the restaurant/food or the person?
- **Satire vs Misinformation** - Is it clearly a joke?
- **Promotion vs Spam** - Is it relevant to the community?

**When in doubt:** Dismiss the report. Better to err on the side of free expression.

---

## 🔄 **Typical Workflow**

### Daily Routine:
1. Check **Reports** page for new flags
2. Review high-priority reports first (violence, safety)
3. Handle video reports
4. Handle comment reports
5. Check **Moderation** page for pending uploads
6. Approve/reject new videos

### Weekly Review:
- Review dismissed reports for patterns
- Check for repeat offenders
- Adjust guidelines if needed
- Monitor false report rates

---

## 📊 **Report Reasons**

### Available Report Categories:

| Reason | Description | Typical Action |
|--------|-------------|----------------|
| **Spam** | Promotional content, repeated posts | Remove |
| **Inappropriate** | Not safe for work, gross content | Review case-by-case |
| **Harassment** | Bullying, targeted attacks | Remove if targeted |
| **Violence** | Graphic content, threats | Remove immediately |
| **Misinformation** | False health/safety claims | Review case-by-case |
| **Copyright** | Stolen content | Investigate & remove |
| **Other** | Anything else | Review case-by-case |

---

## 🚨 **What Happens When You Take Action**

### When You Dismiss a Report:
✅ Report status → "Dismissed"  
✅ Content stays visible  
✅ Reporter is not notified  
✅ Report stays in database for records  

### When You Remove Content:
✅ Report status → "Resolved"  
✅ Video/Comment is deleted from database  
✅ Content owner may be notified (if implemented)  
✅ Video file deleted from storage  

---

## 🔮 **Future Enhancements**

### Planned Features:
- [ ] User profile viewer
- [ ] Ban/suspend users
- [ ] Bulk actions (handle multiple reports at once)
- [ ] Report analytics (most common types, users, etc.)
- [ ] Appeal system (let users contest removals)
- [ ] Automated filtering (AI pre-screening)
- [ ] Warning system (strikes before ban)
- [ ] Community guidelines page

---

## 🎓 **Training Examples**

### Good Moderation:
- ✅ Consistent with guidelines
- ✅ Fair to all users
- ✅ Quick response times
- ✅ Clear reasoning

### Bad Moderation:
- ❌ Arbitrary decisions
- ❌ Favoring certain users
- ❌ Slow response times
- ❌ Over-moderating (removing too much)

---

## 📞 **Edge Cases**

### What if...

**Q: User reports their own content?**  
A: Dismiss the report, they can delete it themselves

**Q: Same content gets reported multiple times?**  
A: Handle once, dismiss duplicates

**Q: Report is in another language?**  
A: Use Google Translate, review carefully

**Q: Uncertain if it violates guidelines?**  
A: Dismiss the report, err on free expression

**Q: Report seems retaliatory?**  
A: Check user history, may need to investigate both parties

---

## 📈 **Success Metrics**

Track these to measure moderation effectiveness:
- Average report resolution time
- % of reports dismissed vs resolved
- Repeat offenders
- False report rate
- User satisfaction (if you do surveys)

---

## 🛠️ **Technical Details**

### Database Schema:
```
reports table:
- id: unique identifier
- target_type: 'post' | 'comment' | 'user'
- target_id: ID of reported content
- reason: report category
- description: user's explanation
- status: 'pending' | 'resolved' | 'dismissed'
- reporter_id: who reported it
- created_at: timestamp
```

### API Endpoints:
- `GET /api/moderator/reports` - Fetch all reports
- `POST /api/moderator/resolve-report` - Dismiss a report
- `POST /api/moderator/reject-post` - Remove a video
- `POST /api/moderator/delete-comment` - Delete a comment

---

## ✅ **Quick Reference**

| Action | When to Use | Result |
|--------|-------------|---------|
| **Dismiss Report** | Invalid/false report | Content stays, report closed |
| **Remove Video** | Video violates rules | Video deleted, report closed |
| **Delete Comment** | Comment violates rules | Comment deleted, report closed |
| **Investigate Later** | Need more context | Mark for follow-up |

---

Need help deciding on a specific report? Consider:
1. Does it violate written guidelines?
2. Is it harmful to users?
3. Would I want my family to see it?
4. Is this consistent with past decisions?

When in doubt, **be conservative** - you can always remove content later if needed.

