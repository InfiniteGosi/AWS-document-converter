import React from "react";

const DownloadList = ({ downloadLinks }) => {
  return (
    <div style={styles.downloadSection}>
      <h3>📥 Download your PDFs</h3>
      <ul style={styles.downloadList}>
        {downloadLinks.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer" style={styles.downloadLink}>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  downloadSection: {
    marginTop: "2rem",
    textAlign: "left",
  },
  downloadList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  downloadLink: {
    color: "#4F46E5",
    fontWeight: "500",
    textDecoration: "underline",
  },
};

export default DownloadList;
