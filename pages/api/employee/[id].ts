import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { useRouter } from 'next/router';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    
    const employeeId = req.query.id;
    const {name, direccion, rfc, curp} = req.body; // Still not sure if I'll go with this approach

    if(req.method === 'DELETE'){
        const employee = await prisma.employee.delete({
            where:{
                id: Number(employeeId)
            }
        })
        res.json(employee);
    }else if(req.method === 'PUT'){
        const updateEmployee = await prisma.employee.update({
            where: {
                id: Number(employeeId)
            },
            // Figure out what to do in here
            // Se me ocurre obtener los datos de req.body, something like: const {name, direccion, rfc, curp} = req.body;  
            data: {
              name: name,
              direccion: direccion,
              rfc: rfc,
              curp: curp
            },
          })

          res.json(updateEmployee)
    }else{
        console.log('Employee could not be deleted')
    }
   
}