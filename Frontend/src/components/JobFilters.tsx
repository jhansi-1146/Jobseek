import React, { useState } from 'react';
import { X, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

interface JobFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

interface FiltersState {
  jobType: string[];
  experience: string[];
  location: string[];
  company: string[];
  jobSource: string[];
  salaryRange: [number, number];
}

const JobFilters: React.FC<JobFiltersProps> = ({ isOpen, onClose, onApplyFilters, viewMode, onViewModeChange }) => {
  const [filters, setFilters] = useState<FiltersState>({
    jobType: [],
    experience: [],
    location: [],
    company: [],
    jobSource: [],
    salaryRange: [0, 200000]
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const locations = ['Remote Work', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'];
  const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'];
  const jobSources = ['LinkedIn', 'Naukri', 'Indeed', 'Glassdoor', 'AngelList'];

  const handleCheckboxChange = (category: keyof Omit<FiltersState, 'salaryRange'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSalaryRangeChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: [min, max]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      jobType: [],
      experience: [],
      location: [],
      company: [],
      jobSource: [],
      salaryRange: [0, 200000]
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white text-gray-900 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <SlidersHorizontal className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Job Filters</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        {viewMode !== undefined && onViewModeChange && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">View Mode</h3>
            <div className="flex items-center bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`flex-1 flex items-center justify-center p-2 rounded-md ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Grid</span>
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`flex-1 flex items-center justify-center p-2 rounded-md ${
                  viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">List</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Job Type */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map(type => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleCheckboxChange('jobType', type)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Experience</h3>
            <div className="space-y-2">
              {experienceLevels.map(level => (
                <label key={level} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.experience.includes(level)}
                    onChange={() => handleCheckboxChange('experience', level)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Location</h3>
            <div className="space-y-2">
              {locations.map(location => (
                <label key={location} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.location.includes(location)}
                    onChange={() => handleCheckboxChange('location', location)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{location}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Company</h3>
            <div className="space-y-2">
              {companies.map(company => (
                <label key={company} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.company.includes(company)}
                    onChange={() => handleCheckboxChange('company', company)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{company}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Source */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Job Source</h3>
            <div className="space-y-2">
              {jobSources.map(source => (
                <label key={source} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.jobSource.includes(source)}
                    onChange={() => handleCheckboxChange('jobSource', source)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{source}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Salary Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{filters.salaryRange[0].toLocaleString()}</span>
                <span>₹{filters.salaryRange[1].toLocaleString()}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  value={filters.salaryRange[1]}
                  onChange={(e) => handleSalaryRangeChange(filters.salaryRange[0], parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={applyFilters}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters; 