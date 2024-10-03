export default function Login() {

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center bg-white">
            <form action="" className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold mb-10">Login</p>
                <div className="flex flex-col mt-5 font-semibold">
                    <label htmlFor="email">Email</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" type="text" name="email" id="email" />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label htmlFor="password">Senha</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" type="password" name="password" id="password" />
                </div>
                <button className="bg-blue-600 mt-10 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded items-center justify-center" type="submit">Entrar</button>
            </form>
        </div>
    );
}