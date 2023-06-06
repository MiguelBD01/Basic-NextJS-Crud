import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import ListaEmpleados from "@/components/listaEmpleados";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Employee {
  id: string;
  name: string;
  direccion: string;
  rfc: string;
  curp: string;
}

interface EmployeeProps{
  employees:{
    id: string,
    name:string,
    direccion: string,
    rfc: string,
    curp: string
  }[]
}


export default function Home(props: EmployeeProps) {

  const [name, setName] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rfc, setRfc] = useState('');
  const [curp, setCurp] = useState('');
  // Added from ChatGPT to implement update functionality
  const [editingId, setEditingId] = useState<string | null>(null);

  
  const router = useRouter();

  const refreshData = () =>{
    router.replace(router.asPath);
    setEditingId(null)
  }

  async function create(name: string, direccion: string, rfc: string, curp: string) {
    const formData = {
      name: name,
      direccion: direccion,
      rfc: rfc,
      curp: curp
    };

   // Added from ChatGPT to implement update functionality
    const url = editingId ? `api/employee/${editingId}` : 'api/create';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url,{
      body: JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json'
      },
      method: method
    }).then(() => {
      setName(''); setDireccion(''); setRfc(''); setCurp('');
      refreshData();
    })
  }



  async function deleteEmployee(id: string) {
    try {
      fetch(`api/employee/${id}`, {
        headers:{
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }).then(() => {
        refreshData();
      })
    } catch (error) {
      console.log(error)
    }
  }


  const handleSubmit = async (name: string, direccion: string, rfc: string, curp: string) =>{
    try {
      create(name, direccion,rfc,curp);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (employee: Employee) => {
    setName(employee.name);
    setDireccion(employee.direccion);
    setRfc(employee.rfc);
    setCurp(employee.curp);
    setEditingId(employee.id);
  };
  
  return (
    <div>
      {/* <h1>Meetup List</h1> */}
      {/* <Link href="./newMeetup"><h1>Add Item</h1></Link>  */}
      {/* Link below redirects to 2 dynamic pages within the same folder */}
      {/* So in this case, this will redirect to the [meetupId] index page */}
      {/* They get redirected to the dynamic folder since these pages don't have a specific route */}
      {/* <Link href="./1"><h1>See new item</h1></Link>  */}
      {/* <Link href="./2"><h1>See new item</h1></Link>  */}

      <h3>Informacion de empleados</h3>
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(name, direccion, rfc, curp);
      }}>

        <label>Nombre completo</label> <br/>
        <input type="text" id="1" name="1" value={name} onChange={(e) => setName(e.target.value)}></input><br/>
        <label>Direccion</label><br/>
        <input type="text" id="1" name="1" value={direccion} onChange={(e) => setDireccion(e.target.value)}></input><br/>
        <label>RFC</label><br/>
        <input type="text" id="1" name="1" value={rfc} onChange={(e) => setRfc(e.target.value)}></input><br/>
        <label>CURP</label><br/>
        <input type="text" id="1" name="1" value={curp} onChange={(e) => setCurp(e.target.value)}></input><br/>
        <button type="submit">{editingId ? 'Update employee' : 'Add employee'}</button>
      </form>
      
      <ListaEmpleados employeesList = {props.employees} deleteEmployee={deleteEmployee} editEmployee={handleEdit}/>
    </div>
  );
}

export async function getServerSideProps (){
  const employees = await prisma.employee.findMany() // findMany() returns an array, that's why I'm defining the interface EmployeeProps as an object array

  return{
    props:{
      employees
    }
  }
}

