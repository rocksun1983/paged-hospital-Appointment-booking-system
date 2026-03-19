import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        {children}

      </div>

    </div>

  );

}