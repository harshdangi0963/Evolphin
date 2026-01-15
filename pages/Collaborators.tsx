
import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../constants';

const Collaborators: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-bg">
      {/* Header */}
      <header className="h-14 border-b border-edge flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-subtitle text-content">Team</h1>
          <span className="text-small text-content-muted">{MOCK_MEMBERS.length} members</span>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <span className="material-symbols-outlined text-base">person_add</span>
          Invite
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-subtle border-b border-edge">
                  <th className="px-5 py-3 text-caption text-content-muted font-semibold">Member</th>
                  <th className="px-5 py-3 text-caption text-content-muted font-semibold">Role</th>
                  <th className="px-5 py-3 text-caption text-content-muted font-semibold">Status</th>
                  <th className="px-5 py-3 text-caption text-content-muted font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                {MOCK_MEMBERS.map((member, idx) => (
                  <tr
                    key={member.id}
                    style={{ animationDelay: `${idx * 30}ms` }}
                    className="hover:bg-bg-subtle transition-colors animate-fade-in"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-bg-muted overflow-hidden">
                          {member.avatar ? (
                            <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-accent">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-content">{member.name}</p>
                          <p className="text-xs text-content-muted">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-content">{member.role}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${member.status === 'Online' ? 'bg-success' : 'bg-edge'}`}></span>
                        <span className="text-sm text-content-muted">
                          {member.status === 'Online' ? 'Online' : member.lastActive}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="btn btn-ghost btn-icon-sm">
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={() => setIsModalOpen(false)}></div>
          <div className="w-full max-w-md bg-bg-elevated border border-edge rounded-xl relative animate-scale-in">
            <div className="p-5 border-b border-edge flex items-center justify-between">
              <h3 className="text-subtitle text-content">Invite Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost btn-icon-sm">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="text-sm font-medium text-content mb-1.5 block">Email</label>
                <input className="input" placeholder="colleague@example.com" type="email" />
              </div>

              <div>
                <label className="text-sm font-medium text-content mb-2 block">Role</label>
                <div className="space-y-2">
                  {['Admin', 'Editor', 'Viewer'].map((role) => (
                    <label
                      key={role}
                      className="flex items-center p-3 rounded-lg border border-edge cursor-pointer hover:bg-bg-subtle transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                    >
                      <input type="radio" name="role" defaultChecked={role === 'Editor'} className="sr-only" />
                      <span className="text-sm font-medium text-content flex-1">{role}</span>
                      <div className="size-4 rounded-full border-2 border-edge flex items-center justify-center">
                        <div className="size-2 rounded-full bg-accent scale-0 [[data-checked]>&]:scale-100 transition-transform"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 bg-bg-subtle border-t border-edge flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary flex-1">Cancel</button>
              <button className="btn btn-primary flex-1">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborators;
