
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Upload, Save, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdminPanel = () => {
  const [profileData, setProfileData] = useState({
    name: 'רבקה',
    title: 'Full Stack Developer',
    bio: 'מפתחת תוכנה מנוסה עם התמחות בטכנולוגיות מתקדמות...',
    email: 'rivka.dev@email.com',
    phone: '050-123-4567',
    location: 'ישראל'
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "השינויים נשמרו בהצלחה!",
      description: "הפרופיל שלך עודכן.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "קובץ הועלה בהצלחה!",
        description: `הקובץ ${file.name} הועלה למערכת.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">פאנל ניהול</h1>
        <p className="text-gray-300">נהל את התוכן שלך בקלות</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black/40 border-purple-500/20">
          <TabsTrigger value="profile" className="text-white data-[state=active]:bg-purple-500/20">
            פרופיל
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-500/20">
            פרויקטים
          </TabsTrigger>
          <TabsTrigger value="cv" className="text-white data-[state=active]:bg-purple-500/20">
            קורות חיים
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-white data-[state=active]:bg-purple-500/20">
            הגדרות
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">עריכת פרופיל</h2>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">שם</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-black/20 border-purple-500/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="title" className="text-white">תפקיד</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-black/20 border-purple-500/30 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio" className="text-white">אודות</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="bg-black/20 border-purple-500/30 text-white resize-none"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="email" className="text-white">אימייל</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-black/20 border-purple-500/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">טלפון</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-black/20 border-purple-500/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-white">מיקום</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-black/20 border-purple-500/30 text-white"
                  />
                </div>
              </div>
              
              <Button onClick={handleSave} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Save className="w-4 h-4 mr-2" />
                שמור שינויים
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cv">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">העלאת קורות חיים</h2>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">העלאת קבצי קורות חיים</h3>
                <p className="text-gray-400 mb-4">
                  העלי את קבצי קורות החיים שלך (PDF, DOC, DOCX) כדי שאוכל לעדכן את המידע באתר
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <Button
                  onClick={() => document.getElementById('cv-upload')?.click()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  בחר קבצים
                </Button>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">הוראות לשימוש:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• העלי מספר גרסאות של קורות החיים שלך</li>
                  <li>• הקבצים יעובדו באמצעות AI לעדכון המידע באתר</li>
                  <li>• ניתן להעלות קבצים בפורמטים: PDF, DOC, DOCX</li>
                  <li>• המידע יעודכן אוטומטית בפרופיל ובסקילים</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">ניהול פרויקטים</h2>
            <p className="text-gray-400">
              כאן תוכלי לנהל את הפרויקטים שלך, להוסיף קישורים פעילים ולערוך תיאורים.
              הפיצ'ר הזה יהיה זמין בקרוב!
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">הגדרות כלליות</h2>
            <p className="text-gray-400">
              כאן תוכלי לנהל הגדרות כלליות של האתר, כמו נושא צבעים, שפה ועוד.
              הפיצ'ר הזה יהיה זמין בקרוב!
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
