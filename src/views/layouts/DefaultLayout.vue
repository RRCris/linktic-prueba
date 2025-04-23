<script setup lang="ts">
</script>
<template>
    <div class="min-h-screen flex flex-col">
        <div class="grow p-2 md:p-5 lg:p-10 max-w-[1300px] w-full mx-auto">
            <router-view></router-view>
        </div>
        <footer className="bg-gray-800 text-white py-5 mt-8 ">
            <p className="text-center font-bold">
                hecho por cristian david roa
            </p>
            <ul className="flex justify-center items-center gap-3">
                <li>
                    <a href="https://www.linkedin.com/in/devcris2023/" target="_blank" className="text-blue-300">
                        LinkedIn
                    </a>
                </li>
                <li>Email: curiosity.cdrr@gmail.com</li>
            </ul>
        </footer>


    </div>
</template>
