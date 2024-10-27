import React, { useEffect, useState } from 'react';

const Table = ({ dataToevoeg, dataAanpassen, dataVerwijderen, setDataToevoeg, setDataAanpassen, setDataVerwijderen }) => {
    let headings = ['Voornaam', 'Achternaam', 'personeelnr', 'Werktijd', 'Uren', 'DatumUitDienst']

    const [rows, setRows] = useState([]);

     // Ensure that dataToevoeg is not null or undefined before adding it to rows
     useEffect(() => {
        if (dataToevoeg && Object.keys(dataToevoeg).length > 0) {
            setRows([...rows, dataToevoeg]);
            setDataToevoeg({}); // Clear `dataToevoeg` after adding
        }
    }, [dataToevoeg, rows, setDataToevoeg]);

    // Handle row removal based on `dataVerwijderen`
    useEffect(() => {
        if (dataVerwijderen && Object.keys(dataVerwijderen).length > 0) {
            const updatedRows = rows.filter(row => row.personeelnr !== dataVerwijderen.personeelnr);
            setRows(updatedRows);
            setDataVerwijderen({}); // Clear `dataVerwijderen` after removing
        }
    }, [dataVerwijderen, rows, setDataVerwijderen]);

    return (
        <div>
            <h2>Table Data</h2>
            <table className="w-full bg-[#E7EBEF] text-black border-2 border-gray-300">
                <thead>
                    <tr>
                        {headings.map((head, headID) => (
                            <th key={headID}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <TableRow key={index} row={row} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const TableRow = ({ row }) => {
    return (
        <tr className='border-y-2 border-black'>
            <td className=' border-r-2 border-black'>{row.voornaam}</td>
            <td className=' border-r-2 border-black'>{row.achternaam}</td>
            <td className=' border-r-2 border-black'>{row.personeelnr}</td>
            <td className=' border-r-2 border-black'>{row.werktijd}</td>
            <td className=' border-r-2 border-black'>{row.uren}</td>
            <td className=' border-r-2 border-black'>{row.datumUitDienst}</td>
        </tr>
    );
};


export default Table;