import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./style.css";

function UsersDetails() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get(`https://reqres.in/api/users?page=${currentPage}`)
                .then((res) => {
                    const responseData = res.data.data;
                    const totalItems = res.data.total;
                    setData(responseData);
                    setTotalPages(Math.ceil(totalItems / itemsPerPage));
                }).catch((error) => {
                    console.log("Fetch Data Error", error);
                })
        }

        fetchData();
    }, [currentPage]);

    return (
        <div className='users'>
            <h1>Users Information</h1>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <img src={item.avatar} alt='user_avatar' width={70} height={70} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='pagination'>
                <span>
                    Page{' '}
                    <strong>
                        {currentPage} of {totalPages}
                    </strong>{' '}
                </span>
                <button type='button' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button type='button' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default UsersDetails;
