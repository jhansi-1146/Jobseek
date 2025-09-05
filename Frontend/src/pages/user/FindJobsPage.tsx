import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../components/Layout';
import {
    FileText, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Building2, MapPin, DollarSign,
    Phone, Video, Mail, Plus, Eye, Filter, Briefcase, Search, ChevronDown, Share2, ArrowLeft, Star,
    Heart, Download, BriefcaseBusiness
} from "lucide-react";

// This component is designed to be a standalone page within your file structure.
// It contains all the logic for searching and displaying job listings.

// Define the data types for type safety
type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    isRemote: boolean;
    postedDate: string;
    salary: string;
    jobType: string;
    experience: string;
    skills: string[];
    description: string;
    platform: string;
    companySize: string;
};

// Mock data for job listings with updated fields
const mockJobs: Job[] = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp",
        companySize: "Large (1000+)",
        location: "San Francisco, CA",
        isRemote: false,
        postedDate: "2 days ago",
        salary: "₹120K - ₹150K",
        jobType: "Full-time",
        experience: "Senior Level (6+ years)",
        skills: ["React", "Node.js", "AWS"],
        description: "Join our engineering team to build scalable web applications using React and Node.js. In this role, you will be responsible for designing and implementing new features, maintaining existing codebases, and collaborating with cross-functional teams to deliver high-quality products. We are a fast-paced and innovative company that values clean code and strong communication.",
        platform: "LinkedIn"
    },
    {
        id: 2,
        title: "Data Scientist",
        company: "DataFlow Systems",
        companySize: "Small (51-200)",
        location: "New York, NY",
        isRemote: false,
        postedDate: "1 week ago",
        salary: "₹110K - ₹140K",
        jobType: "Full-time",
        experience: "Mid Level (3-5 years)",
        skills: ["Python", "Machine Learning", "SQL"],
        description: "We are looking for a data scientist to build and analyze predictive models. The ideal candidate will have a strong background in statistics, machine learning, and programming. You will work closely with our business and product teams to identify key opportunities and deliver data-driven solutions.",
        platform: "Naukri"
    },
    {
        id: 3,
        title: "DevOps Engineer",
        company: "CloudNine Solutions",
        companySize: "Small (51-200)",
        location: "Austin, TX",
        isRemote: true,
        postedDate: "2 weeks ago",
        salary: "₹100K - ₹130K",
        jobType: "Full-time",
        experience: "Mid Level (3-5 years)",
        skills: ["Kubernetes", "Docker", "CI/CD"],
        description: "Join our team to manage and scale our cloud infrastructure. You'll be responsible for maintaining our CI/CD pipelines, automating deployments, and ensuring the reliability and performance of our systems. A strong understanding of cloud platforms like AWS or Google Cloud is a plus.",
        platform: "Indeed"
    },
    {
        id: 4,
        title: "Frontend Developer",
        company: "Innovate Ltd.",
        companySize: "Startup (1-50)",
        location: "Remote",
        isRemote: true,
        postedDate: "3 days ago",
        salary: "₹90K - ₹110K",
        jobType: "Contract",
        experience: "Entry Level (0-2 years)",
        skills: ["Vue.js", "JavaScript", "HTML/CSS"],
        description: "A contract role to help us build a new customer-facing application. This is a great opportunity for a junior developer to gain hands-on experience with modern web technologies and contribute to a growing startup.",
        platform: "AngelList"
    },
    {
        id: 5,
        title: "UX/UI Designer",
        company: "DesignSphere",
        companySize: "Small (51-200)",
        location: "Seattle, WA",
        isRemote: false,
        postedDate: "4 days ago",
        salary: "₹95K - ₹120K",
        jobType: "Full-time",
        experience: "Mid Level (3-5 years)",
        skills: ["Figma", "Sketch", "Prototyping"],
        description: "Create intuitive and beautiful user interfaces for our next-generation products. You will work closely with product managers and engineers to translate user needs into compelling design solutions. Experience with user research and usability testing is a plus.",
        platform: "LinkedIn"
    },
    {
        id: 6,
        title: "Product Manager",
        company: "MarketGrowth",
        companySize: "Large (1000+)",
        location: "San Francisco, CA",
        isRemote: false,
        postedDate: "5 days ago",
        salary: "₹130K - ₹160K",
        jobType: "Full-time",
        experience: "Senior Level (6+ years)",
        skills: ["Product Strategy", "Agile"],
        description: "Lead the development of our flagship product from concept to launch. You will be the voice of the customer, defining product requirements, managing the product roadmap, and driving feature development. Strong communication and leadership skills are essential for this role.",
        platform: "Glassdoor"
    },
];

// Define the filter options based on the mock data
const filterOptions = {
    workType: ["Full-time", "Part-time", "Contract", "Internship"],
    experienceLevel: ["Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (6+ years)"],
    locationType: ["On-site", "Remote"],
    companySize: ["Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"],
    platforms: ["LinkedIn", "Indeed", "Glassdoor", "Naukri", "AngelList"],
};

// Filter section component
const FilterSection = ({
    salaryRange,
    setSalaryRange,
    workType,
    handleCheckboxChange,
    experienceLevel,
    locationType,
    companySize,
    platforms,
    handleClearFilters
}: any) => {
    // Calculate the percentage for the slider's background
    const percentage = (salaryRange / 200000) * 100;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                <Filter className="w-5 h-5 text-gray-500" />
            </div>

            {/* Salary Range */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Salary Range</h4>
                <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer salary-slider"
                    style={{ '--slider-percent': `${percentage}%` }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0K</span>
                    <span>₹{(salaryRange / 1000).toFixed(0)}K+</span>
                </div>
            </div>

            {/* Work Type */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Work Type</h4>
                {filterOptions.workType.map(type => (
                    <div key={type} className="flex items-center justify-between mb-2">
                        <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={workType.includes(type)}
                                onChange={() => handleCheckboxChange('workType', type)}
                                className="w-4 h-4 text-[#21589C] bg-gray-100 border-gray-300 rounded focus:ring-[#21589C] cursor-pointer"
                            />
                            <span className="ml-2">{type}</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            ({mockJobs.filter(j => j.jobType === type).length})
                        </span>
                    </div>
                ))}
            </div>

            {/* Experience Level */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Experience Level</h4>
                {filterOptions.experienceLevel.map(level => (
                    <div key={level} className="flex items-center justify-between mb-2">
                        <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={experienceLevel.includes(level)}
                                onChange={() => handleCheckboxChange('experienceLevel', level)}
                                className="w-4 h-4 text-[#21589C] bg-gray-100 border-gray-300 rounded focus:ring-[#21589C] cursor-pointer"
                            />
                            <span className="ml-2">{level}</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            ({mockJobs.filter(j => j.experience === level).length})
                        </span>
                    </div>
                ))}
            </div>

            {/* Location Type */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Location Type</h4>
                {filterOptions.locationType.map(type => (
                    <div key={type} className="flex items-center justify-between mb-2">
                        <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={locationType.includes(type)}
                                onChange={() => handleCheckboxChange('locationType', type)}
                                className="w-4 h-4 text-[#21589C] bg-gray-100 border-gray-300 rounded focus:ring-[#21589C] cursor-pointer"
                            />
                            <span className="ml-2">{type}</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            ({mockJobs.filter(j => (type === 'Remote' && j.isRemote) || (type === 'On-site' && !j.isRemote)).length})
                        </span>
                    </div>
                ))}
            </div>

            {/* Company Size */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Company Size</h4>
                {filterOptions.companySize.map(size => (
                    <div key={size} className="flex items-center justify-between mb-2">
                        <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={companySize.includes(size)}
                                onChange={() => handleCheckboxChange('companySize', size)}
                                className="w-4 h-4 text-[#21589C] bg-gray-100 border-gray-300 rounded focus:ring-[#21589C] cursor-pointer"
                            />
                            <span className="ml-2">{size}</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            ({mockJobs.filter(j => j.companySize === size).length})
                        </span>
                    </div>
                ))}
            </div>

            {/* Platforms */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Platform</h4>
                {filterOptions.platforms.map(platform => (
                    <div key={platform} className="flex items-center justify-between mb-2">
                        <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={platforms.includes(platform)}
                                onChange={() => handleCheckboxChange('platforms', platform)}
                                className="w-4 h-4 text-[#21589C] bg-gray-100 border-gray-300 rounded focus:ring-[#21589C] cursor-pointer"
                            />
                            <span className="ml-2">{platform}</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            ({mockJobs.filter(j => j.platform === platform).length})
                        </span>
                    </div>
                ))}
            </div>

            <button
                onClick={handleClearFilters}
                className="w-full py-2 px-4 rounded-lg text-[#21589C] font-semibold border border-[#21589C] hover:bg-[#21589C]/5 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
};

// Individual Job Card component
const JobCard = ({ job, onSelectJob }: { job: Job, onSelectJob: (job: Job) => void }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-[#21589C]" />
                    <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                </div>
                {job.isRemote && (
                    <span className="bg-[#21589C]/10 text-[#21589C] text-xs font-semibold px-2 py-1 rounded-full">Remote</span>
                )}
            </div>
            <div className="text-gray-600 text-sm space-y-1 mb-3">
                <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>{job.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{job.jobType}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>{job.salary}</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
                {job.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        {skill}
                    </span>
                ))}
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">{job.description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-400">{job.postedDate}</span>
                <div className="flex space-x-2 items-center">
                    <button
                        onClick={() => onSelectJob(job)}
                        className="flex items-center space-x-1 text-[#21589C] font-semibold text-sm hover:text-[#21589C]/80 transition-colors"
                    >
                        <span>View Details</span>
                        <ChevronDown className="w-5 h-5" />
                    </button>
                    <button className="bg-[#21589C] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#21589C]/90 transition-colors">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

// New component for the Job Details page
const JobDetailsPage = ({ job, onBack }: { job: Job, onBack: () => void }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto my-8">
            {/* Back button and header */}
            <div className="flex items-center justify-between border-b pb-6 mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center space-x-2 text-[#21589C] font-semibold hover:text-[#21589C]/80 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Find Jobs</span>
                </button>
                <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-[#21589C]">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-[#21589C]">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Job Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <BriefcaseBusiness className="w-12 h-12 text-[#21589C]" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-base text-gray-600">{job.company}</p>
                        <div className="flex items-center text-yellow-500 mt-1">
                            <Star className="w-4 h-4" />
                            <Star className="w-4 h-4" />
                            <Star className="w-4 h-4" />
                            <Star className="w-4 h-4" />
                            <Star className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500 ml-2">4.2</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <button className="bg-[#21589C] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[#21589C]/90 transition-colors">
                        Apply Now
                    </button>
                    <span className="text-sm text-gray-500">Application closes on Sep 30 '25</span>
                </div>
            </div>

            {/* Job Quick Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 p-6 bg-gray-50 rounded-lg border">
                <div className="flex flex-col items-center text-center">
                    <Clock className="w-6 h-6 text-gray-500" />
                    <span className="text-sm text-gray-500 mt-2">Posted Date</span>
                    <span className="font-semibold text-gray-800">{job.postedDate}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <DollarSign className="w-6 h-6 text-gray-500" />
                    <span className="text-sm text-gray-500 mt-2">Salary</span>
                    <span className="font-semibold text-gray-800">{job.salary}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <MapPin className="w-6 h-6 text-gray-500" />
                    <span className="text-sm text-gray-500 mt-2">Location</span>
                    <span className="font-semibold text-gray-800">{job.location}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Briefcase className="w-6 h-6 text-gray-500" />
                    <span className="text-sm text-gray-500 mt-2">Job Type</span>
                    <span className="font-semibold text-gray-800">{job.jobType}</span>
                </div>
            </div>

            {/* Main Content & Sidebar */}
            <div className="flex flex-col md:flex-row mt-8 gap-8">
                {/* Main content section */}
                <div className="md:w-2/3 space-y-8">
                    {/* About the job */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Job</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                    </div>

                    {/* Skills required */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill(s) Required</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Who can apply */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who can apply</h2>
                        <ul className="text-gray-700 space-y-2">
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Candidates must be available for {job.jobType.toLowerCase()} role.</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Must have a minimum of {job.experience} of experience.</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Possess relevant skills and interests in the specified field.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar section */}
                <div className="md:w-1/3 space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <button className="bg-[#21589C] text-white w-full py-3 rounded-lg font-semibold hover:bg-[#21589C]/90 transition-colors flex items-center justify-center space-x-2">
                            <Briefcase className="w-5 h-5" />
                            <span>Apply Now</span>
                        </button>
                        <div className="mt-4 space-y-2">
                            <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                                <Heart className="w-5 h-5 text-gray-500" />
                                <span>Save for Later</span>
                            </button>
                            <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                                <Download className="w-5 h-5 text-gray-500" />
                                <span>Download JD</span>
                            </button>
                            <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                                <Eye className="w-5 h-5 text-gray-500" />
                                <span>View Similar Jobs</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About {job.company}</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {job.company} is a leading company in the {job.companySize.toLowerCase()} category. We are dedicated to building innovative products and fostering a collaborative and inclusive work environment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main page component
const FindJobsPage = ({ sidebarState }: { sidebarState: string }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [salaryRange, setSalaryRange] = useState(0);
    const [workType, setWorkType] = useState<string[]>([]);
    const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
    const [locationType, setLocationType] = useState<string[]>([]);
    const [companySize, setCompanySize] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [sortOrder, setSortOrder] = useState('Relevance');

    const handleViewDetails = (job: Job) => {
        setSelectedJob(job);
    };

    const handleBack = () => {
        setSelectedJob(null);
    };

    const handleClearFilters = () => {
        setSalaryRange(0);
        setWorkType([]);
        setExperienceLevel([]);
        setLocationType([]);
        setCompanySize([]);
        setPlatforms([]);
    };

    const handleCheckboxChange = (filterType: keyof typeof filterOptions, value: string) => {
        const setMap = {
            workType: setWorkType,
            experienceLevel: setExperienceLevel,
            locationType: setLocationType,
            companySize: setCompanySize,
            platforms: setPlatforms,
        };
        const setter = setMap[filterType];
        if (!setter) return;

        setter((prev: string[]) => {
            if (prev.includes(value)) {
                return prev.filter(item => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const parsePostedDate = (dateString: string): number => {
        const parts = dateString.split(' ');
        const value = parseInt(parts[0]);
        const unit = parts[1];
        if (unit.startsWith('day')) return value;
        if (unit.startsWith('week')) return value * 7;
        if (unit.startsWith('month')) return value * 30;
        return Infinity;
    };

    const filteredJobs = mockJobs.filter(job => {
        const titleMatches = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const salaryMatches = parseInt(job.salary.split(' - ')[0].replace('₹', '').replace('K', '')) >= (salaryRange / 1000);
        const workTypeMatches = workType.length === 0 || workType.includes(job.jobType);
        const experienceMatches = experienceLevel.length === 0 || experienceLevel.includes(job.experience);
        const locationTypeMatches = locationType.length === 0 || (locationType.includes('Remote') && job.isRemote) || (locationType.includes('On-site') && !job.isRemote);
        const companySizeMatches = companySize.length === 0 || companySize.includes(job.companySize);
        const platformMatches = platforms.length === 0 || platforms.includes(job.platform);
        return titleMatches && salaryMatches && workTypeMatches && experienceMatches && locationTypeMatches && companySizeMatches && platformMatches;
    }).sort((a, b) => {
        if (sortOrder === 'Latest Openings') {
            return parsePostedDate(a.postedDate) - parsePostedDate(b.postedDate);
        } else if (sortOrder === 'Salary (High to Low)') {
            const salaryA = parseInt(a.salary.split('K')[0].replace('₹', ''));
            const salaryB = parseInt(b.salary.split('K')[0].replace('₹', ''));
            return salaryB - salaryA;
        } else if (sortOrder === 'Salary (Low to High)') {
            const salaryA = parseInt(a.salary.split('K')[0].replace('₹', ''));
            const salaryB = parseInt(b.salary.split('K')[0].replace('₹', ''));
            return salaryA - salaryB;
        }
        return 0; // Default to no sorting for Relevance
    });

    if (selectedJob) {
        return <JobDetailsPage job={selectedJob} onBack={handleBack} />;
    }
    
    // Determine the width class for the search bar based on main sidebar and filter state
    const searchBarWidthClass = (sidebarState === 'full' || showFilters) ? 'w-full md:w-1/2' : 'w-full md:w-3/4';

    return (
        <Layout role="student">
            <style jsx>{`
.salary-slider::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #21589C var(--slider-percent), #e5e7eb var(--slider-percent));
    height: 8px;
    border-radius: 9999px;
}
.salary-slider::-moz-range-track {
    background: linear-gradient(to right, #21589C var(--slider-percent), #e5e7eb var(--slider-percent));
    height: 8px;
    border-radius: 9999px;
}
.salary-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 9999px;
    background-color: #21589C;
    margin-top: -4px;
}
.salary-slider::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 9999px;
    background-color: #21589C;
}
`}
            </style>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar for Filters */}
                    <div className="w-full md:w-1/4">
                        <div className="md:hidden flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                        <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
                            <FilterSection
                                salaryRange={salaryRange}
                                setSalaryRange={setSalaryRange}
                                workType={workType}
                                handleCheckboxChange={handleCheckboxChange}
                                experienceLevel={experienceLevel}
                                locationType={locationType}
                                companySize={companySize}
                                platforms={platforms}
                                handleClearFilters={handleClearFilters}
                            />
                        </div>
                    </div>

                    {/* Main content for Job Listings */}
                    <div className={`w-full ${showFilters ? 'md:w-3/4' : 'md:w-full'}`}>
                        {/* Search and Sort Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                            <h2 className="text-xl font-bold text-gray-900">Job Listings ({filteredJobs.length})</h2>

                            {/* This div now conditionally changes its max-width */}
                            <div className={`relative w-full ${searchBarWidthClass}`}>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#21589C] focus:border-[#21589C]"
                                />
                            </div>

                            <div className="hidden md:flex items-center space-x-2 text-gray-600 text-sm">
                                <span>Sort by:</span>
                                <select
                                    className="bg-white p-2 rounded-lg border border-gray-300 text-sm"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option>Relevance</option>
                                    <option>Latest Openings</option>
                                    <option>Salary (High to Low)</option>
                                    <option>Salary (Low to High)</option>
                                </select>
                            </div>
                        </div>

                        {/* Job Listing Cards */}
                        <div className="grid grid-cols-1 gap-6">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <JobCard key={job.id} job={job} onSelectJob={handleViewDetails} />
                                ))
                            ) : (
                                <div className="md:col-span-2 text-center text-gray-500 py-10">
                                    <AlertCircle className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                                    <p>No jobs found matching your criteria. Try adjusting your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FindJobsPage;