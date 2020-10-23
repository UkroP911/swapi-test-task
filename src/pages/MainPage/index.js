import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import Paging from "../../components/Pagination";


const MainPage = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [planetCount, setPlanetCount] = useState(0);
  
  const fetchData = (page = 1) => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then(res => res.json())
      .then(res => {
        setPlanets(res.results);
        setPlanetCount(res.count/10);
      })
  }
  
  useEffect(() => {
    fetchData()
  }, []);
  
  const nextPage = () => {
    if(currentPage < planetCount){
      setPage(currentPage + 1);
      fetchData(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if(currentPage > 1){
      setPage(currentPage - 1);
      fetchData(currentPage - 1);
    }
  };
  
  const switchPage = (selectedPage) => {
    setPage(selectedPage);
    fetchData(selectedPage);
  }
  
  return(
    <>
      <Row>
        {planets.length > 0 &&
          planets.map((item, id) => (
            <Col md="4" key={id} className="mb-5">
              <Link to={`/planets/${id + 1}`}>
                <Card>
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>Climate: {item.climate  === 'unknown' ? 'no information' : item.climate}</CardSubtitle>
                    <CardSubtitle>Population: {item.population  === 'unknown' ? 'no information' : item.population}</CardSubtitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
      <Row>
        <Col>
          <Paging
            nextPage={nextPage}
            prevPage={prevPage}
            switchPage={switchPage}
            count={planetCount}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  )
};

export default MainPage;
