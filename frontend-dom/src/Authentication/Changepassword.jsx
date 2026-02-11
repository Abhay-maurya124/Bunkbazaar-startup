import React, { useState } from 'react'

const ChangePassword = () => {
    const [Loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/user/v3/changepass', { email });
        } catch (error) {
            console.log("error", error.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name=''  />
            </form>
        </div>
    )
}

export default ChangePassword