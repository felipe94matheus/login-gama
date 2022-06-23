import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Dashboard: React.FC = () => {
    const users = useSelector((state: RootState) => state.usersSlice);
  return (
    <h1>{JSON.stringify(users, null, 2)}</h1>
  );
}

export default Dashboard;