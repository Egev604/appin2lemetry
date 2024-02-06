import React from 'react';
import { Box, Grid, Tabs, Tab, AppBar } from "@mui/material";
import ComputerItem from "./ComputerItem";

const computers = [
    { imageUrl: "https://iconpc.ru/wp-content/uploads/2023/03/216_1-1.png", description: "Обладай абсолютным контролем в виртуальных мирах с нашим производительным игровым системным блоком.", rating: 4 },
    { imageUrl: "https://ir-3.ozone.ru/s3/multimedia-z/c1000/6091531871.jpg", description: "Создавай, редактируй и воплощай свои творческие идеи с нашим мощным рабочим системным блоком.", rating: 5.0 },
    { imageUrl: "https://iconpc.ru/wp-content/uploads/2023/03/216_1-1.png", description: "Обладай абсолютным контролем в виртуальных мирах с нашим производительным игровым системным блоком.", rating: 4 },
    { imageUrl: "https://ir-3.ozone.ru/s3/multimedia-z/c1000/6091531871.jpg", description: "Создавай, редактируй и воплощай свои творческие идеи с нашим мощным рабочим системным блоком.", rating: 5.0 },
];

const Main = () => {
    return (
        <Box margin="20px" display="flex" justifyContent="center" alignItems="center" style={{height: "1fr"}} >
            <Grid container spacing={3} justifyContent="center">
                {computers.map((computer, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ComputerItem
                            imageUrl={computer.imageUrl}
                            description={computer.description}
                            rating={computer.rating}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default Main;