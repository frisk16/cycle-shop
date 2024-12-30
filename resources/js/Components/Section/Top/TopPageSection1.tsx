import { FC, memo } from "react";
import Grid from "../../Grid/Grid";
import GridItem from "../../Grid/GridItem";
import PopSection from "./PopSection";
import RecommendSection from "./RecommendSection";

const TopPageSection1: FC = memo(() => {
    return (
        <section>
            <Grid templateCols="repeat(2, 1fr)" gap={{ base: "16px", lg: "64px" }}>

                <GridItem>
                    <PopSection />
                </GridItem>

                <GridItem>
                    <RecommendSection />
                </GridItem>

            </Grid>
        </section>
    )
});

export default TopPageSection1;
