import React, { useState } from 'react';
import './Modules.css';
import {
 
  Button,
 
} from '@mui/material';
import Iconify from '../../components/iconify';

import { ModuleData } from './modulesData';
import AddModules from './AddModules/AddModules';
import { Role } from '../../env';

const Modules = () => {
  const [showInfo, setShowInfo] = useState({});
  const [showPerticularInfo, setShowPerticularInfo] = useState(null);
  const [showAddModules, setShowAddModules] = useState(false);
  
  const handleClick = (index, indes) => {
    if (indes !== showPerticularInfo) {
      setShowInfo({});
      setShowPerticularInfo(indes);
    }

    setShowInfo(state => ({
      ...state,
      [index]: !state[index],
    }));
  };

  const ModuleContent = ({ indexes ,data}) => {
    return (
      <div className="module_content_container">
        {data?.map((item, index) => {
          return (
            <div className="module_content" key={index}>
              <div className="content_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7 17h7v-2H7Zm0-4h10v-2H7Zm0-4h10V7H7ZM3 21V3h6.2q.325-.9 1.088-1.45Q11.05 1 12 1t1.713.55Q14.475 2.1 14.8 3H21v18Zm9-16.75q.325 0 .538-.213q.212-.212.212-.537q0-.325-.212-.538q-.213-.212-.538-.212q-.325 0-.537.212q-.213.213-.213.538q0 .325.213.537q.212.213.537.213Z"
                  />
                </svg>
              </div>
              <div className="content_text">
                <h3>{item?.name}</h3>
                <p>{item?.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modules_page_main_container">
      <div className="modules_page_body">
        <div className="modules_page_body_header">
          <h5>Modules</h5>
         {
          Role === "Teacher" || Role == "admin" ?  <Button style={{
            marginLeft:"auto",
            marginRight:"2rem"
          }} onClick={()=>{
           setShowAddModules(true)
       }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
         Add Modules
       </Button>  : ""
         }
        </div>
        <div className="modules_page_body_list">
          {ModuleData.map((item, indes) => {
            return (
              <div className="module_list_item" key={indes}>
                <div className="module_list_item_header">
                  <h3>{item?.name}</h3>
                </div>
                {item?.lesson?.map((item, index) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          handleClick(index, indes);
                        }}
                        className="module_list_item_data"
                        key={index}
                      >
                        <h4>{item?.name}</h4>
                        <i className="fa fa-chevron-down"></i>
                      </div>
                      {showInfo[index] && showPerticularInfo === indes  ? <ModuleContent indexes={index} key={index} data={item?.topics} /> : ''}
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {
        showAddModules &&  <AddModules setClose={setShowAddModules}/>
      }
    </div>
  );
};

export default Modules;
