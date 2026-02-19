// Notes Page - Personal travel notes with glassmorphism
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Trash2, Search, Filter, Calendar, MapPin, X, Loader2 } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { notesApi } from '../services/api';
import AnimatedPage, { StaggerContainer, staggerItem } from '../components/ui/AnimatedPage';
import GlassCard from '../components/ui/GlassCard';

const noteColors = [
  'from-amber-400 to-orange-400',
  'from-blue-400 to-indigo-400',
  'from-emerald-400 to-teal-400',
  'from-pink-400 to-rose-400',
  'from-violet-400 to-purple-400',
  'from-cyan-400 to-sky-400',
];

function Notes() {
  const { state, dispatch } = useTrip();
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', location: '' });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const res = await notesApi.getAll();
      if (res.data) dispatch({ type: 'SET_NOTES', payload: res.data });
    } catch {
      // Use existing notes from state
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;

    const note = {
      ...newNote,
      id: Date.now(),
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_NOTE', payload: note });
    try {
      await notesApi.create(note);
    } catch {
      // Saved locally
    }
    setNewNote({ title: '', content: '', location: '' });
    setIsAdding(false);
  };

  const handleDeleteNote = async (noteId) => {
    dispatch({ type: 'DELETE_NOTE', payload: noteId });
    try {
      await notesApi.delete(noteId);
    } catch {
      // Deleted locally
    }
  };

  const filteredNotes = (state.notes || []).filter(n =>
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedPage className="max-w-5xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
            <StickyNote size={24} className="text-amber-500" />
            My Notes
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
            {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> New Note
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="input-field pl-10"
          placeholder="Search notes..."
        />
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100">New Note</h3>
                <button onClick={() => setIsAdding(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                  <X size={18} className="text-surface-400" />
                </button>
              </div>
              <form onSubmit={handleAddNote} className="space-y-4">
                <input
                  type="text" value={newNote.title}
                  onChange={e => setNewNote(p => ({ ...p, title: e.target.value }))}
                  className="input-field" placeholder="Note title" required autoFocus
                />
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                  <input
                    type="text" value={newNote.location}
                    onChange={e => setNewNote(p => ({ ...p, location: e.target.value }))}
                    className="input-field pl-10" placeholder="Location (optional)"
                  />
                </div>
                <textarea
                  value={newNote.content}
                  onChange={e => setNewNote(p => ({ ...p, content: e.target.value }))}
                  className="input-field resize-none min-h-[120px]"
                  placeholder="Write your thoughts, tips, memories..." rows={5}
                />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary text-sm">Cancel</button>
                  <button type="submit" className="btn-primary text-sm">Save Note</button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-primary-500" />
        </div>
      ) : filteredNotes.length > 0 ? (
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <motion.div key={note.id} variants={staggerItem}>
              <GlassCard className="h-full group" hover>
                <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${note.color || noteColors[0]} -mt-1 mb-4`} />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 flex-1 truncate">{note.title}</h3>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
                {note.location && (
                  <p className="text-xs text-surface-400 flex items-center gap-1 mb-2">
                    <MapPin size={12} /> {note.location}
                  </p>
                )}
                <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed line-clamp-4">
                  {note.content}
                </p>
                <p className="text-xs text-surface-400 mt-3 flex items-center gap-1">
                  <Calendar size={12} />
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Just now'}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-4">
            <StickyNote size={28} className="text-surface-400" />
          </div>
          <p className="text-surface-500 dark:text-surface-400 mb-2">No notes yet</p>
          <button onClick={() => setIsAdding(true)} className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
            Create your first note →
          </button>
        </div>
      )}
    </AnimatedPage>
  );
}

export default Notes;
