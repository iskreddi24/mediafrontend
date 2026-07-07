// import { useState } from 'react';
// import { FaTimes, FaFilePowerpoint } from 'react-icons/fa';
// import { PROPOSAL_BRANDS } from '../../context/MediaContext';
// import { generateBulkPpt } from '../../services/mediaService';
// import '../../styles/Modal.css';

// const BulkCodesModal = ({ isOpen, onClose }) => {
//     const [rawCodes, setRawCodes] = useState('');
//     const [selectedCompany, setSelectedCompany] = useState(PROPOSAL_BRANDS[0]);
//     const [loading, setLoading] = useState(false);

//     if (!isOpen) return null;

//     const handleGenerate = async () => {
//         const codesArray = rawCodes
//             .split(/[,\n]+/)
//             .map(c => c.trim())
//             .filter(c => c.length > 0);

//         if (codesArray.length === 0) {
//             alert("Please enter at least one Media Code");
//             return;
//         }

//         setLoading(true);
//         try {
//             const blob = await generateBulkPpt({
//                 codes: codesArray,
//                 companyName: selectedCompany
//             });

//             const url = window.URL.createObjectURL(new Blob([blob]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${selectedCompany}_Bulk_Proposal.pptx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//         } catch (error) {
//             alert("Error generating PPT. Ensure codes are correct.");
//         } finally {
//             setLoading(false);
//             onClose();
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h3>Bulk Generation from Codes</h3>
//                     <button className="close-btn" onClick={onClose}><FaTimes /></button>
//                 </div>
//                 <div className="modal-body">
//                     <label style={{fontWeight: 'bold', display: 'block', marginBottom: '10px'}}>
//                         Paste Media Codes (separated by comma or new line)
//                     </label>
//                     <textarea
//                         className="form-control"
//                         style={{height: '150px', resize: 'none', marginBottom: '20px'}}
//                         placeholder="UNIHYD-116&#10;SBA-001&#10;MD-05..."
//                         value={rawCodes}
//                         onChange={(e) => setRawCodes(e.target.value)}
//                     ></textarea>

//                     <label style={{fontWeight: 'bold', display: 'block', marginBottom: '10px'}}>
//                         Select Presentation Branding
//                     </label>
//                     <div className="company-select-grid">
//                         {PROPOSAL_BRANDS.map(company => (
//                             <button
//                                 key={company}
//                                 className={`company-option ${selectedCompany === company ? 'selected' : ''}`}
//                                 onClick={() => setSelectedCompany(company)}
//                             >
//                                 {company}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="modal-footer">
//                     <button className="btn-cancel" onClick={onClose}>Cancel</button>
//                     <button className="btn-confirm" onClick={handleGenerate} disabled={loading}>
//                         {loading ? 'Processing...' : <><FaFilePowerpoint /> Generate Bulk PPT</>}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BulkCodesModal;
import { useState } from 'react';
import { FaTimes, FaFilePowerpoint } from 'react-icons/fa';
import { PROPOSAL_BRANDS } from '../../context/MediaContext';
import { generateBulkPpt } from '../../services/mediaService';
import '../../styles/Modal.css';

const BulkCodesModal = ({ isOpen, onClose }) => {
    const [rawCodes, setRawCodes] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(PROPOSAL_BRANDS[0]);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        const codesArray = rawCodes
            .split(/[,\n]+/)
            .map(c => c.trim())
            .filter(c => c.length > 0);

        if (codesArray.length === 0) {
            alert("Please enter at least one Media Code");
            return;
        }

        setLoading(true);
        try {
            const blob = await generateBulkPpt({
                codes: codesArray,
                companyName: selectedCompany
            });

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${selectedCompany}_Bulk_Proposal.pptx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert("Error generating PPT. Ensure codes are correct.");
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Bulk Generation from Codes</h3>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>
                <div className="modal-body">
                    <label style={{fontWeight: 'bold', display: 'block', marginBottom: '10px'}}>
                        Paste Media Codes (separated by comma or new line)
                    </label>
                    <textarea
                        className="form-control"
                        style={{height: '150px', resize: 'none', marginBottom: '20px'}}
                        placeholder="UNIHYD-116&#10;SBA-001&#10;MD-05..."
                        value={rawCodes}
                        onChange={(e) => setRawCodes(e.target.value)}
                    ></textarea>

                    <label style={{fontWeight: 'bold', display: 'block', marginBottom: '10px'}}>
                        Select Presentation Branding
                    </label>
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
                    <button className="btn-confirm" onClick={handleGenerate} disabled={loading}>
                        {loading ? 'Processing...' : <><FaFilePowerpoint /> Generate Bulk PPT</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkCodesModal;