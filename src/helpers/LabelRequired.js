export const labelRequired = (data) => {
  return (
    <span>
      {data}
      <span style={{ color: "red" }}> *</span>
    </span>
  );
};
