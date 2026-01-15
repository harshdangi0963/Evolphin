
import { Member, Collection, Document, Activity } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@team.com', role: 'Admin', status: 'Online', lastActive: 'Now' },
  { id: '2', name: 'Jordan Smith', email: 'jordan@team.com', role: 'Editor', status: 'Offline', lastActive: '2h ago' },
  { id: '3', name: 'Taylor Chen', email: 'taylor@team.com', role: 'Viewer', status: 'Offline', lastActive: 'Yesterday' },
  { id: '4', name: 'Morgan Lee', email: 'morgan@team.com', role: 'Editor', status: 'Invited' },
];

export const MOCK_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'Product Wiki', itemCount: 24, visibility: 'Public', icon: 'folder' },
  { id: 'c2', name: 'Marketing Assets', itemCount: 112, visibility: 'Shared', icon: 'auto_fix_high' },
  { id: 'c3', name: 'Research Library', itemCount: 85, visibility: 'Private', icon: 'menu_book' },
];

export const MOCK_DOCS: Document[] = [
  { id: 'd1', name: 'Product Roadmap 2024', type: 'PDF', owner: 'Alex Rivera', lastUpdated: '2h ago' },
  { id: 'd2', name: 'Branding Guidelines', type: 'DOCX', owner: 'Sarah Chen', lastUpdated: 'Yesterday' },
  { id: 'd3', name: 'Engineering Onboarding', type: 'PDF', owner: 'Alex Chen', lastUpdated: 'Oct 12' },
  { id: 'd4', name: 'Schema Definition', type: 'SQL', owner: 'Marc V.', lastUpdated: 'Oct 10' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', userId: 'u1', action: 'uploaded', target: 'Brand Styleguide v2.1', time: 'Today, 10:45 AM' },
  { id: 'a2', userId: 'u2', action: 'updated', target: 'Marketing Budget Q4', time: 'Yesterday, 3:20 PM', comment: 'Adjusted the social media spend for November.' },
  { id: 'a3', userId: 'u1', action: 'created', target: 'Brand Identity Refresh 2024', time: 'Oct 14, 2023' },
];
