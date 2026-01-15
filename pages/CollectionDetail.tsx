
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS, MOCK_DOCS, MOCK_ACTIVITIES } from '../constants';

const CollectionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const collection = MOCK_COLLECTIONS.find(c => c.id === id) || MOCK_COLLECTIONS[0];

  return (
    <div className="flex-1 flex flex-col bg-bg min-h-full">
      {/* Header */}
      <header className="border-b border-edge p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-content-muted mb-4">
            <button onClick={() => navigate('/collections')} className="hover:text-content transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Collections
            </button>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-bg-muted flex items-center justify-center text-content-muted">
                <span className="material-symbols-outlined text-2xl">{collection.icon}</span>
              </div>
              <div>
                <h1 className="text-title text-content">{collection.name}</h1>
                <p className="text-small text-content-muted flex items-center gap-2 mt-0.5">
                  <span className={`size-1.5 rounded-full ${collection.visibility === 'Public' ? 'bg-success' : 'bg-accent'}`}></span>
                  {collection.visibility} · {collection.itemCount} documents
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn btn-secondary">
                <span className="material-symbols-outlined text-base">share</span>
                Share
              </button>
              <button className="btn btn-primary">
                <span className="material-symbols-outlined text-base">add</span>
                Add
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-6 grid grid-cols-12 gap-6">
        {/* Documents */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-content">Documents</h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-content-muted text-base">search</span>
              <input
                type="text"
                placeholder="Filter..."
                className="input w-40 h-9 pl-9"
              />
            </div>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-bg-subtle border-b border-edge">
                <tr>
                  <th className="px-4 py-3 text-caption text-content-muted font-semibold">Name</th>
                  <th className="px-4 py-3 text-caption text-content-muted font-semibold">Type</th>
                  <th className="px-4 py-3 text-caption text-content-muted font-semibold">Owner</th>
                  <th className="px-4 py-3 text-caption text-content-muted font-semibold text-right">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                {MOCK_DOCS.map((doc, idx) => (
                  <tr
                    key={doc.id}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    style={{ animationDelay: `${idx * 30}ms` }}
                    className="hover:bg-bg-subtle transition-colors cursor-pointer animate-fade-in"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-bg-muted flex items-center justify-center text-content-muted">
                          <span className="material-symbols-outlined text-base">article</span>
                        </div>
                        <span className="text-sm font-medium text-content">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-micro bg-bg-muted text-content-muted px-2 py-1 rounded">{doc.type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-content-muted">{doc.owner}</td>
                    <td className="px-4 py-3 text-sm text-content-muted text-right">{doc.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Card */}
          <div className="p-5 bg-accent/5 border border-accent/20 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-9 rounded-lg bg-accent flex items-center justify-center">
                <span className="material-symbols-outlined text-bg text-base">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-content">AI Insights</h3>
                <p className="text-xs text-content-muted">Powered by Nexus</p>
              </div>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed mb-4">
              This collection shows <span className="text-success font-medium">+12%</span> activity this week.
            </p>
            <button className="btn btn-secondary w-full">
              Generate Summary
            </button>
          </div>

          {/* Activity */}
          <div className="p-5 card">
            <h3 className="text-sm font-semibold text-content mb-4">Activity</h3>
            <div className="space-y-3">
              {MOCK_ACTIVITIES.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-edge mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm text-content">{activity.target}</p>
                    <p className="text-xs text-content-muted">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
