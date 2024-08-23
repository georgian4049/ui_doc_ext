import React, { useState } from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon, DocumentScanner as DocumentScannerIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import ResultsTable from "./ResultsTable";
import {
  FormContainer,
  ResultsContainer,
  UploadButton,
  SubmitButton,
  IconButtonStyled,
  StyledTextField,
  MainHeader,
  MainContainer,
  DividerStyled,
  ClearButton
} from "./styles";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";



const DataExtractor = () => {
  const [projectName, setProjectName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [labels, setLabels] = useState([""]);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLabelChange = (index, event) => {
    const newLabels = [...labels];
    newLabels[index] = event.target.value;
    setLabels(newLabels);
  };

  const handleAddLabel = () => {
    setLabels([...labels, ""]);
  };

  const handleRemoveLabel = (index) => {
    if (labels.length > 1) {
      const newLabels = labels.filter((_, i) => i !== index);
      setLabels(newLabels);
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("file", image);
    labels.forEach((label, index) => {
      formData.append(`labels[${index}]`, label);
    });

    setLoading(true);
    try {
      const response = await fetch("https://api-doc-ext.onrender.com/api/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setResultData(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    setProjectName("");
    setImage(null);
    setImagePreviewUrl(null);
    setLabels([""]);
    setResultData(null);
  };


  return (
    <MainContainer>
      <MainHeader>
        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%", flexDirection:"row"}}>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <DocumentScannerIcon fontSize="large" />
            <Typography variant="h5" sx={{ marginLeft: 2 }}>Data Extractor</Typography>
          </Box>
          <Box>
        
        <LanguageSwitcher />
        </Box>
        </Box>
      </MainHeader>
      <DividerStyled />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          gap: 2,
          padding: 2
        }}
      >
        <FormContainer>
          <Typography variant="h6" gutterBottom>
            {t("form")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label={t("projectName")}
              required
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <UploadButton variant="contained" component="label" endIcon={<CloudUploadIcon />}>
              {t("uploadFile")}
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            </UploadButton>
            {imagePreviewUrl && (
              <Box sx={{ marginBottom: 2 }}>
                <img
                  src={imagePreviewUrl}
                  alt="Uploaded Preview"
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            )}
            {labels.map((label, index) => (
              <Grid container spacing={1} key={index} alignItems="center">
                <Grid item xs={10}>
                  <StyledTextField
                    fullWidth
                    required
                    label={t("label")}
                    variant="outlined"
                    value={label}
                    onChange={(e) => handleLabelChange(index, e)}
                  />
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButtonStyled
                    colorType="error"
                    onClick={() => handleRemoveLabel(index)}
                    disabled={labels.length === 1}
                  >
                    <RemoveIcon />
                  </IconButtonStyled>
                  <IconButtonStyled
                    colorType="primary"
                    onClick={handleAddLabel}
                  >
                    <AddIcon />
                  </IconButtonStyled>
                </Grid>
              </Grid>
            ))}
          

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, gap: 2 }}>
            <ClearButton
              variant="outlined"
              onClick={handleClear}
            >
              {t("clear")}
            </ClearButton>
            <SubmitButton
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!projectName || !image || labels.some(label => !label)}
            >
              {t("submit")}
            </SubmitButton>
          </Box>
          </form>
        </FormContainer>
        <ResultsContainer>
          <Typography variant="h6" gutterBottom>
            {t("results")}
          </Typography>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : resultData ? (
            <ResultsTable data={resultData} />
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              sx={{ marginTop: 20 }}
            >
              {t("noResults")}
            </Typography>
          )}
        </ResultsContainer>
      </Box>
    </MainContainer>
  );
};

export default DataExtractor;
