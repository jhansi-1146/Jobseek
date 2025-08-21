import { useState } from 'react';
import Layout from '../../components/Layout';
import { FileText, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Building2, MapPin, DollarSign, Phone, Video, Mail, Plus, Eye } from "lucide-react";

type Application = {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: string;
  stage: string;
  progress: number;
  nextStep: string | null;
  nextDate: string | null;
  logo: string;
  notes: string;
  interviewer: string | null;
  interviewType: string | null;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Engineer",
      location: "Bangalore",
      salary: "₹25-40L",
      appliedDate: "2024-01-15",
      status: "interview",
      stage: "Technical Round",
      progress: 75,
      nextStep: "Final Interview",
      nextDate: "2024-01-25",
      logo: "🔴",
      notes: "Great cultural fit. Technical assessment went well.",
      interviewer: "Sarah Johnson",
      interviewType: "video"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Manager",
      location: "Hyderabad",
      salary: "₹30-50L",
      appliedDate: "2024-01-12",
      status: "review",
      stage: "HR Review",
      progress: 50,
      nextStep: "Technical Interview",
      nextDate: "2024-01-22",
      logo: "🔷",
      notes: "Application under review by HR team.",
      interviewer: "Mark Davis",
      interviewType: "phone"
    },
    {
      id: 3,
      company: "Amazon",
      position: "DevOps Engineer",
      location: "Mumbai",
      salary: "₹28-45L",
      appliedDate: "2024-01-10",
      status: "applied",
      stage: "Application Submitted",
      progress: 25,
      nextStep: "Initial Screening",
      nextDate: "2024-01-20",
      logo: "🟠",
      notes: "Recently submitted application.",
      interviewer: null,
      interviewType: null
    },
    {
      id: 4,
      company: "Flipkart",
      position: "Data Scientist",
      location: "Bangalore",
      salary: "₹20-35L",
      appliedDate: "2024-01-08",
      status: "rejected",
      stage: "Application Rejected",
      progress: 0,
      nextStep: null,
      nextDate: null,
      logo: "🟦",
      notes: "Position filled internally.",
      interviewer: null,
      interviewType: null
    },
    {
      id: 5,
      company: "Zomato",
      position: "Full Stack Developer",
      location: "Gurgaon",
      salary: "₹18-30L",
      appliedDate: "2024-01-14",
      status: "offered",
      stage: "Offer Extended",
      progress: 100,
      nextStep: "Decision Pending",
      nextDate: "2024-01-30",
      logo: "🔴",
      notes: "Competitive offer received. Negotiating terms.",
      interviewer: null,
      interviewType: null
    }
  ]);
  const [filter, setFilter] = useState<'all' | 'applied' | 'review' | 'interview' | 'offered' | 'rejected'>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [selectedJobIdx, setSelectedJobIdx] = useState(0);

  // Update status handler
  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
    setEditingId(null);
  };

  // Filtered applications
  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500'
      case 'review': return 'bg-yellow-500'
      case 'interview': return 'bg-purple-500'
      case 'offered': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <FileText className="h-4 w-4" />
      case 'review': return <Clock className="h-4 w-4" />
      case 'interview': return <AlertCircle className="h-4 w-4" />
      case 'offered': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const stats = [
    { title: "Total Applications", value: "24", icon: FileText, color: "text-blue-500" },
    { title: "In Progress", value: "12", icon: Clock, color: "text-yellow-500" },
    { title: "Interviews", value: "5", icon: Video, color: "text-purple-500" },
    { title: "Offers", value: "2", icon: CheckCircle, color: "text-green-500" }
  ]

  return (
    <Layout role="student">
      <div className="flex min-h-screen w-full bg-gray-100">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-20 border-b bg-white sticky top-0 z-40 shadow-sm flex items-center justify-between px-6">
              <div className="flex items-center gap-6">
              {/* HamburgerMenu placeholder */}
              <button className="md:hidden p-2 rounded hover:bg-gray-200">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
                <div>
                <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                <p className="text-sm text-gray-500">Track your job application progress</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
              <button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded px-3 py-2 text-sm flex items-center gap-2 hover:from-blue-600 hover:to-purple-600"
                onClick={() => setShowNewApplicationForm(true)}
              >
                  <Plus className="h-4 w-4" />
                  New Application
              </button>
            </div>
          </header>

          {/* New Application Modal */}
          {showNewApplicationForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Application History</h2>
                  <button 
                    onClick={() => setShowNewApplicationForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                {/* Job Cards */}
                <div className="space-y-4 mb-6">
                  {applications.slice(0, 4).map((job, idx) => (
                    <div
                      key={job.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${selectedJobIdx === idx ? 'border-blue-500 bg-blue-50 shadow' : 'border-gray-200 bg-white'}`}
                      onClick={() => setSelectedJobIdx(idx)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold bg-gray-100 border border-gray-300">
                          {job.company.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-lg text-gray-900">{job.position}</div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium">{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{job.salary}</div>
                        <div className="text-xs text-gray-400 mt-1">{job.appliedDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    // You can add logic here to add the selected job to the main list or perform another action
                    setShowNewApplicationForm(false);
                  }}
                >
                  Add this Job
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <div className="text-sm font-medium text-gray-500">{stat.title}</div>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
            {/* Application Tabs (functional) */}
            <div className="mt-8">
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('all')}
                >All ({applications.length})</button>
                <button
                  className={`px-4 py-2 rounded ${filter === 'applied' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('applied')}
                >Applied ({applications.filter(a => a.status === 'applied').length})</button>
                <button
                  className={`px-4 py-2 rounded ${filter === 'review' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('review')}
                >In Review ({applications.filter(a => a.status === 'review').length})</button>
                <button
                  className={`px-4 py-2 rounded ${filter === 'interview' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('interview')}
                >Interviews ({applications.filter(a => a.status === 'interview').length})</button>
                <button
                  className={`px-4 py-2 rounded ${filter === 'offered' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('offered')}
                >Offers ({applications.filter(a => a.status === 'offered').length})</button>
                <button
                  className={`px-4 py-2 rounded ${filter === 'rejected' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('rejected')}
                >Rejected ({applications.filter(a => a.status === 'rejected').length})</button>
              </div>
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="bg-white rounded-lg shadow p-6 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-4">
                        {/* Company Initial Circle */}
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
                          {app.company.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{app.position}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(app.status)} text-white`}>
                                {getStatusIcon(app.status)}
                                <span className="ml-1 capitalize">{app.status}</span>
                            </span>
                            </div>
                          <div className="flex items-center gap-4 text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {app.company}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {app.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {app.salary}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Progress: {app.stage}</span>
                              <span className="text-sm text-gray-500">{app.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${app.progress}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Applied</div>
                          <div className="font-medium">{new Date(app.appliedDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      {app.nextStep && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-sm mb-1">Next Step: {app.nextStep}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {app.nextDate && new Date(app.nextDate).toLocaleDateString()}
                                </div>
                                {app.interviewer && (
                                  <div className="flex items-center gap-1">
                                  {app.interviewType === 'video' ? <Video className="h-4 w-4" /> : app.interviewType === 'phone' ? <Phone className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                                    {app.interviewer}
                                  </div>
                                )}
                              </div>
                            </div>
                            {app.status === 'interview' && (
                            <button className="px-3 py-1 rounded bg-purple-500 text-white text-xs">Join Interview</button>
                            )}
                          </div>
                        </div>
                      )}
                      {app.notes && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">Notes</h4>
                        <p className="text-sm text-gray-500">{app.notes}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                        {/* Update Status Button */}
                        <button
                          className="px-3 py-1 rounded bg-blue-500 text-white text-xs"
                          onClick={() => setEditingId(app.id)}
                        >
                          Update Status
                        </button>
                        {editingId === app.id && (
                          <select
                            className="ml-2 border rounded px-2 py-1 text-xs"
                            value={app.status}
                            onChange={e => handleStatusChange(app.id, e.target.value)}
                          >
                            <option value="applied">Applied</option>
                            <option value="review">In Review</option>
                            <option value="interview">Interview</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        )}
                        {/* ...existing offer buttons if any... */}
                          {app.status === 'offered' && (
                            <div className="flex gap-2">
                            <button className="px-3 py-1 rounded bg-green-500 text-white text-xs">Accept Offer</button>
                            <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 text-xs">Negotiate</button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded hover:bg-gray-100 text-gray-700 text-xs flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            View Details
                        </button>
                        <button className="px-2 py-1 rounded hover:bg-gray-100 text-gray-700 text-xs flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            Contact
                        </button>
                      </div>
                        </div>
                      </div>
                ))}
              </div>
                      </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}

