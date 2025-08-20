// src/App.jsx
import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">Career Companion</h1>
        <ul className="flex gap-6 text-gray-600 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer">Applications</li>
          <li className="hover:text-blue-600 cursor-pointer">Profile</li>
        </ul>
      </nav>

      {/* Dashboard shell */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6 hidden md:block">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">🏠 Home</li>
            <li className="hover:text-blue-600 cursor-pointer">📄 Resumes</li>
            <li className="hover:text-blue-600 cursor-pointer">📊 Analytics</li>
            <li className="hover:text-blue-600 cursor-pointer">⚙ Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="font-semibold text-lg">Skill Gap Analyzer</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Analyze and improve your skills.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="font-semibold text-lg">Application Tracker</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Track your job applications easily.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="font-semibold text-lg">Peer Resume Comparison</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Compare resumes with peers.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
