import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Shield, Globe, Users, Clock, Target } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = {
    totalScanned: 2147483,
    threatsBlocked: 86421,
    accuracyRate: 95.7,
    avgResponseTime: 1.2
  };

  const recentThreats = [
    { url: 'phishing-bank-update.com', risk: 92, time: '2 min ago' },
    { url: 'fake-paypal-security.net', risk: 88, time: '5 min ago' },
    { url: 'suspicious-login-amazon.org', risk: 95, time: '8 min ago' },
    { url: 'scam-crypto-investment.co', risk: 89, time: '12 min ago' },
  ];

  const weeklyData = [
    { day: 'Mon', scanned: 42000, threats: 1200 },
    { day: 'Tue', scanned: 38000, threats: 1100 },
    { day: 'Wed', scanned: 45000, threats: 1400 },
    { day: 'Thu', scanned: 41000, threats: 1300 },
    { day: 'Fri', scanned: 48000, threats: 1600 },
    { day: 'Sat', scanned: 35000, threats: 900 },
    { day: 'Sun', scanned: 32000, threats: 800 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Security Dashboard</h2>
        <p className="text-slate-300">Real-time threat detection and system performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Globe}
          title="Sites Scanned"
          value={stats.totalScanned.toLocaleString()}
          change="+12.5%"
          changeType="positive"
          color="blue"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Threats Blocked"
          value={stats.threatsBlocked.toLocaleString()}
          change="+8.3%"
          changeType="positive"
          color="red"
        />
        <MetricCard
          icon={Target}
          title="Accuracy Rate"
          value={`${stats.accuracyRate}%`}
          change="+0.2%"
          changeType="positive"
          color="emerald"
        />
        <MetricCard
          icon={Clock}
          title="Avg Response"
          value={`${stats.avgResponseTime}s`}
          change="-0.1s"
          changeType="positive"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Analysis Chart */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <span>Weekly Analysis</span>
            </h3>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-300">Scanned</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-300">Threats</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{day.day}</span>
                  <span className="text-white">{day.scanned.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full relative"
                      style={{ width: `${(day.scanned / 50000) * 100}%` }}
                    >
                      <div 
                        className="absolute top-0 right-0 bg-red-500 h-2 rounded-r-full"
                        style={{ width: `${(day.threats / day.scanned) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Threats */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span>Recent Threats Detected</span>
          </h3>
          
          <div className="space-y-4">
            {recentThreats.map((threat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium truncate flex-1 mr-4">
                    {threat.url}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.risk > 90 ? 'bg-red-500/20 text-red-400' :
                      threat.risk > 80 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {threat.risk}% Risk
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mr-4">
                    <div 
                      className={`h-1.5 rounded-full ${
                        threat.risk > 90 ? 'bg-red-500' :
                        threat.risk > 80 ? 'bg-orange-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${threat.risk}%` }}
                    ></div>
                  </div>
                  <span className="text-slate-400 text-sm whitespace-nowrap">
                    {threat.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-emerald-400" />
          <span>System Status</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusItem
            title="AI Model Status"
            status="Operational"
            uptime="99.9%"
            color="emerald"
          />
          <StatusItem
            title="Database Performance"
            status="Optimal"
            uptime="100%"
            color="blue"
          />
          <StatusItem
            title="API Response Time"
            status="Fast"
            uptime="99.8%"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  color: string;
}> = ({ icon: Icon, title, value, change, changeType, color }) => {
  const colorClasses = {
    blue: 'text-blue-400 bg-blue-500/20',
    red: 'text-red-400 bg-red-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={`flex items-center space-x-1 text-xs ${
          changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
        }`}>
          <TrendingUp className="h-3 w-3" />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
        <p className="text-slate-400 text-sm">{title}</p>
      </div>
    </div>
  );
};

const StatusItem: React.FC<{
  title: string;
  status: string;
  uptime: string;
  color: string;
}> = ({ title, status, uptime, color }) => {
  const colorClasses = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  return (
    <div className="text-center">
      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${
        color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
        color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
        'bg-purple-500/20 text-purple-400'
      }`}>
        {status}
      </div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      <p className="text-slate-400 text-sm">{uptime} uptime</p>
    </div>
  );
};

export default Dashboard;