//src/Pagination.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
function Pagination({ pages , setCurrentPage , setCurrentButton , currentButton}) {
 
  const [t] = useTranslation();
  //Set number of pages
    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
      numberOfPages.push(i)
    }
 
  // Current active button number
 // const [currentButton, setCurrentButton] = useState(1)
 
  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
 
  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]
 
    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'
 
    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }
 
    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }
 
    else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }
 
    else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)               
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) 
    }
     
    else if (currentButton > numberOfPages.length - 3) {                
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
     
    else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }
 
    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }
 
    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
   
  }, [currentButton])
 
 
 
  return (
    <div className={(currentButton === 1 && currentButton === numberOfPages.length) ? "pagination-container PaginationDisplayNone" : "pagination-container "}>
      
      <div
        
        className={`${(currentButton === 1 ) ? 'disabled' : ''}`}  
        onClick={() => {setCurrentButton(prev => prev <= 1 ? prev : prev - 1); window.scrollTo(0,0)}}
      >
        {t("prevPagination")}
      </div>


      {/* {arrOfCurrButtons.map(((item, index) => {
            return <a
              href="#"
              key={index}
              className={`${currentButton === item ? 'active' : ''}`}
              onClick={() => setCurrentButton(item)}
            >
              {item}
            </a>
          }))}  
      */}
      
      <div
        
        className={`${(currentButton === numberOfPages.length) ? 'disabled' : ''}`}
        onClick={() => {setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1); window.scrollTo(0,0)}}
      >
        {t("nextPagination")}
      </div>
    </div>
  );
}
export default Pagination