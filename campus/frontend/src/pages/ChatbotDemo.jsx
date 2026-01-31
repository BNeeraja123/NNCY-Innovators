import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getFAQsByCategory } from '../utils/chatbotLogic';

export default function ChatbotDemo() {
  const navigate = useNavigate();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-primary-light text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:text-gray-200 transition flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl font-bold mb-4">FAQ Chatbot</h1>
          <p className="text-xl text-white/90">
            Ask questions about admissions, events, exams, counseling, and more. Your virtual assistant is here 24/7!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* How to Use */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Chatbot</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-gray-900 mb-2">Ask a Question</h3>
              <p className="text-gray-600 text-sm">Type your question about admissions, events, exams, counseling, or contact details.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-secondary">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold text-gray-900 mb-2">Browse Categories</h3>
              <p className="text-gray-600 text-sm">Can't find what you want? Browse by category and select from pre-written FAQs.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary-dark">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Instant Answers</h3>
              <p className="text-gray-600 text-sm">Get immediate responses to your questions with relevant information.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary-light">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-gray-900 mb-2">Always Available</h3>
              <p className="text-gray-600 text-sm">Access the chatbot from any page on the website, 24/7.</p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse FAQs by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Sample Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sample Questions You Can Ask</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-primary mb-4">📚 Admissions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">"How do I apply for admission?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">"What are the eligibility criteria?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">"Tell me about scholarships"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">"What documents do I need?"</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-secondary mb-4">🎉 Events</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-gray-700">"What events are coming up?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-gray-700">"How do I register for an event?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-gray-700">"Are there registration fees?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-gray-700">"Can I participate in a team?"</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-primary-dark mb-4">📝 Exams</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-dark mt-1">•</span>
                    <span className="text-gray-700">"When are the exams scheduled?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-dark mt-1">•</span>
                    <span className="text-gray-700">"How do I get my admit card?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-dark mt-1">•</span>
                    <span className="text-gray-700">"When will results be published?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-dark mt-1">•</span>
                    <span className="text-gray-700">"Can I request a revaluation?"</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-primary-light mb-4">💬 Other</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-light mt-1">•</span>
                    <span className="text-gray-700">"How do I access counseling?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-light mt-1">•</span>
                    <span className="text-gray-700">"What's the college contact?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-light mt-1">•</span>
                    <span className="text-gray-700">"Career guidance services?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-light mt-1">•</span>
                    <span className="text-gray-700">"How do I file a grievance?"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Better Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-primary">
              <h3 className="font-bold text-gray-900 mb-3">✓ Do This</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Ask clear, specific questions</li>
                <li>• Use keywords like "admission", "event", "exam"</li>
                <li>• Browse categories if unsure</li>
                <li>• Ask follow-up questions for more details</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-secondary">
              <h3 className="font-bold text-gray-900 mb-3">✗ Avoid This</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Too vague questions ("hello", "hi")</li>
                <li>• Multiple questions at once</li>
                <li>• Questions completely off-topic</li>
                <li>• Expecting replies outside FAQ scope</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-white/90">Look for the chat bubble in the bottom-right corner of any page!</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-white text-secondary font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Go Back to Website
          </button>
        </section>
      </main>
    </div>
  );
}

// Category Card Component
function CategoryCard({ category }) {
  const faqs = getFAQsByCategory(category.id);
  const icons = {
    admissions: '📚',
    events: '🎉',
    exams: '📝',
    counseling: '💬',
    contact: '📞'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <h3 className="text-2xl font-bold">{icons[category.id]} {category.name}</h3>
        <p className="text-white/80">{category.count} frequently asked questions</p>
      </div>

      {/* FAQs List */}
      <div className="p-6">
        <ul className="space-y-3">
          {faqs.slice(0, 3).map((faq, idx) => (
            <li key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <span className="text-primary font-bold mt-1">Q</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{faq.question}</p>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">{faq.answer}</p>
              </div>
            </li>
          ))}
        </ul>
        {faqs.length > 3 && (
          <p className="text-sm text-primary font-semibold mt-4">
            + {faqs.length - 3} more questions in this category
          </p>
        )}
      </div>
    </div>
  );
}
