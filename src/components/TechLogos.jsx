import React from 'react';

export function PythonLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 6 2.5 6 5.5v2h6v1H6c-2.5 0-3 1-3 3.5s.5 3.5 3 3.5h1v-1.5c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5-1 2.5-2.5v-4C16 2.5 15.5 2 12 2z" fill="#3776AB"/>
      <path d="M12 22c5.52 0 6-.5 6-3.5v-2h-6v-1h6c2.5 0 3-1 3-3.5s-.5-3.5-3-3.5h-1v1.5c0 1.5-1 2.5-2.5 2.5h-4c-1.5 0-2.5 1-2.5 2.5v4c0 3 0.5 3.5 4 3.5z" fill="#FFE873"/>
      <circle cx="9" cy="4.5" r="0.75" fill="#fff"/>
      <circle cx="15" cy="19.5" r="0.75" fill="#fff"/>
    </svg>
  );
}

export function JavaLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 2c-.2.5-.4 1.1-.3 1.7.1.6.4 1.1.7 1.6.3.5.7.9 1 1.4.3.5.4 1.1.3 1.7-.1.6-.4 1.1-.7 1.6h2c.3-.5.6-1.1.7-1.6.1-.6-.1-1.2-.4-1.7-.3-.5-.7-.9-1-1.4-.3-.5-.4-1.1-.3-1.7.1-.6.4-1.1.7-1.6h-2.7z" fill="#ea2d2e"/>
      <path d="M9.5 3.5c-.2.5-.4 1.1-.3 1.7.1.6.4 1.1.7 1.6.3.5.7.9 1 1.4.3.5.4 1.1.3 1.7-.1.6-.4 1.1-.7 1.6h2c.3-.5.6-1.1.7-1.6.1-.6-.1-1.2-.4-1.7-.3-.5-.7-.9-1-1.4-.3-.5-.4-1.1-.3-1.7.1-.6.4-1.1.7-1.6H9.5z" fill="#ea2d2e"/>
      <path d="M19 12c.5 0 .9.2 1.2.6.3.4.4.9.4 1.4 0 1.2-.7 2-1.7 2.3-.9.2-2 .3-3.2.3H7.8c-.8 0-1.6-.1-2.3-.2-.5-.1-1-.2-1.3-.4-.4-.3-.6-.7-.6-1.2 0-.6.3-1.1.7-1.4.4-.3.9-.4 1.5-.4H19zm-3.2 2H6v.7c0 .4.4.7 1 .8.6.1 1.3.2 2 .2h7c.8 0 1.5-.1 2-.2.5-.1.8-.4.8-.8v-.7h-3z" fill="#007396"/>
      <path d="M4 17.5c2 1 5 1.5 8 1.5s6-.5 8-1.5c-1-.5-4-1-8-1s-7 .5-8 1.5z" fill="#007396"/>
    </svg>
  );
}

export function JavaScriptLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" x="2" y="2" rx="3" fill="#F7DF1E"/>
      <path d="M14.5 17.5c.5.3 1.1.5 1.7.5.9 0 1.5-.4 1.5-1.2v-4.5h-1.5v4.5c0 .3-.1.5-.4.5-.2 0-.4-.1-.5-.2l-.8.9zm-5.5-1.5c0-.6.3-1.1.8-1.3.4-.2.8-.2 1.2 0l.4-1.1c-.6-.3-1.3-.3-2 0-.7.3-1.2.9-1.2 1.7 0 1.4 1.2 1.6 1.8 2 .5.3.8.4.8.7 0 .3-.2.5-.6.5-.4 0-.8-.2-1.1-.5l-.6.9c.5.4 1.1.6 1.7.6.9 0 1.6-.5 1.6-1.4 0-1.3-1.2-1.6-1.8-2-.5-.3-.8-.4-.8-.7z" fill="#323330"/>
    </svg>
  );
}

export function HTMLLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2h16l-1.5 16.5L12 21.5l-6.5-3L4 2z" fill="#E34F26"/>
      <path d="M12 3.5v16.2l5-2.3 1.2-12.4H12z" fill="#F06529"/>
      <path d="M12 7.5H8.2l.2 2H12v-2zm0 4H8.6l.3 3L12 15.5V11.5z" fill="#EBEBEB"/>
      <path d="M12 7.5h4.2l-.4 4H12v-4zm0 4h3.8l-.4 4-3.4 1v-5z" fill="#FFFFFF"/>
    </svg>
  );
}

export function CSSLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2h16l-1.5 16.5L12 21.5l-6.5-3L4 2z" fill="#1572B6"/>
      <path d="M12 3.5v16.2l5-2.3 1.2-12.4H12z" fill="#21A1F1"/>
      <path d="M12 7.5H8.2l.2 2H12v-2zm0 4H8.6l.3 3L12 15.5V11.5z" fill="#EBEBEB"/>
      <path d="M12 7.5h4.2l-.4 4H12v-4zm0 4h3.8l-.4 4-3.4 1v-5z" fill="#FFFFFF"/>
    </svg>
  );
}

export function AWSLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3c-4.4 0-8 3.6-8 8 0 2.2.9 4.2 2.3 5.7L5 18v2h4l.7-.7c.7.4 1.5.7 2.3.7 4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 4.5 12 4.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z" fill="#FF9900"/>
      <path d="M14.5 15.5c-1-.5-2.2-.8-3.5-.8-1.5 0-2.8.4-3.8 1.1l1.2 1.2c.7-.5 1.6-.8 2.6-.8.9 0 1.8.2 2.5.6l1-1.3z" fill="#FF9900"/>
      <path d="M16 16.5l2-2.5-3.5-.5 1.5 3z" fill="#232F3E"/>
    </svg>
  );
}

export function GCPLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3 8.3L12 4.1 4.7 8.3v8.4l7.3 4.2 7.3-4.2V8.3z" stroke="#4285F4" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 4.1v8.4H4.7" stroke="#EA4335" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 12.5l7.3-4.2" stroke="#FBBC05" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 12.5v8.4" stroke="#34A853" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function JenkinsLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z" fill="#D24939"/>
    </svg>
  );
}

export function DockerLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10.5h1.5v-1.5h-1.5v1.5zm2.5 0h1.5v-1.5h-1.5v1.5zm2.5 0h1.5v-1.5h-1.5v1.5zm2.5 0h1.5v-1.5h-1.5v1.5zm-7.5-2.5h1.5v-1.5h-1.5v1.5zm2.5 0h1.5v-1.5h-1.5v1.5zm2.5 0h1.5v-1.5h-1.5v1.5zm-5 5h16.5c.3 0 .5-.2.5-.5 0-3.5-2.2-6.5-5.5-7.5l-.5.5v1h-1.5v-1.5h-1.5V6H11v1.5H9.5V6H8v1.5H6.5v1.5H5v1.5H3.5v1H2v2.5h1z" fill="#2496ED"/>
    </svg>
  );
}

export function SonarQubeLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18c4-4 12-4 16 0" stroke="#4E9BCD" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M6 14c3-3 9-3 12 0" stroke="#54B243" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 10c2-2 6-2 8 0" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TrivyLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#00FF88" opacity="0.3"/>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00FF88" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="11" r="3" stroke="#00FF88" strokeWidth="2"/>
      <path d="M14.5 13.5L17 16" stroke="#00FF88" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function TerraformLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6.5l4-2.5v5l-4 2.5v-5z" fill="#844FBA"/>
      <path d="M12 11.5l4-2.5v5l-4 2.5v-5z" fill="#844FBA"/>
      <path d="M8 9l4-2.5v5L8 14V9z" fill="#844FBA"/>
      <path d="M8 19l4-2.5v5L8 24v-5z" fill="#5C4EE5"/>
    </svg>
  );
}

export function MachineLearningLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="12" r="2.5" fill="#00FF88"/>
      <circle cx="12" cy="6" r="2.5" fill="#8B5CF6"/>
      <circle cx="12" cy="18" r="2.5" fill="#8B5CF6"/>
      <circle cx="18" cy="12" r="2.5" fill="#00E5FF"/>
      <path d="M8.5 12h7M6 10.5l4.5-3.5M6 13.5L10.5 17M12 8.5v7M13.5 7.5l3 3M13.5 16.5l3-3" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

export function NLPLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#8B5CF6" strokeWidth="2"/>
      <path d="M7 8h10M7 12h6M7 16h8" stroke="#00FF88" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function EDALogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 16l4-4 4 4 5-6" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="12" r="1.5" fill="#fff"/>
      <circle cx="15" cy="16" r="1.5" fill="#fff"/>
    </svg>
  );
}

export function PromptLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" fill="#00FF88"/>
      <path d="M19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#00E5FF"/>
    </svg>
  );
}

export function SQLLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="#FB923C" opacity="0.3"/>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" stroke="#FB923C" strokeWidth="2"/>
      <path d="M5 5v6c0 1.5 3 2.5 7 2.5s7-1 7-2.5V5" stroke="#FB923C" strokeWidth="2"/>
      <path d="M5 11v6c0 1.5 3 2.5 7 2.5s7-1 7-2.5v-6" stroke="#FB923C" strokeWidth="2"/>
    </svg>
  );
}

export function MongoDBLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9 6 8 10 8 13c0 3 2 5 4 6 2-1 4-3 4-6 0-3-1-7-4-11z" fill="#47A248"/>
      <path d="M12 2v17c.7 0 1.3-.2 1.8-.5C15 17.5 16 15 16 13c0-3-1-7-4-11z" fill="#3F3F3F"/>
      <path d="M12 1v21" stroke="#47A248" strokeWidth="1.5"/>
    </svg>
  );
}
