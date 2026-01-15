
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS, MOCK_DOCS, MOCK_ACTIVITIES } from '../constants';

const CollectionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const collection = MOCK_COLLECTIONS.find(c => c.id === id) || MOCK_COLLECTIONS[0];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header with Cover */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        <img 
          alt="Cover" 
          className="w-full h-full object-cover opacity-60" 
          src={`https://picsum.photos/seed/${id}/1200/400`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end gap-6 translate-y-12 max-w-7xl mx-auto">
          <div className="size-24 rounded-2xl bg-white p-1 shadow-2xl flex-shrink-0">
            <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-4xl">{collection.icon}</span>
            </div>
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">
              <span>Project Space</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Workspace</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">{collection.name}</h1>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <button className="px-5 h-11 bg-white border border-border-light rounded-xl text-text-main text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">share</span>
              Share
            </button>
            <button className="px-5 h-11 bg-text-main rounded-xl text-white text-sm font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Document
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-8 pt-24 pb-12 grid grid-cols-12 gap-10">
        {/* Main Docs Table */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-text-main uppercase tracking-widest">Documents</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-text-muted text-[10px] font-bold">{MOCK_DOCS.length} Total</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-text-muted hover:text-text-main hover:bg-slate-50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 text-text-muted hover:text-text-main hover:bg-slate-50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">grid_view</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-border-light">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_DOCS.map(doc => (
                  <tr 
                    key={doc.id}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">article</span>
                        </div>
                        <span className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-text-muted uppercase">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-slate-200"></div>
                        <span className="text-xs text-text-main font-medium">{doc.owner}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-text-muted text-right font-bold">{doc.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="w-full py-4 text-xs font-bold text-text-muted hover:text-text-main border-t border-border-light transition-colors uppercase tracking-widest bg-slate-50/20">
              View All Documents
            </button>
          </div>
        </div>

        {/* Activity Feed Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <h2 className="text-sm font-bold text-text-main uppercase tracking-widest px-1">Activity Timeline</h2>
          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border-light">
            {MOCK_ACTIVITIES.map((activity, i) => (
              <div key={activity.id} className="relative">
                <div className={`absolute -left-[23px] top-1 size-3.5 rounded-full border-2 border-white ring-4 ring-white shadow-sm ${i === 0 ? 'bg-primary' : 'bg-slate-300'}`}></div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase">{activity.time}</span>
                  <p className="text-sm text-text-main font-medium">
                    User {activity.action} <span className="text-primary font-bold">{activity.target}</span>
                  </p>
                  {activity.comment && (
                    <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-border-light text-xs text-text-muted italic leading-relaxed">
                      "{activity.comment}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
