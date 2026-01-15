
export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Online' | 'Offline' | 'Invited';
  avatar?: string;
  lastActive?: string;
}

export interface Collection {
  id: string;
  name: string;
  itemCount: number;
  visibility: 'Public' | 'Shared' | 'Private';
  icon: string;
  category?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  owner: string;
  lastUpdated: string;
  contentSnippet?: string;
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  target: string;
  time: string;
  comment?: string;
}
