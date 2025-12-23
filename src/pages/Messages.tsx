import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { getMockUsers } from '@/contexts/AuthContext';

const Messages = () => {
  const users = getMockUsers().slice(0, 3);
  const [selected, setSelected] = useState(users[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 animate-fade-in">
      <div className="w-72 card-premium p-3 space-y-2 shrink-0 hidden md:block">
        <h2 className="font-semibold text-foreground px-2 py-1">Messages</h2>
        {users.map(u => (
          <button key={u.id} onClick={() => setSelected(u)} className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors ${selected.id === u.id ? 'bg-primary/10' : 'hover:bg-secondary'}`}>
            <Avatar className="h-10 w-10"><AvatarImage src={u.avatarUrl} /><AvatarFallback>{u.name.charAt(0)}</AvatarFallback></Avatar>
            <div className="text-left"><p className="font-medium text-sm text-foreground">{u.name}</p><p className="text-xs text-muted-foreground truncate">{u.fraternity}</p></div>
          </button>
        ))}
      </div>
      <div className="flex-1 card-premium flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Avatar><AvatarImage src={selected.avatarUrl} /><AvatarFallback>{selected.name.charAt(0)}</AvatarFallback></Avatar>
          <div><p className="font-medium text-foreground">{selected.name}</p><p className="text-xs text-muted-foreground">{selected.fraternity}</p></div>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="text-center text-muted-foreground text-sm py-8">Start a conversation with {selected.name}</div>
        </div>
        <div className="p-4 border-t border-border flex gap-2">
          <Input placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} className="bg-secondary/50" />
          <Button disabled={!message.trim()}><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
