import React from "react";

const DragAndDropArea = ({ files, setFiles, dragging, setDragging, handleFiles }) => {
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); handleFiles(e.dataTransfer.files); };
  const handleFileChange = (e) => handleFiles(e.target.files);

  return (
    <div
      style={{
        ...styles.dropArea,
        borderColor: dragging ? "#6366f1" : "#888",
        background: dragging ? "linear-gradient(135deg, #c7d2fe 0%, #e0e7ff 100%)" : "#fafafa",
        animation: dragging ? "pulse 1s infinite" : "none",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".docx"
        multiple
        onChange={handleFileChange}
        style={styles.fileInput}
        id="doc-upload"
      />
      <label htmlFor="doc-upload" style={styles.label}>
        {files.length > 0
          ? `${files.length} file(s) selected:\n` + files.map((f) => f.name).join(", ")
          : "👉 Click or drag your .docx files here"}
      </label>
    </div>
  );
};

const styles = {
  dropArea: {
    border: "2px dashed #888",
    borderRadius: "12px",
    padding: "2rem",
    cursor: "pointer",
    marginBottom: "1.5rem",
    transition: "all 0.4s ease",
    whiteSpace: "pre-line",
  },
  fileInput: {
    display: "none",
  },
  label: {
    display: "block",
    fontSize: "1.1rem",
    color: "#555",
  },
};

export default DragAndDropArea;
