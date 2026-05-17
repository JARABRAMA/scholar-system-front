import { SideBar } from '../components/SideBar.jsx'
import { Button } from '../components/Button.jsx'
import { RoleSelect } from '../components/RoleSelect.jsx'
import { useFilterUsers } from '../hooks/UseFilterUsers.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { useNavigate } from 'react-router'
import { NavigationPaths } from '../navigation/NavigationPaths.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { captalize } from '../utils/captalize.js'
import { ErrorContainer } from '../components/ErrorContainer.jsx'

export function FilterUsers () {
  const {
    users,
    loading,
    error,
    onSetSearch,
    onSetRole,
    onSetPage,
    onNextPage,
    onPreviousPage,
    isFirstPage,
    isLastPage,
    totalPages,
    currentPage
  } = useFilterUsers()

  return (
    <main className='grid grid-cols-[auto_1fr] bg-stone-100 overflow-hidden'>
      <SideBar />
      <Content
        setRoles={onSetRole}
        setSearch={onSetSearch}
        users={users}
        loading={loading}
        onSetPage={onSetPage}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        totalPages={totalPages}
        currentPage={currentPage}
        error={error}
      />
    </main>
  )
}

function StatisticCard ({ title, value }) {
  return (
    <article
      className='flex flex-col items-center justify-center shadow-sm shadow-stone-300/80
    bg-stone-100 rounded-md border border-stone-300 px-5 py-3 gap-3'
    >
      <p className='text-stone-400 whitespace-no-wrap text-sm'>{title}</p>
      <h3 className='text-2xl text-black font-mono font-bold'>{value}</h3>
    </article>
  )
}

function SearchBar ({ setRoles, setSearch }) {
  return (
    <div className='grid grid-cols-[2fr_1fr_1fr]  gap-x-4 items-center'>
      <div
        className='flex gap-2 bg-white shadow-md shadow-stone-200 border border-stone-300 px-1.5 rounded-md items-center py-2'
      >
        <svg className='size-6'>
          <use href='/sprite.svg#search' />
        </svg>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='Buscar usuario por nombre completo'
          className='border-none focus:outline-none bg-transparent text-md flex flex-1'
        />
      </div>
      <RoleSelect
        onInput={setRoles}
        className='bg-white border border-stone-300 rounded-2xl ring-0 outline-0 shadow-md shadow-stone-200 py-2.5'
      />
      {/* <CitySelect
        className="bg-white border border-stone-300 rounded-2xl ring-0 outline-0 shadow-md shadow-stone-200 py-2.5"
        py-2
      /> */}
    </div>
  )
}

function Content ({
  setRoles,
  setSearch,
  users,
  loading,
  onSetPage,
  onNextPage,
  onPreviousPage,
  isFirstPage,
  isLastPage,
  totalPages,
  currentPage,
  error
}) {
  const navigate = useNavigate()
  return (
    <section className='flex flex-col flex-1 overflow-hidden py-8 px-12'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='text-4xl'>Gestionar Usuarios</h1>
          <span className='text-stone-400'>
            Administra estudiantes, docentes y administradores.
          </span>
        </div>
        <Button
          onClick={() => navigate(NavigationPaths.NEW_USER)}
          className='bg-blue-600 text-white flex items-center px-3 gap-2 hover:outline-0'
        >
          <svg className='size-8 p-0 m-0'>
            <use href='/sprite.svg#plus' />
          </svg>
          Añadir usuario
        </Button>
      </div>
      <div className='grid gap-4 grid-cols-4 my-2'>
        <StatisticCard title='TOTAL USUARIOS' value={124} />
        <StatisticCard title='ESTUDIANTES' value={80} />
        <StatisticCard title='DOCENTES' value={30} />
        <StatisticCard title='ADMINISTRADORES' value={14} />
      </div>
      <SearchBar setRoles={setRoles} setSearch={setSearch} />
      <UsersList
        users={users}
        loading={loading}
        onSetPage={onSetPage}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        totalPages={totalPages}
        currentPage={currentPage}
        error={error}
      />
    </section>
  )
}

function UsersList ({
  users,
  loading,
  onSetPage,
  onNextPage,
  onPreviousPage,
  isFirstPage,
  isLastPage,
  totalPages,
  currentPage,
  error
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className='flex flex-col flex-1 overflow-hidden mt-6'>
      <section className='flex flex-col border border-stone-400 rounded-xl shadow-md flex-1 overflow-hidden'>
        <div className='grid grid-cols-4 border-b border-stone-400 px-4'>
          <span className='text-stone-600 justify-self-center slef-center'>
            NOMBRE
          </span>
          <span className='text-stone-600 justify-self-center slef-center'>
            ROL
          </span>
          <span className='text-stone-600 justify-self-center slef-center'>
            CIUDAD
          </span>
          <span className='text-stone-600 justify-self-center slef-center'>
            EMAIL
          </span>
        </div>

        {error && <ErrorContainer error={error} />}
        {!error &&
          <div className='flex-1 overflow-y-auto'>
            {users && !loading && users.map((user) => <UserCard key={user.id} user={user} />)}

            {loading && !error && (
              <div className='flex items-center justify-center h-full'>
                <Spinner />
              </div>
            )}

          </div>}

      </section>
      <Pagination
        onPreviousPage={onPreviousPage}
        isFirstPage={isFirstPage}
        pages={pages}
        currentPage={currentPage}
        onSetPage={onSetPage}
        onNextPage={onNextPage}
        isLastPage={isLastPage}
      />
    </div>
  )
}

function UserCard ({ user }) {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/profile/${user.id}`)
  }
  return (
    <div
      className='grid grid-cols-4 text-stone-900 border-b px-4 border-stone-400
              last:border-b-0  bg-white hover:bg-stone-100 py-2 justify-between'
      onClick={onClick}
    >
      <strong className='self-center'>{user.fullName}</strong>
      <RoleSpan role={user.role} />
      <span className='self-center justify-self-center'>{`${user.municipality} - ${user.department}`}</span>
      <span
        className='bg-blue-200 text-blue-700 rounded-full w-fit
              h-fit self-center justify-self-center px-3 py-.5'
      >
        {user.email}
      </span>
    </div>
  )
}

function RoleSpan ({ role }) {
  let className = 'self-center justify-self-center w-fit h-fit py-.5 px-3 rounded-full '
  if (role === 'ADMINISTRADOR') {
    className += 'bg-red-100 text-red-700'
  } else if (role === 'PROFESOR') {
    className += 'bg-yellow-100 text-yellow-700'
  } else if (role === 'ESTUDIANTE') {
    className += 'bg-green-100 text-green-700'
  }
  return <span className={className}>{captalize(role.toLowerCase())}</span>
}
