export default () => ({
  card: {
    width: 350,
    height: 400,
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  priceContainer: {
    marginRight: "auto",
  },
  imageContainer: {
    width: "100%",
    flexGrow: "1",
  },
});
