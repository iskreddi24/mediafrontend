import { useState } from 'react';
import { FaTimes, FaUserPlus } from 'react-icons/fa';
import { createUser } from '../../services/adminService';
import '../../styles/Modal.css';
import '../../styles/Form.css';

const AddUserModal = ({ isOpen, onClose, onUserCreated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'USER'
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()) {
            alert('Username and password are required');
            return;
        }

        setLoading(true);
        try {
            await createUser(formData);
            alert('User created successfully!');
            setFormData({ username: '', password: '', role: 'USER' });
            onUserCreated();
            onClose();
        } catch (error) {
            console.error('Failed to create user:', error);
            const message = error.response?.data?.message || 'Failed to create user. Username may already exist.';
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ width: '420px' }}>
                <div className="modal-header">
                    <h3>Add New User</h3>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Username <span className="required">*</span></label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Password <span className="required">*</span></label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>Role</label>
                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <div className="form-actions" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-confirm" disabled={loading}>
                            {loading ? 'Creating...' : <><FaUserPlus /> Create User</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
