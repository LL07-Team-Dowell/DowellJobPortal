import React from 'react';
import AppliedHeader from '../../AppliedHeader/AppliedHeader';
import CardTile from '../../cardTile/CardTile';

function Selected() {
  return (
    <>
    <AppliedHeader title="Python Programmer" sub_title="10 candidates are selected for the roles"/>
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

export default Selected