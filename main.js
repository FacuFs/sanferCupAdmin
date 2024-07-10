import {  savePlayer, getPlayers, onGetPlayers, deletePlayer, getPlayer, updatePlayer,} from "./firebase.js";

const mainForm = document.getElementById('mainForm')
const playersContainer = document.getElementById('playersContainer')
const playersListContainer = playersContainer.appendChild(document.createElement('table'))
const notification = document.getElementById('notification');

function showNotification() {
  notification.classList.add('show'); // Muestra la notificación
  setTimeout(() => {
    notification.classList.remove('show'); // Oculta la notificación después de 3 segundos
  }, 3000);
}

let editStatus = false;
let id='';

window.addEventListener('DOMContentLoaded', async () =>{
  onGetPlayers((querySnapshot)=>{
    let html="<tr><th>Apellido</th><th>Nombre</th><th>Edad</th><th>Telefono</th><th>Sexo</th><th>Nivel</th><th>Instagram</th><th>Email</th><th>Acciones</th></tr>";
    let boton = document.getElementById('inscribir');
        boton.innerHTML = 'Guardar';
    querySnapshot.forEach((doc) => {
      const player = doc.data();
      html += `
      <tr> 
      <td>${
            player.apellido
        }</td>
      <td>
      <td>${
            player.nombre
        }</td>
      <td>${
            player.edad
        }</td>
      <td>${
            player.telefono
        }</td>
      <td>${
            player.sexo
        }</td>
      <td>${
            player.nivel
        }</td>
      <td>${
            player.instagram
        }</td>
      <td>${
            player.email
        }</td>
      <td>
        <button class="delete" data-id="${
            doc.id
        }">Eliminar</button>
        <button class="edit" data-id="${
            doc.id
        }">Editar</button>
      </td>
    </tr>
      `
    })

    playersListContainer.innerHTML = html;

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', ({target: {dataset}}) => {
        deletePlayer(dataset.id);
      })
    })
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        const doc = await getPlayer(e.target.dataset.id);
        const player = doc.data();
        mainForm.apellido.value = player.apellido;
        mainForm.nombre.value = player.nombre;
        mainForm.edad.value = player.edad;
        mainForm.telefono.value = player.telefono;
        mainForm.sexo.value = player.sexo;
        mainForm.nivel.value = player.nivel;
        mainForm.instagram.value = player.instagram;
        mainForm.email.value = player.email;
        editStatus = true;
        id = e.target.dataset.id;
        let boton = document.getElementById('inscribir');
        boton.innerHTML = 'Actualizar';
        
        
      })
    })
  })
})

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const apellido = document.getElementById('apellido').value;
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const telefono = parseInt(document.getElementById('telefono').value);
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const nivel = document.getElementById('nivel').value;
    const instagram = document.getElementById('instagram').value;
    const email = document.getElementById('email').value;

    if(editStatus){
      updatePlayer((id), {apellido, nombre, edad, telefono, sexo, nivel, instagram, email});
      editStatus = false;
    }else{
      savePlayer(apellido, nombre, edad, telefono, sexo, nivel, instagram, email);
      showNotification();
    }
    
    mainForm.reset();
})


