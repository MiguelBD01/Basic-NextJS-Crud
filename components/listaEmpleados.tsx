type deleteEmployee = (id: string) => void;
type editEmployee = (employee: Employee) => void;

// type updateEmployee = (id: string,name: string, direccion: string, rfc: string, curp: string) => void;
interface Employee {
    id: string;
    name: string;
    direccion: string;
    rfc: string;
    curp: string;
  }

interface ListaEmpleadosProps {
    employeesList:{
        id: string,
        name:string,
        direccion: string,
        rfc: string,
        curp: string
      }[],
      deleteEmployee: deleteEmployee, // Not sure what I'm doing here
      editEmployee: editEmployee // Not sure what I'm doing here
}

const ListaEmpleados = (props:ListaEmpleadosProps) =>{
    return(
        <div>
            <table style={{border:1}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Direccion</th>
                        <th>RFC</th>
                        <th>CURP</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      props.employeesList.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.direccion}</td>
                            <td>{employee.rfc}</td>
                            <td>{employee.curp}</td>
                            <td><button onClick={() => props.deleteEmployee(employee.id)}>Delete</button></td>
                            <td><button onClick={() => props.editEmployee(employee)}>Update</button></td>
                        </tr>
                      ))  
                    }
                </tbody>
            </table>
        </div>
        
    );
}

export default ListaEmpleados;