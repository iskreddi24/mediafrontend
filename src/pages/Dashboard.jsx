import { MediaProvider } from '../context/MediaContext';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import MediaGrid from '../components/media/MediaGrid';
import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <MediaProvider>
            <div className="dashboard-layout">
                <Sidebar />
                <div className="main-content">
                    <Navbar />
                    <div className="content-area">
                        <MediaGrid />
                    </div>
                </div>
            </div>
        </MediaProvider>
    );
};

export default Dashboard;
