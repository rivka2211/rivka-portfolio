
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const ADMIN_CODE = 'RIVKA2024ADMIN'; // Simple admin code

  const handleLogin = async () => {
    if (adminCode !== ADMIN_CODE) {
      toast({
        title: "שגיאה",
        description: "קוד הניהול שגוי",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      toast({
        title: "התחברת בהצלחה!",
        description: "ברוכה השבה, רבקה!",
      });
      onAuthenticated();
      onClose();
      setAdminCode('');
      setLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setAdminCode('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="bg-black/90 backdrop-blur-lg border-purple-500/20 p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">כניסת מנהל</h2>
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

        <div className="space-y-4">
          <div>
            <Label htmlFor="adminCode" className="text-white">קוד ניהול</Label>
            <Input
              id="adminCode"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="הכנס קוד ניהול"
              className="bg-black/20 border-purple-500/30 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button
            onClick={handleLogin}
            disabled={loading || !adminCode}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <p className="text-xs text-gray-400 text-center">
            קוד הניהול: RIVKA2024ADMIN
          </p>
        </div>
      </Card>
    </div>
  );
};
