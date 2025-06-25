
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, Phone, Calendar, Code, Award } from 'lucide-react';

export const ProfileSection = () => {
  return (
    <section id="profile" className="animate-fade-in">
      <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className="w-48 h-48 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
              <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-white">R</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">רבקה</h2>
              <h3 className="text-2xl text-purple-400 mb-4">Full Stack Developer</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                מפתחת תוכנה מנוסה עם התמחות בטכנולוגיות מתקדמות. 
                מתמחה בפיתוח אפליקציות web ומובייל עם דגש על ביצועים גבוהים וחוויית משתמש מעולה.
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
                <span>ישראל</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>rivka.dev@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>5+ שנות ניסיון</span>
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
