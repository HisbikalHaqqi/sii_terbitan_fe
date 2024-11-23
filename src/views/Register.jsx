"use client";

// React Imports
import { useState } from "react";

// Next Imports
import Link from "next/link";
import { useParams } from "next/navigation";

// MUI Imports
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Third-party Imports
import classnames from "classnames";

// Component Imports
import Illustrations from "@components/Illustrations";
import Logo from "@components/layout/shared/Logo";

// Hook Imports
import { useImageVariant } from "@core/hooks/useImageVariant";
import { useSettings } from "@core/hooks/useSettings";

// Util Imports
import { gender } from "@/data/static";
import { signUpCredentials } from "@/libs/actions";
import { RegisterButton } from "@/libs/button";
import { getLocalizedUrl } from "@/utils/i18n";
import { Alert, Autocomplete } from "@mui/material";
import { useFormState } from "react-dom";

const RegisterV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [state, formAction] = useFormState(signUpCredentials, null);

  // Vars
  const darkImg = "/images/pages/auth-v2-mask-dark.png";
  const lightImg = "/images/pages/auth-v2-mask-light.png";
  const darkIllustration = "/images/illustrations/auth/v2-register-dark.png";
  const lightIllustration = "/images/illustrations/auth/v2-register-light.png";
  const borderedDarkIllustration =
    "/images/illustrations/auth/v2-register-dark-border.png";
  const borderedLightIllustration =
    "/images/illustrations/auth/v2-register-light-border.png";

  // Hooks
  const { lang: locale } = useParams();
  const authBackground = useImageVariant(mode, lightImg, darkImg);
  const { settings } = useSettings();

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  );

  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setIsConfirmPasswordShown((show) => !show);

  return (
    <div className="flex bs-full justify-center">
      <div
        className={classnames(
          "flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden",
          {
            "border-ie": settings.skin === "bordered",
          }
        )}
      >
        <div className="plb-12 pis-12">
          <img
            src={characterIllustration}
            alt="character-illustration"
            className="max-bs-[500px] max-is-full bs-auto"
          />
        </div>
        <Illustrations
          image1={{ src: "/images/illustrations/objects/tree-3.png" }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className="flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]">
        <Link
          href={getLocalizedUrl("/", locale)}
          className="absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]"
        >
          <Logo />
        </Link>

        <div className="flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]">
          <div>
            <Typography variant="h4">Create your an account🚀</Typography>
            <Typography className="mbe-1">
              Make your app management easy and fun!
            </Typography>
          </div>
          {state?.message ? (
            <Alert icon={false} className="bg-red-100">
              <Typography variant="body2" color="red">
                Message: <span className="font-medium">{state?.message}</span>
              </Typography>
            </Alert>
          ) : null}
          <form
            noValidate
            autoComplete="off"
            className="flex flex-col gap-5"
            action={formAction}
          >
            <TextField
              autoFocus
              fullWidth
              label="Fullname"
              name="full_name"
              error={state?.error?.full_name}
              helperText={state?.error?.full_name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              error={state?.error?.email}
              helperText={state?.error?.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={isPasswordShown ? "text" : "password"}
              error={state?.error?.password}
              helperText={state?.error?.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <i
                        className={
                          isPasswordShown ? "ri-eye-off-line" : "ri-eye-line"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              error={state?.error?.confirmPassword}
              helperText={state?.error?.confirmPassword}
              type={isConfirmPasswordShown ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <i
                        className={
                          isConfirmPasswordShown
                            ? "ri-eye-off-line"
                            : "ri-eye-line"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="gender"
              options={gender}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(options, value) =>
                options.value === value?.value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="gender"
                  label="Gender"
                  error={!!state?.error?.gender}
                  helperText={state?.error?.gender}
                />
              )}
            />

            <div className="flex justify-between items-center gap-3">
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link
                      className="text-primary"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
            </div>
            <RegisterButton />
            <div className="flex justify-center items-center flex-wrap gap-2">
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href="/login" color="primary">
                Sign in instead
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterV2;
