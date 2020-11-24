import React, {useEffect, useState }from 'react'
import './ProfileView.css'
import Axios from 'axios'
import Modal from 'react-modal'

const customModalStyle = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '10vh',
        backgroundColor: 'red',
        overflow: 'none'
    }
}

function AdminView() {
    const [users, setUsers] = useState([])
    const [editUsername, setEditUsername] = useState()
    const [editPassword, setEditPassword] = useState()
    const [modalOpen, setModalOpen] = useState(false)
   
    useEffect(() => {
        fetchAllUsers()
    }, [])

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const fetchAllUsers = async () => {
        const response = await Axios.get('http://localhost:1338/user')
         try {
             setUsers(response.data)
             console.log(response.data)
         }catch (error) {
             console.log(error)
         }
    }

    const deleteUser = async (id) => {
        const response = await Axios.delete(`http://localhost:1338/user/${id}`)
        try{
            console.log(response)
            console.log("Deleted user with the ID of" + id)
        }catch (error) {
            console.log(error)
        }
        fetchAllUsers()
    }

    const editUser = async (id) => {
        Axios.put(`http://localhost:1338/user/${id}`, {username: editUsername, password: editPassword})
        fetchAllUsers()
    }

    const modalForm = (username, id) => {
        return( 
            <Modal
                isOpen={modalOpen}
                style={customModalStyle}>
                <form className="edit-form">
                    <button onClick={closeModal}>close</button>
                    <p>You are now Editing User: {username}</p>
                    <input placeholder="username" onChange={(e) => setEditUsername(e.target.value)}></input>
                    <input placeholder="password" onChange={(e) => setEditPassword(e.target.value)}></input>
                    <button onClick={() => {editUser(id)}}>Submit Edit</button>
                </form>
            </Modal>
        )
    }   

    const ifAdmin = () => {
        if(sessionStorage.getItem('isAdmin')){
            return(
                <div>
                    <h1>All Users</h1>
                    {users.map(newData => (
                        <ul className="users-list">
                                <li className={newData.username}>Username: {newData.username }</li>
                                <button id="edit" onClick={openModal}>Edit this user</button>
                                <button onClick={() => {deleteUser(newData._id)}}>&#10060;</button>
                                {console.log(newData.username)}
                        </ul>
                    ))} 
                    
                </div>

            )
        }
    }
    return (
        <div className="admin-users">
            {ifAdmin()}
            {modalForm()}
        </div>
    )
}

export default AdminView
