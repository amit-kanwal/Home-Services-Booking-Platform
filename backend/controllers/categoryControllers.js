import prisma from "../prisma/prismaClient.js"

export const getCategories = async (req, res)=>{
    res.set("Cache-Control", "no-store")
    const categories = await prisma.serviceCategory.findMany({
    orderBy: {
      id: "asc",
    },
  });

    res.json(categories);
}

export const createCategory = async(req, res) =>{
    const {name, icon, color} = res.body;

    const category = await prisma.serviceCategory.create({
        data : {name, icon, color},
    })

    res.json(category);
}