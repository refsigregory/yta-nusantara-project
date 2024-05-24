import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function SubProgramEditPage() {
    let navigate = useNavigate();
    const { id } = useParams(); // Get the id parameter from the route
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
        // Fetch sub-program details for editing
        const fetchSubProgram = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`${baseUrl}/sub-program/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    setError('Failed to fetch sub-program details');
                }
            } catch (error) {
                setError('An error occurred while fetching sub-program details');
            } finally {
                setLoading(false);
            }
        };

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
            }
        };

        fetchSubProgram();
        fetchPrograms();
    }, [id]);

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
            const response = await fetch(`${baseUrl}/sub-program/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                alert('Sub program updated successfully');
            } else {
                alert('Error updating sub program');
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
                title="Ubah Sub Program"
            />
            <section className="w-full sm:p-4 bg-[#FCFCFC] rounded-2xl flex flex-col max-w-[550px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nama" className="text-base font-medium text-dark-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="nama"
                            id="nama"
                            onChange={handleChange}
                            value={formData.nama}
                            className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
                            placeholder="Nama Sub Program"
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
                            value={formData.deskripsi}
                            rows={4}
                            className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
                            placeholder="Deskripsi Sub Program"
                        ></textarea>
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
                            value={formData.program_id}
                            className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary"
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
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}

export default SubProgramEditPage;
