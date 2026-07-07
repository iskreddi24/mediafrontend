// import { useState, useEffect } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import { useMedia, COMPANY_MEDIA_TYPES } from '../../context/MediaContext';
// import { updateMedia } from '../../services/mediaService';
// import '../../styles/Modal.css';
// import '../../styles/Form.css';

// const EditMediaModal = ({ isOpen, onClose, media, onUpdateSuccess }) => {
//     const [loading, setLoading] = useState(false);
//     const [file, setFile] = useState(null);
//     const [formData, setFormData] = useState({
//         belongsTo: '',
//         mediaCode: '',
//         location: '',
//         city: '',
//         specifications: '',
//         illumination: '',
//         mediaType: '',
//         trafficView: '',
//         coordinates: '',
//         locationUrl: ''
//     });

//     useEffect(() => {
//         if (media) {
//             setFormData({
//                 belongsTo: media.belongsTo || 'SBA',
//                 mediaCode: media.mediaCode || '',
//                 location: media.location || '',
//                 city: media.city || '',
//                 specifications: media.specifications || '',
//                 illumination: media.illumination || '',
//                 mediaType: media.mediaType || '',
//                 trafficView: media.trafficView || '',
//                 coordinates: media.coordinates || '',
//                 locationUrl: media.locationUrl || ''
//             });
//         }
//     }, [media]);

//     if (!isOpen || !media) return null;

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files[0]) setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const data = new FormData();
//             Object.keys(formData).forEach(key => {
//                 data.append(key, formData[key] || "");
//             });
//             if (file) data.append('image', file);

//             await updateMedia(media.id, data);

//             alert("Media updated successfully!");
//             onUpdateSuccess();
//             onClose();
//         } catch (error) {
//             console.error(error);
//             alert("Failed to update media. Check if the code is already taken.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content large-modal">
//                 <div className="modal-header">
//                     <h3>Edit Media: {media.mediaCode}</h3>
//                     <button className="close-btn" onClick={onClose}><FaTimes /></button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="modal-body form-grid">
//                     <div className="form-group">
//                         <label>Belongs To *</label>
//                         <select name="belongsTo" value={formData.belongsTo} onChange={handleChange} className="form-control">
//                             {Object.keys(COMPANY_MEDIA_TYPES).map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Media Type *</label>
//                         <select name="mediaType" value={formData.mediaType} onChange={handleChange} className="form-control">
//                             {COMPANY_MEDIA_TYPES[formData.belongsTo]?.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                     </div>

//                     <div className="form-group">
//                         <label>Media Code *</label>
//                         <input name="mediaCode" value={formData.mediaCode} onChange={handleChange} required className="form-control" />
//                     </div>
//                     <div className="form-group">
//                         <label>City *</label>
//                         <input name="city" value={formData.city} onChange={handleChange} required className="form-control" />
//                     </div>

//                     <div className="form-group full-width">
//                         <label>Location *</label>
//                         <input name="location" value={formData.location} onChange={handleChange} required className="form-control" />
//                     </div>

//                     <div className="form-group">
//                         <label>Size / Specs *</label>
//                         <input name="specifications" value={formData.specifications} onChange={handleChange} required className="form-control" />
//                     </div>
//                     <div className="form-group">
//                         <label>Illumination</label>
//                         <input name="illumination" value={formData.illumination} onChange={handleChange} className="form-control" />
//                     </div>

//                     <div className="form-group">
//                         <label>Traffic View</label>
//                         <input name="trafficView" value={formData.trafficView} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="form-group">
//                         <label>Coordinates</label>
//                         <input name="coordinates" value={formData.coordinates} onChange={handleChange} className="form-control" />
//                     </div>

//                     <div className="form-group full-width">
//                         <label>Location URL</label>
//                         <input name="locationUrl" value={formData.locationUrl} onChange={handleChange} className="form-control" />
//                     </div>

//                     <div className="form-group full-width file-upload-wrapper">
//                         <label>Change Image (Leave blank to keep current)</label>
//                         <input type="file" onChange={handleFileChange} accept="image/*" className="form-control" />
//                     </div>

//                     <div className="form-actions full-width">
//                         <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
//                         <button type="submit" className="btn-confirm" disabled={loading}>
//                             {loading ? 'Updating...' : 'Update Asset'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditMediaModal;
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { COMPANY_MEDIA_TYPES } from '../../context/MediaContext';
import { updateMedia } from '../../services/mediaService';
import '../../styles/Modal.css';
import '../../styles/Form.css';

const EditMediaModal = ({ isOpen, onClose, media, onUpdateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        belongsTo: '',
        mediaCode: '',
        location: '',
        city: '',
        specifications: '',
        illumination: '',
        mediaType: '',
        trafficView: '',
        coordinates: '',
        locationUrl: ''
    });

    useEffect(() => {
        if (media) {
            setFormData({
                belongsTo: media.belongsTo || 'SBA',
                mediaCode: media.mediaCode || '',
                location: media.location || '',
                city: media.city || '',
                specifications: media.specifications || '',
                illumination: media.illumination || '',
                mediaType: media.mediaType || '',
                trafficView: media.trafficView || '',
                coordinates: media.coordinates || '',
                locationUrl: media.locationUrl || ''
            });
        }
    }, [media]);

    if (!isOpen || !media) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key] || "");
            });
            if (file) data.append('image', file);

            await updateMedia(media.id, data);

            alert("Media updated successfully!");
            onUpdateSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to update media. Check if the code is already taken.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content large-modal">
                <div className="modal-header">
                    <h3>Edit Media: {media.mediaCode}</h3>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body form-grid">
                    <div className="form-group">
                        <label>Belongs To *</label>
                        <select name="belongsTo" value={formData.belongsTo} onChange={handleChange} className="form-control">
                            {Object.keys(COMPANY_MEDIA_TYPES).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Media Type *</label>
                        <select name="mediaType" value={formData.mediaType} onChange={handleChange} className="form-control">
                            {COMPANY_MEDIA_TYPES[formData.belongsTo]?.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Media Code *</label>
                        <input name="mediaCode" value={formData.mediaCode} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>City *</label>
                        <input name="city" value={formData.city} onChange={handleChange} required className="form-control" />
                    </div>

                    <div className="form-group full-width">
                        <label>Location *</label>
                        <input name="location" value={formData.location} onChange={handleChange} required className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Size / Specs *</label>
                        <input name="specifications" value={formData.specifications} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Illumination</label>
                        <input name="illumination" value={formData.illumination} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Traffic View</label>
                        <input name="trafficView" value={formData.trafficView} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Coordinates</label>
                        <input name="coordinates" value={formData.coordinates} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="form-group full-width">
                        <label>Location URL</label>
                        <input name="locationUrl" value={formData.locationUrl} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="form-group full-width file-upload-wrapper">
                        <label>Change Image (Leave blank to keep current)</label>
                        <input type="file" onChange={handleFileChange} accept="image/*" className="form-control" />
                    </div>

                    <div className="form-actions full-width">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-confirm" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Asset'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMediaModal;