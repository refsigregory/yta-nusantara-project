import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function SubProgramPage() {
    let navigate = useNavigate();

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

                const response = await fetch(baseUrl + '/sub-program', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPrograms(data);
                } else {
                    setError('Failed to fetch programs');
                }
            } catch (error) {
                setError('An error occurred while fetching programs');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
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
            const response = await fetch(`${baseUrl}/sub-program/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                // Reload programs after successful deletion
                const updatedPrograms = programs.filter(program => program.id !== id);
                setPrograms(updatedPrograms);
                alert('Program deleted successfully');
            } else {
              alert('Error deleting program');
            }
        } catch (error) {
          alert('Error:', error);
        }
    };  

    return (
        <AdminLayout>
            <AdminHeader
              title={"Manajemen Program"}
              customAction={<a
                href="/admin/sub-program/create"
                className="btn-primary ml-auto md:ml-0">
                  Create Sub Program
              </a>}
            />
            <section className="w-full min-h-[90vh] pb-4 bg-[#FCFCFC] rounded-2xl flex flex-col overflow-hidden">
              <div className="table-responsive mb-[14px]">
                <table className="w-full" id="tableProductsUp">
                  <thead className="border-b border-b-slate-200 bg-slate-100">
                    <tr>
                      <th width="80%" className="py-4 pl-4 last:pl-0">
                        Nama Sub Program
                      </th>
                      <th width="" className="py-4 pl-4 last:pl-0">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map(program => (
                      <tr key={program.id}>
                        <td className="text-sm font-medium text-dark-2">
                          {program.nama}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            {/* Edit */}
                            <a
                              href={`/admin/sub-program/edit/${program.id}`}
                              className="group transition-all relative rounded-full bg-white hover:bg-primary p-[13px] text-dark-2 hover:text-white min-w-max"
                            >
                              <img
                                src="/assets/svg/ic-pencil.svg"
                                className="w-6 h-6 transition-all group-hover:filter-white"
                                alt=""
                              />
                            </a>
                            {/* Delete */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.confirm('Are you sure you want to delete this program?')) {
                                        handleDelete(program.id);
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

export default SubProgramPage;
