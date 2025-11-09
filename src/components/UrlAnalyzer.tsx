import React, { useState } from 'react';
import { Search, Globe, Loader, AlertTriangle, Shield } from 'lucide-react';

interface UrlAnalyzerProps {
  onAnalysis: (result: any) => void;
}

const UrlAnalyzer: React.FC<UrlAnalyzerProps> = ({ onAnalysis }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeUrl = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract features (simplified version)
    const features = extractFeatures(url);
    
    // Simulate AI classification
    const prediction = classifyUrl(features);
    
    const result = {
      url,
      prediction,
      confidence: prediction.confidence,
      features,
      timestamp: new Date().toISOString(),
      processingTime: Math.random() * 1.5 + 0.5
    };

    setIsAnalyzing(false);
    onAnalysis(result);
  };

  const extractFeatures = (url: string) => {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    return {
      urlLength: url.length,
      domainLength: urlObj.hostname.length,
      hasIpAddress: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlObj.hostname),
      hasHttps: urlObj.protocol === 'https:',
      subdomainCount: urlObj.hostname.split('.').length - 2,
      hasAtSymbol: url.includes('@'),
      hasRedirect: url.includes('//'),
      suspiciousWords: countSuspiciousWords(url),
      domainAge: Math.random() * 365 * 10, // Simulated
      hasPort: urlObj.port !== '',
      pathDepth: urlObj.pathname.split('/').filter(p => p).length,
      queryParams: urlObj.searchParams.toString().length,
      tldLength: urlObj.hostname.split('.').pop()?.length || 0
    };
  };

  const countSuspiciousWords = (url: string) => {
    const suspicious = ['secure', 'account', 'update', 'confirm', 'verify', 'login', 'signin', 'bank', 'paypal'];
    return suspicious.reduce((count, word) => count + (url.toLowerCase().includes(word) ? 1 : 0), 0);
  };

  const classifyUrl = (features: any) => {
    // Simplified ML simulation
    let score = 0.5;

    // URL-based features
    if (features.urlLength > 75) score += 0.15;
    if (features.hasIpAddress) score += 0.25;
    if (!features.hasHttps) score += 0.2;
    if (features.hasAtSymbol) score += 0.3;
    if (features.hasRedirect) score += 0.2;
    if (features.suspiciousWords > 2) score += 0.2;
    if (features.subdomainCount > 3) score += 0.15;
    if (features.domainAge < 30) score += 0.25;

    // Clamp score
    score = Math.max(0, Math.min(1, score));

    const isScam = score > 0.6;
    const confidence = Math.abs(score - 0.5) * 2;

    return {
      label: isScam ? 'Suspicious/Scam' : 'Legitimate',
      confidence: Math.round(confidence * 100),
      riskScore: Math.round(score * 100),
      category: isScam ? 'danger' : 'safe'
    };
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-blue-600/20 rounded-full mb-4">
          <Search className="h-8 w-8 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">URL Security Analysis</h2>
        <p className="text-slate-300">Enter a website URL to analyze for potential security threats</p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com)"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            onKeyPress={(e) => e.key === 'Enter' && analyzeUrl()}
          />
        </div>

        <button
          onClick={analyzeUrl}
          disabled={!url.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Analyzing URL...</span>
            </>
          ) : (
            <>
              <Shield className="h-5 w-5" />
              <span>Analyze Security</span>
            </>
          )}
        </button>

        {/* Quick Examples */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-slate-400 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {['google.com', 'facebook.com', 'suspicious-bank-update.net'].map((example) => (
              <button
                key={example}
                onClick={() => setUrl(example)}
                className="text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-3 py-2 rounded-lg transition-colors duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlAnalyzer;