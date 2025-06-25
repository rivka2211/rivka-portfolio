
import { useState } from 'react';
import { User, Settings, Github, Briefcase, Shield, LogOut, Globe, Palette, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

export const Header = ({ isAdminMode, setIsAdminMode }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'he' | 'en'>('he');
  const { user, isAdmin, signOut } = useAuth();

  const handleSettingsClick = () => {
    if (isAdmin) {
      setIsAdminMode(!isAdminMode);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsAdminMode(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleLanguage = () => {
    const newLang = language === 'he' ? 'en' : 'he';
    setLanguage(newLang);
    document.documentElement.setAttribute('dir', newLang === 'he' ? 'rtl' : 'ltr');
  };

  return (
    <>
      <header className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <div className="text-white font-bold text-sm">
                  <span className="text-purple-200">R</span>
                  <span className="text-pink-200">E</span>
                </div>
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

            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-purple-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-purple-400"
              >
                <Globe className="w-4 h-4" />
              </Button>

              {user && isAdmin && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm">מחובר</span>
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-purple-400"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/90 border-purple-500/20">
                  {isAdmin ? (
                    <>
                      <DropdownMenuItem 
                        onClick={handleSettingsClick}
                        className="text-white hover:bg-purple-500/20"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {isAdminMode ? 'צפיה רגילה' : 'מצב ניהול'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-purple-500/20" />
                      <DropdownMenuItem 
                        onClick={handleSignOut}
                        className="text-red-400 hover:bg-red-500/20"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        התנתק
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem 
                      onClick={handleSettingsClick}
                      className="text-white hover:bg-purple-500/20"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      כניסת מנהל
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={() => {
          setShowAuthModal(false);
          setIsAdminMode(true);
        }}
      />
    </>
  );
};
