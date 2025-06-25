
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, DollarSign, MapPin, Clock, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const JobOffersSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_email: '',
    job_title: '',
    job_type: '',
    location: '',
    salary_range: '',
    job_description: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('job_offers')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "הצעת עבודה נשלחה בהצלחה!",
        description: "ההצעה שלך נוספה למערכת ואחזור אליך בהקדם.",
      });
      
      setFormData({
        company_name: '',
        contact_name: '',
        contact_email: '',
        job_title: '',
        job_type: '',
        location: '',
        salary_range: '',
        job_description: '',
        message: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting job offer:', error);
      toast({
        title: "שגיאה בשליחת הצעת עבודה",
        description: "נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="jobs" className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Briefcase className="w-8 h-8 text-purple-400" />
          <h2 className="text-4xl font-bold text-white">הצעות עבודה ופרויקטים</h2>
        </div>
        <p className="text-gray-300 text-lg">מקום להשארת הצעות עבודה ופרויקטים עבורי</p>
      </div>

      <div className="mb-8">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          השאר הצעת עבודה
        </Button>
      </div>

      {showForm && (
        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6">הצעת עבודה חדשה</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="company_name"
                placeholder="שם החברה"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <Input
                type="text"
                name="contact_name"
                placeholder="שם איש קשר"
                value={formData.contact_name}
                onChange={handleChange}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="email"
                name="contact_email"
                placeholder="אימייל ליצירת קשר"
                value={formData.contact_email}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <Input
                type="text"
                name="job_title"
                placeholder="תפקיד"
                value={formData.job_title}
                onChange={handleChange}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, job_type: value }))}>
                <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                  <SelectValue placeholder="סוג משרה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="משרה מלאה">משרה מלאה</SelectItem>
                  <SelectItem value="משרה חלקית">משרה חלקית</SelectItem>
                  <SelectItem value="פרילנס">פרילנס</SelectItem>
                  <SelectItem value="פרויקט">פרויקט</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                type="text"
                name="location"
                placeholder="מיקום"
                value={formData.location}
                onChange={handleChange}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              
              <Input
                type="text"
                name="salary_range"
                placeholder="שכר/תקציב"
                value={formData.salary_range}
                onChange={handleChange}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Textarea
                name="job_description"
                placeholder="תיאור המשרה/פרויקט..."
                value={formData.job_description}
                onChange={handleChange}
                rows={3}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 resize-none"
              />
            </div>
            
            <div>
              <Textarea
                name="message"
                placeholder="הודעה נוספת..."
                value={formData.message}
                onChange={handleChange}
                rows={2}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 resize-none"
              />
            </div>
            
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              >
                {isSubmitting ? 'שולח...' : 'שלח הצעה'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
              >
                ביטול
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8 text-center">
        <p className="text-gray-400">
          הצעות העבודה נשלחות ישירות אלי ואינן מוצגות פומבית. 
          <br />
          אחזור אליכם בהקדם האפשרי!
        </p>
      </Card>
    </section>
  );
};
