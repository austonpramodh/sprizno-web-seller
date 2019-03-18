export default () => ({
  card: {
    width: 300,
    height: 400,
    display: "flex",
    flexDirection: "column",
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
  },
});
