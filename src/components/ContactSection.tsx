
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "הודעה נשלחה בהצלחה!",
        description: "אחזור אליך בהקדם האפשרי.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "שגיאה בשליחת הודעה",
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
    <section id="contact" className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">יצירת קשר</h2>
        <p className="text-gray-300 text-lg">בואו נדבר על הפרויקט הבא שלכם</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">פרטי יצירת קשר</h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">אימייל</p>
                <p className="text-gray-300">r0548500974@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">טלפון</p>
                <p className="text-gray-300">0548500974</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">מיקום</p>
                <p className="text-gray-300">ישראל, מרכז</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <h4 className="text-purple-400 font-medium mb-2">למה לבחור בי?</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• ניסיון רב בפיתוח אפליקציות</li>
              <li>• התמחות בטכנולוגיות מתקדמות</li>
              <li>• עמידה בלוחות זמנים</li>
              <li>• תמיכה מלאה לאחר פרויקט</li>
            </ul>
          </div>
        </Card>

        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">שלחו הודעה</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="שם מלא"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Input
                type="email"
                name="email"
                placeholder="אימייל"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Input
                type="text"
                name="subject"
                placeholder="נושא"
                value={formData.subject}
                onChange={handleChange}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Textarea
                name="message"
                placeholder="ספרו לי על הפרויקט שלכם..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 resize-none"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                'שולח...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  שלח הודעה
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
