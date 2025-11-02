<template>
    <section class="w-full h-full flex items-center justify-center bg-transparent px-4 py-8">
        <!-- Register Container -->
        <div
            class="bg-slate-100 flex flex-col lg:flex-row items-stretch rounded-2xl shadow-xl w-full max-w-5xl min-h-[500px] overflow-hidden p-4 md:p-5 lg:p-6">

            <!-- form -->
            <div
                class="w-full lg:w-1/2 px-4 md:px-8 lg:px-16 flex flex-col justify-center py-8 lg:py-0 order-2 lg:order-1">
                <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Create Account</h2>
                <p class="text-sm md:text-base mt-3 md:mt-4 text-gray-600">Join us today and get started</p>

                <form action="" class="flex flex-col mt-4 md:mt-6">
                    <!-- Name Input -->
                    <input type="text" placeholder="Full Name" v-model="formData.name"
                        class="w-full mt-3 md:mt-4 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />

                    <!-- Email Input -->
                    <input type="email" placeholder="Email" v-model="formData.email"
                        class="w-full mt-3 md:mt-4 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />

                    <!-- Password Input with Toggle -->
                    <div class="relative w-full mt-3 md:mt-4">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Password"
                            v-model="formData.password"
                            class="w-full p-3 md:p-4 pr-10 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200">
                            <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>

                    <!-- Confirm Password Input with Toggle -->
                    <div class="relative w-full mt-3 md:mt-4">
                        <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password"
                            v-model="formData.confirmPassword"
                            class="w-full p-3 md:p-4 pr-10 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />
                        <button type="button" @click="toggleConfirmPasswordVisibility"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200">
                            <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="flex items-center mt-4">
                        <input type="checkbox" id="terms" v-model="formData.agreeTerms"
                            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                        <label for="terms" class="ml-2 text-xs md:text-sm text-gray-600">
                            I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-800">Terms and
                                Conditions</a>
                        </label>
                    </div>

                    <!-- Register Button -->
                    <button type="submit" @click.prevent="handleRegister" :disabled="!isFormValid"
                        class="w-full mt-4 md:mt-6 bg-indigo-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 text-sm md:text-base">
                        Create Account
                    </button>

                    <!-- Divider -->
                    <div class="flex items-center mt-6 mb-4">
                        <div class="flex-1 border-t border-gray-300"></div>
                        <span class="px-4 text-sm text-gray-500">Or continue with</span>
                        <div class="flex-1 border-t border-gray-300"></div>
                    </div>

                    <!-- Google Register Button -->
                    <button type="button" @click="registerWithGoogle"
                        class="w-full flex items-center justify-center gap-3 mt-2 bg-white text-gray-700 py-3 md:py-4 rounded-lg md:rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition duration-200 text-sm md:text-base">
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                </form>

                <!-- Additional responsive elements -->
                <div class="mt-6 text-center lg:text-left">
                    <p class="text-xs md:text-sm text-gray-600">
                        Already have an account?
                        <router-link :to="{ name: 'Login' }" class="text-indigo-600 hover:text-indigo-800 font-medium ml-1">Login</router-link>
                    </p>
                </div>
            </div>

            <!-- image -->
            <div class="w-full lg:w-1/2 flex items-center justify-center p-2 md:p-4 order-1 lg:order-2 mb-4 lg:mb-0">
                <img :src="defaultImage" class="w-full h-48 md:h-64 lg:h-full object-cover rounded-2xl"
                    alt="Register Illustration">
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const defaultImage = ref('/assets/default.jpg')

// Form data
const formData = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
})

// Computed properties
const isFormValid = computed(() => {
    return (
        formData.value.name &&
        formData.value.email &&
        formData.value.password &&
        formData.value.confirmPassword &&
        formData.value.agreeTerms &&
        formData.value.password === formData.value.confirmPassword
    )
})

const passwordsMatch = computed(() => {
    return formData.value.password === formData.value.confirmPassword
})

// Methods
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = () => {
    if (!isFormValid.value) {
        alert('Please fill all fields correctly and agree to terms.')
        return
    }

    if (!passwordsMatch.value) {
        alert('Passwords do not match.')
        return
    }

    // Implement your registration logic here
    console.log('Registering user:', formData.value)
    
    // Example registration flow:
    // try {
    //   await authStore.register(formData.value)
    //   router.push('/dashboard')
    // } catch (error) {
    //   console.error('Registration failed:', error)
    // }
}

const registerWithGoogle = () => {
    // Implement Google registration logic here
    console.log('Register with Google clicked')
    // Similar to login but might handle user creation differently
}

</script>