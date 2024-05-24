import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import AdminLayout from "../components/AdminLayout";
import { baseUrl } from '../config/app';

function UserPasswordEditPage() {
    let navigate = useNavigate();
    // const { user_id } = useParams(); // Get the user_id parameter from the route
    const user_id = 1; // just user admin
    const [formData, setFormData] = useState({
        password: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user details for editing
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`${baseUrl}/user/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    setError('Failed to fetch user details');
                }
            } catch (error) {
                setError('An error occurred while fetching user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${baseUrl}/user/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, e.g., redirect to UserPage
                alert('User password updated successfully');
            } else {
                // Handle error
                alert('Error updating user password');
            }
        } catch (error) {
            alert('Error:', error);
        }
        navigate('/admin');
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
                title="Edit User Password"
            />
            <section className="w-full sm:p-4 bg-[#FCFCFC] rounded-2xl flex flex-col max-w-[550px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-base font-medium text-dark-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            value={formData.password}
                            className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="btn-primary w-full">
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}

export default UserPasswordEditPage;
