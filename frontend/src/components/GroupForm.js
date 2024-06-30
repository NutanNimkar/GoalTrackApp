import { useContext, useState } from "react"
import React from "react"
import { SharedStateContext } from "../Context/SharedStateContext"
import { Form } from "react-bootstrap"

const GroupForm = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [punishment, setPunishment] = useState("")
    const [error, setError] = useState(null)
    
    const {selectedUserId, setSelectedUserId, users, addUserToGroup} = useContext(SharedStateContext)

    const handleGroupSubmit = async (e) => {
        e.preventDefault()

        const group = {name, description, selectedUserId, punishment}
        const response = await fetch('/api/groups', {
            method: 'POST',
            body: JSON.stringify(group),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setDescription('')
            setPunishment('')
            setError(null)
            console.log('New Group Added', json)
        }
    }

    return (
        <form className="create" onSubmit={handleGroupSubmit} onClick={addUserToGroup}>
            <h3 style={{ color: '#ffffff' }}>Create your new Group</h3>
            <label style={{ color: '#ffffff' }}>Group Name:</label>
            <br/>
            <input
                type = "text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <br/>
            <label style={{ color: '#ffffff' }}>Group Description:</label>
            <br/>
            <input
                type = "text"
                onChange={(e) => setDescription(e.target.value)}
                value={description} 
            />
            <br/>
            <Form.Label style={{ color: '#ffffff' }}>Add User to Group</Form.Label>
            <Form.Control 
            as="select" 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)}
            >
            <option value="">Select a user</option>
            {users.map(user => (
                <option key={user._id} value={user._id}>{user.username}</option>
            ))}
            </Form.Control>
            <br/>
            <label style={{ color: '#ffffff' }}>Punishment:</label>
            <br/>
            <input
                type = "text"
                onChange={(e) => setPunishment(e.target.value)}
                value={punishment}
            />

            <button>Create Group</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default GroupForm