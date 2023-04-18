import React from "react";



export default function Pager({ recipesPerPage, allRecipes, pager }) {
    const pageNumbers = []

        for (let i = 1; i <= Math.ceil((allRecipes / recipesPerPage)); i++) { 
            pageNumbers.push(i)
        }

    return (
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => pager(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
};