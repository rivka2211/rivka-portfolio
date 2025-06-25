
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProfileSection } from '../components/ProfileSection';
import { GitHubSection } from '../components/GitHubSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { JobOffersSection } from '../components/JobOffersSection';
import { AdminPanel } from '../components/AdminPanel';

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      {isAdminMode ? (
        <AdminPanel />
      ) : (
        <main className="container mx-auto px-4 py-8 space-y-16">
          <ProfileSection />
          <GitHubSection />
          <ProjectsSection />
          <ContactSection />
          <JobOffersSection />
        </main>
      )}
    </div>
  );
};

export default Index;
