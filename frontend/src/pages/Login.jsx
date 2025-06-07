// import react components
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import grommet components
import { Box, Button, Card, CardHeader, CardBody, CardFooter } from "grommet";

// begin login setup
export default function Login() {
  // set up redirect logic and saving token
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    // if token is found then save it to storage
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/dashboard");
      navigate("/dashboard");
    }
  }, []);
  return (
    <Box
      fill="vertical"
      height={{ min: "100vh" }}
      width="100vw"
      background="primaryBackground"
      overflow="hidden"
      align="center"
      justify="center">
      <Box
        width="medium"
        align="center"
        background="primaryBackground"
        round="small">
        <Card
          width="medium"
          background="primaryBackground"
          round="small"
          elevation="small"
          border={{ color: "attnAccentShadow", size: "1px" }}>
          <CardHeader
            justify="center"
            align="center"
            height="xsmall"
            direction="column"
            style={{
              fontWeight: "800",
              fontSize: "1.2rem",
            }}>
            playlister.
          </CardHeader>
          <CardBody align="center" justify="center">
            <p
              style={{
                color: "#3effa8",
                fontStyle: "italic",
                marginTop: "-25px",
                fontSize: ".9rem",
              }}>
              find, create, and share your spotify playlists.
            </p>
            login with spotify to get started!
          </CardBody>
          <CardFooter
            justify="center"
            width="100%"
            align="center"
            height="xsmall"
            pad={{ bottom: "small" }}>
            <Button
              label="log in"
              primary
              onClick={() => {
                window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/auth/login`;
              }}
            />
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
}
