import Banner from "../../banner/Banner";
import Categories from "./Categories";
import { Grid } from "@mui/material";
import BlogCard from "./../../blogcard/BlogCard";
const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid item xs={12} sm={10} lg={10}>
          <h1>Posts</h1>
          <BlogCard
            title="Coding Practices"
            img="https://149695847.v2.pressablecdn.com/wp-content/uploads/2019/06/chris-ried-512801-unsplash.jpg"
          />

          <BlogCard
            title="Machine Learning"
            img="https://cdn-gcp.new.marutitech.com/robot_humanoid_using_tablet_computer_big_data_analytic_1_94eab7101e.jpg"
          />

          <BlogCard
            title="Cyber Security"
            img="https://extension.harvard.edu/wp-content/uploads/sites/8/2021/04/cybersecurity.jpg"
          />

          <BlogCard
            title="Blockchain"
            img="https://online.stanford.edu/sites/default/files/styles/embedded_large/public/2019-04/blockchain-and-cryptocurrency-regulating-innovation_SOE-XCS0001.jpg?itok=KEOh4kn9"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
