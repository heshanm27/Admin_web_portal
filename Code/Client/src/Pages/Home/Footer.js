import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Map from "../../component/Map/Map";
import FeedBackForm from "./FeedBackForm";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "50vh",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
    maxWidth: "100%",
    backgroundColor: "#212121",
    color: "white",
  },
  container: {
    width: "100%",
    minHeight: "25vh",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: "primary",
  },
}));

const FooterPage = () => {
  const classes = userStyle();
  return (
    <>
      <footer className={classes.roots}>
        <Box className={classes.container} color="white" pt={{ xs: 8, sm: 10 }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box borderBottom={1} pb={{ xs: 1, sm: 2 }}>
                  <Typography> About</Typography>
                </Box>
                <Box pt={{ xs: 2, sm: 3 }}>
                  <Typography variant="body2" component="p" align="justify">
                    {" "}
                    Established in 1997, our founding principle was to provide
                    the automobile owners of Sri Lanka with the finest total
                    auto care solutions on the market. To this day, over two
                    decades later, this remains our core objective and, as a
                    result, Auto Miraj has emerged as the island’s leader in
                    automobile services. At the heart of each and every one of
                    our employee’s work ethic is a customer-centric approach
                    dedicated to delivering our clients with the best car care
                    solutions. It is this commitment that has facilitated our
                    growth – resulting in Auto Miraj being recognized as a
                    leading car care solutions and car maintenance service
                    provider with the largest customer base to date. We are Sri
                    Lanka’s best automobile care specialists – with state-of-
                    the-art service centers located across the country. Each
                    center is extremely committed to providing our clients with
                    the very best services.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box borderBottom={1} pb={{ xs: 1, sm: 2 }} marginBottom={2}>
                  <Typography>Feedback</Typography>
                </Box>
                {/* <Map /> */}
                <FeedBackForm />
              </Grid>

              {/* Scocial media*/}
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1} pb={{ xs: 1, sm: 2 }}>
                  <Typography>Social Media </Typography>
                </Box>
                <Box pt={{ xs: 2, sm: 3 }}>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      size="medium"
                    >
                      <Facebook color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton color="secondary" aria-label="add an alarm">
                      <LinkedIn color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton color="secondary" aria-label="add an alarm">
                      <Instagram color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton color="secondary" aria-label="add an alarm">
                      <Twitter color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Box
              textAlign="center"
              pt={{ xs: 5, sm: 10 }}
              pb={{ xs: 5, sm: 4 }}
            >
              RosCard &reg; {new Date().getFullYear()}
            </Box>
          </Container>
        </Box>
      </footer>
    </>
  );
};

export default FooterPage;
