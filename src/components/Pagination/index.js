import React, {useState} from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";


const Paging = (props) => {
  const {
    count,
    nextPage,
    prevPage,
    switchPage,
    currentPage
  } = props;
  
  const links = [...Array(count)];
  
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink previous href="#" onClick={prevPage} />
      </PaginationItem>
      
      {
        links.map((item, id) => (
          <PaginationItem key={id} active={id + 1 === currentPage}>
            <PaginationLink href="#" onClick={() => switchPage(id + 1)}>
              {id + 1}
            </PaginationLink>
          </PaginationItem>
        ))
      }
      
      <PaginationItem>
        <PaginationLink next href="#" onClick={nextPage}/>
      </PaginationItem>
    </Pagination>
  )
};

export default Paging
