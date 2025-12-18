import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/pending-stories"
          className="p-4 bg-white rounded shadow hover:shadow-lg transition block"
        >
          <h2 className="font-semibold mb-1">Pending Stories</h2>
          <p className="text-sm text-gray-600">
            Review user-submitted cultural stories and approve or reject them.
          </p>
        </Link>

        {/* Future: add cards for heritage, timeline mgmt, etc. */}
        <Link
          to="/admin/heritage"
          className="p-4 bg-white rounded shadow hover:shadow-lg transition block"
        >
          <h2 className="font-semibold mb-1">Heritage Management</h2>
          <p className="text-sm text-gray-600">
            Create, update or remove heritage entries.
          </p>
        </Link>

        <Link
          to="/admin/timeline"
          className="p-4 bg-white rounded shadow hover:shadow-lg transition block"
        >
          <h2 className="font-semibold mb-1">Timeline Management</h2>
          <p className="text-sm text-gray-600">
            Update historical and cultural timeline events.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
