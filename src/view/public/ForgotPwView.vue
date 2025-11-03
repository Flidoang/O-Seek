<template>
    <section class="w-full h-full flex items-center justify-center bg-transparent px-4 py-8">
        <!-- Forgot Password Container -->
        <div
            class="bg-slate-100 flex flex-col lg:flex-row items-stretch rounded-2xl shadow-xl w-full max-w-5xl min-h-[500px] overflow-hidden p-4 md:p-5 lg:p-6">

            <!-- Form Section -->
            <div
                class="w-full lg:w-1/2 px-4 md:px-8 lg:px-16 flex flex-col justify-center py-8 lg:py-0 order-2 lg:order-1">

                <!-- Step 1: Email Input -->
                <div v-if="step === 1">
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Forgot Password?</h2>
                    <p class="text-sm md:text-base mt-3 md:mt-4 text-gray-600">
                        No worries, we'll send you reset instructions.
                    </p>

                    <form @submit.prevent="handleSendOtp" class="flex flex-col mt-4 md:mt-6">
                        <!-- Email Input -->
                        <div class="relative w-full">
                            <input v-model="email" type="email" placeholder="Enter your email" name="email" required
                                class="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" :disabled="loading"
                            class="w-full mt-4 md:mt-6 bg-indigo-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:bg-indigo-700 transition duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <svg v-if="loading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ loading ? 'Sending...' : 'Send Reset Link' }}</span>
                        </button>

                        <!-- Back to Login -->
                        <div class="flex items-center justify-center mt-6">
                            <router-link :to="{ name: 'Login' }"
                                class="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-indigo-600 transition duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </router-link>
                        </div>
                    </form>
                </div>

                <!-- Step 2: OTP Verification -->
                <div v-else-if="step === 2">
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Enter OTP Code</h2>
                    <p class="text-sm md:text-base mt-3 md:mt-4 text-gray-600">
                        We've sent a 6-digit code to <span class="font-semibold">{{ email }}</span>
                    </p>

                    <form @submit.prevent="handleVerifyOtp" class="flex flex-col mt-4 md:mt-6">
                        <!-- OTP Input -->
                        <div class="flex gap-2 justify-center">
                            <input v-for="(digit, index) in otpDigits" :key="index" v-model="otpDigits[index]"
                                @input="handleOtpInput(index, $event)" @keydown="handleOtpKeydown(index, $event)"
                                :ref="el => otpInputs[index] = el" type="text" maxlength="1"
                                class="w-12 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200" />
                        </div>

                        <!-- Resend OTP -->
                        <div class="flex justify-center mt-4">
                            <button v-if="!canResend" type="button" disabled
                                class="text-sm text-gray-400 cursor-not-allowed">
                                Resend code in {{ resendTimer }}s
                            </button>
                            <button v-else type="button" @click="handleResendOtp"
                                class="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200">
                                Resend OTP Code
                            </button>
                        </div>

                        <!-- Verify Button -->
                        <button type="submit" :disabled="loading || otpDigits.some(d => !d)"
                            class="w-full mt-6 bg-indigo-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:bg-indigo-700 transition duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <svg v-if="loading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ loading ? 'Verifying...' : 'Verify OTP' }}</span>
                        </button>

                        <!-- Back Button -->
                        <button type="button" @click="step = 1"
                            class="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600 hover:text-indigo-600 transition duration-200">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Change Email
                        </button>
                    </form>
                </div>

                <!-- Step 3: New Password -->
                <div v-else-if="step === 3">
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Reset Password</h2>
                    <p class="text-sm md:text-base mt-3 md:mt-4 text-gray-600">
                        Create a new password for your account
                    </p>

                    <form @submit.prevent="handleResetPassword" class="flex flex-col mt-4 md:mt-6">
                        <!-- New Password Input -->
                        <div class="relative w-full">
                            <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'"
                                placeholder="New Password" name="newPassword" required
                                class="w-full p-3 md:p-4 pr-10 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />
                            <button type="button" @click="showNewPassword = !showNewPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200">
                                <svg v-if="showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor"
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

                        <!-- Confirm Password Input -->
                        <div class="relative w-full mt-3 md:mt-4">
                            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                                placeholder="Confirm Password" name="confirmPassword" required
                                class="w-full p-3 md:p-4 pr-10 rounded-lg md:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm md:text-base" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
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

                        <!-- Password Requirements -->
                        <div class="mt-3 text-xs md:text-sm text-gray-600 space-y-1">
                            <p :class="{ 'text-green-600': passwordRequirements.length }"
                                class="flex items-center gap-1">
                                <svg class="w-4 h-4"
                                    :class="passwordRequirements.length ? 'text-green-600' : 'text-gray-400'"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                At least 8 characters
                            </p>
                            <p :class="{ 'text-green-600': passwordRequirements.hasNumber }"
                                class="flex items-center gap-1">
                                <svg class="w-4 h-4"
                                    :class="passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-400'"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                Contains a number
                            </p>
                            <p :class="{ 'text-green-600': passwordRequirements.hasSpecial }"
                                class="flex items-center gap-1">
                                <svg class="w-4 h-4"
                                    :class="passwordRequirements.hasSpecial ? 'text-green-600' : 'text-gray-400'"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                Contains a special character
                            </p>
                            <p :class="{ 'text-green-600': passwordRequirements.match }"
                                class="flex items-center gap-1">
                                <svg class="w-4 h-4"
                                    :class="passwordRequirements.match ? 'text-green-600' : 'text-gray-400'" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                Passwords match
                            </p>
                        </div>

                        <!-- Reset Button -->
                        <button type="submit" :disabled="loading || !isPasswordValid"
                            class="w-full mt-6 bg-indigo-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:bg-indigo-700 transition duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <svg v-if="loading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ loading ? 'Resetting...' : 'Reset Password' }}</span>
                        </button>
                    </form>
                </div>

                <!-- Step 4: Success Message -->
                <div v-else-if="step === 4" class="text-center">
                    <div class="flex justify-center mb-6">
                        <div class="bg-green-100 rounded-full p-4">
                            <svg class="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Password Reset Successfully!
                    </h2>
                    <p class="text-sm md:text-base mt-3 md:mt-4 text-gray-600">
                        Your password has been reset successfully. You can now login with your new password.
                    </p>
                    <router-link :to="{ name: 'Login' }"
                        class="inline-block w-full mt-6 bg-indigo-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:bg-indigo-700 transition duration-200 text-sm md:text-base">
                        Back to Login
                    </router-link>
                </div>
            </div>

            <!-- Image Section -->
            <div class="w-full lg:w-1/2 flex items-center justify-center p-2 md:p-4 order-1 lg:order-2 mb-4 lg:mb-0">
                <img :src="defaultImage" class="w-full h-48 md:h-64 lg:h-full object-cover rounded-2xl"
                    alt="Forgot Password Illustration">
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ===== STATE =====
const step = ref(1) // 1: Email, 2: OTP, 3: New Password, 4: Success
const email = ref('')
const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([])
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const defaultImage = ref('/assets/default.jpg')

// Resend OTP Timer
const resendTimer = ref(60)
const canResend = ref(false)
let resendInterval = null

// ===== COMPUTED =====
const passwordRequirements = computed(() => ({
    length: newPassword.value.length >= 8,
    hasNumber: /\d/.test(newPassword.value),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value),
    match: newPassword.value === confirmPassword.value && newPassword.value !== ''
}))

const isPasswordValid = computed(() => {
    return passwordRequirements.value.length &&
        passwordRequirements.value.hasNumber &&
        passwordRequirements.value.hasSpecial &&
        passwordRequirements.value.match
})

// ===== METHODS =====
const handleSendOtp = async () => {
    loading.value = true
    try {
        // TODO: Call API to send OTP
        // await authService.sendOtpEmail(email.value)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log('Sending OTP to:', email.value)
        step.value = 2
        startResendTimer()
    } catch (error) {
        console.error('Failed to send OTP:', error)
        alert('Failed to send OTP. Please try again.')
    } finally {
        loading.value = false
    }
}

const handleOtpInput = (index, event) => {
    const value = event.target.value

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
        otpDigits.value[index] = ''
        return
    }

    // Move to next input
    if (value && index < 5) {
        otpInputs.value[index + 1]?.focus()
    }
}

const handleOtpKeydown = (index, event) => {
    // Handle backspace
    if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
        otpInputs.value[index - 1]?.focus()
    }
}

const handleVerifyOtp = async () => {
    loading.value = true
    const otpCode = otpDigits.value.join('')

    try {
        // TODO: Call API to verify OTP
        // await authService.verifyOtp(email.value, otpCode)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log('Verifying OTP:', otpCode)
        step.value = 3
        stopResendTimer()
    } catch (error) {
        console.error('Failed to verify OTP:', error)
        alert('Invalid OTP code. Please try again.')
        otpDigits.value = ['', '', '', '', '', '']
        otpInputs.value[0]?.focus()
    } finally {
        loading.value = false
    }
}

const handleResendOtp = async () => {
    canResend.value = false
    resendTimer.value = 60

    try {
        // TODO: Call API to resend OTP
        // await authService.sendOtpEmail(email.value)

        console.log('Resending OTP to:', email.value)
        startResendTimer()
    } catch (error) {
        console.error('Failed to resend OTP:', error)
        alert('Failed to resend OTP. Please try again.')
    }
}

const handleResetPassword = async () => {
    if (!isPasswordValid.value) {
        alert('Please meet all password requirements.')
        return
    }

    loading.value = true
    try {
        // TODO: Call API to reset password
        // await authService.resetPassword(email.value, otpCode, newPassword.value)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log('Resetting password for:', email.value)
        step.value = 4
    } catch (error) {
        console.error('Failed to reset password:', error)
        alert('Failed to reset password. Please try again.')
    } finally {
        loading.value = false
    }
}

const startResendTimer = () => {
    resendInterval = setInterval(() => {
        resendTimer.value--
        if (resendTimer.value <= 0) {
            canResend.value = true
            stopResendTimer()
        }
    }, 1000)
}

const stopResendTimer = () => {
    if (resendInterval) {
        clearInterval(resendInterval)
        resendInterval = null
    }
}

// ===== LIFECYCLE =====
onUnmounted(() => {
    stopResendTimer()
})
</script>