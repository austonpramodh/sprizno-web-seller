import { NextWeek } from "@material-ui/icons";
import idConstants from "../../Utils/Constants/idConstants";

export default [
  {
    name: "Catalog",
    icon: NextWeek,
    id: idConstants.CATALOG,
    childItems: [
      {
        name: "List Products",
        id: idConstants.LIST_PRODUCTS,
      },
      {
        name: "Add Product",
        id: idConstants.ADD_PRODUCT,
      },
    ],
  },
];
