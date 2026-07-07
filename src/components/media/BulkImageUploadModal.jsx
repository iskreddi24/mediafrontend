import { useState } from 'react';
import { FaTimes, FaCloudUploadAlt, FaCheckCircle, FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa';
import { bulkImageUpload } from '../../services/mediaService';
import '../../styles/Modal.css';

const BulkImageUploadModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResult(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert('Please select a ZIP file');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('zip', file);

            const data = await bulkImageUpload(formData);
            setResult(data);
        } catch (error) {
            console.error('Bulk upload failed:', error);
            alert('Upload failed. Please check the ZIP file and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFile(null);
        setResult(null);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ width: '550px' }}>
                <div className="modal-header">
                    <h3>Bulk Image Upload & Auto-Match</h3>
                    <button className="close-btn" onClick={handleClose}><FaTimes /></button>
                </div>

                <div className="modal-body">
                    {!result ? (
                        <>
                            <p style={{ marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                Upload a ZIP file containing images. Files will be matched to media codes
                                by filename (e.g., <code>UNIHYD-116.jpg</code> → matches media code <code>UNIHYD-116</code>).
                            </p>

                            <div className="file-upload-container">
                                <input
                                    type="file"
                                    id="bulk-zip-upload"
                                    accept=".zip"
                                    onChange={handleFileChange}
                                    className="hidden-input"
                                />
                                <label htmlFor="bulk-zip-upload" className="file-upload-label" style={{
                                    border: '2px dashed #cbd5e1',
                                    borderRadius: '12px',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    display: 'block',
                                    background: '#f8fafc'
                                }}>
                                    <FaCloudUploadAlt style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: '0.5rem' }} />
                                    <p style={{ fontWeight: 600, color: '#475569' }}>
                                        {file ? file.name : 'Click to select ZIP file'}
                                    </p>
                                    <small style={{ color: '#94a3b8' }}>Accepts .zip containing .jpg, .jpeg, .png, .webp images</small>
                                </label>
                            </div>
                        </>
                    ) : (
                        <div className="bulk-results">
                            <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Upload Results</h4>

                            {/* Matched */}
                            <div className="result-section" style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                                    <FaCheckCircle style={{ color: '#22c55e' }} />
                                    <strong style={{ color: '#16a34a' }}>Matched ({result.matched.length})</strong>
                                </div>
                                {result.matched.length > 0 ? (
                                    <div style={{
                                        background: '#f0fdf4',
                                        border: '1px solid #bbf7d0',
                                        borderRadius: '8px',
                                        padding: '0.75rem',
                                        maxHeight: '120px',
                                        overflowY: 'auto',
                                        fontSize: '0.85rem',
                                        color: '#166534'
                                    }}>
                                        {result.matched.join(', ')}
                                    </div>
                                ) : (
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>None</p>
                                )}
                            </div>

                            {/* Unmatched */}
                            <div className="result-section" style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                                    <FaQuestionCircle style={{ color: '#f59e0b' }} />
                                    <strong style={{ color: '#d97706' }}>Unmatched ({result.unmatched.length})</strong>
                                </div>
                                {result.unmatched.length > 0 ? (
                                    <div style={{
                                        background: '#fffbeb',
                                        border: '1px solid #fde68a',
                                        borderRadius: '8px',
                                        padding: '0.75rem',
                                        maxHeight: '120px',
                                        overflowY: 'auto',
                                        fontSize: '0.85rem',
                                        color: '#92400e'
                                    }}>
                                        {result.unmatched.join(', ')}
                                    </div>
                                ) : (
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>None</p>
                                )}
                            </div>

                            {/* Skipped */}
                            <div className="result-section">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                                    <FaExclamationTriangle style={{ color: '#ef4444' }} />
                                    <strong style={{ color: '#dc2626' }}>Skipped ({result.skipped.length})</strong>
                                </div>
                                {result.skipped.length > 0 ? (
                                    <div style={{
                                        background: '#fef2f2',
                                        border: '1px solid #fecaca',
                                        borderRadius: '8px',
                                        padding: '0.75rem',
                                        maxHeight: '120px',
                                        overflowY: 'auto',
                                        fontSize: '0.85rem',
                                        color: '#991b1b'
                                    }}>
                                        {result.skipped.join(', ')}
                                    </div>
                                ) : (
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>None</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={handleClose}>
                        {result ? 'Close' : 'Cancel'}
                    </button>
                    {!result && (
                        <button
                            className="btn-confirm"
                            onClick={handleSubmit}
                            disabled={loading || !file}
                        >
                            {loading ? 'Uploading & Matching...' : <><FaCloudUploadAlt /> Upload ZIP</>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BulkImageUploadModal;
