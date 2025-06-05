import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserProfile() {

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))


    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [tempName, setTempName] = useState(name)
    const [tempPhone, setTempPhone] = useState(phone)

    async function getUserDetails() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/userDetails`, { headers: { Authorization: `Bearer ${token}` } })
            if (res.status == 200) {
                setName(res.data.user.name)
                setEmail(res.data.user.email)
                setPhone(res.data.user.phoneNumber)
            }
        } catch (err) {
            console.log(err)
        }
    }

    function handleEdit() {
        setTempName(name)
        setTempPhone(phone)
        setIsEditing(true)
    }

    function handleCancel() {
        setIsEditing(false);
    }

    async function handleSave() {
        setIsSaving(true)
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/userUpdate`, { name: tempName, phone: tempPhone }, { headers: { Authorization: `Bearer ${token}` } })
           
            if (res.status == 200) {
                setName(tempName)
                setPhone(tempPhone)
                setIsEditing(false)
                getUserDetails()
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong while updating profile.');
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black">
            <h2 className="text-2xl font-bold mb-6 text-center">Customer Profile</h2>

            {/* Profile Image */}
            <div className="flex justify-center mb-4">
                <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
                    alt="User Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
            </div>

            {/* User Details */}
            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        value={isEditing ? tempName : name}
                        onChange={(e) => setTempName(e.target.value)}
                        readOnly={!isEditing}
                        className={`w-full mt-1 p-2 ${isEditing ? 'bg-white border border-gray-300' : 'bg-gray-100 cursor-not-allowed'
                            }`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full mt-1 p-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                        type="text"
                        value={isEditing ? tempPhone : phone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        readOnly={!isEditing}
                        className={`w-full mt-1 p-2 ${isEditing ? 'bg-white border border-gray-300' : 'bg-gray-100 cursor-not-allowed'
                            }`}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="bg-black text-white px-4 py-1 hover:bg-gray-800 cursor-pointer mx-auto"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleSave}
                            className="bg-green-700 text-white px-4 py-1 hover:bg-green-600 disabled:opacity-50"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-400 text-white px-4 py-1 hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserProfile