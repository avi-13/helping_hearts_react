import React from "react";

const Login = () => {
  return (
    <>
      <div class="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2 bg-gray-100 dark:bg-gray-900">
        <div class="hidden lg:block">
          <img
            src="https://source.unsplash.com/800x600/?login"
            alt="Login Image"
            width="800"
            height="600"
            class="h-full w-full object-cover"
            style={{aspectRatio: "800 / 600", objectFit: "cover"}}
          />
        </div>
        <div class="flex items-center justify-center px-4 py-12">
          <div class="w-full max-w-md space-y-8">
            <div>
              <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Sign in to your account
              </h2>
              <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Or{" "}
                <a
                  class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  href="#"
                >
                  reset your password
                </a>
              </p>
            </div>
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                  for="username"
                >
                  Username
                </label>
                <input
                  class="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  id="username"
                  autocomplete="username"
                  required=""
                  placeholder="Username"
                  type="text"
                  name="username"
                />
              </div>
              <div>
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  id="password"
                  autocomplete="current-password"
                  required=""
                  placeholder="Password"
                  type="password"
                  name="password"
                />
              </div>
              <div>
                <button
                  class="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
