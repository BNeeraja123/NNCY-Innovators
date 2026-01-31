import { faqDatabase } from '../data/faqData';

// Normalize text for matching
const normalizeText = (text) => {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
};

// Find best matching FAQ answer
export const findAnswer = (userQuery) => {
  const normalizedQuery = normalizeText(userQuery);
  
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return null;
  }

  let bestMatch = null;
  let bestScore = 0;

  // Search through all categories
  Object.keys(faqDatabase).forEach(category => {
    faqDatabase[category].forEach(faq => {
      // Calculate match score based on keywords
      let score = 0;
      
      faq.keywords.forEach(keyword => {
        if (normalizedQuery.includes(normalizeText(keyword))) {
          score += 10; // High score for keyword match
        }
        // Partial matches
        if (normalizeText(keyword).includes(normalizedQuery) || 
            normalizedQuery.includes(normalizeText(keyword).split(' ')[0])) {
          score += 5;
        }
      });

      // Check question text similarity
      const normalizedQuestion = normalizeText(faq.question);
      const queryWords = normalizedQuery.split(' ');
      
      queryWords.forEach(word => {
        if (word.length > 2 && normalizedQuestion.includes(word)) {
          score += 3;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = {
          question: faq.question,
          answer: faq.answer,
          category: category,
          score: score
        };
      }
    });
  });

  // Only return if we have a reasonable match score
  return bestScore >= 3 ? bestMatch : null;
};

// Get all categories for category-based browsing
export const getCategories = () => {
  return Object.keys(faqDatabase).map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1),
    count: faqDatabase[category].length
  }));
};

// Get FAQs by category
export const getFAQsByCategory = (category) => {
  return faqDatabase[category] || [];
};

// Get random greeting
export const getGreeting = () => {
  const greetings = [
    'Hello! 👋 How can I help you today?',
    'Hi there! 😊 What would you like to know?',
    'Welcome! 🎓 Ask me anything about admissions, events, exams, counseling, or contact details.',
    'Hey! 👋 I\'m here to help. What\'s your question?',
    'Hi! 🌟 Feel free to ask anything about the college.'
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// Get fallback messages
export const getFallbackMessage = () => {
  return `I'm not sure I understood that. I can help with questions about:\n\n📚 Admissions\n🎉 Events\n📝 Exams\n💬 Counseling\n📞 Contact Details\n\nTry asking a specific question!`;
};

// Check if user asked for category
export const detectCategory = (userQuery) => {
  const normalizedQuery = normalizeText(userQuery);
  const categories = getCategories();

  for (const cat of categories) {
    if (normalizedQuery.includes(normalizeText(cat.id))) {
      return cat.id;
    }
  }
  return null;
};

export default {
  findAnswer,
  getCategories,
  getFAQsByCategory,
  getGreeting,
  getFallbackMessage,
  detectCategory
};
