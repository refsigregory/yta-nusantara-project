import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function ProgramCreatePage() {
  let navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        deskripsi: '',
        gambar: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const formDataToSend = new FormData();

        formDataToSend.append('nama', formData.nama);
        formDataToSend.append('deskripsi', formData.deskripsi);
        formDataToSend.append('gambar', formData.gambar);

        try {
            const response = await fetch(baseUrl + '/program', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.status === 201) {
                // Handle success, e.g., show a success message
                alert('Program created successfully');
            } else {
                // Handle error
                alert('Error creating program');
            }
        } catch (error) {
            alert('Error:', error);
        }

        navigate('/admin/program');
    };

    return (
        <AdminLayout>
            <AdminHeader
              title={"Buat Program"}
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
                    placeholder="Nama Program"
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
                    placeholder="Deskripsi Program"
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

export default ProgramCreatePage;
