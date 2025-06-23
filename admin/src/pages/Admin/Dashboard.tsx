import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../hooks/useAdminContext';

const Dashboard: React.FC = () => {
const {totaldoctors,totalpatients,totalusers,getAdminPanelData}=useAdminContext();
console.log(totaldoctors);
console.log(totalpatients);
console.log(totalusers)
useEffect(() => {
  getAdminPanelData();
}, []);
  return (
   <div>
    <h1>Dashboard</h1>
   </div>
  );
};

export default Dashboard;
