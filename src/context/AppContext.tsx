import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type CustomerStatus = 'Onboarding' | 'Review pending' | 'EDD required' | 'Approved' | 'Monitoring';

export interface Customer {
  id: string;
  name: string;
  companyNumber: string;
  country: string;
  activity: string;
  turnover: string;
  riskScore: number;
  riskLevel: RiskLevel;
  status: CustomerStatus;
  dateAdded: string;
  owner: string;
  nextReviewDate: string;
  drivers: string[];
}

export interface Alert {
  id: string;
  title: string;
  regulator: string;
  impact: 'Low' | 'Medium' | 'High';
  date: string;
  actionRequired: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface AppContextType {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomerStatus: (id: string, status: CustomerStatus) => void;
  alerts: Alert[];
  templates: Template[];
}

const initialCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'FinTech Global Solutions Ltd',
    companyNumber: '11223344',
    country: 'United Kingdom',
    activity: 'Payment Services',
    turnover: '£5M - £10M',
    riskScore: 35,
    riskLevel: 'Medium',
    status: 'Monitoring',
    dateAdded: '2026-01-15',
    owner: 'Sarah Jenkins',
    nextReviewDate: '2027-01-15',
    drivers: ['Payment Services (+10)', 'Medium turnover (+5)']
  },
  {
    id: 'CUST-002',
    name: 'CryptoBridge Exchange',
    companyNumber: 'CY-998877',
    country: 'Cyprus',
    activity: 'Virtual Asset Service Provider',
    turnover: '£50M+',
    riskScore: 85,
    riskLevel: 'High',
    status: 'EDD required',
    dateAdded: '2026-03-20',
    owner: 'Michael Chang',
    nextReviewDate: '2026-04-20',
    drivers: ['Crypto exposure (+20)', 'High risk jurisdiction (+25)', 'Complex ownership (+15)', 'High turnover (+10)']
  },
  {
    id: 'CUST-003',
    name: 'Local Retailer Bros',
    companyNumber: '55667788',
    country: 'United Kingdom',
    activity: 'Retail',
    turnover: '< £1M',
    riskScore: 5,
    riskLevel: 'Low',
    status: 'Approved',
    dateAdded: '2026-02-10',
    owner: 'Sarah Jenkins',
    nextReviewDate: '2029-02-10',
    drivers: ['Domestic retail']
  }
];

const initialAlerts: Alert[] = [
  {
    id: 'ALT-001',
    title: 'FCA AML update',
    regulator: 'FCA',
    impact: 'Medium',
    date: '2026-03-22',
    actionRequired: 'Review AML policy section 4.2'
  },
  {
    id: 'ALT-002',
    title: 'Sanctions list update',
    regulator: 'OFSI',
    impact: 'High',
    date: '2026-03-24',
    actionRequired: 'Screen active customer base immediately'
  },
  {
    id: 'ALT-003',
    title: 'CDD rule update',
    regulator: 'JMLSG',
    impact: 'Medium',
    date: '2026-03-10',
    actionRequired: 'Update EDD trigger criteria'
  }
];

const initialTemplates: Template[] = [
  { id: 'TPL-001', title: 'AML Policy Template', description: 'Comprehensive Anti-Money Laundering policy aligned with 2026 regulations.', category: 'Policy' },
  { id: 'TPL-002', title: 'CDD Procedure', description: 'Step-by-step procedure for Customer Due Diligence, including verification requirements.', category: 'Procedure' },
  { id: 'TPL-003', title: 'EDD Checklist', description: 'Checklist for Enhanced Due Diligence on high-risk customers, PEPs, and complex ownerships.', category: 'Checklist' },
  { id: 'TPL-004', title: 'Customer Risk Framework', description: 'Methodology for risk scoring and classification of the customer base.', category: 'Framework' },
  { id: 'TPL-005', title: 'Compliance Monitoring Programme', description: 'Annual plan for testing and monitoring compliance controls.', category: 'Programme' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [alerts] = useState<Alert[]>(initialAlerts);
  const [templates] = useState<Template[]>(initialTemplates);

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
  };

  const updateCustomerStatus = (id: string, status: CustomerStatus) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <AppContext.Provider value={{ customers, addCustomer, updateCustomerStatus, alerts, templates }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
