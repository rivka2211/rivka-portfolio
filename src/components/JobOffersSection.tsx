
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, DollarSign, MapPin, Clock, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JobOffer {
  id: number;
  companyName: string;
  position: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  contactEmail: string;
  createdAt: Date;
}

export const JobOffersSection = () => {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    type: '',
    location: '',
    salary: '',
    description: '',
    contactEmail: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOffer: JobOffer = {
      id: Date.now(),
      ...formData,
      createdAt: new Date()
    };
    
    setOffers(prev => [newOffer, ...prev]);
    setFormData({
      companyName: '',
      position: '',
      type: '',
      location: '',
      salary: '',
      description: '',
      contactEmail: ''
    });
    setShowForm(false);
    
    toast({
      title: "הצעת עבודה נשלחה בהצלחה!",
      description: "ההצעה שלך נוספה למערכת ואחזור אליך בהקדם.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'משרה מלאה': 'bg-green-500/20 text-green-300',
      'משרה חלקית': 'bg-blue-500/20 text-blue-300',
      'פרילנס': 'bg-purple-500/20 text-purple-300',
      'פרויקט': 'bg-orange-500/20 text-orange-300'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-300';
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
                name="companyName"
                placeholder="שם החברה"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <Input
                type="text"
                name="position"
                placeholder="תפקיד"
                value={formData.position}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
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
                name="salary"
                placeholder="שכר/תקציב"
                value={formData.salary}
                onChange={handleChange}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Input
                type="email"
                name="contactEmail"
                placeholder="אימייל ליצירת קשר"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Textarea
                name="description"
                placeholder="תיאור המשרה/פרויקט..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 resize-none"
              />
            </div>
            
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                שלח הצעה
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

      <div className="space-y-6">
        {offers.length === 0 ? (
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8 text-center">
            <p className="text-gray-400">עדיין אין הצעות עבודה. היו הראשונים!</p>
          </Card>
        ) : (
          offers.map((offer) => (
            <Card key={offer.id} className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{offer.position}</h3>
                  <p className="text-purple-400 font-medium">{offer.companyName}</p>
                </div>
                <Badge className={getTypeColor(offer.type)}>
                  {offer.type}
                </Badge>
              </div>
              
              <p className="text-gray-300 mb-4">{offer.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{offer.location || 'לא צוין'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{offer.salary || 'לא צוין'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{offer.createdAt.toLocaleDateString('he-IL')}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">
                  יצירת קשר: {offer.contactEmail}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                  onClick={() => window.location.href = `mailto:${offer.contactEmail}`}
                >
                  פנה למעסיק
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};
