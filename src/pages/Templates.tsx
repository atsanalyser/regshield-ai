import { useAppContext } from '../context/AppContext';
import { FileText, Download, Eye } from 'lucide-react';

export default function Templates() {
  const { templates } = useAppContext();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Template Library</h1>
        <p className="text-gray-500 mt-1">Standardized frameworks, policies, and procedures for your regulatory requirements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition p-6 flex flex-col h-full group">
            <div className="mb-4 flex items-start justify-between">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {template.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
            <p className="text-gray-500 text-sm mb-6 flex-1">{template.description}</p>
            
            <div className="flex items-center pt-4 border-t border-gray-100 space-x-3">
              <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition cursor-not-allowed opacity-50">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-2 rounded-lg text-sm font-medium transition cursor-not-allowed opacity-50">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
