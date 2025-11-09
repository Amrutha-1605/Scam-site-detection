import React, { useState } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, BarChart3, Globe, Lock, Activity } from 'lucide-react';
import UrlAnalyzer from './components/UrlAnalyzer';
import Dashboard from './components/Dashboard';
import FeatureExtractor from './components/FeatureExtractor';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const tabs = [
    { id: 'analyzer', label: 'URL Analyzer', icon: Search },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'features', label: 'Feature Analysis', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ScamShield AI</h1>
                <p className="text-sm text-blue-200">Advanced Threat Detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!analysisResult && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex p-4 bg-blue-600/20 rounded-full mb-6">
                <Shield className="h-16 w-16 text-blue-400" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                AI-Powered Scam Detection
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Protect yourself from phishing attacks and fraudulent websites with our advanced machine learning system. 
                Get real-time analysis with 95%+ accuracy.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">95.7%</div>
                <div className="text-slate-300">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">2.1M+</div>
                <div className="text-slate-300">Sites Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">&lt;2s</div>
                <div className="text-slate-300">Analysis Time</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex space-x-1 bg-white/10 backdrop-blur-md p-1 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {activeTab === 'analyzer' && (
          <div className="space-y-8">
            <UrlAnalyzer onAnalysis={setAnalysisResult} />
            {analysisResult && <ResultsDisplay result={analysisResult} />}
          </div>
        )}
        
        {activeTab === 'dashboard' && <Dashboard />}
        
        {activeTab === 'features' && (
          <FeatureExtractor url={analysisResult?.url || ''} />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">ScamShield AI</span>
          </div>
          <p className="text-slate-400 text-sm">
            Advanced cybersecurity protection powered by artificial intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;