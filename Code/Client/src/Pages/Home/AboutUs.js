import { Container, Grid, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import { useIntersection } from "react-use";
import gear from "../../resource/img/ourservice/Icons/gear-solid.svg";
import tech from "../../resource/img/ourservice/Icons/technician-with-helmet-svgrepo-com.svg";
import money from "../../resource/img/ourservice/Icons/money-svgrepo-com.svg";
import { TweenMax, TimelineLite, Power3 } from "gsap/all";
import { makeStyles } from "@mui/styles";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "50vh",
    justifyContent: "left",
    marginBottom: "150px",
  },
  boxCard: {
    width: "350px",
    height: "180px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    padding: "20px",
    display: "flex",

    width: "100px",
    height: "100px",
  },
}));

const AboutUs = () => {
  const classes = userStyle();

  const containerRef = useRef(null);
  const tl = new TimelineLite();
  const intersection = useIntersection(containerRef, {
    root: null,
    rootMargin: "10px",
    threshold: 0.6,
  });

  const fadeIn = (element) => {
    tl.to(element, 1, {
      opacity: 1,
      y: -60,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
    console.log("In");
  };

  const fadeOut = (element) => {
    // tl.to(element, 1, {
    //   opacity: 1,
    //   ease: "power4.out",
    //   stagger: {
    //     amount: 0.3,
    //   },
    // });
    console.log("out");
  };

  intersection && intersection.intersectionRatio <= 0.6
    ? fadeOut(".fadeFirst")
    : fadeIn(".fadeFirst");

  return (
    <div className={classes.roots} id="review">
      <Container maxWidth="lg">
        <Container
          className={classes.container}
          pb={{ xs: 5, sm: 4 }}
          maxWidth="sm"
          style={{
            marginTop: "150px",
            marginLeft: "10px",
          }}
          ref={containerRef}
        >
          <Typography
            component="h1"
            variant="h2"
            align="left"
            style={{
              color: "#1976d2",
            }}
            className="fadeFirst"
          >
            WHO WE ARE
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            align="left"
            className="fadeFirst"
            color="#1976d2"
          >
            WE HAVE 25 YEARS OF
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            align="left"
            className="fadeFirst"
            color="#1976d2"
          >
            EXPERIENCE IN THIS FIELD
          </Typography>{" "}
          <Typography
            component="p"
            variant="body1"
            align="left"
            className="fadeFirst"
          >
            We are Sri Lanka’s best automobile care specialists – with state-of-
            the-art service centers located across the country. Each center is
            extremely committed to providing our clients with the very best
            services.
          </Typography>
        </Container>
        <Container
          max-width="sm"
          className="fadeFirst"
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid key="1" item xs={12} sm={6} md={4}>
              <Paper
                className={classes.boxCard}
                elevation={4}
                style={{
                  backgroundColor: "white",
                }}
              >
                <img src={tech} className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{
                    marginTop: "50px",
                    color: "#212121",
                  }}
                >
                  {" "}
                  BEST TECHNICIANS
                </Typography>
              </Paper>
            </Grid>

            <Grid key="2" item xs={12} sm={6} md={4}>
              <Paper className={classes.boxCard} elevation={4}>
                <img src={gear} className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{
                    marginTop: "50px",
                    color: "#212121",
                  }}
                >
                  {" "}
                  QUALITY SERVICE
                </Typography>
              </Paper>
            </Grid>

            <Grid item key="3" xs={12} sm={6} md={4}>
              <Paper
                className={classes.boxCard}
                elevation={4}
                style={{ backgroundColor: "white" }}
              >
                <img src={money} className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{
                    marginTop: "50px",
                    backgroundColor: "white",
                    color: "#212121",
                  }}
                >
                  {" "}
                  AFFORDABLE PRICES
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
};

export default AboutUs;
