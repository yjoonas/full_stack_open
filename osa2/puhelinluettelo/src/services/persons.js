import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const addPerson = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(res => res.data)
}

const updatePerson = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

export default {
    getPersons,
    addPerson,
    updatePerson,
    deletePerson
}