import React from 'react';
import { Plus, Download, Upload, Filter, Search, MoreHorizontal } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  showSearch?: boolean;
  showFilter?: boolean;
  showAddButton?: boolean;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onAdd?: () => void;
  searchPlaceholder?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  showSearch = false,
  showFilter = false,
  showAddButton = false,
  onSearch,
  onFilter,
  onAdd,
  searchPlaceholder = "Search..."
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
              />
            </div>
          )}

          {/* Filter Button */}
          {showFilter && (
            <button
              onClick={onFilter}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Filter</span>
            </button>
          )}

          {/* Add Button */}
          {showAddButton && (
            <button
              onClick={onAdd}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add New</span>
            </button>
          )}

          {/* Custom Actions */}
          {actions}

          {/* More Options */}
                      <button className="p-2 rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader; 