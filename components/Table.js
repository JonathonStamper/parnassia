import React, { useEffect, useState } from 'react';

const Table = ({ dataToevoeg, dataAanpassen, dataVerwijderen, setDataToevoeg, setDataAanpassen, setDataVerwijderen, personArray}) => {
    let headings = ['Voornaam', 'Achternaam', 'personeelnr', 'Werktijd', 'Uren', 'DatumUitDienst']

    
    return (
        <div className='mx-[10%] my-[8%] rounded-xl -z-10 bg-slate-400 h-[80%] overflow-hidden '>
            <h2 className='font-bold text-lg p-3'>Table Data</h2>
            <table className="w-full bg-[#E7EBEF] text-black border-2 border-gray-300">
                <thead className='border-r-2 border-black'>
                    <tr>
                        {headings.map((head, headID) => (
                            <th key={headID}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                <tr className='border-y-2 border-black'>
            
        </tr>
        {personArray?.length > 0 ? (
      personArray?.map((row, index) => (
        <tr key={index}>
          <td className='border-r-2 border-black'>{row.voornaam}</td>
          <td className='border-r-2 border-black'>{row.achternaam}</td>
          <td className='border-r-2 border-black'>{row.personeelnr}</td>
          <td className='border-r-2 border-black'>{row.werktijd}</td>
          <td className='border-r-2 border-black'>{row.uren}</td>
          <td className='border-r-2 border-black'>{row.datumUitDienst}</td>
        </tr>
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
    // const [rows, setRows] = useState([]);
    
    //  useEffect(() => {
    //     if (dataToevoeg && Object.keys(dataToevoeg).length > 0) {
    //         setRows([...rows, dataToevoeg]);
    //         setDataToevoeg({}); // Clear `dataToevoeg` after adding
    //     }
    // }, [dataToevoeg, rows, setDataToevoeg]);
    
    // useEffect(() => {
    //     if (dataVerwijderen && Object.keys(dataVerwijderen).length > 0) {
    //         const updatedRows = rows.filter(row => row.personeelnr !== dataVerwijderen.personeelnr);
    //         setRows(updatedRows);
    //         setDataVerwijderen({}); // Clear `dataVerwijderen` after removing
    //     }
    // }, [dataVerwijderen, rows, setDataVerwijderen]);
};


export default Table;