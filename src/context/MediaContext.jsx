import { createContext, useState, useContext } from 'react';

const MediaContext = createContext();

// 1. INVENTORY DATA: Used for Sidebar Filters
export const COMPANY_MEDIA_TYPES = {
    SBA: ["SBA-Hitech Traffic Umbrella", "SBA-Modern Umbrella", "SBA-Traffic Control Booth", "SBA-Traffic Umbrella", "SBA-Arch", "SBA-Bus Shelter", "SBA-Cantilever", "SBA-Lollipop-Boards", "SBA-Pole-Boards"],
    OUTSPACE: ["Hoarding", "Arch", "Back Lit Board", "Uni-Pole", "Uni-Structure"],
    YUVA: ["Pole-Boards", "Lollipop-Boards",]
};

// 2. PROPOSAL BRANDING: Used for the "Generate PPT" Modal
export const PROPOSAL_BRANDS = [...Object.keys(COMPANY_MEDIA_TYPES), "NO_LOGO"];


export const MediaProvider = ({ children }) => {
    // Filters
    const [filters, setFilters] = useState({
        company: 'SBA',
        mediaType: 'All',
        searchQuery: ''
    });

    // Selection (Set of IDs)
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Toggle Selection Logic
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

    const clearSelection = () => setSelectedIds(new Set());

    // Update Filter Helpers
    const setCompany = (company) => {
        setFilters(prev => ({ ...prev, company, mediaType: 'All' }));
    };

    const setMediaType = (mediaType) => {
        setFilters(prev => ({ ...prev, mediaType }));
    };

    const setSearchQuery = (query) => {
        setFilters(prev => ({ ...prev, searchQuery: query }));
    };

    return (
        <MediaContext.Provider value={{
            filters,
            setCompany,
            setMediaType,
            setSearchQuery,
            selectedIds,
            toggleSelection,
            clearSelection
        }}>
            {children}
        </MediaContext.Provider>
    );
};

export const useMedia = () => useContext(MediaContext);
