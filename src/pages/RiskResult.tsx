import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export default function RiskResult() {
  const { id } = useParams<{ id: string }>();
  const { customers } = useAppContext();
  
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return <div className="p-8 text-center text-gray-500">Customer not found.</div>;
  }

  const { riskScore, riskLevel, drivers } = customer;

  let ColorIcon = ShieldCheck;
  let colorClass = 'text-green-500 bg-green-50 border-green-200';
  let recAction = 'Proceed with Standard Customer Due Diligence (CDD). Ongoing monitoring on standard 3-year cycle.';

  if (riskLevel === 'Medium') {
    ColorIcon = Shield;
    colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    recAction = 'Proceed with CDD. Ensure robust source of funds checks. Monitor on 1-year cycle.';
  } else if (riskLevel === 'High') {
    ColorIcon = ShieldAlert;
    colorClass = 'text-red-500 bg-red-50 border-red-200';
    recAction = 'Enhanced Due Diligence (EDD) required. Escalate to MLRO for final approval. Trigger continuous monitoring.';
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-center">
        <div className={`p-8 border-b ${colorClass} bg-opacity-50`}>
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-4">
            <ColorIcon className="w-10 h-10 currentColor" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{riskScore}</h1>
          <p className="text-lg font-medium text-gray-800 tracking-wide uppercase">{riskLevel} RISK CLASSIFICATION</p>
          <p className="mt-2 text-sm opacity-80 font-medium">Customer: {customer.name}</p>
        </div>

        <div className="p-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg border-b pb-2">Risk Drivers</h3>
          {drivers.length > 0 ? (
            <ul className="space-y-3 mb-8">
              {drivers.map((driver, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mr-3"></span>
                  {driver}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic text-sm mb-8 px-4">No specific risk drivers flagged. Standard profile.</p>
          )}

          <h3 className="font-semibold text-gray-900 mb-4 text-lg border-b pb-2">Recommended Action</h3>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
            <p className="text-sm text-blue-900 font-medium leading-relaxed">{recAction}</p>
          </div>

          <div className="flex space-x-4">
            <Link to="/workflow" className="flex-1 bg-primary-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-primary-700 transition shadow-sm">
              View in Workflow Tracker
            </Link>
            <Link to="/onboarding" className="py-3 px-6 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition">
              Add Another
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
