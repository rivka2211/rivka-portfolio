
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, Calendar, Award, Upload, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  profile_image: string | null;
}

export const ProfileSection = () => {
  const [profile, setProfile] = useState<Profile>({
    name: 'רבקה',
    title: 'Full Stack Developer',
    bio: 'מפתחת תוכנה מנוסה עם התמחות בטכנולוגיות מתקדמות. מתמחה בפיתוח אפליקציות web ומובייל עם דגש על ביצועים גבוהים וחוויית משתמש מעולה.',
    email: 'r0548500974@gmail.com',
    phone: '0548500974',
    location: 'ישראל - מרכז',
    profile_image: null
  });
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (data) {
        setProfile({
          name: data.name || 'רבקה',
          title: data.title || 'Full Stack Developer',
          bio: data.bio || 'מפתחת תוכנה מנוסה עם התמחות בטכנולוגיות מתקדמות.',
          email: data.email || 'r0548500974@gmail.com',
          phone: data.phone || '0548500974',
          location: data.location || 'ישראל - מרכז',
          profile_image: data.profile_image
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isAdmin) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        setProfile(prev => ({ ...prev, profile_image: imageUrl }));
        
        try {
          await supabase
            .from('profiles')
            .upsert({
              user_id: (await supabase.auth.getUser()).data.user?.id,
              profile_image: imageUrl,
              ...profile
            });
            
          toast({
            title: "תמונה הועלתה בהצלחה!",
            description: "תמונת הפרופיל שלך עודכנה.",
          });
        } catch (error) {
          console.error('Error updating profile image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="profile" className="animate-fade-in">
      <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center relative">
            <div className="w-48 h-48 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 relative group">
              <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                {profile.profile_image ? (
                  <img 
                    src={profile.profile_image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative">
                    <div className="text-6xl font-bold text-white flex items-center">
                      <span className="text-purple-300">R</span>
                      <span className="text-pink-300 ml-1">E</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse delay-500"></div>
                  </div>
                )}
              </div>
              {isAdmin && (
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            {isAdmin && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-image-upload"
                />
                <Button
                  onClick={() => document.getElementById('profile-image-upload')?.click()}
                  size="sm"
                  className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  העלה תמונה
                </Button>
              </>
            )}
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{profile.name}</h2>
              <h3 className="text-2xl text-purple-400 mb-4">{profile.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {profile.bio}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                React
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                Node.js
              </Badge>
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                Python
              </Badge>
              <Badge variant="secondary" className="bg-red-500/20 text-red-300">
                MongoDB
              </Badge>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                AWS
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-purple-400" />
                <span>זמינה לפרויקטים</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
