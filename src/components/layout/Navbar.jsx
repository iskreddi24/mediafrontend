import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../../context/MediaContext";
import { useAuth } from "../../context/AuthContext";
import { generatePpt, generatePdf } from "../../services/mediaService";
import CompanyModal from "../common/CompanyModal";
import AddMediaModal from "../media/AddMediaModal";
import BulkCodesModal from '../media/BulkCodesModal';
import {
  FaPlus,
  FaPaste,
  FaFilePowerpoint,
  FaSignOutAlt,
  FaSearch,
  FaUserShield,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const { filters, setSearchQuery, selectedIds } = useMedia();
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [localSearch, setLocalSearch] = useState("");
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 500);

    return () => clearTimeout(handler);
  }, [localSearch, setSearchQuery]);

  const handleGenerateClick = () => {
    setIsCompanyModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleConfirmGeneration = async (companyName, format) => {
    try {
      const payload = {
        mediaIds: Array.from(selectedIds),
        companyName: companyName,
      };

      let blob;
      let extension;
      if (format === 'pdf') {
        blob = await generatePdf(payload);
        extension = 'pdf';
      } else {
        blob = await generatePpt(payload);
        extension = 'pptx';
      }

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute("download", `${companyName}_Proposal_${dateStr}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Failed to generate ${format.toUpperCase()}`, error);
      alert(`Failed to generate ${format.toUpperCase()}. Please try again.`);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <div className="company-logo-placeholder">{filters.company} ADS</div>
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
          {/* Hamburger for mobile */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="nav-actions">
          {isAdmin && (
            <>
              <button
                className="btn-nav btn-secondary"
                onClick={() => setIsBulkModalOpen(true)}
              >
                <FaPaste /> From Codes
              </button>

              <button
                className="btn-nav btn-secondary"
                onClick={() => setIsAddModalOpen(true)}
              >
                <FaPlus /> Add Media
              </button>

              <button
                className="btn-nav btn-secondary"
                onClick={() => navigate('/admin')}
              >
                <FaUserShield /> Admin Portal
              </button>
            </>
          )}

          <button
            className="btn-nav btn-primary-nav"
            onClick={handleGenerateClick}
            disabled={selectedIds.size === 0}
            title={selectedIds.size === 0 ? "Select items to generate" : ""}
          >
            <FaFilePowerpoint />
            Generate ({selectedIds.size})
          </button>

          <button
            className="btn-nav btn-secondary"
            onClick={logout}
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {isAdmin && (
            <>
              <button
                className="btn-nav btn-secondary"
                onClick={() => { setIsAddModalOpen(true); setMobileMenuOpen(false); }}
              >
                <FaPlus /> Add Media
              </button>
              <button
                className="btn-nav btn-secondary"
                onClick={() => { setIsBulkModalOpen(true); setMobileMenuOpen(false); }}
              >
                <FaPaste /> From Codes
              </button>
              <button
                className="btn-nav btn-secondary"
                onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
              >
                <FaUserShield /> Admin Portal
              </button>
            </>
          )}
          <button
            className="btn-nav btn-primary-nav"
            onClick={handleGenerateClick}
            disabled={selectedIds.size === 0}
          >
            <FaFilePowerpoint />
            Generate ({selectedIds.size})
          </button>
          <button
            className="btn-nav btn-secondary"
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}

      {/* Modals */}
      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        onConfirm={handleConfirmGeneration}
        count={selectedIds.size}
      />

      {isAdmin && (
        <>
          <AddMediaModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />

          <BulkCodesModal
            isOpen={isBulkModalOpen}
            onClose={() => setIsBulkModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
