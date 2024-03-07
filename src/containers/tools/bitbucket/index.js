import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { migrateScript, healthCheck } from "../../../api/accelerator";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Typography,
  Container
} from "@mui/material";

const initialFormData = {
  selectedTool: "",
  clientHost: "",
  clientUsername: "",
  clientPassword: "",
  serverHost: "",
  serverUsername: "",
  serverPassword: "",
  workspace: "",
  serviceName: "",
};

const categories = [
  { value: 'scm_migration', label: 'SCM Migration', options: ['Bitbucket', 'Github', 'GitLab', 'SVN'] },
  { value: 'artifactory_migration', label: 'Artifactory Migration', options: ['Jfrog Artifactory', 'Nexus'] },
  { value: 'pipeline_migration', label: 'Pipeline Migration', options: ['Jenkins'] },
];

const theme = createTheme({
  // Customize your theme here (e.g., colors, typography)
  palette: {
    primary: { main: "#007bff" }, // Adjust primary color
    secondary: { main: "#ffc107" }, // Adjust secondary color
  },
  typography: {
    h5: {
      fontSize: "1.5rem", // Adjust heading size
    },
  },
});

const ToolForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);


  const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToolChange = (event) => {
    setFormData({
      ...formData,
      clientHost: "",
      clientUsername: "",
      clientPassword: "",
      serverHost: "",
      serverUsername: "",
      serverPassword: "",
      // Keep workspace and serviceName (if needed)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to your API endpoint

      let payload = {
        "bitbucketserverurl": formData.serverHost,
        "bitbucketcloudurl": formData.clientHost,
        "username": formData.serverUsername,
        "password": formData.serverPassword,
        "cloudworkspace": formData.workspace,
        "cloudauthusername":formData.clientUsername,
        "cloudauthpassword": formData.clientPassword
      }
      console.log("Migration Data:", payload);
      // const response = await healthCheck();
      const response = await migrateScript(payload);
      // // Handle the API response
      console.log("API Response:", response.data);
      if (response.status === 200){
        alert('Migration done!!!')
        setFormData(initialFormData);
      }
      else{
        console.log("Error");
      }
      // Reset the form fields
      // setFormData(initialFormData);
    } catch (error) {
      // Handle API call error
      console.error("Error:", error);
    }
  };

  const checkFormValidity = () => {
    for (const key in formData) {
      if (formData[key] === '') {
        return false;
      }
    }
    return true;
  };

  // code for category....
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // setSelectedOption(''); // Reset option on category change
  };

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const selectedCategoryOptions =
    categories.find((category) => category.value === selectedCategory)?.options || [];




  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [formData]);

  // ... your API call logic ...

  return (
    <Container maxWidth="sm" justifyContent="center">
      <Grid item xs={12} sm={12} padding={4}>
        <Typography variant="h5" sx={{ mb: 2, color: '#1976D2' }}>
          Tool Migration
        </Typography>


        <form onSubmit={handleSubmit}>

          <FormControl fullWidth margin="normal">
            <Select
              labelId="category-label"
              id="category"
              value={selectedCategory}
              label="Select Category"
              onChange={handleCategoryChange}
              name="selectedCategory"
              sx={{ mb: 2 }}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>

            {selectedCategory && (
              <Select
                labelId="category-label"
                value={formData.tool}
                label="Select tool"
                onChange={handleInputChange}
                name="tool"
                disabled={!selectedCategory} // Disable option dropdown if no category selected
                sx={{ mb: 2 }}
                aria-label="Select the migration category" 
              >
                {selectedCategoryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}

            {/* actual code */}

          </FormControl>
          {formData.tool === "Bitbucket" && (
            <div>
              <TextField
                fullWidth
                label="Client Host"
                name="clientHost"
                value={formData.clientHost}
                onChange={handleInputChange}
                placeholder="e.g., https://git.altimetrik.com/bitbucket"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Client Username"
                name="clientUsername"
                value={formData.clientUsername}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Client Password"
                type="password"
                name="clientPassword"
                value={formData.clientPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Server Host"
                name="serverHost"
                value={formData.serverHost}
                placeholder="e.g., https://bitbucket.org/"
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Server Username"
                name="serverUsername"
                value={formData.serverUsername}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Server Password"
                type="password"
                name="serverPassword"
                value={formData.serverPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Workspace"
                name="workspace"
                value={formData.workspace}
                onChange={handleInputChange}
                margin="normal"
              />
            </div>
          )}

          {formData.tool === "Bitbucket" && (
            <TextField
              fullWidth
              label="Service Name"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              placeholder="e.g., BB-FULL-SC-VERSION"
              margin="normal"
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Migrate
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default ToolForm;
