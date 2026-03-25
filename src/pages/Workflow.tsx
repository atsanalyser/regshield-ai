import { useAppContext } from '../context/AppContext';
import type { CustomerStatus } from '../context/AppContext';
import { Calendar, User } from 'lucide-react';

const statuses: CustomerStatus[] = ['Onboarding', 'Review pending', 'EDD required', 'Approved', 'Monitoring'];

export default function Workflow() {
  const { customers, updateCustomerStatus } = useAppContext();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Workflow</h1>
          <p className="text-gray-500 mt-1 text-sm">Track customer cases across the compliance lifecycle.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex space-x-6 min-w-max h-full">
          {statuses.map(status => (
            <div key={status} className="w-80 flex flex-col items-center bg-gray-100/50 rounded-xl border border-gray-200">
              <div className="w-full p-4 border-b border-gray-200 bg-gray-100 rounded-t-xl">
                <h3 className="font-semibold text-gray-700 flex justify-between items-center">
                  {status}
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs text-gray-500 font-bold border border-gray-200">
                    {customers.filter(c => c.status === status).length}
                  </span>
                </h3>
              </div>
              <div className="w-full p-3 space-y-3 overflow-y-auto h-[70vh]">
                {customers.filter(c => c.status === status).map(customer => (
                  <div key={customer.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{customer.name}</h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${
                        customer.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                        customer.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {customer.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">{customer.id} • {customer.activity}</p>

                    <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {customer.owner}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {customer.nextReviewDate}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex justify-end">
                      <select 
                        className="text-xs border-gray-300 rounded-md py-1 focus:ring-primary-500 focus:border-primary-500"
                        value={customer.status}
                        onChange={(e) => updateCustomerStatus(customer.id, e.target.value as CustomerStatus)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {statuses.map(s => <option key={s} value={s}>Move to {s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
