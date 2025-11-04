TODO

dar forma a las pages, abstraer si se usan 2 o mas veces, dejar listo para la recepcion de datos

crear componentes comunes filterbar

conectar con supabase y crear los archivos necesarios para el manejo de la base de datos
mas o menos asi

src/
├── types/
│ ├── Profile.ts
│ ├── Plant.ts
│ ├── Event.ts
│ └── EventParticipant.ts
│
├── services/
│ ├── supabaseClient.ts
│ ├── profileService.ts
│ ├── plantService.ts
│ ├── eventService.ts
│ └── eventParticipantService.ts

+test

crear auth basico

crear hooks necesarios
src/
├── hooks/
│ ├── useAuth.ts
│ ├── useProfile.ts
│ ├── usePlants.ts
│ ├── useEvents.ts
│ └── useEventParticipants.ts

+test

-------------plan de atauqe-----------------------

🧩 FASE 1 — Estructura base del proyecto

Objetivo: Tener la arquitectura clara antes de conectar nada.

🪵 Rama:
feature/structure-pages

TODO:

Crear las páginas principales (src/pages/):

HomePage.tsx

PlantsPage.tsx

EventsPage.tsx

ProfilePage.tsx

Crear layout general (Header, Footer, contenido principal)

Abstraer secciones o bloques repetidos en componentes

Dejar cada página preparada para recibir datos

🔁 Merge:
Cuando tengas las páginas funcionales y sin errores visuales, mergear a dev.

🧱 FASE 2 — Componentes comunes

Objetivo: Reutilizar UI consistente en toda la app.

🪵 Rama:
feature/common-components

TODO:

Crear carpeta src/components/common/ o src/components/ui/

Crear componentes base:

FilterBar

PlantCard

EventCard

EmptyState

Revisar duplicaciones entre páginas y abstraerlas

🔁 Merge:
A dev cuando los componentes estén probados visualmente y usados en alguna página.

🔐 FASE 3 — Autenticación básica

Objetivo: Login y registro con email/contraseña.

🪵 Rama:
feature/auth-basic

TODO:

Instalar @supabase/supabase-js

Crear services/supabaseClient.ts

Crear authService.ts con:

signUp

signIn

signOut

getUser

onAuthStateChange

Crear useAuth.ts

Crear página o modal de login (AuthPage.tsx)

Añadir protección de rutas

🧪 Tests:

Mock de supabase.auth

Test de login/logout con authService

🔁 Merge:
A dev cuando puedas iniciar sesión, cerrar sesión y leer el usuario actual sin errores.

🪴 FASE 4 — Conexión con Supabase (datos)

Objetivo: Crear tipado y servicios CRUD.

🪵 Rama:
feature/supabase-services

TODO:

Crear carpeta src/types/ con:

Profile.ts

Plant.ts

Event.ts

EventParticipant.ts

Crear carpeta src/services/ con:

supabaseClient.ts

profileService.ts

plantService.ts

eventService.ts

eventParticipantService.ts

Probar lectura y escritura de datos reales

🧪 Tests:

Mock de supabase.from()

Test de CRUD básico (getAll, getById, create, delete)

🔁 Merge:
A dev cuando todos los servicios respondan correctamente.

⚙️ FASE 5 — Hooks de datos

Objetivo: Encapsular lógica de carga y estado de cada entidad.

🪵 Rama:
feature/data-hooks

TODO:

Crear carpeta src/hooks/

useAuth.ts (de FASE 3)

useProfile.ts

usePlants.ts

useEvents.ts

useEventParticipants.ts

Cada hook debe manejar:

Estado (data, loading, error)

Funciones CRUD (refetch, add, delete, etc.)

Dependencias (userId, eventId, etc.)

Integrar los hooks en las páginas correspondientes

🧪 Tests:

Mockear servicios

Test de hooks con @testing-library/react

🔁 Merge:
A dev cuando los hooks devuelvan datos y controlen estados correctamente.

🎨 FASE 6 — Integración UI + Datos

Objetivo: Que las páginas muestren datos reales con filtros.

🪵 Rama:
feature/ui-integration

TODO:

Conectar usePlants con PlantsPage

Conectar useEvents con EventsPage

Integrar FilterBar:

Filtro de texto (search)

Toggle (disponible / próximos)

Mostrar EmptyState si no hay resultados

Añadir estados visuales (loading, error)

🧪 Tests de UI:

Mock de hooks

Test de renderizado según estado (datos, loading, sin resultados)

🔁 Merge:
A dev cuando ambas páginas muestren datos filtrables desde Supabase.

🧪 FASE 7 — Testing general

Objetivo: Validar estabilidad del sistema completo.

🪵 Rama:
feature/tests

TODO:

Instalar y configurar Vitest + React Testing Library

Crear estructura:

src/
├── services/**tests**/
├── hooks/**tests**/
├── components/**tests**/

Tests unitarios → services

Tests de integración → hooks

Tests de UI → components
