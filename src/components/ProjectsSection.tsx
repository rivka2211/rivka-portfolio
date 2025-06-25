
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'פלטפורמת מסחר אלקטרוני מלאה עם מערכת תשלומים, ניהול מלאי ופאנל ניהול מתקדם.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/rivka2211/ecommerce-platform',
    image: '/placeholder.svg',
    aiGenerated: true
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'אפליקציה לניהול משימות עם אפשרות שיתוף בין משתמשים, התראות וסנכרון בזמן אמת.',
    technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
    liveUrl: 'https://example-tasks.com',
    githubUrl: 'https://github.com/rivka2211/task-manager',
    image: '/placeholder.svg',
    aiGenerated: true
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description: 'לוח בקרה מתקדם לתחזית מזג אוויר עם גרפים אנימטיביים ונתונים מרובי מקורות.',
    technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
    liveUrl: 'https://example-weather.com',
    githubUrl: 'https://github.com/rivka2211/weather-dashboard',
    image: '/placeholder.svg',
    aiGenerated: true
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">הפרויקטים שלי</h2>
        <p className="text-gray-300 text-lg">פרויקטים נבחרים עם קישורים פעילים</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
            <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-4 flex items-center justify-center">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover rounded-lg opacity-80"
              />
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              {project.aiGenerated && (
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-purple-400">AI Generated</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                צפה באתר
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
