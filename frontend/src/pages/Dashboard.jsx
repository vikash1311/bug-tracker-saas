import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/projects')
      .then(res => setProjects(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Welcome, {user?.name}</h1>
          <p style={styles.subtitle}>Role: {user?.role}</p>
        </div>
        {user?.role === 'ADMIN' && (
          <button style={styles.btn}
            onClick={() => navigate('/projects')}>
            Manage Projects
          </button>
        )}
      </div>

      <h2 style={styles.sectionTitle}>Your Projects</h2>

      {projects.length === 0 ? (
        <div style={styles.empty}>No projects found.</div>
      ) : (
        <div style={styles.grid}>
          {projects.map(project => (
            <div key={project.id} style={styles.card}
              onClick={() => navigate(`/bugs/project/${project.id}`)}>
              <h3 style={styles.cardTitle}>{project.name}</h3>
              <p style={styles.cardDesc}>
                {project.description || 'No description'}
              </p>
<p style={styles.cardMeta}>
  Created by: {project.createdByName}
</p>
              <div style={styles.cardFooter}>
                <span style={styles.viewBtn}>View Bugs →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '24px', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  title: { fontSize: '24px', color: '#1e293b', marginBottom: '4px' },
  subtitle: { color: '#64748b', fontSize: '14px' },
  sectionTitle: { fontSize: '18px', color: '#1e293b', marginBottom: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: {
    backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer',
    border: '1px solid #e2e8f0', transition: 'transform 0.1s',
  },
  cardTitle: { fontSize: '16px', color: '#1e293b', marginBottom: '8px' },
  cardDesc: { fontSize: '13px', color: '#64748b', marginBottom: '12px' },
  cardMeta: { fontSize: '12px', color: '#94a3b8' },
  cardFooter: { marginTop: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' },
  viewBtn: { color: '#3b82f6', fontSize: '13px', fontWeight: '500' },
  btn: {
    padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
  },
  loading: { textAlign: 'center', padding: '60px', color: '#64748b' },
  empty: { textAlign: 'center', padding: '40px', color: '#94a3b8' },
};

export default Dashboard;