// Tabs.tsx
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

const Tabs = ({ 
  tabs, 
  defaultActiveTab, 
  onChange, 
  variant = 'default',
  className = ''
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const { theme } = useTheme();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const getTabClasses = (tab: Tab, isActive: boolean) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    if (tab.disabled) {
      return `${baseClasses} text-gray-400 cursor-not-allowed dark:text-gray-500`;
    }

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-md ${
          isActive 
            ? 'bg-blue-600 text-white dark:bg-blue-800' 
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700'
        }`;
      
      case 'underline':
        return `${baseClasses} border-b-2 ${
          isActive 
            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
            : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300 dark:text-gray-100 dark:hover:text-gray-300 dark:hover:border-gray-600'
        }`;
      
      default:
        return `${baseClasses} border border-gray-300 ${
          isActive 
            ? 'bg-white text-blue-600 border-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400' 
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700'
        }`;
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <div className={`flex ${variant === 'underline' ? 'border-b border-gray-200' : 'space-x-1'}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={`
              ${getTabClasses(tab, activeTab === tab.id)}
              ${variant === 'default' && index === 0 ? 'rounded-l-md' : ''}
              ${variant === 'default' && index === tabs.length - 1 ? 'rounded-r-md' : ''}
              ${variant === 'underline' ? 'mr-8' : ''}
            `}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;