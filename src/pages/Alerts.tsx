import { useAppContext } from '../context/AppContext';
import { AlertCircle, AlertTriangle, Info, Calendar } from 'lucide-react';

export default function Alerts() {
  const { alerts } = useAppContext();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Regulatory Alerts</h1>
        <p className="text-gray-500 mt-1">Monitor changing regulations and assess impact on operational compliance.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {alerts.map(alert => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors flex space-x-5">
              <div className="flex-shrink-0 mt-1">
                {alert.impact === 'High' ? (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                ) : alert.impact === 'Medium' ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Info className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    alert.impact === 'High' ? 'bg-red-100 text-red-700' :
                    alert.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {alert.impact} Impact
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">{alert.regulator}</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {alert.date}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Required Action</span>
                  <p className="text-sm text-gray-800">{alert.actionRequired}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
