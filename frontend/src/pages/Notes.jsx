// Notes Page - Trip notes with reminders
import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Clock, MapPin, Trash2, Bell } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { notesApi } from '../services/api';

function Notes() {
  const { state, actions } = useTrip();
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({
    content: '',
    reminder_time: '',
    has_reminder: false,
  });
  
  const tripId = state.currentTrip?.trip_id;
  
  useEffect(() => {
    if (tripId) {
      loadNotes();
    }
  }, [tripId]);
  
  const loadNotes = async () => {
    try {
      const data = await notesApi.getByTrip(tripId);
      setNotes(data);
    } catch (error) {
      // Load from offline storage
      await actions.loadNotes(tripId);
      setNotes(state.notes);
    }
  };
  
  const handleCreate = async (e) => {
    e.preventDefault();
    
    const noteData = {
      trip_id: tripId || 'local',
      content: newNote.content,
      reminder_time: newNote.has_reminder && newNote.reminder_time ? new Date(newNote.reminder_time).toISOString() : null,
    };
    
    try {
      const result = await notesApi.create(noteData);
      const createdNote = {
        id: result.note_id,
        ...noteData,
        created_at: new Date().toISOString(),
      };
      setNotes([...notes, createdNote]);
      await actions.addNote(createdNote);
    } catch (error) {
      // Save offline
      const localNote = {
        id: `local-${Date.now()}`,
        ...noteData,
        created_at: new Date().toISOString(),
      };
      setNotes([...notes, localNote]);
      await actions.addNote(localNote);
    }
    
    setNewNote({ content: '', reminder_time: '', has_reminder: false });
    setShowForm(false);
  };
  
  const handleDelete = async (noteId) => {
    try {
      await notesApi.delete(noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
    setNotes(notes.filter((n) => n.id !== noteId));
    await actions.deleteNote(noteId);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <StickyNote className="text-yellow-500" />
            Trip Notes
          </h1>
          <p className="text-gray-600 mt-1">
            Keep track of important information for your trip
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Notes grid */}
        {notes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 mb-20">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-yellow-50 rounded-xl p-5 shadow-sm border border-yellow-100 relative group"
              >
                <button
                  onClick={() => handleDelete(note.id)}
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
                
                <p className="text-gray-800 whitespace-pre-wrap mb-4">{note.content}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {note.reminder_time && (
                    <div className="flex items-center gap-1">
                      <Bell size={14} className="text-yellow-600" />
                      <span>{formatDate(note.reminder_time)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{formatDate(note.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <StickyNote size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Notes Yet</h2>
            <p className="text-gray-600 mb-4">
              Add notes to remember important details about your trip
            </p>
          </div>
        )}
        
        {/* Add note button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
        >
          <Plus size={24} />
        </button>
        
        {/* Add note form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Note</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    required
                    rows={4}
                    placeholder="What do you want to remember?"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="has_reminder"
                    checked={newNote.has_reminder}
                    onChange={(e) => setNewNote({ ...newNote, has_reminder: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor="has_reminder" className="text-sm text-gray-700">
                    Set a reminder
                  </label>
                </div>
                
                {newNote.has_reminder && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Time</label>
                    <input
                      type="datetime-local"
                      value={newNote.reminder_time}
                      onChange={(e) => setNewNote({ ...newNote, reminder_time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                    />
                  </div>
                )}
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Notes;
