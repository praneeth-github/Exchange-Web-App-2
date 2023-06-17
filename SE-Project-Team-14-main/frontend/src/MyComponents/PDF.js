import React from 'react';
import { Document, Page } from 'react-pdf';
import { useLocation } from "react-router-dom";


export default function PDF() {
    let location = useLocation
  return (
    <Document file={location.state}>
      <Page pageNumber={1} />
    </Document>
  );
}