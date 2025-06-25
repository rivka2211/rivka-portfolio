
import { User, Settings, Github, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

export const Header = ({ isAdminMode, setIsAdminMode }: HeaderProps) => {
  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Rivka's Portfolio</h1>
              <p className="text-purple-300 text-sm">Full Stack Developer</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#profile" className="text-gray-300 hover:text-purple-400 transition-colors">
              פרופיל
            </a>
            <a href="#github" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-1">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a href="#projects" className="text-gray-300 hover:text-purple-400 transition-colors">
              פרויקטים
            </a>
            <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">
              יצירת קשר
            </a>
            <a href="#jobs" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>הצעות עבודה</span>
            </a>
          </nav>

          <Button
            onClick={() => setIsAdminMode(!isAdminMode)}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-purple-400"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
