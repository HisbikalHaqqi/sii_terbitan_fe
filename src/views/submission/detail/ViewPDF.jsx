import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// For loading and displaying PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ apiUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the PDF file as a Blob from the API
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(apiUrl);
        const blob = await response.blob();  // Get the response as Blob
        const url = URL.createObjectURL(blob); // Convert Blob to a URL
        setPdfUrl(url);  // Set the URL to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchPdf();
  }, [apiUrl]); // Trigger when `apiUrl` changes

  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      {loading ? (
        <p>Loading PDF...</p>
      ) : (
        <Document
          file={pdfUrl} // Use the Blob URL here
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {/* Render the current page */}
          <Page pageNumber={pageNumber} />
        </Document>
      )}

      {/* Pagination controls */}
      <div>
        <button 
          disabled={pageNumber <= 1} 
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button 
          disabled={pageNumber >= numPages} 
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
