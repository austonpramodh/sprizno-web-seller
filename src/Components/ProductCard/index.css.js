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
    padding: "16px",
  },
  cardHeaderinnerDiv: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    // justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "0px 8px",
  },
  priceContainer: {
    marginRight: "auto",
  },
  imageContainer: {
    width: "100%",
    flexGrow: "1",
    maxHeight: "300px",
    overflow: "hidden auto",
  },
  descriptionContainer: {
    maxHeight: "58px",
    overflow: "hidden auto",
  },
  stockCircularBar: {
    position: "absolute",
    right: "0",
  },
  stockLeftTextContainer: {
    position: "absolute",
    right: "0px",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
  },
  actionsContainer: {
    display: "flex",
    padding: "8px 0px",
    alignItems: "center",
    width: "100%",
  },
});
