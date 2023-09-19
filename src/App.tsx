import React, { useState, useEffect } from 'react';
import Page from './Page';
import _textbooks from './textbooks.json';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const textbooks: Textbook[] = _textbooks;

function App() {

  const [currentBook, setCurrentBook] = useState<Textbook>();
  const [currentPage, setCurrentPage] = useState<number>();

  const [pageInput, setPageInput] = useState<string>("1");

  useEffect(() => {
      if (currentBook === undefined) {
        return;
      }

      changePage(localStorage.getItem(currentBook.url) ?? "");
  }, [currentBook]);

  useEffect(() => {
      changeBook(localStorage.getItem("lastBook") ?? "");
  }, []);

  function changePage(pageNumber: number | string) {

    if (currentBook === undefined) {
      return;
    }

    let _pageNumber = +pageNumber;

    if (isNaN(_pageNumber) || pageNumber === "" || _pageNumber < 1) {
      _pageNumber = 1;
    }

    setCurrentPage(_pageNumber);
    setPageInput(_pageNumber.toString());
    localStorage.setItem(currentBook.url, pageNumber.toString());
  }

  function changePageInput(value: string) {
    setPageInput(value);
  }

  function changeBook(bookIndex: number | string) {
    let _bookIndex = +bookIndex;

    if (isNaN(_bookIndex) || bookIndex === "" || _bookIndex < 0) {
      _bookIndex = 0;
    }
    setCurrentBook(textbooks[_bookIndex]);
    localStorage.setItem("lastBook", _bookIndex.toString());
  }

  function padPageNumber(pageNumber: number) {
    return pageNumber.toString().padStart(3, '0');
  }

  if (currentPage === undefined || currentBook === undefined) {
    return null;
  }

  const leftPage = (Math.floor(currentPage / 2) * 2);

  return (
    <div className="App">
      <div className="Controls">
        <FormControl>
          <InputLabel id="select-label" shrink>Textbook Name</InputLabel>
          <Select 
          MenuProps={{
            disableScrollLock: true,
          }}
          style={{marginRight: 20, backgroundColor: "#f8f8f8"}}
            labelId='select-label'
            label="Textbook Name"
            notched={true}
            onChange={(e) => changeBook(e.target.value)} 
            value={textbooks.indexOf(currentBook)}>
              { textbooks.map((textbook, index) => <MenuItem 
                key={textbook.name} 
                value={index}>{textbook.name}</MenuItem>) }
          </Select>
        </FormControl>
        <Button 
          style={{width: 100}}
          variant="contained"
          startIcon={<ArrowBackIcon/>}
          onClick={() => changePage(currentPage - 2)}>Left</Button>
       
        <TextField 
        style={{margin: "0 10px", backgroundColor: "#f8f8f8"}}
          label="Page Number"
          type='number' 
          onChange={(e) => changePageInput(e.target.value)} 
          onBlur={(e) => changePage(e.target.value)}
          value={pageInput}/>
        
        <Button 
          style={{width: 100}}
          variant="contained"
          endIcon={<ArrowForwardIcon/>}
          onClick={() => changePage(currentPage + 2)}>Right</Button>
      </div>
      <br/>
      <div className="Book">
        <Page noPage={leftPage === 0} imageUrl={currentBook.url.replace('{{id}}', padPageNumber(leftPage))}/>
        <Page noPage={false} imageUrl={currentBook.url.replace('{{id}}',  padPageNumber(leftPage + 1))}/>
      </div>

    </div>
  );
}

interface Textbook {
  name: string;
  url: string;
}

export default App;
