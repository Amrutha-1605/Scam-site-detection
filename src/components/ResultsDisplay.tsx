import React from 'react';
import { AlertTriangle, CheckCircle, Shield, Clock, Target, Activity } from 'lucide-react';

interface ResultsDisplayProps {
  result: any;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const isScam = result.prediction.category === 'danger';
  
  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className={`rounded-2xl p-8 border-2 ${
        isScam 
          ? 'bg-red-500/10 border-red-500/30 backdrop-blur-md' 
          : 'bg-emerald-500/10 border-emerald-500/30 backdrop-blur-md'
      }`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${
              isScam ? 'bg-red-500/20' : 'bg-emerald-500/20'
            }`}>
              {isScam ? (
                <AlertTriangle className="h-8 w-8 text-red-400" />
              ) : (
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              )}
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                isScam ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {result.prediction.label}
              </h3>
              <p className="text-slate-300 mt-1">
                Analysis completed in {result.processingTime.toFixed(2)}s
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-3xl font-bold ${
              isScam ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {result.confidence}%
            </div>
            <p className="text-slate-400 text-sm">Confidence</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <p className="text-white font-medium mb-2">Analyzed URL:</p>
          <p className="text-slate-300 break-all">{result.url}</p>
        </div>

        {/* Risk Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{result.prediction.riskScore}</div>
            <div className="text-sm text-slate-400">Risk Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <Activity className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{Object.keys(result.features).length}</div>
            <div className="text-sm text-slate-400">Features Analyzed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{result.processingTime.toFixed(1)}s</div>
            <div className="text-sm text-slate-400">Processing Time</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-400" />
          <span>Detailed Security Analysis</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* URL Features */}
          <div className="space-y-4">
            <h5 className="font-medium text-blue-400 mb-3">URL Structure Analysis</h5>
            
            <div className="space-y-3">
              <FeatureItem 
                label="URL Length" 
                value={`${result.features.urlLength} characters`}
                status={result.features.urlLength > 75 ? 'warning' : 'good'}
              />
              <FeatureItem 
                label="HTTPS Security" 
                value={result.features.hasHttps ? 'Enabled' : 'Disabled'}
                status={result.features.hasHttps ? 'good' : 'danger'}
              />
              <FeatureItem 
                label="Subdomain Count" 
                value={result.features.subdomainCount.toString()}
                status={result.features.subdomainCount > 3 ? 'warning' : 'good'}
              />
              <FeatureItem 
                label="Suspicious Words" 
                value={result.features.suspiciousWords.toString()}
                status={result.features.suspiciousWords > 2 ? 'danger' : 'good'}
              />
            </div>
          </div>

          {/* Domain Features */}
          <div className="space-y-4">
            <h5 className="font-medium text-emerald-400 mb-3">Domain Analysis</h5>
            
            <div className="space-y-3">
              <FeatureItem 
                label="Domain Age" 
                value={`${Math.round(result.features.domainAge)} days`}
                status={result.features.domainAge < 30 ? 'danger' : 'good'}
              />
              <FeatureItem 
                label="IP Address Usage" 
                value={result.features.hasIpAddress ? 'Yes' : 'No'}
                status={result.features.hasIpAddress ? 'danger' : 'good'}
              />
              <FeatureItem 
                label="URL Redirects" 
                value={result.features.hasRedirect ? 'Present' : 'None'}
                status={result.features.hasRedirect ? 'warning' : 'good'}
              />
              <FeatureItem 
                label="Path Depth" 
                value={`${result.features.pathDepth} levels`}
                status={result.features.pathDepth > 5 ? 'warning' : 'good'}
              />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h5 className="font-medium text-blue-400 mb-3">Security Recommendations</h5>
          <ul className="space-y-2 text-slate-300">
            {isScam ? (
              <>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>Do not enter personal or financial information on this site</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>Verify the website URL carefully before proceeding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>Consider reporting this site to cybersecurity authorities</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Site appears legitimate, but always verify SSL certificates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Exercise normal web browsing caution</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{
  label: string;
  value: string;
  status: 'good' | 'warning' | 'danger';
}> = ({ label, value, status }) => {
  const statusColors = {
    good: 'text-emerald-400',
    warning: 'text-orange-400',
    danger: 'text-red-400'
  };

  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-slate-300">{label}:</span>
      <span className={`font-medium ${statusColors[status]}`}>{value}</span>
    </div>
  );
};

export default ResultsDisplay;