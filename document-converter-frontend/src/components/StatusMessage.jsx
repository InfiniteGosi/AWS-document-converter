const StatusMessage = ({ uploadStatus }) => {
  return (
    <p style={styles.status} dangerouslySetInnerHTML={{ __html: uploadStatus }} />
  );
};

const styles = {
  status: {
    marginTop: "1.5rem",
    fontStyle: "italic",
    color: "#333",
    minHeight: "2rem",
  },
};

export default StatusMessage;
