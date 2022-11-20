export const ordersColumns = [
  { field: "idUser", headerName: "ID User", width: 220 },
  {
    field: "fullname",
    headerName: "Name",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "total",
    headerName: "Total (VNĐ)",
    width: 120,
  },
  {
    field: "delivery",
    headerName: "Delivery",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
  },
];

export const ordersColumnsHome = [
  { field: "idUser", headerName: "ID User", width: 230 },
  {
    field: "fullname",
    headerName: "Name",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "address",
    headerName: "Address",
    width: 180,
  },
  {
    field: "total",
    headerName: "Total (VNĐ)",
    width: 120,
  },
  {
    field: "delivery",
    headerName: "Delivery",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
];

export const usersColumns = [
  { field: "_id", headerName: "ID User", width: 250 },
  {
    field: "fullname",
    headerName: "Full Name",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
  {
    field: "role",
    headerName: "Role",
    width: 110,
  },
];

export const productsColumns = [
  { field: "_id", headerName: "ID Product", width: 240 },
  {
    field: "name",
    headerName: "Name",
    width: 380,
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
  },
  {
    field: "imgUrl",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.imgUrl[0].url}
            alt="Image"
            width="100px"
            height="100px"
          />
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 130,
  },
];
