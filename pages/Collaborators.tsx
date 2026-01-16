
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MEMBERS } from '../constants';
import { Member } from '../types';
import { Particles } from '../components/ui/Particles';

const Collaborators: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Particles 
          className="absolute inset-0 z-0 opacity-40" 
          quantity={80} 
          staticity={40} 
          ease={70} 
          color="#6366f1"
          size={0.6}
        />
        <div className="absolute inset-0 dot-grid hero-mask opacity-30 dark:opacity-10" />
      </div>

      <header className="px-8 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 w-fit">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
            Collaborative Mesh
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-tight">
            Team <span className="text-slate-300 dark:text-slate-700">/</span> <span className="text-primary/40">Collaborators</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold text-[13px] max-w-lg leading-snug">
            Manage authorized operators and system provision levels.
          </p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsProvisionModalOpen(true)}
          className="px-5 py-3 bg-slate-950 dark:bg-white dark:text-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-3 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          Provision Member
        </motion.button>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-auto p-8 relative z-10 custom-scrollbar"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {MOCK_MEMBERS.map((member) => (
              <motion.div 
                key={member.id}
                variants={itemVariants}
                onClick={() => setSelectedMember(member)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-5 rounded-[28px] hover:border-primary/20 dark:hover:border-primary/40 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="size-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 p-1 flex items-center justify-center overflow-hidden group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-colors">
                    {member.avatar ? (
                      <img src={member.avatar} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-base font-black text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <div className={`px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest border transition-all ${
                    member.status === 'Online' 
                    ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/20' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-white/5'
                  }`}>
                    {member.status}
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors leading-none">{member.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1.5 truncate">{member.email}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-white/5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[7px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Auth Level</span>
                    <span className="text-[9px] font-black text-slate-900 dark:text-slate-300 uppercase">{member.role}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-lg">arrow_forward_ios</span>
                </div>

                {member.status === 'Online' && (
                  <div className="absolute top-0 right-0 p-3">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01, borderColor: '#6366f1' }}
              onClick={() => setIsProvisionModalOpen(true)}
              className="border-2 border-dashed border-slate-100 dark:border-white/10 rounded-[28px] flex flex-col items-center justify-center p-6 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group min-h-[180px]"
            >
              <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-100 dark:border-white/5">
                <span className="material-symbols-outlined text-xl group-hover:text-white transition-colors">person_add</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Add Operator</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" 
              onClick={() => setSelectedMember(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-white dark:border-white/10 overflow-hidden relative z-10"
            >
              <div className="p-8 text-center flex flex-col items-center">
                 <div className="size-20 rounded-[24px] bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-white/5 mb-5">
                    <div className="w-full h-full rounded-[18px] bg-primary/10 flex items-center justify-center">
                       <span className="text-2xl font-black text-primary">{selectedMember.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                 </div>
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{selectedMember.name}</h2>
                 <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">{selectedMember.email}</p>
                 
                 <div className="grid grid-cols-2 gap-3 w-full mt-8">
                   <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-left">
                     <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Tier</span>
                     <span className="text-xs font-black text-slate-900 dark:text-white uppercase">{selectedMember.role}</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-left">
                     <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Status</span>
                     <span className={`text-xs font-black uppercase ${selectedMember.status === 'Online' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-600'}`}>{selectedMember.status}</span>
                   </div>
                 </div>

                 <div className="w-full mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col gap-2">
                   <button className="w-full py-3.5 rounded-xl bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-lg hover:bg-primary transition-all">Modify Access</button>
                   <button onClick={() => setSelectedMember(null)} className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-white/10 font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Dismiss</button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Provision Modal */}
      <AnimatePresence>
        {isProvisionModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" 
              onClick={() => setIsProvisionModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-white dark:border-white/10 overflow-hidden relative z-10 p-8"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="size-14 rounded-[20px] bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-3xl font-bold">blur_on</span>
                </div>
                <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Provision Operator</h4>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1.5">Grant access to the institutional intelligence mesh.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Network Identity</label>
                  <input className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-bold text-slate-900 dark:text-white transition-all outline-none" placeholder="operator@nexus-mesh.id" type="email"/>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Access Protocol</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Admin', 'Editor', 'Viewer'].map((role) => (
                      <button key={role} className={`py-3.5 rounded-xl border-2 transition-all font-black text-[9px] uppercase tracking-widest ${role === 'Editor' ? 'bg-primary border-primary text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-white/5 text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-white/20'}`}>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setIsProvisionModalOpen(false)} className="flex-1 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 font-black text-[9px] uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    Cancel
                  </button>
                  <button className="flex-[2] px-5 py-3.5 rounded-xl bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all">
                    Initiate Connection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collaborators;
