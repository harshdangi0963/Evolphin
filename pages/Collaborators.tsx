
import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../constants';

const Collaborators: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-workspace-bg">
      <header className="h-16 border-b border-border-light flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold tracking-tight text-text-main">Collaboration & Permissions</h2>
          <span className="h-4 w-[1px] bg-border-light"></span>
          <div className="flex items-center gap-2 text-text-muted">
            <span className="material-symbols-outlined text-sm">person</span>
            <span className="text-xs font-semibold">5 / 10 Seats used</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-border-light text-xs font-bold hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Invite Member
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-extrabold tracking-tight text-text-main">Team Members</h3>
            <p className="text-sm text-text-muted">Manage roles and permissions for everyone in this workspace.</p>
          </div>

          <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-text-muted font-bold border-b border-border-light">
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_MEMBERS.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg border border-border-light flex items-center justify-center overflow-hidden bg-slate-50">
                          {member.avatar ? (
                             <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                             <span className="text-sm font-bold text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-main">{member.name}</p>
                          <p className="text-xs text-text-muted">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white text-xs font-bold text-text-main border border-border-light hover:border-gray-400 transition-all shadow-sm">
                        {member.role}
                        <span className="material-symbols-outlined text-sm text-text-muted">expand_more</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'Invited' ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'}`}></span>
                        <span className={`text-xs font-bold ${member.status === 'Online' ? 'text-emerald-700' : member.status === 'Invited' ? 'text-amber-700' : 'text-text-muted'}`}>
                          {member.status === 'Online' ? 'Online' : member.status === 'Invited' ? 'Invited' : member.lastActive}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="w-full max-w-lg bg-modal-bg rounded-2xl shadow-2xl border border-white overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-border-light flex items-center justify-between bg-white">
              <div>
                <h4 className="text-xl font-extrabold text-text-main">Invite Collaborator</h4>
                <p className="text-sm text-text-muted mt-1">Add a new member to your team</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 space-y-8 bg-white">
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-widest text-text-main">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary text-xl">mail</span>
                  <input className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-border-light focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm transition-all outline-none placeholder:text-gray-400 font-medium" placeholder="colleague@example.com" type="email"/>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-widest text-text-main">Permission Level</label>
                <div className="grid grid-cols-1 gap-3">
                  {['Admin', 'Editor', 'Viewer'].map((role) => (
                    <label key={role} className="relative flex items-start p-4 rounded-xl border-2 border-transparent bg-slate-50 cursor-pointer hover:border-gray-200 transition-all group has-[:checked]:border-primary has-[:checked]:bg-white shadow-sm">
                      <input className="hidden peer" name="role" type="radio" defaultChecked={role === 'Editor'} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-text-main">{role}</span>
                          {role === 'Admin' && <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 font-bold uppercase text-gray-600">Full Control</span>}
                        </div>
                        <p className="text-xs text-text-muted mt-1">
                          {role === 'Admin' ? 'Can manage settings, billing, and team members.' : role === 'Editor' ? 'Can create, edit and delete documents.' : 'Can view documents and add comments only.'}
                        </p>
                      </div>
                      <div className="size-5 rounded-full border-2 border-gray-200 mt-1 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                        <div className="size-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-100/50 border-t border-border-light flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3.5 rounded-xl border border-border-light bg-white text-sm font-bold text-text-main hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="flex-[2] px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-extrabold shadow-md hover:shadow-lg hover:bg-primary/95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">send</span>
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborators;
