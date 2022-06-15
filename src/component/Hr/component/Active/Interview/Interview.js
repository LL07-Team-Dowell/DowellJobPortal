import React from 'react';
import AppliedHeader from '../../AppliedHeader/AppliedHeader';
import CardTile from '../../cardTile/CardTile';

function Interview() {
  return (
    <>
     <AppliedHeader title="Python Programmer" sub_title="8 candidates are schedule interview "/>
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

export default Interview