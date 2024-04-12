import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function WorkshopPage() {
    let navigate = useNavigate();

    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(baseUrl + '/artikel', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setWorkshops(data);
                } else {
                    setError('Failed to fetch workshops');
                    navigate('/login');
                }
            } catch (error) {
                setError('An error occurred while fetching workshops');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`${baseUrl}/artikel/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const updatedWorkshops = workshops.filter(workshop => workshop.id !== id);
                setWorkshops(updatedWorkshops);
                alert('Workshop deleted successfully');
            } else {
              alert('Error deleting workshop');
            }
        } catch (error) {
          alert('Error:', error);
        }
    };  

    return (
        <AdminLayout>
            <AdminHeader
              title={"Manajemen Workshop"}
              customAction={<Link
                to="/admin/workshop/create"
                className="btn-primary ml-auto md:ml-0">
                  Create Workshop
              </Link>}
            />
            <section className="w-full min-h-[90vh] pb-4 bg-[#FCFCFC] rounded-2xl flex flex-col overflow-hidden">
              <div className="table-responsive mb-[14px]">
                <table className="w-full" id="tableProductsUp">
                  <thead className="border-b border-b-slate-200 bg-slate-100">
                    <tr>
                      <th width="60%" className="py-4 pl-4 last:pl-0">
                        Nama Workshop
                      </th>
                      <th width="30%" className="py-4 pl-4 last:pl-0">
                        Thumbnail
                      </th>
                      <th width="" className="py-4 pl-4 last:pl-0">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workshops.map(workshop => (
                      <tr key={workshop.id}>
                        <td className="text-sm font-medium text-dark-2 overflow-ellipsis">
                          {workshop.judul}
                        </td>
                        <td>
                          <img src={`${workshop.gambar}`} className="w-24 h-24 rounded-lg" alt="" />
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            {/* Edit */}
                            <Link
                              to={`/admin/workshop/edit/${workshop.id}`}
                              className="group transition-all relative rounded-full bg-white hover:bg-primary p-[13px] text-dark-2 hover:text-white min-w-max"
                            >
                              <img
                                src="/assets/svg/ic-pencil.svg"
                                className="w-6 h-6 transition-all group-hover:filter-white"
                                alt=""
                              />
                            </Link>
                            {/* Delete */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.confirm('Are you sure you want to delete this workshop?')) {
                                        handleDelete(workshop.id);
                                    }
                                }}
                                className="group transition-all relative rounded-full bg-white hover:bg-primary p-[13px] text-dark-2 hover:text-white min-w-max"
                            >
                                <img
                                    src="/assets/svg/ic-trash.svg"
                                    className="w-6 h-6 transition-all group-hover:filter-white"
                                    alt=""
                                />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
        </AdminLayout>
    )
}

export default WorkshopPage;
