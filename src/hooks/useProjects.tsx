
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type DbProject = Database['public']['Tables']['projects']['Row'];

interface Project {
  id: string;
  name: string;
  description: string | null;
  technologies: string[] | null;
  live_url: string | null;
  github_url: string | null;
  image_url: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: string | null;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "שגיאה בטעינת פרויקטים",
        description: "לא ניתן לטעון את הפרויקטים כרגע",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => [data, ...prev]);
      toast({
        title: "הפרויקט נוסף בהצלחה!",
        description: `הפרויקט "${projectData.name}" נוסף לרשימה.`,
      });
      return data;
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "שגיאה בהוספת פרויקט",
        description: "לא ניתן להוסיף את הפרויקט כרגע",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      toast({
        title: "הפרויקט עודכן בהצלחה!",
        description: `הפרויקט עודכן.`,
      });
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "שגיאה בעדכון פרויקט",
        description: "לא ניתן לעדכן את הפרויקט כרגע",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProjects(prev => prev.filter(p => p.id !== id));
      toast({
        title: "הפרויקט נמחק",
        description: "הפרויקט הוסר מהרשימה.",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "שגיאה במחיקת פרויקט",
        description: "לא ניתן למחוק את הפרויקט כרגע",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};
