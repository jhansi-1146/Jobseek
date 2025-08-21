import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, Building2 } from 'lucide-react';

const initialJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Google',
    location: 'Bangalore',
    match: 95,
    skills: ['React', 'TypeScript', 'GraphQL'],
    salary: '₹25-40L',
    type: 'Full-time',
    time: '2h ago',
    selected: false,
    icon: <span className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center"><span className="h-4 w-4 bg-white rounded-full block"></span></span>,
  },
  {
    id: 2,
    title: 'React Developer',
    company: 'Microsoft',
    location: 'Hyderabad',
    match: 92,
    skills: ['React', 'Node.js', 'MongoDB'],
    salary: '₹20-35L',
    type: 'Full-time',
    time: '4h ago',
    selected: true,
    icon: <span className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center"><span className="h-4 w-4 bg-white rounded-full block"></span></span>,
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'Amazon',
    location: 'Chennai',
    match: 90,
    skills: ['Node.js', 'AWS', 'Docker'],
    salary: '₹22-38L',
    type: 'Full-time',
    time: '1d ago',
    selected: false,
    icon: <span className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center"><span className="h-4 w-4 bg-white rounded-full block"></span></span>,
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Facebook',
    location: 'Delhi',
    match: 88,
    skills: ['Python', 'TensorFlow', 'SQL'],
    salary: '₹30-50L',
    type: 'Full-time',
    time: '3d ago',
    selected: false,
    icon: <span className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center"><span className="h-4 w-4 bg-white rounded-full block"></span></span>,
  },
  {
    id: 5,
    title: 'UI/UX Designer',
    company: 'Adobe',
    location: 'Remote',
    match: 85,
    skills: ['Figma', 'Sketch', 'Adobe XD'],
    salary: '₹18-28L',
    type: 'Full-time',
    time: '5d ago',
    selected: false,
    icon: <span className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center"><span className="h-4 w-4 bg-white rounded-full block"></span></span>,
  },
  {
    id: 6,
    title: 'QA Analyst',
    company: 'Swiggy',
    location: 'Pune',
    match: 80,
    skills: ['Selenium', 'Jest', 'Cypress'],
    salary: '₹12-20L',
    type: 'Full-time',
    time: '1w ago',
    selected: false,
    icon: <span className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center"><span className="h-4 w-4 bg-white rounded-full block"></span></span>,
  },
];

interface QuickApplyModalProps {
  open: boolean;
  onClose: () => void;
  onJobApplied?: (count: number) => void;
}

export default function QuickApplyModal({ open, onClose, onJobApplied }: QuickApplyModalProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [showNotification, setShowNotification] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);

  if (!open) return null;

  const selectedJobs = jobs.filter((job) => job.selected);

  const handleApply = () => {
    setJobs((prev) => prev.filter((job) => !job.selected));
    setAppliedCount(selectedJobs.length);
    setShowNotification(true);
    if (onJobApplied) onJobApplied(selectedJobs.length);
    setTimeout(() => setShowNotification(false), 2500);
  };

  const handleSelectAll = () => {
    setJobs((prev) => prev.map((job) => ({ ...job, selected: true })));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto relative p-0">
        {/* Notification (kept for in-modal feedback, but main notification is outside) */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full bg-green-100 text-green-800 text-center py-2 rounded-t-2xl font-semibold z-50 flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            {appliedCount === 1 ? 'Job applied successfully!' : `${appliedCount} jobs applied successfully!`}
          </div>
        )}
        {/* Close button */}
        <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" onClick={onClose}>
          <X className="h-6 w-6 text-gray-500" />
        </button>
        {/* Modal content */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Quick Apply - AI Recommended Jobs</span>
          </div>
          <div className="text-gray-500 mb-6">Apply to multiple jobs instantly with your saved profile and resume</div>
          {/* Stats */}
          <div className="flex items-center gap-8 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-blue-700">{jobs.length}</span>
              <span className="text-xs text-gray-500">Recommended</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-600">{selectedJobs.length}</span>
              <span className="text-xs text-gray-500">Selected</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-yellow-600">1m</span>
              <span className="text-xs text-gray-500">Est. Time</span>
            </div>
            <div className="flex-1 flex justify-end">
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm" onClick={handleSelectAll}>Select All</button>
            </div>
          </div>
        </div>
        {/* Job cards */}
        <div className="px-8 pb-4 max-h-80 overflow-y-auto">
          {jobs.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No more jobs to apply!</div>
          ) : jobs.map((job, idx) => (
            <div key={job.id} className={`flex items-center justify-between rounded-xl border-2 ${job.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white'} px-4 py-4 mb-4 transition-all duration-150`}> 
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={job.selected} readOnly className="form-checkbox h-5 w-5 text-blue-600" />
                {job.icon}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-base">{job.title}</span>
                    <span className="ml-2 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{job.match}% Match</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <Building2 className="h-4 w-4" /> {job.company}
                    <MapPin className="h-4 w-4 ml-2" /> {job.location}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {job.skills.map((skill) => (
                      <span key={skill} className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end min-w-[100px]">
                <div className="text-blue-600 font-bold text-base">{job.salary}</div>
                <div className="text-gray-500 text-xs">{job.type}</div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-1"><Clock className="h-3 w-3" /> {job.time}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            Your profile and resume will be automatically attached
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-blue-700 bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              Ready to apply to {selectedJobs.length} job{selectedJobs.length !== 1 ? 's' : ''} in ~1 minutes
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium text-sm">Preview Applications</button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm flex items-center gap-2"
                onClick={handleApply}
                disabled={selectedJobs.length === 0}
              >
                <CheckCircle className="h-4 w-4" /> Apply to {selectedJobs.length} Job{selectedJobs.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 