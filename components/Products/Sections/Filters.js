import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import FilterCountry from './FilterCountry';
import FilterType from './FilterType';
import FilterColor from './FilterColor';
export default function Filters() {
    
    const [isActive, setActive] = useState("false");
    const ToggleFilter = () => {
        setActive(!isActive);
        document.body.classList.toggle('modal-open');
      };
 


    return(
       <div className="FiltersCN">
            <button className="filters-btn" onClick={ToggleFilter} >
                <span className="filters-btn__filter_text">تصنيف</span>
                <svg aria-hidden="true" className="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path><path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path><path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path><path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path></svg><span className="ripple"></span>
            </button>
  
	 
            <div className={isActive ? "FilterInner" : "FilterInner FilterInnerOpen"}>
                

                <div className='FilterPane'>
                        <div className='ProductsWithBtn'>
                            <div className="FilterTitle">
                            التصانيف:
                            </div>
                            <div className='CloseBTN'  onClick={ToggleFilter}>
                            <svg height="15px" id="Layer_1"   version="1.1" viewBox="0 0 512 512" width="512px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>
                            </div>
                        </div>
                    
                        
                        <Accordion defaultActiveKey={['0','1','2','3','4']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><div className="FilterSubtitle">المصدر</div></Accordion.Header>
                                <Accordion.Body>
                                    <FilterCountry />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><div className="FilterSubtitle">اللون</div></Accordion.Header>
                                <Accordion.Body>
                                    <FilterColor />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><div className="FilterSubtitle">نوع الرخام</div></Accordion.Header>
                                <Accordion.Body>
                                    <FilterType />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className='FilterSubmitBtn'>
                                <button>مسح</button>
                                <button>تطبيق</button>
                        </div>
                </div>


            </div>
            
       </div>
    )
}