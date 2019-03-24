export default () => ({
  card: {
    maxWidth: 350,
    maxHeight: 450,
    minHeight: 350,
    display: "flex",
    flexDirection: "column",
    width: "90vw",
    height: "80vh",
  },
  cardHeader: {
    padding: "10px",
    display: "flex",
  },
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
    flexGrow: "1",
    display: "flex",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px",
    paddingTop: "0px",
  },
  priceContainer: {
    marginRight: "auto",
    marginLeft: "10px",
  },
  dropzoneContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    border: "1px dashed darkgray",
    margin: "10px",
    cursor: "pointer",
  },
  descriptionInput: {
    width: "100%",
  },
  stockInput: {
    width: "70px",
    marginLeft: "auto",
    // marginRight: "auto",
  },
  priceInput: {
    width: "70px",
    // marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: "auto",
  },
  categorySelector: {
    width: "85px",
    marginRight: "auto",
  },
  menuItemText: {
    fontSize: "14px",
  },
});
