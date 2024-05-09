import React, { useState, useEffect } from 'react';
import './App.css'

const ReactPagination = () => {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    // const APIURL = "https://jsonplaceholder.typicode.com/comments";
    const APIURL = "https://jsonplaceholder.typicode.com/photos";

    useEffect(() => {
        fetch(APIURL)
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
                setTotalPage(Math.ceil(data.length /10));
            })
           
    }, []);

    // //current page function
    // const handleChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    const handleNextClick = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const prevDisable = currentPage === 1;
    const nextDisable = currentPage === totalPage;

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsToDisplay = userData.slice(startIndex, endIndex);

    return (
        <div className='stories-div'>
            <h1>React Pagination</h1>

            <div className='pagination-btn'>
            <button onClick={handlePrevClick} disabled={prevDisable}>Previous</button>
            <button onClick={handleNextClick} disabled={nextDisable}>Next</button>
            
            </div>
            {itemsToDisplay.map((item, index) => (
                
                <div  className='card' key={index}>
                    <p><strong>User ID:</strong> {item.id}</p><br/>
                    <p ><strong>Title:</strong> {item.title}</p><br/>
                    <p ><strong>albumId: </strong> {item.albumId}</p><br/>
                    <p ><strong>url:</strong> {item.url}</p><br/>
                    <p ><strong>thumbnailUrl:</strong> <a href={item.thumbnailUrl} target='_blank'>item.thumbnailUrl</a></p>
                    <div className="card-button">
                        <a href={APIURL} target='_blank'>
                        </a>
                     </div>
                </div>
            ))}
        </div>
    );
};

export default ReactPagination;

