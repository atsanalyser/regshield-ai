import { useAppContext } from '../context/AppContext';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { customers, alerts } = useAppContext();

  const totalCustomers = customers.length;
  const lowRisk = customers.filter(c => c.riskLevel === 'Low').length;
  const mediumRisk = customers.filter(c => c.riskLevel === 'Medium').length;
  const highRisk = customers.filter(c => c.riskLevel === 'High').length;
  const pendingReviews = customers.filter(c => c.status === 'Review pending').length;

  const eddCases = customers.filter(c => c.status === 'EDD required');
  const upcomingReviews = [...customers].sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime()).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Customers" value={totalCustomers} icon={<Users />} color="bg-blue-50 text-blue-600" />
        <StatCard title="Low Risk" value={lowRisk} icon={<CheckCircle />} color="bg-green-50 text-green-600" />
        <StatCard title="Medium Risk" value={mediumRisk} icon={<Clock />} color="bg-yellow-50 text-yellow-600" />
        <StatCard title="High Risk" value={highRisk} icon={<AlertTriangle />} color="bg-red-50 text-red-600" />
        <StatCard title="Pending Reviews" value={pendingReviews} icon={<Clock />} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Recent Compliance Alerts</h2>
            <Link to="/alerts" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {alerts.slice(0, 3).map(alert => (
              <div key={alert.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">{alert.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${alert.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {alert.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{alert.regulator} - {alert.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EDD & Reviews */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-red-600">EDD Cases Requiring Attention</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {eddCases.length === 0 ? (
                <div className="p-5 text-gray-500 text-sm">No EDD cases pending.</div>
              ) : (
                eddCases.map(c => (
                  <div key={c.id} className="p-5 hover:bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{c.name}</p>
                      <p className="text-sm text-gray-500">Risk Score: {c.riskScore}</p>
                    </div>
                    <Link to="/workflow" className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">Action Required</Link>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Upcoming Periodic Reviews</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingReviews.map(c => (
                <div key={c.id} className="p-5 hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-500">Due: {c.nextReviewDate}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{c.riskLevel} Risk</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
