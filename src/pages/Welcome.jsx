import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaInfoCircle, FaRocket, FaExclamationTriangle, FaLightbulb, FaUserShield } from 'react-icons/fa';
import '../styles/Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    return (
        <div className="welcome-container">
            <header className="welcome-header">
                <h1>Media Proposal Generator</h1>
                <p>Professional PPT & PDF Submission Tool for SBA, OUTSPACE & YUVA</p>
            </header>

            {/* How to Use Section */}
            <section className="welcome-section">
                <h2><FaLightbulb /> How to Use</h2>
                <div className="info-grid">
                    <div className="info-card">
                        <h4>1. Filter & Search</h4>
                        <p>Use the sidebar to filter by Company or Media Type. Use the search bar for specific Media Codes.</p>
                    </div>
                    <div className="info-card">
                        <h4>2. Select in Order</h4>
                        <p>Check the boxes on the media cards. The slides will appear in the <strong>exact order</strong> you select them.</p>
                    </div>
                    <div className="info-card">
                        <h4>3. Bulk Generation</h4>
                        <p>Have a list of codes? Use the "From Codes" button to paste them and generate 50+ slides instantly.</p>
                    </div>
                    <div className="info-card">
                        <h4>4. Choose Format</h4>
                        <p>Generate proposals in <strong>PPT</strong> or <strong>PDF</strong> format. Use the format toggle in the Generate modal.</p>
                    </div>
                </div>
            </section>

            {/* Advantages & Limitations */}
            <div className="info-grid">
                <section className="welcome-section">
                    <h2><FaRocket /> Key Advantages</h2>
                    <div className="info-card" style={{borderColor: '#27ae60'}}>
                        <ul>
                            <li><strong>Time Efficient:</strong> Generate 100 slides in seconds.</li>
                            <li><strong>Brand Safety:</strong> Correct logos and footers applied automatically.</li>
                            <li><strong>Smart Links:</strong> Clickable Map links embedded in every slide.</li>
                            <li><strong>Auto-Conversion:</strong> Handles JPEG, PNG, and WebP formats.</li>
                            <li><strong>PDF Support:</strong> Generate high-quality PDF proposals alongside PPT.</li>
                        </ul>
                    </div>
                </section>

                <section className="welcome-section">
                    <h2><FaExclamationTriangle /> Important Limits</h2>
                    <div className="info-card" style={{borderColor: '#f39c12'}}>
                        <ul>
                            <li><strong>Slide Limit:</strong> Maximum 100 slides per PPT/PDF for speed.</li>
                            <li><strong>Image Size:</strong> Optimized for images under 2MB.</li>
                            <li><strong>Accuracy:</strong> Ensure Media Codes are correct before Bulk generating.</li>
                        </ul>
                    </div>
                </section>
            </div>

            {isAdmin && (
                <section className="welcome-section" style={{ marginTop: '2rem' }}>
                    <h2><FaUserShield /> Admin Tools</h2>
                    <div className="info-card" style={{borderColor: '#2563eb'}}>
                        <ul>
                            <li><strong>Media Management:</strong> Add, edit, and delete media assets.</li>
                            <li><strong>Bulk Image Upload:</strong> Upload a ZIP of images to auto-match by media code.</li>
                            <li><strong>User Management:</strong> Create users, assign roles, enable/disable accounts.</li>
                        </ul>
                        <button
                            className="btn-continue"
                            style={{ marginTop: '1rem', padding: '8px 24px', fontSize: '0.95rem' }}
                            onClick={() => navigate('/admin')}
                        >
                            Open Admin Portal
                        </button>
                    </div>
                </section>
            )}

            <footer className="welcome-footer">
                <button className="btn-continue" onClick={() => navigate('/dashboard')}>
                    Continue to Dashboard
                </button>
            </footer>
        </div>
    );
};

export default Welcome;
