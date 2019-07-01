import React, { useState, Fragment, useEffect } from 'react';
import Formulario from './componentes/Formulario'
import Cita from './componentes/Cita'

function App() {

  //cargr citas del localstorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, guardarCita] = useState(citasIniciales)

  //agregar citas al state
  const crearCita = (cita) => {
    //tomar copia del state y agregar lo nuevo
    const nuevasCitas = [...citas, cita];

    //guardar en el state
    guardarCita(nuevasCitas);
  }

  //eliminar cita del state
  const eliminarCita = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  }
  //guardar en localstorage
  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        localStorage.setItem('citas', JSON.stringify([]))
      }
    }, [citas] //para que useeffect solo se ejecute cuando una cita cambia
  );

  //titulo ccondicional
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar Citas aquí';
  return (

    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default App;
