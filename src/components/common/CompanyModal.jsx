import { useState } from 'react';
import { FaTimes, FaFileDownload, FaFilePdf, FaFilePowerpoint } from 'react-icons/fa';
import { PROPOSAL_BRANDS } from '../../context/MediaContext';
import '../../styles/Modal.css';

const CompanyModal = ({ isOpen, onClose, onConfirm, count }) => {
    const [selectedCompany, setSelectedCompany] = useState(PROPOSAL_BRANDS[0]);
    const [format, setFormat] = useState('pptx');
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsGenerating(true);
        await onConfirm(selectedCompany, format);
        setIsGenerating(false);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Generate Proposal</h3>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="modal-body">
                    <p>You are generating a proposal with <strong>{count} slides</strong>.</p>

                    {/* Format Toggle */}
                    <p className="sub-text" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Select format:</p>
                    <div className="format-toggle-group">
                        <button
                            className={`format-toggle-btn ${format === 'pptx' ? 'selected' : ''}`}
                            onClick={() => setFormat('pptx')}
                        >
                            <FaFilePowerpoint /> PPT
                        </button>
                        <button
                            className={`format-toggle-btn ${format === 'pdf' ? 'selected' : ''}`}
                            onClick={() => setFormat('pdf')}
                        >
                            <FaFilePdf /> PDF
                        </button>
                    </div>

                    <p className="sub-text" style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>Select the branding for Welcome & Thank You slides:</p>

                    <div className="company-select-grid">
                        {PROPOSAL_BRANDS.map(company => (
                            <button
                                key={company}
                                className={`company-option ${selectedCompany === company ? 'selected' : ''}`}
                                onClick={() => setSelectedCompany(company)}
                            >
                                {company}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className="btn-confirm"
                        onClick={handleConfirm}
                        disabled={isGenerating}
                    >
                        {isGenerating ? 'Generating...' : <><FaFileDownload /> Download {format === 'pdf' ? 'PDF' : 'PPT'}</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyModal;
