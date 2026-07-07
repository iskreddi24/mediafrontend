import { useState, useEffect, useRef, useCallback } from "react";
import { getMedia, deleteMedia } from "../../services/mediaService";
import { useAuth } from "../../context/AuthContext";
import "../../styles/MediaGrid.css";
import {
  FaEdit,
  FaTrashAlt,
  FaMapMarkerAlt,
  FaCity,
  FaRulerCombined,
  FaCheck,
} from "react-icons/fa";
import EditMediaModal from "./EditMediaModal";

const BASE_URL = "http://192.168.0.206:8085";

const AdminMediaGrid = ({ filters, selectedIds, toggleSelection }) => {
  const { isAdmin } = useAuth();

  const [mediaList, setMediaList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [editingMedia, setEditingMedia] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const observer = useRef();

  const loadData = useCallback(async (isNewFilter = false) => {
    if (loading) return;
    setLoading(true);
    const pageToFetch = isNewFilter ? 0 : page;

    try {
      const data = await getMedia(filters, pageToFetch);
      setMediaList((prev) => (pageToFetch === 0 ? data.content : [...prev, ...data.content]));
      setTotalItems(data.totalElements);
      setHasMore(!data.last);
      if (isNewFilter) setPage(0);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page, loading]);

  useEffect(() => {
    loadData(true);
  }, [filters.company, filters.mediaType, filters.searchQuery]);

  useEffect(() => {
    if (page > 0) loadData(false);
  }, [page]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleEditClick = (e, media) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingMedia(media);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (e, media) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete "${media.mediaCode}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteMedia(media.id);
      setMediaList((prev) => prev.filter((m) => m.id !== media.id));
      setTotalItems((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to delete media:", error);
      alert("Failed to delete media. Please try again.");
    }
  };

  const LOCAL_PLACEHOLDER =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23f1f5f9%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%2394a3b8%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";

  return (
    <div className="media-grid-container">
      <div className="stats-bar">
        <div className="stats-group">
          <div className="stat-pill">
            Total: <strong>{totalItems}</strong>
          </div>
          <div className="stat-pill">
            Showing: <strong>{mediaList.length}</strong>
          </div>
        </div>
        {selectedIds && selectedIds.size > 0 && (
          <div className="selection-counter">
            <FaCheck /> <span>Selected: {selectedIds.size}</span>
          </div>
        )}
      </div>

      <div className="media-grid">
        {mediaList.map((media, index) => {
          const isLast = index === mediaList.length - 1;
          const isSelected = selectedIds?.has(media.id);

          return (
            <div
              key={`${media.id}-${index}`}
              className={`media-card ${isSelected ? "is-selected" : ""}`}
              ref={isLast ? lastElementRef : null}
              onClick={() => toggleSelection && toggleSelection(media.id)}
            >
              <div className="card-top-actions">
                {toggleSelection && (
                  <div className={`custom-checkbox ${isSelected ? "checked" : ""}`}>
                    {isSelected && <FaCheck />}
                  </div>
                )}
                <div className="admin-card-actions">
                  <button
                    className="edit-card-btn"
                    onClick={(e) => handleEditClick(e, media)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-card-btn"
                    onClick={(e) => handleDeleteClick(e, media)}
                    title="Delete media"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="card-img-wrapper">
                <img
                  src={`${BASE_URL}/uploads/${media.imagePath}`}
                  alt={media.mediaCode}
                  className="card-img"
                  onError={(e) => {
                    if (e.target.src !== LOCAL_PLACEHOLDER) {
                      e.target.onerror = null;
                      e.target.src = LOCAL_PLACEHOLDER;
                    }
                  }}
                />
                <div className="media-type-tag">{media.mediaType}</div>
              </div>

              <div className="card-details">
                <div className="media-code-row">
                  <span className="media-code">{media.mediaCode}</span>
                </div>
                <div className="location-row">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span className="location-text">{media.location}</span>
                </div>
                <div className="meta-info-grid">
                  <div className="info-item">
                    <FaCity className="detail-icon" />
                    <span className="info-val">{media.city}</span>
                  </div>
                  <div className="info-item">
                    <FaRulerCombined className="detail-icon" />
                    <span className="info-val">{media.specifications}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <EditMediaModal
          isOpen={isEditModalOpen}
          media={editingMedia}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingMedia(null);
          }}
          onUpdateSuccess={() => window.location.reload()}
        />
      )}

      {loading && (
        <div className="loading-sentinel">
          <div className="spinner"></div>
          <span>Fetching more assets...</span>
        </div>
      )}
    </div>
  );
};

export default AdminMediaGrid;
