import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
} from "@mui/material";
import { categories } from "../../constants/data.js";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  background: #e3e2da;
`;
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
`;
const Categories = () => {
  return (
    <>
      <StyledButton variant="contained">Create Blog</StyledButton>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>All Categories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};
export default Categories;
