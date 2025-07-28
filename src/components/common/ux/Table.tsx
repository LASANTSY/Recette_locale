import React, { useState } from "react";
import { useTheme } from '../../../context/ThemeContext';

interface Column<T extends { [key: string]: any } = { [key: string]: any }> {
  key: keyof T & string;
  header?: string;
  label?: string;  // Pour la rétrocompatibilité
  width?: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T extends { [key: string]: any } = { [key: string]: any }> {
  data?: T[];
  columns?: Column<T>[];
  onRowClick?: (row: T) => void;
  selectedRowId?: string | number;
}

function Table<T extends { [key: string]: any }>({ data = [], columns = [], onRowClick, selectedRowId }: TableProps<T>) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { theme } = useTheme();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (data && currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const currentData = data;
  const currentColumns = columns;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Version desktop */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* En-tête */}
          <div className="bg-gray-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center px-6 py-4">
              {currentColumns.map((column, index) => (
                <div
                  key={index}
                  className={`text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.width || "flex-1"} ${
                    index === 0 ? "" : "pl-6"
                  } dark:text-gray-300`}
                >
                  {column.header || column.label}
                </div>
              ))}
            </div>
          </div>

          {/* Corps du tableau */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentData && currentData.length > 0 && currentData.slice(startIndex, endIndex).length > 0 ? (
              currentData.slice(startIndex, endIndex).map((item, rowIndex) => {
                const isSelected = selectedRowId !== undefined && item.id === selectedRowId;
                return (
                  <div
                    key={rowIndex}
                    className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150 dark:hover:bg-gray-700 cursor-pointer ${isSelected ? 'bg-blue-50/80 border-l-4 border-blue-500' : ''}`}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {currentColumns.map((column, colIndex) => (
                      <div 
                        key={colIndex} 
                        className={`text-sm text-gray-900 ${column.width || "flex-1"} ${
                          colIndex === 0 ? "" : "pl-6"
                        }`}
                      >
                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Aucune donnée disponible</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {currentData && currentData.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    {startIndex + 1} - {Math.min(endIndex, currentData.length)} sur {currentData.length} éléments
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Précédent
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentData ? currentPage === totalPages : true}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Version mobile et tablette */}
      <div className="lg:hidden">
        <div className="space-y-4">
          {currentData && currentData.length > 0 && currentData.slice(startIndex, endIndex).length > 0 ? (
            currentData.slice(startIndex, endIndex).map((item, rowIndex) => (
              <div
                key={rowIndex}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                {currentColumns.map((column, colIndex) => (
                  <div key={colIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm font-medium text-gray-600">{column.header || column.label}</span>
                    <span className="text-sm text-gray-900">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Aucune donnée disponible</p>
            </div>
          )}

          {/* Pagination mobile */}
          {currentData && currentData.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-col space-y-3">
                <div className="text-center text-sm text-gray-500">
                  {startIndex + 1} - {Math.min(endIndex, currentData.length)} sur {currentData.length} éléments
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentData ? currentPage === totalPages : true}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Suivant
                  </button>
                </div>
                <div className="text-center text-xs text-gray-400">
                  Page {currentPage} sur {totalPages}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;