import React from 'react';
import Table from '../Table';
import Head from './Head';
import IncomeBody from './IncomeBody.container';
import OutgoBody from './OutgoBody.container';
import './index.css';

const BudgetTable = () => (
  <Table>
    <Head />
    <IncomeBody />
    <OutgoBody />
  </Table>
);

export default BudgetTable;
