import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function WorkshopEditPage() {
  let navigate = useNavigate();
  let { id } = useParams(); // Assuming the workshop ID is passed as a URL parameter

  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: null,
  });

  useEffect(() => {
    const fetchWorkshop = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${baseUrl}/artikel/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setFormData({
            judul: data.judul,
            konten: data.konten,
            gambar: data.gambar,
          });
        } else {
          alert('Error fetching workshop data');
        }
      } catch (error) {
        alert('Error:', error);
      }
    };

    fetchWorkshop();
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

    formDataToSend.append('judul', formData.judul);
    formDataToSend.append('konten', formData.konten);
    formDataToSend.append('gambar', formData.gambar);

    try {
      const response = await fetch(`${baseUrl}/artikel/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 200) {
        alert('Workshop updated successfully');
      } else {
        alert('Error updating workshop');
      }
    } catch (error) {
      alert('Error:', error);
    }

    navigate('/admin/workshop');
  };

  return (
    <AdminLayout>
      <AdminHeader
        title={"Edit Workshop"}
      />
      <section className="w-full sm:p-4 bg-[#FCFCFC] rounded-2xl flex flex-col max-w-[550px]">
        <form
          onSubmit={handleSubmit}
          id="workshopForm"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="judul" className="text-base font-medium text-dark">
              Judul
            </label>
            <input
              type="text"
              name="judul"
              id="judul"
              onChange={handleChange}
              placeholder="Judul kegiatan"
              className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
              value={formData.judul}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="konten" className="text-base font-medium text-dark">
              Konten
            </label>
            <textarea
              name="konten"
              id="konten"
              onChange={handleChange}
              rows={4}
              placeholder="Konten kegiatan"
              className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
              value={formData.konten}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gambar" className="text-base font-medium text-dark">
              Photo
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
              Update
            </button>
          </div>
        </form>
      </section>
    </AdminLayout>
  )
}

export default WorkshopEditPage;
