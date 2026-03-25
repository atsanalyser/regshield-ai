import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { addCustomer } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    companyNumber: '',
    country: '',
    activity: '',
    turnover: '',
    highRiskJurisdiction: false,
    sanctionsExposure: false,
    pepExposure: false,
    complexOwnership: false,
    cryptoExposure: false,
    unclearSourceOfFunds: false,
    adverseMedia: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateRisk = () => {
    let score = 0;
    const drivers: string[] = [];

    if (formData.highRiskJurisdiction) { score += 25; drivers.push('High risk jurisdiction (+25)'); }
    if (formData.sanctionsExposure) { score += 40; drivers.push('Sanctions exposure (+40)'); }
    if (formData.pepExposure) { score += 20; drivers.push('PEP exposure (+20)'); }
    if (formData.complexOwnership) { score += 15; drivers.push('Complex ownership (+15)'); }
    if (formData.cryptoExposure) { score += 20; drivers.push('Crypto exposure (+20)'); }
    if (formData.unclearSourceOfFunds) { score += 15; drivers.push('Unclear source of funds (+15)'); }
    if (formData.adverseMedia) { score += 20; drivers.push('Adverse media (+20)'); }
    if (formData.turnover === 'High') { score += 10; drivers.push('High turnover (+10)'); }

    return { score, drivers };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { score, drivers } = calculateRisk();
    
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (score >= 21 && score <= 50) riskLevel = 'Medium';
    if (score >= 51) riskLevel = 'High';

    const newCustomer = {
      id: `CUST-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      name: formData.name,
      companyNumber: formData.companyNumber,
      country: formData.country,
      activity: formData.activity,
      turnover: formData.turnover,
      riskScore: score,
      riskLevel,
      status: 'Onboarding' as const,
      dateAdded: new Date().toISOString().split('T')[0],
      owner: 'Unassigned',
      nextReviewDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      drivers
    };

    addCustomer(newCustomer);
    navigate(`/risk-result/${newCustomer.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Customer Onboarding (KYB)</h1>
          <p className="text-gray-500 mt-1">Capture business details to generate initial risk score.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input required name="name" onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500" type="text" placeholder="Acme Ltd" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Number</label>
                <input required name="companyNumber" onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500" type="text" placeholder="12345678" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country of Incorporation</label>
                <input required name="country" onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500" type="text" placeholder="United Kingdom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Turnover</label>
                <select required name="turnover" onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option value="">Select turnover...</option>
                  <option value="Low">Under £1M</option>
                  <option value="Medium">£1M - £10M</option>
                  <option value="High">Over £10M</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Business Activity</label>
                <input required name="activity" onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500" type="text" placeholder="e.g. Software Development, Financial Services" />
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Risk Factors Assessment</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-100">
              <Checkbox name="highRiskJurisdiction" label="High Risk Jurisdiction Exposure" desc="Does the entity operate in or have significant ties to high-risk countries?" onChange={handleChange} />
              <Checkbox name="sanctionsExposure" label="Sanctions Exposure" desc="Any direct or indirect exposure to sanctioned individuals or entities?" onChange={handleChange} />
              <Checkbox name="pepExposure" label="PEP Exposure" desc="Are any UBOs or Directors Politically Exposed Persons?" onChange={handleChange} />
              <Checkbox name="complexOwnership" label="Complex Ownership Structure" desc="Does the corporate structure obscure the ultimate beneficial owners?" onChange={handleChange} />
              <Checkbox name="cryptoExposure" label="Crypto Exposure" desc="Does the business involve virtual assets or cryptocurrency?" onChange={handleChange} />
              <Checkbox name="unclearSourceOfFunds" label="Unclear Source of Funds" desc="Is the origin of wealth or funds difficult to verify?" onChange={handleChange} />
              <Checkbox name="adverseMedia" label="Adverse Media" desc="Any negative news or controversies relating to the entity or directors?" onChange={handleChange} />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 shadow-sm transition-colors text-sm">
              Generate Risk Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Checkbox({ name, label, desc, onChange }: { name: string, label: string, desc: string, onChange: any }) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input id={name} name={name} onChange={onChange} type="checkbox" className="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500" />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-900">{label}</label>
        <p className="text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
