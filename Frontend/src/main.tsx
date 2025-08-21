import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Disable all transitions globally
const disableTransitions = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Toggle Switch Animations */
    @keyframes toggleOn {
      from { transform: translateX(2px); }
      to { transform: translateX(22px); }
    }
    
    @keyframes toggleOff {
      from { transform: translateX(22px); }
      to { transform: translateX(2px); }
    }
    
    .toggle-switch.toggling-on .toggle-slider {
      animation: toggleOn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
    
    .toggle-switch.toggling-off .toggle-slider {
      animation: toggleOff 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
    /* NUCLEAR OPTION - DISABLE ALL TRANSITIONS */
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      transition-property: none !important;
      transition-duration: 0s !important;
      transition-timing-function: none !important;
      transition-delay: 0s !important;
    }
    
    /* Disable all hover effects */
    *:hover {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all focus effects */
    *:focus {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all active effects */
    *:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all visited effects */
    *:visited {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Override ALL Tailwind transition classes */
    .transition,
    .transition-all,
    .transition-colors,
    .transition-opacity,
    .transition-shadow,
    .transition-transform,
    .duration-75,
    .duration-100,
    .duration-150,
    .duration-200,
    .duration-300,
    .duration-500,
    .duration-700,
    .duration-1000,
    .ease-linear,
    .ease-in,
    .ease-out,
    .ease-in-out {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      transition-property: none !important;
      transition-duration: 0s !important;
      transition-timing-function: none !important;
      transition-delay: 0s !important;
    }
    
    /* Disable all button transitions except toggle switches */
    button:not([class*="toggle"]):not([class*="switch"]),
    button:not([class*="toggle"]):not([class*="switch"]):hover,
    button:not([class*="toggle"]):not([class*="switch"]):focus,
    button:not([class*="toggle"]):not([class*="switch"]):active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Allow toggle switch transitions - OVERRIDE ALL DISABLED TRANSITIONS */
    .toggle-switch,
    .toggle-switch *,
    .toggle-switch span,
    .toggle-slider {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Force toggle slider transforms to work */
    .toggle-slider {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      transform: translateX(0) !important;
    }
    
    /* Ensure transform overrides work */
    .toggle-switch .toggle-slider[style*="translateX(22px)"] {
      transform: translateX(22px) !important;
    }
    
    .toggle-switch .toggle-slider[style*="translateX(2px)"] {
      transform: translateX(2px) !important;
    }
    
    /* Add hover effect for better interaction feedback */
    .toggle-switch:hover .toggle-slider {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Override any conflicting styles */
    .toggle-switch * {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Disable all link transitions */
    a,
    a:hover,
    a:focus,
    a:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all div transitions */
    div,
    div:hover,
    div:focus,
    div:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // Also disable via JavaScript
  document.documentElement.style.setProperty('transition', 'none', 'important');
  document.documentElement.style.setProperty('animation', 'none', 'important');
  document.documentElement.style.setProperty('transform', 'none', 'important');
  
  // Disable for body too
  document.body.style.setProperty('transition', 'none', 'important');
  document.body.style.setProperty('animation', 'none', 'important');
  document.body.style.setProperty('transform', 'none', 'important');
  
  // Disable for all elements
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    (element as HTMLElement).style.setProperty('transition', 'none', 'important');
    (element as HTMLElement).style.setProperty('animation', 'none', 'important');
    (element as HTMLElement).style.setProperty('transform', 'none', 'important');
  });
};

// Run immediately
disableTransitions();

// Also run after DOM is loaded
document.addEventListener('DOMContentLoaded', disableTransitions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);