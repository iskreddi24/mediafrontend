// import { useState, useEffect } from 'react';
// import { FaTimes, FaCloudUploadAlt, FaMapMarkerAlt, FaInfoCircle, FaImage, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';
// import { useMedia, COMPANY_MEDIA_TYPES } from '../../context/MediaContext';
// import { addMedia } from '../../services/mediaService';
// import '../../styles/Modal.css';
// import '../../styles/Form.css';

// const AddMediaModal = ({ isOpen, onClose }) => {
//     const { setCompany: refreshGrid } = useMedia();
//     const [loading, setLoading] = useState(false);
//     const [file, setFile] = useState(null);
//     const [preview, setPreview] = useState(null);

//     const [formData, setFormData] = useState({
//         belongsTo: 'SBA',
//         mediaCode: '',
//         location: '',
//         city: 'HYDERABAD',
//         specifications: '',
//         illumination: '',
//         mediaType: '',
//         trafficView: '',
//         coordinates: '',
//         locationUrl: ''
//     });

//     useEffect(() => {
//         const types = COMPANY_MEDIA_TYPES[formData.belongsTo];
//         if (types && types.length > 0) {
//             setFormData(prev => ({ ...prev, mediaType: types[0] }));
//         }
//     }, [formData.belongsTo]);

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             setPreview(URL.createObjectURL(selectedFile));
//         }
//     };

//     const handleRemoveFile = (e) => {
//         e.preventDefault();
//         setFile(null);
//         if (preview) URL.revokeObjectURL(preview);
//         setPreview(null);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert("Please select an image");
//             return;
//         }

//         setLoading(true);
//         try {
//             const data = new FormData();
//             Object.keys(formData).forEach(key => data.append(key, formData[key]));
//             data.append('image', file);

//             await addMedia(data);
//             alert("Media added successfully!");
//             onClose();
//             window.location.reload();
//         } catch (error) {
//             console.error(error);
//             alert("Failed to add media. Code might be duplicate.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content large-modal">
//                 <div className="modal-header">
//                     <div className="header-title">
//                         <FaCloudUploadAlt className="header-icon" />
//                         <div>
//                             <h3>Add New Media Asset</h3>
//                             <p className="sub-text">Enter details to register a new advertising spot</p>
//                         </div>
//                     </div>
//                     <button className="close-btn" onClick={onClose}><FaTimes /></button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="modal-body">
//                     {/* Section 1: General Info */}
//                     <div className="form-section">
//                         <h4 className="section-title"><FaInfoCircle /> General Information</h4>
//                         <div className="form-grid">
//                             <div className="form-group">
//                                 <label>Belongs To <span className="required">*</span></label>
//                                 <select name="belongsTo" value={formData.belongsTo} onChange={handleChange} className="form-control">
//                                     {Object.keys(COMPANY_MEDIA_TYPES).map(c => <option key={c} value={c}>{c}</option>)}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Media Type <span className="required">*</span></label>
//                                 <select name="mediaType" value={formData.mediaType} onChange={handleChange} className="form-control">
//                                     {COMPANY_MEDIA_TYPES[formData.belongsTo]?.map(t => <option key={t} value={t}>{t}</option>)}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Media Code <span className="required">*</span></label>
//                                 <input name="mediaCode" placeholder="e.g. UNIHYD-116" value={formData.mediaCode} onChange={handleChange} required className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label>City <span className="required">*</span></label>
//                                 <input name="city" value={formData.city} onChange={handleChange} required className="form-control" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Section 2: Location Details */}
//                     <div className="form-section">
//                         <h4 className="section-title"><FaMapMarkerAlt /> Location & Specs</h4>
//                         <div className="form-grid">
//                             <div className="form-group full-width">
//                                 <label>Exact Location <span className="required">*</span></label>
//                                 <input name="location" placeholder="Landmark / Area details" value={formData.location} onChange={handleChange} required className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Size / Specifications <span className="required">*</span></label>
//                                 <input name="specifications" placeholder="e.g. 40ft x 20ft" value={formData.specifications} onChange={handleChange} required className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Illumination</label>
//                                 <input name="illumination" placeholder="e.g. Front Lit" value={formData.illumination} onChange={handleChange} className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Traffic View</label>
//                                 <input name="trafficView" placeholder="e.g. Facing Hitech City" value={formData.trafficView} onChange={handleChange} className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Coordinates</label>
//                                 <input name="coordinates" placeholder="Lat, Long" value={formData.coordinates} onChange={handleChange} className="form-control" />
//                             </div>
//                             <div className="form-group full-width">
//                                 <label>Google Maps URL</label>
//                                 <input name="locationUrl" placeholder="https://maps.google.com/..." value={formData.locationUrl} onChange={handleChange} className="form-control" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Section 3: Media Upload */}
//                     <div className="form-section">
//                         <h4 className="section-title"><FaImage /> Media Asset</h4>
//                         <div className="file-upload-container">
//                             <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*" className="hidden-input" />

//                             {!preview ? (
//                                 <label htmlFor="file-upload" className="file-upload-label">
//                                     <FaCloudUploadAlt className="upload-icon" />
//                                     <div className="upload-text">
//                                         <p><span>Click to upload</span> or drag and drop</p>
//                                         <small>High resolution PNG or JPG (Max 10MB)</small>
//                                     </div>
//                                 </label>
//                             ) : (
//                                 <div className="preview-wrapper">
//                                     <div className="preview-card">
//                                         <img src={preview} alt="Asset Preview" className="preview-img" />
//                                     </div>
//                                     <div className="preview-info">
//                                         <div className="file-details">
//                                             <FaCheckCircle className="success-icon" />
//                                             <div>
//                                                 <p className="file-name">{file.name}</p>
//                                                 <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                                             </div>
//                                         </div>
//                                         <button type="button" className="remove-btn" onClick={handleRemoveFile}>
//                                             <FaTrashAlt /> Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="form-actions">
//                         <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
//                         <button type="submit" className="btn-confirm" disabled={loading}>
//                             {loading ? <span className="loader"></span> : 'Save Asset'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddMediaModal;
import { useState, useEffect } from 'react';
import { FaTimes, FaCloudUploadAlt, FaMapMarkerAlt, FaInfoCircle, FaImage, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';
import { COMPANY_MEDIA_TYPES } from '../../context/MediaContext';
import { addMedia } from '../../services/mediaService';
import '../../styles/Modal.css';
import '../../styles/Form.css';

const AddMediaModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        belongsTo: 'SBA',
        mediaCode: '',
        location: '',
        city: 'HYDERABAD',
        specifications: '',
        illumination: '',
        mediaType: '',
        trafficView: '',
        coordinates: '',
        locationUrl: ''
    });

    useEffect(() => {
        const types = COMPANY_MEDIA_TYPES[formData.belongsTo];
        if (types && types.length > 0) {
            setFormData(prev => ({ ...prev, mediaType: types[0] }));
        }
    }, [formData.belongsTo]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleRemoveFile = (e) => {
        e.preventDefault();
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select an image");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            data.append('image', file);

            await addMedia(data);
            alert("Media added successfully!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Failed to add media. Code might be duplicate.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content large-modal">
                <div className="modal-header">
                    <div className="header-title">
                        <FaCloudUploadAlt className="header-icon" />
                        <div>
                            <h3>Add New Media Asset</h3>
                            <p className="sub-text">Enter details to register a new advertising spot</p>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    {/* Section 1: General Info */}
                    <div className="form-section">
                        <h4 className="section-title"><FaInfoCircle /> General Information</h4>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Belongs To <span className="required">*</span></label>
                                <select name="belongsTo" value={formData.belongsTo} onChange={handleChange} className="form-control">
                                    {Object.keys(COMPANY_MEDIA_TYPES).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Media Type <span className="required">*</span></label>
                                <select name="mediaType" value={formData.mediaType} onChange={handleChange} className="form-control">
                                    {COMPANY_MEDIA_TYPES[formData.belongsTo]?.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Media Code <span className="required">*</span></label>
                                <input name="mediaCode" placeholder="e.g. UNIHYD-116" value={formData.mediaCode} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>City <span className="required">*</span></label>
                                <input name="city" value={formData.city} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Location Details */}
                    <div className="form-section">
                        <h4 className="section-title"><FaMapMarkerAlt /> Location & Specs</h4>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Exact Location <span className="required">*</span></label>
                                <input name="location" placeholder="Landmark / Area details" value={formData.location} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Size / Specifications <span className="required">*</span></label>
                                <input name="specifications" placeholder="e.g. 40ft x 20ft" value={formData.specifications} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Illumination</label>
                                <input name="illumination" placeholder="e.g. Front Lit" value={formData.illumination} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Traffic View</label>
                                <input name="trafficView" placeholder="e.g. Facing Hitech City" value={formData.trafficView} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Coordinates</label>
                                <input name="coordinates" placeholder="Lat, Long" value={formData.coordinates} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group full-width">
                                <label>Google Maps URL</label>
                                <input name="locationUrl" placeholder="https://maps.google.com/..." value={formData.locationUrl} onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Media Upload */}
                    <div className="form-section">
                        <h4 className="section-title"><FaImage /> Media Asset</h4>
                        <div className="file-upload-container">
                            <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*" className="hidden-input" />

                            {!preview ? (
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <FaCloudUploadAlt className="upload-icon" />
                                    <div className="upload-text">
                                        <p><span>Click to upload</span> or drag and drop</p>
                                        <small>High resolution PNG or JPG (Max 10MB)</small>
                                    </div>
                                </label>
                            ) : (
                                <div className="preview-wrapper">
                                    <div className="preview-card">
                                        <img src={preview} alt="Asset Preview" className="preview-img" />
                                    </div>
                                    <div className="preview-info">
                                        <div className="file-details">
                                            <FaCheckCircle className="success-icon" />
                                            <div>
                                                <p className="file-name">{file.name}</p>
                                                <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button type="button" className="remove-btn" onClick={handleRemoveFile}>
                                            <FaTrashAlt /> Remove
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-confirm" disabled={loading}>
                            {loading ? <span className="loader"></span> : 'Save Asset'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMediaModal;