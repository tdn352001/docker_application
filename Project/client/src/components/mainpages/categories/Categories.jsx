import axios from 'axios'
import React, { useContext, useState } from 'react'

import { CategoryContext } from '../../../contexts/CategoryContext'
import { apiUrl } from '../../../contexts/Constants'

const Categories = () => {


    const { categories, setCategories } = useContext(CategoryContext)


    const [category, setCategory] = useState('')
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async (e) => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`${apiUrl}/api/category/${id}`, { name: category })
                const updatedCategories = categories.map(item => {
                    if (item._id === id) {
                        item.name = category
                    }
                    return item
                })
                setCategories(updatedCategories)
                alert('Updated Successfully')
                setOnEdit(false)
            }
            else {
                const res = await axios.post(`${apiUrl}/api/category`, { name: category })
                const newCategory = res.data.category
                setCategories([...categories, newCategory])
            }
            setCategory('')
        }
        catch (error) {
            alert(error.response.data.message)
        }


    }

    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this category?')) {
                await axios.delete(`${apiUrl}/api/category/${id}`)
                const updatedCategories = categories.filter(item => item._id !== id)
                setCategories(updatedCategories)
                alert('Deleted Successfully')
            }
        }
        catch (error) {
            alert(error.response.data.message)
        }

    }

    return (
        <div className='categories'>
            <form onSubmit={createCategory}>
                <label htmlFor='category'>Category</label>
                <input type='text' name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)} required />

                <button type='submit'>{onEdit ? 'Update' : 'Create'}</button>
            </form>

            <div className='col'>
                {
                    categories.map((item) => (
                        <div className='row' key={item._id}>
                            <p>{item.name}</p>
                            <div>
                                <button onClick={() => editCategory(item._id, item.name)}>Edit</button>
                                <button onClick={() => deleteCategory(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories