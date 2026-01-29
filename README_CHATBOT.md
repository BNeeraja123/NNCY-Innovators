# 🤖 FAQ Chatbot - Quick Reference

## What Is This?

A 24/7 AI-powered FAQ chatbot that answers student questions about:
- 📚 **Admissions** - Application, eligibility, fees
- 🎉 **Events** - Registration, participation, prizes  
- 📝 **Exams** - Schedules, results, rules
- 💬 **Counseling** - Services, career guidance
- 📞 **Contact** - College info, departments

## Where Is It?

**Floating Button**: 💬 on bottom-right of every page
**Demo Page**: Click "Help" in navbar or visit `/chatbot`
**Home Page**: See promotional section

## How to Use It

### Quick Start (30 seconds)

1. Click the 💬 chat button (bottom-right)
2. Type a question like "How do I register for an event?"
3. Get instant answer
4. Ask more questions or browse categories

### Browse FAQs

1. Click the menu icon (three dots)
2. Select a category
3. Browse pre-written FAQs
4. Click any question to see answer

## What Questions Can I Ask?

**Admissions**:
- "How do I apply?"
- "What are the requirements?"
- "Tell me about scholarships"

**Events**:
- "What events are coming?"
- "How do I register?"
- "Are there prizes?"

**Exams**:
- "When are exams?"
- "How do I get my admit card?"
- "When are results?"

**Counseling**:
- "How do I get counseling?"
- "Career guidance?"
- "Who are the counselors?"

**Contact**:
- "What's the college phone?"
- "How do I contact the registrar?"
- "Where's the student portal?"

## Files Overview

| File | Purpose |
|------|---------|
| `FAQChatbot.jsx` | Main chatbot component |
| `faqData.js` | 25 FAQ questions & answers |
| `chatbotLogic.js` | Smart answer matching |
| `ChatbotDemo.jsx` | Help & documentation page |

## For Developers

### Add a New FAQ

Edit `frontend/src/data/faqData.js`:

```javascript
{
  keywords: ['register', 'join', 'signup'],
  question: 'How do I register for an event?',
  answer: 'To register for an event...'
}
```

### Change Colors

Edit `FAQChatbot.jsx` and replace:
- `festival-orange` → Your color
- `festival-magenta` → Your color
- etc.

### Customize Messages

Edit `chatbotLogic.js`:
- `getGreeting()` - Welcome messages
- `getFallbackMessage()` - "No answer found" message

## Start Using Now

```bash
cd campus/frontend
npm run dev
# Open http://localhost:3000
# Click 💬 button on any page
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Chat button not showing | Refresh page, clear cache |
| Answers not matching | Try browsing categories instead |
| Colors look wrong | Verify TailwindCSS is working |
| Mobile not responsive | Test on actual device |

## Documentation

- **Full Guide**: See `CHATBOT_GUIDE.md`
- **Deployment**: See `CHATBOT_DEPLOYMENT.md`
- **Demo Page**: Visit `/chatbot` in your browser
- **Code**: Check comments in component files

## Key Features

✅ Works on all pages automatically
✅ No login required
✅ Instant answers (25 FAQs)
✅ Browse by category
✅ Mobile responsive
✅ Matches site design
✅ Always available (24/7)

## Statistics

- **25 FAQs** across 5 categories
- **0 API calls** (fully client-side)
- **~20KB** file size
- **<100ms** load time impact
- **500ms** response time (with UX delay)

## Next Steps

1. ✅ Access chatbot (bottom-right 💬 button)
2. ✅ Ask a question or browse categories
3. ✅ Provide feedback on answers
4. ✅ Share with other students

## Support

Having issues?
1. Check `/chatbot` demo page
2. Review browser console (F12)
3. Try browsing categories
4. Clear browser cache

---

**Status**: ✅ Live and Ready
**Last Updated**: January 29, 2026
**Version**: 1.0

Happy learning! 🎓
