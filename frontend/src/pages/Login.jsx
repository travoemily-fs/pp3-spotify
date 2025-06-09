// import react components
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import grommet components
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from "grommet";
// import icons
import { IoSparklesSharp } from "react-icons/io5";

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
      overflow="hidden"
      align="center"
      justify="center">
      <Box
        width="medium"
        align="center"
        style={{
          background: "transparent",
        }}
        round="medium">
        <Card
          width="medium"
          style={{
            border: "1px solid rgba(29, 185, 84, 0.35)",
            background: "rgba(255, 255, 255, 0.01)",
            boxShadow:
              "inset 0 0 25px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(153, 197, 169, 0.2)",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
          round="medium"
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
              textShadow: "0px 0px 5px rgba(248, 248, 248, 0.33)",
            }}>
            playlister.
          </CardHeader>

          <CardBody align="center" justify="center">
            login with spotify to get started!
          </CardBody>

          <CardFooter
            justify="center"
            width="100%"
            align="center"
            height="xsmall"
            pad={{ bottom: "small" }}>
            <Button
              plain
              onClick={() => {
                window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/auth/login`;
              }}
              label={
                <Box direction="row" gap="xsmall" align="center">
                  <IoSparklesSharp
                    style={{ fontSize: "1.2rem", color: "#3effa8" }}
                  />
                  <Text weight="bold" color="#F8F8F8">
                    log in
                  </Text>
                </Box>
              }
              style={{
                padding: "10px 30px",
                borderRadius: "16px",
                background: "rgba(29, 185, 84, 0.06)",
                border: "1px solid rgba(29, 185, 84, 0.35)",
                color: "#F8F8F8",
                fontWeight: "600",
                fontSize: "1rem",
                letterSpacing: "0.4px",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow:
                  "0 0 10px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(153, 197, 169, 0.2)",
                transition: "all 0.25s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(.95)";
                e.currentTarget.style.boxShadow =
                  "0 0 16px rgba(29, 185, 84, 0.45), inset 0 0 10px rgba(29, 185, 84, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(153, 197, 169, 0.2)";
              }}
            />
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
}
