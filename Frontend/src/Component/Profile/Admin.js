import React, {useEffect, useState }from 'react'
import './Profile.css'
import Axios from 'axios'
import Modal from 'react-modal'

const customModalStyle = {
    content : {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '30%',
        backgroundColor: 'rgb(38, 51, 42)',
        boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.5)',
        border: '0px',
        padding: '1.5%',
        overflow: 'none',
    }
}

function Admin() {
    const [users, setUsers] = useState([])
    const [editUsername, setEditUsername] = useState('')
    const [editPassword, setEditPassword] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [modalUsername, setModalUsername] = useState()
    const [modalId, setModalId] = useState()
   
    useEffect(() => {
        fetchAllUsers()
    }, [])

    function validateForm() {
        if( editPassword.length > 0){
            return true
        }
    }

    const openModal = (username, id) => {
        setModalUsername(username)
        setModalId(id)
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
        Axios.put(`http://localhost:1338/user/${id}`, {username: editUsername ,password: editPassword})
        fetchAllUsers()
    }
    //TODO: VALIDATION HANDLER IN MODAL
    const modalForm = () => {
        return( 
            <Modal
                isOpen={modalOpen}
                style={customModalStyle}>
                <form className="edit-form">
                    <p>You are now Editing User: <h3>{modalUsername}</h3></p>

                    <h3>Change Username </h3>
                    <div className="input-fields">
                        <input 
                            placeholder="New Username" 
                            type="username" 
                            className="Username" 
                            onChange={(e) => setEditUsername(e.target.value)}>
                        </input>
                    </div>

                    <h3>Change Password</h3>
                    <div className="input-fields">
                        <input placeholder="New/old Password" onChange={(e) => setEditPassword(e.target.value)}></input>
                    </div>

                    <button onClick={() => {editUser(modalId)}} id="submit-edit" disabled={!validateForm()}>Submit Edit</button>
                    <button onClick={closeModal} id="modal-close">Cancel</button>
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
                                <li className={newData.username}>Username: {newData.username}</li>
                                <button id="edit" onClick={() => openModal(newData.username, newData._id)}>Edit this user</button>
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

export default Admin
