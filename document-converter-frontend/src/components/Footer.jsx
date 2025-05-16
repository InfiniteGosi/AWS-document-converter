import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p><strong>Made by Ho Nguyen An Khang</strong></p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "4rem",
    padding: "1rem 0",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
    backgroundColor: "#f9f9f9",
    borderTop: "1px solid #eee",
  },
};

export default Footer;
