import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    
    const {id, name, direccion, rfc, curp} = req.body;

    try {

        if(req.method === 'POST'){
            await prisma.employee.create({
                data:{
                    name,
                    direccion,
                    rfc,
                    curp
                }
            })
        res.status(200).json({message:'Employee registered succesfully'});
        }
    } catch (error) {
        console.log('Error');
    }

}