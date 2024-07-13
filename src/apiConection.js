const baseUrl = 'http://localhost:5276';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error) {
    console.error("Error en login: ", error);
    throw error;
  }
};

export async function isLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token; 
}
export async function logout() {
  localStorage.removeItem('token');
}

export const signup = async (Name, Surname, Email, Password, Roles, UserQuestionId, UserQuestionAnswer) => {
  try {
    const response = await fetch(`${baseUrl}/login/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name, Surname, Email, Password, Roles, UserQuestionId, UserQuestionAnswer }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el registro');
    }

    const message = await response.text();
    console.log(message);
    return message;
  } catch (error) {
    console.error("Error en signup: ", error);
    throw error;
  }
};

export async function fetchUser() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const response = await fetch(`${baseUrl}/User/GetUser`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el perfil del usuario');
    }

    const userProfile = await response.json();
    return {userProfile};
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
}

export async function fetchUserRole() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const response = await fetch(`${baseUrl}/User/GetRoles`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los roles del usuario');
    }

    const roles = await response.json();
    return {roles};
  } catch (error) {
    console.error('Error al obtener los roles del usuario:', error);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${baseUrl}/Category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
}


export async function fetchUserEventsCount() {
  try {
    const response = await fetch(`${baseUrl}/Events`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los eventos del usuario');
    }

    const data = await response.json();
    const totalEvents = data.count;
    const events = data.result;

    // Cuento los eventos por cada categoría
    const eventsByCategory = events.reduce((acc, event) => {
      event.categories.forEach(category => {
        if (!acc[category]) {
          acc[category] = 1;
        } else {
          acc[category]++;
        }
      });
      return acc;
    }, {});

    //console.log({totalEvents, eventsByCategory});
    return { totalEvents, eventsByCategory };
  }
  catch (error) {
    console.error('Error al obtener los eventos del usuario:', error);
    throw error;
  }
}


export async function fetchUserLevel() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const response = await fetch(`${baseUrl}/User/IsPremium`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el nivel del usuario');
    }
    const userLevel = await response.json();
    return {userLevel};
  } 
  catch (error) {
    console.error('Error al obtener el nivel del usuario:', error);
    throw error;
  }
}

export const updatePassword = async (oldPassword, confirmPassword, newPassword) => {
  try {
    const token = localStorage.getItem('token'); // Obtiene el token JWT almacenado
    if (!token) {
      throw new Error('No autenticado');
    }

    const response = await fetch(`${baseUrl}/User/UpdatePassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Incluye el token JWT para autenticación
      },
      body: JSON.stringify({
        OldPassword: oldPassword,
        ConfirmPassword: confirmPassword,
        NewPassword: newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la contraseña');
    }

    const data = await response.json();
    return data; // Puedes retornar la respuesta o un mensaje específico
  } catch (error) {
    console.error("Error en updatePassword: ", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await fetch(`${baseUrl}/Events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los eventos');
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error("Error en getAllEvents: ", error);
    throw error;
  }
};

export async function fetchEventById(eventId) {
  try {
    // Construir la URL con el ID del evento como parámetro de consulta
    const url = `${baseUrl}/Event/GetById?Id=${eventId}`;

    // Realizar la petición GET sin necesidad de enviar el ID en el cuerpo de la solicitud
    const response = await fetch(url, {
      method: 'GET', // Cambiado a GET ya que ahora el ID se pasa por URL
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Error al obtener la información del evento');
    }

    // Convertir la respuesta en JSON
    const eventData = await response.json();

    // Devolver los datos del evento
    return eventData;
  } catch (error) {
    console.error('Error al obtener la información del evento:', error);
    throw error;
  }
}

export async function getOwnedEvents() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const response = await fetch(`${baseUrl}/User/GetOwnedEvents`, { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener los eventos propios');
    }
    const events = await response.json();
    console.log("Eventos Creados: ", events);
    return events;
  } catch (error) {
    console.error("Error al obtener los eventos propios: ", error);
    throw error;
  }
}

export async function addEvent(name, location, date, time, duration, description, categoryId) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    console.log(name+","+location+","+date+","+time+","+duration+","+description+","+categoryId)
    const response = await fetch(`${baseUrl}/Event/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        Name: name,
        Location: location,
        Date: date,
        Time: time,
        Duration: duration,
        Description: description,
        CategoryId: categoryId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al crear el evento');
    }

    const result = await response.json();
    console.log("Evento creado con éxito: ", result);
    return result;
  } catch (error) {
    console.error("Error al crear el evento: ", error);
    return "Error al crear el evento";
  }
}

export async function addEventBanner(eventId, imageFile) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }

    //Verificar las dimensiones y el tipo de la imagen
    // if (imageFile.type !== 'image/png') {
    //   throw new Error('El archivo debe ser una imagen PNG');
    // }
    // const img = await createImageBitmap(imageFile);
    // if (img.width > 728 || img.height > 90) {
    //   throw new Error('Las dimensiones de la imagen exceden el máximo permitido (728x90px)');
    // }

    const formData = new FormData();
    formData.append('Id', eventId);
    formData.append('FormFile', imageFile);

    const response = await fetch(`${baseUrl}/Event/AddBanner`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al cargar la imagen del evento');
    }

    const result = await response.json();
    console.log("Imagen cargada con éxito: ", result);
    return "Imagen cargada con éxito";
  } catch (error) {
    console.error("Error al cargar la imagen del evento: ", error);
    return "Error al cargar la imagen del evento";
  }
}

export async function getEventBanner(eventId) {
  try {

    const response = await fetch(`${baseUrl}/Event/GetBanner/${eventId}`, {
      method: 'GET',
      });

    if (!response.ok) {
      throw new Error(`Error al obtener el banner del evento: ${response.status}`);
    }

    // Verificar el tipo de contenido de la respuesta
    const contentType = response.headers.get('Content-Type');
    if (contentType !== 'image/png') {
      throw new Error('La respuesta no es un archivo PNG');
    }

    const imageData = await response.blob();
    // Convertir el blob a una URL
    const imageUrl = URL.createObjectURL(imageData);
    
    return imageUrl; // Devuelve la URL del blob
    //return { image: imageData, contentType };
  } catch (error) {
    console.error("Error al obtener el banner del evento: ", error);
    return "Error al obtener el banner del evento";
  } 
}

export async function fetchEventsByFilters({ Name = '', Category = '', FromDate = '', ToDate = '', IsActive = '' }) {
  
  let params = '';

  if (Name) params += `Name=${Name.toLowerCase().replace(/\s/g, '+')}&`;
  if (Category) params += `Category=${encodeURIComponent(Category.toLowerCase())}&`;
  if (FromDate) params += `FromDate=${encodeURIComponent(FromDate.toLowerCase())}&`;
  if (ToDate) params += `ToDate=${encodeURIComponent(ToDate.toLowerCase())}&`;
  if (IsActive !== '') params += `IsActive=${encodeURIComponent(IsActive.toLowerCase())}&`;

  if (params) params = params.slice(0, -1);

  //console.log(params);

  if (!params) {
    throw new Error('Al menos un filtro debe ser proporcionado');
  }

  try {
    const response = await fetch(`${baseUrl}/Event/GetByFilters?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los eventos por filtros');
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error al obtener los eventos por filtros:', error);
    throw error;
  }
}

export async function fetchEventsByPeriod(cdPeriod) {
  try {

    // Construir la URL incluyendo cdPeriod como parámetro de consulta
    const url = `${baseUrl}/Event/GetByPeriod?cdPeriod=${cdPeriod}`;

    const response = await fetch(url, {
      method: 'GET', // Método GET adecuado para solicitudes de datos
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los eventos por periodo');
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error al obtener los eventos por periodo:', error);
    throw error;
  }
}