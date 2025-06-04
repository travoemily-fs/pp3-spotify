// import grommet components
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormField,
  TextInput,
} from "grommet";

// begin login setup
export default function Login() {
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
          <CardHeader justify="center" align="center" height="xsmall">
            login
          </CardHeader>
          <CardBody align="center" justify="center">
            <Form justify="center">
              <FormField
                name="email"
                htmlFor="text-input-id"
                label="email"
                className="formField"
                width="small">
                <TextInput
                  name="email"
                  placeholder="you@you.com"
                  focus="attnAccent"
                />
              </FormField>
              <FormField
                name="password"
                htmlFor="text-input-id"
                label="password"
                width="small"
                justify="center"
                align="center">
                <TextInput
                  name="password"
                  placeholder="*****"
                  type="password"
                  focus="attnAccent"
                />
              </FormField>
            </Form>
          </CardBody>
          <CardFooter
            justify="center"
            width="100%"
            align="center"
            height="xsmall"
            pad={{ bottom: "small" }}>
            <Button label="log in" primary/>
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
}
