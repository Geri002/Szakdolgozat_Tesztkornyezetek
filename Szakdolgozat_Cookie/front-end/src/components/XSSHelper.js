import React,  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default (props) => {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    console.log(code)
  })


  return(
    <>
    <h2>XSS Helper aktív</h2>
    <div dangerouslySetInnerHTML={{__html: code}} />
    </>
  );
}