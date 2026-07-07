import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listUsers, enableUser, disableUser } from '../services/adminService';
import AdminMediaGrid from '../components/media/AdminMediaGrid';
import BulkImageUploadModal from '../components/media/BulkImageUploadModal';
import AddUserModal from '../components/admin/AddUserModal';
import AddMediaModal from '../components/media/AddMediaModal';
import EditMediaModal from '../components/media/EditMediaModal';
import {
    FaArrowLeft,
    FaImages,
    FaUsers,
    FaUserPlus,
    FaUserCheck,
    FaUserSlash,
    FaSearch,
    FaPlus,
    FaCloudUploadAlt,
} from 'react-icons/fa';
import '../styles/AdminDashboard.css';

// Simple local context for admin media grid filters
const AdminMediaContext = createContext();
export const useAdminMedia = () => useContext(AdminMediaContext);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Tab state
    const [activeTab, setActiveTab] = useState('media');

    // Media tab state
    const [filters, setFilters] = useState({
        company: 'SBA',
        mediaType: 'All',
        searchQuery: ''
    });
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [localSearch, setLocalSearch] = useState('');
    const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
    const [isAddMediaOpen, setIsAddMediaOpen] = useState(false);

    // User tab state
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    // Search debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters(prev => ({ ...prev, searchQuery: localSearch }));
        }, 500);
        return () => clearTimeout(handler);
    }, [localSearch]);

    // Load users when switching to users tab
    useEffect(() => {
        if (activeTab === 'users') {
            loadUsers();
        }
    }, [activeTab]);

    const loadUsers = async () => {
        setUsersLoading(true);
        try {
            const data = await listUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users:', error);
            alert('Failed to load users.');
        } finally {
            setUsersLoading(false);
        }
    };

    const handleToggleUser = async (u) => {
        try {
            if (u.enabled) {
                if (u.username === user?.username) {
                    alert('You cannot disable your own account.');
                    return;
                }
                await disableUser(u.id);
            } else {
                await enableUser(u.id);
            }
            loadUsers();
        } catch (error) {
            console.error('Failed to toggle user:', error);
            alert('Failed to update user status.');
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-left">
                    <button className="btn-back" onClick={() => navigate('/dashboard')}>
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                    <h1>Admin Portal</h1>
                </div>
                <span className="admin-user-badge">Logged in as: {user?.username}</span>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'media' ? 'active' : ''}`}
                    onClick={() => setActiveTab('media')}
                >
                    <FaImages /> Media Management
                </button>
                <button
                    className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <FaUsers /> User Management
                </button>
            </div>

            {/* Tab Content */}
            <div className="admin-content">
                {activeTab === 'media' && (
                    <div className="admin-media-tab">
                        {/* Toolbar */}
                        <div className="admin-toolbar">
                            <div className="admin-toolbar-left">
                                <div className="search-wrapper">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search Media Code..."
                                        className="search-input"
                                        value={localSearch}
                                        onChange={(e) => setLocalSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="admin-toolbar-right">
                                <button className="btn-nav btn-secondary" onClick={() => setIsAddMediaOpen(true)}>
                                    <FaPlus /> Add Media
                                </button>
                                <button className="btn-nav btn-secondary" onClick={() => setIsBulkUploadOpen(true)}>
                                    <FaCloudUploadAlt /> Bulk Image Match
                                </button>
                            </div>
                        </div>

                        <AdminMediaGrid
                            filters={filters}
                            selectedIds={selectedIds}
                            toggleSelection={toggleSelection}
                        />
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="admin-users-tab">
                        <div className="admin-toolbar">
                            <h2 style={{ fontSize: '1.1rem', color: '#1e293b' }}>User Accounts</h2>
                            <button className="btn-nav btn-primary-nav" onClick={() => setIsAddUserOpen(true)}>
                                <FaUserPlus /> Add User
                            </button>
                        </div>

                        {usersLoading ? (
                            <div className="loading-sentinel">
                                <div className="spinner"></div>
                                <span>Loading users...</span>
                            </div>
                        ) : (
                            <>
                                {/* Desktop table (hidden on mobile via CSS) */}
                                <div className="users-table-wrapper">
                                    <table className="users-table">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((u) => (
                                                <tr key={u.id}>
                                                    <td className="username-cell">{u.username}</td>
                                                    <td>
                                                        <span className={`role-badge ${u.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge ${u.enabled ? 'status-active' : 'status-disabled'}`}>
                                                            {u.enabled ? 'Active' : 'Disabled'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className={`btn-toggle ${u.enabled ? 'btn-disable' : 'btn-enable'}`}
                                                            onClick={() => handleToggleUser(u)}
                                                            title={u.enabled ? 'Disable user' : 'Enable user'}
                                                        >
                                                            {u.enabled ? <><FaUserSlash /> Disable</> : <><FaUserCheck /> Enable</>}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile card list (hidden on desktop via CSS) */}
                                <div className="user-cards">
                                    {users.map((u) => (
                                        <div key={u.id} className="user-card">
                                            <div className="user-card-header">
                                                <span className="user-card-name">{u.username}</span>
                                                <span className={`role-badge ${u.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                                                    {u.role}
                                                </span>
                                            </div>
                                            <div className="user-card-row">
                                                <span className="user-card-label">Status</span>
                                                <span className={`status-badge ${u.enabled ? 'status-active' : 'status-disabled'}`}>
                                                    {u.enabled ? 'Active' : 'Disabled'}
                                                </span>
                                            </div>
                                            <button
                                                className={`btn-toggle ${u.enabled ? 'btn-disable' : 'btn-enable'}`}
                                                onClick={() => handleToggleUser(u)}
                                                title={u.enabled ? 'Disable user' : 'Enable user'}
                                            >
                                                {u.enabled ? <><FaUserSlash /> Disable</> : <><FaUserCheck /> Enable</>}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            <BulkImageUploadModal
                isOpen={isBulkUploadOpen}
                onClose={() => setIsBulkUploadOpen(false)}
            />

            <AddMediaModal
                isOpen={isAddMediaOpen}
                onClose={() => setIsAddMediaOpen(false)}
            />

            <AddUserModal
                isOpen={isAddUserOpen}
                onClose={() => setIsAddUserOpen(false)}
                onUserCreated={loadUsers}
            />
        </div>
    );
};

export default AdminDashboard;
