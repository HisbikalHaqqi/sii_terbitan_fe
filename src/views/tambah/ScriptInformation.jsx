"use client";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// Third-party Imports
import { useFormState } from "react-dom";

// Style Imports
import { submitScript } from "@/libs/actions";
import { SubmitButton } from "@/libs/button";
import "@/libs/styles/tiptapEditor.css";
import { TextareaAutosize, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Third-party Imports
import { useDropzone } from "react-dropzone";

// Component Imports
import Link from "@components/Link";
import CustomAvatar from "@core/components/mui/Avatar";

// Styled Component Imports
import AppReactDropzone from "@/libs/styles/AppReactDropzone";

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  "& .dropzone": {
    minHeight: "unset",
    padding: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(5),
    },
    "&+.MuiList-root .MuiListItem-root .file-name": {
      fontWeight: theme.typography.body1.fontWeight,
    },
  },
}));

const ScriptInformation = () => {
  const [files, setFiles] = useState([]);
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");

  const [formValues, setFormValues] = useState({
    startPage: "",
    endPage: "",
  });
  const [state, formAction] = useFormState(submitScript, null);
  const [error, setError] = useState("");

  const theme = useTheme();

  const refs = {
    title: useRef(null),
    authors: useRef(null),
    co_authors: useRef(null),
    publication_date: useRef(null),
    journal: useRef(null),
    volume: useRef(null),
    issue: useRef(null),
    start_page: useRef(null),
    end_page: useRef(null),
    doi: useRef(null),
    keywords: useRef(null),
    research_type: useRef(null),
    funding_info: useRef(null),
    affiliations: useRef(null),
    full_text_link: useRef(null),
    language: useRef(null),
    license: useRef(null),
    notes: useRef(null),
    abstract: useRef(null),
    attachment: useRef(null),
  };

  //============upload
  // Hooks
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     setFiles(acceptedFiles.map((file) => Object.assign(file)));
  //   },
  // });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: (acceptedFiles) => {
      setError(""); // Clear error message
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected: () => {
      setError("Only .pdf and .docx files are allowed.");
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("pdf")) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file)}
        />
      );
    } else {
      return <i className="ri-file-text-line" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);

    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <ListItem key={file.name} className="pis-4 plb-3">
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name font-medium" color="text.primary">
            {file.name}
          </Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className="ri-close-line text-xl" />
      </IconButton>
    </ListItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("attachments", file);
    });

    console.log("fomr data", formData);

    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to upload files");
    //   }

    //   alert("Files uploaded successfully!");
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    // }
  };

  //===================upload

  useEffect(() => {
    if (state?.error) {
      for (const [key, ref] of Object.entries(refs)) {
        if (state.error[key]) {
          ref.current?.focus();
          break;
        }
      }
    }
  }, [state?.error]);

  console.log("error", state?.error);

  return (
    <form
      noValidate
      autoComplete="off"
      className="flex flex-col gap-5"
      action={formAction}
      encType="multipart/form-data"
    >
      <Card>
        <CardHeader title="Paper Information" />
        <CardContent>
          <Grid container spacing={5} className="mbe-5">
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Title"
                name="title"
                placeholder="Atomic Habit"
                error={!!state?.error?.title}
                helperText={state?.error?.title}
                inputRef={refs.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Authors"
                name="authors"
                placeholder="Jhon Doe"
                error={!!state?.error?.authors}
                helperText={state?.error?.authors}
                inputRef={refs.authors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Co-Authors"
                name="co_authors"
                placeholder="David"
                error={!!state?.error?.co_authors}
                helperText={state?.error?.co_authors}
                inputRef={refs.co_authors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                type="date"
                label="Publication Date"
                name="publication_date"
                placeholder="01-01-2024"
                InputLabelProps={{ shrink: true }}
                error={!!state?.error?.publication_date}
                helperText={state?.error?.publication_date}
                inputRef={refs.publication_date}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Journal"
                name="journal"
                placeholder="My Journal"
                error={!!state?.error?.journal}
                helperText={state?.error?.journal}
                inputRef={refs.journal}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Volume"
                name="volume"
                placeholder="Jumlah volume"
                type="text"
                value={volume} // Pastikan menggunakan state `volume` sebagai nilai
                onChange={(e) => {
                  const value = e.target.value;
                  // Periksa apakah nilai hanya angka dan tidak negatif
                  if (/^\d*$/.test(value) && value !== "") {
                    setVolume(parseInt(value, 10));
                  } else if (value === "") {
                    setVolume(""); // Mengizinkan pengosongan input
                  }
                }}
                error={!!state?.error?.volume}
                helperText={state?.error?.volume}
                inputRef={refs.volume}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Issue"
                name="issue"
                placeholder="Jumlah issue"
                type="text"
                value={issue} // Pastikan menggunakan state `volume` sebagai nilai
                onChange={(e) => {
                  const value = e.target.value;
                  // Periksa apakah nilai hanya angka dan tidak negatif
                  if (/^\d*$/.test(value) && value !== "") {
                    setIssue(parseInt(value, 10));
                  } else if (value === "") {
                    setIssue(""); // Mengizinkan pengosongan input
                  }
                }}
                error={!!state?.error?.issue}
                helperText={state?.error?.issue}
                inputRef={refs.issue}
              />
            </Grid>

            <Grid container item xs={12} md={6} spacing={5}>
              <Grid item xs={6}>
                <TextField
                  label="Start Page"
                  name="start_page"
                  type="text"
                  value={startPage}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*$/.test(value) && value !== "") {
                      setStartPage(parseInt(value, 10));
                    } else if (value === "") {
                      setStartPage("");
                    }
                  }}
                  fullWidth
                  error={!!state?.error?.start_page}
                  helperText={state?.error?.start_page}
                  inputRef={refs.start_page}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Page"
                  name="end_page"
                  type="text"
                  value={endPage}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*$/.test(value) && value !== "") {
                      setEndPage(parseInt(value, 10));
                    } else if (value === "") {
                      setEndPage("");
                    }
                  }}
                  fullWidth
                  error={!!state?.error?.end_page}
                  helperText={state?.error?.end_page}
                  inputRef={refs.end_page}
                />
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Doi"
                name="doi"
                placeholder="10.1000/sample.doi Update"
                error={!!state?.error?.doi}
                helperText={state?.error?.doi}
                inputRef={refs.doi}
              />
            </Grid> */}

            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Keywords"
                name="keywords"
                placeholder=""
                error={!!state?.error?.keywords}
                helperText={state?.error?.keywords}
                inputRef={refs.keywords}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Research Type"
                name="research_type"
                placeholder=""
                error={!!state?.error?.research_type}
                helperText={state?.error?.research_type}
                inputRef={refs.research_type}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Funding Info"
                name="funding_info"
                placeholder=""
                error={!!state?.error?.funding_info}
                helperText={state?.error?.funding_info}
                inputRef={refs.funding_info}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Affiliations"
                name="affiliations"
                placeholder=""
                error={!!state?.error?.affiliations}
                helperText={state?.error?.affiliations}
                inputRef={refs.affiliations}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Full Text Link"
                name="full_text_link"
                placeholder=""
                error={!!state?.error?.full_text_link}
                helperText={state?.error?.full_text_link}
                inputRef={refs.full_text_link}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="Language"
                name="language"
                placeholder="Indonesian"
                error={!!state?.error?.language}
                helperText={state?.error?.language}
                inputRef={refs.language}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                fullWidth
                label="License"
                name="license"
                placeholder="Input Your License"
                error={!!state?.error?.license}
                helperText={state?.error?.license}
                inputRef={refs.license}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextareaAutosize
                minRows={3}
                maxRows={4}
                autoFocus
                label="Notes"
                name="notes"
                placeholder="Add notes here"
                aria-hidden="false"
                style={{
                  width: "100%",
                  padding: "4px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  borderColor: "#ccc",
                  border: `1px solid ${state?.error?.notes ? theme.palette.error.main : theme.palette.divider}`,
                  backgroundColor: "transparent",
                  color: theme.palette.text.primary,
                }}
                error={!!state?.error?.notes}
                helperText={state?.error?.notes}
                inputRef={refs.notes}
              />

              {state?.error?.notes && (
                <div
                  style={{
                    color: theme.palette.error.main,
                    fontSize: "0.875rem",
                    marginTop: "2px",
                  }}
                >
                  {state.error.notes}
                </div>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextareaAutosize
                minRows={3}
                maxRows={4}
                autoFocus
                label="Abstract"
                name="abstract"
                placeholder="Add abstract here"
                aria-hidden="false"
                style={{
                  width: "100%",
                  padding: "4px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  borderColor: "#ccc",
                  border: `1px solid ${state?.error?.abstract ? theme.palette.error.main : theme.palette.divider}`,
                  backgroundColor: "transparent",
                  color: theme.palette.text.primary,
                }}
                error={!!state?.error?.abstract}
                helperText={state?.error?.abstract}
                inputRef={refs.abstract}
              />

              {state?.error?.abstract && (
                <div
                  style={{
                    color: theme.palette.error.main,
                    fontSize: "0.875rem",
                    marginTop: "2px",
                  }}
                >
                  {state.error.abstract}
                </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dropzone>
        <Card>
          <CardHeader
            title="Paper File"
            sx={{ "& .MuiCardHeader-action": { alignSelf: "center" } }}
          />

          <CardContent>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} name="attachments" />
              <div className="flex items-center flex-col gap-2 text-center">
                <CustomAvatar variant="rounded" skin="light" color="secondary">
                  <i className="ri-upload-2-line" />
                </CustomAvatar>
                <Typography variant="h4">
                  Drag and Drop Your File Paper Here.
                </Typography>
                <Typography color="text.disabled">or</Typography>
                <Button variant="outlined" size="small">
                  Browse File
                </Button>
              </div>
            </div>
            {files.length ? (
              <>
                <List>{fileList}</List>
                {/* <div className="buttons">
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleRemoveAllFiles}
                  >
                    Remove All
                  </Button>
                  <Button variant="contained" onClick={handleSubmit}>
                    Upload Files
                  </Button>
                </div> */}
              </>
            ) : null}
            {error && (
              <Typography
                style={{
                  color: theme.palette.error.main,
                  fontSize: "0.875rem",
                  marginTop: "8px",
                }}
              >
                {error}
              </Typography>
            )}
            {state?.error?.attachment && (
              <Typography
                style={{
                  color: theme.palette.error.main,
                  fontSize: "0.875rem",
                  marginTop: "8px",
                }}
              >
                {state.error.attachment}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Dropzone>

      <Grid container xs={12}>
        <SubmitButton />
      </Grid>
    </form>
  );
};

export default ScriptInformation;
