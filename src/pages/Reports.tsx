import { useAppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function Reports() {
  const { customers } = useAppContext();

  const riskData = [
    { name: 'Low Risk', value: customers.filter(c => c.riskLevel === 'Low').length, color: '#22c55e' },
    { name: 'Medium Risk', value: customers.filter(c => c.riskLevel === 'Medium').length, color: '#eab308' },
    { name: 'High Risk', value: customers.filter(c => c.riskLevel === 'High').length, color: '#ef4444' },
  ];

  // Mock activity data
  const activityData = [
    { month: 'Jan', onboarding: 4, reviews: 2, edd: 1 },
    { month: 'Feb', onboarding: 7, reviews: 3, edd: 2 },
    { month: 'Mar', onboarding: 5, reviews: 5, edd: 0 },
    { month: 'Apr', onboarding: 3, reviews: 8, edd: 3 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Reports</h1>
        <p className="text-gray-500 mt-1">Analytics and insights on your customer base and workflow efficiency.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Risk Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Risk Distribution</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Activity Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Compliance Activity</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="onboarding" name="Onboardings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reviews" name="Periodic Reviews" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="edd" name="EDD Cases" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
      {/* Summary KPI section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Operational Summary (YTD)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Onboardings</p>
            <p className="text-3xl font-bold text-gray-900">19</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Reviews Completed</p>
            <p className="text-3xl font-bold text-gray-900">18</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Review Completion Rate</p>
            <p className="text-3xl font-bold text-green-600">94.7%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Avg Case Resolution</p>
            <p className="text-3xl font-bold text-gray-900">4.2 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
