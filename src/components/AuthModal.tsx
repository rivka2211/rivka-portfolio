
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Shield, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const { toast } = useToast();

  const handleSendCode = async () => {
    if (email !== 'r0548500974@gmail.com') {
      toast({
        title: "שגיאה",
        description: "כתובת האימייל אינה מורשית.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Generate a 6-digit code
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(authCode);

    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      setStep('code');
      toast({
        title: "קוד נשלח בהצלחה!",
        description: `קוד האימות שלך הוא: ${authCode}`,
      });
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (code === generatedCode) {
      toast({
        title: "התחברת בהצלחה!",
        description: "ברוכה השבה, רבקה!",
      });
      onAuthenticated();
      onClose();
      resetForm();
    } else {
      toast({
        title: "שגיאה",
        description: "קוד האימות שגוי.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setCode('');
    setGeneratedCode('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="bg-black/90 backdrop-blur-lg border-purple-500/20 p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">אימות זהות</h2>
          </div>
          <Button
            onClick={() => {
              onClose();
              resetForm();
            }}
            variant="ghost"
            size="sm"
            className="text-gray-400"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {step === 'email' ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">כתובת אימייל</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="r0548500974@gmail.com"
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>
            <Button
              onClick={handleSendCode}
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? (
                "שולח קוד..."
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  שלח קוד אימות
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="code" className="text-white">קוד אימות</Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="הכנס את הקוד שנשלח אליך"
                className="bg-black/20 border-purple-500/30 text-white"
                maxLength={6}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setStep('email')}
                variant="outline"
                className="flex-1 border-purple-500/50 text-purple-400"
              >
                חזור
              </Button>
              <Button
                onClick={handleVerifyCode}
                disabled={!code || code.length !== 6}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                אמת
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
