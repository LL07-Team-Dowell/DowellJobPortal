import React from 'react';
import AppliedHeader from '../AppliedHeader/AppliedHeader';
import CardTile from '../cardTile/CardTile';
import './Active.css';

function Active() {
  return (
    <>
        <AppliedHeader title="Python Programmer" sub_title="20 candidates applied for the role"/>
        <div className="CardTile__row">
        <CardTile applicant_name='Faizan' experience='2' applied_date='10th April' skills='Python'/>
        <CardTile applicant_name='Faizan' experience='2' applied_date='10th April' skills='Python'/>
        <CardTile applicant_name='Faizan' experience='2' applied_date='10th April' skills='Python'/>
        <CardTile applicant_name='Faizan' experience='2' applied_date='10th April' skills='Python'/>
        <CardTile applicant_name='Faizan' experience='2' applied_date='10th April' skills='Python'/>
        <CardTile applicant_name='Faizan' experience='2' applied_date='10th April' skills='Python'/>




        </div>
    </>
  )
}

export default Active