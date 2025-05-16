import React, { useState, useEffect } from "react";
import DragAndDropArea from "./DragAndDropArea";
import UploadButton from "./UploadButton";
import StatusMessage from "./StatusMessage";
import DownloadList from "./DownloadList";

const UploadDocPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState([]);

  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      window.addEventListener(eventName, preventDefaults, false);
    });
    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        window.removeEventListener(eventName, preventDefaults, false);
      });
    };
  }, []);

  const handleFiles = (fileList) => {
    const selectedFiles = Array.from(fileList);
    const docxFiles = selectedFiles.filter((f) => f.name.endsWith(".docx"));
    if (docxFiles.length === 0) {
      setFiles([]);
      setUploadStatus("❌ Please select only .docx files.");
    } else {
      setFiles(docxFiles);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus("⚠️ No files selected.");
      return;
    }
    setUploadStatus("🚀 Uploading and converting... <br/><img src='https://i.gifer.com/ZZ5H.gif' width='80' alt='loading'/>");

    const results = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://hss1sbqy22.execute-api.eu-west-1.amazonaws.com/dev/convert", { // this is the api of AWS lambda gateway (can be changed for local testing)
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.url) {
          results.push({ url: data.url, name: file.name.replace(/\.docx$/, ".pdf") });
        } else {
          console.error(`Failed to upload ${file.name}:`, data.message || "Unknown error");
        }
      } catch (error) {
        console.error(`Fetch error for ${file.name}:`, error);
      }
    }
    if (results.length > 0) {
      setDownloadLinks(results);
      setUploadStatus(`✅ Converted ${results.length} file(s)! 🎉`);
      setFiles([]);
    } else {
      setUploadStatus("❌ Failed to convert files.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 Upload Word Documents (.docx)</h2>

      <DragAndDropArea
        files={files}
        setFiles={setFiles}
        dragging={dragging}
        setDragging={setDragging}
        handleFiles={handleFiles}
      />

      <UploadButton handleUpload={handleUpload} />

      <StatusMessage uploadStatus={uploadStatus} />

      {downloadLinks.length > 0 && <DownloadList downloadLinks={downloadLinks} />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    marginBottom: "2rem",
    color: "#4F46E5",
    fontWeight: "bold",
    fontSize: "1.8rem",
  },
};

export default UploadDocPage;
