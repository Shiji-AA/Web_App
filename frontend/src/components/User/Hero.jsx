
function Hero() {
    return (
        <div>
            <header>
  

  <div
  className="w-full h-96 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
  }}
>
  <div className="flex items-center justify-center w-full h-full bg-gray-900/50">
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">
        Build Your New{" "}
        <span className="text-blue-400 underline">SaaS</span>
      </h1>

      <button className="px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition duration-200 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none">
        Start Project
      </button>
    </div>
  </div>
</div>
</header>
        </div>
    )
}

export default Hero