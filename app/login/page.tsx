export default function LoginPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <button className="w-full bg-yellow-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  