
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProfileSection } from '@/components/ProfileSection';
import { GitHubSection } from '@/components/GitHubSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AdminPanel } from '@/components/AdminPanel';
import { AuthProvider } from '@/hooks/useAuth';

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <Header isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        
        {isAdminMode ? (
          <AdminPanel />
        ) : (
          <main className="container mx-auto px-4 py-12 space-y-20">
            <ProfileSection />
            <GitHubSection />
            <ProjectsSection />
          </main>
        )}
      </div>
    </AuthProvider>
  );
};

export default Index;
