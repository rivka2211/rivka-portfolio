
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Plus } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  status: 'active' | 'completed' | 'in-progress';
}

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage or use default empty array
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  if (projects.length === 0) {
    return (
      <section id="projects" className="animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">הפרויקטים שלי</h2>
          <p className="text-gray-300 text-lg">פרויקטים נבחרים עם קישורים פעילים</p>
        </div>

        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Plus className="w-16 h-16 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">עדיין לא הוספת פרויקטים</h3>
            <p className="text-gray-300">
              היכנס למצב ניהול כדי להוסיף פרויקטים וליצור תיק עבודות מרשים
            </p>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section id="projects" className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">הפרויקטים שלי</h2>
        <p className="text-gray-300 text-lg">פרויקטים נבחרים עם קישורים פעילים</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
            <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-purple-300 text-lg font-medium">
                  {project.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <Badge 
                className={
                  project.status === 'active' ? 'bg-green-500/20 text-green-300' :
                  project.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }
              >
                {project.status === 'active' ? 'פעיל' : 
                 project.status === 'completed' ? 'הושלם' : 'בעבודה'}
              </Badge>
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
              {project.liveUrl && (
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  צפה באתר
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  <Github className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
