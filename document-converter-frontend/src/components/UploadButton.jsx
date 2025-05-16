const UploadButton = ({ handleUpload }) => {
  return (
    <button onClick={handleUpload} style={styles.button}>
      🚀 Upload & Convert
    </button>
  );
};

const styles = {
  button: {
    padding: "0.8rem 2rem",
    backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
};

export default UploadButton;
