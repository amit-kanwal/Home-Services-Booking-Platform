// import prisma from "../prisma/prismaClient.js";

// const getInformation = async (req , res) =>{
//     res.set("Cache-Control", "no-store")
//     const information = await prisma.serviceProviderInformation.findMany({
//         orderBy:{
//             id : 'asc'
//         },
//     });

//     res.json(information);
// }

// const setInformation = async (req , res) =>{
//     const {id, name, description, imageUrl, phone, email, town, city , state, country , category} = req.body;
//     const information = await prisma.serviceProviderInformation.create({
//         data: {id, name, description, imageUrl, phone, email, town, city , state, country , category}
//     });

//     res.json(information);
// }

// export {getInformation, setInformation};

