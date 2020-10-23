import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

const Planet = () => {
  const [planetData, setPlanetData] = useState(null);
  const [residents, setresidents] = useState([]);
  let { id } = useParams();
  
  useEffect(() => {
    fetch(`http://swapi.dev/api/planets/${id}/`)
      .then(res => {
        if(res.status === 200){
          return res.json()
        }
      })
      .then((res => {
        const data = {
          name: res.name,
          rotation_period: res.rotation_period,
          diameter: res.diameter,
          climate: res.climate,
          gravity: res.gravity,
          terrain: res.terrain,
          population: res.population
        };
        setPlanetData(data);
        return res.residents;
      }))
      .then(res => {
        Promise.all(
          res.map(url =>
            fetch(url)
              .then(res => res.json())
              .then(res => res.name)
          )
        )
          .then(res => setresidents(res))
      })
      .catch(err => {console.log(err)})
  }, []);
  
  return (
    <Table>
      <tbody>
      {
        planetData ? (
          <>
            {
              Object.keys(planetData).map((item, id) => (
                <tr key={id}>
                  <th scope="row">{item.toUpperCase().split('_').join(' ')}</th>
                  <td>{planetData[item] === 'unknown' ? 'no information' : planetData[item] }</td>
                </tr>
              ))
            }
          <tr>
            <th scope="row">RESIDENTS</th>
            <td>
              {
                residents.length > 0 ?
                    residents.map((item, id) => (`${item} ${id > 0 ? '|' : ''} `))
                  :
                  (<span>no information</span>)
              }
            </td>
          </tr>
          </>
        ): (
          <tr>
            <th scope="row">There is no such planet</th>
          </tr>
        )
      }
      </tbody>
    </Table>
  )
};

export default Planet
