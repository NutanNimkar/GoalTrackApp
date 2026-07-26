import React from 'react';
import VerticalNavigation from './VerticalNavigation';

const AppShell = ({ children, title, actions }) => (
  <div className="flex h-screen bg-bg overflow-hidden">
    <VerticalNavigation />
    <div className="flex-1 flex flex-col overflow-hidden">
      {(title || actions) && (
        <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
          {title && (
            <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  </div>
);

export default AppShell;
