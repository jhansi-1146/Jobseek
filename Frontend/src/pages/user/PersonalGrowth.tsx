import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Calendar as CalendarIcon, Smile, Frown, Meh, Heart, Download, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

interface MoodEntry {
  id: string;
  date: string;
  mood: 'happy' | 'sad' | 'neutral' | 'angry' | 'excited';
  jobTitle: string;
  reflection: string;
}

const stats = [
  { title: "Applications Sent", value: 47, change: "+12 this week", icon: "🎯", color: "text-blue-600" },
  { title: "Interviews Completed", value: 8, change: "+3 this week", icon: "🧑‍💼", color: "text-green-600" },
  { title: "Skills Learned", value: 5, change: "+2 this month", icon: "📚", color: "text-purple-600" },
  { title: "Network Connections", value: 23, change: "+8 this week", icon: "💖", color: "text-pink-600" },
];

const motivationalQuote = {
  quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  author: "Winston Churchill"
};

const quickStats = [
  { label: "Applications", value: 12 },
  { label: "Interviews", value: 3 },
  { label: "Follow-ups", value: 8 },
  { label: "Skills Practiced", value: 5 }
];

const PersonalGrowth: React.FC = () => {
  const [view, setView] = useState<'Reflections' | 'Goals' | 'Mood Tracker' | 'Insights' | 'Summary'>('Reflections');
  const [showMoodForm, setShowMoodForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMood, setCurrentMood] = useState('');
  const [reflection, setReflection] = useState('');

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      mood: 'happy',
      jobTitle: 'Frontend Developer at TechCorp',
      reflection: 'Had a great interview today! The team seemed really welcoming and I felt confident answering their technical questions.'
    },
    {
      id: '2',
      date: '2024-01-12',
      mood: 'neutral',
      jobTitle: 'React Developer at WebSolutions',
      reflection: 'Applied to another position. Feeling okay about my chances, but the competition seems tough.'
    },
    {
      id: '3',
      date: '2024-01-10',
      mood: 'excited',
      jobTitle: 'Full Stack Developer at StartupXYZ',
      reflection: 'Just submitted my application! Really excited about this startup opportunity. The role seems perfect for my skills.'
    },
    {
      id: '4',
      date: '2024-01-08',
      mood: 'sad',
      jobTitle: 'Software Engineer at BigTech',
      reflection: 'Got rejected from a position I really wanted. Feeling disappointed but trying to stay positive and learn from the feedback.'
    },
    {
      id: '5',
      date: '2024-01-05',
      mood: 'happy',
      jobTitle: 'Junior Developer at CodeCorp',
      reflection: 'Received positive feedback from the hiring manager. They want to schedule a second interview!'
    }
  ]);

  const moodIcons = {
    happy: { icon: Smile, color: 'text-green-600', bg: 'bg-green-100', emoji: '😊', label: 'Happy' },
    sad: { icon: Frown, color: 'text-blue-600', bg: 'bg-blue-100', emoji: '😢', label: 'Sad' },
    neutral: { icon: Meh, color: 'text-gray-600', bg: 'bg-gray-100', emoji: '😐', label: 'Neutral' },
    angry: { icon: Frown, color: 'text-red-600', bg: 'bg-red-100', emoji: '😠', label: 'Frustrated' },
    excited: { icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100', emoji: '🤩', label: 'Excited' }
  };

  // Pie chart data
  const moodDistribution = Object.entries(
    moodEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([mood, count]) => ({
    name: moodIcons[mood as keyof typeof moodIcons].label,
    value: count,
    color: mood === 'happy' ? '#10B981' :
           mood === 'excited' ? '#EC4899' :
           mood === 'neutral' ? '#6B7280' :
           mood === 'sad' ? '#3B82F6' : '#EF4444'
  }));

  // Add mood entry handler
  const addMoodEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      mood: formData.get('mood') as MoodEntry['mood'],
      jobTitle: formData.get('jobTitle') as string,
      reflection: formData.get('reflection') as string
    };
    setMoodEntries([newEntry, ...moodEntries]);
    setShowMoodForm(false);
  };

  // Weekly reflections (for demo)
  const weeklyReflections = [
    {
      date: "Jan 15, 2024",
      mood: "Motivated",
      event: "Technical Interview at Google",
      reflection: "The interview went better than expected. I was able to solve both coding problems and discuss system design confidently.",
      learnings: ["Dynamic Programming", "System Design", "Communication"],
      nextSteps: ["Practice more DP problems", "Study distributed systems"]
    },
    {
      date: "Jan 12, 2024",
      mood: "Disappointed",
      event: "Rejection from Microsoft",
      reflection: "Got rejected after final round. Feedback was that my system design could be stronger. Not giving up!",
      learnings: ["Resilience", "System Design gaps"],
      nextSteps: ["Take system design course", "Practice more mock interviews"]
    },
    {
      date: "Jan 10, 2024",
      mood: "Confident",
      event: "Applied to 5 companies",
      reflection: "Had a productive day applying to dream companies. Tailored each resume and cover letter.",
      learnings: ["Resume customization", "Research skills"],
      nextSteps: ["Follow up in 1 week", "Prepare for potential calls"]
    }
  ];

  // Progress goals (for demo)
  const progressGoals = [
    { goal: "Apply to 50 companies", current: 47, target: 50, category: "Applications" },
    { goal: "Complete 10 interviews", current: 8, target: 10, category: "Interviews" },
    { goal: "Learn 3 new technologies", current: 2, target: 3, category: "Skills" },
    { goal: "Build 2 projects", current: 1, target: 2, category: "Portfolio" }
  ];

  // Mood trend data for line chart
  const moodTrendData = moodEntries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood === 'happy' ? 5 : 
            entry.mood === 'excited' ? 4 : 
            entry.mood === 'neutral' ? 3 : 
            entry.mood === 'sad' ? 2 : 1,
      moodLabel: moodIcons[entry.mood as keyof typeof moodIcons].label,
    }));

  const downloadReport = () => {
    alert('Download functionality not implemented yet.');
  };

  return (
    <Layout role="student">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Personal Growth Tracker</h1>
            <p className="text-base text-gray-600">Track your emotional journey through your job search</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-500 mb-2">{stat.title}</div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Section */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {["Reflections", "Goals", "Mood Tracker", "Insights", "Summary"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setView(tab as typeof view)}
                    className={`px-4 py-2 rounded ${view === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    {tab}
                  </button>
                ))}
        </div>

              {/* Reflections Tab */}
              {view === "Reflections" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">Daily Reflections</h2>
                  {weeklyReflections.map((entry, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-6 pb-6 mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-yellow-500 text-xl">⭐</span>
                            <span className="font-medium">{entry.event}</span>
                            <span className="ml-2 px-2 py-1 rounded bg-gray-200 text-xs">
                              <span className="border rounded px-2 py-1 text-xs">{entry.mood}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{entry.date}</p>
                        </div>
                        <button className="text-gray-400 hover:text-blue-600">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{entry.reflection}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-base font-semibold mb-2">What I Learned:</h4>
                          <div className="flex flex-wrap gap-1">
                            {entry.learnings.map((learning) => (
                              <span key={learning} className="px-2 py-1 rounded bg-gray-100 text-xs">{learning}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold mb-2">Next Steps:</h4>
                          <ul className="text-sm text-gray-500 space-y-1">
                            {entry.nextSteps.map((step, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                {step}
                      </li>
                    ))}
                  </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Goals Tab */}
              {view === "Goals" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">Progress Goals</h2>
                  {progressGoals.map((goal, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{goal.goal}</h4>
                          <p className="text-sm text-gray-500">{goal.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{goal.current}/{goal.target}</div>
                          <div className="text-sm text-gray-400">
                            {Math.round((goal.current / goal.target) * 100)}% complete
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full px-4 py-2 rounded bg-gray-100 text-gray-700 mt-4 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Goal
                  </button>
                </div>
              )}

              {/* Mood Tracker Tab */}
              {view === "Mood Tracker" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">Emotional Journey</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {moodDistribution.map((mood) => (
                      <div key={mood.name} className="text-center p-4 border rounded-lg">
                        <span className="text-2xl mb-2 block">{mood.name === "Happy" ? "😊" : mood.name === "Excited" ? "🤩" : mood.name === "Neutral" ? "😐" : mood.name === "Sad" ? "😢" : "😠"}</span>
                        <h4 className="font-medium">{mood.name}</h4>
                        <p className="text-2xl font-bold text-blue-600">{mood.value}</p>
                        <p className="text-sm text-gray-500">times</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Add Today's Reflection</h4>
                    <form onSubmit={addMoodEntry} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">How are you feeling today?</label>
                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(moodIcons).map(([key, { emoji, label }]) => (
                            <button
                              key={key}
                              type="button"
                              className={`px-3 py-2 rounded ${currentMood === key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                              onClick={() => setCurrentMood(key)}
                            >
                              {emoji} {label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Today's Reflection</label>
                        <textarea
                          name="reflection"
                          rows={3}
                          placeholder="What happened today? How did it make you feel? What did you learn?"
                          value={reflection}
                          onChange={(e) => setReflection(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                      </div>
                      <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Save Reflection
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Insights Tab */}
              {view === "Insights" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">AI Insights</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">📈 Progress Highlight</h4>
                      <p className="text-blue-800">You've applied to 12 more companies this week compared to last week. Your consistency is improving!</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">💪 Strength Recognition</h4>
                      <p className="text-green-800">Your technical interviews have a 75% success rate. Your preparation strategy is working well.</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">🎯 Opportunity Area</h4>
                      <p className="text-yellow-800">Consider following up on applications after 5-7 days. This could increase your response rate.</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">🔮 Prediction</h4>
                      <p className="text-purple-800">Based on your current trajectory, you're likely to receive 2-3 interview calls in the next two weeks.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Tab */}
              {view === "Summary" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  {/* Monthly Summary */}
                  <div className="space-y-6">
                    <div className="card">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">January 2024 Summary</h2>
                        <button
                          onClick={downloadReport}
                          className="flex items-center text-blue-600 hover:text-blue-700 bg-blue-100/50 px-4 py-2 rounded-lg"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center p-6 bg-blue-100 rounded-xl">
                          <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                          <div className="text-sm text-gray-600">Total Applications</div>
                          <div className="text-xs text-gray-400 mt-1">From Application Tracker</div>
                        </div>
                        <div className="text-center p-6 bg-green-100 rounded-xl">
                          <div className="text-3xl font-bold text-green-600 mb-2">{moodEntries.length}</div>
                          <div className="text-sm text-gray-600">Mood Entries</div>
                          <div className="text-xs text-gray-400 mt-1">Manual logs</div>
                        </div>
                        <div className="text-center p-6 bg-purple-100 rounded-xl">
                          <div className="text-3xl font-bold text-purple-600 mb-2">
                            {moodEntries.filter(e => e.mood === 'happy' || e.mood === 'excited').length}
                          </div>
                          <div className="text-sm text-gray-600">Positive Days</div>
                          <div className="text-xs text-gray-400 mt-1">Happy or Excited</div>
                        </div>
                      </div>
                    </div>

                    {/* Mood Distribution Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
                        {moodDistribution.length > 0 ? (
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={moodDistribution}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                              >
                                {moodDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <div className="text-4xl mb-2">📊</div>
                            <p>No mood data to display</p>
                          </div>
                        )}
                      </div>

                      {/* Mood Trend Chart */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">Mood Trend</h3>
                        {moodTrendData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={300}>
                                                         <LineChart data={moodTrendData}>
                               <CartesianGrid strokeDasharray="3 3" />
                               <XAxis dataKey="date" />
                               <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                               <Tooltip 
                                 formatter={(value) => [
                                   moodTrendData.find(d => d.mood === value)?.moodLabel || value, 
                                   'Mood'
                                 ]}
                                 labelFormatter={(label) => `Date: ${label}`}
                               />
                              <Line 
                                type="monotone" 
                                dataKey="mood" 
                                stroke="#2563EB" 
                                strokeWidth={3}
                                dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <div className="text-4xl mb-2">📈</div>
                            <p>No trend data to display</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI-Generated Insights */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold mb-4">AI-Generated Insights</h3>
                      {moodEntries.length > 0 ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl border-l-4 border-blue-600">
                            <div className="flex items-center mb-2">
                              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                              <p className="font-medium text-blue-800">Positive Trend Detected</p>
                            </div>
                            <p className="text-blue-700 text-sm">
                              Your mood tends to improve after interview experiences, suggesting you're gaining confidence through practice.
                            </p>
                          </div>
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl border-l-4 border-yellow-400">
                            <div className="flex items-center mb-2">
                              <span className="text-yellow-600 mr-2">💡</span>
                              <p className="font-medium text-yellow-800">Recommendation</p>
                            </div>
                            <p className="text-yellow-700 text-sm">
                              Consider scheduling regular reflection sessions, especially after significant job search events to maintain emotional awareness.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 border border-green-200 rounded-xl border-l-4 border-green-400">
                            <div className="flex items-center mb-2">
                              <span className="text-green-600 mr-2">🎯</span>
                              <p className="font-medium text-green-800">Success Pattern</p>
                            </div>
                            <p className="text-green-700 text-sm">
                              Your most positive entries correlate with startup opportunities, suggesting you thrive in dynamic environments.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="text-4xl mb-2">🤖</div>
                          <p>AI insights will appear after you log more mood entries</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Section */}
            <div className="w-full lg:w-96 space-y-6">
              {/* Activity Calendar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Activity Calendar
                </h2>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(2024, 0, i - 6); // January 2024
                    const dateStr = date.toISOString().split('T')[0];
                    const dayEntry = moodEntries.find(entry => entry.date === dateStr);
                    const isCurrentMonth = date.getMonth() === 0;
                    return (
                      <div
                        key={i}
                        className={`h-20 border border-gray-200 rounded p-2 hover:bg-gray-50 ${
                          !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                        }`}
                      >
                        <div className="text-sm text-gray-600 mb-1">
                          {date.getDate()}
                        </div>
                        {dayEntry && isCurrentMonth && (
                          <div className="text-center">
                            <span className="text-2xl" title={`${moodIcons[dayEntry.mood].label}: ${dayEntry.jobTitle}`}>
                              {moodIcons[dayEntry.mood].emoji}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Calendar Legend */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Application Sent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Interview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Follow-up</span>
                  </div>
                </div>
              </div>

              {/* Motivational Quote */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Today's Motivation</h3>
                <p className="text-white/90 mb-4">{motivationalQuote.quote}</p>
                <p className="text-sm text-white/70">- {motivationalQuote.author}</p>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">This Week</h3>
                <div className="space-y-4">
                  {quickStats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm">{stat.label}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section - Always visible */}
          <div className="mt-8">
            {/* This section is now handled by the Summary tab */}
          </div>
        </div>
      </div>
      {showMoodForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full z-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Log Your Mood</h2>
            <form onSubmit={addMoodEntry}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
                <div className="flex gap-2">
                  {Object.entries(moodIcons).map(([key, { emoji, label, bg }]) => (
                    <label
                      key={key}
                      className={`flex items-center cursor-pointer p-3 rounded-lg border ${bg} transition-all duration-200 ease-in-out hover:scale-105`}
                    >
                      <input
                        type="radio"
                        name="mood"
                        value={key}
                        checked={currentMood === key}
                        onChange={() => setCurrentMood(key)}
                        className="hidden"
                        required
                      />
                      <span className="text-2xl mr-2">{emoji}</span>
                      <span className="text-sm font-medium text-gray-900">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  name="jobTitle"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter job title"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reflection</label>
                <textarea
                  name="reflection"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="What went well? What challenges did you face?"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowMoodForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Mood Entry
                </button>
              </div>
            </form>
      </div>
    </div>
      )}
    </Layout>
  );
};

export default PersonalGrowth;

