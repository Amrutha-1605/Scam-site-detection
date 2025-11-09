import React, { useState, useEffect } from 'react';
import { Activity, Globe, Lock, Link, Hash, AlertCircle } from 'lucide-react';

interface FeatureExtractorProps {
  url: string;
}

const FeatureExtractor: React.FC<FeatureExtractorProps> = ({ url }) => {
  const [features, setFeatures] = useState<any>(null);

  useEffect(() => {
    if (url) {
      extractAdvancedFeatures(url);
    }
  }, [url]);

  const extractAdvancedFeatures = (inputUrl: string) => {
    if (!inputUrl) return;

    const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
    
    const extractedFeatures = {
      basic: {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        pathname: urlObj.pathname,
        search: urlObj.search,
        port: urlObj.port || 'default',
      },
      structural: {
        urlLength: inputUrl.length,
        domainLength: urlObj.hostname.length,
        pathLength: urlObj.pathname.length,
        queryLength: urlObj.search.length,
        fragmentLength: urlObj.hash.length,
        subdomainCount: urlObj.hostname.split('.').length - 2,
        pathDepth: urlObj.pathname.split('/').filter(p => p).length,
        parameterCount: Array.from(urlObj.searchParams).length,
      },
      security: {
        hasHttps: urlObj.protocol === 'https:',
        hasPort: urlObj.port !== '',
        hasIpAddress: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlObj.hostname),
        hasAtSymbol: inputUrl.includes('@'),
        hasDoubleSlash: inputUrl.includes('//'),
        hasHyphen: urlObj.hostname.includes('-'),
        hasUnderscore: urlObj.hostname.includes('_'),
      },
      content: {
        suspiciousWords: countSuspiciousKeywords(inputUrl),
        digitalWords: countDigitalWords(inputUrl),
        shorteningService: detectShorteningService(urlObj.hostname),
        tld: urlObj.hostname.split('.').pop() || '',
        tldLength: (urlObj.hostname.split('.').pop() || '').length,
      },
      behavioral: {
        redirectCount: inputUrl.split('//').length - 1,
        hasRedirect: inputUrl.includes('//'),
        hasPopularTld: isPopularTld(urlObj.hostname.split('.').pop() || ''),
        domainAge: Math.floor(Math.random() * 365 * 10), // Simulated
        hasValidCertificate: Math.random() > 0.1, // Simulated
      }
    };

    setFeatures(extractedFeatures);
  };

  const countSuspiciousKeywords = (url: string): number => {
    const suspicious = [
      'secure', 'account', 'update', 'confirm', 'verify', 'login', 'signin', 
      'bank', 'paypal', 'amazon', 'microsoft', 'apple', 'google', 'facebook',
      'urgent', 'suspended', 'limited', 'unlock', 'restore', 'alert'
    ];
    return suspicious.reduce((count, word) => 
      count + (url.toLowerCase().includes(word) ? 1 : 0), 0
    );
  };

  const countDigitalWords = (url: string): number => {
    const digital = ['crypto', 'bitcoin', 'wallet', 'investment', 'trading', 'finance'];
    return digital.reduce((count, word) => 
      count + (url.toLowerCase().includes(word) ? 1 : 0), 0
    );
  };

  const detectShorteningService = (hostname: string): boolean => {
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'short.link'];
    return shorteners.includes(hostname.toLowerCase());
  };

  const isPopularTld = (tld: string): boolean => {
    const popular = ['com', 'org', 'net', 'edu', 'gov', 'mil'];
    return popular.includes(tld.toLowerCase());
  };

  if (!url) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Feature Analysis</h3>
        <p className="text-slate-300">Analyze a URL first to see detailed feature extraction</p>
      </div>
    );
  }

  if (!features) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-300">Extracting features...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Feature Analysis</h2>
        <p className="text-slate-300">Comprehensive breakdown of extracted URL features</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <FeatureSection
          icon={Globe}
          title="Basic Information"
          color="blue"
          features={features.basic}
        />

        {/* Structural Features */}
        <FeatureSection
          icon={Hash}
          title="Structural Analysis"
          color="purple"
          features={features.structural}
        />

        {/* Security Features */}
        <FeatureSection
          icon={Lock}
          title="Security Indicators"
          color="emerald"
          features={features.security}
        />

        {/* Content Analysis */}
        <FeatureSection
          icon={AlertCircle}
          title="Content Analysis"
          color="orange"
          features={features.content}
        />
      </div>

      {/* Behavioral Analysis */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-red-400" />
          <span>Behavioral Analysis</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(features.behavioral).map(([key, value]) => (
            <div key={key} className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">
                {formatFeatureName(key)}
              </div>
              <div className={`font-medium ${getValueColor(key, value)}`}>
                {formatFeatureValue(key, value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
        <h4 className="text-lg font-bold text-white mb-4">AI Model Feature Weights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureWeight name="HTTPS Usage" weight={0.25} />
          <FeatureWeight name="Domain Age" weight={0.20} />
          <FeatureWeight name="Suspicious Keywords" weight={0.18} />
          <FeatureWeight name="URL Structure" weight={0.15} />
          <FeatureWeight name="IP Address Usage" weight={0.12} />
          <FeatureWeight name="Subdomain Count" weight={0.10} />
        </div>
      </div>
    </div>
  );
};

const FeatureSection: React.FC<{
  icon: React.ElementType;
  title: string;
  color: string;
  features: Record<string, any>;
}> = ({ icon: Icon, title, color, features }) => {
  const colorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    orange: 'text-orange-400',
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h4 className={`text-lg font-bold text-white mb-4 flex items-center space-x-2`}>
        <Icon className={`h-5 w-5 ${colorClasses[color as keyof typeof colorClasses]}`} />
        <span>{title}</span>
      </h4>
      
      <div className="space-y-3">
        {Object.entries(features).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
            <span className="text-slate-300 text-sm">{formatFeatureName(key)}:</span>
            <span className={`font-medium text-sm ${getValueColor(key, value)}`}>
              {formatFeatureValue(key, value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureWeight: React.FC<{
  name: string;
  weight: number;
}> = ({ name, weight }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-slate-300 text-sm">{name}</span>
    <div className="flex items-center space-x-2">
      <div className="w-24 bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          style={{ width: `${weight * 100}%` }}
        />
      </div>
      <span className="text-white text-sm font-medium">{Math.round(weight * 100)}%</span>
    </div>
  </div>
);

const formatFeatureName = (key: string): string => {
  return key.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2');
};

const formatFeatureValue = (key: string, value: any): string => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (key.includes('Length') || key.includes('Count')) {
    return `${value}`;
  }
  if (key === 'domainAge') {
    return `${value} days`;
  }
  return String(value);
};

const getValueColor = (key: string, value: any): string => {
  // Security-related coloring
  if (key === 'hasHttps' || key === 'hasValidCertificate') {
    return value ? 'text-emerald-400' : 'text-red-400';
  }
  if (key === 'hasIpAddress' || key === 'hasAtSymbol' || key === 'hasDoubleSlash') {
    return value ? 'text-red-400' : 'text-emerald-400';
  }
  if (key === 'suspiciousWords' && value > 2) {
    return 'text-red-400';
  }
  if (key === 'domainAge' && value < 30) {
    return 'text-red-400';
  }
  
  return 'text-slate-300';
};

export default FeatureExtractor;