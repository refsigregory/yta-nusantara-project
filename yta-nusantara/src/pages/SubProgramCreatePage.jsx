import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function SubProgramCreatePage() {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: '',
        deskripsi: '',
        gambar: null,
        program_id: '',
    });

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(baseUrl + '/program', {
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
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();

        formDataToSend.append('nama', formData.nama);
        formDataToSend.append('deskripsi', formData.deskripsi);
        formDataToSend.append('gambar', formData.gambar);
        formDataToSend.append('program_id', formData.program_id);

        try {
            const response = await fetch(baseUrl + '/sub-program', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.status === 201) {
                alert('Sub Program created successfully');
            } else {
                alert('Error creating sub program');
            }
        } catch (error) {
            alert('Error:', error);
        }

        navigate('/admin/sub-program');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <AdminLayout>
            <AdminHeader
              title={"Buat Sub Program"}
            />
            <section className="w-full p-4 bg-[#FCFCFC] rounded-2xl flex flex-col max-w-[550px]">
              <form
                onSubmit={handleSubmit}
                id="programForm"
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="nama" className="text-base font-medium text-dark-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    onChange={handleChange}
                    placeholder="Nama Sub Program"
                    className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
                    value={formData.nama}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="deskripsi" className="text-base font-medium text-dark-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    id="deskripsi"
                    onChange={handleChange}
                    rows={4}
                    placeholder="Deskripsi Sub Program"
                    className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
                    value={formData.deskripsi}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="gambar" className="text-base font-medium text-dark-1">
                    Gambar
                  </label>
                  <input
                    type="file"
                    name="gambar"
                    id="gambar"
                    onChange={handleChange}
                    className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="program_id" className="text-base font-medium text-dark-1">
                    Program
                  </label>
                  <select
                    name="program_id"
                    id="program_id"
                    onChange={handleChange}
                    className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary"
                    value={formData.program_id}
                  >
                    <option value="">Pilih Program</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-10">
                  <button type="submit" className="btn-primary w-full">
                    Simpan
                  </button>
                </div>
              </form>
            </section>
        </AdminLayout>
    )
}

export default SubProgramCreatePage;
