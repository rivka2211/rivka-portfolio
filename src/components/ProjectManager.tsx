
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ExternalLink, Github, Save, X } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  live_url: string;
  github_url: string;
  image_url: string;
  status: 'active' | 'completed' | 'in-progress';
}

export const ProjectManager = () => {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    live_url: '',
    github_url: '',
    image_url: '',
    status: 'active' as 'active' | 'completed' | 'in-progress'
  });

  const handleSaveProject = async () => {
    const techArray = formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean);
    
    try {
      if (editingProject) {
        await updateProject(editingProject.id, {
          ...formData,
          technologies: techArray
        });
      } else {
        await addProject({
          ...formData,
          technologies: techArray
        });
      }
      resetForm();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      technologies: project.technologies.join(', '),
      live_url: project.live_url,
      github_url: project.github_url,
      image_url: project.image_url,
      status: project.status
    });
    setShowForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: '',
      live_url: '',
      github_url: '',
      image_url: '',
      status: 'active'
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  if (loading) {
    return <div className="text-white">טוען פרויקטים...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">ניהול פרויקטים</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          הוסף פרויקט
        </Button>
      </div>

      {showForm && (
        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">
              {editingProject ? 'עריכת פרויקט' : 'הוספת פרויקט חדש'}
            </h3>
            <Button onClick={resetForm} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">שם הפרויקט</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-white">סטטוס</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'completed' | 'in-progress' }))}
                className="w-full h-10 px-3 py-2 bg-black/20 border border-purple-500/30 rounded-md text-white"
              >
                <option value="active">פעיל</option>
                <option value="completed">הושלם</option>
                <option value="in-progress">בעבודה</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="description" className="text-white">תיאור</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-black/20 border-purple-500/30 text-white resize-none"
              rows={3}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="live_url" className="text-white">קישור לאתר</Label>
              <Input
                id="live_url"
                value={formData.live_url}
                onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                className="bg-black/20 border-purple-500/30 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="github_url" className="text-white">קישור GitHub</Label>
              <Input
                id="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                className="bg-black/20 border-purple-500/30 text-white"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="technologies" className="text-white">טכנולוגיות (מופרדות בפסיק)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                className="bg-black/20 border-purple-500/30 text-white"
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div>
              <Label htmlFor="image_url" className="text-white">קישור לתמונה</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                className="bg-black/20 border-purple-500/30 text-white"
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div className="flex space-x-2 mt-6">
            <Button
              onClick={handleSaveProject}
              disabled={!formData.name || !formData.description}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Save className="w-4 h-4 mr-2" />
              שמור
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-purple-500/50 text-purple-400">
              ביטול
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status === 'active' ? 'פעיל' : 
                   project.status === 'completed' ? 'הושלם' : 'בעבודה'}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEditProject(project)}
                  size="sm"
                  variant="ghost"
                  className="text-purple-400"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteProject(project.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2">
              {project.live_url && (
                <Button
                  size="sm"
                  onClick={() => window.open(project.live_url, '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  צפה באתר
                </Button>
              )}
              {project.github_url && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(project.github_url, '_blank')}
                  className="border-purple-500/50 text-purple-400"
                >
                  <Github className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {projects.length === 0 && (
        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8 text-center">
          <p className="text-gray-400">עדיין לא הוספת פרויקטים. לחץ על "הוסף פרויקט" כדי להתחיל.</p>
        </Card>
      )}
    </div>
  );
};
