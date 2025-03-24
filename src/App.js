import React, { useState } from 'react';
import { Search, Copy } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('input');
  const [analysisData, setAnalysisData] = useState(null);

  // Sample news data with URLs
  const sampleNews = [
    {
      title: "Breaking: Major Scientific Discovery",
      text: "Scientists have discovered a new species of tree that can purify air 100 times more effectively than regular trees. The discovery was made in a remote forest and researchers claim this could solve global air pollution within months.",
      category: "Science",
      url: "https://www.nature.com/news" // URL added
    },
    {
      title: "Technology Update",
      text: "A new smartphone app claims to predict earthquakes 24 hours before they happen with 100% accuracy. The app has already been downloaded by millions of users worldwide despite no scientific verification.",
      category: "Technology",
      url: "https://www.technewsworld.com" // URL added
    },
    {
      title: "Health Alert",
      text: "A common household fruit has been found to completely cure all types of headaches instantly, according to a viral social media post. Medical experts are investigating these claims.",
      category: "Health",
      url: "https://www.who.int/news" // URL added
    }
  ];

  // Input Page Component
  const InputPage = () => {
    const [newsText, setNewsText] = useState('');
    const [newsUrl, setNewsUrl] = useState(''); // State for news URL

    const handleSubmit = (e) => {
      e.preventDefault();
      if (newsText.trim()) {
        setAnalysisData({
          newsText,
          newsUrl, // Include news URL in analysis data
          result: {
            verdict: 'Potentially False',
            confidence: 85,
            sources: [
              { url: 'https://www.factchecker.in', title: 'Fact Check: Original Story' },
              { url: 'https://timesofindia.indiatimes.com', title: 'Related Fact Check' }
            ]
          }
        });
        setCurrentPage('result');
      }
    };

    const handleSampleClick = (text, url) => {
      setNewsText(text);
      setNewsUrl(url || ''); // Set news URL when sample is clicked
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-opacity-75 bg-gray-50">
        <div className="w-full max-w-3xl backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            CREDI SCAN - Fake News Detector
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="bg-white/90 rounded-lg shadow-md p-6">
              <textarea
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="Enter the news text you want to verify..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition duration-200"
              >
                <Search size={20} />
                Verify News
              </button>
            </div>
          </form>

          {/* Sample News Section */}
          <div className="bg-white/90 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">CURRENT TRENDING NEWS</h2>
            <div className="space-y-4">
              {sampleNews.map((news, index) => (
                <a 
                  key={index}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{news.title}</h3>
                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {news.category}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleSampleClick(news.text, news.url);
                      }} // Prevent default anchor behavior and handle sample click
                      className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors"
                      title="Copy to input"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{news.text}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Result Page Component
  const ResultPage = () => {
    return (
      <div className="min-h-screen p-4 bg-opacity-75 bg-gray-50">
        <div className="max-w-3xl mx-auto backdrop-blur-sm">
          <button
            onClick={() => setCurrentPage('input')}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            ← Back to Search
          </button>
          
          <div className="bg-white/90 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Analyzed Text</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {analysisData.newsText}
            </p>
            {analysisData.newsUrl && (   // Display news URL if available
              <a
                href={`https://${analysisData.newsUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Source: {analysisData.newsUrl}
              </a>
            )}
          </div>

          <div className="bg-white/90 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Analysis Result</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  Confidence: {analysisData.result.confidence}%
                </span>
              </div>
            </div>

            <div className={`mb-6 p-4 rounded-lg ${
              analysisData.result.verdict === 'Potentially False' 
                ? 'bg-red-50 text-red-700' 
                : 'bg-green-50 text-green-700'
            }`}>
              <h3 className="text-xl font-semibold mb-2">Verdict</h3>
              <p className="text-lg">{analysisData.result.verdict}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Source Links</h3>
              <div className="space-y-2">
                {analysisData.result.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                  >
                    {source.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[url('./image1.jpg')] bg-cover bg-center bg-fixed">
      {currentPage === 'input' ? <InputPage /> : <ResultPage />}
    </div>
  );
}