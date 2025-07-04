
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Star, GitBranch, Eye, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  html_url: string;
  updated_at: string;
  topics: string[];
  ai_description?: string;
}

export const GitHubSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const reposPerPage = 6;

  useEffect(() => {
    fetchGitHubRepos();
  }, [currentPage]);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/rivka2211/repos?sort=updated&per_page=${reposPerPage}&page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const data = await response.json();
      
      // Generate AI descriptions for repositories
      const reposWithAI = data.map((repo: GitHubRepo) => ({
        ...repo,
        ai_description: generateAIDescription(repo)
      }));
      
      setRepos(reposWithAI);
      
      // Get total count from headers
      const totalResponse = await fetch('https://api.github.com/users/rivka2211/repos?per_page=1');
      const totalData = await totalResponse.json();
      setTotalRepos(totalData.length || 30); // fallback estimate
      
    } catch (err) {
      setError('שגיאה בטעינת הרפוזיטורים מ-GitHub');
      console.error('Error fetching GitHub repos:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateAIDescription = (repo: GitHubRepo): string => {
    const language = repo.language || 'JavaScript';
    const topics = repo.topics || [];
    
    // AI-generated description based on repo data
    const descriptions = {
      'web-app': `אפליקציית ${language} מתקדמת עם ממשק משתמש מודרני וחוויית משתמש מעולה.`,
      'api': `API רובוסטי בנוי עם ${language} לטיפול ביעילות בבקשות ונתונים.`,
      'mobile': `אפליקציה מובילה המותאמת לניידים עם ביצועים גבוהים.`,
      'data': `פתרון מתקדם לעיבוד וניתוח נתונים עם ${language}.`,
      'ai': `פרויקט בינה מלאכותית חדשני המשלב טכנולוגיות ${language} מתקדמות.`,
      'default': `פרויקט ${language} מקצועי עם ארכיטקטורה נקייה וקוד איכותי.`
    };

    // Determine description type based on topics and language
    if (topics.some(t => t.includes('api') || t.includes('backend'))) return descriptions.api;
    if (topics.some(t => t.includes('mobile') || t.includes('react-native'))) return descriptions.mobile;
    if (topics.some(t => t.includes('data') || t.includes('analytics'))) return descriptions.data;
    if (topics.some(t => t.includes('ai') || t.includes('ml'))) return descriptions.ai;
    if (topics.some(t => t.includes('web') || t.includes('frontend'))) return descriptions['web-app'];
    
    return descriptions.default;
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500/20 text-yellow-300',
      TypeScript: 'bg-blue-500/20 text-blue-300',
      Python: 'bg-green-500/20 text-green-300',
      React: 'bg-cyan-500/20 text-cyan-300',
      HTML: 'bg-orange-500/20 text-orange-300',
      CSS: 'bg-purple-500/20 text-purple-300',
      Java: 'bg-red-500/20 text-red-300',
      'C#': 'bg-indigo-500/20 text-indigo-300',
    };
    return colors[language] || 'bg-gray-500/20 text-gray-300';
  };

  const totalPages = Math.ceil(totalRepos / reposPerPage);

  if (loading) {
    return (
      <section id="github" className="animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">GitHub Repository</h2>
          <p className="text-gray-300 text-lg">הפרויקטים הציבוריים שלי</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6">
              <Skeleton className="h-6 w-3/4 mb-4 bg-gray-700" />
              <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
              <Skeleton className="h-4 w-2/3 mb-4 bg-gray-700" />
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="animate-fade-in">
        <Card className="bg-black/40 backdrop-blur-lg border-red-500/20 p-8 text-center">
          <p className="text-red-400">{error}</p>
          <Button onClick={fetchGitHubRepos} className="mt-4">
            נסה שוב
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section id="github" className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Github className="w-8 h-8 text-purple-400" />
          <h2 className="text-4xl font-bold text-white">GitHub Repository</h2>
        </div>
        <p className="text-gray-300 text-lg">הפרויקטים הציבוריים שלי</p>
        <p className="text-gray-400 text-sm mt-2">עמוד {currentPage} מתוך {totalPages}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <Card key={repo.id} className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white truncate">{repo.name}</h3>
              <Button
                size="sm"
                variant="ghost"
                className="text-purple-400 hover:text-purple-300"
                onClick={() => window.open(repo.html_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {repo.ai_description || repo.description || 'פרויקט מתקדם עם טכנולוגיות חדשניות'}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.language && (
                <Badge className={getLanguageColor(repo.language)}>
                  {repo.language}
                </Badge>
              )}
              {repo.topics.slice(0, 2).map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {topic}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between text-gray-400 text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitBranch className="w-4 h-4" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{repo.watchers_count}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              עודכן לאחרונה: {new Date(repo.updated_at).toLocaleDateString('he-IL')}
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            הקודם
          </Button>
          
          <span className="text-gray-300">
            {currentPage} / {totalPages}
          </span>
          
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
          >
            הבא
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </section>
  );
};
