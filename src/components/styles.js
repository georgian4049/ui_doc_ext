import { styled } from "@mui/material/styles";
import { Box, Button, TextField, IconButton, Divider } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#f0f4f8", 
}));

export const MainHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(to top, #003d79, #0073e6)", 
  padding: theme.spacing(2),
  color: "#fff",
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

export const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: "#007bff",
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",  
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: "#ffffff", // White background for the form
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "visible", 
  alignItems: "center",
  boxSizing: "border-box",
}));

export const ResultsContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: "#f5f5f5", 
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  alignItems: "center",
  boxSizing: "border-box",
  overflow: "auto",
  minHeight: "300px", 
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: "#007bff",
  color: "#fff",
  '&:hover': {
    backgroundColor: "#0056b3",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  width: "50%",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const IconButtonStyled = styled(IconButton)(({ colorType }) => ({
  color: colorType === 'error' ? '#f44336' : '#1976d2',
}));

export const ClearButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderColor: "#d9534f",
  width: "50%",
  color: "#d9534f",
  '&:hover': {
    borderColor: "#c9302c",
    color: "#c9302c",
  },
}));
