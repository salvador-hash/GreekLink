import { getMockUsers } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Connections = () => {
  const users = getMockUsers();
  const pending = users.slice(3, 5);
  const connected = users.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div><h1 className="text-2xl font-bold text-foreground">Connections</h1><p className="text-muted-foreground">Manage your Greek network</p></div>
      
      {pending.length > 0 && (
        <div className="card-premium p-4">
          <h2 className="font-semibold text-foreground mb-3">Pending Requests</h2>
          <div className="space-y-3">
            {pending.map(u => (
              <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl bg-secondary/30">
                <Avatar><AvatarImage src={u.avatarUrl} /><AvatarFallback>{u.name.charAt(0)}</AvatarFallback></Avatar>
                <div className="flex-1"><p className="font-medium text-foreground">{u.name}</p><p className="text-sm text-muted-foreground">{u.fraternity}</p></div>
                <Button size="sm" onClick={() => toast({ title: "Request accepted!" })}><Check className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost"><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-premium p-4">
        <h2 className="font-semibold text-foreground mb-3">Your Connections ({connected.length})</h2>
        <div className="space-y-3">
          {connected.map(u => (
            <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/30 transition-colors">
              <Avatar><AvatarImage src={u.avatarUrl} /><AvatarFallback>{u.name.charAt(0)}</AvatarFallback></Avatar>
              <div className="flex-1"><p className="font-medium text-foreground">{u.name}</p><p className="text-sm text-muted-foreground">{u.fraternity} · {u.industry}</p></div>
              <Button size="sm" variant="outline">Message</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
