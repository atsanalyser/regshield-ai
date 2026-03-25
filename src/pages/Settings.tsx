export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-500 mt-1">Configure compliance rules, users, and platform preferences.</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:bg-primary-700 transition">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className="px-6 py-4 text-sm font-medium text-primary-600 border-b-2 border-primary-600 bg-gray-50">General</button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">Risk Engine Rules</button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">User Management</button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">Integrations</button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4 max-w-xl">
            <h3 className="text-lg font-semibold text-gray-900">Organization Info</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" defaultValue="Innovator FinTech Ltd" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Email Contact</label>
              <input type="email" defaultValue="compliance@innovator.tech" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Regulator</label>
              <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>FCA (UK)</option>
                <option>SEC (US)</option>
                <option>FINMA (CH)</option>
                <option>MAS (SG)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 max-w-xl pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 h-4 w-4" />
                <span className="ml-2 text-sm text-gray-700">Email alerts for High Risk customer onboardings.</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 h-4 w-4" />
                <span className="ml-2 text-sm text-gray-700">Weekly summary report of compliance activity.</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 h-4 w-4" />
                <span className="ml-2 text-sm text-gray-700">Immediate push notifications for regulatory alerts.</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
