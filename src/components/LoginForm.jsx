import {Button} from "./Button";
import {Link} from "react-router";
import {Input} from "./Input";
import {useLogin} from "../hooks/UseLogin.jsx";
import {Spinner} from "./Spinner.jsx";

export function LoginForm() {
	const {onLogin, error, loading} = useLogin();
	return (
		<article
			className="w-md rounded-2xl px-5  py-6 flex flex-col gap-3
    bg-stone-200 border-2 border-stone-300 shadow-md shadow-stone-300/80"
		>
			<div>
				<h2 className="text-3xl font-bold m-0 p-0">Bienvenido de Vuelta</h2>
				<small className="text-sm text-gray-500">
					Ingresa tus credenciales para continuar
				</small>
			</div>

			<form className="flex flex-col gap-4" onSubmit={onLogin}>
				<Input
					name="email"
					placeholder="user@gmail.com"
					type="email"
					required={true}
				>
					Correo Electronico
				</Input>

				<Input
					name="password"
					placeholder="******"
					type="password"
					required={true}
				>
					Contraseña
				</Input>
				{loading && !error && (
					<div className="flex items-center justify-center">
						<Spinner/>
					</div>
				)}
				{error && <span className="text-red-400 self-center">{error}</span>}
				<Button
					type="submit"
					className="bg-blue-700 text-gray-100 hover:bg-blue-600 border-0 hover:outline-0"
				>
					Iniciar Sesión
				</Button>

				<Link className="self-center text-blue-700 hover:underline">
					¿Olvidaste tu contraseña?
				</Link>
			</form>
		</article>
	);
}
