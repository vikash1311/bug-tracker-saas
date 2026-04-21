import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const CreateBug = () => {
  const [form, setForm] = useState({
    title: '', description: '', priority: 'MEDIUM',
    projectId: '', assignedToId: ''
  });
  const [projects, setProjects] = useState([]);
  // const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/projects')
      .then(res => setProjects(res.data.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        priority: form.priority,
        projectId: parseInt(form.projectId),
        assignedToId: form.assignedToId ? parseInt(form.assignedToId) : null,
      };
await axiosInstance.post('/bugs', payload);
navigate(`/bugs/project/${form.projectId}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Report New Bug</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input style={styles.input} placeholder="Bug title"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea style={styles.textarea} placeholder="Describe the bug in detail"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              required />
          </div>
          <div style={styles.row}>
            <div style={{...styles.field, flex: 1}}>
              <label style={styles.label}>Priority</label>
              <select style={styles.input} value={form.priority}
                onChange={e => setForm({...form, priority: e.target.value})}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div style={{...styles.field, flex: 1}}>
              <label style={styles.label}>Project</label>
              <select style={styles.input} value={form.projectId}
                onChange={e => setForm({...form, projectId: e.target.value})}
                required>
                <option value="">Select project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={styles.btnRow}>
            <button type="button" style={styles.cancelBtn}
              onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Submitting...' : 'Report Bug'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '24px', maxWidth: '700px', margin: '0 auto' },
  card: { backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  title: { fontSize: '22px', color: '#1e293b', marginBottom: '24px' },
  field: { marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px', color: '#374151', fontSize: '14px', fontWeight: '500' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', minHeight: '120px' },
  row: { display: 'flex', gap: '16px' },
  btnRow: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' },
  btn: { padding: '10px 24px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  cancelBtn: { padding: '10px 24px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
};

export default CreateBug;