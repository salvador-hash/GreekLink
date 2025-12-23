import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, GraduationCap, Briefcase, Calendar, Edit } from 'lucide-react';

const Profile = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-premium overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-accent" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <Avatar className="h-24 w-24 ring-4 ring-card">
              <AvatarImage src={currentUser.avatarUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
              <p className="text-primary font-medium">{currentUser.fraternity}</p>
            </div>
            <Button variant="outline" className="shrink-0"><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" />{currentUser.university}</span>
            {currentUser.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{currentUser.location}</span>}
            {currentUser.industry && <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{currentUser.industry}</span>}
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Class of {currentUser.gradYear}</span>
          </div>
          {currentUser.bio && <p className="mt-4 text-foreground">{currentUser.bio}</p>}
        </div>
      </div>
      <div className="card-premium p-6">
        <h2 className="font-semibold text-foreground mb-2">Connections</h2>
        <p className="text-muted-foreground">{currentUser.connections.length} connections</p>
      </div>
    </div>
  );
};

export default Profile;
